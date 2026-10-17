import { MapPin, ChevronRight } from "lucide-react";
import type { Place } from "@/data/places";
import { CategoryBadge, PlacePhoto, RatingLine } from "./PlaceBits";
import { EmptyResults } from "./EmptyResults";

export function ListView({ places, onPick, onClear }: { places: Place[]; onPick: (id: string) => void; onClear: () => void }) {
  return (
    <div className="absolute inset-0 z-[15] overflow-y-auto bg-background pb-10 pt-44 md:pt-40">
      <div className="mx-auto max-w-5xl px-3 md:px-6">
        <p className="mb-3 text-sm text-muted-foreground">{places.length} {places.length === 1 ? "place" : "places"}</p>
        {places.length === 0 ? <EmptyResults onClear={onClear} /> : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((p) => (
              <li key={p.id}>
                <button onClick={() => onPick(p.id)} className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)] focus-visible:outline-2 focus-visible:outline-ring">
                  <PlacePhoto place={p} className="h-24 w-full" />
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <CategoryBadge place={p} />
                    <h3 className="font-display text-lg font-bold leading-tight">{p.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.address}</p>
                    <RatingLine place={p} />
                    <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-primary">Show on map <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
