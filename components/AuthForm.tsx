"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "@/lib/account";
import { authMessage } from "@/lib/firebase";
import { Button, Card } from "./ui";

const input = "mt-1 block w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink";

export function AccountsOff() {
  return (
    <Card className="mx-auto max-w-md text-sm">
      <h1 className="text-lg font-semibold">Accounts aren&apos;t set up yet</h1>
      <p className="mt-2 text-muted">
        This copy of the app has no Firebase project configured, so progress is saved on this device only. Add the project&apos;s web
        config to <code>lib/firebaseConfig.ts</code> to turn on accounts (see the README).
      </p>
    </Card>
  );
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { enabled, user, loading, signIn, signUp, resetPassword } = useAccount();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) router.replace(mode === "signup" ? "/profile" : "/");
  }, [loading, user, router, mode]);

  if (!enabled) return <AccountsOff />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (mode === "signup") {
      if (!name.trim()) return setError("Enter your name.");
      if (password.length < 8) return setError("Use a password with at least 8 characters.");
      if (password !== confirm) return setError("The two passwords don't match.");
    }
    setBusy(true);
    try {
      if (mode === "signup") await signUp(name, email, password);
      else await signIn(email, password);
      // the effect above redirects once the account has loaded
    } catch (err) {
      setError(authMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const forgot = async () => {
    setError(null);
    if (!email.trim()) return setError("Enter your email above, then click “Forgot password?” again.");
    try {
      await resetPassword(email);
      setInfo(`If an account exists for ${email.trim()}, a reset link is on its way. Check your inbox and spam folder.`);
    } catch (err) {
      setError(authMessage(err));
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-xl font-semibold">{mode === "signup" ? "Create your account" : "Sign in"}</h1>
      <p className="mt-1 text-sm text-muted">
        {mode === "signup"
          ? "Your study plan, scores, error log and flashcards are saved to your account, so they follow you to any device."
          : "Welcome back. Your progress loads automatically."}
      </p>
      <form onSubmit={submit} className="mt-5 space-y-3">
        {mode === "signup" && (
          <label className="block text-sm">Name
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </label>
        )}
        <label className="block text-sm">Email
          <input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </label>
        <label className="block text-sm">Password
          <input className={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={mode === "signup" ? 8 : undefined} />
        </label>
        {mode === "signup" && (
          <label className="block text-sm">Confirm password
            <input className={input} type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" required />
          </label>
        )}
        {error && <p role="alert" className="rounded-lg bg-bad-soft px-3 py-2 text-sm text-bad">{error}</p>}
        {info && <p className="rounded-lg bg-good-soft px-3 py-2 text-sm text-good">{info}</p>}
        <Button type="submit" className="w-full" disabled={busy}>
          {mode === "signup" ? <UserPlus size={16} /> : <LogIn size={16} />}
          {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </Button>
      </form>
      <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm">
        {mode === "login" ? (
          <>
            <button type="button" onClick={forgot} className="text-accent hover:underline">Forgot password?</button>
            <Link href="/signup" className="text-accent hover:underline">Create an account</Link>
          </>
        ) : (
          <Link href="/login" className="text-accent hover:underline">Already have an account? Sign in</Link>
        )}
      </div>
    </Card>
  );
}
