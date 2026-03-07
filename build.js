#!/usr/bin/env node
/**
 * build.js — Concatenates HTML partials into a single index.html
 *
 * Usage:
 *   node build.js              → writes index.html
 *   node build.js --watch      → rebuilds on file changes (requires Node 18+)
 */

const fs = require("fs");
const path = require("path");

// ─── Config ──────────────────────────────────────────────────────────────────

const PARTIALS_DIR = path.join(__dirname, "partials");
const OUTPUT_FILE = path.join(__dirname, "index.html");

/** Order matters — partials are joined top-to-bottom. */
const PARTIALS = [
  "head.html",
  "header.html",

  // <main> open tag
  { raw: "\n    <main>\n" },

  "hero.html",
  "coach.html",
  "packages.html",
  "results.html",
  "method.html",
  "contact.html",
  "modal.html",

  // </main> close tag
  { raw: "\n    </main>\n" },

  "footer.html",
];

// ─── Build ───────────────────────────────────────────────────────────────────

function build() {
  const parts = PARTIALS.map(entry => {
    if (typeof entry === "object" && entry.raw !== undefined) {
      return entry.raw;
    }
    const filePath = path.join(PARTIALS_DIR, entry);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠  Missing partial: ${entry} — skipped`);
      return `<!-- MISSING PARTIAL: ${entry} -->`;
    }
    return fs.readFileSync(filePath, "utf8");
  });

  const html = parts.join("\n");
  fs.writeFileSync(OUTPUT_FILE, html, "utf8");
  console.log(`Built → ${OUTPUT_FILE}  (${(html.length / 1024).toFixed(1)} KB)  [${timestamp()}]`);
}

function timestamp() {
  return new Date().toLocaleTimeString();
}

// ─── Watch mode ──────────────────────────────────────────────────────────────

const watchMode = process.argv.includes("--watch");

build(); // always run once immediately

if (watchMode) {
  console.log(`👀 Watching ${PARTIALS_DIR} for changes…`);
  fs.watch(PARTIALS_DIR, { persistent: true }, (event, filename) => {
    if (filename) {
      console.log(`  ↺  ${filename} changed`);
      build();
    }
  });
}
