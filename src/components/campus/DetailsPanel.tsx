import { useEffect } from "react";
import { X, MapPin, PenLine, Star, MessageSquareDashed } from "lucide-react";
import type { Place } from "@/data/places";
import { useReviews } from "@/lib/reviews-store";
import { CategoryBadge, PlacePhoto, RatingLine, SampleNote, Tags } from "./PlaceBits";

export function DetailsPanel({ place, onClose, onReview }: { place: Place; onClose: () => void; onReview: () => void }) {
  const { getReviews, getStats } = useReviews();
  const reviews = getReviews(place.id);
  const stats = getStats(place.id);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-30 bg-foreground/20 md:hidden" onClick={onClose} aria-hidden />
      <aside role="dialog" aria-label={`${place.name} details`}
        className="cg-sheet fixed inset-x-0 bottom-0 z-40 flex max-h-[85vh] flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-[var(--shadow-float)] md:inset-y-3 md:left-auto md:right-3 md:max-h-none md:w-[420px] md:rounded-3xl">
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-border md:hidden" />
        <div className="relative">
          <PlacePhoto place={place} className="h-44 w-full" />
          <button onClick={onClose} aria-label="Close details" autoFocus className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-card/90 shadow hover:bg-card">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="space-y-2">
            <CategoryBadge place={place} />
            <h2 className="font-display text-2xl font-bold leading-tight">{place.name}</h2>
            <p className="flex items-start gap-1 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{place.address}</p>
            <RatingLine place={place} />
          </div>
          <p className="text-[15px] leading-relaxed">{place.description}</p>
          <Tags tags={place.tags} />
          <SampleNote place={place} />

          <section className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Reviews {stats.count > 0 && <span className="text-muted-foreground">({stats.count})</span>}</h3>
              <button onClick={onReview} className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-105">
                <PenLine className="h-4 w-4" /> Write a Review
              </button>
            </div>
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-5 text-center">
                <MessageSquareDashed className="mx-auto mb-2 h-7 w-7 text-muted-foreground" />
                <p className="font-semibold">Be the first to share a tip about this place.</p>
                <p className="mt-1 text-sm text-muted-foreground">Help new students know what's worth it.</p>
              </div>
            ) : (
              <>
                <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">Prototype reviews are only kept in this browser tab and aren't visible to anyone else.</p>
                <ul className="space-y-3">
                  {reviews.map((r) => (
                    <li key={r.id} className="cg-rise rounded-2xl bg-secondary/60 p-4">
                      <div className="flex items-center gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-[var(--star)] text-[var(--star)]" : "text-border"}`} />)}
                        <span className="ml-2 text-xs text-muted-foreground">Prototype review · just now</span>
                      </div>
                      <h4 className="mt-1.5 font-semibold">{r.title}</h4>
                      <p className="mt-1 text-sm">{r.text}</p>
                      {r.photoUrl && <img src={r.photoUrl} alt="Review attachment" className="mt-2 max-h-48 rounded-xl object-cover" />}
                      {r.hashtags.length > 0 && <div className="mt-2"><Tags tags={r.hashtags} /></div>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </aside>
    </>
  );
}
