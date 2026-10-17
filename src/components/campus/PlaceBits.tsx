import { Star } from "lucide-react";
import { CATEGORIES, priceLabel, type Place } from "@/data/places";
import { useReviews } from "@/lib/reviews-store";

export function CategoryBadge({ place }: { place: Place }) {
  const c = CATEGORIES[place.category];
  const Icon = c.icon;
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{ color: c.color, backgroundColor: `color-mix(in oklab, ${c.color} 14%, transparent)` }}>
      <Icon className="h-3.5 w-3.5" /> {c.label}
    </span>
  );
}

export function PlacePhoto({ place, className = "" }: { place: Place; className?: string }) {
  const c = CATEGORIES[place.category];
  const Icon = c.icon;
  if (place.photo) return <img src={place.photo} alt={place.name} className={`object-cover ${className}`} />;
  return (
    <div className={`grid place-items-center ${className}`} aria-hidden
      style={{ background: `linear-gradient(135deg, color-mix(in oklab, ${c.color} 30%, var(--card)), color-mix(in oklab, ${c.color} 8%, var(--card)))` }}>
      <Icon className="h-10 w-10 opacity-60" style={{ color: c.color }} />
    </div>
  );
}

export function RatingLine({ place }: { place: Place }) {
  const { getStats } = useReviews();
  const s = getStats(place.id);
  const price = priceLabel(place);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      {s.average !== null && (
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          <Star className="h-4 w-4 fill-[var(--star)] text-[var(--star)]" /> {s.average.toFixed(1)}
          <span className="font-normal text-muted-foreground">({s.count} prototype {s.count === 1 ? "review" : "reviews"})</span>
        </span>
      )}
      {price && <span className="font-semibold text-foreground">{price}</span>}
      {place.priceNote && <span>{place.priceNote}</span>}
    </div>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">{t}</span>)}
    </div>
  );
}

export function SampleNote({ place }: { place: Place }) {
  if (!place.isSample) return null;
  return <p className="text-xs italic text-muted-foreground">Sample listing for demonstration — not a verified business.</p>;
}
