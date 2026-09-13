# prem.dev — Portfolio 2.0

Personal portfolio for **Prem Kumar Srivastava** — Software Developer.
Built as a fast, dependency-free static site: plain HTML, CSS and JavaScript, deployed automatically to GitHub Pages on every push to `main`.

**Live site (after deploy):** `https://devprem.github.io/`

## What's inside

- `index.html` — page structure (Home, About, Skills, Projects, Contact)
- `style.css` — the "dev console" bento design system
- `script.js` — command palette (⌘K), scroll-driven nav highlighting, terminal typing intro, contact form handling
- `.github/workflows/deploy.yml` — GitHub Actions workflow that publishes the site to GitHub Pages automatically

No build step, no npm install, no framework — it just needs to be served as static files.

## One thing YOU need to finish: the contact form

The contact form posts to Formspree so submissions land straight in your Gmail inbox. Before it will actually send email:

1. Go to **https://formspree.io** and sign up free with `kumar02premsri@gmail.com`.
2. Create a new form — Formspree will give you an endpoint like `https://formspree.io/f/abcdEFGH`.
3. Open `index.html`, find this line:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with the ID Formspree gave you.
5. Commit and push — GitHub Actions redeploys automatically.

Until you do this, the form will show a friendly message pointing people to your email directly instead of failing silently — so nothing is broken in the meantime.

## Deploying (first time)

```bash
git init
git add .
git commit -m "Portfolio 2.0 — initial deploy"
git branch -M main
git remote add origin https://github.com/devprem/devprem.github.io.git
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The included workflow (`.github/workflows/deploy.yml`) takes it from there — every future `git push` to `main` redeploys automatically within ~1 minute.

## Updating content later

- Résumé/project changes → edit the relevant section in `index.html`.
- Colors/fonts/spacing → edit `style.css` (`:root` block at the top holds all design tokens).
- Command palette links, nav behavior, form logic → `script.js`.
