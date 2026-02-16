// api/next-sort-order.js - Get the next available sort order number

import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM photos
    `;
    return res.status(200).json({ next_order: result[0].next_order });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
