# Documentation

Repository documentation is grouped by responsibility so contributors and
automation can find the authoritative source without scanning the project
root.

## Product

- [`product/SITE_SPECIFICATION.md`](product/SITE_SPECIFICATION.md) — product
  behavior, responsive contracts, visual invariants, accessibility, and
  acceptance criteria.

## Architecture

- [`architecture/PROJECT_STRUCTURE.md`](architecture/PROJECT_STRUCTURE.md) —
  directory ownership, dependency direction, file-placement rules, and the
  process for structural changes.

## Agents

- [`agents/AI_INSTRUCTIONS.md`](agents/AI_INSTRUCTIONS.md) — shared workflow
  rules for Codex, Claude, Ollama-based agents, and other automation.

Root-level `AGENTS.md`, `CLAUDE.md`, and `OLLAMA.md` are intentionally small
discovery adapters. Canonical instructions live under `docs/` and must not be
duplicated in those adapters.
