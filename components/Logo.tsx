const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** App mark: a "C9" monogram on a teal gradient tile with a rising band arc. */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={cn("shrink-0", className)} role="img" aria-label="CLB 9 Coach logo">
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0f5f59" />
        </linearGradient>
        <linearGradient id="lm-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#lm-bg)" />
      <path d="M12 47 Q32 33 52 41" fill="none" stroke="url(#lm-arc)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="52" cy="41" r="3.6" fill="#fde68a" />
      <text x="31" y="35" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" fontSize="25" fontWeight="800" fill="#ffffff" letterSpacing="-1">C9</text>
    </svg>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={36} />
      <span>
        <span className={cn("block text-[15px] font-semibold leading-tight", light ? "text-white" : "text-ink")}>CLB 9 Coach</span>
        <span className={cn("block text-xs", light ? "text-teal-100/80" : "text-muted")}>IELTS General Training</span>
      </span>
    </span>
  );
}
