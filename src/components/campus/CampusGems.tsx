import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Map as MapIcon, List, Gem } from "lucide-react";
import { toast } from "sonner";
import { PLACES, getPlace, type CategoryId } from "@/data/places";
import { searchPlaces } from "@/lib/search";
import { ReviewsProvider } from "@/lib/reviews-store";
import { SearchBar } from "./SearchBar";
import { CategoryChips } from "./CategoryChips";
import { PlacePreview } from "./PlacePreview";
import { DetailsPanel } from "./DetailsPanel";
import { ReviewForm } from "./ReviewForm";
import { ListView } from "./ListView";
import { EmptyResults } from "./EmptyResults";

const MapView = lazy(() => import("./MapView"));

export function CampusGems() {
  return <ReviewsProvider><Experience /></ReviewsProvider>;
}

function Experience() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [view, setView] = useState<"map" | "list">("map");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ id: string; nonce: number } | null>(null);
  const [details, setDetails] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  const filtered = useMemo(() => searchPlaces(PLACES, query, category), [query, category]);
  const selected = selectedId ? getPlace(selectedId) : undefined;

  const focusPlace = useCallback((id: string) => {
    setSelectedId(id);
    setFocus({ id, nonce: Date.now() });
    setView("map");
  }, []);
  const select = useCallback((id: string | null) => { setSelectedId(id); if (!id) setDetails(false); }, []);
  const clearAll = () => { setQuery(""); setCategory("all"); };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background">
      <ClientOnly fallback={<div className="absolute inset-0 bg-muted" />}>
        <Suspense fallback={<div className="absolute inset-0 bg-muted" />}>
          <MapView places={filtered} selectedId={selectedId} onSelect={select} focus={focus} />
        </Suspense>
      </ClientOnly>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-background via-background/70 to-transparent px-3 pb-6 pt-3 md:px-6 md:pt-5">
        <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 pr-1 md:flex">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-float)]"><Gem className="h-5 w-5" /></span>
              <span className="font-display whitespace-nowrap text-xl font-extrabold tracking-tight">Campus Gems</span>
            </div>
            <SearchBar value={query} onChange={setQuery} results={filtered} onPick={focusPlace} />
            <div role="tablist" aria-label="View" className="flex shrink-0 rounded-full border border-border bg-card p-1 shadow-[var(--shadow-float)]">
              {(["map", "list"] as const).map((v) => {
                const Icon = v === "map" ? MapIcon : List;
                return (
                  <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)}
                    className={`inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition ${view === v ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                    <Icon className="h-4 w-4" /><span className="hidden sm:inline">{v === "map" ? "Map View" : "List View"}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <CategoryChips value={category} onChange={setCategory} />
        </div>
      </header>

      {view === "list" && <ListView places={filtered} onPick={focusPlace} onClear={clearAll} />}

      {view === "map" && filtered.length === 0 && (
        <div className="absolute inset-x-3 top-1/2 z-20 -translate-y-1/2"><EmptyResults onClear={clearAll} /></div>
      )}

      {view === "map" && selected && !details && (
        <PlacePreview place={selected} onClose={() => setSelectedId(null)} onDetails={() => setDetails(true)} onReview={() => setReviewing(true)} />
      )}

      {selected && details && <DetailsPanel place={selected} onClose={() => setDetails(false)} onReview={() => setReviewing(true)} />}

      {selected && reviewing && (
        <ReviewForm place={selected} onClose={() => setReviewing(false)}
          onSubmitted={() => { setReviewing(false); setDetails(true); toast.success("Prototype review added", { description: "Visible in this session only." }); }} />
      )}
    </div>
  );
}
