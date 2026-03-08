const https = require('https');
const { DynamoDBClient, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');

const dynamo = new DynamoDBClient({ region: 'us-east-1' });
const MISTRAL_KEY = 'tfHijlhGUS3qfJgifIzypPHe40Qms7Gu';

function mistralRequest(prompt, maxTokens) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'mistral-small-latest',
      max_tokens: maxTokens || 300,
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
      res.on('data', chunk => data += chunk.toString());
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

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const { type, userId, errorMessage, fileName, language, code, line, userText } = body;

  try {
    if (type === 'error') {
      // Get mistake count from DynamoDB
      const key = `${language}:${(errorMessage || '').slice(0, 40)}`;
      let mistakeCount = 1;

      try {
        const getResult = await dynamo.send(new GetItemCommand({
          TableName: 'devguide-mistakes',
          Key: {
            userId: { S: userId || 'anonymous' },
            errorKey: { S: key }
          }
        }));
        if (getResult.Item) {
          mistakeCount = parseInt(getResult.Item.count.N) + 1;
        }
      } catch(e) {}

      // Save updated count
      await dynamo.send(new PutItemCommand({
        TableName: 'devguide-mistakes',
        Item: {
          userId: { S: userId || 'anonymous' },
          errorKey: { S: key },
          count: { N: mistakeCount.toString() },
          language: { S: language || '' },
          lastSeen: { S: new Date().toISOString() }
        }
      }));

      const codeLines = (code || '').split('\n');
      const errorLine = codeLines[(line || 1) - 1] || '';
      const context = codeLines.slice(Math.max(0, (line || 1) - 3), (line || 1) + 2).join('\n');

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
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          message: match ? match[0] : '{}',
          mistakeCount
        })
      };
    }

    if (type === 'chat') {
      const prompt = `You are DevGuide, a friendly Socratic coding mentor chatbot inside VS Code.
The developer just said: "${userText}"
Respond like a real helpful mentor. Be warm, specific, directly address EXACTLY what they said.
Reply ONLY with raw JSON, no markdown, no backticks:
{"question":"warm direct response plus follow-up question (2 sentences)","hint":"encouraging specific tip (1 sentence)"}`;

      const text = await mistralRequest(prompt, 200);
      const match = text.match(/\{[\s\S]*?\}/);

      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ message: match ? match[0] : '{}' })
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid type' }) };

  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};