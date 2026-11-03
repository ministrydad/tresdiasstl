import { passwordMatches, sessionCookie, readJson } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  let body;
  try { body = await readJson(req); } catch { return res.status(400).json({ error: 'Bad request' }); }

  // Small pause slows down password guessing
  await new Promise(r => setTimeout(r, 600));

  if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: 'The admin password has not been set up in Vercel yet.' });
  if (!passwordMatches(body.password)) return res.status(401).json({ error: 'That password is not right.' });

  res.setHeader('Set-Cookie', sessionCookie());
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true });
}
