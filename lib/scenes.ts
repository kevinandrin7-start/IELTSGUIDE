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
  lake += `<g transform="translate(470 760)"><ellipse cx="0" cy="10" rx="110" ry="6" fill="#5eead4" opacity=".08"/><path d="M-70 0 Q0 16 70 0 Q60 8 0 10 Q-60 8 -70 0Z" fill="#010507"/><path d="M-12 0 l4 -22 q4 -6 8 0 l3 22z" fill="#010507"/><circle cx="-6" cy="-28" r="6" fill="#010507"/><line x1="-30" y1="-30" x2="18" y2="16" stroke="#010507" stroke-width="2.5"/><path d="M-70 4 Q0 22 70 4" fill="none" stroke="#99f6e4" stroke-width=".8" opacity=".35"/></g>`;
  return s0 + stars + `<g clip-path="url(#a-up)">${au}${moon}${mts}</g>${pines}` + lake + shade("a");
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
  return s + up + near + lake + rocks + loon(560, 690, 1.1) + loon(600, 702, 0.9) + shade("g");
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
  // soft clouds
  for (let i = 0; i < 6; i++) {
    const x = 120 + r() * 600, y = 80 + r() * 160;
    let c = "";
    for (let k = 0; k < 6; k++) c += `<circle cx="${f(x + k * 22)}" cy="${f(y - Math.sin((k / 5) * Math.PI) * 18)}" r="${f(18 + r() * 14)}"/>`;
    s += `<g fill="#fff" opacity=".85">${c}</g>`;
  }
  // geese
  for (let i = 0; i < 13; i++) {
    const x = 520 + Math.abs(i - 6) * 16, y = 150 + (i - 6) * 9 + (i > 6 ? 0 : 0);
    s += `<path d="M${x} ${y} q5 -5 10 0 q5 -5 10 0" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linecap="round"/>`;
  }
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
  for (let i = 0; i < 16; i++) {
    const x = r() * W, y = 200 + r() * 520;
    s += `<path d="${leaf}" transform="translate(${f(x)} ${f(y)}) rotate(${f(r() * 360)}) scale(${f(0.8 + r() * 1.2)})" fill="${palette[2 + Math.floor(r() * 5)]}" opacity=".9"/>`;
  }
  return s + shade("u");
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
    <filter id="w-b1"><feGaussianBlur stdDeviation="1"/></filter>
    <filter id="w-b6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
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
    ${[0, 1, 2, 3, 4].map((k) => `<circle cx="${f(26 + k * 9)}" cy="${f(-86 - k * 18)}" r="${f(6 + k * 3)}" fill="#e2e8f0" opacity="${f(0.35 - k * 0.05)}" filter="url(#w-b6)"/>`).join("")}
  </g>`;
  // footprints leading to the cabin
  for (let i = 0; i < 14; i++) {
    const t = i / 13, x = 180 + t * 360 + (i % 2 ? 6 : -6), y = 880 - t * 160;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(4 - t * 2)}" ry="${f(2.2 - t)}" fill="#9fb3dc"/>`;
  }
  // falling snow, three depths
  for (let i = 0; i < 520; i++) {
    const big = r() < 0.12;
    s += `<circle cx="${f(r() * W)}" cy="${f(r() * H)}" r="${f(big ? 2.2 + r() * 2 : 0.6 + r() * 1.2)}" fill="#fff" opacity="${f(big ? 0.55 : 0.3 + r() * 0.5)}" ${big ? 'filter="url(#w-b1)"' : ""}/>`;
  }
  return s + shade("w");
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
  for (let i = 0; i < 7; i++) {
    const x = 60 + r() * 220, y = 450 + r() * 70, k = 0.6 + r() * 0.6;
    s += `<path d="M${f(x)} ${f(y)} q${f(7 * k)} ${f(-5 * k)} ${f(13 * k)} ${f(-2 * k)} q${f(-6 * k)} ${f(1 * k)} ${f(-13 * k)} ${f(5 * k)} q${f(-7 * k)} ${f(-4 * k)} ${f(-13 * k)} ${f(-2 * k)} q${f(6 * k)} ${f(-3 * k)} ${f(13 * k)} ${f(-1 * k)}Z" fill="#2e1065"/>`;
  }
  // distant hills, canola strip and field
  s += `<path d="${ridgePath(ridge(r, 64, horizon - 8, 0.5, 18), H)}" fill="#7c2d6b" opacity=".85"/>`;
  s += `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#p-field)"/>`;
  s += `<path d="M0 ${horizon + 6} C 200 ${horizon - 2}, 500 ${horizon + 14}, 800 ${horizon + 4} L800 ${horizon + 22} C 500 ${horizon + 30}, 200 ${horizon + 16}, 0 ${horizon + 22}Z" fill="#facc15"/>`;
  s += `<rect y="${horizon - 20}" width="${W}" height="50" fill="#fdba74" opacity=".4" filter="url(#p-b18)"/>`;
  // lone tree on a rise
  s += `<g transform="translate(640 ${horizon + 6})"><path d="M-3 0 L-2 -38 L-12 -54 L-1 -44 L0 -62 L2 -44 L14 -56 L3 -36 L4 0Z" fill="#2a0f2f"/>${Array.from({ length: 16 }, () => `<circle cx="${f((r() - 0.5) * 70)}" cy="${f(-60 - r() * 40)}" r="${f(12 + r() * 12)}" fill="#2a0f2f"/>`).join("")}</g>`;
  // wheat: thousands of stalks, larger toward the viewer
  let wheat = "";
  for (let i = 0; i < 2200; i++) {
    const t = Math.pow(r(), 1.6);
    const y = horizon + 24 + t * (H - horizon - 10);
    const x = r() * W;
    const h = 6 + t * 70;
    const lean = (r() - 0.3) * h * 0.25;
    const col = mix("#fde68a", "#92400e", Math.min(1, t * 0.9 + r() * 0.25));
    wheat += `<path d="M${f(x)} ${f(y)} q${f(lean * 0.3)} ${f(-h * 0.5)} ${f(lean)} ${f(-h)}" fill="none" stroke="${col}" stroke-width="${f(0.5 + t * 1.4)}" opacity="${f(0.55 + t * 0.4)}"/>`;
    if (t > 0.25) wheat += `<ellipse cx="${f(x + lean)}" cy="${f(y - h)}" rx="${f(1 + t * 2.2)}" ry="${f(3 + t * 6)}" transform="rotate(${f((lean / h) * 60)} ${f(x + lean)} ${f(y - h)})" fill="${mix(col, "#fef3c7", 0.25)}"/>`;
  }
  s += wheat;
  // fireflies of pollen in the light
  for (let i = 0; i < 60; i++) s += `<circle cx="${f(200 + r() * 400)}" cy="${f(horizon - 40 + r() * 200)}" r="${f(0.8 + r() * 1.6)}" fill="#fef3c7" opacity="${f(0.3 + r() * 0.6)}"/>`;
  return s + shade("p");
}

export interface Scene {
  id: string;
  name: string;
  render: () => string;
}

export const SCENES: Scene[] = [
  { id: "aurora", name: "Northern lights", render: aurora },
  { id: "glacier", name: "Glacier lake sunrise", render: glacier },
  { id: "autumn", name: "Autumn hills", render: autumn },
  { id: "winter", name: "Winter night", render: winter },
  { id: "prairie", name: "Prairie golden hour", render: prairie },
];
