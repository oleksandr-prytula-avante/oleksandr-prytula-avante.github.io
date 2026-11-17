# Resume Website — Bot Context, Product Specification, and Acceptance Criteria

**Status:** living source of truth for implementation work

**Last verified against the repository:** 2026-11-17

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
```

`npm run dev` starts Vite. If the default local port is occupied, Vite may select the next available port.

`npm run build` is the minimum required verification for a code change. For UI/CSS changes, also run `npm run format:check` and `git diff --check`.

The current `test` script is `node --test`; there is no project test suite to treat as a replacement for manual responsive verification.

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
- `src/components/Links.tsx` — external contact/profile links.
- `src/components/TypingText.tsx`, `TypingCursor.tsx` — stable-width typing presentation.
- `src/components/illustrations/` — SVG-backed scenery and portfolio mark components.
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
- Display separators use a regular hyphen with spaces: `-`.
- Compound words such as `Full-Stack`, `E-learning`, and `client-server` retain their normal internal hyphen.
- Numeric ranges may retain an en dash (`–`) when it is semantically a range, such as `3–20`.
- `src/utils/text.ts` normalizes any runtime em dash to `-` and must not convert every ordinary hyphen into an em dash.

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

### Mobile and tablet layout

At 1024px and below:

- Sections are stacked in document flow; the carousel stage is not absolute/hidden.
- The page itself scrolls vertically.
- The header is fixed at the top.
- The hamburger opens a full-viewport fixed menu with language controls, section links, and social links.
- The mobile menu background scenery is full-bleed: it must ignore the menu’s horizontal content padding.
- The upper menu scene contains the sky; the lower menu scene contains the mountain mist and one UFO. Do not render a second full sky at the bottom.
- The About code-style summary is hidden on mobile/tablet.
- The About full story is visible without a More/Less toggle on mobile/tablet.
- Timeline cards are in normal flow, with circular logos and optional mobile expansion controls.
- Tags are not trapped in a fixed-height scroll container on mobile; they remain reachable in page flow.
- Need more details and Download CV must fit on one line where the viewport permits; avoid clipping the lower CTA.

### Full-bleed scenery rule

The mobile menu content has horizontal padding. Any decorative scene that must touch the viewport edges should use the established full-bleed pattern:

```css
width: 100vw;
margin-left: calc(50% - 50vw);
```

Do not fix scenery width by adding arbitrary negative pixel offsets tied to one device size.

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
- Mobile section headings use `scroll-mt-24` to account for the fixed header.
- Navigation labels are white by default and orange on hover, focus, and active state.
- Disabled navigation items must have no usable `href`, `tabIndex={-1}`, `aria-disabled`, and a not-allowed cursor.

### Mobile menu

- Opening the menu creates a fixed `z-index: 100` full-viewport overlay.
- The menu is vertically scrollable and respects safe-area bottom padding.
- The close button is a circular icon control.
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
  expertise: "Frontend, backend, APIs, microservices & system architecture",
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
- Keep headings in the same editorial pattern as timeline section headings: small uppercase/letter-spaced label, orange bullet, subtle horizontal line.

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
- Desktop/tablet target: three columns.
- Small mobile target: two columns.
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
- On mobile menu, upper sky is full-bleed and rendered once; lower scene uses mountains plus one UFO, not a second sky.
- The lower mobile scene is full-bleed using the established `100vw`/negative-margin pattern.

### UFO motion

- The main desktop UFO uses a slow multi-phase drift with small vertical bob and rotation.
- The header/mobile/footer UFO variants use distinct timing/trajectories so they do not move in lockstep.
- No opacity animation should make the UFO disappear unexpectedly.
- Motion must be smooth at the endpoints; no abrupt direction changes or teleportation.
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
- Use `-` for display separators where the source means a separator; retain ordinary internal hyphens in compound words.

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
- `npm run format:check` exits successfully.
- `git diff --check` reports no whitespace errors.
- No TypeScript errors or unused imports are introduced.

### AC-002 — Responsive layout

- At 1440px desktop, the three-column layout fits without horizontal page scrolling.
- At 1024px and below, the page becomes a vertical flow and remains scrollable.
- At widths around 640px and below, no CTA, tag, timeline row, or heading is clipped.
- At tablet widths, the fixed header does not cover section headings after hash navigation.
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

### AC-005 — Hero

- Typing does not cause horizontal layout jumps.
- `Need more details?` and `Download CV (PDF)` remain reachable and readable.
- The CV link opens the current PDF asset.
- Hero scenery never intercepts pointer events.

### AC-006 — Profile/About

- Desktop shows `#Profile` and the code-style summary.
- Desktop property keys are visually capitalized.
- Desktop toggle opens the full story with an upward reveal animation.
- Opening the story scrolls the About panel to the newly revealed content.
- Mobile/tablet hide the code summary and toggle, while showing readable story content directly.
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
- Desktop focus transitions do not create horizontal text jumps.
- Mobile cards remain readable in normal flow.

### AC-009 — Projects/gallery

- Screenshot gallery is three columns on desktop/tablet and two columns on small mobile.
- Tile layout remains 16:9 and does not overflow the timeline details panel.
- Preview opens in a modal dialog, supports navigation/zoom/close, and exposes accessible labels.
- Lazy-loaded thumbnails do not block the initial page.

### AC-010 — Scenery

- Desktop scenery does not reduce content contrast.
- Mobile menu upper sky is full-bleed and rendered once.
- Mobile menu lower scene uses full-width mountains and one UFO.
- Mountains preserve a coherent scale relative to the sky and do not leave unintended side gutters.
- Decorative motion is smooth and disabled for reduced-motion users.

### AC-011 — Internationalization

- English, Russian, Spanish, and German controls render without missing-key fallbacks for the main UI.
- Long translations wrap without clipping.
- Accessible labels and dialog controls are localized.

## 16. Manual QA matrix

Before handing off a visual change, check at least:

| Viewport                     | Required checks                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| Desktop wide (1440px+)       | Hero alignment, carousel panel, timeline rail, About internal scroll, gallery columns, mist contrast |
| Desktop narrow (1025–1366px) | Text wrapping, CTA row, timeline metadata hiding rules, scrollbar spacing                            |
| Tablet landscape             | Fixed header, mobile menu, full-bleed sky/mountains, section scroll targets                          |
| Tablet portrait              | Menu height/scroll, readable timeline, tags in page flow                                             |
| Mobile wide                  | One-line CTA where possible, no duplicate sky, bottom links and mountain scene                       |
| Mobile narrow (≤390px)       | Name wrapping, hero spacing, tag wrapping, timeline logo/content alignment                           |
| Reduced motion               | No decorative typing/reveal/scene motion that violates user preference                               |
| Keyboard-only                | Nav, language controls, About toggle, timeline More, gallery tiles, dialog controls                  |

For visual changes, verify both an untouched reload and a hash/deep-link reload such as `#experience` or `#projects`.

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
- The app intentionally has no tests folder; do not recreate one merely to satisfy a generic convention unless the user asks for tests.

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

## 20. Definition of done

A site change is complete when:

- the user-visible requirement is implemented at the correct responsive breakpoints;
- existing navigation, accessibility, localization, and reduced-motion behavior still work;
- the change does not duplicate data or introduce an unused component/constant;
- the visual result is checked at the relevant desktop, tablet, and mobile sizes;
- `npm run format:check`, `npm run build`, and `git diff --check` pass;
- any remaining visual limitation or unavailable verification tool is explicitly reported;
- a commit/push is performed only when explicitly requested by the user.
