# AI contributor instructions

These instructions apply to every coding agent working in this repository,
including Codex, Claude, and locally hosted/Ollama-based agents.

## Required startup reading

Before inspecting or changing code, read this file and then read
`docs/product/SITE_SPECIFICATION.md` in full. Read
`docs/architecture/PROJECT_STRUCTURE.md` before adding, moving, or renaming
files. The specification is the source of truth for layout, responsive
behavior, visual composition, accessibility, and verification. Do not infer
intended behavior from a broken screenshot or from the current implementation
when it conflicts with the specification.

## Working rules

1. Preserve unrelated user changes. Check the working tree before editing and
   never discard modifications you did not create.
2. Treat the 1025px boundary as coordinated behavior across TypeScript media
   queries, CSS, Tailwind classes, tests, and documentation.
3. For scenery or header work, read sections 4, 6, and 21 of the specification
   before editing. Mobile-header and open-menu parity is a hard invariant.
4. Do not duplicate, mirror, rasterize, or replace the authored sky, comet,
   nebula, mountain, logo, or UFO assets to hide a positioning bug.
5. Do not approve a visual fix from a single viewport. At minimum verify
   390×844, 844×390, 768×1024, 1024×768, 1025×768, and 1440×900 when the affected
   breakpoint or scenery can be visible there.
6. Compare closed and open mobile-menu states. The logo, sky crop, comet, and
   UFO must not jump, shift, mirror, duplicate, or change stacking order.
7. Prefer automated geometry/style assertions plus screenshots. Disable
   decorative motion when comparing element positions.
8. Run the relevant tests and the validation commands listed in the
   specification before declaring the task complete. Report any command that
   could not be run.
9. When behavior changes intentionally, update the specification in the same
   change so future agents do not restore obsolete behavior.

## Current mobile-header invariants

- The header is 96px tall below 1025px.
- The sky scene is viewport-wide and clipped by its header owner.
- Only the authored half of `night-sky.svg` is visible; the mirrored extension
  must not produce a second or reversed comet.
- Foreground content is above the scenery.
- The closed header and open menu header have matching viewport-relative
  geometry and no landscape-only top offset.
- There is exactly one mobile UFO. It remains in the upper header when the menu
  opens; the lower menu scene contains mountains only.
- The dialog and scenery create no horizontal overflow.

If a requested change conflicts with these rules, follow the user's explicit
request and update both this file and the site specification to record the new
decision.
