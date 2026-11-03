# Tres Dias of St. Louis — Website

Plain HTML + CSS pages, hosted on Vercel, with a small password-protected
editor for weekend dates and Secuela details.

## Pages
| File            | Page                |
|-----------------|---------------------|
| index.html      | Home                |
| about.html      | About               |
| attend.html     | Attend a Weekend    |
| values.html     | Values & Beliefs    |
| team.html       | Team (Square fee)   |
| secuela.html    | Secuela             |
| admin.html      | Team Login / editor |

## Team editor (one-time setup in Vercel)
1. Open the project in Vercel → **Storage** → **Create** → **Blob**.
   Choose **Private**, then connect it to this project (all environments).
   This adds `BLOB_READ_WRITE_TOKEN` automatically.
2. Project → **Settings → Environment Variables** → add
   `ADMIN_PASSWORD` = the team password. Apply to all environments.
3. **Redeploy** (Deployments → ⋯ → Redeploy) so the new settings load.
4. Go to `/admin.html`, log in, and click **Save Changes** once.

Use a long password (at least 12 characters, e.g. three or four random words).
To change the password later: edit `ADMIN_PASSWORD` in Vercel and redeploy.
Everyone is logged out when the password changes. Logins last 8 hours.

## How the info flows
- `js/weekends.js` and `js/secuela.js` hold the starting info. The site uses
  these until something is saved from the editor (and as a backup if storage
  is ever unreachable).
- After saving, the pages read the saved info from `/api/content`.
  Changes appear within about a minute.
- `api/` holds the small server functions (login, logout, load/save).

## Files to swap
- Brochure: `files/tres-dias-stl-brochure.pdf` (keep the same name).
- Paper application: `files/Tres-Dias-of-St-Louis-Application.pdf` (keep the same name).
- Online application: Team Tools Pro link in `attend.html` (look for `ONLINE APPLICATION`).

## Other files
- `404.html` — shown when someone visits an address that doesn't exist.
- `vercel.json` — basic security and caching settings for Vercel.
- Contact form: sends through Web3Forms to chairman@tresdiasstl.org
  (access key is in `contact.html`; it is safe to be public).

## Sharing and search
- Share image: `images/share.jpg` (1200×630), used when links are posted on
  Facebook, in texts, etc. Icons: `favicon.ico` and `images/`.
- `sitemap.xml` and `robots.txt` help Google; the admin page is kept out.
- `vercel.json` also redirects old Wix addresses (like /about) to the new pages.
- Main address used in these files: https://tresdiasstl.org
