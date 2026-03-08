import * as vscode from 'vscode';
import { DevGuidePanel } from './panels/DevGuidePanel';
import { getAIResponse, getUserMessageResponse } from './services/Services';

export function activate(context: vscode.ExtensionContext) {
  console.log('DevGuide is now active');

  const provider = new DevGuidePanel(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      DevGuidePanel.viewType,
      provider,
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );

  provider.onUserMessage(async (text: string) => {
    console.log('User message received:', text);
    const result = await getUserMessageResponse(text);
    provider.sendToPanel({
      command: 'aiInsight',
      data: {
        question: result.question,
        hint: result.hint,
        offerLesson: false,
        lessonTopic: "",
        line: 0,
        fileName: "chat",
        mistakeCount: 1,
        language: "general"
      }
    });
  });

  let debounceTimer: NodeJS.Timeout | undefined;
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const doc = event.document;
      if (doc.uri.scheme !== 'file') return;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        provider.sendToPanel({
          command: 'codeContext',
          data: {
            type: 'code_change',
            fileName: doc.fileName.split(/[\\/]/).pop() || '',
            language: doc.languageId,
            content: doc.getText(),
            cursorLine: vscode.window.activeTextEditor?.selection.active.line ?? 0,
            timestamp: Date.now()
          }
        });
      }, 3000);
    })
  );

  // Track active errors per file
  const activeErrors: Record<string, string> = {};

  // Trigger on diagnostics change (VS Code)
  let diagTimer: NodeJS.Timeout | undefined;
  context.subscriptions.push(
    vscode.languages.onDidChangeDiagnostics((event) => {
      if (diagTimer) clearTimeout(diagTimer);
      diagTimer = setTimeout(async () => {
        for (const uri of event.uris) {
          await handleErrors(uri, activeErrors, provider);
        }
      }, 2000);
    })
  );

  // Trigger on file save (Kiro)
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(async (doc) => {
      if (doc.uri.scheme !== 'file') return;

      setTimeout(async () => {
        const diagnostics = vscode.languages.getDiagnostics(doc.uri);
        const errors = diagnostics.filter(
          d => d.severity === vscode.DiagnosticSeverity.Error
        );

        console.log('On save diagnostics check:', errors.length, 'errors found');

        const fileKey = doc.uri.toString();

        if (errors.length === 0) {
          if (activeErrors[fileKey]) {
            delete activeErrors[fileKey];
            const celebrations = [
              { question: "You fixed it! What did you learn from that error?", hint: "Understanding why it broke helps you avoid it next time." },
              { question: "Great job! Can you explain what was wrong and how you fixed it?", hint: "Teaching yourself what you learned solidifies the knowledge." },
              { question: "Error gone! What was the root cause of that bug?", hint: "Reflecting on mistakes is how great developers grow." },
              { question: "Nice fix! How would you avoid this error in the future?", hint: "Building good habits now saves hours of debugging later." }
            ];
            const celebration = celebrations[Math.floor(Math.random() * celebrations.length)];
            provider.sendToPanel({
              command: 'successMessage',
              data: { question: celebration.question, hint: celebration.hint }
            });
          }
          return;
        }

        const topError = errors[0];
        const errorKey = `${topError.range.start.line}:${topError.message}`;

        if (activeErrors[fileKey] === errorKey) {
          console.log('Skipping duplicate error on save');
          return;
        }

        activeErrors[fileKey] = errorKey;

        const code = doc.getText();
        const language = doc.languageId;
        const fileName = doc.fileName.split(/[\\/]/).pop() || '';

        vscode.commands.executeCommand('devguide.panel.focus');

        provider.sendToPanel({
          command: 'loading',
          data: { line: topError.range.start.line + 1 }
        });

        console.log('Calling AI for error on save:', topError.message);
        const aiResponse = await getAIResponse(
          topError.message,
          fileName,
          language,
          code,
          topError.range.start.line + 1
        );

        let parsed = {
          question: `What does the error "${topError.message}" on line ${topError.range.start.line + 1} tell you?`,
          hint: "Read the error message carefully.",
          offerLesson: false,
          lessonTopic: ""
        };
        try {
          const match = aiResponse.message.match(/\{[\s\S]*\}/);
          if (match) parsed = JSON.parse(match[0]);
        } catch(e) {}

        provider.sendToPanel({
          command: 'aiInsight',
          data: {
            question: parsed.question,
            hint: parsed.hint,
            offerLesson: parsed.offerLesson || false,
            lessonTopic: parsed.lessonTopic || "",
            line: topError.range.start.line + 1,
            fileName,
            mistakeCount: aiResponse.mistakeCount,
            language
          }
        });
      }, 2000);
    })
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (!editor) return;
      provider.sendToPanel({
        command: 'fileSwitch',
        data: {
          fileName: editor.document.fileName.split(/[\\/]/).pop() || '',
          language: editor.document.languageId,
          lineCount: editor.document.lineCount,
          timestamp: Date.now()
        }
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('devguide.openPanel', () => {
      vscode.commands.executeCommand('devguide.panel.focus');
    })
  );
}

async function handleErrors(
  uri: vscode.Uri,
  activeErrors: Record<string, string>,
  provider: DevGuidePanel
) {
  const diagnostics = vscode.languages.getDiagnostics(uri);
  const errors = diagnostics.filter(
    d => d.severity === vscode.DiagnosticSeverity.Error
  );

  const fileKey = uri.toString();

  if (errors.length === 0) {
    if (activeErrors[fileKey]) {
      delete activeErrors[fileKey];
      const celebrations = [
        { question: "You fixed it! What did you learn from that error?", hint: "Understanding why it broke helps you avoid it next time." },
        { question: "Great job! Can you explain what was wrong and how you fixed it?", hint: "Teaching yourself what you learned solidifies the knowledge." },
        { question: "Error gone! What was the root cause of that bug?", hint: "Reflecting on mistakes is how great developers grow." },
        { question: "Nice fix! How would you avoid this error in the future?", hint: "Building good habits now saves hours of debugging later." }
      ];
      const celebration = celebrations[Math.floor(Math.random() * celebrations.length)];
      provider.sendToPanel({
        command: 'successMessage',
        data: { question: celebration.question, hint: celebration.hint }
      });
    }
    return;
  }

  const editor = vscode.window.activeTextEditor;
  const code = editor?.document.getText() || '';
  const language = editor?.document.languageId || 'unknown';
  const fileName = uri.path.split(/[\\/]/).pop() || '';
  const topError = errors[0];
  const errorKey = `${topError.range.start.line}:${topError.message}`;

  if (activeErrors[fileKey] === errorKey) {
    console.log('Skipping duplicate error');
    return;
  }

  activeErrors[fileKey] = errorKey;

  vscode.commands.executeCommand('devguide.panel.focus');

  provider.sendToPanel({
    command: 'loading',
    data: { line: topError.range.start.line + 1 }
  });

  console.log('Calling AI for error:', topError.message);
  const aiResponse = await getAIResponse(
    topError.message,
    fileName,
    language,
    code,
    topError.range.start.line + 1
  );

  let parsed = {
    question: `What does the error "${topError.message}" on line ${topError.range.start.line + 1} tell you?`,
    hint: "Read the error message carefully.",
    offerLesson: false,
    lessonTopic: ""
  };
  try {
    const match = aiResponse.message.match(/\{[\s\S]*\}/);
    if (match) parsed = JSON.parse(match[0]);
  } catch(e) {}

  provider.sendToPanel({
    command: 'aiInsight',
    data: {
      question: parsed.question,
      hint: parsed.hint,
      offerLesson: parsed.offerLesson || false,
      lessonTopic: parsed.lessonTopic || "",
      line: topError.range.start.line + 1,
      fileName,
      mistakeCount: aiResponse.mistakeCount,
      language
    }
  });
}

export function deactivate() {}