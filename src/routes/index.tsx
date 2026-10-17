import { createFileRoute } from "@tanstack/react-router";
import { CampusGems } from "@/components/campus/CampusGems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Gems — Durham student map" },
      { name: "description", content: "Find cheap eats, Wi-Fi cafés, quiet study spots and student deals around Durham University." },
      { property: "og:title", content: "Campus Gems — Durham student map" },
      { property: "og:description", content: "Interactive map of hidden gems for students around Durham University." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CampusGems,
});
