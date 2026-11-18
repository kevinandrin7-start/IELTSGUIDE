import { BookOpen, Headphones, Mic, PenLine } from "lucide-react";
import { Logo } from "./Logo";

const SKILLS = [
  { icon: Headphones, label: "Listening", band: "8.0", pos: "left-[8%] top-[22%]", delay: "0s" },
  { icon: BookOpen, label: "Reading", band: "7.0", pos: "right-[14%] top-[11%]", delay: "1.2s" },
  { icon: PenLine, label: "Writing", band: "7.0", pos: "left-[10%] top-[44%]", delay: "2.4s" },
  { icon: Mic, label: "Speaking", band: "7.0", pos: "right-[5%] top-[29%]", delay: "0.6s" },
];

/** Illustrated panel for the sign-in screens: a trail climbing to a CLB 9 summit at sunrise. */
export function AuthArt() {
  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden bg-[#06302d] text-white">
      {/* sky */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_70%_0%,#14b8a6_0%,#0d5f58_38%,#06302d_75%)]" />
      <div className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="absolute -right-16 bottom-40 -z-10 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl" />

      {/* stars */}
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-70" aria-hidden>
        {Array.from({ length: 36 }, (_, i) => (
          <circle key={i} cx={`${(i * 37) % 100}%`} cy={`${(i * 23) % 45}%`} r={i % 5 === 0 ? 1.4 : 0.8} fill="#ecfeff" opacity={0.35 + ((i * 13) % 6) / 10} />
        ))}
      </svg>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <Logo light />
      </div>

      {/* floating skill cards */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {SKILLS.map(({ icon: Icon, label, band, pos, delay }) => (
          <div
            key={label}
            className={`auth-float absolute ${pos} flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-md`}
            style={{ animationDelay: delay }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/15"><Icon size={16} /></span>
            <span className="leading-tight">
              <span className="block text-[11px] uppercase tracking-wide text-teal-100/80">{label}</span>
              <span className="block text-sm font-semibold">Band {band}</span>
            </span>
          </div>
        ))}
      </div>

      {/* landscape */}
      <svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[72%] w-full" aria-hidden>
        <defs>
          <linearGradient id="aa-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fef3c7" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="aa-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#23a597" />
            <stop offset="1" stopColor="#11796f" />
          </linearGradient>
          <linearGradient id="aa-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0f766e" />
            <stop offset="1" stopColor="#0b4f4a" />
          </linearGradient>
          <linearGradient id="aa-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a3d39" />
            <stop offset="1" stopColor="#042523" />
          </linearGradient>
        </defs>
        {/* sun */}
        <circle cx="610" cy="185" r="110" fill="#fde68a" opacity="0.10" />
        <circle cx="610" cy="185" r="62" fill="url(#aa-sun)" />
        {/* far range */}
        <path d="M0 260 L90 190 L150 230 L250 140 L330 210 L420 120 L520 205 L600 160 L700 220 L800 170 L800 420 L0 420 Z" fill="url(#aa-far)" />
        {/* summit */}
        <path d="M0 300 L120 250 L210 280 L330 190 L400 110 L470 190 L560 240 L660 215 L800 270 L800 420 L0 420 Z" fill="url(#aa-mid)" />
        <path d="M400 110 L372 142 L388 138 L400 150 L414 136 L430 144 Z" fill="#ecfeff" opacity="0.9" />
        {/* flag on the summit */}
        <line x1="400" y1="110" x2="400" y2="62" stroke="#ecfeff" strokeWidth="3" strokeLinecap="round" />
        <path d="M402 63 L452 72 L402 84 Z" fill="#f59e0b" />
        <text x="420" y="77" fontSize="10" fontWeight="800" fill="#062b27" fontFamily="ui-sans-serif, system-ui, sans-serif">9</text>
        {/* winding trail to the top */}
        <path d="M150 420 C 220 380, 300 380, 300 340 S 230 290, 300 260 S 380 220, 360 190 S 385 140, 400 112" fill="none" stroke="#fde68a" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" opacity="0.9" />
        {[[300, 340], [300, 260], [360, 190]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill="#fde68a" opacity="0.25" />
            <circle cx={x} cy={y} r="3.5" fill="#fde68a" />
          </g>
        ))}
        {/* near hills + pines */}
        <path d="M0 360 C 120 320, 220 350, 320 340 S 520 300, 620 330 S 760 320, 800 310 L800 420 L0 420 Z" fill="url(#aa-near)" />
        {[[60, 352], [96, 345], [640, 330], [690, 322], [740, 318], [520, 334]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 34} L${x - 11} ${y} L${x + 11} ${y} Z`} fill="#031b1a" opacity="0.9" />
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#021514] via-[#021514]/70 to-transparent" />
      <div className="relative z-10 mt-auto p-6 sm:p-8 lg:p-10">
        <p className="max-w-sm text-xl font-semibold leading-snug tracking-tight sm:text-2xl lg:text-3xl">Every skill, one summit: CLB 9.</p>
        <p className="mt-2 hidden max-w-sm text-sm text-teal-50/80 sm:block">Lessons, drills and full computer-style mock tests, with a study plan built around your own weak spots.</p>
      </div>
    </div>
  );
}
