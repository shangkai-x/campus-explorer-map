import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export interface Review {
  id: string;
  placeId: string;
  rating: number;
  title: string;
  text: string;
  hashtags: string[];
  photoUrl?: string;
  createdAt: number;
  isPrototype: true;
}

export type NewReview = Omit<Review, "id" | "createdAt" | "isPrototype">;

interface Ctx {
  getReviews: (placeId: string) => Review[];
  addReview: (r: NewReview) => void;
  getStats: (placeId: string) => { count: number; average: number | null };
}

const ReviewsContext = createContext<Ctx | null>(null);

/** Temporary in-memory review store. Replace with a persistent backend later. */
export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const getReviews = useCallback(
    (id: string) => reviews.filter((r) => r.placeId === id).sort((a, b) => b.createdAt - a.createdAt),
    [reviews],
  );
  const addReview = useCallback((r: NewReview) => {
    setReviews((prev) => [...prev, { ...r, id: `${Date.now()}-${prev.length}`, createdAt: Date.now(), isPrototype: true }]);
  }, []);
  const getStats = useCallback(
    (id: string) => {
      const rs = reviews.filter((r) => r.placeId === id);
      return { count: rs.length, average: rs.length ? rs.reduce((s, r) => s + r.rating, 0) / rs.length : null };
    },
    [reviews],
  );
  return <ReviewsContext.Provider value={{ getReviews, addReview, getStats }}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const c = useContext(ReviewsContext);
  if (!c) throw new Error("useReviews must be used inside ReviewsProvider");
  return c;
}

export function validateReview(r: Partial<NewReview>) {
  const errors: Record<string, string> = {};
  if (!r.rating || r.rating < 1 || r.rating > 5) errors["rating"] = "Choose a rating from 1 to 5 stars.";
  if (!r.title?.trim()) errors["title"] = "Add a short title.";
  if (!r.text?.trim() || r.text.trim().length < 10) errors["text"] = "Write at least 10 characters.";
  return errors;
}

export function parseHashtags(input: string) {
  return Array.from(new Set(input.split(/[\s,]+/).map((t) => t.replace(/^#+/, "").trim()).filter(Boolean).map((t) => `#${t}`)));
}
