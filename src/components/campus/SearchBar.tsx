import { useRef, useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { CATEGORIES, type Place } from "@/data/places";
import { SEARCH_SUGGESTIONS } from "@/lib/search";

interface Props { value: string; onChange: (v: string) => void; results: Place[]; onPick: (id: string) => void }

export function SearchBar({ value, onChange, results, onPick }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLInputElement>(null);
  const showResults = value.trim().length > 0;
  const items = showResults ? results.slice(0, 6) : [];

  function pick(id: string) { onPick(id); setOpen(false); ref.current?.blur(); }

  return (
    <div className="relative w-full" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}>
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 shadow-[var(--shadow-float)] focus-within:ring-2 focus-within:ring-primary/30">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input ref={ref} value={value} role="combobox" aria-expanded={open} aria-controls="cg-search-list" aria-label="Search places"
          placeholder="Search cheap lunch, Wi-Fi, #HiddenGem…"
          className="h-12 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          onFocus={() => setOpen(true)}
          onChange={(e) => { onChange(e.target.value); setOpen(true); setActive(-1); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Enter") { const it = items[Math.max(active, 0)]; if (it) pick(it.id); }
            if (e.key === "Escape") setOpen(false);
          }} />
        {value && <button onClick={() => { onChange(""); ref.current?.focus(); }} aria-label="Clear search" className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"><X className="h-4 w-4" /></button>}
      </div>
      {open && (
        <div id="cg-search-list" role="listbox" className="cg-rise absolute inset-x-0 top-14 z-30 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-float)]">
          {!showResults ? (
            <>
              <p className="px-2 pb-1 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Try searching</p>
              {SEARCH_SUGGESTIONS.map((s) => (
                <button key={s} onMouseDown={(e) => e.preventDefault()} onClick={() => onChange(s)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm hover:bg-secondary">
                  <Sparkles className="h-4 w-4 text-accent" /> {s}
                </button>
              ))}
            </>
          ) : items.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">No matches. Try "coffee", "study" or "#CheapEats".</p>
          ) : items.map((p, i) => {
            const c = CATEGORIES[p.category]; const Icon = c.icon;
            return (
              <button key={p.id} role="option" aria-selected={i === active} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(p.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-secondary ${i === active ? "bg-secondary" : ""}`}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-primary-foreground" style={{ backgroundColor: c.color }}><Icon className="h-4 w-4" /></span>
                <span className="min-w-0"><span className="block truncate text-sm font-semibold">{p.name}</span><span className="block truncate text-xs text-muted-foreground">{c.label} · {p.priceNote ?? p.address}</span></span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
