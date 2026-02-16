// api/login.js - Server-side authentication endpoint

import crypto from 'crypto';

// Generate a signed session token
function generateToken(username) {
  const secret = process.env.ADMIN_PASSWORD + process.env.DATABASE_URL;
  const payload = `${username}:${Date.now()}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  // Token format: base64(payload):signature
  const token = Buffer.from(payload).toString('base64') + '.' + signature;
  return token;
}

// Verify a session token (valid for 24 hours)
export function verifyToken(token) {
  if (!token) return false;

  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return false;

    const payload = Buffer.from(payloadB64, 'base64').toString();
    const [username, timestamp] = payload.split(':');

    // Check if token is expired (24 hours)
    const age = Date.now() - parseInt(timestamp);
    if (age > 24 * 60 * 60 * 1000) return false;

    // Verify signature
    const secret = process.env.ADMIN_PASSWORD + process.env.DATABASE_URL;
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (signature !== expectedSignature) return false;

    return { username, timestamp: parseInt(timestamp) };
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    return res.status(500).json({ error: 'Server auth not configured' });
  }

  if (username === validUsername && password === validPassword) {
    const token = generateToken(username);
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
