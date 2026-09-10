# ClientumCRM design documentation rules

This directory contains the source of truth for ClientumCRM's extracted design
system, **Clientum Clarity**.

## Before authoring a new interface

1. Read `docs/design-system/README.md`.
2. Use the semantic tokens from `docs/design-system/tokens.css` as the visual
   vocabulary. Do not invent a second palette or spacing scale.
3. Preserve the product language: Spanish (es-AR) by default, clear commercial
   terminology, and explicit ARS/USD context for monetary values.
4. Keep blue for primary actions, current navigation, and links. Use green for
   positive/connected states, amber for attention, and red only for destructive
   or blocking states.
5. Prefer a clear action hierarchy over adding more panels, badges, or
   decorative gradients.
6. Follow the interaction and accessibility rules in the system guide:
   visible focus, keyboard access, readable contrast, and meaningful labels for
   icon-only controls.
7. Do not change production screens just by reading this file. A screen change
   requires an explicit user request to apply the design system.

## Source relationship

The system was extracted from the current production vocabulary in
`src/index.css`, `index.html`, `src/components/common/ClientumLogo.tsx`, and
the public/private navigation components. The files in this directory are a
portable reference for future artifacts and mockups; they are not imported by
the production app until the user explicitly approves application.