import { useEffect, useRef, useState } from "react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, MapMouseEvent, ErrorEvent } from "maplibre-gl";
import type { FeatureCollection, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { Plus, Minus, LocateFixed, Loader2, AlertTriangle } from "lucide-react";
import { CATEGORIES, DEFAULT_ZOOM, DURHAM_CENTER, type Place } from "@/data/places";

const STYLE_URL = import.meta.env["VITE_MAP_STYLE_URL"] || "https://tiles.openfreemap.org/styles/positron";

const iconCache: Record<string, string> = {};
function iconSvg(cat: Place["category"]) {
  return (iconCache[cat] ??= renderToStaticMarkup(createElement(CATEGORIES[cat].icon, { size: 18, strokeWidth: 2.25 })));
}

interface Props {
  places: Place[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  focus: { id: string; nonce: number } | null;
}

export default function MapView({ places, selectedId, onSelect, focus }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markers = useRef(new Map<string, { marker: maplibregl.Marker; el: HTMLButtonElement }>());
  const placesRef = useRef(places);
  const selectRef = useRef(onSelect);
  const selectedRef = useRef(selectedId);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  placesRef.current = places;
  selectRef.current = onSelect;
  selectedRef.current = selectedId;

  useEffect(() => {
    if (!container.current) return;
    const map = new maplibregl.Map({
      container: container.current,
      style: STYLE_URL,
      center: DURHAM_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 10,
      maxZoom: 19,
      attributionControl: { compact: true },
    });
    mapRef.current = map;
    const timeout = setTimeout(() => !map.loaded() && setStatus((s) => (s === "loading" ? "error" : s)), 15000);

    map.on("error", (e: ErrorEvent) => {
      if (!map.isStyleLoaded() && /style|fetch/i.test(String(e.error?.message))) setStatus("error");
    });

    map.on("load", () => {
      clearTimeout(timeout);
      setStatus("ready");
      map.addSource("places", { type: "geojson", data: toGeo(placesRef.current), cluster: true, clusterRadius: 44, clusterMaxZoom: 15 });
      map.addLayer({ id: "clusters", type: "circle", source: "places", filter: ["has", "point_count"],
        paint: { "circle-color": "#1f4d3a", "circle-opacity": 0.92, "circle-stroke-color": "#fff", "circle-stroke-width": 3,
          "circle-radius": ["step", ["get", "point_count"], 18, 5, 23, 10, 28] } });
      map.addLayer({ id: "cluster-count", type: "symbol", source: "places", filter: ["has", "point_count"],
        layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 13, "text-font": ["Noto Sans Bold"] },
        paint: { "text-color": "#fff" } });
      map.on("click", "clusters", async (e: MapMouseEvent) => {
        const f = map.queryRenderedFeatures(e.point, { layers: ["clusters"] })[0];
        if (!f) return;
        const zoom = await (map.getSource("places") as GeoJSONSource).getClusterExpansionZoom(f.properties.cluster_id);
        map.easeTo({ center: (f.geometry as Point).coordinates as [number, number], zoom: zoom + 0.3, duration: 500 });
      });
      map.on("mouseenter", "clusters", () => (map.getCanvas().style.cursor = "pointer"));
      map.on("mouseleave", "clusters", () => (map.getCanvas().style.cursor = ""));
      map.on("render", syncMarkers);
    });
    map.on("click", (e: MapMouseEvent) => {
      if ((e.originalEvent.target as HTMLElement).closest(".cg-marker")) return;
      if (!map.queryRenderedFeatures(e.point, { layers: ["clusters"] }).length) selectRef.current(null);
    });

    function syncMarkers() {
      if (!map.getSource("places")) return;
      const visible = new Set<string>();
      for (const f of map.querySourceFeatures("places")) {
        if (f.properties?.cluster) continue;
        const id = f.properties!.id as string;
        if (visible.has(id)) continue;
        visible.add(id);
        if (!markers.current.has(id)) {
          const p = placesRef.current.find((x) => x.id === id);
          if (!p) continue;
          const el = document.createElement("button");
          el.type = "button";
          el.className = "cg-marker";
          el.style.setProperty("--c", CATEGORIES[p.category].color);
          el.setAttribute("aria-label", `${p.name}, ${CATEGORIES[p.category].label}`);
          el.title = p.name;
          el.innerHTML = `<span class="cg-pin">${iconSvg(p.category)}</span>`;
          el.addEventListener("click", (ev) => { ev.stopPropagation(); selectRef.current(id); });
          const marker = new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat([p.lng, p.lat]).addTo(map);
          markers.current.set(id, { marker, el });
        }
        markers.current.get(id)!.el.classList.toggle("is-selected", selectedRef.current === id);
      }
      for (const [id, m] of markers.current) {
        if (!visible.has(id)) { m.marker.remove(); markers.current.delete(id); }
      }
    }

    return () => { clearTimeout(timeout); map.remove(); markers.current.clear(); };
  }, []);

  // Update data when filters/search change
  useEffect(() => {
    const src = mapRef.current?.getSource("places") as GeoJSONSource | undefined;
    src?.setData(toGeo(places));
  }, [places, status]);

  // Selected state
  useEffect(() => {
    for (const [id, m] of markers.current) m.el.classList.toggle("is-selected", id === selectedId);
  }, [selectedId]);

  // Fly-to requests
  useEffect(() => {
    const map = mapRef.current;
    const p = focus && placesRef.current.find((x) => x.id === focus.id);
    if (!map || !p) return;
    map.flyTo({ center: [p.lng, p.lat], zoom: Math.max(map.getZoom(), 16.2), duration: 900, essential: true, offset: [0, -60] });
  }, [focus, status]);

  const btn = "grid h-11 w-11 place-items-center bg-card text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring";

  return (
    <div className="absolute inset-0">
      <div ref={container} className="absolute inset-0" aria-label="Map of places around Durham University" role="region" />
      {status === "loading" && (
        <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
          <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-[var(--shadow-float)]">
            <Loader2 className="h-4 w-4 animate-spin text-primary" /> Loading map of Durham…
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 grid place-items-center bg-background p-6">
          <div className="max-w-md rounded-2xl bg-card p-6 text-sm shadow-[var(--shadow-float)]">
            <AlertTriangle className="mb-2 h-6 w-6 text-destructive" />
            <h2 className="font-display text-lg font-semibold">The map couldn't load</h2>
            <p className="mt-2 text-muted-foreground">
              The map tiles didn't respond. Check your connection and reload. To use a different provider, set
              <code className="mx-1 rounded bg-muted px-1">VITE_MAP_STYLE_URL</code> to a MapLibre style URL (e.g. MapTiler with your key).
            </p>
            <button onClick={() => location.reload()} className="mt-4 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">Reload</button>
          </div>
        </div>
      )}
      <div className="absolute bottom-28 right-3 z-10 flex flex-col gap-2 md:bottom-8 md:right-5">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-float)]">
          <button className={btn} aria-label="Zoom in" onClick={() => mapRef.current?.zoomIn()}><Plus className="h-5 w-5" /></button>
          <div className="h-px bg-border" />
          <button className={btn} aria-label="Zoom out" onClick={() => mapRef.current?.zoomOut()}><Minus className="h-5 w-5" /></button>
        </div>
        <button className={`${btn} rounded-2xl border border-border shadow-[var(--shadow-float)]`} aria-label="Return to Durham University"
          onClick={() => mapRef.current?.flyTo({ center: DURHAM_CENTER, zoom: DEFAULT_ZOOM, duration: 900 })}>
          <LocateFixed className="h-5 w-5 text-primary" />
        </button>
      </div>
    </div>
  );
}

function toGeo(places: Place[]): FeatureCollection {
  return { type: "FeatureCollection", features: places.map((p) => ({ type: "Feature", properties: { id: p.id }, geometry: { type: "Point", coordinates: [p.lng, p.lat] } })) };
}
