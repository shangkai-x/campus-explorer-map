import {
  Utensils, Coffee, BookOpen, BadgePercent, ShoppingBag, Gem, Landmark, type LucideIcon,
} from "lucide-react";

export type CategoryId = "eats" | "cafe" | "study" | "deals" | "shops" | "gems" | "tourist";

export interface Category {
  id: CategoryId;
  label: string;
  chip: string;
  color: string; // CSS var reference
  icon: LucideIcon;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  eats: { id: "eats", label: "Cheap Eats", chip: "Cheap Eats", color: "var(--cat-eats)", icon: Utensils },
  cafe: { id: "cafe", label: "Cafés & Free Wi-Fi", chip: "Cafés", color: "var(--cat-cafe)", icon: Coffee },
  study: { id: "study", label: "Quiet Study Spots", chip: "Study Spots", color: "var(--cat-study)", icon: BookOpen },
  deals: { id: "deals", label: "Student Deals", chip: "Student Deals", color: "var(--cat-deals)", icon: BadgePercent },
  shops: { id: "shops", label: "Shops & Essentials", chip: "Shops", color: "var(--cat-shops)", icon: ShoppingBag },
  gems: { id: "gems", label: "Hidden Gems", chip: "Hidden Gems", color: "var(--cat-gems)", icon: Gem },
  tourist: { id: "tourist", label: "Tourist Attractions", chip: "Sights", color: "var(--cat-tourist)", icon: Landmark },
};

export const FILTER_ORDER: CategoryId[] = ["eats", "cafe", "study", "deals", "shops", "gems", "tourist"];

export interface Place {
  id: string;
  name: string;
  category: CategoryId;
  address: string;
  lng: number;
  lat: number;
  description: string;
  priceLevel?: 1 | 2 | 3;
  priceNote?: string;
  typicalPrice?: number; // £, used for "under £X" search
  tags: string[];
  keywords: string[];
  photo?: string;
  isSample: boolean;
}

export const DURHAM_CENTER: [number, number] = [-1.5745, 54.7715];
export const DEFAULT_ZOOM = 14.6;

/** Single source of truth for all place data. Sample entries are illustrative only. */
export const PLACES: Place[] = [
  { id: "cathedral", name: "Durham Cathedral", category: "tourist", address: "The College, Durham DH1 3EH", lng: -1.5762, lat: 54.7735, description: "UNESCO World Heritage cathedral on the peninsula. Free to enter the main building; a must-see in your first week.", priceLevel: 1, priceNote: "Free entry (donations welcome)", typicalPrice: 0, tags: ["#Free", "#MustSee", "#History"], keywords: ["unesco", "church", "architecture", "landmark"], isSample: false },
  { id: "castle", name: "Durham Castle", category: "tourist", address: "Palace Green, Durham DH1 3RW", lng: -1.5758, lat: 54.7752, description: "Norman castle that is also home to University College. Guided tours run most days.", priceLevel: 2, priceNote: "Guided tours, check for student rates", tags: ["#History", "#UNESCO"], keywords: ["landmark", "tour", "college"], isSample: false },
  { id: "billy-b", name: "Bill Bryson Library", category: "study", address: "Stockton Road, Durham DH1 3LY", lng: -1.5718, lat: 54.7672, description: "Main university library with silent floors, group rooms and long opening hours in exam season.", priceLevel: 1, priceNote: "Free for students", typicalPrice: 0, tags: ["#QuietStudy", "#FreeWiFi", "#OpenLate"], keywords: ["library", "silent", "revision", "exam", "quiet place to study"], isSample: false },
  { id: "palace-green", name: "Palace Green Library Reading Room", category: "study", address: "Palace Green, Durham DH1 3RN", lng: -1.5769, lat: 54.7744, description: "Historic reading room between the castle and cathedral. Very quiet and atmospheric.", priceLevel: 1, priceNote: "Free", typicalPrice: 0, tags: ["#QuietStudy", "#HiddenGem"], keywords: ["library", "silent", "historic"], isSample: false },
  { id: "botanic", name: "Durham University Botanic Garden", category: "gems", address: "Hollingside Lane, Durham DH1 3TN", lng: -1.5765, lat: 54.7623, description: "Peaceful gardens near the Hill colleges. Great for a walk between lectures.", priceLevel: 1, priceNote: "Free for Durham students", typicalPrice: 0, tags: ["#HiddenGem", "#Nature", "#Free"], keywords: ["garden", "walk", "nature", "near the university"], isSample: false },
  { id: "prebends", name: "Prebends Bridge Riverside Walk", category: "gems", address: "South Bailey, Durham DH1 3EE", lng: -1.5786, lat: 54.7703, description: "Classic view of the cathedral from the river. Locals' favourite sunset spot.", priceLevel: 1, priceNote: "Free", typicalPrice: 0, tags: ["#HiddenGem", "#Views", "#Free"], keywords: ["river", "walk", "photo", "sunset", "near the university"], isSample: false },
  { id: "s-noodle", name: "Sample: Peninsula Noodle Bar", category: "eats", address: "Sample location, Saddler Street, Durham", lng: -1.5744, lat: 54.7756, description: "Illustrative example of a quick noodle spot with a lunchtime bowl deal.", priceLevel: 1, priceNote: "Lunch bowls around £4.50", typicalPrice: 4.5, tags: ["#CheapEats", "#Lunch", "#Vegan"], keywords: ["lunch", "noodles", "asian", "cheap lunch", "takeaway"], isSample: true },
  { id: "s-pasty", name: "Sample: Market Pasty Stall", category: "eats", address: "Sample location, Market Place, Durham", lng: -1.5756, lat: 54.7766, description: "Illustrative example of a market stall selling filling pasties for under a fiver.", priceLevel: 1, priceNote: "Pasties from £3", typicalPrice: 3, tags: ["#CheapEats", "#Lunch", "#Takeaway"], keywords: ["lunch", "pasty", "bakery", "cheap lunch", "market"], isSample: true },
  { id: "s-curry", name: "Sample: North Road Curry House", category: "eats", address: "Sample location, North Road, Durham", lng: -1.5803, lat: 54.7783, description: "Illustrative example of a student-favourite curry spot with big portions.", priceLevel: 2, priceNote: "Mains around £8", typicalPrice: 8, tags: ["#CheapEats", "#Dinner", "#StudentFave"], keywords: ["dinner", "curry", "indian", "halal"], isSample: true },
  { id: "s-beanbag", name: "Sample: The Bean & Book Café", category: "cafe", address: "Sample location, Elvet Bridge, Durham", lng: -1.5722, lat: 54.7746, description: "Illustrative example of a cosy café with plenty of plugs and fast free Wi-Fi.", priceLevel: 2, priceNote: "Flat white ~£3.20", typicalPrice: 3.2, tags: ["#FreeWiFi", "#Coffee", "#PlugSockets"], keywords: ["coffee", "wifi", "laptop", "work", "cafes with free wifi"], isSample: true },
  { id: "s-claypath", name: "Sample: Claypath Corner Coffee", category: "cafe", address: "Sample location, Claypath, Durham", lng: -1.5712, lat: 54.7781, description: "Illustrative example of an independent roastery with quiet mornings.", priceLevel: 2, priceNote: "Coffee from £2.80", typicalPrice: 2.8, tags: ["#FreeWiFi", "#Independent", "#Coffee"], keywords: ["coffee", "wifi", "brunch", "independent"], isSample: true },
  { id: "s-hillcafe", name: "Sample: Hill Colleges Study Café", category: "study", address: "Sample location, South Road, Durham", lng: -1.5752, lat: 54.7648, description: "Illustrative example of a calm café-style study space near the Hill colleges.", priceLevel: 1, priceNote: "Tea £1.50", typicalPrice: 1.5, tags: ["#QuietStudy", "#FreeWiFi"], keywords: ["study", "quiet", "wifi", "near the university", "quiet place to study"], isSample: true },
  { id: "s-cinema", name: "Sample: Student Cinema Tuesday", category: "deals", address: "Sample location, Walkergate, Durham", lng: -1.5735, lat: 54.7790, description: "Illustrative example of a weekly student-night film discount.", priceLevel: 1, priceNote: "Tickets £4 with student ID", typicalPrice: 4, tags: ["#StudentDeals", "#Cinema", "#NightOut"], keywords: ["discount", "student discounts", "film", "movies"], isSample: true },
  { id: "s-barber", name: "Sample: Silver Street Barbers", category: "deals", address: "Sample location, Silver Street, Durham", lng: -1.5770, lat: 54.7762, description: "Illustrative example of a barber offering 20% off midweek for students.", priceLevel: 2, priceNote: "20% off with student ID", typicalPrice: 10, tags: ["#StudentDeals", "#Haircut"], keywords: ["discount", "student discounts", "haircut"], isSample: true },
  { id: "s-grocer", name: "Sample: World Foods Grocer", category: "shops", address: "Sample location, North Road, Durham", lng: -1.5792, lat: 54.7778, description: "Illustrative example of an international grocer with ingredients from home.", priceLevel: 1, priceNote: "Budget-friendly", typicalPrice: 5, tags: ["#Essentials", "#International", "#Groceries"], keywords: ["grocery", "food shop", "international students", "asian", "halal"], isSample: true },
  { id: "s-books", name: "Sample: Second-Hand Textbook Shop", category: "shops", address: "Sample location, Saddler Street, Durham", lng: -1.5740, lat: 54.7750, description: "Illustrative example of a second-hand bookshop with cheap course texts.", priceLevel: 1, priceNote: "Books from £2", typicalPrice: 2, tags: ["#Essentials", "#Books", "#Independent"], keywords: ["textbooks", "books", "independent shop"], isSample: true },
  { id: "s-garden-bench", name: "Sample: Observatory Hill Bench", category: "gems", address: "Sample location, Potters Bank, Durham", lng: -1.5850, lat: 54.7676, description: "Illustrative example of a quiet viewpoint locals recommend for clear evenings.", priceLevel: 1, priceNote: "Free", typicalPrice: 0, tags: ["#HiddenGem", "#Views"], keywords: ["view", "quiet", "walk", "near the university"], isSample: true },
];

export function getPlace(id: string) {
  return PLACES.find((p) => p.id === id);
}

export function priceLabel(p: Place) {
  return p.priceLevel ? "£".repeat(p.priceLevel) : undefined;
}
