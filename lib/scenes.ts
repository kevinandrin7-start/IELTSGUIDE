// Procedural nature scenes for the sign-in slideshow. Each returns an SVG body for viewBox 0 0 800 900.
// Everything is generated from a fixed seed, so a scene looks identical on every render.

export const SCENE_W = 800;
export const SCENE_H = 900;
const W = SCENE_W;
const H = SCENE_H;

type Rand = () => number;

function rng(seed: number): Rand {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = (n: number) => Math.round(n * 10) / 10;
const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
function mix(a: string, b: string, t: number) {
  const A = hex(a), B = hex(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
}
/** Midpoint-displacement ridge line: n+1 heights across the width. */
function ridge(r: Rand, n: number, base: number, rough: number, amp: number) {
  const pts = new Array<number>(n + 1).fill(0);
  pts[0] = base + (r() - 0.5) * amp;
  pts[n] = base + (r() - 0.5) * amp;
  const sub = (a: number, b: number, d: number) => {
    if (b - a < 2) return;
    const m = (a + b) >> 1;
    pts[m] = (pts[a] + pts[b]) / 2 + (r() - 0.5) * d;
    sub(a, m, d * rough);
    sub(m, b, d * rough);
  };
  sub(0, n, amp);
  return pts;
}
const xAt = (i: number, n: number) => (i / n) * W;
function ridgePath(ys: number[], bottom: number) {
  const n = ys.length - 1;
  let d = `M0 ${bottom} L0 ${f(ys[0])}`;
  ys.forEach((y, i) => (d += ` L${f(xAt(i, n))} ${f(y)}`));
  return d + ` L${W} ${bottom} Z`;
}
/** Snow cap band that hugs the ridge wherever it rises above the snow line. */
function snowPath(ys: number[], snowLine: number, depth: number) {
  const n = ys.length - 1;
  let top = "", bot = "";
  ys.forEach((y, i) => {
    const b = y < snowLine ? Math.min(snowLine, y + depth) : y;
    top += `${i ? " L" : "M"}${f(xAt(i, n))} ${f(y)}`;
    bot = ` L${f(xAt(i, n))} ${f(b)}` + bot;
  });
  return top + bot + " Z";
}
function pine(x: number, y: number, h: number, color: string, snow?: string) {
  const w = h * 0.36;
  let d = "", s = "";
  const tiers = 4;
  for (let i = 0; i < tiers; i++) {
    const top = y - h + (i * h) / (tiers + 0.6);
    const bw = w * (0.45 + (i / tiers) * 0.65);
    const bot = top + h / 2.1;
    d += `M${f(x)} ${f(top)} L${f(x - bw)} ${f(bot)} L${f(x + bw)} ${f(bot)} Z `;
    if (snow) s += `M${f(x)} ${f(top)} L${f(x - bw * 0.55)} ${f(top + (bot - top) * 0.5)} L${f(x + bw * 0.2)} ${f(top + (bot - top) * 0.38)} Z `;
  }
  d += `M${f(x - h * 0.03)} ${f(y - h * 0.12)} h${f(h * 0.06)} v${f(h * 0.12)} h${f(-h * 0.06)} Z`;
  return `<path d="${d}" fill="${color}"/>` + (snow ? `<path d="${s}" fill="${snow}"/>` : "");
}
/** A bird in flight; its wings flap when the scene is animated. */
const bird = (x: number, y: number, k: number, color: string, flap: number) =>
  `<g transform="translate(${f(x)} ${f(y)}) scale(${f(k)})"><g class="fx-flap" style="--d:${f(flap)}s;--dl:-${f(flap * 0.37 * ((x * 7) % 5))}s"><path d="M-10 0 Q-5 -6 0 0 Q5 -6 10 0" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/></g></g>`;
/** A flock that crosses the whole scene from left to right. */
const flock = (birds: string, d: number, dl: number, from = -260, to = 1000) =>
  `<g class="fx-fly" style="--d:${d}s;--dl:-${dl}s;--from:${from}px;--to:${to}px">${birds}</g>`;

const shade = (id: string) =>
  `<defs><linearGradient id="${id}-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></linearGradient></defs><rect y="${H - 320}" width="${W}" height="320" fill="url(#${id}-shade)"/>`;

// ── 1. Northern lights over a mirrored lake ───────────────────────
function aurora() {
  const r = rng(7);
  const s0 = `<defs>
    <linearGradient id="a-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#01040f"/><stop offset=".45" stop-color="#05213a"/><stop offset=".72" stop-color="#0d4a52"/><stop offset="1" stop-color="#1b6b62"/></linearGradient>
    <linearGradient id="a-g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a78bfa" stop-opacity="0"/><stop offset=".35" stop-color="#5eead4" stop-opacity=".55"/><stop offset=".8" stop-color="#34d399" stop-opacity=".9"/><stop offset="1" stop-color="#34d399" stop-opacity="0"/></linearGradient>
    <linearGradient id="a-g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0abfc" stop-opacity="0"/><stop offset=".4" stop-color="#c084fc" stop-opacity=".45"/><stop offset=".85" stop-color="#2dd4bf" stop-opacity=".7"/><stop offset="1" stop-color="#2dd4bf" stop-opacity="0"/></linearGradient>
    <linearGradient id="a-lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b3a44"/><stop offset="1" stop-color="#010b12"/></linearGradient>
    <radialGradient id="a-moon" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#fffbeb"/><stop offset="1" stop-color="#fde68a"/></radialGradient>
    <filter id="a-b8" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="a-b3"><feGaussianBlur stdDeviation="2.5"/></filter>
    <filter id="a-b20" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
    <clipPath id="a-up"><rect width="${W}" height="640"/></clipPath>
    <mask id="a-cres"><rect width="${W}" height="${H}" fill="#fff"/><circle cx="652" cy="112" r="23" fill="#000"/></mask>
  </defs><rect width="${W}" height="${H}" fill="url(#a-sky)"/>`;
  let stars = "";
  for (let i = 0; i < 520; i++) {
    const x = r() * W, y = r() * 600, big = r() < 0.06;
    stars += `<circle cx="${f(x)}" cy="${f(y)}" r="${big ? f(1.2 + r()) : f(0.3 + r() * 0.7)}" fill="#e0f2fe" opacity="${f(0.25 + r() * 0.7)}"/>`;
    if (big) stars += `<circle cx="${f(x)}" cy="${f(y)}" r="5" fill="#bae6fd" opacity=".12"/>`;
  }
  stars += `<ellipse cx="420" cy="230" rx="520" ry="70" transform="rotate(-24 420 230)" fill="#c7d2fe" opacity=".07" filter="url(#a-b20)"/>`;
  let au = "";
  const bands: [number, number, string, number][] = [[160, 120, "a-g1", 1], [230, 150, "a-g2", 0.8], [120, 90, "a-g1", 0.6], [300, 110, "a-g2", 0.55], [200, 170, "a-g1", 0.45]];
  bands.forEach(([base, depth, g, op], bi) => {
    const ph = r() * 6, fr = 0.006 + r() * 0.006, amp = 50 + r() * 60;
    const top = (x: number) => base + Math.sin(x * fr + ph) * amp + Math.sin(x * fr * 2.7 + ph * 2) * amp * 0.35;
    let d = `M-20 ${f(top(-20))}`;
    for (let x = -20; x <= W + 20; x += 10) d += ` L${x} ${f(top(x))}`;
    for (let x = W + 20; x >= -20; x -= 10) d += ` L${x} ${f(top(x) + depth + Math.sin(x * 0.02 + bi) * 25)}`;
    au += `<path d="${d} Z" fill="url(#${g})" opacity="${op}" filter="url(#a-b8)"/>`;
    for (let x = 0; x < W; x += 3 + r() * 5) {
      const y = top(x), len = depth * (0.6 + r() * 0.7);
      au += `<line x1="${f(x)}" y1="${f(y + depth * 0.15)}" x2="${f(x)}" y2="${f(y + len)}" stroke="${bi % 2 ? "#a7f3d0" : "#99f6e4"}" stroke-width="${f(0.6 + r() * 1.4)}" opacity="${f((0.04 + r() * 0.12) * op)}"/>`;
    }
  });
  const moon = `<circle cx="640" cy="120" r="70" fill="#fef3c7" opacity=".08" filter="url(#a-b20)"/><circle cx="640" cy="120" r="26" fill="url(#a-moon)" mask="url(#a-cres)"/>`;
  let mts = "";
  const cols = ["#1f5f66", "#174a52", "#10363e", "#0a242b"];
  ([[470, 0.55, 150], [520, 0.52, 120], [565, 0.5, 90], [610, 0.48, 50]] as const).forEach(([base, rough, amp], i) => {
    const ys = ridge(r, 128, base, rough, amp);
    mts += `<path d="${ridgePath(ys, 640)}" fill="${cols[i]}"/>`;
    if (i === 0) mts += `<path d="${snowPath(ys, base - 40, 14)}" fill="#e0f2fe" opacity=".45"/>`;
    mts += `<rect x="0" y="${base - 10}" width="${W}" height="60" fill="#99f6e4" opacity=".05" filter="url(#a-b20)"/>`;
  });
  let pines = "";
  for (let x = -10; x < W + 10; x += 6 + r() * 9) {
    const h = 30 + r() * 60 + (Math.abs(x - 400) > 230 ? 35 : 0);
    pines += pine(x, 642, h, mix("#020c10", "#05181d", r()));
  }
  let lake = `<rect y="640" width="${W}" height="${H - 640}" fill="url(#a-lake)"/>`;
  lake += `<g transform="translate(0 1280) scale(1 -1)" opacity=".38" filter="url(#a-b3)">${au}${mts}${pines}</g>`;
  for (let i = 0; i < 90; i++) {
    const y = 645 + Math.pow(r(), 1.6) * 250, x = r() * W, w = 20 + r() * 120;
    lake += `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x + w)}" y2="${f(y)}" stroke="#a7f3d0" stroke-width=".8" opacity="${f(0.05 + r() * 0.15)}"/>`;
  }
  const canoe = `<g transform="translate(470 760)"><g class="fx-bob" style="--d:5s;--b:2px"><ellipse cx="0" cy="10" rx="110" ry="6" fill="#5eead4" opacity=".08"/><path d="M-70 0 Q0 16 70 0 Q60 8 0 10 Q-60 8 -70 0Z" fill="#010507"/><path d="M-12 0 l4 -22 q4 -6 8 0 l3 22z" fill="#010507"/><circle cx="-6" cy="-28" r="6" fill="#010507"/><line x1="-30" y1="-30" x2="18" y2="16" stroke="#010507" stroke-width="2.5"/><path d="M-70 4 Q0 22 70 4" fill="none" stroke="#99f6e4" stroke-width=".8" opacity=".35"/></g></g>`;
  // motion: shimmering lights, twinkling stars, a shooting star, ripples and the drifting canoe
  let fx = `<defs><radialGradient id="afx-glow"><stop offset="0" stop-color="#5eead4" stop-opacity=".55"/><stop offset=".6" stop-color="#34d399" stop-opacity=".18"/><stop offset="1" stop-color="#34d399" stop-opacity="0"/></radialGradient><radialGradient id="afx-glow2"><stop offset="0" stop-color="#c084fc" stop-opacity=".4"/><stop offset="1" stop-color="#c084fc" stop-opacity="0"/></radialGradient></defs>`;
  ([[220, 230, 260, 90, "afx-glow", 7, 0], [560, 300, 240, 80, "afx-glow2", 9, 3], [430, 190, 300, 70, "afx-glow", 11, 6]] as const).forEach(([x, y, rx, ry, g, d, dl]) => {
    fx += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${g})" class="fx-pulse" style="--d:${d}s;--dl:-${dl}s"/>`;
  });
  for (let i = 0; i < 40; i++) {
    fx += `<circle cx="${f(r() * W)}" cy="${f(r() * 420)}" r="${f(0.9 + r() * 0.9)}" fill="#f0f9ff" class="fx-twinkle" style="--d:${f(2 + r() * 4)}s;--dl:-${f(r() * 6)}s"/>`;
  }
  fx += `<g transform="translate(700 70)"><g class="fx-shoot" style="--d:11s;--dl:-3s"><line x1="0" y1="0" x2="60" y2="-24" stroke="url(#afx-tail)" stroke-width="2" stroke-linecap="round"/></g></g>`;
  fx += `<defs><linearGradient id="afx-tail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
  for (let i = 0; i < 26; i++) {
    const y = 650 + Math.pow(r(), 1.4) * 230, x = r() * W, w = 20 + r() * 90;
    fx += `<g class="fx-drift" style="--d:${f(6 + r() * 6)}s;--dl:-${f(r() * 8)}s;--dx:${f(10 + r() * 20)}px"><line x1="${f(x)}" y1="${f(y)}" x2="${f(x + w)}" y2="${f(y)}" stroke="#a7f3d0" stroke-width=".9" opacity="${f(0.12 + r() * 0.2)}"/></g>`;
  }
  [0, 2, 4].forEach((dl) => (fx += `<ellipse cx="470" cy="772" rx="60" ry="5" fill="none" stroke="#99f6e4" stroke-width=".8" class="fx-ripple" style="--d:6s;--dl:-${dl}s"/>`));
  fx += canoe;
  return { bg: s0 + stars + `<g clip-path="url(#a-up)">${au}${moon}${mts}</g>${pines}` + lake, fx: fx + shade("a") };
}

// ── 2. Glacier lake at sunrise ────────────────────────────────────
function glacier() {
  const r = rng(12);
  const s = `<defs>
    <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".3" stop-color="#6d5bd0"/><stop offset=".52" stop-color="#f0a1c2"/><stop offset=".64" stop-color="#fed7aa"/></linearGradient>
    <linearGradient id="g-lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2dd4bf"/><stop offset=".45" stop-color="#0891b2"/><stop offset="1" stop-color="#083344"/></linearGradient>
    <linearGradient id="g-rock" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b5b95"/><stop offset=".55" stop-color="#8c7bb8"/><stop offset="1" stop-color="#5b4b86"/></linearGradient>
    <radialGradient id="g-sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbeb"/><stop offset=".4" stop-color="#fde68a" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
    <filter id="g-b12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="g-b3"><feGaussianBlur stdDeviation="3"/></filter>
    <clipPath id="g-up"><rect width="${W}" height="560"/></clipPath>
    <linearGradient id="g-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="g-refl" maskUnits="userSpaceOnUse" x="0" y="560" width="${W}" height="340"><rect y="560" width="${W}" height="300" fill="url(#g-fade)"/></mask>
  </defs><rect width="${W}" height="${H}" fill="url(#g-sky)"/>`;
  // sun glow and rays behind the peaks
  let sky = `<circle cx="470" cy="330" r="190" fill="url(#g-sun)"/>`;
  for (let k = 0; k < 22; k++) {
    const a = -Math.PI + (k / 21) * Math.PI, w = 0.025 + r() * 0.03;
    sky += `<path d="M470 330 L${f(470 + Math.cos(a - w) * 700)} ${f(330 + Math.sin(a - w) * 700)} L${f(470 + Math.cos(a + w) * 700)} ${f(330 + Math.sin(a + w) * 700)}Z" fill="#fff7ed" opacity="${f(0.04 + r() * 0.06)}"/>`;
  }
  // streaky clouds
  for (let i = 0; i < 16; i++) {
    const y = 80 + r() * 260, x = r() * W, w = 120 + r() * 260;
    sky += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(w)}" ry="${f(6 + r() * 10)}" fill="${y < 200 ? "#c4b5fd" : "#fbcfe8"}" opacity="${f(0.25 + r() * 0.35)}" filter="url(#g-b3)"/>`;
    sky += `<ellipse cx="${f(x + 10)}" cy="${f(y + 4)}" rx="${f(w * 0.7)}" ry="3" fill="#fff7ed" opacity=".35"/>`;
  }
  for (let i = 0; i < 70; i++) sky += `<circle cx="${f(r() * W)}" cy="${f(r() * 150)}" r="${f(0.4 + r() * 0.8)}" fill="#fff" opacity="${f(0.2 + r() * 0.5)}"/>`;
  // mountains with snow and gullies
  let mts = "";
  const far = ridge(r, 128, 330, 0.62, 260);
  mts += `<path d="${ridgePath(far, 560)}" fill="url(#g-rock)"/>`;
  mts += `<path d="${snowPath(far, 380, 55)}" fill="#fdf2f8" opacity=".92"/>`;
  for (let i = 4; i < 124; i += 2) {
    const x = xAt(i, 128), y = far[i];
    if (y > 440 || r() < 0.4) continue;
    const len = 20 + r() * 70;
    mts += `<path d="M${f(x)} ${f(y + 4)} q${f((r() - 0.5) * 20)} ${f(len / 2)} ${f((r() - 0.5) * 30)} ${f(len)}" fill="none" stroke="${y < 380 ? "#c7b9e6" : "#4c3f75"}" stroke-width="${f(0.6 + r() * 1)}" opacity=".3"/>`;
  }
  mts += `<rect x="0" y="430" width="${W}" height="80" fill="#fbcfe8" opacity=".25" filter="url(#g-b12)"/>`;
  const mid = ridge(r, 96, 470, 0.55, 90);
  mts += `<path d="${ridgePath(mid, 560)}" fill="#2f4858"/>`;
  for (let x = -6; x < W + 6; x += 4 + r() * 5) {
    const i = Math.min(96, Math.max(0, Math.round((x / W) * 96)));
    const y = mid[i] + 6 + r() * 30;
    if (y < 560) mts += pine(x, y + 20, 14 + r() * 16, mix("#14332e", "#1d4a40", r()));
  }
  const shoreY = 560;
  let near = "", gold = "";
  for (let x = -10; x < W + 10; x += 5 + r() * 7) {
    const edge = Math.abs(x - 400) / 400;
    const h = 20 + r() * 40 + edge * 70;
    // larches go on top so their outline stays whole
    if (r() < 0.14) gold += pine(x, shoreY + 2, h * 0.85, mix("#c2610c", "#e8a317", r()));
    else near += pine(x, shoreY + 2, h, mix("#062b25", "#0c3d33", r()));
  }
  near += gold;
  const up = `<g clip-path="url(#g-up)">${sky}${mts}</g>`;
  // lake with reflection and ripples
  let lake = `<rect y="${shoreY}" width="${W}" height="${H - shoreY}" fill="url(#g-lake)"/>`;
  lake += `<g mask="url(#g-refl)"><g transform="translate(0 ${shoreY * 2}) scale(1 -1)" opacity=".5" filter="url(#g-b3)">${sky}${mts}${near}</g></g>`;
  lake += `<rect y="${shoreY - 8}" width="${W}" height="40" fill="#fff" opacity=".18" filter="url(#g-b12)"/>`;
  for (let i = 0; i < 120; i++) {
    const y = shoreY + 6 + Math.pow(r(), 1.5) * 330, x = r() * W, w = 15 + r() * 110;
    lake += `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x + w)}" y2="${f(y)}" stroke="#ecfeff" stroke-width=".9" opacity="${f(0.06 + r() * 0.2)}"/>`;
  }
  // shoreline boulders, foreground left
  let rocks = "";
  for (let i = 0; i < 14; i++) {
    const x = r() * 260, y = 820 + r() * 70, rx = 18 + r() * 40;
    rocks += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * 0.55)}" fill="${mix("#1f2937", "#475569", r())}"/><ellipse cx="${f(x - rx * 0.2)}" cy="${f(y - rx * 0.25)}" rx="${f(rx * 0.6)}" ry="${f(rx * 0.22)}" fill="#fde68a" opacity=".12"/>`;
  }
  // a pair of loons
  const loon = (x: number, y: number, k: number) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-14 0 Q0 -8 14 -2 Q8 4 -14 2Z" fill="#0b1320"/><path d="M10 -3 q4 -10 10 -9 l4 2 -6 1 q-2 4 -5 7z" fill="#0b1320"/><line x1="-20" y1="4" x2="22" y2="4" stroke="#ecfeff" stroke-width=".8" opacity=".5"/></g>`;
  // motion: loons swimming, a flock crossing the sky, sparkles on the water
  let fx = "";
  for (let i = 0; i < 36; i++) {
    const x = 370 + r() * 200 + (r() - 0.5) * 120, y = 575 + Math.pow(r(), 1.3) * 160, w = 6 + r() * 22;
    fx += `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x + w)}" y2="${f(y)}" stroke="#fffbeb" stroke-width="1.2" stroke-linecap="round" class="fx-twinkle" style="--d:${f(1.6 + r() * 2.4)}s;--dl:-${f(r() * 4)}s"/>`;
  }
  const swim = (x: number, y: number, k: number, d: number, dl: number) =>
    `<g transform="translate(${x} ${y})"><g class="fx-swim" style="--d:${d}s;--dl:-${dl}s;--dx:-90px"><g class="fx-bob" style="--d:3.2s;--b:1px">${loon(0, 0, k)}<path d="M18 4 L48 -2 M18 5 L50 10" stroke="#ecfeff" stroke-width=".7" opacity=".35"/></g></g></g>`;
  fx += swim(560, 690, 1.1, 48, 4) + swim(604, 703, 0.9, 52, 0);
  let birds = "";
  [[0, 0], [-22, -10], [-22, 12], [-44, -18], [-44, 22]].forEach(([dx, dy], i) => (birds += bird(dx, 170 + dy, 0.8, "#3b2f63", 0.9 + i * 0.07)));
  fx += flock(birds, 36, 10);
  return { bg: s + up + near + lake + rocks, fx: fx + shade("g") };
}

// ── 3. Autumn forest hills in morning haze ───────────────────────────────
function autumn() {
  const r = rng(31);
  let s = `<defs>
    <linearGradient id="u-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset=".45" stop-color="#bae6fd"/><stop offset=".75" stop-color="#fef3c7"/></linearGradient>
    <filter id="u-b14" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="u-b2"><feGaussianBlur stdDeviation="1.2"/></filter>
  </defs><rect width="${W}" height="${H}" fill="url(#u-sky)"/>`;
  s += `<circle cx="160" cy="170" r="110" fill="#fff" opacity=".55" filter="url(#u-b14)"/><circle cx="160" cy="170" r="36" fill="#fffbeb"/>`;
  let fx = "";
  // soft clouds, drifting
  for (let i = 0; i < 6; i++) {
    const x = 120 + r() * 600, y = 80 + r() * 160;
    let c = "";
    for (let k = 0; k < 6; k++) c += `<circle cx="${f(x + k * 22)}" cy="${f(y - Math.sin((k / 5) * Math.PI) * 18)}" r="${f(18 + r() * 14)}"/>`;
    fx += `<g class="fx-drift" style="--d:${f(24 + r() * 16)}s;--dl:-${f(r() * 20)}s;--dx:${f(30 + r() * 40)}px"><g fill="#fff" opacity=".85">${c}</g></g>`;
  }
  // geese
  let geese = "";
  for (let i = 0; i < 13; i++) geese += bird(-Math.abs(i - 6) * 16, 200 + (i - 6) * 9, 0.85, "#1e293b", 1.1 + (i % 3) * 0.08);
  const geeseFx = flock(geese, 42, 14, -60, 1000);
  // blue mountains
  s += `<path d="${ridgePath(ridge(r, 96, 360, 0.56, 140), H)}" fill="#7aa5c4"/>`;
  s += `<path d="${ridgePath(ridge(r, 96, 400, 0.55, 110), H)}" fill="#5a86a8"/>`;
  s += `<rect y="380" width="${W}" height="70" fill="#fff" opacity=".45" filter="url(#u-b14)"/>`;
  const palette = ["#7f1d1d", "#b91c1c", "#dc2626", "#ea580c", "#f97316", "#f59e0b", "#facc15", "#a3a312", "#65a30d", "#14532d"];
  const layers = [
    { base: 440, amp: 40, haze: 0.55, size: 7, step: 7 },
    { base: 510, amp: 50, haze: 0.38, size: 10, step: 9 },
    { base: 600, amp: 55, haze: 0.2, size: 14, step: 12 },
    { base: 700, amp: 60, haze: 0.06, size: 20, step: 16 },
  ];
  const curves = layers.map((L) => {
    const ph = r() * 6, fr = 0.006 + r() * 0.004;
    return (x: number) => L.base + Math.sin(x * fr + ph) * L.amp + Math.sin(x * fr * 2.3 + ph) * L.amp * 0.4;
  });
  layers.forEach((L, li) => {
    const yAt = curves[li];
    const limit = (x: number) => (li + 1 < layers.length ? curves[li + 1](x) + L.size * 1.5 : H + 10);
    let d = `M0 ${H}`;
    for (let x = 0; x <= W; x += 8) d += ` L${x} ${f(yAt(x))}`;
    d += ` L${W} ${H}Z`;
    s += `<path d="${d}" fill="${mix("#4a1a0c", "#9fb0c4", L.haze)}"/>`;
    // forest canopy: rows of tree crowns
    let crowns = "";
    for (let row = 0; row < 40; row++) {
      for (let x = -10; x < W + 10; x += L.step * (0.7 + r() * 0.6)) {
        const y = yAt(x) + row * L.size * 0.9 + (r() - 0.3) * L.size;
        if (y > limit(x)) continue;
        const c = mix(palette[Math.floor(r() * palette.length)], "#dbe4ee", L.haze);
        if (r() < 0.12) { crowns += pine(x, y + L.size * 0.6, L.size * 2.6, mix("#14532d", "#dbe4ee", L.haze)); continue; }
        const k = L.size * (0.7 + r() * 0.5);
        crowns += `<g fill="${c}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(k)}"/><circle cx="${f(x - k * 0.6)}" cy="${f(y + k * 0.35)}" r="${f(k * 0.75)}"/><circle cx="${f(x + k * 0.6)}" cy="${f(y + k * 0.3)}" r="${f(k * 0.7)}"/></g><circle cx="${f(x - k * 0.3)}" cy="${f(y - k * 0.35)}" r="${f(k * 0.35)}" fill="#fff7ed" opacity="${f(0.18 * (1 - L.haze))}"/>`;
      }
    }
    s += crowns;
    if (li < 3) s += `<rect y="${L.base + 20}" width="${W}" height="60" fill="#fff" opacity="${0.35 - li * 0.08}" filter="url(#u-b14)"/>`;
  });
  // drifting leaves in the foreground
  const leaf = "M0 -10 L2 -4 L7 -6 L5 -1 L10 0 L4 3 L5 8 L0 5 L-5 8 L-4 3 L-10 0 L-5 -1 L-7 -6 L-2 -4Z";
  for (let i = 0; i < 18; i++) {
    const x = r() * W, k = 0.8 + r() * 1.2, d = 11 + r() * 9;
    // each leaf falls the full height, swaying and spinning; negative delays spread them out
    fx += `<g transform="translate(${f(x)} 0)"><g class="fx-fall" style="--d:${f(d)}s;--dl:-${f(r() * d)}s;--dx:${f((r() - 0.5) * 160)}px"><g class="fx-sway" style="--d:${f(2.5 + r() * 2)}s;--dl:-${f(r() * 3)}s"><path d="${leaf}" transform="scale(${f(k)})" fill="${palette[2 + Math.floor(r() * 5)]}" opacity=".92"/></g></g></g>`;
  }
  return { bg: s, fx: fx + geeseFx + shade("u") };
}

// ── 4. Winter night snowfall ──────────────────────────────────────
function winter() {
  const r = rng(47);
  let s = `<defs>
    <linearGradient id="w-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b24"/><stop offset=".5" stop-color="#1e3a8a"/><stop offset=".8" stop-color="#6b8fd6"/></linearGradient>
    <linearGradient id="w-snow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef4ff"/><stop offset="1" stop-color="#a5b8de"/></linearGradient>
    <radialGradient id="w-moon" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dbeafe"/></radialGradient>
    <radialGradient id="w-warm" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fcd34d" stop-opacity=".7"/><stop offset="1" stop-color="#fcd34d" stop-opacity="0"/></radialGradient>
    <filter id="w-b20" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
  </defs><rect width="${W}" height="${H}" fill="url(#w-sky)"/>`;
  for (let i = 0; i < 260; i++) s += `<circle cx="${f(r() * W)}" cy="${f(r() * 420)}" r="${f(0.3 + r() * 0.9)}" fill="#fff" opacity="${f(0.2 + r() * 0.7)}"/>`;
  s += `<circle cx="590" cy="170" r="140" fill="#dbeafe" opacity=".18" filter="url(#w-b20)"/><circle cx="590" cy="170" r="48" fill="url(#w-moon)"/>`;
  [[575, 160, 9], [604, 182, 6], [592, 150, 4], [570, 186, 5]].forEach(([x, y, k]) => (s += `<circle cx="${x}" cy="${y}" r="${k}" fill="#c7d2fe" opacity=".45"/>`));
  // snowy mountains
  const m1 = ridge(r, 96, 400, 0.58, 170);
  s += `<path d="${ridgePath(m1, H)}" fill="#8aa4d6"/><path d="${snowPath(m1, 470, 90)}" fill="#e8efff" opacity=".85"/>`;
  const m2 = ridge(r, 96, 470, 0.55, 110);
  s += `<path d="${ridgePath(m2, H)}" fill="#5d78b8"/><path d="${snowPath(m2, 520, 40)}" fill="#dbe6ff" opacity=".7"/>`;
  s += `<rect y="470" width="${W}" height="80" fill="#dbeafe" opacity=".25" filter="url(#w-b20)"/>`;
  // three rows of snow-laden pines
  ([[540, 22, 30, "#2a3f72"], [600, 32, 40, "#1d2f5c"], [665, 44, 60, "#132247"]] as const).forEach(([y0, gap, hmax, col]) => {
    for (let x = -10; x < W + 10; x += gap * (0.4 + r() * 0.5)) {
      s += pine(x, y0 + r() * 16, hmax * (0.6 + r() * 0.6), col, "#eef4ff");
    }
  });
  // snow drifts
  s += `<path d="M0 700 C 160 660, 300 720, 460 690 S 700 650, 800 690 L800 900 L0 900Z" fill="url(#w-snow)"/>`;
  s += `<path d="M0 780 C 200 740, 380 800, 560 760 S 760 740, 800 770 L800 900 L0 900Z" fill="#f4f8ff"/>`;
  s += `<path d="M0 780 C 200 740, 380 800, 560 760 S 760 740, 800 770" fill="none" stroke="#b4c6ea" stroke-width="3" opacity=".6"/>`;
  // cabin with warm windows and chimney smoke
  s += `<g transform="translate(560 702)">
    <circle cx="0" cy="0" r="90" fill="url(#w-warm)"/>
    <rect x="-40" y="-34" width="80" height="44" fill="#3b2a1e"/>
    ${[-26, -18, -10, -2, 6].map((y) => `<line x1="-40" y1="${y}" x2="40" y2="${y}" stroke="#2a1c12" stroke-width="1.5"/>`).join("")}
    <path d="M-50 -32 L0 -66 L50 -32 Z" fill="#f4f8ff"/><path d="M-50 -32 L0 -66 L50 -32 L44 -28 L0 -58 L-44 -28Z" fill="#cbd8f2"/>
    <rect x="18" y="-70" width="10" height="22" fill="#4a3426"/><rect x="16" y="-74" width="14" height="6" fill="#f4f8ff"/>
    <rect x="-28" y="-22" width="16" height="14" fill="#fcd34d"/><rect x="12" y="-22" width="16" height="14" fill="#fbbf24"/>
    <line x1="-20" y1="-22" x2="-20" y2="-8" stroke="#3b2a1e" stroke-width="1.5"/><line x1="20" y1="-22" x2="20" y2="-8" stroke="#3b2a1e" stroke-width="1.5"/>
    <rect x="-6" y="-14" width="12" height="24" fill="#2a1c12"/>
  </g>`;
  // motion: chimney smoke, flickering windows and three depths of falling snow
  let fx = `<defs><radialGradient id="wfx-puff"><stop offset="0" stop-color="#e2e8f0" stop-opacity=".55"/><stop offset="1" stop-color="#e2e8f0" stop-opacity="0"/></radialGradient></defs><g transform="translate(560 702)">`;
  for (let k = 0; k < 6; k++) fx += `<circle cx="23" cy="-78" r="12" fill="url(#wfx-puff)" class="fx-smoke" style="--d:6s;--dl:-${k}s"/>`;
  fx += `<rect x="-28" y="-22" width="16" height="14" fill="#fef3c7" class="fx-flicker" style="--d:2.6s"/><rect x="12" y="-22" width="16" height="14" fill="#fef3c7" class="fx-flicker" style="--d:3.4s;--dl:-1s"/></g>`;
  // footprints leading to the cabin
  for (let i = 0; i < 14; i++) {
    const t = i / 13, x = 180 + t * 360 + (i % 2 ? 6 : -6), y = 880 - t * 160;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(4 - t * 2)}" ry="${f(2.2 - t)}" fill="#9fb3dc"/>`;
  }
  // falling snow, three depths
  ([[150, 0.6, 1.2, 0.45, 60], [100, 1.2, 1.4, 0.6, 38], [40, 2.4, 2, 0.6, 24]] as const).forEach(([n, r0, rr, op, d]) => {
    let flakes = "";
    for (let i = 0; i < n; i++) {
      const x = r() * W, y = r() * H, rad = f(r0 + r() * rr), o = f(op * (0.6 + r() * 0.4));
      // each flake is drawn twice, one screen apart, so the layer loops seamlessly
      flakes += `<circle cx="${f(x)}" cy="${f(y)}" r="${rad}" opacity="${o}"/><circle cx="${f(x)}" cy="${f(y - H)}" r="${rad}" opacity="${o}"/>`;
    }
    fx += `<g class="fx-sway-x" style="--d:${f(d / 5)}s;--dx:${f(d / 2)}px"><g class="fx-snow" fill="#fff" style="--d:${d}s">${flakes}</g></g>`;
  });
  return { bg: s, fx: fx + shade("w") };
}

// ── 5. Prairie at golden hour ─────────────────────────────────────
function prairie() {
  const r = rng(58);
  const horizon = 560;
  let s = `<defs>
    <linearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".3" stop-color="#6d28d9"/><stop offset=".5" stop-color="#ec4899"/><stop offset=".64" stop-color="#fb923c"/><stop offset=".64" stop-color="#fdba74"/></linearGradient>
    <linearGradient id="p-field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f59e0b"/><stop offset=".4" stop-color="#b45309"/><stop offset="1" stop-color="#431407"/></linearGradient>
    <linearGradient id="p-cloud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset=".6" stop-color="#f472b6"/><stop offset="1" stop-color="#fed7aa"/></linearGradient>
    <radialGradient id="p-sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbeb"/><stop offset=".35" stop-color="#fde68a"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
    <filter id="p-b1"><feGaussianBlur stdDeviation="1.6"/></filter>
    <filter id="p-b4"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="p-b18" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
  </defs><rect width="${W}" height="${H}" fill="url(#p-sky)"/>`;
  for (let i = 0; i < 120; i++) s += `<circle cx="${f(r() * W)}" cy="${f(r() * 200)}" r="${f(0.3 + r() * 0.8)}" fill="#fff" opacity="${f(0.2 + r() * 0.6)}"/>`;
  // towering clouds lit from below
  let ci = 0;
  const cloud = (cx: number, cy: number, w: number, h: number) => {
    const id = `p-cl${ci++}`;
    let g = `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${f(cy - h - 60)}" x2="0" y2="${f(cy + 30)}"><stop offset="0" stop-color="#8b5cf6"/><stop offset=".55" stop-color="#f472b6"/><stop offset="1" stop-color="#fed7aa"/></linearGradient></defs>`;
    for (let i = 0; i < 26; i++) {
      const x = cx + (r() - 0.5) * w, y = cy - Math.pow(r(), 0.8) * h, rad = 20 + r() * 45;
      g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}"/>`;
    }
    for (let i = 0; i < 12; i++) g += `<circle cx="${f(cx + (r() - 0.5) * w * 1.1)}" cy="${f(cy + r() * 12)}" r="${f(18 + r() * 22)}"/>`;
    return `<g fill="url(#${id})" opacity=".9" filter="url(#p-b1)">${g}</g><g fill="#fde68a" opacity=".35" filter="url(#p-b4)">${Array.from({ length: 8 }, () => `<ellipse cx="${f(cx + (r() - 0.5) * w)}" cy="${f(cy + 14)}" rx="${f(26 + r() * 30)}" ry="6"/>`).join("")}</g>`;
  };
  s += cloud(200, 300, 300, 160) + cloud(620, 250, 260, 140) + cloud(420, 420, 380, 60);
  // low sun
  s += `<circle cx="400" cy="${horizon}" r="230" fill="url(#p-sun)"/><circle cx="400" cy="${horizon}" r="44" fill="#fffbeb"/>`;
  // swallows
  let swallows = "";
  for (let i = 0; i < 7; i++) swallows += bird(r() * 220, 450 + r() * 70, 0.6 + r() * 0.5, "#2e1065", 0.45 + r() * 0.2);
  let fx = flock(swallows, 30, 6, -300, 900);
  // distant hills, canola strip and field
  s += `<path d="${ridgePath(ridge(r, 64, horizon - 8, 0.5, 18), H)}" fill="#7c2d6b" opacity=".85"/>`;
  s += `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#p-field)"/>`;
  s += `<path d="M0 ${horizon + 6} C 200 ${horizon - 2}, 500 ${horizon + 14}, 800 ${horizon + 4} L800 ${horizon + 22} C 500 ${horizon + 30}, 200 ${horizon + 16}, 0 ${horizon + 22}Z" fill="#facc15"/>`;
  s += `<rect y="${horizon - 20}" width="${W}" height="50" fill="#fdba74" opacity=".4" filter="url(#p-b18)"/>`;
  // lone tree on a rise
  s += `<g transform="translate(640 ${horizon + 6})"><path d="M-3 0 L-2 -38 L-12 -54 L-1 -44 L0 -62 L2 -44 L14 -56 L3 -36 L4 0Z" fill="#2a0f2f"/>${Array.from({ length: 16 }, () => `<circle cx="${f((r() - 0.5) * 70)}" cy="${f(-60 - r() * 40)}" r="${f(12 + r() * 12)}" fill="#2a0f2f"/>`).join("")}</g>`;
  // wheat: thousands of stalks, larger toward the viewer
  let wheat = "";
  // the tallest stalks sway in the wind, in three bands that move slightly out of step
  const sway = ["", "", ""];
  for (let i = 0; i < 2200; i++) {
    const t = Math.pow(r(), 1.6);
    const y = horizon + 24 + t * (H - horizon - 10);
    const x = r() * W;
    const h = 6 + t * 70;
    const lean = (r() - 0.3) * h * 0.25;
    const col = mix("#fde68a", "#92400e", Math.min(1, t * 0.9 + r() * 0.25));
    let st = `<path d="M${f(x)} ${f(y)} q${f(lean * 0.3)} ${f(-h * 0.5)} ${f(lean)} ${f(-h)}" fill="none" stroke="${col}" stroke-width="${f(0.5 + t * 1.4)}" opacity="${f(0.55 + t * 0.4)}"/>`;
    if (t > 0.25) st += `<ellipse cx="${f(x + lean)}" cy="${f(y - h)}" rx="${f(1 + t * 2.2)}" ry="${f(3 + t * 6)}" transform="rotate(${f((lean / h) * 60)} ${f(x + lean)} ${f(y - h)})" fill="${mix(col, "#fef3c7", 0.25)}"/>`;
    if (t > 0.5) sway[Math.floor(r() * 3)] += st;
    else wheat += st;
  }
  s += wheat;

  // fireflies of pollen in the light
  for (let i = 0; i < 60; i++) {
    fx += `<circle cx="${f(200 + r() * 400)}" cy="${f(horizon - 40 + r() * 200)}" r="${f(0.8 + r() * 1.6)}" fill="#fef3c7" class="fx-float" style="--d:${f(5 + r() * 5)}s;--dl:-${f(r() * 10)}s;--dx:${f((r() - 0.5) * 40)}px;--o:${f(0.3 + r() * 0.6)}"/>`;
  }
  return { bg: s, fx: fx + shade("p"), wind: sway };
}

export interface Scene {
  id: string;
  name: string;
  /**
   * bg is the still painting; fx holds the moving pieces, drawn on top in the same 800×900 space.
   * wind layers are separate full-size images that sway as a whole (cheap for many small shapes).
   */
  render: () => { bg: string; fx: string; wind?: string[] };
}

/** Keyframes for the moving pieces. Animations pause outside the active slide and stop for reduced motion. */
export const SCENE_FX_CSS = `
.scene-fx *{animation-duration:var(--d,6s);animation-delay:var(--dl,0s);animation-iteration-count:infinite;animation-timing-function:ease-in-out}
.scene-fx.fx-off *{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.scene-fx *{animation:none!important}}
.fx-flap{animation-name:fx-flap;transform-box:fill-box;transform-origin:50% 100%}
@keyframes fx-flap{0%,100%{transform:scaleY(1)}50%{transform:scaleY(-.45)}}
.fx-fly{animation-name:fx-fly;animation-timing-function:linear!important}
@keyframes fx-fly{0%{transform:translate(var(--from),0)}50%{transform:translate(calc((var(--from) + var(--to)) / 2),-14px)}100%{transform:translate(var(--to),0)}}
.fx-fall{animation-name:fx-fall;animation-timing-function:linear!important}
@keyframes fx-fall{from{transform:translate(0,-40px)}to{transform:translate(var(--dx),940px)}}
.fx-sway{animation-name:fx-sway;animation-direction:alternate}
@keyframes fx-sway{from{transform:translateX(-14px) rotate(-40deg)}to{transform:translateX(14px) rotate(50deg)}}
.fx-sway-x{animation-name:fx-sway-x;animation-direction:alternate}
@keyframes fx-sway-x{from{transform:translateX(0)}to{transform:translateX(var(--dx))}}
.fx-snow{animation-name:fx-snow;animation-timing-function:linear!important}
@keyframes fx-snow{from{transform:translateY(0)}to{transform:translateY(900px)}}
.fx-drift{animation-name:fx-drift;animation-direction:alternate}
@keyframes fx-drift{from{transform:translateX(0)}to{transform:translateX(var(--dx))}}
.fx-bob{animation-name:fx-bob}
@keyframes fx-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(var(--b,2px))}}
.fx-swim{animation-name:fx-swim}
@keyframes fx-swim{0%{transform:translateX(0) scaleX(1)}47%{transform:translateX(var(--dx)) scaleX(1)}50%{transform:translateX(var(--dx)) scaleX(-1)}97%{transform:translateX(0) scaleX(-1)}100%{transform:translateX(0) scaleX(1)}}
.fx-twinkle{animation-name:fx-twinkle}
@keyframes fx-twinkle{0%,100%{opacity:var(--o,.9)}50%{opacity:.1}}
.fx-pulse{animation-name:fx-pulse}
@keyframes fx-pulse{0%,100%{opacity:.25}50%{opacity:.85}}
.fx-shoot{animation-name:fx-shoot;animation-timing-function:linear!important;opacity:0}
@keyframes fx-shoot{0%{transform:translate(0,0);opacity:0}2%{opacity:1}9%{transform:translate(-300px,120px);opacity:0}100%{transform:translate(-300px,120px);opacity:0}}
.fx-ripple{animation-name:fx-ripple;animation-timing-function:ease-out!important;transform-box:fill-box;transform-origin:center;opacity:0}
@keyframes fx-ripple{0%{transform:scale(.6);opacity:.45}100%{transform:scale(1.8);opacity:0}}
.fx-smoke{animation-name:fx-smoke;animation-timing-function:ease-out!important;transform-box:fill-box;transform-origin:center;opacity:0}
@keyframes fx-smoke{0%{transform:translate(0,0) scale(.5);opacity:.9}100%{transform:translate(26px,-110px) scale(2.6);opacity:0}}
.fx-flicker{animation-name:fx-flicker}
@keyframes fx-flicker{0%,100%{opacity:.15}30%{opacity:.45}60%{opacity:.05}80%{opacity:.35}}
.fx-wind{animation:fx-wind 6s ease-in-out var(--dl,0s) infinite;transform-origin:50% 100%;will-change:transform}
.fx-off .fx-wind{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.fx-wind{animation:none}}
@keyframes fx-wind{0%,100%{transform:skewX(0deg)}50%{transform:skewX(-2.5deg)}}
.fx-float{animation-name:fx-float;opacity:var(--o,.6)}
@keyframes fx-float{0%{transform:translate(0,0);opacity:0}30%{opacity:var(--o,.6)}100%{transform:translate(var(--dx),-50px);opacity:0}}
`;

export const SCENES: Scene[] = [
  { id: "aurora", name: "Northern lights", render: aurora },
  { id: "glacier", name: "Glacier lake sunrise", render: glacier },
  { id: "autumn", name: "Autumn hills", render: autumn },
  { id: "winter", name: "Winter night", render: winter },
  { id: "prairie", name: "Prairie golden hour", render: prairie },
];
