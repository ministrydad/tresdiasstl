# Tres Dias of St. Louis — Website

Plain HTML + CSS. No build step needed.

## Folder layout
```
index.html        Home page
css/styles.css    All the styling
fonts/            Raleway, Barlow, Oswald (stored here so they always load)
images/           All photos and the cross logo
```

## Put it on GitHub + Vercel
1. Create a new repository on GitHub (for example `tresdias-stl`).
2. Upload everything in this folder to it (drag and drop works on github.com).
3. In Vercel, click **Add New → Project**, pick the repository, and click **Deploy**.
   Leave the settings at their defaults. "Framework Preset" should say **Other**.
4. To use your own web address, open the project in Vercel → **Settings → Domains**
   and add `tresdiasstl.org` (and `www.tresdiasstl.org`). Vercel shows the DNS records to enter.

## Before going live
- **Newsletter form:** in `index.html`, look for the `MAILCHIMP` note and paste in your
  form address from Mailchimp (Audience → Signup forms → Embedded forms).
- **Other pages:** the menu links to `contact.html`, `about.html`, `team.html`,
  `attend.html`, `values.html` and `secuela.html`. These still need to be built.
- **Event cards:** dates and text are in `index.html` under "EVENT CARDS".

## Unused photos (for other pages)
campfire.jpg, marshmallow.jpg, holding-hands.jpg, guitar.jpg, grill.jpg,
football.jpg, football-small.jpg
