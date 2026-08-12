# Portfolio — Ines Nouri

Static personal site. No build step, no dependencies, no frameworks.

```
index.html      structure + all copy
css/style.css   design tokens, layout, both themes
js/main.js      theme toggle, terminal typing, scroll spy, copy buttons
.nojekyll       stops GitHub Pages from running Jekyll on the files
```

## Run locally

Open `index.html` in a browser. That's it. (Or `python -m http.server` in this
folder if you prefer a real origin — the clipboard API needs `localhost` or HTTPS.)

## Deploy to GitHub Pages

1. Push to GitHub. The repo must be **public** for Pages on a free account.
2. **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.**
3. Live at `https://<username>.github.io/<repo>/` in ~1 minute.

To use `https://<username>.github.io` instead, name the repo `<username>.github.io`.

## Filling it in

Every placeholder is wrapped in `[[ double brackets ]]`. Search the project for
`[[` and you'll hit all of them. Sections:

| Where | What to write |
|---|---|
| Hero facts | city, focus areas, year you started, languages |
| 01 About | three paragraphs + three working principles |
| 02 Experience | one `<li class="stage">` block per role — copy/paste and edit |
| 03 Stack | remove tools you don't use, add ones you do |
| 04 Selected work | three `<article class="card">` blocks |
| 05 Contact | **phone number and LinkedIn handle still needed** |

Email is already set to `inouri@intelligencia-it.com`.

The terminal text in the hero lives in the `SCRIPT` array at the top of
`js/main.js` — edit the `cmd` / `out` pairs to change what it types.

## Notes

- Two themes: paper (default) and terminal. Follows the OS preference on first
  visit, then remembers your choice in `localStorage`.
- Respects `prefers-reduced-motion` — the terminal renders instantly and the
  scroll animations are disabled.
- Has a print stylesheet: Ctrl+P produces a clean one-page CV.
- Accent colour is one variable — `--accent` in `css/style.css`, set once per theme.
