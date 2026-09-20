#!/usr/bin/env bun
// Checks that Mozilla Readability can extract a clean article from every
// built page under public/. Run `hugo --gc` first to produce public/.
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { JSDOM } from "jsdom";
import { Readability, isProbablyReaderable } from "@mozilla/readability";

const PUBLIC_DIR = join(import.meta.dir, "..", "public");

function findHtmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...findHtmlFiles(full));
    } else if (entry.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

const files = findHtmlFiles(PUBLIC_DIR).sort();

const results = [];
for (const file of files) {
  const html = readFileSync(file, "utf-8");
  if (/<meta\s+http-equiv=["']refresh["']/i.test(html)) {
    // Alias/redirect stub page — no article content by design, skip it.
    continue;
  }
  const url = "https://oshanz.dev/" + relative(PUBLIC_DIR, file);
  const dom = new JSDOM(html, { url });
  const doc = dom.window.document;

  const reader = isProbablyReaderable(doc);
  const article = new Readability(dom.window.document.cloneNode(true)).parse();

  results.push({
    file: relative(PUBLIC_DIR, file),
    reader,
    parsed: !!article,
    title: article?.title ?? null,
    words: article ? article.textContent.trim().split(/\s+/).filter(Boolean).length : 0,
  });
}

const failures = results.filter((r) => !r.parsed);
const nonReaderable = results.filter((r) => r.parsed && !r.reader);

console.log(`Checked ${results.length} pages under public/\n`);

console.log("File".padEnd(45), "Readerable", "Parsed", "Words", "Title");
for (const r of results) {
  console.log(
    r.file.padEnd(45),
    String(r.reader).padEnd(10),
    String(r.parsed).padEnd(6),
    String(r.words).padEnd(5),
    r.title ?? ""
  );
}

console.log("\nSummary:");
console.log(`  Readability failed to parse: ${failures.length}`);
for (const f of failures) console.log(`    - ${f.file}`);
console.log(`  Parsed but not "readerable" (isProbablyReaderable=false): ${nonReaderable.length}`);
for (const f of nonReaderable) console.log(`    - ${f.file} (${f.words} words)`);

if (failures.length > 0) {
  process.exit(1);
}
