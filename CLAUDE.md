# Hugo Site — oshanz.github.io

## Stack
- Hugo v0.160 extended, branch `jfrom-scratch` is a from-scratch rebuild (no theme)
- Content under `content/en/`, TOML front matter (`+++ ... +++`)
- All global CSS is inline in `layouts/_default/baseof.html`; `assets/css/custom.css` is loaded via `resources.Get` in baseof

## Hugo Quirks
- Section-specific layouts (e.g. `layouts/gallery/list.html`) require `type = "gallery"` in the section `_index.md` front matter — Hugo does NOT auto-resolve by section name alone
- Use `hugo.Data.<file>` not `site.Data.<file>` — deprecated since v0.160
- `menu.toml` was entirely commented-out examples; add real `[[main]]` entries there for nav

## Build
- `hugo --gc` — build site to `public/`
- `hugo server` — local dev server
