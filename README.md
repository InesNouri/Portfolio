# Portfolio

A personal portfolio site for a DevOps engineer. Static, hand-written, and
dependency-free — no framework, no build step, no package manager.

## Structure

```
index.html      markup and all page copy
css/style.css   design tokens, layout, both themes
js/main.js      boot sequence, terminal animation, theme toggle, scroll spy
assets/         the CV PDF linked from the hero
.nojekyll       stops GitHub Pages from running Jekyll on the files
```

## Design

The layout is an editorial grid — a fixed left rail with a numbered section
index, hairline rules, and monospace labels — with a terminal running through
it as the personality. Experience renders as a deploy pipeline, contact
renders as a YAML manifest.

Two themes ship: **terminal** (dark, the default) and **paper** (light). The
toggle lives at the bottom of the rail and remembers the choice in
`localStorage`. Pressing <kbd>t</kbd> anywhere flips it too.

Everything is driven by CSS custom properties at the top of `css/style.css`.
Changing `--accent` in the two theme blocks re-colours the entire site.

## Behaviour

- **Boot sequence** — a simulated `deploy` pipeline runs on every page load,
  with four stages and a percentage counter. Click or press any key to skip it.
- **Hero terminal** — types out a short scripted session. Display only; it
  takes no input. The script is the `SCRIPT` array in `js/main.js`.
- **Scroll spy** — the rail highlights the section currently in view.
- **Reveal on scroll** and hover states throughout.
- **Copy buttons** in the contact block, with a clipboard fallback for
  non-secure origins.

All of it degrades: with JavaScript disabled the loader is hidden and the full
page is readable. `prefers-reduced-motion` skips the boot sequence and all
scroll animations. There is a print stylesheet, so Ctrl+P produces a clean
one-page document.

## Run locally

Open `index.html` in a browser — that is the whole workflow.

For a real origin (the clipboard API needs `localhost` or HTTPS):

```
python -m http.server 8000
```

Then visit `http://localhost:8000`. `npx serve` works too. While editing, the
Live Server extension for VS Code reloads on save.

## Deploy to GitHub Pages

1. Push to GitHub. The repository must be public on a free account.
2. **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.**
3. It goes live at `https://<username>.github.io/<repo>/` within a minute.

Naming the repository `<username>.github.io` serves it from the root domain
instead.

## Editing content

Remaining unwritten copy is wrapped in `[[ double brackets ]]` — search the
project for `[[` to find every slot. The sections are: hero status, About,
Experience, Selected work, and the contact details.

Experience entries are `<li class="stage">` blocks; duplicate one per role.
Project cards are `<article class="card">` blocks. The stack table is a list
of `<div class="row">` entries, each a category and its tools.
