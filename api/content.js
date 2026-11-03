// GET  /api/content  -> the saved weekend dates and Secuela details (public)
// POST /api/content  -> save new details (admin only)
import { get, put } from '@vercel/blob';
import { BLOB_PATH, BLOB_ACCESS, isLoggedIn, cleanContent, readJson } from './_lib.js';

async function load() {
  const result = await get(BLOB_PATH, { access: BLOB_ACCESS, useCache: false });
  if (!result || result.statusCode !== 200) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await load();
      if (!data) {
        res.setHeader('Cache-Control', 'public, s-maxage=30');
        return res.status(404).json({ error: 'Nothing saved yet' });
      }
      // Cached for 30 seconds so busy days don't overload storage
      res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
      return res.status(200).json(data);
    } catch (e) {
      if (e?.name === 'BlobNotFoundError') {
        res.setHeader('Cache-Control', 'public, s-maxage=30');
        return res.status(404).json({ error: 'Nothing saved yet' });
      }
      console.error(e);
      return res.status(500).json({ error: 'Could not load content' });
    }
  }

  if (req.method === 'POST') {
    res.setHeader('Cache-Control', 'no-store');
    if (!isLoggedIn(req)) return res.status(401).json({ error: 'Please log in again.' });

    let body;
    try { body = await readJson(req); } catch { return res.status(400).json({ error: 'Bad request' }); }

    const { errors, content } = cleanContent(body);
    if (errors.length) return res.status(400).json({ error: 'Please fix these first:', details: errors });

    try {
      await put(BLOB_PATH, JSON.stringify(content, null, 2), {
        access: BLOB_ACCESS,
        allowOverwrite: true,
        addRandomSuffix: false,
        contentType: 'application/json',
        cacheControlMaxAge: 60
      });
      return res.status(200).json({ ok: true, content });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Saving failed. Check that the Blob storage is connected in Vercel.' });
    }
  }

  return res.status(405).json({ error: 'Use GET or POST' });
}
