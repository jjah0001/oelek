// Inlines style.css and js/*.js into dist/oelek.html, a single self-contained
// file for places that can't load separate files (e.g. a claude.ai artifact).
// GitHub Pages serves the split files directly and does not need this.
const fs = require("fs");
const path = require("path");
const root = __dirname;
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
html = html.replace('<link rel="stylesheet" href="style.css">', () =>
  `<style>\n${fs.readFileSync(path.join(root, "style.css"), "utf8")}</style>`);
// Keep the tab icon embedded in the standalone export, too.
html = html.replace('href="favicon.svg"', () =>
  `href="data:image/svg+xml;base64,${fs.readFileSync(path.join(root, "favicon.svg")).toString("base64")}"`);
const srcs = [];
html = html.replace(/(?:<script src="([^"]+)"><\/script>\n?)+/, (block) => {
  for (const m of block.matchAll(/<script src="([^"]+)"><\/script>/g)) srcs.push(m[1]);
  const js = srcs.map((s) => fs.readFileSync(path.join(root, s), "utf8").replace(/^"use strict";\n/, "")).join("\n");
  return `<script>\n"use strict";\n${js.replace(/<\/script/gi, "<\\/script")}</script>\n`;
});
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist", "oelek.html"), html);
console.log(`dist/oelek.html: ${srcs.length} scripts inlined`);
