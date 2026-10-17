import { X, MapPin, PenLine } from "lucide-react";
import type { Place } from "@/data/places";
import { CategoryBadge, PlacePhoto, RatingLine, SampleNote, Tags } from "./PlaceBits";

interface Props { place: Place; onClose: () => void; onDetails: () => void; onReview: () => void }

export function PlacePreview({ place, onClose, onDetails, onReview }: Props) {
  return (
    <article key={place.id} aria-label={`${place.name} preview`}
      className="cg-rise absolute inset-x-3 bottom-3 z-20 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-float)] md:inset-x-auto md:bottom-6 md:left-6 md:w-[380px]">
      <div className="relative">
        <PlacePhoto place={place} className="h-28 w-full" />
        <button onClick={onClose} aria-label="Close preview" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow hover:bg-card">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-2.5 p-4">
        <CategoryBadge place={place} />
        <h2 className="font-display text-xl font-bold leading-tight">{place.name}</h2>
        <p className="flex items-start gap-1 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{place.address}</p>
        <RatingLine place={place} />
        <p className="line-clamp-2 text-sm">{place.description}</p>
        <Tags tags={place.tags} />
        <SampleNote place={place} />
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button onClick={onDetails} className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">View Details</button>
          <button onClick={onReview} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105">
            <PenLine className="h-4 w-4" /> Write a Review
          </button>
        </div>
      </div>
    </article>
  );
}
