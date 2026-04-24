---
title: SEO Implementation Design
date: 2026-04-24
status: approved
---

## Goals

- Discoverability: blog posts rank in Google for relevant topics (Elixir, Ruby, Go, DevOps)
- Personal brand: "Oshan Wisumperuma" surfaces cleanly in search with structured data
- Link sharing: pages render rich previews on LinkedIn, Twitter, Slack via Open Graph

No analytics. No per-post images (site-wide fallback used for OG image).

## Approach: Hybrid (Hugo internals + custom partial)

Use Hugo's built-in OG and Twitter Card templates where they're solid. Write a small custom partial for canonical URLs and JSON-LD structured data, which Hugo's internals don't cover.

---

## Section 1: Meta description & Hugo internal templates

### Changes to `layouts/_default/baseof.html`

Add to `<head>`, after the existing `<title>` tag:

```html
<meta name="description" content="{{ with .Description }}{{ . }}{{ else }}{{ site.Params.description }}{{ end }}">
{{ template "_internal/opengraph.html" . }}
{{ template "_internal/twitter_cards.html" . }}
{{ partial "seo.html" . }}
```

### Changes to `config/_default/params.toml`

- Update `description` from placeholder to: `"Software engineer specialising in Ruby, Elixir, and Go. Writing about backend engineering, DevOps, and open source."`
- Update `keywords` to: `"Oshan Wisumperuma, Blog, Elixir, Ruby on Rails, Go, DevOps, open source"`
- Add `images = ["https://oshanz.github.io/favicon.svg"]` — site-wide OG image fallback (SVG; some platforms may not render it, but better than nothing until a proper image is added)

Hugo's `_internal/opengraph.html` reads `.Title`, `.Description`, `.Permalink`, `.Date`, and `site.Params.images` automatically.

---

## Section 2: Custom SEO partial

### New file: `layouts/partials/seo.html`

**Canonical URL** — emitted on every page:
```html
<link rel="canonical" href="{{ .Permalink }}">
```

**JSON-LD: Person** — emitted on home page only:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Oshan Wisumperuma",
  "url": "https://oshanz.github.io",
  "jobTitle": "Software Engineer",
  "description": "<site description>",
  "sameAs": ["https://github.com/oshanz"]
}
```

**JSON-LD: Article** — emitted on posts (`{{ if eq .Section "posts" }}`):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<page title>",
  "description": "<page description>",
  "datePublished": "<.Date>",
  "dateModified": "<.Lastmod>",
  "author": {
    "@type": "Person",
    "name": "Oshan Wisumperuma",
    "url": "https://oshanz.github.io"
  }
}
```

No JSON-LD on other pages (about, projects, gallery, tags).

---

## Section 3: Content quality fixes

| Item | Change |
|------|--------|
| `params.toml` description | Replace `"my description"` placeholder with real description |
| `params.toml` keywords | Extend to include Go, DevOps, open source |
| Post descriptions | Several posts repeat the title as description — update to real summaries (follow-up content task, not blocking) |

---

## Out of scope

- Google Analytics or any analytics
- Per-post Open Graph images
- Automated OG image generation
- Sitemap changes (Hugo auto-generates a solid sitemap.xml)
- Post description content updates (follow-up task)
