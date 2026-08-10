## Stack
- Hugo v0.160 extended, from-scratch rebuild (no theme)
- Content under `content/`, TOML front matter (`+++ ... +++`)
- All global CSS is inline in `layouts/_default/baseof.html`; `assets/css/custom.css` is loaded via `resources.Get` in baseof
- Config split across `config.toml` (build settings) and `config/_default/*.toml` (config.toml, markup.toml, menu.toml, params.toml, server.toml)

## Build
- `hugo server` — local dev server
- `hugo --gc` — build site to `public/`
- CI deploys from `master` branch via `.github/workflows/gh-pages.yml` using `hugo --minify --gc --enableGitInfo`

## Layout Architecture
- `layouts/_default/baseof.html` — shell: nav, theme toggle, footer
- `layouts/index.html` — home page: shows 3 most recent posts from `/posts` and 3 recent gallery shots
- `layouts/posts/list.html` — blog listing
- `layouts/gallery/list.html` — gallery listing, reads from `content/gallery/gallery.yaml` via `.Resources.Get` + `transform.Unmarshal`
- `layouts/about/list.html` — about page layout
- `layouts/projects/list.html` — projects page layout
- `layouts/projects/_markup/render-image.html` — custom image renderer for projects (lazy loading)
- `layouts/_default/single.html` / `layouts/_default/list.html` — default fallbacks
- `layouts/partials/seo.html` — shared SEO meta partial

## Content Sections & Routing
| URL | Content source | Layout |
|-----|---------------|--------|
| `/posts/` | `content/posts/_index.md` | `layouts/posts/list.html` |
| `/gallery/` | `content/gallery/_index.md` (`type = "gallery"`) | `layouts/gallery/list.html` |
| `/posts/…` | `content/posts/` | `layouts/_default/single.html` |
| `/projects/` | `content/projects/_index.md` (`type = "projects"`) | `layouts/projects/list.html` |
| `/about/` | `content/about/_index.md` (`type = "about"`) | `layouts/about/list.html` |

Blog listing renders posts from `content/posts/`.

## Hugo Quirks
- Section-specific layouts require explicit `type = "..."` in the section's `_index.md` — Hugo does NOT auto-resolve by directory name alone (e.g. `type = "gallery"` enables `layouts/gallery/list.html`)
- Use `hugo.Data.<file>` not `site.Data.<file>` — deprecated since v0.160
- Nav links come from `config/_default/menu.toml` — add `[[main]]` entries there

## Gallery
- Photos are stored in `content/gallery/images/` and referenced from `content/gallery/gallery.yaml`
- `gallery.yaml` fields: `file`, `date` (YYYY-MM-DD), `caption`, `type`
- Gallery is sorted by `date` descending, grouped by year
- `gallery-data/convert.rb` converts images to WebP at 400px width using ffmpeg (`gallery-data/in/` → `gallery-data/out/`)

## Tech Stack
- Hardcoded in `layouts/index.html` as a grid of categories (Backend, Data, Frontend, Tools)
- Uses inline SVGs for all icons
- Tech-specific icon colors are defined in `assets/css/custom.css` via `.tech-<name> svg` classes (e.g., `.tech-ruby`)
- Items are styled as "pills" using `background: var(--code-bg)` and `border-radius: 4px`

## Accessibility
- Target WCAG 2.1 Level AA compliance

## Styling
- CSS custom properties and all global styles are in `assets/css/custom.css`, loaded via `resources.Get` in `baseof.html`
- Dark mode via `[data-theme="dark"]` on `<html>`, toggled by JS in `baseof.html`, persisted to `localStorage`
- The `assets/js/theme-init.js` is inlined in `<head>` to prevent flash of unstyled content (FOCU)
