# Hugo Site — oshanz.github.io

## Stack
- Hugo v0.160 extended, from-scratch rebuild (no theme)
- Content under `content/` (not `content/en/` despite what `CLAUDE.md` says)
- TOML front matter: `+++ ... +++`
- Global CSS is inline in `layouts/_default/baseof.html`; `assets/css/custom.css` is loaded via `resources.Get`

## Build & Deploy
- Local: `hugo --gc`
- CI (GitHub Pages): `hugo --minify --gc --enableGitInfo`
- Deploys on push to `master` branch via `.github/workflows/gh-pages.yml`
- Output directory: `public/`

## Hugo Quirks
- **Section layouts do NOT auto-resolve by section name.** A section `_index.md` must declare `type = "<section>"` in front matter for Hugo to use `layouts/<section>/list.html`.
- Use `hugo.Data.<file>` (not `site.Data.<file>`) — deprecated since v0.160.
- Navigation links live in `config/_default/menu.toml` as `[[main]]` entries.

## Content Structure
- `content/posts/` — blog posts
- `content/blog/_index.md` — blog listing page (type = "blog")
- `content/gallery/_index.md` — gallery listing page (type = "gallery")
- `content/projects/_index.md` — projects listing page (type = "projects")
- `content/about/_index.md` — about page (type = "about")
- `content/tags/_index.md` — tags listing page
- Gallery data source: `data/gallery.yaml`, consumed as `hugo.Data.gallery` in `layouts/gallery/list.html`

## Conventions
- Date format in templates: `dateFormat "January 2, 2006"`
- `enableEmoji = true` in config
- `pygmentsUseClasses = true` for syntax highlighting
