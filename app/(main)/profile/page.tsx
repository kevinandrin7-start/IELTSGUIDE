"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Cloud, CloudOff, Eye, EyeOff, KeyRound, LogOut, RefreshCw, Save, Trash2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { AccountsOff } from "@/components/AuthForm";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { useAccount } from "@/lib/account";
import { getUserApiKey } from "@/lib/ai";
import { authMessage } from "@/lib/firebase";

const input = "mt-1 block w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink";

function mask(key: string) {
  return key.length > 14 ? `${key.slice(0, 10)}…${key.slice(-4)}` : "••••••••";
}

export default function ProfilePage() {
  const acct = useAccount();
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameMsg, setNameMsg] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [keyMsg, setKeyMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [delPw, setDelPw] = useState("");
  const [delErr, setDelErr] = useState<string | null>(null);

  useEffect(() => {
    if (!acct.loading && acct.enabled && !acct.user) router.replace("/login");
  }, [acct.loading, acct.enabled, acct.user, router]);
  useEffect(() => setName(acct.profile?.displayName ?? ""), [acct.profile?.displayName]);
  // The key is loaded from the account during sign-in; re-read it once syncing settles.
  useEffect(() => setSavedKey(getUserApiKey()), [acct.sync, acct.user]);

  if (!acct.enabled) return <AccountsOff />;
  if (acct.loading || !acct.user) return <p className="text-sm text-muted">Loading your account…</p>;

  const saveName = async () => {
    setNameMsg(null);
    try {
      await acct.saveProfile({ displayName: name });
      setNameMsg("Saved.");
    } catch (e) {
      setNameMsg(authMessage(e));
    }
  };

  const saveKey = async (value: string) => {
    setKeyMsg(null);
    const v = value.trim();
    if (v && !v.startsWith("sk-ant-")) {
      setKeyMsg({ ok: false, text: "Anthropic API keys start with “sk-ant-”. Check that you copied the whole key." });
      return;
    }
    setBusy(true);
    try {
      await acct.saveApiKey(v);
      setSavedKey(v);
      setKeyInput("");
      setKeyMsg({ ok: true, text: v ? "Key saved to your account. “Grade with AI” now works on any device you sign in on." : "Key removed." });
    } catch (e) {
      setKeyMsg({ ok: false, text: authMessage(e) });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setDelErr(null);
    setBusy(true);
    try {
      await acct.deleteAccount(delPw);
      router.replace("/");
    } catch (e) {
      setDelErr(authMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const syncBadge =
    acct.sync === "error" ? <Badge tone="bad"><CloudOff size={12} /> Sync failed</Badge>
    : acct.sync === "syncing" ? <Badge tone="accent"><RefreshCw size={12} className="animate-spin" /> Syncing…</Badge>
    : <Badge tone="good"><Cloud size={12} /> Saved to your account</Badge>;

  return (
    <>
      <PageHeader title="Profile" subtitle="Your account details, your own AI marking key, and where your progress is saved.">
        <Button variant="secondary" onClick={async () => { await acct.signOut(); router.replace("/login"); }}><LogOut size={15} /> Sign out</Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="flex items-center gap-2 font-semibold"><UserRound size={17} /> Account</h2>
          <dl className="mt-3 text-sm">
            <dt className="text-xs text-muted">Email</dt>
            <dd>{acct.profile?.email || acct.user.email}</dd>
          </dl>
          <label className="mt-3 block text-sm">Name
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <div className="mt-3 flex items-center gap-3">
            <Button variant="secondary" onClick={saveName} disabled={!name.trim() || name.trim() === acct.profile?.displayName}><Save size={15} /> Save name</Button>
            {nameMsg && <span className="text-xs text-muted">{nameMsg}</span>}
          </div>
        </Card>

        <Card>
          <h2 className="flex items-center gap-2 font-semibold"><Cloud size={17} /> Progress sync</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            {syncBadge}
            <Button variant="ghost" onClick={acct.syncNow} disabled={acct.sync === "syncing"}><RefreshCw size={15} /> Sync now</Button>
          </div>
          <p className="mt-3 text-sm text-muted">
            Your study plan, mock test results, error log, flashcard schedule and completed lessons are saved to your account
            automatically. Speaking recordings stay on the device they were made on.
          </p>
          {acct.syncError && <p className="mt-2 text-xs text-bad">{acct.syncError}</p>}
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="flex items-center gap-2 font-semibold"><KeyRound size={17} /> Anthropic API key (for AI marking)</h2>
          <p className="mt-2 text-sm text-muted">
            “Grade with AI” on the Writing and Speaking results screens uses your own key, so each person pays only for their own
            marking (a few cents per grading). Create a key at{" "}
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className="text-accent underline">console.anthropic.com</a>{" "}
            and paste it here. Only you can read it: the database rules block everyone else, and the app sends it only to Anthropic.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            {savedKey ? (
              <>
                <Badge tone="good"><CheckCircle2 size={12} /> Key saved</Badge>
                <code className="rounded bg-surface2 px-2 py-0.5 text-xs">{showKey ? savedKey : mask(savedKey)}</code>
                <button onClick={() => setShowKey((s) => !s)} className="rounded p-1 text-muted hover:bg-surface2" aria-label={showKey ? "Hide key" : "Show key"}>{showKey ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                <Button variant="ghost" onClick={() => saveKey("")} disabled={busy}><Trash2 size={15} /> Remove key</Button>
              </>
            ) : (
              <Badge tone="warn">No key yet: AI marking is off</Badge>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <input type="password" autoComplete="off" spellCheck={false} value={keyInput} onChange={(e) => setKeyInput(e.target.value)} placeholder={savedKey ? "Paste a new key to replace it" : "sk-ant-…"} className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm" aria-label="Anthropic API key" />
            <Button onClick={() => saveKey(keyInput)} disabled={!keyInput.trim() || busy}><Save size={15} /> Save key</Button>
          </div>
          {keyMsg && <p className={`mt-2 text-sm ${keyMsg.ok ? "text-good" : "text-bad"}`}>{keyMsg.text}</p>}
          <p className="mt-3 text-xs text-muted">Try it: finish a <Link href="/mock" className="text-accent underline">Writing or Speaking mock</Link> and click “Grade with AI”.</p>
        </Card>

        <Card className="lg:col-span-2 border-bad/30">
          <h2 className="font-semibold text-bad">Delete account</h2>
          <p className="mt-1 text-sm text-muted">Permanently deletes your account, your saved progress and your API key. This can&apos;t be undone.</p>
          {!delOpen ? (
            <Button variant="ghost" className="mt-3 text-bad" onClick={() => setDelOpen(true)}><Trash2 size={15} /> Delete my account…</Button>
          ) : (
            <div className="mt-3 flex flex-wrap items-end gap-2">
              <label className="text-sm">Enter your password to confirm
                <input type="password" className={input} value={delPw} onChange={(e) => setDelPw(e.target.value)} autoComplete="current-password" />
              </label>
              <Button variant="danger" onClick={remove} disabled={!delPw || busy}>Delete permanently</Button>
              <Button variant="ghost" onClick={() => { setDelOpen(false); setDelPw(""); setDelErr(null); }}>Cancel</Button>
              {delErr && <p className="w-full text-sm text-bad">{delErr}</p>}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
