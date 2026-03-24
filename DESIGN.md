# Design System Specification: The Monolithic Kernel

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Architect"**
This design system moves beyond the "app" aesthetic into the realm of an Artificial Intelligence Operating System. It rejects the soft, consumer-grade bubbles of modern web design in favor of **Precise Brutalism**. 

We do not design "pages"; we design "environments." The goal is to create a high-density, high-utility interface that feels like a physical piece of hardware. By utilizing intentional asymmetry, terminal-inspired syntax, and deep tonal layering, we move away from "templates" toward a signature editorial experience that honors the power of the command line while embracing the sophistication of modern AI.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in the "Void"—a deep, immersive dark mode that prioritizes ocular comfort for long-duration technical work.

### Core Palette
- **Background (`#131313`)**: The absolute foundation.
- **Primary / Terminal Green (`#00ff41`)**: High-visibility execution and "Active" state.
- **Secondary / Cyber Blue (`#14d1ff`)**: Information architecture and systemic data.
- **Tertiary / Atomic Orange (`#ffb77d`)**: Critical interrupts, warnings, and manual overrides.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for layout sectioning. In this system, boundaries are defined by **Background Color Shifts**. 
- To separate a sidebar from a main stage, shift the sidebar to `surface_container_lowest` (#0e0e0e) against a `surface` (#131313) background.
- This creates a seamless, "milled from a single block" feel rather than a "pasted on" look.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, machined plates.
1. **Base Layer:** `surface` (#131313).
2. **Standard Modules:** `surface_container` (#201f1f).
3. **Elevated Floating Panels:** `surface_bright` (#3a3939) with a 15% opacity `surface_tint`.

### The "Glass & Gradient" Rule
For overlays and modal dialogs, use **Glassmorphism**. Apply a backdrop-blur (12px–20px) to a semi-transparent `surface_container_highest`. To give CTAs "soul," use a subtle linear gradient (45deg) from `primary_fixed` to `primary_container`. This prevents the "flat" look and suggests a glowing, energized state.

---

## 3. Typography: Technical Authority
We pair the human-centric clarity of **Inter** with the structural precision of **Space Grotesk** and monospace foundations.

| Level | Token | Font | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Asymmetric, tight tracking. |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | Bold, technical, lowercase-optimized. |
| **Title** | `title-md` | Inter | 1.125rem | Semi-bold for high-density headers. |
| **Body** | `body-md` | Inter | 0.875rem | High legibility for documentation. |
| **Label** | `label-sm` | Inter | 0.6875rem | All-caps for status indicators. |

*Note: All code snippets, technical metadata, and system outputs must use a monospace font (JetBrains Mono/Fira Code) at `body-sm` scale.*

---

## 4. Elevation & Depth: Tonal Layering
Depth is not a shadow; it is a change in state.

*   **The Layering Principle:** Avoid drop shadows for standard containers. Use the `surface_container` scale. A `surface_container_lowest` card sitting on a `surface_container_high` background creates a "recessed" effect that feels more integrated than a shadow.
*   **Ambient Shadows:** If a floating element (like a context menu) requires separation, use an extra-diffused shadow: `offset: 0, 12px; blur: 40px; color: rgba(0,0,0, 0.4)`.
*   **The "Ghost Border" Fallback:** Where accessibility requires a border, use the `outline_variant` (#3b4b37) at **15% opacity**. It should be felt, not seen.
*   **Active States (Glow):** Instead of a thick border, active components should emit a subtle outer glow using `primary_container` with a 4px blur at 30% opacity.

---

## 5. Components: The TUI Aesthetic
All components are strictly **0px (Sharp)** or **2px (Subtle)** roundedness.

*   **Buttons:**
    *   *Primary:* Solid `primary_container` (#00ff41) background, `on_primary` text. Use sharp 0px corners.
    *   *Secondary:* `outline` border (Ghost Style) with a monospace label.
    *   *States:* On hover, add a 10% white overlay to suggest "powering up."
*   **Terminal Progress Bars:** Use a block-segment style. Instead of a smooth fill, use 4px vertical blocks with 1px gaps using the `primary_fixed` color.
*   **Input Fields:** Ghost style. No background, only a bottom-border using `outline_variant`. On focus, the bottom border transitions to `secondary_container` with a subtle glow.
*   **Cards & Lists:** **Strictly forbid dividers.** Use vertical white space (Token `8` or `12`) to separate items. Information density should be high; use `label-sm` for metadata labels to save space.
*   **Data Grids:** Use a "Matrix" layout. Headers should be `label-md` in `on_surface_variant`. Cells should use monospace for numerical data to ensure column alignment.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts. A heavy left-hand column balanced by a light, technical right-hand sidebar creates an editorial feel.
*   **Do** use the `primary` green sparingly. It is a "laser," not a "paint." Use it for success, active cursors, and execution.
*   **Do** embrace verticality. Use the `Spacing Scale` (e.g., `24` or `20`) to create dramatic breaks between major system sections.

### Don't
*   **Don't** use standard "Web 2.0" shadows. If it looks like a card floating on a website, it’s wrong. It should look like a module in an OS.
*   **Don't** use 100% opacity borders. They break the immersion of the dark "Void."
*   **Don't** use rounded corners above 2px. Anything higher than 4px dilutes the "Precise & Powerful" brand personality.
*   **Don't** use centered text for technical data. Always left-align to maintain the "Terminal" reading rhythm.