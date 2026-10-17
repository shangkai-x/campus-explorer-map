import { LayoutGrid } from "lucide-react";
import { CATEGORIES, FILTER_ORDER, type CategoryId } from "@/data/places";

export function CategoryChips({ value, onChange }: { value: CategoryId | "all"; onChange: (v: CategoryId | "all") => void }) {
  const chip = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold shadow-sm transition ${active ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary"}`;
  return (
    <div role="toolbar" aria-label="Filter by category" className="cg-noscroll -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 md:mx-0 md:px-0">
      <button aria-pressed={value === "all"} className={chip(value === "all")} onClick={() => onChange("all")}><LayoutGrid className="h-4 w-4" /> All Places</button>
      {FILTER_ORDER.map((id) => {
        const c = CATEGORIES[id]; const Icon = c.icon; const active = value === id;
        return (
          <button key={id} aria-pressed={active} className={chip(active)} onClick={() => onChange(active ? "all" : id)}>
            <Icon className="h-4 w-4" style={active ? undefined : { color: c.color }} /> {c.chip}
          </button>
        );
      })}
    </div>
  );
}
