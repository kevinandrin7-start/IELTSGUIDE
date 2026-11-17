// Plans used by map-labelling questions. Letters mark candidate locations.

export function MapSvg({ id }: { id: string }) {
  if (id !== "greenway") return null;
  const letters: [string, number, number][] = [
    ["A", 120, 248], ["B", 278, 248], ["C", 108, 150], ["D", 300, 150],
    ["E", 200, 92], ["F", 350, 52], ["G", 58, 70], ["H", 352, 232],
  ];
  return (
    <figure className="my-3 rounded-xl border border-line bg-surface p-2">
      <svg viewBox="0 0 400 300" className="mx-auto w-full max-w-md" role="img" aria-label="Map of Greenway Park">
        <rect x="4" y="4" width="392" height="292" rx="10" fill="var(--green-soft)" stroke="var(--line)" />
        {/* paths */}
        <path d="M200 296 L200 200 M200 108 L200 52" stroke="#c8b98f" strokeWidth="10" fill="none" />
        <ellipse cx="200" cy="150" rx="88" ry="54" fill="none" stroke="#c8b98f" strokeWidth="10" />
        {/* lake */}
        <ellipse cx="200" cy="150" rx="70" ry="38" fill="#93c5fd" />
        <text x="200" y="154" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontWeight="600">LAKE</text>
        {/* car park */}
        <rect x="14" y="214" width="74" height="70" rx="4" fill="var(--slate-soft)" stroke="var(--muted)" />
        <text x="51" y="253" textAnchor="middle" fontSize="10" fill="var(--ink)">Car park</text>
        {/* playground */}
        <rect x="324" y="118" width="62" height="64" rx="4" fill="var(--amber-soft)" stroke="var(--muted)" />
        <text x="355" y="154" textAnchor="middle" fontSize="10" fill="var(--ink)">Playground</text>
        {/* bandstand */}
        <circle cx="200" cy="38" r="16" fill="var(--rose-soft)" stroke="var(--muted)" />
        <text x="200" y="41" textAnchor="middle" fontSize="8" fill="var(--ink)">Bandstand</text>
        {/* gates */}
        <rect x="180" y="286" width="40" height="10" fill="var(--ink)" />
        <text x="200" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--ink)">Main gate</text>
        <rect x="20" y="4" width="36" height="8" fill="var(--ink)" />
        <text x="38" y="24" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--ink)">North gate</text>
        {/* compass */}
        <g transform="translate(372 30)">
          <path d="M0 -14 L5 0 L0 -3 L-5 0 Z" fill="var(--ink)" />
          <text x="0" y="12" textAnchor="middle" fontSize="9" fill="var(--ink)">N</text>
        </g>
        {letters.map(([l, x, y]) => (
          <g key={l}>
            <circle cx={x} cy={y} r="11" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{l}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
