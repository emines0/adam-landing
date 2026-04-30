#!/usr/bin/env node
/**
 * build.js — Concatenates HTML partials into index.html
 *             and JS modules into script.js
 *
 * Usage:
 *   node build.js              → writes index.html + script.js
 *   node build.js --watch      → rebuilds on file changes (requires Node 18+)
 */

const fs = require("fs");
const path = require("path");

// ─── Config ──────────────────────────────────────────────────────────────────

const PARTIALS_DIR = path.join(__dirname, "partials");
const OUTPUT_FILE = path.join(__dirname, "index.html");

const SCRIPTS_DIR = path.join(__dirname, "scripts");
const SCRIPT_OUTPUT = path.join(__dirname, "script.js");

/** Order matters — partials are joined top-to-bottom. */
const PARTIALS = [
  "head.html",
  "header.html",

  // <main> open tag
  { raw: "\n    <main>\n" },

  "hero.html",
  "coach.html",
  "clients.html",
  "how-it-works.html",
  "packages.html",
  "modal.html",

  // </main> close tag
  { raw: "\n    </main>\n" },

  "footer.html",
];

/**
 * JS modules — order matters.
 * utils first (shared helpers), then feature modules,
 * quiz before form (form submission calls quiz helpers).
 */
const SCRIPTS = ["utils.js", "nav.js", "modal.js", "coach.js", "quiz.js", "form.js", "gallery.js"];

// ─── Build HTML ──────────────────────────────────────────────────────────────

function buildHTML() {
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

  const htmlWarning = [
    "<!-- ============================================================",
    "  AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY",
    "  Changes made here will be overwritten on the next build.",
    "  Edit the partials in /partials and run: node build.js/node build.js --watch",
    "============================================================ -->",
    "",
  ].join("\n");
  const html = htmlWarning + parts.join("\n");
  fs.writeFileSync(OUTPUT_FILE, html, "utf8");
  console.log(`HTML  → ${OUTPUT_FILE}  (${(html.length / 1024).toFixed(1)} KB)  [${timestamp()}]`);
}

// ─── Build JS ────────────────────────────────────────────────────────────────

function buildJS() {
  const parts = SCRIPTS.map(entry => {
    const filePath = path.join(SCRIPTS_DIR, entry);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠  Missing script: ${entry} — skipped`);
      return `/* MISSING SCRIPT: ${entry} */`;
    }
    return fs.readFileSync(filePath, "utf8");
  });

  const jsWarning = [
    "// ============================================================",
    "// AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY",
    "// Changes made here will be overwritten on the next build.",
    "// Edit the modules in /scripts and run: node build.js/node build.js --watch",
    "// ============================================================",
    "",
  ].join("\n");
  const js = jsWarning + parts.join("\n\n");
  fs.writeFileSync(SCRIPT_OUTPUT, js, "utf8");
  console.log(`JS    → ${SCRIPT_OUTPUT}  (${(js.length / 1024).toFixed(1)} KB)  [${timestamp()}]`);
}

// ─── Build both ──────────────────────────────────────────────────────────────

function build() {
  buildHTML();
  buildJS();
}

function timestamp() {
  return new Date().toLocaleTimeString();
}

// ─── Watch mode ──────────────────────────────────────────────────────────────

const watchMode = process.argv.includes("--watch");

build(); // always run once immediately

if (watchMode) {
  console.log(`👀 Watching ${PARTIALS_DIR} and ${SCRIPTS_DIR} for changes…`);

  fs.watch(PARTIALS_DIR, { persistent: true }, (event, filename) => {
    if (filename) {
      console.log(`  ↺  partials/${filename} changed`);
      buildHTML();
    }
  });

  fs.watch(SCRIPTS_DIR, { persistent: true }, (event, filename) => {
    if (filename) {
      console.log(`  ↺  scripts/${filename} changed`);
      buildJS();
    }
  });
}
