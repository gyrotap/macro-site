// api/photos.js - Vercel Serverless Function for photo CRUD operations with Neon

import { neon } from '@neondatabase/serverless';

function getDb() {
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = getDb();

  try {
    switch (req.method) {
      case 'GET': {
        const { category, featured, limit = 100 } = req.query;

        let query;
        if (featured === 'true') {
          query = await sql`
            SELECT * FROM photos
            WHERE featured = true
            ORDER BY sort_order ASC
            LIMIT ${parseInt(limit)}
          `;
        } else if (category) {
          query = await sql`
            SELECT * FROM photos
            WHERE category = ${category}
            ORDER BY sort_order ASC
            LIMIT ${parseInt(limit)}
          `;
        } else {
          query = await sql`
            SELECT * FROM photos
            ORDER BY sort_order ASC
            LIMIT ${parseInt(limit)}
          `;
        }

        return res.status(200).json(query);
      }

      case 'POST': {
        const {
          image_url,
          title,
          category,
          subject,
          magnification,
          featured,
          sort_order,
          date_taken_month,
          date_taken_year,
          file_size_mb,
          megapixels
        } = req.body;

        const result = await sql`
          INSERT INTO photos (
            image_url, title, category, subject, magnification,
            featured, sort_order, date_taken_month, date_taken_year,
            file_size_mb, megapixels
          ) VALUES (
            ${image_url}, ${title}, ${category || null}, ${subject || null},
            ${magnification || null}, ${featured || false}, ${sort_order || 999},
            ${date_taken_month || null}, ${date_taken_year || null},
            ${file_size_mb || null}, ${megapixels || null}
          )
          RETURNING *
        `;

        return res.status(201).json(result[0]);
      }

      case 'DELETE': {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'Missing photo id' });
        }

        await sql`DELETE FROM photos WHERE id = ${id}`;
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
