# Ollama agent instructions

The Ollama runner or agent wrapper must load this file at the beginning of each
repository task. Before changing code, read
`docs/agents/AI_INSTRUCTIONS.md` and
`docs/product/SITE_SPECIFICATION.md` completely; both are mandatory repository
instructions.

Use `docs/agents/AI_INSTRUCTIONS.md` as the shared cross-agent workflow,
`docs/product/SITE_SPECIFICATION.md` as the product and visual source of truth,
and `docs/architecture/PROJECT_STRUCTURE.md` for repository ownership rules.
If the runner does not discover repository instruction files automatically,
include this file in its system prompt or startup context.
