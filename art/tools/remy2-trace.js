// Builds art/remy2-art.js from the user's edited image (art/src/remy2-photoshop.png).
// Keeps the hand-drawn head, hair and shirt; drops eyes, mouth, arms and legs so remy2.js can redraw them per pose.
// Approved by the user 2026-10-28: the "soft natural tufts" hair below. Keep it; do not go back to tall spikes.
// Run: NODE_PATH=<folder with potrace + pngjs> node art/tools/remy2-trace.js
const { PNG } = require("pngjs"), fs = require("fs"), path = require("path"), potrace = require("potrace");
const SRC = path.join(__dirname, "../src/remy2-photoshop.png"), OUT = path.join(__dirname, "../remy2-art.js");
const im = PNG.sync.read(fs.readFileSync(SRC)), W = im.width, H = im.height, N = W * H;
const PAL = { bg: "ae7f87", hair: "d15e7f", skin: "ffe9e1", white: "ffffff", shirt: "fdd87c", bag: "3e336d", bagHi: "d26384", mouth: "b03040", ink: "000000" };
const K = Object.keys(PAL), RGB = K.map(k => [0, 2, 4].map(i => parseInt(PAL[k].slice(i, i + 2), 16))), id = k => K.indexOf(k);
const cls = new Uint8Array(N);
for (let p = 0; p < N; p++) {
  const r = im.data[p * 4], g = im.data[p * 4 + 1], b = im.data[p * 4 + 2];
  let best = 0, bd = 1e9;
  RGB.forEach((c, i) => { const d = (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2; if (d < bd) { bd = d; best = i; } });
  cls[p] = (K[best] === "ink" ? r + g + b < 200 : bd < 2500) ? best : 255;
}
const inPoly = (pts, x, y) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const mask = f => { const m = new Uint8Array(N); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (f(x, y, y * W + x)) m[y * W + x] = 1; return m; };
const grow = (m, r, shrink = false) => { let o = m; for (let t = 0; t < r; t++) { const n = new Uint8Array(N), diag = t % 2; for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const p = y * W + x; let v = o[p], nb = [o[p - 1], o[p + 1], o[p - W], o[p + W]]; if (diag) nb.push(o[p - W - 1], o[p - W + 1], o[p + W - 1], o[p + W + 1]); v = shrink ? nb.every(Boolean) && v : nb.some(Boolean) || v; n[p] = v ? 1 : 0; } o = n; } return o; };

// 1. drop the speech bubble, arms, hands and legs
const ARM_L = [[0, 542], [135, 542], [170, 575], [187, 592], [181, 632], [0, 645]];
const ARM_R = [[338, 590], [400, 555], [480, 555], [480, 660], [337, 660]];
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if ((x >= 422 && y <= 566) || y >= 784 || inPoly(ARM_L, x, y) || inPoly(ARM_R, x, y)) cls[y * W + x] = id("bg");
}
// 2. drop the face (eyes, brows, mouth): small ink islands inside the head become skin
const seen = new Uint8Array(N);
for (let p = 0; p < N; p++) {
  if (seen[p] || cls[p] !== id("ink")) continue;
  const st = [p], comp = []; seen[p] = 1;
  while (st.length) { const q = st.pop(); comp.push(q); for (const n of [q - 1, q + 1, q - W, q + W]) if (n >= 0 && n < N && !seen[n] && cls[n] === id("ink")) { seen[n] = 1; st.push(n); } }
  const xs = comp.map(q => q % W), ys = comp.map(q => (q / W) | 0);
  if (comp.length < 4000 && Math.min(...xs) > 160 && Math.max(...xs) < 396 && Math.min(...ys) > 328 && Math.max(...ys) < 556) comp.forEach(q => cls[q] = id("skin"));
}
for (let y = 330; y < 556; y++) for (let x = 160; x < 396; x++) { const p = y * W + x; if (cls[p] === id("mouth") || cls[p] === id("white") || cls[p] === 255) cls[p] = id("skin"); }

// 3. restyle the hair: same height as the drawing, spikes rounded into soft tufts (a curve that covers the old outline)
const curve = segs => { const pts = [segs[0]]; for (let i = 1; i < segs.length; i++) { const [a, b, c, d] = segs[i], [x0, y0] = pts[pts.length - 1]; if (c === undefined) { pts.push([a, b]); continue; } for (let t = 1; t <= 12; t++) { const u = t / 12; pts.push([(1 - u) ** 2 * x0 + 2 * (1 - u) * u * a + u * u * c, (1 - u) ** 2 * y0 + 2 * (1 - u) * u * b + u * u * d]); } } return pts; };
const QUIFF = curve([[96, 345], [104, 300], [108, 262, 150, 228], [160, 242, 170, 238], [186, 204, 226, 194], [236, 202, 246, 198], [262, 176, 296, 184], [306, 194, 316, 190], [334, 172, 366, 180], [376, 190, 384, 188], [414, 184, 424, 210], [436, 226, 426, 250], [420, 278, 411, 301], [380, 292], [250, 292], [120, 302]]);
const ink0 = mask((x, y, p) => cls[p] === id("ink")), sil0 = mask((x, y, p) => cls[p] !== id("bg"));
const Q = mask((x, y) => x > 90 && x < 440 && y > 170 && y < 350 && inPoly(QUIFF, x, y));
const sil = sil0.map((v, p) => v | Q[p]), inner = grow(sil, 10, true), nearQ = grow(Q, 14), nearQ6 = grow(Q, 6);
const ink = ink0.map((v, p) => (v && !(nearQ6[p] && inner[p])) || (sil[p] && !inner[p] && nearQ[p]) ? 1 : 0);
const hair = mask((x, y, p) => !ink[p] && (cls[p] === id("hair") || Q[p]));

// 4. outfit: ringer tee (collar and hem bands) over the old shirt shape
const shirt = mask((x, y, p) => cls[p] === id("shirt"));
const collar = mask((x, y, p) => { if (!shirt[p] || y > 615 || x > 312) return false; for (let k = 1; k <= 15; k++) if (ink[p - k * W]) return true; return false; });
const hem = mask((x, y, p) => shirt[p] && y >= 748);
const layers = {
  skin: mask((x, y, p) => !ink[p] && !hair[p] && cls[p] === id("skin")),
  hair,
  shirt: shirt.map((v, p) => v && !collar[p] && !hem[p] ? 1 : 0),
  trim: collar.map((v, p) => v | hem[p]),
  bag: mask((x, y, p) => cls[p] === id("bag") && x > 150 && x < 345 && y > 565),
  bagStripe: mask((x, y, p) => cls[p] === id("bagHi") && x > 150 && x < 345 && y > 565),
  ink,
};
// fills tuck under the ink lines but never spill outside them: flood the background from the border
const anyFill = mask((x, y, p) => Object.entries(layers).some(([k, m]) => m[p]));
const outside = new Uint8Array(N), st = [0]; outside[0] = 1;
while (st.length) { const q = st.pop(); for (const n of [q - 1, q + 1, q - W, q + W]) if (n >= 0 && n < N && !outside[n] && !anyFill[n] && Math.abs((n % W) - (q % W)) <= 1) { outside[n] = 1; st.push(n); } }
const open = m => grow(grow(m, 2, true), 2);
layers.bag = open(layers.bag); layers.bagStripe = grow(grow(layers.bagStripe, 1, true), 1);
const toPng = m => { const o = new PNG({ width: W, height: H }); for (let p = 0; p < N; p++) { const v = m[p] ? 0 : 255; o.data[p * 4] = o.data[p * 4 + 1] = o.data[p * 4 + 2] = v; o.data[p * 4 + 3] = 255; } return PNG.sync.write(o); };
const trace = m => new Promise((res, rej) => potrace.trace(toPng(m), { turdSize: 30, optTolerance: 0.3 }, (e, svg) => e ? rej(e) : res((svg.match(/ d="([^"]*)"/) || [, ""])[1])));
(async () => {
  const out = {};
  for (const [k, m] of Object.entries(layers)) out[k] = await trace(k === "ink" ? m : grow(m, k === "bagStripe" || k === "trim" ? 1 : 3).map((v, p) => v && !outside[p] ? 1 : 0));
  fs.writeFileSync(OUT, "// Generated by art/tools/remy2-trace.js from art/src/remy2-photoshop.png. Do not edit by hand.\nwindow.REMY2_ART = " + JSON.stringify(out) + ";\n");
  console.log(Object.entries(out).map(([k, v]) => k + ":" + v.length).join(" "));
})();
