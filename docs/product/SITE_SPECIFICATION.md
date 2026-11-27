# Resume Website — Bot Context, Product Specification, and Acceptance Criteria

**Status:** living source of truth for implementation work

**Last verified against the repository:** 2026-11-26

**Repository root:** `/Users/oleksandrprytula/Documents/resume`

This document exists so a coding bot can understand the product before editing it. It describes the current product, the intended UX, the implementation boundaries, and the acceptance criteria that every change must preserve.

When this document conflicts with a direct, newer user request, the newer user request wins. When the request is ambiguous, preserve the invariants in this document and inspect the existing implementation before making assumptions.

## 1. Product definition

This is a personal resume and portfolio website for Oleksandr (Alex) Prytula, a Full-Stack Software Engineer. It is intentionally closer to an interactive editorial profile than to a traditional CV page.

The site combines:

- a cinematic, dark “Per Aspera Ad Astra” visual language;
- a typed hero introduction;
- an animated engineering-toolkit tag wall;
- a desktop section carousel and a mobile long-form layout;
- About/Profile content presented as a compact code-style summary on desktop and as readable prose on smaller screens;
- Experience, Projects, and Education timelines;
- a screenshot gallery and full-screen screenshot preview for the Omnora project;
- multilingual UI/content in English, Russian, Spanish, and German;
- links to email, GitHub, LinkedIn, and LeetCode;
- a downloadable CV PDF.

The primary audience is a recruiter, hiring manager, technical client, or engineering peer who wants to understand the person’s profile, scope of work, technologies, and representative project work quickly.

### Product goals

1. Communicate professional identity within the first viewport.
2. Make the complete profile discoverable without requiring a separate resume download.
3. Keep the visual system modern and restrained: dark background, white text, orange accent, Ubuntu typography, subtle motion.
4. Make desktop interactions feel intentional without making mobile navigation difficult.
5. Preserve direct access to external links and the CV.
6. Keep all content maintainable through typed constants and translation keys rather than scattered hard-coded markup.

### Non-goals

- This is not a CMS.
- There is no authentication, backend, database, or user-generated content.
- Do not introduce a separate `summary.ts` data source unless the user explicitly asks for one. The profile summary is currently composed in `src/layout/About.tsx` from translation keys.
- Do not add a large UI framework or animation library for ordinary interactions.
- Do not restore a visible LinkedIn label/icon inside the About/Profile header; social links belong in the links row.

## 2. Technical baseline

### Stack

- React 19.
- TypeScript with strict project compilation through `tsc -b`.
- Vite 7.
- Tailwind CSS 4 through `@tailwindcss/vite`.
- Component-specific CSS files for complex layout and animation behavior.
- `@fontsource/ubuntu` for the Ubuntu font family.
- React DOM client entry and SSR/prerender entry.
- Playwright visual/accessibility coverage for Chromium, Firefox, and WebKit.
- Lighthouse CI, asset-reference checks, and production asset budgets.

### Runtime commands

```bash
npm install
npm run dev
npm run build
npm run build:ssr
npm run build:pages
npm run prerender:pages
npm run preview
npm run lint
npm run format:check
npm test
npm run test:e2e
npm run test:e2e:update
npm run check:assets
npm run check:budgets
npm run check:lighthouse
```

`npm run dev` starts Vite. If the default local port is occupied, Vite may select the next available port.

`npm run build` is the minimum required verification for a code change. For UI/CSS changes, also run `npm run format:check` and `git diff --check`.

`npm test` runs the unit suite. `npm run test:e2e` runs visual, keyboard,
print, locale/zoom, and Axe checks at seven viewport sizes in Chromium,
Firefox, and WebKit. Updating visual baselines is explicit via
`npm run test:e2e:update`; it must only follow a reviewed visual change.

### Deployment

- Deployment target: GitHub Pages.
- Workflow: `.github/workflows/deploy.yml`.
- Vite base: `./` in `vite.config.ts` so generated assets work under the Pages path.
- Public URL is represented by `CNAME`.
- CV asset URL is `/assets/pdf/cv.pdf` in the app and is copied from the tracked `public/assets/pdf/cv.pdf` at build time.
- Favicon is `public/icon.ico`; `index.html` references it with a relative path because the Vite base is relative.

Do not use absolute source paths for new assets unless the path is intentionally a public asset URL. Prefer `src/constants/assets.ts` for asset references.

## 3. Repository architecture

### Entry points

- `src/main.tsx` — browser/client entry.
- `src/entry-client.tsx` — client hydration/bootstrap entry used by the build setup.
- `src/entry-server.tsx` — server rendering entry.
- `src/App.tsx` — creates the locale context and renders `Main`.
- `src/layout/Main/Main.tsx` — page shell, hero/sidebar/section layout, scenery, and cross-section state.

### Layout modules

- `src/layout/Main/` — page shell and responsive scenery.
- `src/layout/Info.tsx` — typed hero text, toolkit tags, Need more details link, and CV link.
- `src/layout/About.tsx` — Profile summary and expandable full story.
- `src/layout/Experience/` — work timeline and row components.
- `src/layout/Projects/` — project timeline, gallery, and screenshot preview integration.
- `src/layout/Education/` — education timeline and row components.

### Reusable components

- `src/components/Header.tsx` — desktop header and mobile menu.
- `src/components/HeaderNavigation.tsx` — navigation items for both desktop and mobile layouts.
- `src/components/SectionCarousel.tsx` — desktop section switching and mobile stacked sections.
- `src/components/Timeline/` — generic timeline engine, item, row, period, and types.
- `src/components/Tags/` — skill tag wall and individual tag.
- `src/components/ScreenshotPreview.tsx` — native `<dialog>` screenshot viewer.
- `src/components/ResponsiveImage.tsx` is intentionally not used for scenery:
  the night sky and mountain mist retain their original SVG source artwork.
- `src/components/Links.tsx` — external contact/profile links.
- `src/components/TypingText.tsx`, `TypingCursor.tsx` — stable-width typing presentation.
- `src/components/illustrations/` — SVG-backed scenery and portfolio mark components.
- `src/components/illustrations/Ufo.tsx` and `src/hooks/useUfoDeparture.ts` — shared UFO rendering and randomized departure behavior for all scenery variants.
- `src/components/icons/` — inline React SVG icon components.

### Constants and data

- `src/constants/sections.ts` — ordered section navigation and valid hashes.
- `src/constants/skillTags.ts` — complete skill catalog, common tag subset, and href map.
- `src/constants/experience.ts` — work timeline data and technology tags.
- `src/constants/projects.ts` — project timeline data and screenshot metadata.
- `src/constants/education.ts` — education timeline data.
- `src/constants/about.ts` — ordered About story blocks.
- `src/constants/links.ts` — external links.
- `src/constants/assets.ts` — public images, SVG imports, and CV path.
- `src/constants/animations.ts` — timing values only; component-specific class strings do not belong here.
- `src/i18n/translations.ts` — all localized copy.
- `src/enums/` — stable identifiers for sections, locales, links, timeline phases, education, and experience.
- `src/utils/` — pure reusable helpers such as locale, text, time, section, typing, palette, and reveal logic.

### File organization rules

1. One primary component per component file.
2. Put reusable component prop types under `src/components/types/` or next to the generic component type definition.
3. Put content/data constants in `src/constants/`.
4. Put pure reusable functions in `src/utils/`.
5. Keep component-specific CSS with the component/layout it styles.
6. Do not place CSS class-name strings in constants files when the class is only used by one component.
7. Use `type` imports for type-only imports.
8. Prefer inferred component return types; explicit `React.ReactElement` annotations are not required.
9. SVG icons and illustrations must be rendered through React components, not pasted as large inline SVG blobs inside layout files.
10. Remove dead components/imports rather than preserving unused abstractions “just in case”.

### Audit invariants

- `ALL_SKILL_TAGS` is the single source for the hero toolkit, timeline tag links, and tag ordering metadata; timeline data may only reference labels from that catalog.
- Timeline, tag, and About interaction timings are kept in `src/constants/animations.ts`; the UFO departure duration is shared between the hook and CSS through a component CSS variable.
- Reusable behavior belongs in hooks/utils (`useUfoDeparture`, locale, time, text, typing, section, and reveal helpers); component files contain rendering and component-specific handlers.
- Generic prop/data types stay next to their reusable component or in `src/components/types/`; layout-specific types stay with the layout.
- Static import analysis must find no unreachable production component/module; the only intentional entry-only files are `src/entry-server.tsx` and `src/assets.d.ts`.
- Non-English locales must localize all narrative About story blocks. English values may be inherited only for intentional brand names, product names, or technical terms.

## 4. Design system and visual invariants

### Typography

- The application font is Ubuntu, loaded from `@fontsource/ubuntu`.
- Available weights currently include 400 and 700.
- Do not introduce a second display font without an explicit design decision.
- Keep typography responsive through existing CSS variables and `clamp()` rules.
- Hero labels and navigation may use uppercase styling; profile values and prose must remain readable and normally capitalized.
- Summary property keys are visually capitalized (`Name`, `Role`, `Experience`, etc.) through CSS; do not uppercase summary values globally.

### Color and contrast

- Background: very dark charcoal (`var(--color-bg)`).
- Primary text: white.
- Secondary text: reduced white opacity.
- Accent: orange (`var(--color-accent)`).
- Soft accent: warm light orange (`var(--color-accent-soft)`).
- Inactive/default navigation and tag text are white.
- Hover, focus-visible, active, expanded, and selected states use the orange accent for both text and borders when applicable.
- Never put important white text directly over a bright nebula/mist area without checking contrast.

### Borders and controls

- Controls use thin, low-opacity white borders by default.
- Focus-visible states must remain visible and use the orange accent.
- Rounded shapes are restrained: pills for tags/language controls, small rounded rectangles for More/Profile controls, circles for timeline logos and social links.
- Do not create a new button style when an existing timeline/compact control style is appropriate.

### Dashes and separators

- Visible em dashes (`—`) are not part of the current display style.
- Display separators use a spaced en dash: `–`.
- Compound words such as `Full-Stack`, `E-learning`, and `client-server` retain their normal internal hyphen.
- Numeric ranges may retain an en dash (`–`) when it is semantically a range, such as `3–20`.
- `src/utils/text.ts` normalizes any runtime em dash to `–` and must not convert every ordinary hyphen into an en dash.

## 5. Page layout and responsive contract

### Breakpoints

- Desktop layout: `min-width: 1025px`.
- Mobile/tablet layout: `max-width: 1024px`.
- Small/mobile typography and spacing: `max-width: 640px`.
- Animation-enabled query: `min-width: 640px`; below this, hero typing/secondary reveal behavior is intentionally more conservative.

### Desktop layout

At 1025px and wider:

- The page is a full-height shell with hidden outer overflow.
- `Main` uses a three-column layout: link rail, hero/info column, and section carousel.
- The approximate grid ratios are 5% / 40% / 55%; a narrower desktop variant uses 5% / 45% / 50%.
- The section carousel displays one active section at a time.
- The active section has a counter (`01 / 04`) and orange progress line.
- Timeline content is internally scrollable.
- Timeline items reveal with opacity/vertical motion, then may enter a focused state when More is activated.
- About has an internal panel scroll area.
- The summary code panel is visible; the long-form story is collapsed until the centered get-to-know button is activated.
- The desktop scenery consists of the night sky at the top and mountain mist near the bottom; the UFO is decorative and must not affect layout or pointer interaction.
- The original night-sky SVG is extended to the left on wide desktop only with a
  stars-only crop. The nebula and comet must never be duplicated, mirrored, or
  shifted to achieve this extension.

### Mobile and tablet layout

Below 1025px:

- Sections are stacked in document flow; the carousel stage is not absolute/hidden.
- The page itself scrolls vertically.
- The header is fixed at the top.
- The mobile sky is rendered inside and clipped by the header scene. Header
  controls sit above that scene; the page-level sky and desktop-only left-star
  extension must not create a second mobile layer.
- The header has a stable 96px visual footprint. The mobile UFO stays in the
  header scene near its top edge; it must not drift down due to scenery layout.
- The hero greeting and section headings use the same 1px accent rule. The rules end at the shared content edge.
- The hamburger opens a full-viewport fixed menu with language controls, section links, and social links.
- The mobile menu background scenery is full-bleed: it must ignore the menu’s horizontal content padding.
- Opening the mobile menu must not visually replace or move the header. The
  brand, sky crop, comet, and UFO keep the same viewport-relative geometry in
  the closed header and in the menu header.
- The upper menu scene contains the one mobile sky and the one mobile UFO. The
  lower menu scene contains mountain mist only. Do not render a second sky or
  a second UFO at the bottom.
- The About code-style summary is hidden on mobile/tablet.
- The About full story is visible without a More/Less toggle on mobile/tablet.
- Timeline cards are in normal flow, with circular logos and optional mobile expansion controls.
- Tags are not trapped in a fixed-height scroll container on mobile; they remain reachable in page flow.
- Below 640px, the CV link sits below the prompt. From 640px, they share a line when space allows.

### Full-bleed scenery rule

The mobile menu content has horizontal padding. A decorative scene that must
touch the viewport edges must be positioned relative to the viewport rather
than inheriting that padding. For a scene inside the centered menu header, use:

```css
width: 100vw;
left: 50%;
transform: translateX(-50%);
```

The lower mountain container is already `100vw` and must remain aligned to the
dialog viewport. Do not fix scenery width with arbitrary negative pixel offsets
tied to one device size.

## 6. Navigation and URL behavior

### Sections

The canonical order is:

1. `#about` — About / Обо мне / Sobre mí / Über mich.
2. `#experience` — Experience.
3. `#projects` — Projects.
4. `#education` — Education.

The source of truth is `SECTION_NAV_ITEMS` in `src/constants/sections.ts`. Never duplicate this order in a component.

### Hash behavior

- The active section is derived from the URL hash by `useActiveSectionHash`.
- Invalid or missing hashes are replaced with the About hash.
- Desktop uses hash state to choose the active carousel panel.
- Mobile assigns section IDs so native hash navigation and scroll positioning work.
- Opening or reloading a valid mobile deep link scrolls to the target once the content is ready. A visit without a hash starts at the top.
- Mobile section headings use `scroll-mt-24` to account for the fixed header.
- Navigation labels are white by default and orange on hover, focus, and active state.
- Disabled navigation items must have no usable `href`, `tabIndex={-1}`, `aria-disabled`, and a not-allowed cursor.

### Mobile menu

- Opening the menu creates a fixed `z-index: 100` full-viewport overlay.
- The menu is vertically scrollable and respects safe-area bottom padding.
- The close button is a circular icon control.
- Opening the menu moves keyboard focus inside it. Escape closes the menu and returns focus to the hamburger button.
- Selecting a valid section closes the menu.
- A desktop media-query change closes the menu automatically.
- The menu must not create horizontal overflow after full-bleed scene changes.

## 7. Hero and Info specification

`src/layout/Info.tsx` owns the hero sequence. Current English hero copy:

- `Hi, I'm`
- `Oleksandr Prytula`
- `Full-Stack Software Engineer`
- `My Core Engineering Toolkit:`
- `Need more details?`
- `Download CV (PDF)`

### Typing sequence

The typing sequence is driven by `useTypingSequence` and timing constants in `src/constants/animations.ts` and `src/constants/hero.ts`.

Required behavior:

1. Text must reserve its final width so typing does not cause horizontal jumping.
2. The hero line and name must remain aligned while characters appear.
3. The orange role text remains distinguishable from white labels.
4. Secondary content becomes available only after the configured hero state is ready.
5. On desktop, the toolkit/tags can become visible while the final CV link is still typing.
6. On smaller screens, navigation and lower content must not be made inaccessible while typing.
7. Reduced-motion users must not be forced through decorative animation.

### CTA contract

- “Need more details?” is text-like CTA content, not a generic unrelated link.
- It must share the same visual language as the More button/timeline controls where the user requests that style.
- The CV link opens `CV_PATH` in a new tab with `target="_blank"` and `rel="noreferrer"`.
- The CV link is not keyboard-focusable until its typing step has started.
- Do not allow the CTA row to be clipped by an internal scrollbar or viewport edge.

## 8. Skill tags specification

### Data model

`ALL_SKILL_TAGS` is the complete catalog. Each entry has:

- `label` — display label and stable tag identity;
- `href` — external documentation/reference URL;
- optional `common: true` — include in the hero toolkit list.

`COMMON_SKILL_TAGS` is derived from that catalog. Do not manually duplicate the common list in the component.

The current common list covers JavaScript, TypeScript, React, Next.js, Angular, RxJS, HTML, CSS, Tailwind CSS, Python, FastAPI, Django, Flask, Node.js, Express.js, Nest.js, GraphQL, REST APIs, gRPC, Microservices, JQuery, Go, Gin, Redis, Apache Kafka, RabbitMQ, Jest, Playwright, Docker, Docker Compose, AWS, ECS, Lambda, Kubernetes, SQL, MySQL, SQLite, PostgreSQL, MongoDB, CI / CD, Git, Figma, Cursor, Codex, Microsoft Copilot, Claude Code, Bash, WebRTC, WebSockets, Webpack, Vite, Konva, MobX, Redux-Saga, Material UI, NPM, Canvas, Swagger, S3, Bootstrap, Redux, Heroku, Nginx, Firebase, and any further entries marked `common` in the source catalog.

### Visual behavior

- Default tag text and border are white/neutral.
- Hover and focus-visible make both text and border orange.
- Active/hovered tags coordinate with timeline technology tags through `SkillInteractionProps`.
- Tags must remain readable and must not become permanently orange after a transient hover.
- Tags are pills with consistent horizontal/vertical padding and gap.
- Main toolkit tags are slightly more compact than large timeline visuals where required by the current responsive style.

### Reveal behavior

On a scrollable desktop tag list:

1. The first visible row starts revealing one tag at a time in catalog order.
2. Tags in the active row appear at a short, regular interval; the whole row must not pop in at once.
3. When the row is complete, the list smoothly scrolls by one detected row distance.
4. The next row starts revealing immediately after that short scroll; it must not wait for the entire tag wall or a long post-animation timeout.
5. The process ends cleanly at the last row and never loops back to already revealed tags.

The current implementation uses a short `TAG_REVEAL_STAGGER_MS` interval between individual tags, a shorter `TAG_REVEAL_DURATION_MS` for each tag’s visual entrance, and `offsetTop` row detection to calculate the one-row scroll distance. These values are implementation details, but the one-by-one/one-row interaction is a product requirement.

On mobile/tablet, the tag list is not a fixed-height scroll box. Tags must remain available in page flow; animation may be sequential, but visibility cannot depend on an inaccessible internal scroll position.

The implementation uses `IntersectionObserver` when available. It must degrade gracefully when animation is disabled, IntersectionObserver is unavailable, or reduced motion is requested.

## 9. About/Profile specification

### Desktop summary panel

The desktop panel is labeled `#Profile` and uses a code/editor-inspired presentation. It is not meant to be executable code. The current summary object is composed in `About.tsx` and contains these semantic fields:

```ts
const SUMMARY = {
  name: "Oleksandr (Alex) Prytula",
  role: "Full-Stack Software Engineer",
  experience: "10+ years in software engineering",
  domains:
    "E-learning, e-commerce, marketplaces, trading, insurance & healthcare, etc",
  background: "Product development, startups, outsourcing & outstaffing",
  teams: "3–20 engineers · International & distributed",
  expertise: "Frontend, Backend, APIs, Microservices & System Architecture",
  ownership: "Architecture, implementation, testing & delivery",
  collaboration: "Cross-functional teams · Product, design, QA & DevOps",
  education: "Master’s Degree in Software Engineering",
  communication: "English · Advanced professional proficiency",
};
```

The displayed property names are capitalized visually. The values remain normal readable text. Keep the profile name aligned with the `#Profile` header when adjusting spacing.

The header may show `he/him` as a small profile meta label. Social-link labels/icons do not belong in this header.

### Details story

The long-form story is ordered by `ABOUT_STORY_BLOCKS` and currently includes:

1. Professional Profile.
2. Large-Scale Platform Development.
3. Interactive Systems and Integrations.
4. Stakeholder Collaboration.
5. Quality and Release Reliability.
6. Mentoring.
7. Education and continued learning.
8. Career/background context.
9. Technical Focus and Engineering Approach.
10. Project Preferences.

Content requirements:

- Avoid duplicating the same claims in multiple blocks.
- Preserve the first-person professional voice.
- Keep claims consistent with the CV and timeline.
- Use translation keys, not hard-coded paragraphs in JSX.
- Story subheadings use a small, letter-spaced uppercase label and an orange bullet. The horizontal rule appears only in the desktop layout (1025px and above).

### Toggle and scroll contract

Desktop:

- The centered button reads “Or let’s get to know each other better…” in English (localized in other languages).
- It toggles `aria-expanded` and controls the details region.
- Opening expands the reveal grid and animates the story upward from below.
- After expansion, the About panel scrolls the story start into view; it must not leave the user below the newly revealed content.
- Closing collapses the story and returns the internal panel toward the top.
- The animation and scroll must be coordinated through the reveal transition/fallback timing.

Mobile/tablet:

- The code summary is hidden.
- The toggle row is hidden.
- The long-form story is visible immediately.
- There must be no inaccessible “More/Less” dependency for reading the profile.

## 10. Timeline specification

The generic timeline lives in `src/components/Timeline/`. Experience, Projects, and Education provide data and row components to the same engine.

### Shared timeline model

Each item has:

- stable `id`;
- company/product URL;
- logo asset path;
- localized text keys;
- technology tags;
- optional dates;
- optional details component.

The generic engine owns reveal state, focus state, mobile expansion state, rail geometry, scrolling, and interaction locking.

### Visual rules

- Timeline logos are circular.
- The rail is orange/accent-gradient, not gray, when active/visible.
- Timeline logos and rail remain aligned vertically.
- The first rail segment starts at the same visual level as the first item/logo content, not arbitrarily above it.
- Timeline content and secondary metadata are white; muted metadata uses reduced opacity, not gray blocks that look inactive.
- More buttons use the compact control style: small rounded rectangle, neutral border by default, orange border/text on hover/focus/expanded.
- Text must not jump horizontally when a row changes state.
- Timeline details have a small right padding on desktop to keep text away from the scrollbar; this padding is removed on smaller screens.

### Desktop focus interaction

1. Initial items reveal with a staggered upward motion.
2. Toggles remain locked until the initial reveal completes.
3. Clicking More focuses the selected item.
4. Other items dim/hide while the target moves to the top stack position.
5. The target details expand in place.
6. Clicking the focused target again exits focus.
7. Focus transitions use `EFocusPhase`: `idle`, `preparing`, `entering`, `focused`, `exiting`.
8. During transitions, avoid stale measurements; geometry is measured with animation frames before entering the moving phase.

### Mobile timeline interaction

- Items remain in normal document flow.
- Multiple items may be expanded independently through mobile toggles where enabled.
- Desktop focus/dimming behavior must not be forced onto mobile.
- Timeline content must be readable without an internal horizontal scroll.
- Logo circles remain proportional and must not be clipped by the left edge.

### Experience data

Current companies, newest first:

1. Omnora (formerly SlidePresenter) — Apr 2020 to Oct 2026.
2. DigitalSuits — Apr 2019 to Mar 2020.
3. Code & Care — Oct 2017 to Mar 2019.
4. LANARS — Oct 2016 to Sep 2017.

The exact localized company names, job titles, locations, descriptions, highlights, and tags are translation/data concerns and live in `src/constants/experience.ts` plus `src/i18n/translations.ts`.

### Education data

Current entries, newest first:

1. State University of Economics and Technology / DUET — Software Engineering master’s program, 2022–2024.
2. Binary Studio Academy — JS Full-Stack Developer Bootcamp and internship, 2016.
3. Kryvyi Rih National University — Software Engineering bachelor’s program, 2012–2016.

## 11. Projects and screenshot gallery

The current project timeline contains the Omnora Authoring project.

### Gallery

- Gallery is a compact tile grid.
- The gallery is available in the desktop layout (1025px and above) and uses three columns.
- Tiles use 16:9 presentation even though source screenshots have slightly different native dimensions.
- Images are lazy-loaded and decoded asynchronously.
- Captions are not permanently overlaid on the tile; the accessible label and full preview provide the caption.
- Hover/focus gently scales the image without changing layout.
- The gallery keeps a small right inset on desktop to avoid a timeline scrollbar collision.

### Full-screen preview

The preview uses a native `<dialog>`:

- opens modally and receives focus;
- closes through the close control, Escape/native dialog behavior, or backdrop click;
- previous/next controls wrap around the screenshot list;
- left/right arrow keys navigate unless modifier keys are held;
- touch horizontal swipe navigates when not zoomed;
- double-click or the zoom control toggles zoom;
- zoomed images can be panned with the mouse;
- the thumbnail rail centers the active thumbnail;
- reduced-motion users get instant rail movement;
- all controls have localized accessible labels.

Current screenshot metadata is maintained in `src/constants/projects.ts`; do not add screenshot paths directly in JSX.

## 12. Scenery and decorative motion

### Assets

- `night-sky.svg` — wide seamless night sky/nebula artwork.
- `mountain-mist.svg` — wide seamless mountain/mist artwork.
- `sky-ufo.svg` — decorative UFO.
- `portfolio-mark.svg` — hero/header mark.

### Layering rules

- Scenery is pointer-events-free and must not block text or controls.
- Decorative layers use page/header stacking contexts; do not solve clipping by assigning arbitrary positive z-index values to scenery over content.
- White content must retain contrast against nebula and mist areas.
- The primary `NightSky` image is shifted to the right and slightly dimmed so the bright nebula does not sit behind the white hero copy. The shift is applied directly to the image layer and therefore must not depend on one narrow media-query range.
- The mountain artwork renders at its original opacity on desktop, on mobile, and in the mobile menu. On desktop, the main mountain layer is fitted to the scenery container height with bottom alignment so the lighthouse, house, and mountain silhouettes remain visible.
- On mobile menu, the upper sky and UFO are full-bleed and rendered once; the
  lower scene uses mountains only.
- The lower mobile scene is full-bleed and aligned to the dialog viewport.
- The mobile menu lower scene reuses the same mountain container height and image scale as the main mobile scenery, so opening or closing the menu does not change the mountain silhouette.

### UFO motion

- The main desktop UFO uses a slow multi-phase drift with small vertical bob and rotation.
- The desktop and mobile-header UFO variants use distinct timing/trajectories.
- Each UFO may occasionally make a randomized, short departure across the viewport and then return to its scene; this is intentional decorative motion, not a layout transition.
- No opacity animation should make the UFO disappear unexpectedly.
- Normal drift must be smooth at the endpoints; the only abrupt movement is the explicit randomized departure.
- `prefers-reduced-motion: reduce` disables decorative UFO animation.

### Mist contrast rule

If white text overlaps a bright mist/nebula edge:

1. Prefer repositioning the decorative image/container below the text area.
2. Adjust the mask gradient to fade the bright upper edge.
3. Only then consider a subtle opacity change.
4. Never cover text with an opaque overlay that harms the scenery without a deliberate design decision.

## 13. Internationalization

### Supported locales

- `en` — English, default.
- `ru` — Russian.
- `sp` — Spanish (the enum intentionally uses `sp`, preserve the existing key unless changing the i18n contract).
- `de` — German.

### Locale lifecycle

- `App` starts with English unless an initial locale is provided.
- `useLocale` detects the preferred browser locale after mount.
- Locale is persisted under the configured local-storage key.
- Unknown/missing translation values fall back to English, then the key.
- All user-facing strings belong in `src/i18n/translations.ts` and are addressed by `ETranslationKey`.

### Translation requirements

- Add a key to the enum and all four locale dictionaries together.
- Preserve placeholders and dynamic interpolation semantics.
- Keep accessibility labels translated.
- Check long strings on narrow widths; do not assume English length.
- Do not globally uppercase prose or summary values.
- Use `–` for display separators where the source means a separator; retain ordinary internal hyphens in compound words.

## 14. Accessibility contract

Every change must preserve:

- semantic headings/sections;
- keyboard access to nav, toggles, links, gallery tiles, and preview controls;
- visible `:focus-visible` states;
- `aria-current` for active navigation;
- `aria-expanded` and `aria-controls` for About/timeline toggles;
- `aria-hidden`/`inert` for inactive desktop carousel panels;
- meaningful labels for icon-only buttons;
- alternate text for meaningful images and empty alt text for decorative thumbnails;
- native dialog behavior for screenshot preview;
- reduced-motion behavior;
- no interaction blocked by decorative layers.

Do not use color alone to communicate the only state change when a semantic attribute or text label is appropriate.

## 15. Acceptance criteria

### AC-001 — Build integrity

- `npm run build` exits successfully.
- `npm run lint` exits successfully without errors.
- `npm run format:check` exits successfully.
- `git diff --check` reports no whitespace errors.
- No TypeScript errors or unused imports are introduced.

### AC-002 — Responsive layout

- At 1440px desktop, the three-column layout fits without horizontal page scrolling.
- Below 1025px, the page uses a vertically scrollable layout with a fixed header and visible section headings. This includes exactly 1024px.
- At 1025px, the desktop grid and desktop navigation become active.
- Resizing a scrolled mobile page to desktop keeps the header fully visible at the top and preserves the active section.
- At widths around 640px and below, no CTA, tag, timeline row, or heading is clipped.
- Mobile menu content can scroll vertically without horizontal overflow.

### AC-003 — Typography and theme

- Ubuntu is used everywhere in the application UI.
- Default text is white/neutral; accent states are orange.
- Summary keys are capitalized visually, while values retain normal capitalization.
- No accidental global uppercase transformation affects prose.

### AC-004 — Navigation

- The four sections appear in About, Experience, Projects, Education order.
- Active nav state, carousel panel, counter, and progress line agree.
- Invalid/missing hashes resolve to About.
- Desktop and mobile nav have correct hover/focus/active colors.
- Opening or reloading a mobile deep link places its section heading below the fixed header. Verify with and without reduced motion.
- Opening the mobile menu focuses its close button and keeps keyboard focus within the modal. Escape closes the menu and returns focus to the hamburger button.
- Mobile section links are usable as soon as the menu opens, including during hero typing. Selecting a section reveals its content below the fixed header.

### AC-005 — Hero

- Typing does not cause horizontal layout jumps.
- With reduced motion enabled, hero text appears in full on initial load, without character-by-character typing or an animated accent rule.
- In the mobile layout, the hero greeting and section headings have 1px accent rules that end at the same horizontal position after reveal.
- `Need more details?` and `Download CV (PDF)` remain reachable and readable.
- In desktop windows 500px tall or shorter, the hero column can scroll when needed so the CV link remains reachable by pointer and keyboard.
- Below 640px, the CV link sits on its own line under the prompt. Verify that both lines fit within the content edges in all four languages at 280px and 320px.
- The CV link opens the current PDF asset.
- Hero scenery never intercepts pointer events.

### AC-006 — Profile/About

- Desktop shows `#Profile` and the code-style summary.
- Desktop property keys are visually capitalized.
- Desktop toggle opens the full story with an upward reveal animation.
- Opening the story scrolls the About panel to the newly revealed content.
- With reduced motion enabled, the desktop story opens and scrolls into view instantly. Mobile story text is visible on load with no entrance animation.
- Mobile/tablet hide the code summary and toggle, while showing readable story content directly.
- Story subheadings retain their orange bullets at all widths. Their horizontal rules appear from 1025px.
- Story blocks have no duplicated claims caused by accidental rendering.

### AC-007 — Tags

- Common tags are derived from the canonical skill catalog.
- Hover/focus changes both text and border to orange.
- Desktop tags reveal one-by-one within each row, then scroll exactly one row before continuing.
- Mobile tags remain in normal page flow and do not depend on an inaccessible internal scrollbar.
- Reduced motion removes reveal animation while preserving visibility.

### AC-008 — Timeline

- Timeline icons/logos are circular and aligned to the rail.
- Rail uses the accent gradient and is not accidentally gray/inactive.
- More buttons share one compact style and have visible focus states.
- Desktop timeline scrollbars are inset from the content edge and do not cover the timeline rows, controls, or section boundary.
- Desktop focus transitions do not create horizontal text jumps.
- Mobile cards remain readable in normal flow.

### AC-009 — Projects/gallery

- Screenshot gallery is available from 1025px and uses three columns. Below 1025px, the project card shows its summary and hides the screenshot count and gallery expansion control.
- Tile layout remains 16:9 and does not overflow the timeline details panel.
- Preview opens in a modal dialog, supports navigation/zoom/close, and exposes accessible labels.
- Lazy-loaded thumbnails do not block the initial page.

### AC-010 — Scenery

- Desktop scenery does not reduce content contrast.
- Narrow desktop/tablet hero text is not placed over the brightest `NightSky` nebula band.
- The mobile header sky is clipped to the header and rendered once. Its
  foreground controls remain readable and do not overlap the scene.
- Mobile menu lower scene uses full-width mountains only. The single mobile UFO
  remains in the upper header scene before and after the menu opens.
- The mobile page and menu use the same mountain image scale and crop. The lighthouse and its beam retain the brightness of the artwork in both scenes and on desktop.
- Mountains preserve a coherent scale relative to the sky and do not leave unintended side gutters.
- Desktop mountain scenery keeps the lighthouse and house silhouettes visible; fitting the image to the container must not vertically crop those landmarks.
- Decorative motion includes occasional intentional UFO departures, remains disabled for reduced-motion users, and does not affect layout.

### AC-011 — Internationalization

- English, Russian, Spanish, and German controls render without missing-key fallbacks for the main UI.
- Long translations wrap without clipping.
- Accessible labels and dialog controls are localized.
- Narrative About/Profile blocks are localized in all four supported locales; only intentional brand names and technical terms may remain unchanged.
- No user-facing prose is hardcoded in JSX; permitted exceptions are symbols, code/editor notation, and personal metadata such as pronouns.

### AC-012 — Architecture and code health

- Shared data has one canonical source: skill labels/links, timeline data, section order, asset paths, locale keys, and animation timings are not duplicated across components.
- Reusable behavior is implemented through shared hooks/utils, while component-specific layout and event handlers remain local.
- Reusable prop and timeline types remain typed and colocated; unnecessary `React.ReactElement` return annotations are not introduced.
- Static source inspection finds no unused production components or imports.
- Responsive behavior is verified at desktop, tablet, and mobile breakpoints; any unavailable visual verification is reported rather than assumed.

## 16. Manual QA matrix

Before handing off a visual change, check at least:

| Viewport                      | Required checks                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| Desktop wide (1440px+)        | Hero alignment, carousel panel, timeline rail, About internal scroll, gallery columns, mist contrast |
| Desktop narrow (1025–1366px)  | Text wrapping, CTA row, timeline metadata hiding rules, scrollbar spacing                            |
| Layout boundary (1024/1025px) | Fixed header, aligned section rules and hidden gallery at 1024px, desktop grid and gallery at 1025px |
| Tablet landscape              | Fixed header, mobile menu, full-bleed sky/mountains, section scroll targets                          |
| Tablet portrait               | Menu height/scroll, readable timeline, tags in page flow                                             |
| Mobile wide                   | CV link below its prompt, one sky, bottom links, matching lighthouse crop and brightness             |
| Mobile narrow (≤390px)        | Name wrapping, hero spacing, tag wrapping, timeline logo/content alignment                           |
| Reduced motion                | Complete hero text on load, static accent rules, visible tags, stationary scenery                    |
| Keyboard-only                 | Menu opening focus, Tab within menu, Escape and focus return, desktop toggles and gallery controls   |

For visual changes, verify a load without a hash and a direct load or reload with `#experience` or `#projects`. On mobile, confirm the target heading clears the fixed header with reduced motion enabled and disabled.

## 17. Change protocol for future bots

1. Read this document before editing.
2. Inspect the current implementation and git status; preserve unrelated user changes.
3. Identify the smallest component/data/style boundary for the change.
4. Prefer existing constants, hooks, and components over parallel implementations.
5. Keep content in translations/constants and behavior in components/hooks/utils.
6. Make responsive behavior explicit at the established breakpoints.
7. Add or update acceptance criteria when introducing a new interaction.
8. Run formatting, build, and diff checks.
9. If the user asks for a commit/push, report exactly what was committed and verify the push; otherwise do not create a commit automatically.
10. If visual verification is unavailable, state that clearly instead of claiming a screenshot was checked.

## 18. Known implementation risks

- Decorative scenery uses nested stacking contexts and negative z-index layers; changing `isolation`, `overflow`, or z-index can make the sky/UFO disappear or overlap content.
- The mobile menu has content padding while its scenery is full-bleed; changing menu padding can affect scene geometry.
- Timeline focus geometry is measured from live DOM positions. Avoid changing item heights or transforms without rechecking focus transitions.
- The tag reveal logic depends on `offsetTop`, `IntersectionObserver`, and scrollable desktop layout. Changes to flex wrapping, padding, or overflow can change row detection.
- The About reveal scroll depends on the `grid-template-rows` transition and a fallback timeout. If animation duration changes, update the fallback constant.
- Translation strings can change layout width and line wrapping. Always check at least English and Russian after content edits.
- Playwright snapshots deliberately cover Chromium, Firefox, and WebKit.
  Regenerate snapshots only after reviewing the rendered change at the
  affected viewport.

## 19. Useful file map for targeted changes

| Task                       | Primary files                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Hero copy/typing           | `src/layout/Info.tsx`, `src/constants/animations.ts`, `src/constants/hero.ts`, `src/i18n/translations.ts`                              |
| Profile summary/story      | `src/layout/About.tsx`, `src/layout/About.css`, `src/constants/about.ts`, `src/i18n/translations.ts`                                   |
| Section order/hash         | `src/constants/sections.ts`, `src/utils/sections.ts`, `src/hooks/useActiveSectionHash.ts`                                              |
| Navigation colors/menu     | `src/components/Header.tsx`, `src/components/HeaderNavigation.tsx`, `src/components/SectionNavigation.css`, `src/layout/Main/Main.css` |
| Skill catalog/tag behavior | `src/constants/skillTags.ts`, `src/components/Tags/Tags.tsx`, `src/components/Tags/Tags.css`, `src/components/Tags/Tag.tsx`            |
| Experience                 | `src/constants/experience.ts`, `src/layout/Experience/`, `src/components/Timeline/`                                                    |
| Projects/gallery           | `src/constants/projects.ts`, `src/layout/Projects/`, `src/components/ScreenshotPreview.*`                                              |
| Education                  | `src/constants/education.ts`, `src/layout/Education/`, `src/components/Timeline/`                                                      |
| Scenery/UFO                | `src/components/illustrations/`, `src/layout/Main/Main.css`, `src/constants/assets.ts`                                                 |
| Locale/content             | `src/enums/i18n.ts`, `src/i18n/types.ts`, `src/i18n/useLocale.ts`, `src/i18n/translations.ts`                                          |
| Asset paths/CV             | `src/constants/assets.ts`, `src/constants/paths.ts`, `public/assets/`, `index.html`                                                    |
| Quality gates              | `tests/`, `playwright.config.ts`, `lighthouserc.cjs`, `scripts/check-assets.mjs`, `scripts/check-budgets.mjs`                          |

## 20. Definition of done

A site change is complete when:

- the user-visible requirement is implemented at the correct responsive breakpoints;
- existing navigation, accessibility, localization, and reduced-motion behavior still work;
- the change does not duplicate data or introduce an unused component/constant;
- the visual result is checked at the relevant desktop, tablet, and mobile sizes;
- `npm run format:check`, `npm run build:pages`, `npm test`, `npm run check:assets`, `npm run check:budgets`, and `git diff --check` pass;
- any remaining visual limitation or unavailable verification tool is explicitly reported;
- a commit/push is performed only when explicitly requested by the user.

## 21. Responsive scenery and header contract

This section is normative. The scenery/header system is the most fragile part
of the product because it combines fixed positioning, full-bleed art, clipped
SVGs, animation, and a breakpoint-dependent page layout. Do not make a visual
"quick fix" to one layer without checking the whole contract below.

### 21.1 One breakpoint source

- `DESKTOP_MIN_WIDTH_MEDIA_QUERY` in `src/constants/mediaQueries.ts` is the
  semantic source for the desktop/mobile layout boundary.
- Any Tailwind arbitrary breakpoint and any CSS media query that changes
  navigation, carousel, header, hero, gallery, or scenery behavior must use
  the same value.
- A change to this boundary is a coordinated responsive refactor, not a
  one-file CSS edit. Update the TypeScript query, all Tailwind class breakpoints,
  CSS media queries, visual snapshots, and this document together.
- Browser zoom and docked DevTools change the available CSS viewport. The
  relevant value for breakpoint behavior is CSS width, not physical screenshot
  width. Test intermediate widths around the boundary as well as 1024/1025.

### 21.2 Desktop scene

- The desktop page has one `NightSky` instance at the top and one
  `MountainMist` instance at the bottom.
- `NightSky` uses the original vector source. The nebula, comet, and UFO are
  part of the authored composition and must retain their original placement.
- If the star field needs extension to the left, it may contain only stars
  sampled from the source area immediately to the right of the nebula.
  It must not duplicate, mirror, shift, crop into view, or create another
  instance of the nebula, comet, logo, or UFO.
- The extended left star field must have visually comparable density to the
  right-of-nebula star field. Verify this at 1440px and 1920px before changing
  a baseline.
- Never solve density by hand-drawn CSS circles, rasterizing the source art,
  or lowering opacity until a visible region disappears.
- The mountain image remains a single original SVG. Its lighthouse, house,
  beam, and silhouette must remain visible; it cannot be replaced with a
  low-quality raster fallback.

### 21.3 Mobile and tablet scene

- Mobile/tablet has exactly one visible sky layer: the clipped header scene.
  The page-level `NightSky` and every desktop-only star extension are hidden
  below the layout boundary.
- The mobile header scene is full viewport width but clipped by the fixed
  header. Its sky must never extend into the document content, menu, or browser
  overflow area.
- The mobile SVG crop must show only the authored half of `night-sky.svg`.
  The mirrored seam-extension half must stay outside the viewport so the comet
  is shown exactly once and in its original orientation. Do not correct this
  with `scaleX(-1)` or by mirroring the whole background.
- Header foreground children (brand, navigation, language control, hamburger)
  are explicitly above the sky scene. The scene itself must not receive pointer
  events.
- The header owns a stable 96px visual footprint. It must not change height
  after font, SVG, or menu state changes, and the main content must start below
  that footprint.
- On mobile/tablet the header background remains the site background color;
  scene placement is handled by its own stacking layer, not by making the
  entire fixed header transparent.
- The header UFO stays inside its clipped scene at a stable top position. The
  main-sky UFO is hidden on mobile/tablet. Opening the menu keeps the single UFO
  in the menu header at the same viewport-relative coordinates; no footer UFO
  is rendered.
- The mobile menu has its own upper sky/UFO scene and a lower mountain-only
  scene. It does not inherit the page-level desktop extension and must not show
  a second sky or UFO in the lower scene.

### 21.3.1 Mobile menu parity contract

Treat the closed mobile header and the open menu header as two renderings of
one visual component. At the same viewport size:

- `.site-header .header-brand` and `.mobile-menu-header .header-brand` have the
  same `x`, `y`, width, and height;
- `.site-header .header-scene__sky` and
  `.mobile-menu-header .header-scene__sky` have the same viewport bounds,
  `background-position`, and `background-size`;
- `.site-header .header-scene__ufo` and
  `.mobile-menu-header .header-scene__ufo` have the same base coordinates and
  size when decorative animation is disabled;
- the brand and controls remain above the scene in both states;
- opening the dialog adds no landscape-only top padding and causes no
  horizontal overflow;
- exactly one comet and one UFO are visible in either state.

Verify this contract at 390×844, 844×390, 768×1024, and 1024×768. Use
`prefers-reduced-motion: reduce` when comparing UFO geometry so animation phase
does not create a false mismatch.

### 21.4 Layering model

From back to front, the required order is:

1. resume-page background;
2. page-level desktop scenery (desktop only);
3. header-scene artwork, clipped to its owner;
4. header foreground controls and brand;
5. mobile menu dialog when open;
6. dialogs/previews and focus outlines.

Rules:

- A negative `z-index` scene may not escape an isolated parent.
- A scene cannot be moved above controls merely to make it visible; fix the
  parent stacking context instead.
- `overflow: hidden` is applied to the owner that clips a scene, never to a
  broad page container if it can clip scroll/focus content.
- Every change to `position`, `isolation`, `overflow`, `z-index`, `transform`,
  `mask-image`, or header height requires desktop and mobile visual review.

### 21.5 SVG asset rules

- The original `night-sky.svg`, `mountain-mist.svg`, and `portfolio-mark.svg`
  are source-quality assets. Do not replace them with lossy AVIF/PNG versions
  to satisfy a generic per-file limit.
- Preserve the vector portfolio lettering and its bold appearance. Any SVG
  optimization must be visually compared at 100% and 200% zoom before use.
- Asset budgets distinguish large vector illustrations from raster content;
  they are guardrails, not authorization to lower visual fidelity.
- Decorative images use `aria-hidden` through their owner and empty image alt
  text. They never convey product content.

### 21.6 Required visual test matrix for scenery changes

Do not update a snapshot until the rendered result has been inspected at:

| Scenario          | Required assertion                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| 390×844           | One clipped header sky; stable 96px header; no duplicate UFO or horizontal overflow.               |
| 768×1024          | Header foreground remains above sky; long-form content begins below the fixed header.              |
| 1024×768          | Boundary behavior is intentional; no desktop carousel/header leakage into the mobile stack.        |
| 1025×768          | Desktop layout starts as a coherent whole, not a mixture of mobile and desktop rules.              |
| 1440×900          | Nebula/comet unchanged; left/right star density is balanced; mountain landmarks are visible.       |
| 1920×1080         | Scene remains full-width without stretching, duplicated celestial objects, or side gutters.        |
| 200% browser zoom | CSS-width breakpoint transition remains coherent; fixed header and scenery do not overlap content. |

In addition to the visual tests, run `npm run lint`, `npm test`,
`npm run check:assets`, `npm run check:budgets`, and `npm run build:pages`.
For performance-sensitive scenery changes run `npm run check:lighthouse`.

Note: This portfolio site includes large artistic SVG illustrations (night-sky.svg and mountain-mist.svg) which are intentionally large for visual impact. These cause higher Lighthouse scores, particularly in Largest Contentful Paint (LCP), but are acceptable for this type of portfolio website.

### 21.7 Prohibited regressions

- Do not add a second page-level sky to fix a missing mobile header sky.
- Do not show a desktop star extension below the desktop breakpoint.
- Do not use a fixed header with transparent page-level art behind it if that
  makes content or controls appear to overlap.
- Do not mirror the full night-sky SVG: it mirrors the comet and nebula too.
- Do not add hand-authored stars that do not match the asset's authored dot
  pattern.
- Do not change a visual baseline merely because a broken layout produced a
  new screenshot.
