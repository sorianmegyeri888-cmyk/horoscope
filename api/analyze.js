module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const prompt = req.body && req.body.prompt;
  if (!prompt) { res.status(400).json({ error: 'Hianyzó prompt' }); return; }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) { res.status(500).json({ error: 'Nincs API kulcs' }); return; }
  const https = require('https');
  const body = JSON.stringify({
    model: 'gpt-4o-mini',
    max_tokens: 4000,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Te egy kinai asztrológus vagy Theodora Lau rendszere alapjan. Mindig valid JSON-t adsz vissza. Mas szöveg nélkül.' },
      { role: 'user', content: prompt }
    ]
  });
  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'Content-Length': Buffer.byteLength(body)
    }
  };
  const reqAI = https.request(options, (resAI) => {
    let data = '';
    resAI.on('data', (chunk) => { data += chunk; });
    resAI.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) { res.status(500).json({ error: parsed.error.message }); return; }
        const content = parsed.choices[0].message.content;
        const result = JSON.parse(content);
        res.status(200).json(result);
      } catch(e) {
        res.status(500).json({ error: 'Parse hiba: ' + e.message });
      }
    });
  });
  reqAI.on('error', (e) => { res.status(500).json({ error: 'Hiba: ' + e.message }); });
  reqAI.write(body);
  reqAI.end();
};
