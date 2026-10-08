// Converts the signature text into per-glyph SVG paths so the preloader can
// "write" it stroke by stroke without shipping a font or a parser.
// Usage: node scripts/gen-signature.mjs  (needs scripts/Allura-Regular.ttf from
//   https://github.com/google/fonts/raw/main/ofl/allura/Allura-Regular.ttf)
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";

const TEXT = "Shun Takenaka";
const SIZE = 120;
const font = fontkit.openSync(fileURLToPath(new URL("./Allura-Regular.ttf", import.meta.url)));
const run = font.layout(TEXT);
const s = SIZE / font.unitsPerEm;

let x = 0;
let minY = Infinity, maxY = -Infinity, maxX = 0;
const glyphs = [];
run.glyphs.forEach((g, i) => {
  const pos = run.positions[i];
  const d = g.path.toSVG();
  if (d) {
    const bb = g.bbox;
    glyphs.push({ d, x: (x + pos.xOffset) * s, y: -pos.yOffset * s });
    minY = Math.min(minY, -bb.maxY * s);
    maxY = Math.max(maxY, -bb.minY * s);
    maxX = Math.max(maxX, (x + bb.maxX) * s);
  }
  x += pos.xAdvance;
});

const pad = 12;
const out = {
  text: TEXT,
  scale: s, // font units → px; paths are in font units with y pointing up
  viewBox: [-pad, Math.floor(minY) - pad, Math.ceil(maxX) + pad * 2, Math.ceil(maxY - minY) + pad * 2],
  glyphs,
};
writeFileSync(new URL("../src/assets/signature.json", import.meta.url), JSON.stringify(out));
console.log(`wrote ${glyphs.length} glyphs, viewBox ${out.viewBox.join(" ")}`);
