// Shared helpers for the admin editor. Files starting with "_" are not public URLs.
import crypto from 'node:crypto';

export const BLOB_PATH = 'site-content.json';
export const BLOB_ACCESS = process.env.BLOB_ACCESS || 'private';
const COOKIE = 'td_admin';
const SESSION_HOURS = 8;

function secret() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('ADMIN_PASSWORD is not set in Vercel');
  return crypto.createHash('sha256').update('td-session:' + pw).digest();
}

function sign(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

export function passwordMatches(input) {
  const pw = process.env.ADMIN_PASSWORD || '';
  const a = crypto.createHash('sha256').update(String(input || '')).digest();
  const b = crypto.createHash('sha256').update(pw).digest();
  return pw.length > 0 && crypto.timingSafeEqual(a, b);
}

export function sessionCookie() {
  const exp = String(Date.now() + SESSION_HOURS * 3600 * 1000);
  const token = exp + '.' + sign(exp);
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`;
}

export function clearCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function isLoggedIn(req) {
  const raw = req.headers.cookie || '';
  const m = raw.match(new RegExp('(?:^|;\\s*)' + COOKIE + '=([^;]+)'));
  if (!m) return false;
  const [exp, sig] = m[1].split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  try {
    const good = Buffer.from(sign(exp));
    const got = Buffer.from(sig);
    return good.length === got.length && crypto.timingSafeEqual(good, got);
  } catch { return false; }
}

// ---------- Checking what the editor sends before saving ----------
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{1,2}:\d{2}\s?(AM|PM)$/i;
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function cleanContent(body) {
  const errors = [];
  const weekends = Array.isArray(body?.weekends) ? body.weekends : [];
  const w = weekends.slice(0, 30).map((x, i) => {
    const row = {
      type: x?.type === 'women' ? 'women' : x?.type === 'men' ? 'men' : '',
      number: Number.parseInt(x?.number, 10),
      start: str(x?.start, 10),
      end: str(x?.end, 10)
    };
    if (!row.type) errors.push(`Weekend ${i + 1}: choose Men or Women.`);
    if (!Number.isFinite(row.number) || row.number < 1) errors.push(`Weekend ${i + 1}: enter a weekend number.`);
    if (!DATE.test(row.start) || !DATE.test(row.end)) errors.push(`Weekend ${i + 1}: enter both dates.`);
    else if (row.end < row.start) errors.push(`Weekend ${i + 1}: the end date is before the start date.`);
    return row;
  });

  const s = body?.secuela || {};
  const sec = {
    title: str(s.title, 80),
    note: str(s.note, 120),
    date: str(s.date, 10),
    start: str(s.start, 8),
    end: str(s.end, 8),
    place: str(s.place, 120),
    address: str(s.address, 160),
    city: str(s.city, 120),
    bring: (Array.isArray(s.bring) ? s.bring : []).slice(0, 20)
      .map(b => ({ letters: str(b?.letters, 20), item: str(b?.item, 120) }))
      .filter(b => b.letters || b.item)
  };
  if (!sec.title) errors.push('Secuela: enter an event name.');
  if (!DATE.test(sec.date)) errors.push('Secuela: enter a date.');
  if (!TIME.test(sec.start) || !TIME.test(sec.end)) errors.push('Secuela: enter start and end times like 11:00 AM.');
  if (!sec.place) errors.push('Secuela: enter a location name.');

  return { errors, content: { weekends: w, secuela: sec, updatedAt: new Date().toISOString() } };
}

export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  let data = '';
  for await (const chunk of req) data += chunk;
  return data ? JSON.parse(data) : {};
}
