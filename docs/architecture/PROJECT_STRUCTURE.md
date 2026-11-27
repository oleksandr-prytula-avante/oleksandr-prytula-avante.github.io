# Repository structure

This document defines where files belong and how modules may depend on one
another. It is intended for both human contributors and coding agents.

## Top-level layout

```text
.
├── .github/                  # CI and deployment workflows
├── docs/
│   ├── agents/               # Canonical automation instructions
│   ├── architecture/         # Repository and code-organization rules
│   └── product/              # Product behavior and visual specification
├── public/                   # Files copied to the build without bundling
│   └── assets/               # Fonts, social image, and downloadable CV
├── scripts/                  # Build-time and validation scripts
├── src/                      # Application source
├── tests/
│   ├── e2e/                  # Cross-browser behavior and visual snapshots
│   └── unit/                 # Fast deterministic module tests
├── AGENTS.md                 # Codex/agent discovery adapter
├── CLAUDE.md                 # Claude discovery adapter
└── OLLAMA.md                 # Ollama runner discovery adapter
```

Generated directories such as `dist/`, `test-results/`, `playwright-report/`,
`.lighthouseci/`, and `node_modules/` are not source and must never be used as
the canonical location for code or documentation.

## Source layout

```text
src/
├── components/               # Reusable presentational and UI components
│   ├── icons/                # Small React SVG icon components
│   ├── illustrations/        # Authored scenery wrappers and SVG assets
│   └── types/                # Types shared by reusable components
├── constants/                # Immutable content, configuration, and catalogs
├── enums/                    # Stable domain identifiers
├── hooks/                    # Reusable React behavior
├── i18n/                     # Locale context, translations, and locale state
├── layout/                   # Page composition and resume sections
│   ├── Main/                 # Application shell and responsive scenery
│   ├── About/                # About section
│   ├── Education/            # Education section
│   ├── Experience/           # Experience section
│   └── Projects/             # Projects section
├── utils/                    # Pure framework-light helpers
├── App.tsx                   # Context composition and application root
├── entry-client.tsx          # Browser entry
├── entry-server.tsx          # SSR entry
├── main.tsx                  # Vite bootstrap compatibility entry
└── main.css                  # Global tokens, resets, and print rules
```

The current application is small enough that a feature-sliced rewrite would
add indirection without useful isolation. Add a new top-level source category
only when at least two cohesive modules need it and its dependency boundary can
be stated clearly.

## Ownership rules

- `components/` must not import from `layout/`. Reusable UI cannot depend on a
  page section.
- `layout/` may compose components, hooks, constants, i18n, and utilities.
- `hooks/` may depend on constants, i18n, and utilities, but not on layout
  components.
- `utils/` contains pure helpers and must not import React components or
  browser entry modules.
- `constants/` may reference stable types, enums, and asset paths. Avoid
  putting mutable state or component-only class strings there.
- `i18n/` owns translated copy and locale behavior. Components must not embed
  alternate-language copies directly.
- An authored SVG belongs beside its illustration wrapper. Public downloads,
  metadata files, and externally addressed assets belong under `public/`.

## Component folder rules

Use a component directory when the component owns at least one sibling file,
such as CSS, tests, controls, types, or subcomponents. The public component is
the directory's main file. Add an `index.ts` only when it provides a deliberate
public boundary; do not create barrel files solely to shorten one import.

Keep one primary exported component per file. Private one-off helpers may stay
beside that component when extracting them would obscure ownership.

## Naming

- React components and their files: `PascalCase`.
- Hooks: `useCamelCase`.
- Utilities, constants modules, and scripts: `camelCase` or established
  lowercase tool conventions.
- CSS selectors follow the existing BEM-like component naming where custom CSS
  is needed; utility classes remain inline when they are local and readable.
- Tests end in `.test.ts` or `.spec.ts` and live under the matching test layer.

## Dependency direction

```text
entry points → App → layout → components
                     ↓          ↓
                   hooks/constants/i18n
                          ↓
                     enums/utils
```

Imports should follow this direction. A lower layer must not import a higher
layer to avoid cycles and hidden ownership.

## Agent discovery and documentation

Keep root discovery adapters short. Shared instructions belong only in
`docs/agents/AI_INSTRUCTIONS.md`; product decisions belong only in
`docs/product/SITE_SPECIFICATION.md`; structural decisions belong here.

When moving an authoritative file:

1. update every root discovery adapter;
2. update `README.md` and `docs/README.md`;
3. search the repository for the old path;
4. run formatting, lint, tests, and build;
5. update CI or scripts if they reference the path.

## Structural-change checklist

Before adding or moving files, confirm that the change improves ownership,
discoverability, or dependency isolation. Afterward run:

```bash
npx prettier --check .
npm run lint
npm test
npm run build
```

Run the relevant Playwright tests for any UI, path, or runtime change. Pure
documentation moves do not require screenshot regeneration.
