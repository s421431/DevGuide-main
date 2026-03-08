/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const DevGuidePanel_1 = __webpack_require__(2);
const Services_1 = __webpack_require__(3);
function activate(context) {
    console.log('DevGuide is now active');
    const provider = new DevGuidePanel_1.DevGuidePanel(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(DevGuidePanel_1.DevGuidePanel.viewType, provider, { webviewOptions: { retainContextWhenHidden: true } }));
    provider.onUserMessage(async (text) => {
        console.log('User message received:', text);
        const result = await (0, Services_1.getUserMessageResponse)(text);
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
    let debounceTimer;
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((event) => {
        const doc = event.document;
        if (doc.uri.scheme !== 'file')
            return;
        if (debounceTimer)
            clearTimeout(debounceTimer);
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
    }));
    // Track active errors per file
    const activeErrors = {};
    // Trigger on diagnostics change (VS Code)
    let diagTimer;
    context.subscriptions.push(vscode.languages.onDidChangeDiagnostics((event) => {
        if (diagTimer)
            clearTimeout(diagTimer);
        diagTimer = setTimeout(async () => {
            for (const uri of event.uris) {
                await handleErrors(uri, activeErrors, provider);
            }
        }, 2000);
    }));
    // Trigger on file save (Kiro)
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(async (doc) => {
        if (doc.uri.scheme !== 'file')
            return;
        setTimeout(async () => {
            const diagnostics = vscode.languages.getDiagnostics(doc.uri);
            const errors = diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error);
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
            const aiResponse = await (0, Services_1.getAIResponse)(topError.message, fileName, language, code, topError.range.start.line + 1);
            let parsed = {
                question: `What does the error "${topError.message}" on line ${topError.range.start.line + 1} tell you?`,
                hint: "Read the error message carefully.",
                offerLesson: false,
                lessonTopic: ""
            };
            try {
                const match = aiResponse.message.match(/\{[\s\S]*\}/);
                if (match)
                    parsed = JSON.parse(match[0]);
            }
            catch (e) { }
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
    }));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (!editor)
            return;
        provider.sendToPanel({
            command: 'fileSwitch',
            data: {
                fileName: editor.document.fileName.split(/[\\/]/).pop() || '',
                language: editor.document.languageId,
                lineCount: editor.document.lineCount,
                timestamp: Date.now()
            }
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('devguide.openPanel', () => {
        vscode.commands.executeCommand('devguide.panel.focus');
    }));
}
async function handleErrors(uri, activeErrors, provider) {
    const diagnostics = vscode.languages.getDiagnostics(uri);
    const errors = diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error);
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
    const aiResponse = await (0, Services_1.getAIResponse)(topError.message, fileName, language, code, topError.range.start.line + 1);
    let parsed = {
        question: `What does the error "${topError.message}" on line ${topError.range.start.line + 1} tell you?`,
        hint: "Read the error message carefully.",
        offerLesson: false,
        lessonTopic: ""
    };
    try {
        const match = aiResponse.message.match(/\{[\s\S]*\}/);
        if (match)
            parsed = JSON.parse(match[0]);
    }
    catch (e) { }
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
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevGuidePanel = void 0;
class DevGuidePanel {
    _extensionUri;
    static viewType = 'devguide.panel';
    _view;
    _messageQueue = [];
    _isReady = false;
    _userMessageCallback;
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    onUserMessage(callback) {
        this._userMessageCallback = callback;
    }
    resolveWebviewView(webviewView, _context, _token) {
        this._view = webviewView;
        this._isReady = true;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtml();
        webviewView.webview.onDidReceiveMessage((message) => {
            if (message.command === 'ready') {
                console.log('Webview ready, flushing', this._messageQueue.length, 'queued messages');
                const queue = [...this._messageQueue];
                this._messageQueue = [];
                queue.forEach((msg, i) => {
                    setTimeout(() => {
                        webviewView.webview.postMessage(msg);
                    }, i * 300);
                });
            }
            if (message.command === 'userMessage') {
                console.log('Panel userMessage received');
                if (this._userMessageCallback) {
                    this._userMessageCallback(message.text);
                }
            }
        });
    }
    sendToPanel(message) {
        if (this._isReady && this._view) {
            this._view.webview.postMessage(message);
        }
        else {
            console.log('Queueing message');
            this._messageQueue.push(message);
        }
    }
    _getHtml() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>DevGuide</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #0f0f0f;
  color: #e0e0e0;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
.header {
  padding: 14px 16px;
  border-bottom: 1px solid #1e1e2e;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.title { font-size: 15px; color: #7c6af7; font-weight: 700; }
.status-dot {
  width: 8px; height: 8px;
  background: #4caf50;
  border-radius: 50%;
  margin-left: auto;
  animation: pulse 2s infinite;
}
.feed {
  flex: 1; overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card {
  background: #13131f;
  border-radius: 10px;
  padding: 14px;
  border-left: 3px solid #7c6af7;
  flex-shrink: 0;
}
.error-card { border-left-color: #f44336; }
.success-card { border-left-color: #4caf50; background: #0d1f0d; }
.loading-card { border-left-color: #555; opacity: 0.6; }
.file-card { border-left-color: #2196f3; }
.user-card { border-left-color: #888; }
.card-header { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.card-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; }
.card-line { font-size: 10px; color: #555; margin-left: auto; }
.question { font-size: 13px; color: #e0e0e0; line-height: 1.6; margin-bottom: 10px; font-style: italic; }
.hint { font-size: 12px; color: #aaa; line-height: 1.5; padding: 8px 10px; background: #1a1a2e; border-radius: 6px; margin-bottom: 10px; }
.hint-label { font-size: 10px; color: #7c6af7; font-weight: 600; margin-bottom: 3px; }
.mistake-count { font-size: 10px; color: #f44336; margin-bottom: 8px; }
.lesson-offer { background: #0a2a0a; border: 1px solid #4caf50; border-radius: 8px; padding: 10px 12px; margin-top: 8px; }
.lesson-title { font-size: 12px; color: #4caf50; font-weight: 600; margin-bottom: 6px; }
.lesson-desc { font-size: 11px; color: #aaa; margin-bottom: 10px; }
.btn-row { display: flex; gap: 8px; }
.btn { padding: 5px 14px; border-radius: 20px; border: none; cursor: pointer; font-size: 11px; font-weight: 600; }
.btn-yes { background: #4caf50; color: #000; }
.btn-skip { background: #1e1e2e; color: #888; }
.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; opacity: 0.35; text-align: center; padding: 20px; }
.empty-icon { font-size: 36px; }
.empty-text { font-size: 12px; line-height: 1.6; }
.input-area { padding: 10px 12px; border-top: 1px solid #1e1e2e; display: flex; gap: 8px; flex-shrink: 0; }
.input-box { flex: 1; background: #1a1a2e; border: 1px solid #333; border-radius: 20px; padding: 7px 14px; color: #e0e0e0; font-size: 12px; outline: none; font-family: 'Segoe UI', sans-serif; }
.input-box::placeholder { color: #555; }
.input-box:focus { border-color: #7c6af7; }
.send-btn { background: #7c6af7; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
.send-btn:hover { background: #6a58e0; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
</style>
</head>
<body>
<div class="header">
  <div style="font-size:22px">&#129504;</div>
  <div class="title">DevGuide</div>
  <div class="status-dot"></div>
</div>
<div class="feed" id="feed">
  <div class="empty" id="empty">
    <div class="empty-icon">&#128064;</div>
    <div class="empty-text">Start coding and I will guide you<br/>through your mistakes Socratically.</div>
  </div>
</div>
<div class="input-area">
  <input class="input-box" id="userInput" placeholder="Ask DevGuide anything..." />
  <button class="send-btn" id="sendBtn">&#10148;</button>
</div>
<script>
var vscode = acquireVsCodeApi();
var feed = document.getElementById('feed');
var empty = document.getElementById('empty');
var userInput = document.getElementById('userInput');
var sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  var text = userInput.value.trim();
  if (!text) return;
  addUserCard(text);
  vscode.postMessage({ command: 'userMessage', text: text });
  userInput.value = '';
}

function addUserCard(text) {
  hideEmpty();
  var card = document.createElement('div');
  card.className = 'card user-card';
  card.innerHTML = '<div class="card-header"><span>&#129489;</span><span class="card-tag">You</span></div><div class="question" style="font-style:normal">' + text + '</div>';
  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
}

window.addEventListener('message', function(event) {
  var msg = event.data;
  if (!msg || !msg.command) return;

  if (msg.command === 'loading') {
    hideEmpty();
    addLoadingCard(msg.data.line);
  } else if (msg.command === 'aiInsight') {
    removeLoadingCards();
    hideEmpty();
    addInsightCard(msg.data);
  } else if (msg.command === 'clearErrors') {
    removeErrorCards();
    addSuccessCard();
  } else if (msg.command === 'codeContext') {
    if (feed.querySelectorAll('.card').length === 0) {
      addEditCard(msg.data);
    }
  } else if (msg.command === 'fileSwitch') {
    addFileCard(msg.data);
  } else if (msg.command === 'successMessage') {
  removeLoadingCards();
  var card = document.createElement('div');
  card.className = 'card success-card';
  card.innerHTML = '<div class="card-header"><span>&#9989;</span><span class="card-tag">DevGuide &middot; Fixed!</span></div><div class="question" style="color:#4caf50;font-style:normal">&#127881; ' + msg.data.question + '</div><div class="hint"><div class="hint-label">&#128161; Reflect</div>' + msg.data.hint + '</div>';
  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
  }
});

function hideEmpty() {
  empty.style.display = 'none';
}

function removeErrorCards() {
  var cards = feed.querySelectorAll('.error-card');
  cards.forEach(function(c) { c.remove(); });
  removeLoadingCards();
}

function addSuccessCard() {
  var existing = document.getElementById('successCard');
  if (existing) existing.remove();
  var card = document.createElement('div');
  card.className = 'card success-card';
  card.id = 'successCard';
  card.innerHTML = '<div class="card-header"><span>&#9989;</span><span class="card-tag">Error Fixed!</span></div><div class="question" style="font-style:normal;color:#4caf50">Great job fixing the error! Keep coding &#128170;</div>';
  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
  setTimeout(function() {
    if (card.parentNode) card.remove();
  }, 4000);
}

function addLoadingCard(line) {
  removeLoadingCards();
  var card = document.createElement('div');
  card.className = 'card loading-card';
  card.id = 'loadingCard';
  card.innerHTML = '<div class="card-header"><span>&#9203;</span><span class="card-tag">Analyzing line ' + line + '...</span></div>';
  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
}

function removeLoadingCards() {
  var lc = document.getElementById('loadingCard');
  if (lc) lc.remove();
}

function addInsightCard(data) {
  var cards = feed.querySelectorAll('.card');
  if (cards.length >= 20) cards[0].remove();

  var card = document.createElement('div');
  card.className = 'card error-card';

  var mistakeHtml = data.mistakeCount > 1 ? '<div class="mistake-count">&#9888;&#65039; You have made this mistake ' + data.mistakeCount + ' times this session</div>' : '';

  var lessonHtml = '';
  if (data.offerLesson) {
    lessonHtml = '<div class="lesson-offer"><div class="lesson-title">&#128218; Micro Lesson Available</div><div class="lesson-desc">Struggling with <strong>' + data.lessonTopic + '</strong>. Want a 2-min lesson?</div><div class="btn-row"><button class="btn btn-yes">Yes, teach me</button><button class="btn btn-skip">Skip</button></div></div>';
  }

  var lineLabel = data.line > 0 ? 'line ' + data.line : 'chat';
  card.innerHTML = '<div class="card-header"><span>&#129300;</span><span class="card-tag">DevGuide &middot; ' + data.language + '</span><span class="card-line">' + lineLabel + '</span></div>' + mistakeHtml + '<div class="question">' + data.question + '</div><div class="hint"><div class="hint-label">&#128161; Hint</div>' + data.hint + '</div>' + lessonHtml;

  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
}

function addEditCard(data) {
  hideEmpty();
  var card = document.createElement('div');
  card.className = 'card';
  card.style.borderLeftColor = '#444';
  card.innerHTML = '<div class="card-header"><span>&#9999;</span><span class="card-tag">Editing ' + data.fileName + '</span></div>';
  feed.appendChild(card);
}

function addFileCard(data) {
  var card = document.createElement('div');
  card.className = 'card file-card';
  card.innerHTML = '<div class="card-header"><span>&#128194;</span><span class="card-tag">Switched to ' + data.fileName + '</span></div>';
  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
}

vscode.postMessage({ command: 'ready' });
</script>
</body>
</html>`;
    }
}
exports.DevGuidePanel = DevGuidePanel;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAIResponse = getAIResponse;
exports.getUserMessageResponse = getUserMessageResponse;
const https = __importStar(__webpack_require__(4));
const API_ENDPOINT = 'fy1i55we5h.execute-api.us-east-1.amazonaws.com';
const API_PATH = '/prod/mentor';
const MISTRAL_KEY = 'tfHijlhGUS3qfJgifIzypPHe40Qms7Gu';
const mistakeTracker = {};
function apiRequest(body) {
    return new Promise((resolve, reject) => {
        const bodyStr = JSON.stringify(body);
        const bodyBuffer = Buffer.from(bodyStr, 'utf8');
        const options = {
            hostname: API_ENDPOINT,
            path: API_PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': bodyBuffer.length
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk.toString(); });
            res.on('end', () => {
                try {
                    console.log('API status:', res.statusCode);
                    const parsed = JSON.parse(data);
                    const inner = typeof parsed.body === 'string' ? JSON.parse(parsed.body) : parsed;
                    console.log('API response:', JSON.stringify(inner).slice(0, 200));
                    resolve(inner);
                }
                catch (e) {
                    console.error('API parse error:', e);
                    reject(e);
                }
            });
        });
        req.on('error', (e) => {
            console.error('API request error:', e);
            reject(e);
        });
        req.write(bodyBuffer);
        req.end();
    });
}
// Fallback direct Mistral if Lambda fails
function mistralRequest(prompt, maxTokens = 300) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            model: 'mistral-small-latest',
            max_tokens: maxTokens,
            messages: [{ role: 'user', content: prompt }]
        });
        const bodyBuffer = Buffer.from(body, 'utf8');
        const options = {
            hostname: 'api.mistral.ai',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MISTRAL_KEY}`,
                'Content-Length': bodyBuffer.length
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk.toString(); });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed.choices?.[0]?.message?.content || '');
                }
                catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
        req.write(bodyBuffer);
        req.end();
    });
}
async function getAIResponse(errorMessage, fileName, language, code, line) {
    const key = `${language}:${errorMessage.slice(0, 40)}`;
    mistakeTracker[key] = (mistakeTracker[key] || 0) + 1;
    const mistakeCount = mistakeTracker[key];
    try {
        // Try Lambda first
        const result = await apiRequest({
            type: 'error',
            userId: 'devguide-user',
            errorMessage,
            fileName,
            language,
            code,
            line
        });
        if (result.message) {
            return {
                message: result.message,
                mistakeCount: result.mistakeCount || mistakeCount,
                shouldSuggestLesson: mistakeCount >= 3,
                language,
                errorType: errorMessage.slice(0, 40)
            };
        }
    }
    catch (err) {
        console.error('Lambda error, falling back to Mistral:', err);
    }
    // Fallback to direct Mistral
    const codeLines = code.split('\n');
    const errorLine = codeLines[line - 1] || '';
    const context = codeLines.slice(Math.max(0, line - 3), line + 2).join('\n');
    try {
        const prompt = `You are DevGuide, a Socratic coding mentor inside VS Code.
A ${language} developer has this error:
Error: "${errorMessage}"
File: ${fileName}, Line ${line}: ${errorLine}
Nearby code:
${context}
Mistake count: ${mistakeCount}
Ask ONE very specific Socratic question referencing the EXACT code on line ${line}. Never give the answer.
Reply ONLY with raw JSON, no markdown, no backticks:
{"question":"specific question","hint":"specific hint","offerLesson":${mistakeCount >= 3},"lessonTopic":"${mistakeCount >= 3 ? language + ' basics' : ''}"}`;
        const text = await mistralRequest(prompt, 300);
        const match = text.match(/\{[\s\S]*?\}/);
        return {
            message: match ? match[0] : getFallbackMessage(mistakeCount, language, errorMessage, errorLine, line),
            mistakeCount,
            shouldSuggestLesson: mistakeCount >= 3,
            language,
            errorType: errorMessage.slice(0, 40)
        };
    }
    catch (err) {
        return {
            message: getFallbackMessage(mistakeCount, language, errorMessage, errorLine, line),
            mistakeCount,
            shouldSuggestLesson: mistakeCount >= 3,
            language,
            errorType: errorMessage.slice(0, 40)
        };
    }
}
async function getUserMessageResponse(userText) {
    try {
        // Try Lambda first
        const result = await apiRequest({
            type: 'chat',
            userId: 'devguide-user',
            userText
        });
        if (result.message) {
            const match = result.message.match(/\{[\s\S]*?\}/);
            if (match) {
                const parsed = JSON.parse(match[0]);
                if (parsed.question && parsed.hint)
                    return parsed;
            }
        }
    }
    catch (err) {
        console.error('Lambda chat error, falling back to Mistral:', err);
    }
    // Fallback to direct Mistral
    try {
        const prompt = `You are DevGuide, a friendly Socratic coding mentor chatbot inside VS Code.
The developer just said: "${userText}"
Respond like a real helpful mentor. Be warm, specific, directly address EXACTLY what they said.
Reply ONLY with raw JSON, no markdown, no backticks:
{"question":"warm direct response plus follow-up question (2 sentences)","hint":"encouraging specific tip (1 sentence)"}`;
        const text = await mistralRequest(prompt, 200);
        const match = text.match(/\{[\s\S]*?\}/);
        if (match) {
            const parsed = JSON.parse(match[0]);
            if (parsed.question && parsed.hint)
                return parsed;
        }
    }
    catch (err) {
        console.error('Mistral fallback error:', err);
    }
    const lower = userText.toLowerCase();
    if (lower.includes('bracket') || lower.includes('parenthes')) {
        return { question: "Good catch! Do you now have a habit of closing brackets immediately when you open them?", hint: "Try typing both brackets first, then write the content inside." };
    }
    if (lower.includes('forgot') || lower.includes('forget')) {
        return { question: "That self-awareness is great! What habit could you build to catch this earlier?", hint: "Great developers use linters to catch these automatically." };
    }
    if (lower.includes('fixed') || lower.includes('solved')) {
        return { question: "Excellent! Can you explain in one sentence what was wrong and why your fix worked?", hint: "Saying the fix out loud cements the learning." };
    }
    return { question: `You mentioned "${userText}" — what part of this are you finding most challenging?`, hint: "Breaking the problem into smaller pieces makes any challenge manageable." };
}
function getFallbackMessage(mistakeCount, language, errorMessage, errorLine, line) {
    return JSON.stringify({
        question: `On line ${line} you have "${errorLine.trim()}" — what does the error "${errorMessage}" tell you is wrong here?`,
        hint: `Look carefully at line ${line} and compare it to what ${language} expects syntactically.`,
        offerLesson: mistakeCount >= 3,
        lessonTopic: language + " syntax"
    });
}


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("https");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map