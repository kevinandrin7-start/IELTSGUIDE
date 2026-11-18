"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "@/lib/account";
import { LogoMark } from "./Logo";

const PUBLIC = ["/login", "/signup"];

/** Everything except the sign-in screens requires an account (when accounts are configured). */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { enabled, loading, user } = useAccount();
  const path = (usePathname() || "/").replace(/\/$/, "") || "/";
  const router = useRouter();
  const isPublic = PUBLIC.includes(path);
  const blocked = enabled && !isPublic && !loading && !user;

  useEffect(() => {
    if (blocked) router.replace("/login");
  }, [blocked, router]);

  if (!enabled || isPublic) return <>{children}</>;
  if (loading || !user) return <Splash />;
  return <>{children}</>;
}

function Splash() {
  return (
    <div className="grid min-h-dvh place-items-center bg-bg" aria-busy="true" aria-label="Loading">
      <div className="flex flex-col items-center gap-3">
        <LogoMark size={56} className="animate-pulse" />
        <span className="text-sm text-muted">Loading CLB 9 Coach…</span>
      </div>
    </div>
  );
}
