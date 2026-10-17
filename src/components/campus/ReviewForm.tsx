import { useEffect, useState } from "react";
import { Star, X, ImagePlus } from "lucide-react";
import type { Place } from "@/data/places";
import { parseHashtags, useReviews, validateReview } from "@/lib/reviews-store";

export function ReviewForm({ place, onClose, onSubmitted }: { place: Place; onClose: () => void; onSubmitted: () => void }) {
  const { addReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [photo, setPhoto] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const data = { placeId: place.id, rating, title: title.trim(), text: text.trim(), hashtags: parseHashtags(tags), photoUrl: photo };
    const errs = validateReview(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addReview(data);
    onSubmitted();
  }

  const field = "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-foreground/30 backdrop-blur-[2px] md:place-items-center" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Write a review for ${place.name}`} noValidate
        className="cg-rise max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-card p-5 shadow-[var(--shadow-float)] md:w-[480px] md:rounded-3xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Write a review</p>
            <h2 className="font-display text-xl font-bold">{place.name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cancel review" className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"><X className="h-5 w-5" /></button>
        </div>

        <fieldset className="mb-4">
          <legend className="mb-1.5 text-sm font-semibold">Your rating *</legend>
          <div className="flex gap-1" role="radiogroup" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} className="rounded-lg p-1 transition-transform hover:scale-110">
                <Star className={`h-8 w-8 ${n <= (hover || rating) ? "fill-[var(--star)] text-[var(--star)]" : "text-border"}`} />
              </button>
            ))}
          </div>
          {errors["rating"] && <p className="mt-1 text-xs text-destructive">{errors["rating"]}</p>}
        </fieldset>

        <label className="mb-3 block text-sm font-semibold">Title *
          <input className={`${field} mt-1.5 font-normal`} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="e.g. Best £4 lunch near campus" />
          {errors["title"] && <span className="mt-1 block text-xs font-normal text-destructive">{errors["title"]}</span>}
        </label>
        <label className="mb-3 block text-sm font-semibold">Your review *
          <textarea className={`${field} mt-1.5 min-h-28 font-normal`} value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} placeholder="What should other students know?" />
          {errors["text"] && <span className="mt-1 block text-xs font-normal text-destructive">{errors["text"]}</span>}
        </label>
        <label className="mb-3 block text-sm font-semibold">Hashtags
          <input className={`${field} mt-1.5 font-normal`} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="#CheapEats #FreeWiFi" />
        </label>
        <div className="mb-4">
          <span className="text-sm font-semibold">Photo</span>
          <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input p-3 text-sm text-muted-foreground hover:bg-secondary/50">
            {photo ? <img src={photo} alt="Selected" className="h-14 w-14 rounded-lg object-cover" /> : <ImagePlus className="h-6 w-6" />}
            {photo ? "Change photo" : "Add a photo (optional)"}
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) setPhoto(URL.createObjectURL(f)); }} />
          </label>
        </div>
        <p className="mb-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">Prototype: your review appears instantly here but isn't saved permanently or shared with other users yet.</p>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary">Cancel</button>
          <button type="submit" className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">Submit Review</button>
        </div>
      </form>
    </div>
  );
}
