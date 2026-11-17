"use client";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Card({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("rounded-2xl border border-line bg-surface p-5", className)} {...rest}>
      {children}
    </div>
  );
}

type BtnVariant = "primary" | "secondary" | "ghost" | "danger";
const btn: Record<BtnVariant, string> = {
  primary: "bg-accent text-accent-ink hover:opacity-90",
  secondary: "border border-line bg-surface hover:bg-surface2",
  ghost: "hover:bg-surface2",
  danger: "bg-bad text-white hover:opacity-90",
};

export function Button({ variant = "primary", className, ...rest }: ComponentProps<"button"> & { variant?: BtnVariant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        btn[variant],
        className,
      )}
      {...rest}
    />
  );
}

export function LinkButton({ href, variant = "primary", className, children }: { href: string; variant?: BtnVariant; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={cn("inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition", btn[variant], className)}>
      {children}
    </Link>
  );
}

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "accent" | "good" | "bad" | "warn"; className?: string }) {
  const t = {
    neutral: "bg-surface2 text-muted",
    accent: "bg-accent-soft text-accent",
    good: "bg-good-soft text-good",
    bad: "bg-bad-soft text-bad",
    warn: "bg-warn-soft text-warn",
  }[tone];
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", t, className)}>{children}</span>;
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

/** Semi-circular gauge showing a band against its CLB 9 target. */
export function Gauge({ value, target, max = 9, label, sub }: { value: number | null; target: number; max?: number; label: string; sub?: string }) {
  const r = 52;
  const c = Math.PI * r;
  const pct = value == null ? 0 : Math.min(1, value / max);
  const tPct = target / max;
  const met = value != null && value >= target;
  const angle = Math.PI * (1 - tPct);
  const tx = 60 + r * Math.cos(angle);
  const ty = 62 - r * Math.sin(angle);
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 72" className="w-full max-w-[160px]" role="img" aria-label={`${label}: ${value ?? "no score"} of target ${target}`}>
        <path d={`M8 62 A${r} ${r} 0 0 1 112 62`} fill="none" stroke="var(--line)" strokeWidth="10" strokeLinecap="round" />
        <path
          d={`M8 62 A${r} ${r} 0 0 1 112 62`}
          fill="none"
          stroke={met ? "var(--good)" : "var(--accent)"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
        />
        <circle cx={tx} cy={ty} r="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
        <text x="60" y="56" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)">
          {value == null ? "–" : value.toFixed(1)}
        </text>
      </svg>
      <div className="mt-1 text-sm font-medium">{label}</div>
      <div className="text-xs text-muted">{sub ?? `Target ${target.toFixed(1)}`}</div>
    </div>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface2", className)}>
      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: { value: T; label: ReactNode }[] }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-surface p-1" role="tablist">
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          aria-selected={value === it.value}
          onClick={() => onChange(it.value)}
          className={cn("rounded-lg px-3 py-1.5 text-sm font-medium transition", value === it.value ? "bg-accent text-accent-ink" : "text-muted hover:text-ink")}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

export const SKILL_META = {
  listening: { label: "Listening", color: "#0ea5e9" },
  reading: { label: "Reading", color: "#8b5cf6" },
  writing: { label: "Writing", color: "#f59e0b" },
  speaking: { label: "Speaking", color: "#ec4899" },
} as const;
