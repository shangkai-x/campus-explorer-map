import { SearchX } from "lucide-react";

export function EmptyResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-border bg-card p-6 text-center shadow-[var(--shadow-float)]">
      <SearchX className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
      <p className="font-display text-lg font-bold">No places match that yet</p>
      <p className="mt-1 text-sm text-muted-foreground">Try a broader word like "coffee" or "study", or switch to All Places.</p>
      <button onClick={onClear} className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Clear search & filters</button>
    </div>
  );
}
