# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack
- Hugo v0.160 extended, from-scratch rebuild (no theme)
- Content under `content/`, TOML front matter (`+++ ... +++`)
- All global CSS is inline in `layouts/_default/baseof.html`; `assets/css/custom.css` is loaded via `resources.Get` in baseof

## Build
- `hugo server` — local dev server
- `hugo --gc` — build site to `public/`
- CI deploys from `master` branch via `.github/workflows/gh-pages.yml` using `hugo --minify --gc --enableGitInfo`

## Layout Architecture
- `layouts/_default/baseof.html` — shell: nav, theme toggle, footer, inline CSS variables for light/dark mode
- `layouts/index.html` — home page: shows 3 most recent posts from `/posts` section
- `layouts/blog/list.html` — blog listing, pulls all pages from the `/posts` section (not `/blog/`)
- `layouts/gallery/list.html` — gallery listing, reads from `content/gallery/gallery.yaml` via `.Resources.Get` + `transform.Unmarshal`
- `layouts/_default/single.html` / `layouts/_default/list.html` — default fallbacks

## Content Sections & Routing
| URL | Content source | Layout |
|-----|---------------|--------|
| `/blog/` | `content/blog/_index.md` (`type = "blog"`) | `layouts/blog/list.html` |
| `/gallery/` | `content/gallery/_index.md` (`type = "gallery"`) | `layouts/gallery/list.html` |
| `/posts/…` | `content/posts/` | `layouts/_default/single.html` |
| `/projects/` | `content/projects/_index.md` | `layouts/_default/list.html` |
| `/about/` | `content/about/_index.md` | `layouts/_default/single.html` |

Blog listing (`/blog/`) renders posts from `content/posts/` via `.Site.GetPage "/posts"` — posts live in `/posts/` not `/blog/`.

## Hugo Quirks
- Section-specific layouts require explicit `type = "..."` in the section's `_index.md` — Hugo does NOT auto-resolve by directory name alone (e.g. `type = "gallery"` enables `layouts/gallery/list.html`)
- Use `hugo.Data.<file>` not `site.Data.<file>` — deprecated since v0.160
- Nav links come from `config/_default/menu.toml` — add `[[main]]` entries there

## Gallery
- Photos are stored in `content/gallery/images/` and referenced from `content/gallery/gallery.yaml`
- `gallery.yaml` fields: `file`, `date` (YYYY-MM-DD), `caption`, `type`
- Gallery is sorted by `date` descending, grouped by year
- `gallery-data/convert.rb` converts images to WebP at 400px width using ffmpeg (`gallery-data/in/` → `gallery-data/out/`)

## Styling
- CSS custom properties defined in `baseof.html` `<style>` block: `--bg`, `--text`, `--muted`, `--accent`, `--border`, `--code-bg`
- Dark mode via `[data-theme="dark"]` on `<html>`, toggled by JS in `baseof.html`, persisted to `localStorage`
- Section/component-specific styles go in `assets/css/custom.css` (currently holds gallery grid styles)
