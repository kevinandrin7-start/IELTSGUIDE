"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, BookOpen, CalendarDays, ClipboardCheck, FileText, Layers, LayoutDashboard, LogIn, Moon, Sun, UserRound, Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "@/lib/account";
import { Logo, LogoMark } from "./Logo";
import { cn } from "./ui";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/planner", label: "Study plan", icon: CalendarDays },
  { href: "/learn", label: "Playbook", icon: BookOpen },
  { href: "/drills", label: "Drills", icon: Zap },
  { href: "/vocab", label: "Lexical bank", icon: Layers },
  { href: "/mock", label: "Mock tests", icon: ClipboardCheck },
  { href: "/cheatsheets", label: "Cheat sheets", icon: FileText },
  { href: "/progress", label: "Progress", icon: BarChart3 },
];
const MOBILE = ["/", "/learn", "/drills", "/mock", "/progress"];

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("clb9-theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className={cn("rounded-lg p-2 text-muted hover:bg-surface2 hover:text-ink", className)}>
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

/** Sign-in link or the signed-in person's name, linking to their profile. */
function AccountLink({ compact }: { compact?: boolean }) {
  const { enabled, loading, user, profile } = useAccount();
  if (!enabled || loading) return null;
  const href = user ? "/profile" : "/login";
  const label = user ? profile?.displayName || user.email || "Profile" : "Sign in";
  const Icon = user ? UserRound : LogIn;
  if (compact) {
    return <Link href={href} className="rounded-lg p-2 text-muted hover:bg-surface2" aria-label={user ? "Profile" : "Sign in"}><Icon size={18} /></Link>;
  }
  return (
    <Link href={href} className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface2 hover:text-ink">
      <Icon size={17} /> <span className="truncate">{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <div className="min-h-dvh lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-surface px-3 py-5 lg:flex">
        <Link href="/" className="mb-6 px-2">
          <Logo />
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                active(href) ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface2 hover:text-ink",
              )}
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <AccountLink />
        <div className="flex items-center justify-between border-t border-line px-2 pt-3 text-xs text-muted">
          <span>L 8 · R 7 · W 7 · S 7</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark size={28} />
          <span className="text-sm font-semibold">CLB 9 Coach</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/vocab" className="rounded-lg p-2 text-muted hover:bg-surface2" aria-label="Lexical bank"><Layers size={18} /></Link>
          <Link href="/planner" className="rounded-lg p-2 text-muted hover:bg-surface2" aria-label="Study plan"><CalendarDays size={18} /></Link>
          <Link href="/cheatsheets" className="rounded-lg p-2 text-muted hover:bg-surface2" aria-label="Cheat sheets"><FileText size={18} /></Link>
          <AccountLink compact />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
        {NAV.filter((n) => MOBILE.includes(n.href)).map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={cn("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium", active(href) ? "text-accent" : "text-muted")}>
            <Icon size={20} />
            {label.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
