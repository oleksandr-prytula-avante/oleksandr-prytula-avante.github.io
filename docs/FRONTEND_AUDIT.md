# Frontend audit

## Scope

The review covers responsive layout, animation performance and sequencing,
component/style architecture, rendering, and graphical assets.

## Architecture map

- `App` owns locale state and provides the i18n context.
- `Main` composes the persistent hero, header, social links, and section
  carousel. It is also the shared owner of skill hover state.
- `Header` owns desktop/mobile navigation and the modal mobile menu.
- `SectionCarousel` renders one desktop panel at a time and a linear document
  flow on smaller screens.
- `Timeline`, `Tags`, and the reveal hooks implement the reusable content and
  animation primitives used by Experience, Projects, and Education.
- `ProjectGallery` renders lightweight thumbnails. The full-screen
  `ScreenshotPreview` is loaded as a separate JavaScript/CSS chunk only after
  it is requested.
- Illustration components isolate decorative SVG assets from content and
  interaction components.

The current boundaries are appropriate: content constants are separate from
rendering, shared interactions are hooks, and domain sections remain small.
Avoid introducing a global state library; the shared state surface is still
small enough for lifted React state and context.

## Changes made

### Responsive and cross-browser layout

- Added `100vh`/`100svh` and `100vh`/`100dvh` fallbacks to handle older
  engines and mobile browser chrome.
- Accounted for the bottom safe area in the mobile document.
- Added WebKit mask composition and mask-image fallbacks for Safari.
- Added WebKit scrollbar styling while retaining standards-based Firefox
  styling.
- Replaced percentage-based mobile navigation width with a fluid, bounded
  width.
- Added `content-visibility` and an intrinsic-size estimate to mobile sections
  so off-screen document content can be skipped by supporting browsers without
  changing behavior elsewhere.

### Animation and rendering

- Replaced a continuous `requestAnimationFrame` visibility polling loop with
  `IntersectionObserver`, including a safe fallback.
- Removed animated blur filters from section transitions. Opacity and
  transforms stay on compositor-friendly properties.
- Removed permanent `will-change` allocations from infinitely animated UFOs
  and retained 3D transforms/backface isolation.
- Disabled cursor blinking when reduced motion is requested.
- Preserved reduced-motion behavior across navigation, carousels, previews,
  and decorative motion.

### Loading and graphics

- Split `ScreenshotPreview` and its styles into an on-demand chunk. The main
  bundle no longer pays the viewer cost before the first gallery interaction.
- Converted the two large decorative background SVGs to AVIF (12 KB and 20 KB)
  with PNG fallbacks. The text-bearing portfolio mark remains an SVG so its
  Ubuntu Bold lettering stays sharp and faithful.
- Generated AVIF thumbnails for gallery tiles; original WebP screenshots load
  only in the full-screen viewer.
- Reduced font output to the Latin and Cyrillic subsets actually needed by the
  site.

### Accessibility and discoverability

- Added a skip link, live section announcements, restored gallery focus, and
  larger line numbers with compliant contrast.
- Added coarse-pointer touch-target sizing plus high-contrast and forced-color
  modes.
- Added canonical, localized alternate URLs, social metadata, a social image,
  JSON-LD `Person` schema, `robots.txt`, `sitemap.xml`, a web manifest, and
  locale-aware document metadata.

### Quality control

- Added unit tests for typing-sequence behavior.
- Added Playwright visual regression, keyboard, dialog, and Axe accessibility
  tests across Chromium, Firefox, and WebKit at seven viewport sizes.
- Added asset-budget and missing-asset checks, Lighthouse CI budgets, and a
  GitHub Actions workflow.

## Findings and priorities

### Remaining priorities

1. Add a 200% zoom scenario, visual checks for an opened screenshot preview,
   and targeted tests for locale persistence and section hash normalization.
2. Make `DESKTOP_MIN_WIDTH_MEDIA_QUERY` the direct source for all responsive
   layout conventions if the CSS system is refactored further; Tailwind's
   arbitrary breakpoint utilities are currently aligned but not generated from
   that TypeScript constant.
3. Keep original full-size screenshots for the modal viewer, but regenerate the
   AVIF thumbnails whenever screenshot source assets change.
4. Review the Lighthouse budgets against real production hosting once deployed;
   local scores verify regressions but not CDN latency or cache headers.

### Product improvements

1. Add privacy-friendly analytics only if there is a concrete decision it will
   support (for example, PDF downloads or contact-link conversions).

## Verification

- ESLint, formatting, TypeScript, Vite production build, SSR build, prerender,
  missing-asset check, and asset budgets pass.
- Two unit tests pass.
- 27 Playwright checks pass across Chromium, Firefox, and WebKit.
- Axe reports no serious or critical accessibility violations.
- Lighthouse CI passes its accessibility, best-practices, SEO, LCP, CLS, and
  transfer-size budgets.
