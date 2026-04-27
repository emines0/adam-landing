# Kavka Coaching — Developer README

Static marketing site for [kavkacoaching.com](https://kavkacoaching.com). Single-page, partial-based, no framework, no bundler.

---

## Tech stack

- **HTML / CSS / vanilla JS** — no framework, no React, no jQuery.
- **Node.js build script** (`build.js`) — concatenates HTML partials into `index.html` and JS modules into `script.js`.
- **PostCSS** — for the stylesheet (`style.css`).
- **Web3Forms + hCaptcha** — handles form submissions and spam protection.
- **Static hosting** — deployable to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).

---

## Project structure

```
/
├── build.js                 # Build script — DO read, edit only to add/remove partials
├── index.html               # AUTO-GENERATED — never edit directly
├── script.js                # AUTO-GENERATED — never edit directly
├── style.css                # Edit for styling changes
├── robots.txt               # SEO — must live at site root
├── sitemap.xml              # SEO — must live at site root
├── README.md                # You are here
│
├── partials/                # HTML fragments — edit these for content changes
│   ├── head.html            # <head>, meta tags, JSON-LD structured data
│   ├── header.html          # Top nav bar
│   ├── hero.html            # Hero section + multi-step quiz/contact form
│   ├── coach.html           # "Meet your coach" section
│   ├── clients.html         # Client gallery (18 tiles)
│   ├── how-it-works.html    # 3-step method cards
│   ├── packages.html        # Pricing tiers + FAQ
│   ├── modal.html           # Image preview modal markup
│   ├── footer.html          # Footer + script tags + closing </body></html>
│   └── contact.html         # ⚠ Currently NOT included in build (see "Gotchas")
│
├── scripts/                 # JS modules — edit these for behavior changes
│   ├── utils.js             # Year stamp, scroll-to-top
│   ├── nav.js               # Mobile nav toggle
│   ├── modal.js             # Gallery image lightbox
│   ├── coach.js             # Expandable About / Experiences / Certificates
│   ├── quiz.js              # Multi-step quiz logic + answer summary
│   └── form.js              # Form submission, hCaptcha validation, Web3Forms POST
│
└── assets/
    ├── coach-adam-medicineball.png
    ├── og-image.jpg         # 1200×630 social-preview image
    ├── favicon.png
    ├── apple-touch-icon.png
    └── clients/             # image0.jpeg … image18.jpeg
```

---

## Getting started

### Prerequisites

- **Node.js 18 or newer** (uses no npm dependencies — only the standard library).

### First-time setup

```bash
git clone <repo-url>
cd kavkacoaching
node build.js
```

That's it. Open `index.html` in a browser, or serve it locally:

```bash
npx serve .
# or
python3 -m http.server 8000
```

---

## Development workflow

### One-shot build

```bash
node build.js
```

Concatenates everything in `/partials` into `index.html` and everything in `/scripts` into `script.js`.

### Watch mode

```bash
node build.js --watch
```

Rebuilds automatically whenever a file in `/partials` or `/scripts` changes. Use this while developing.

### **Never edit `index.html` or `script.js` directly.**

They are auto-generated. A header comment at the top of each warns about this. Always edit the source partial / module and re-run the build.

---

## How to make common changes

### Update text on the page

Find the right partial in `/partials/`, edit, save. Watch mode will rebuild instantly; otherwise run `node build.js`.

| Section on the page               | File to edit                 |
| --------------------------------- | ---------------------------- |
| Page title, meta, structured data | `partials/head.html`         |
| Top nav links / logo              | `partials/header.html`       |
| Hero + quiz + contact form        | `partials/hero.html`         |
| Coach bio / certificates          | `partials/coach.html`        |
| Client gallery tiles              | `partials/clients.html`      |
| 3-step method                     | `partials/how-it-works.html` |
| Pricing & FAQ                     | `partials/packages.html`     |
| Footer                            | `partials/footer.html`       |

### Add a client to the gallery

1. Drop the image into `/assets/clients/` (e.g. `image18.jpeg`).
2. Add a new `<button class="tile">…</button>` block in `partials/clients.html` mirroring the existing pattern.
3. **Use a descriptive `alt` text** — not "Client19". Something like `"Bundesliga footballer — strength rebuild after ACL"`. This matters for SEO and accessibility.
4. Run `node build.js`.

### Change a price

⚠ **Two places must be updated together:**

1. `partials/packages.html` — the visible price.
2. `partials/head.html` — the `JSON-LD` `Service` → `offers` array. Search-engine rich snippets read from here.

If they disagree, Google may show stale prices in search results.

### Add or change an FAQ

⚠ **Two places must be updated together:**

1. `partials/packages.html` — the `<details class="faq">` element users see.
2. `partials/head.html` — the `JSON-LD` `FAQPage` → `mainEntity` array. This is what powers Google's rich-result FAQ accordion.

### Edit the form

- The form HTML lives in `partials/hero.html`.
- The submit handler and validation logic live in `scripts/form.js`.
- The quiz step navigation and answer mapping live in `scripts/quiz.js`.

The form uses **Web3Forms** for submission. The `access_key` is a public client-side key — it is safe to commit and ship in plain HTML. The `hCaptcha` script tag in `partials/footer.html` provides spam protection.

To change where submissions go, log in to the Web3Forms dashboard and update the email there — no code change needed.

### Change brand colors

The dark palette is defined in `style.css` (look for CSS variables near the top):

- `#0b1020` — primary background (deep navy)
- `#101833` — surface / card background
- Cool-blue accents

When adding new components, pull from these tokens rather than hardcoding hex values.

---

## SEO maintenance

The site has solid baseline SEO. Things to remember when changing content:

- **Update `sitemap.xml`'s `<lastmod>`** when you make major content changes.
- **Keep `head.html` JSON-LD in sync** with what's on the page — prices, FAQs, the coach's bio, and any added services.
- **`og-image.jpg` is required** at `/assets/og-image.jpg` (1200×630). Without it, social previews show a blank thumbnail.
- **Submit the sitemap** to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) once after launch. Resubmit only when the URL structure changes.
- **Image `alt` attributes** are required on every `<img>` for both SEO and accessibility.

---

## Deployment

The site is fully static — there is no server, no database, no build pipeline beyond `node build.js`.

**Pre-deploy checklist:**

1. Run `node build.js` (so `index.html` and `script.js` reflect the latest partials/scripts).
2. Confirm `robots.txt` and `sitemap.xml` are at the site root, **not** under `/assets/`.
3. Confirm `favicon.png`, `apple-touch-icon.png`, and `og-image.jpg` are in their expected locations.
4. Upload everything except `/partials`, `/scripts`, `build.js`, and `README.md` (these are dev-only and don't need to be on the live host — though shipping them is harmless).

**Recommended hosts:** Netlify, Vercel, Cloudflare Pages — all support drag-and-drop deploys and automatic HTTPS.

---

## Gotchas (real bugs we've hit)

- **`index.html` and `script.js` are auto-generated.** Edits to them are silently destroyed on the next build. Always edit `/partials` and `/scripts`.
- **The order of files in `build.js` matters.** `head.html` must come first, `footer.html` last. For scripts: `utils.js` before everything (shared helpers), `quiz.js` before `form.js` (form calls quiz helpers).
- **`partials/contact.html` is currently orphaned** — it exists but is not listed in `build.js`'s `PARTIALS` array. The active form lives in `partials/hero.html`. Either delete `contact.html` or add it back to the build, but don't leave it ambiguous for the next dev.
- **The form requires `id="quizForm"`** on the `<form>` element. Without that ID, the JS submit handler never attaches and the browser submits natively, bypassing the validation and Web3Forms wiring.
- **Don't duplicate hidden fields** in the form. The quiz writes user answers into hidden inputs that are submitted to Web3Forms; if you accidentally have two with the same `name`, only one is sent.
- **The brand is "Kavka Coaching"** (matches the domain). Earlier copies of the site used "AK Coaching" — if you see it anywhere, replace it.
- **All "Contact me" buttons link to `#contact`.** Make sure whatever section contains the form has `id="contact"` (currently the hero section).

---

## Quick reference

```bash
# Install (none — only Node 18+)
node --version

# Develop
node build.js --watch

# Production build
node build.js

# Local preview
npx serve .
```

# Favicon setup — kavkacoaching.com

## Files

Drop everything from the `favicons/` folder into your **site root** (same level as `index.html`). After build, they should be served from:

```
/favicon.ico
/favicon.svg
/favicon-16x16.png
/favicon-32x32.png
/favicon-48x48.png
/favicon-180x180.png
/favicon-192x192.png
/favicon-512x512.png
/apple-touch-icon.png
/site.webmanifest
```

Verify your `build.js` copies these to the output directory, or place them in whatever folder your build treats as static assets.

---

## HTML — paste into `<head>`

Add this block to the `<head>` of `partials/hero.html` (or wherever your shared `<head>` partial lives):

```html
<!-- Favicons -->
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#0b1020" />
```

The `theme-color` matches your site's navy so mobile browser chrome blends in.

---

## site.webmanifest

Create this file at the site root:

```json
{
  "name": "Kavka Coaching",
  "short_name": "Kavka",
  "icons": [
    { "src": "/favicon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0b1020",
  "background_color": "#0b1020",
  "display": "standalone"
}
```

(Update `name` / `short_name` if you'd prefer a different label when users add the site to their home screen.)

---

## After deploying

1. Hard-refresh the tab (browsers cache favicons aggressively — `Cmd/Ctrl + Shift + R`).
2. If the old icon sticks around, also try opening `/favicon.ico` directly in a tab and refreshing it.
