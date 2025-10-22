import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5173;

// Allowlist of demo lab domains
const ALLOWLIST = [
  'testphp.vulnweb.com',
  'juice-shop.herokuapp.com',
  'juice-shop.github.io',
  'badssl.com'
];

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/proxy', async (req, res) => {
  try {
    const target = req.query.url;
    if (!target || typeof target !== 'string') {
      return res.status(400).send('Missing url param');
    }

    const urlObj = new URL(target);
    if (!ALLOWLIST.includes(urlObj.hostname)) {
      return res.status(403).send('Domain not allowed');
    }

    const upstream = await fetch(target, { redirect: 'follow' });

    // Copy headers but strip frame-blocking
    upstream.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (['x-frame-options', 'content-security-policy'].includes(lower)) return;
      res.setHeader(key, value);
    });

    // Force permissive frame headers for demo
    res.setHeader('X-Frame-Options', '');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self' *");

    const body = await upstream.arrayBuffer();
    res.status(upstream.status).send(Buffer.from(body));
  } catch (err) {
    console.error(err);
    res.status(500).send('Proxy error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});

// Simple endpoint to receive proctoring logs from demo page and print to terminal
app.post('/proctor-logs', (req, res) => {
  try {
    const payload = req.body;
    console.log('[PROCTOR-LOG]', new Date().toISOString(), JSON.stringify(payload));
    res.status(200).send({ ok: true });
  } catch (err) {
    console.error('proctor log error', err);
    res.status(500).send({ ok: false });
  }
});

// Test endpoint to check model availability
app.get('/test-models', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const modelsPath = path.join(process.cwd(), 'public', 'models');
    const cascadePath = path.join(modelsPath, 'haarcascade_frontalface_default.xml');
    const faceApiPath = path.join(modelsPath, 'face-api');
    const manifestPath = path.join(faceApiPath, 'tiny_face_detector_model-weights_manifest.json');
    const shardPath = path.join(faceApiPath, 'tiny_face_detector_model-shard1');
    
    const results = {
      cascade: fs.existsSync(cascadePath),
      faceApiDir: fs.existsSync(faceApiPath),
      manifest: fs.existsSync(manifestPath),
      shard: fs.existsSync(shardPath),
      cascadeSize: fs.existsSync(cascadePath) ? fs.statSync(cascadePath).size : 0,
      shardSize: fs.existsSync(shardPath) ? fs.statSync(shardPath).size : 0
    };
    
    console.log('Model availability check:', results);
    res.json(results);
  } catch (err) {
    console.error('Model check error:', err);
    res.status(500).json({ error: err.message });
  }
});