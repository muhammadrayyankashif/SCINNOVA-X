# SCINNOVA X component patterns

Updated 10 November 2026 after user review. The retained page layouts live in `css/style.css`; approved component refinements live in `css/refinements.css`, loaded after it. The lime accent is global again. Preserve existing event facts, links, logos, and complete editorial content. Keep the retained hero, navigation, gallery, and Modules detail layouts. The redesigned FAQ has been restored by explicit user request.

## Approved component visual language

| Property | Pattern |
| --- | --- |
| Approved section backgrounds | `--obsidian-black: #080b09`; the global page keeps its original palette |
| Secondary surface | `--panel-surface: #101711` |
| Rules and borders | `1px solid var(--panel-border)` (`#2b392e`) |
| Primary text | `--pale-white: #edf1e8` |
| Supporting text | `--metallic-silver: #a4afa7` |
| Signal accent | Global `--text-accent: #bbef79`; primary actions, headings, links, active navigation, metadata, keyboard focus, and text selection |
| Legacy accent alias | Global `--emerald: var(--text-accent)`; keeps older components lime too |
| Headings | Bebas Neue 400, Impact / Arial Narrow fallbacks; uppercase, tight leading |
| Body | Inter / system-ui, normal weight, generous line-height |
| Metadata | `--font-tech`: system monospace; uppercase, `0.04em`–`0.13em` tracking |
| Radius / shadows | Square surfaces and buttons; no panel shadows. Circles reserved for the scroll cue, status dot, and diagrams |
| Focus | `--focus-ring: 2px solid var(--text-accent)` with visible offset |
| Motion | `--motion-fast: 200ms`, `--motion-reveal: 450ms`, `--motion-ease`; reduced motion and data-saving disable optional movement |

Lime is the shared accent throughout all three pages; define it once in `:root` and inherit it in refined components. Text selection uses lime with dark text. Refined surface colors, spacing, and monospace metadata stay scoped to homepage modules, testimonials, contact, directorate, FAQ, and footer. Keep the retained layouts and body typography elsewhere. Continue to use official brand and module artwork at its natural aspect ratio.

### Registration actions

Files: all three HTML pages, `css/refinements.css`.

| Property | Pattern |
| --- | --- |
| Primary actions | `.nav-register-btn`, `.hero-register-btn`, `.cta-btn`: solid `#bbef79`, dark text, `1px` accent border |
| Radius / shadow | None; clear legacy sheen, glow, and backdrop effects |
| Text | System monospace, `0.65rem`–`0.72rem`, weight 600, `0.04em` tracking |
| Spacing | Main action `0.9rem 1.4rem`; diagonal arrow on navigation and footer actions |
| Hover / keyboard focus | Dark surface, lime text and border, subtle lime glow, `translateY(-2px)`; the arrow moves diagonally |

Preserve the original navigation layout and mobile dialog. The hero registration button retains its original mobile-only placement with the approved button styling. Keep all original registration destinations. Specify foreground and background together for hover, focus, and active states so legacy white text cannot reappear. Active press keeps dark background / lime text and returns to baseline.

### Restored global compositions

The homepage hero and countdown, masthead, About introduction, archive gallery, and Modules detail page retain their earlier layouts, now with the shared lime accent. The numbered redesigned FAQ uses `css/refinements.css`. The scrolling ribbon, reading progress bar, and their JavaScript have been removed. Keep the original animation preferences and native interactions.

### Programme specimen tiles

Files: `index.html`, `css/refinements.css`, `js/main.js`.

| Property | Pattern |
| --- | --- |
| Homepage surface | `.home-module-link`: obsidian; `1px` panel-rule grid |
| Radius / shadow | None |
| Metadata | Muted green monospace module indices; quiet diagonal arrow on homepage |
| Logos | Centered, natural aspect ratios; no artwork recoloring |
| Discipline text | Muted Inter `0.75rem` |
| Spacing | `4.5rem 2rem 2rem` |
| Hover / focus | Slightly lighter surface; green arrow and discipline; homepage logo rises `4px` |
| Decorative accent | Nine unique inline SVG scientific drawings, `currentColor`, opacity `0.2` (`0.34` on interaction); subtle pointer-positioned green illumination |

Homepage entries stay native links to their corresponding detail headings. Maintain nine modules. The heading aside contains only the Explore all modules link; the “Nine disciplines. Infinite possibilities.” tagline is removed. Tiles move from three columns to two; the final module spans the row at two columns. Each background illustration belongs to its discipline: cryptographic maze, molecular bonds, mathematical graph, atomic waves, DNA, planetary orbits, circuitry, neurons, and code. Drawings are decorative and hidden from assistive technology. Pointer illumination is mouse-only and respects reduced motion / data saving. Each illustration also has its own subtle motion on mouse hover or visible keyboard focus; pause it on pointer leave, blur, leaving the viewport, or hiding the tab. Keep all nine logos and labels steady apart from the existing small hover lift. The Modules detail page keeps its original open programme rows.

### Editorial testimonials

Files: `index.html`, `css/refinements.css`.

| Property | Pattern |
| --- | --- |
| Section | Panel surface and thin top / bottom rules |
| Quote surface | Open; no filled cards or enclosing frames |
| Border | Thin panel rule above each quote |
| Accent | Oversized green opening quotation mark |
| Quote type | Pale Inter, `0.95rem`–`1.1rem`, `1.9` leading |
| Portrait | Rectangular crop, permanently colored (`filter: none`); no decorative frame |
| Attribution | Pale Inter 600 name; small muted role |
| Spacing | `3.3rem` top padding; `2rem` attribution margin |

Preserve every complete quotation, name, role, and portrait. Use `figure`, `blockquote`, and `figcaption`; retain the existing reading order. Attributions align beneath each row; phone layout stacks the quotations.

### About image caption and directorate

Files: `about.html`, `css/refinements.css`.

| Property | Pattern |
| --- | --- |
| Editorial opening | Original About title, copy, layout, and image treatment |
| Caption | Solid green rectangle, dark monospace metadata |
| Directorate surface | Shared panel surface; section rules |
| Portraits | Large square crops, permanently colored (`filter: none`), square corners and a 1:1 aspect ratio on every viewport, no shadow, green bottom rule |
| Hover | Brighten the bottom rule; portraits stay colored without scaling |
| Attribution | Inter 600, normal casing; green monospace role; muted quotation |

Keep all director names, roles, and quotations. Desktop order: Dr Husham Arshad, Director Roque Martin D.Mello, Nabeel Nasir Sheikh. At 768px and below, stack the Director first, followed by the two Co-Directors; the Director remains first in DOM order. Keep the green `EST. 2017` / `KARACHI, PK` image caption visible on mobile as well. The Get in touch link uses the restored monospace treatment, lime text and underline, and an arrow that moves slightly on hover or focus. Its native `#contact` destination remains intact.

### Archive gallery

Files: `index.html`, `js/main.js`, `css/style.css`.

Restored to the original photographic columns, frames, responsive rules, and GSAP match-media behavior. No redesign-specific crops, desaturation, or archive eyebrow remain.

### Contact directory

Files: all three HTML pages, `css/refinements.css`.

| Property | Pattern |
| --- | --- |
| Section | Obsidian, fine top rule, restrained green atmosphere |
| Heading | Shared large condensed pale / green title |
| Copy | Muted Inter `0.9rem`, `1.9` leading |
| Facts | Open rows with panel-rule dividers |
| Labels | Small uppercase muted monospace |
| Links | Pale Inter, green diagonal arrow; green on hover |
| Radius / shadow | None |

Keep native email, phone, Instagram, and map links. Contact destinations remain focusable via URL fragments. Preserve `reg.scinnova@cedar.edu.pk`, `+92 300 2526200`, `@scinnova_`, and the Cedar College DHA venue details.

### Closing invitation and footer

Files: all three HTML pages, `css/refinements.css`.

Use an oversized balanced condensed CTA, the shared solid green registration action, original host and society logos, and a fine ruled monospace sign-off. Society logos stay muted until hover. Footer links retain their existing destinations. New-tab links use `noopener noreferrer`. The back-to-top link targets each page’s focusable main landmark. Footer sign-off text is exactly `SCINNOVA X` and `8–10 JANUARY 2027`; do not include `THE TENTH EDITION` or `/ KARACHI, PK` in the footer. The About image caption retains its location text.

### Numbered FAQ

Files: `about.html`, `css/refinements.css`, `js/main.js`.
Last updated: 10 November 2026.

| Property | Pattern |
| --- | --- |
| Background | Obsidian, open rows |
| Borders | Thin panel-rule separators |
| Question | Inter 400, normal tracking, `clamp(0.9rem, 1.4vw, 1.1rem)`, `1.6` leading |
| Index | Uppercase-style monospace decimal index, lime |
| Toggle | Square outlined plus, lime; rotates into a close mark for an expanded answer |
| Answer | Muted Inter `0.9rem`, `1.9` leading |
| Spacing | Row `1.5rem` block padding; answer inset aligns with the question |
| Intro | `BEFORE YOU TAKE THE LEAP` metadata above the existing title |
| Hover | Question turns lime; no filled card or heavy shadow |

Keep every original question, complete answer, ID, and ARIA relationship. Existing accordion behavior opens one answer at a time. Answers stay readable without JavaScript; reduced motion removes optional transitions.

### Discipline-specific illustration motion

Files: `index.html`, `css/refinements.css`, `js/main.js`.
Last updated: 10 November 2026.

| Module | Illustration behavior |
| --- | --- |
| Arcanum / Mystery | Two dashed cipher rings turn slowly in opposite directions (18s / 24s) |
| Illuminatio / Chemistry | Molecular nodes react in a staggered, gentle expansion (3.8s) |
| Ptolemy’s Puzzle / Mathematics | A bright trace and a tiny point follow the existing quadratic curve (5.6s) |
| Planck’s Paradox / Physics | A traveling wave accompanies a small atomic precession (4s / 7s) |
| Asclepius / Biology | The DNA ladder shifts slightly while bonds illuminate in sequence (6s / 3.8s) |
| Redshift / Astronomy | Planets orbit the existing central point at different speeds; stars softly brighten (18s / 30s / 5.5s) |
| Automaton / Robotics | Small signal packets travel toward and away from the chip, with a quiet core pulse (3.4s) |
| Freud’s Forsit / Psychology | A central neuron pulse spreads along three staggered branches (3.8s) |
| QWERTY / Computer Science | Short code lines draw in sequence alongside a restrained terminal caret (4.6s / 2.3s) |

**Pattern notes:**
- Animate only SVG parts marked `data-motion`; preserve the complete static artwork and native module links.
- Keep lime `currentColor`, thin strokes, the existing tile opacity, spacing, borders, and focus treatment. Animation overlays use `.module-signal` and stay hidden when motion is disabled.
- SVG transforms use a consistent reference box; planetary orbits use the artwork’s `(276, 160)` center. The graph point is sampled from the same quadratic curve as the drawn line.
- CSS animations start paused. `initModuleHighlights()` enables `.module-motion-active` only for an intersecting card under a mouse pointer or visible keyboard focus, while the document is visible.
- `IntersectionObserver` pauses offscreen cards; fall back to interaction-only activation when unavailable. Keep touch navigation immediate, without a first tap to start animation.
- Reduced motion and data saving disable the animation gate and restore static drawings. Content and links remain usable without JavaScript or optional motion libraries.
- Do not add perpetual JavaScript animation loops, change module logos, or animate the surrounding section / page layout.
