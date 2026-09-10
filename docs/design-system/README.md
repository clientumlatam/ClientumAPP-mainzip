# Clientum Clarity

**Extracted design system for ClientumCRM**  
Version: 1.0 · 2026-09-10 · Status: ready for approval

Clientum Clarity is the visual language already present across ClientumCRM,
organized into a portable system so new interfaces can feel like the same
product. It is designed for Argentine and Latin American SMB teams who need to
move from conversation to commercial action quickly.

This document is a reference and authoring contract. It does not change the
current application screens.

## 1. Product character

Clientum should feel:

- **Clear:** the next useful action is easy to identify.
- **Commercial:** data supports a decision, not decoration.
- **Local:** Spanish es-AR, local operational context, and explicit currency.
- **Confident:** strong contrast, stable terminology, and restrained motion.
- **Approachable:** professional without feeling like an infrastructure console.

### Core rule: the action line

Every screen should answer, in order:

1. What is happening?
2. What needs attention?
3. What can I do next?

Do not give equal visual weight to every action. Use one primary action, a
small number of secondary actions, and move low-frequency maintenance actions
into a menu or account area.

## 2. Brand identity

### Logo

The Clientum mark is a deep-navy rounded square containing a white diamond
network of four nodes. The canonical mark is implemented by
`src/components/common/ClientumLogo.tsx`.

- Use the mark at compact sizes beside the `Clientum CRM` wordmark.
- Preserve the rounded-square silhouette and four-node geometry.
- Do not recolor the mark with semantic status colors.
- Use a teal or green status dot only when showing a live workspace state.

### Voice

Use direct, useful Spanish:

- “Ver pipeline”, not “Explorar ecosistema”.
- “Configuración General”, not “Centro de control avanzado”.
- “Mensajes Internos”, not “Comunicaciones colaborativas”.

Avoid unexplained jargon, hype, and decorative emoji in product UI.

## 3. Color tokens

The palette is light-first with a supported dark theme. The complete token
reference is in `tokens.css`.

### Light theme

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Canvas | `--bg-canvas` | `#F8FAFC` | App background and page breathing room |
| Surface | `--bg-surface` | `#FFFFFF` | Primary panels and navigation |
| Muted surface | `--bg-muted` | `#F1F5F9` | Inputs, quiet rows, secondary regions |
| Accent surface | `--bg-accent-subtle` | `#EFF6FF` | Selected/related state background |
| Primary text | `--text-primary` | `#0F172A` | Headings and essential data |
| Secondary text | `--text-secondary` | `#334155` | Supporting copy |
| Muted text | `--text-muted` | `#475569` | Labels and lower-priority metadata |
| Brand | `--color-primary` | `#2563EB` | Primary actions and active navigation |
| Brand hover | `--color-primary-hover` | `#1D4ED8` | Hover and pressed emphasis |
| Brand text | `--color-primary-text` | `#1E40AF` | Text on pale blue surfaces |
| Success | `--color-success` | `#10B981` | Connected, complete, positive |
| Warning | `--color-warning` | `#F59E0B` | Attention and pending work |
| Danger | `--color-danger` | `#EF4444` | Destructive and blocking states |

### Dark theme

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `--bg-canvas` | `#090D16` |
| Surface | `--bg-surface` | `#111827` |
| Elevated surface | `--bg-surface-elevated` | `#1E293B` |
| Primary text | `--text-primary` | `#F8FAFC` |
| Secondary text | `--text-secondary` | `#CBD5E1` |
| Muted text | `--text-muted` | `#94A3B8` |
| Brand | `--color-primary` | `#3B82F6` |
| Brand hover | `--color-primary-hover` | `#60A5FA` |
| Success | `--color-success` | `#34D399` |
| Warning | `--color-warning` | `#FBBF24` |
| Danger | `--color-danger` | `#F87171` |

### Color rules

- Blue is reserved for action, active location, and links.
- Green communicates a real positive or connected state; it is not a second
  primary brand color.
- Amber signals attention, not generic decoration.
- Red is reserved for destructive, invalid, or blocked states.
- Do not use color alone to communicate status. Pair it with text, an icon,
  or a shape.
- Avoid adding gradients to information-dense workspace surfaces. Existing
  branded gradients may remain in identity or promotional moments.

## 4. Typography

### Families

- **Primary:** `Plus Jakarta Sans`, with system fallbacks.
- **Data and code:** `JetBrains Mono`, with a monospace fallback.

The font links are currently declared in `index.html`. Future isolated
artifacts should load them locally to their artifact rather than modifying the
global application entry.

### Hierarchy

| Level | Suggested size | Weight | Use |
| --- | --- | --- | --- |
| Display | 48–60 px | 800 | Public hero only |
| Page title | 20–24 px | 700–800 | Current workspace or page |
| Section title | 16–20 px | 700 | Grouped content |
| Body | 14–16 px | 400–500 | Explanatory content |
| UI label | 12–14 px | 600–700 | Buttons, navigation, metadata |
| Compact label | 10–11 px | 600–700 | Badges and dense dashboard chrome |
| Data | 14–22 px | 500–700 mono | Amounts, counts, codes |

Use sentence case for most labels. Uppercase is reserved for compact section
eyebrows and should include letter spacing.

## 5. Layout tokens

### Spacing

The base unit is 4 px:

| Token | Value | Typical use |
| --- | --- | --- |
| `--space-0` | 0 | Reset |
| `--space-1` | 4 px | Icon gaps, micro spacing |
| `--space-2` | 8 px | Compact controls |
| `--space-3` | 12 px | Rows and small groups |
| `--space-4` | 16 px | Standard component padding |
| `--space-5` | 20 px | Card and header separation |
| `--space-6` | 24 px | Section padding |
| `--space-8` | 32 px | Major grouping |
| `--space-10` | 40 px | Public section rhythm |
| `--space-12` | 48 px | Hero and page separation |
| `--space-16` | 64 px | Large public breathing room |

### Shape

- Small control: `--radius-sm` / 6 px.
- Standard control: `--radius-md` / 8 px.
- Card and button: `--radius-lg` / 12 px.
- Feature surface: `--radius-xl` / 16 px.
- Status pill: `--radius-full`.

Use one radius family within a component group. Avoid mixing sharp tables,
highly rounded cards, and pill-shaped buttons without a hierarchy reason.

### Elevation

- `--shadow-card`: quiet separation for standard cards.
- `--shadow-elevated`: dropdowns, active floating surfaces, and raised panels.
- `--shadow-popover`: modal, command palette, and high-priority overlays.

Borders and spacing should establish hierarchy before shadows do.

## 6. Component grammar

### Buttons

- **Primary:** blue fill, white text, clear verb.
- **Secondary:** white or surface fill, default border, dark text.
- **Quiet:** transparent or muted surface for low-priority actions.
- **Danger:** use red only when the action is destructive or irreversible.
- Keep icon-only buttons for familiar actions and always provide an
  `aria-label` plus a tooltip.
- Preserve visible focus: 2 px focus ring using `--border-focus`.

### Navigation

- Sidebar sections are maps of work, not a catalog of every module.
- The active row uses `--sidebar-active-bg` and inverse text.
- Hover should use the subtle accent surface, not a competing saturated color.
- Nested items use indentation and a single visible hierarchy line.
- Section collapse must work by keyboard and keep the active path visible.

### Cards and panels

- Use a quiet canvas, white/light surface, thin border, and concise header.
- A panel needs a clear job: summary, decision, list, or action.
- Do not put multiple unrelated calls to action in one panel.
- Empty states explain what is missing and give the next useful action.

### Data views

- Use mono only for values that benefit from alignment or scanning.
- Keep table headers visually quieter than the selected row or primary metric.
- Use semantic badges sparingly; a badge must communicate state, capability, or
  count.
- In Kanban, stage color is an accent line/dot before it becomes a full card
  background.

### Overlays

- Drawers and modals use `--shadow-popover`, a strong title, and an explicit
  close action.
- Backdrops should protect focus without making the underlying context
  unreadable.
- Escape closes transient UI where it is safe to do so.

## 7. Responsive behavior

- Public content is fluid and prioritizes the primary CTA on narrow screens.
- Private workspaces keep the sidebar accessible through the mobile trigger.
- On narrow screens, allow horizontal scrolling for Kanban data rather than
  shrinking cards below legibility.
- Do not make a dense dashboard depend on hover to reveal essential meaning.
- Keep touch targets comfortably tappable, especially icon-only controls.

## 8. Accessibility contract

- Preserve the existing high-contrast intent of the tokens; primary text and
  focus states should remain readable in both themes.
- Every interactive control needs a visible or programmatic name.
- Never communicate status with color alone.
- Use real buttons for actions and headings in a meaningful order.
- Support keyboard navigation through sections, menus, tables, drawers, and
  dialogs.
- Respect reduced-motion preferences for decorative transitions.
- Keep Spanish labels explicit enough for screen-reader output.

## 9. Do and do not

### Do

- Start with the decision and the next action.
- Use `Clientum Clarity` tokens instead of raw hex values.
- Use the current logo and established terminology.
- Keep business data easy to scan.
- Validate the empty, loading, error, and success states.

### Do not

- Add a new visual language beside Clientum Clarity.
- Use emoji as interface icons or status indicators.
- Treat every module as equally important.
- Turn every state into a saturated badge.
- Hide actions behind unlabeled icon buttons.
- Apply this system to production screens without explicit approval.

## 10. Approval boundary

This design system is extracted and ready for use in future mockups or screen
updates. The current application remains unchanged by this document.

Before applying it to any existing screen, confirm the target screen and scope
with the user.