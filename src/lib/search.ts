import { CATEGORIES, type CategoryId, type Place } from "@/data/places";

export const SEARCH_SUGGESTIONS = [
  "Lunch under £5",
  "Quiet place to study",
  "Cafés with free Wi-Fi",
  "Student discounts",
  "Hidden gems near the university",
];

const SYNONYMS: Record<string, string[]> = {
  lunch: ["lunch", "cheapeats"], food: ["cheapeats", "lunch", "dinner"], eat: ["cheapeats"], cheap: ["cheapeats", "free"],
  wifi: ["freewifi", "wifi"], "wi-fi": ["freewifi", "wifi"], cafe: ["coffee", "cafe"], cafes: ["coffee", "cafe"], café: ["coffee", "cafe"], cafés: ["coffee", "cafe"],
  quiet: ["quiet", "quietstudy", "silent"], study: ["study", "quietstudy", "library"],
  discount: ["discount", "studentdeals"], discounts: ["discount", "studentdeals"], deals: ["studentdeals", "discount"],
  hidden: ["hiddengem"], gem: ["hiddengem"], gems: ["hiddengem"], shop: ["essentials", "shop"], shops: ["essentials", "shop"],
};
const STOP = new Set(["a", "the", "to", "with", "for", "near", "place", "places", "under", "and", "in", "of", "free", "university"]);

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/#/g, "");

function haystack(p: Place) {
  return norm([p.name, CATEGORIES[p.category].label, p.description, p.address, ...p.tags, ...p.keywords].join(" ")).replace(/[^a-z0-9£ ]/g, " ");
}

/**
 * Local search. Swap this function for a database / AI search call later;
 * callers only depend on (places, query, category) -> Place[].
 */
export function searchPlaces(places: Place[], query: string, category: CategoryId | "all"): Place[] {
  let list = category === "all" ? places : places.filter((p) => p.category === category);
  const q = norm(query.trim());
  if (!q) return list;

  const price = q.match(/(?:under|below|less than|<)\s*£?\s*(\d+(?:\.\d+)?)/);
  if (price) {
    const max = parseFloat(price[1] ?? "0");
    list = list.filter((p) => p.typicalPrice !== undefined && p.typicalPrice <= max);
  }
  const rest = q.replace(/(?:under|below|less than|<)\s*£?\s*\d+(?:\.\d+)?/, " ");
  const tokens = rest.split(/[^a-z0-9-]+/).filter((t) => t && !STOP.has(t));
  if (!tokens.length) return list;

  const scored = list.map((p) => {
    const h = haystack(p);
    let score = 0;
    if (norm(p.name).includes(q)) score += 10;
    for (const t of tokens) {
      const alts = [t.replace(/-/g, ""), ...(SYNONYMS[t] ?? [])];
      if (alts.some((a) => h.includes(a))) score += 2;
    }
    return { p, score };
  });
  const best = Math.max(0, ...scored.map((s) => s.score));
  // Require most tokens to match so multi-word queries stay relevant.
  const threshold = Math.max(2, Math.min(best, tokens.length * 2 - 2));
  return scored.filter((s) => s.score >= threshold).sort((a, b) => b.score - a.score).map((s) => s.p);
}
