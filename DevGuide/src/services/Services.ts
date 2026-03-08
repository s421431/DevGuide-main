import * as https from 'https';

const API_ENDPOINT = 'fy1i55we5h.execute-api.us-east-1.amazonaws.com';
const API_PATH = '/prod/mentor';
const MISTRAL_KEY = 'tfHijlhGUS3qfJgifIzypPHe40Qms7Gu';

const mistakeTracker: Record<string, number> = {};

function apiRequest(body: object): Promise<any> {
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
        } catch(e) {
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
function mistralRequest(prompt: string, maxTokens: number = 300): Promise<string> {
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
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(bodyBuffer);
    req.end();
  });
}

export async function getAIResponse(
  errorMessage: string,
  fileName: string,
  language: string,
  code: string,
  line: number
): Promise<AIResponse> {

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
  } catch(err) {
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
  } catch(err) {
    return {
      message: getFallbackMessage(mistakeCount, language, errorMessage, errorLine, line),
      mistakeCount,
      shouldSuggestLesson: mistakeCount >= 3,
      language,
      errorType: errorMessage.slice(0, 40)
    };
  }
}

export async function getUserMessageResponse(userText: string): Promise<{question: string, hint: string}> {
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
        if (parsed.question && parsed.hint) return parsed;
      }
    }
  } catch(err) {
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
      if (parsed.question && parsed.hint) return parsed;
    }
  } catch(err) {
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

function getFallbackMessage(mistakeCount: number, language: string, errorMessage: string, errorLine: string, line: number): string {
  return JSON.stringify({
    question: `On line ${line} you have "${errorLine.trim()}" — what does the error "${errorMessage}" tell you is wrong here?`,
    hint: `Look carefully at line ${line} and compare it to what ${language} expects syntactically.`,
    offerLesson: mistakeCount >= 3,
    lessonTopic: language + " syntax"
  });
}

export interface AIResponse {
  message: string;
  mistakeCount: number;
  shouldSuggestLesson: boolean;
  language: string;
  errorType: string;
}