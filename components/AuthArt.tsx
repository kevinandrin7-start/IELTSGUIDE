"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { SCENE_H, SCENE_W, SCENES } from "@/lib/scenes";

const INTERVAL = 7000;

/** Turns a scene into an image URL, so the browser rasterises it once and the crossfade stays cheap. */
function toUrl(i: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SCENE_W} ${SCENE_H}">${SCENES[i].render()}</svg>`;
  return URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
}

/** Illustrated panel for the sign-in screens: a slideshow of five nature scenes. */
export function AuthArt() {
  const [urls, setUrls] = useState<(string | null)[]>(() => SCENES.map(() => null));
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Build the first scene right away and the rest in idle time.
  useEffect(() => {
    const made: string[] = [];
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const build = (i: number) => {
      if (cancelled || i >= SCENES.length) return;
      const url = toUrl(i);
      made.push(url);
      setUrls((u) => u.map((v, k) => (k === i ? url : v)));
      timer = setTimeout(() => build(i + 1), i === 0 ? 600 : 150);
    };
    build(0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      made.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Advance to the next scene once it is ready. Reduced motion keeps the current scene.
  useEffect(() => {
    if (reduced) return;
    const next = (active + 1) % SCENES.length;
    if (!urls[next]) return;
    const t = setTimeout(() => setActive(next), INTERVAL);
    return () => clearTimeout(t);
  }, [active, urls, reduced]);

  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden bg-[#04161c] text-white">
      {/* slides */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {SCENES.map((s, i) =>
          urls[i] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.id}
              src={urls[i]!}
              alt=""
              draggable={false}
              className={`absolute inset-0 h-full w-full select-none object-cover object-bottom ${i === active ? "opacity-100" : "opacity-0"}`}
              style={{
                // slow drift in while a scene is shown; no movement for reduced motion
                transform: !reduced && i !== active ? "scale(1.06)" : "scale(1)",
                transition: reduced ? "opacity 600ms ease-out" : `opacity 1600ms ease-out, transform ${i === active ? 9000 : 1600}ms ease-out`,
              }}
            />
          ) : null,
        )}
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent" />

      <div className="relative z-10 flex items-start justify-between gap-4 p-6 sm:p-8 lg:p-10">
        <Logo light />
        <span
          key={SCENES[active].id}
          className="auth-chip mt-1 hidden rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md sm:inline-block"
        >
          {SCENES[active].name}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      <div className="relative z-10 mt-auto p-6 sm:p-8 lg:p-10">
        <p className="max-w-sm text-xl font-semibold leading-snug tracking-tight drop-shadow sm:text-2xl lg:text-3xl">
          Every skill, one horizon: CLB 9.
        </p>
        <p className="mt-2 hidden max-w-sm text-sm text-white/85 drop-shadow sm:block">
          Lessons, drills and full computer-style mock tests, with a study plan built around your own weak spots.
        </p>
        <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Artwork">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.name}
              disabled={!urls[i]}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
