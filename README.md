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

To change the password later: edit `ADMIN_PASSWORD` in Vercel and redeploy.
Everyone is logged out when the password changes.

## How the info flows
- `js/weekends.js` and `js/secuela.js` hold the starting info. The site uses
  these until something is saved from the editor (and as a backup if storage
  is ever unreachable).
- After saving, the pages read the saved info from `/api/content`.
  Changes appear within about a minute.
- `api/` holds the small server functions (login, logout, load/save).

## Files to swap
- Brochure: `files/tres-dias-stl-brochure.pdf` (keep the same name).
- Applications: in `attend.html`, look for `PAPER APPLICATION` and
  `ONLINE APPLICATION` notes and replace the `#` links.
- Facebook: in each page's footer, look for the `FACEBOOK` note.
