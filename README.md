# Resume website

Responsive resume website built with React, TypeScript, Tailwind CSS, and Vite.

## Documentation

- [Documentation index](docs/README.md)
- [Product and visual specification](docs/product/SITE_SPECIFICATION.md)
- [Repository structure](docs/architecture/PROJECT_STRUCTURE.md)
- [Shared AI-agent instructions](docs/agents/AI_INSTRUCTIONS.md)

AI tools should enter through the root discovery file intended for them:
`AGENTS.md`, `CLAUDE.md`, or `OLLAMA.md`.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Verify

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

## Deploy (GitHub Pages)

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push to the `main` branch.
2. In GitHub: Settings → Pages → set "Build and deployment" to "GitHub Actions".
