import * as vscode from 'vscode';

type MessageCallback = (text: string) => void;

export class DevGuidePanel implements vscode.WebviewViewProvider {
  public static readonly viewType = 'devguide.panel';
  private _view?: vscode.WebviewView;
  private _messageQueue: object[] = [];
  private _isReady: boolean = false;
  private _userMessageCallback?: MessageCallback;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public onUserMessage(callback: MessageCallback) {
    this._userMessageCallback = callback;
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
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

  public sendToPanel(message: object) {
    if (this._isReady && this._view) {
      this._view.webview.postMessage(message);
    } else {
      console.log('Queueing message');
      this._messageQueue.push(message);
    }
  }

  private _getHtml(): string {
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