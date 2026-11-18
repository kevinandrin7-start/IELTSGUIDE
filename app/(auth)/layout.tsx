import { AuthArt } from "@/components/AuthArt";
import { ThemeToggle } from "@/components/AppShell";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[1.15fr_1fr]">
      <div className="h-[320px] sm:h-[400px] lg:sticky lg:top-0 lg:h-dvh">
        <AuthArt />
      </div>
      <main className="relative flex items-start justify-center px-5 py-8 sm:px-8 lg:items-center lg:py-12">
        <ThemeToggle className="absolute right-4 top-4" />
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
