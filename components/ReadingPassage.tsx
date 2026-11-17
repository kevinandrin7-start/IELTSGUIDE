"use client";
import { Eraser, Highlighter, StickyNote, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import type { ReadingText } from "@/lib/types";
import { cn } from "./ui";

/** Static passage body — memoised so React never re-renders over user highlights. */
const PassageBody = memo(function PassageBody({ texts }: { texts: ReadingText[] }) {
  return (
    <>
      {texts.map((t) => (
        <div key={t.id} className="mb-8">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">{t.kind}</div>
          <h2 className="mb-3 text-lg font-bold">{t.title}</h2>
          {t.paragraphs.map((p, i) => (
            <p key={i} className="mb-3 text-[15px] leading-7">
              {p.label && <b className="mr-2">{p.label}</b>}
              {p.text}
            </p>
          ))}
        </div>
      ))}
    </>
  );
});

interface Note {
  id: string;
  quote: string;
  text: string;
}

/**
 * Passage with computer-delivered-test tools: select text, then right-click
 * (or use the toolbar on touch screens) to highlight or attach a note.
 */
export function ReadingPassage({ texts, className }: { texts: ReadingText[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; onMark?: HTMLElement } | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState<{ quote: string; mark: HTMLElement } | null>(null);
  const [noteText, setNoteText] = useState("");
  const saved = useRef<Range | null>(null);

  useEffect(() => {
    const close = () => setMenu(null);
    window.addEventListener("scroll", close, true);
    window.addEventListener("click", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("click", close);
    };
  }, []);

  const currentRange = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return saved.current;
    const r = sel.getRangeAt(0);
    if (!ref.current?.contains(r.commonAncestorContainer)) return null;
    return r;
  };

  const wrap = (cls: string) => {
    const r = currentRange();
    if (!r || r.collapsed) return null;
    const mark = document.createElement("mark");
    mark.className = cls;
    try {
      mark.appendChild(r.extractContents());
      r.insertNode(mark);
    } catch {
      return null;
    }
    window.getSelection()?.removeAllRanges();
    saved.current = null;
    return mark;
  };

  const unwrap = (el: HTMLElement) => {
    const parent = el.parentNode!;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
    const id = el.dataset.note;
    if (id) setNotes((n) => n.filter((x) => x.id !== id));
  };

  const onContext = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest("mark.hl") as HTMLElement | null;
    const sel = window.getSelection();
    if (!target && (!sel || sel.isCollapsed)) return; // default menu when nothing selected
    e.preventDefault();
    if (sel && !sel.isCollapsed) saved.current = sel.getRangeAt(0).cloneRange();
    setMenu({ x: e.clientX, y: e.clientY, onMark: target ?? undefined });
  };

  const addNote = () => {
    const mark = wrap("hl note");
    if (!mark) return;
    setDraft({ quote: mark.textContent ?? "", mark });
    setNoteText("");
  };

  const saveNote = () => {
    if (!draft) return;
    const id = String(Date.now());
    draft.mark.dataset.note = id;
    draft.mark.title = noteText;
    setNotes((n) => [...n, { id, quote: draft.quote, text: noteText }]);
    setDraft(null);
  };

  const clearAll = () => {
    ref.current?.querySelectorAll("mark.hl").forEach((m) => unwrap(m as HTMLElement));
    setNotes([]);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="sticky top-0 z-10 mb-3 flex flex-wrap items-center gap-1 border-b border-line bg-surface/95 py-2 text-xs backdrop-blur">
        <span className="mr-auto text-muted">Select text, then right-click to highlight or add a note.</span>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => wrap("hl")} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-surface2"><Highlighter size={14} /> Highlight</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={addNote} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-surface2"><StickyNote size={14} /> Note</button>
        <button onClick={clearAll} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-surface2"><Eraser size={14} /> Clear</button>
      </div>

      <div ref={ref} onContextMenu={onContext} className="select-text">
        <PassageBody texts={texts} />
      </div>

      {notes.length > 0 && (
        <div className="mt-2 rounded-lg border border-line bg-surface2 p-3">
          <div className="mb-1 text-xs font-semibold uppercase text-muted">Notes</div>
          <ul className="space-y-1 text-sm">
            {notes.map((n) => (
              <li key={n.id}><span className="italic text-muted">“{n.quote.slice(0, 50)}{n.quote.length > 50 ? "…" : ""}”</span> — {n.text}</li>
            ))}
          </ul>
        </div>
      )}

      {menu && (
        <div
          className="fixed z-50 min-w-40 overflow-hidden rounded-lg border border-line bg-surface py-1 text-sm shadow-lg"
          style={{ left: menu.x, top: menu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          {menu.onMark ? (
            <button className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-surface2" onClick={() => { unwrap(menu.onMark!); setMenu(null); }}><Eraser size={14} /> Clear highlight</button>
          ) : (
            <>
              <button className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-surface2" onClick={() => { wrap("hl"); setMenu(null); }}><Highlighter size={14} /> Highlight</button>
              <button className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-surface2" onClick={() => { addNote(); setMenu(null); }}><StickyNote size={14} /> Notes</button>
            </>
          )}
        </div>
      )}

      {draft && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" onClick={() => setDraft(null)}>
          <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">Add note <button onClick={() => setDraft(null)}><X size={16} /></button></div>
            <p className="mb-2 text-xs italic text-muted">“{draft.quote.slice(0, 80)}”</p>
            <textarea autoFocus value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={3} className="w-full rounded-md border border-line bg-surface p-2 text-sm" />
            <div className="mt-2 flex justify-end"><button onClick={saveNote} className="rounded-lg bg-accent px-3 py-1.5 text-sm text-accent-ink">Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
