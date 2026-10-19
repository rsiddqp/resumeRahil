# Rahil Siddique — one-page resume

Static site. No build step. Open `index.html` locally or drop the folder on any static host.

## Local preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy (pick one)

- **Cloudflare Pages / Netlify / GitHub Pages:** publish this folder; set the root to `/`.
- **Any S3 / Azure Blob static website:** upload `index.html`, `styles.css`, `script.js`.

Fonts and icons load from Google Fonts and unpkg (Lucide).

## Edit

- Copy in `resume.md`
- Layout and content: `index.html`
- Look: `styles.css`
- Menu / year: `script.js`
