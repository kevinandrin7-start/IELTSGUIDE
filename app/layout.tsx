import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "CLB 9 Coach — IELTS General Training",
  description: "Lessons, drills, vocabulary and full computer-delivered mock tests for IELTS General Training, built around the CLB 9 targets (L 8.0 · R 7.0 · W 7.0 · S 7.0).",
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/manifest.webmanifest`,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`, apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon-192.png` },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f12" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Sets the theme class before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('clb9-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg text-ink">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
