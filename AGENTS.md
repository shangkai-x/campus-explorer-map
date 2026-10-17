<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Campus Gems map: place data lives only in src/data/places.ts; search logic in src/lib/search.ts; reviews in src/lib/reviews-store.tsx (in-memory). Why: single source of truth, easy to swap for a backend later.
- MapLibre is loaded lazily behind ClientOnly and excluded from Vite optimizeDeps. Why: SSR safety and its web worker fails to load when pre-bundled.
