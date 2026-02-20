// api/upload.js - Server-side image upload to Sanity CDN

import { createClient } from '@sanity/client';
import { verifyToken } from './login.js';

function getSanityClient() {
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify authentication
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Expect base64-encoded image data from client
    const { imageData, filename, contentType } = req.body;

    if (!imageData || !filename) {
      return res.status(400).json({ error: 'Missing imageData or filename' });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(imageData, 'base64');

    const client = getSanityClient();
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType: contentType || 'image/webp',
    });

    // Build CDN URL
    const projectId = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET || 'production';
    const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${asset._id.replace('image-', '').replace(/-([^-]+)$/, '.$1')}`;

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message });
  }
}
