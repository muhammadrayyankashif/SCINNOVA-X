# Scinnova X component patterns

Updated 7 November 2026. Check these patterns before changing or extending the new components. Preserve the existing Doomsday palette and the Bebas Neue / Inter typography roles.

## Shared feature headings

Files: `index.html`, `about.html`, `css/style.css`.

| Property | Pattern |
| --- | --- |
| Background | `--obsidian-black` |
| Heading | `.feature-title`: Bebas Neue, weight 400, `clamp(3.25rem, 7vw, 6rem)`, line-height `0.95` |
| Heading emphasis | `.feature-title > span`: `--text-accent` |
| Eyebrow | `.feature-eyebrow`: Inter 600, `0.7rem`, line-height `1.6`, uppercase, tracking `0.14em`, `--metallic-silver` |
| Supporting copy | `.feature-heading-aside`: `0.95rem`, line-height `1.8`, `--metallic-silver` |
| Spacing | Heading margin `1.25rem`; section heading group margin `clamp(2.5rem, 5vw, 4rem)` |
| Text links | `.feature-text-link`: Inter 600, `0.8rem`, pale text, green underline, `0.75rem` icon gap; hover uses `--text-accent` |

Use these shared headings for the testimonial and contact sections. The homepage module programme has its own single-line heading. Existing hero and gallery treatments retain their own compositions.

## Homepage module programme

Files: `index.html`, `css/style.css`.

| Property | Pattern |
| --- | --- |
| Surface | Open on the existing `--obsidian-black` page background |
| Separators | One `1px solid var(--charcoal-grey)` horizontal rule above each entry; no enclosing frame |
| Radius / shadow | None |
| Spacing | Entry padding `clamp(2rem, 4vw, 3rem) 0.5rem`; logo-to-discipline gap `1.25rem` |
| Section heading | Bebas Neue 400, `clamp(3.25rem, 8vw, 7rem)`, line-height `0.95`; pale text with accent emphasis |
| Module logo | `.home-module-emblem`: Height `4.5rem`, centered wordmark/emblem |
| Discipline | `.home-module-discipline`: Inter `0.8rem`, line-height `1.5`, silver text |
| Hover / focus | Accent discipline and subtle emblem lift on hover/focus; global keyboard focus outline remains visible |

Each entry is one native link to its module detail. Logos are standalone module marks with natural proportions, explicit dimensions, and lazy loading. Keep the programme free of filled card surfaces, gradients, numerical badges, taglines, and repeated action captions. Testimonial and Contact sections retain their existing patterns independently.

## Editorial testimonials

Files: `index.html`, `css/style.css`. Updated 7 November 2026.

| Property | Pattern |
| --- | --- |
| Surface | Open on `--obsidian-black`; no panels, gradients, shadows, or numbered labels |
| Separators | Supporting quotations start with a `1px solid var(--charcoal-grey)` top rule and `2rem` top padding |
| Lead quote | Inter `clamp(1.25rem, 2.1vw, 1.8rem)`, line-height `1.65`, pale text |
| Supporting quotes | Inter `clamp(1rem, 1.3vw, 1.125rem)`, line-height `1.85`, pale text |
| Portrait | Rectangular, natural proportions for the lead; square crop in supporting attributions; no decorative frame |
| Speaker name | Inter 600, `0.9rem`, line-height `1.5`, pale text |
| Speaker role | Inter `0.75rem`, line-height `1.6`, silver text, `0.35rem` top margin |
| Spacing | Attribution margin `2rem` (`1.5rem` for the lead); quotation gap `clamp(2.5rem, 5vw, 4.5rem)` |

Use semantic figure / blockquote / figcaption markup. Preserve full quotations, names, roles, and portraits. Lead with one larger quotation beside its portrait; supporting quotations sit below. Stack into a natural reading order on phones.

## Homepage event details

Files: `index.html`, `css/style.css`. Updated 7 November 2026.

| Property | Pattern |
| --- | --- |
| Surface / separators | Open obsidian background; charcoal section rules and fact-row top rules |
| Title | Shared `.feature-title` and accent emphasis |
| Intro copy | Inter `--text-reading`, line-height `1.8`, silver text; `2rem` top margin |
| Fact labels | Inter `0.75rem`, silver text |
| Fact values | Inter `clamp(1.15rem, 2vw, 1.5rem)`, line-height `1.5`, pale text |
| Address | Inter `0.9rem`, line-height `1.8`, silver text, normal font style |
| Spacing / links | Fact rows use `1.5rem` block padding; shared `.feature-text-link` for About and directions |

Use a definition list and machine-readable dates. Publish confirmed event information only. Keep modules immediately after the hero; event details precede testimonials and archives.

## Motion

Files: `js/main.js`, `css/style.css`. Updated 7 November 2026.

Use `--motion-fast` (`200ms`) for hover feedback and `--motion-reveal` (`450ms`) for reveals and image transitions. Text reveals travel at most `16px`. Responsive parallax belongs to GSAP match-media contexts so it reverts at its breakpoint. Essential content remains visible without animation libraries; reduced-motion and data-saving preferences disable optional animation.

## Contact panels

Files: `about.html`, `css/style.css`.

| Property | Pattern |
| --- | --- |
| Surface | `.contact-panel`: `--panel-surface`; email panel adds restrained green corner light |
| Border / radius | `1px solid var(--panel-border)`; square corners |
| Padding | `clamp(1.5rem, 3vw, 2.5rem)` |
| Panel title | Bebas Neue 400, `clamp(2rem, 3vw, 2.75rem)`, line-height `1.1` |
| Email | Inter 600, `clamp(1.05rem, 2vw, 1.6rem)`, accent text, wrapping permitted |
| Supporting copy | Inter `0.875rem`, line-height `1.8`, silver text |
| Social rows | Fine top border; `1rem` block padding; pale name and silver handle; accent hover |
| Focus | Global `--focus-ring`; native email, profile, and section links |

Use correctly labeled public contact channels. The general college email is not labeled as a dedicated event-registration inbox. Contact is a focusable native anchor destination so keyboard navigation and URL fragments work without JavaScript interception.

Contact Instagram order: Scinnova (`@scinnova_`), Cedar College (`@cedarcollege`), CORDS (`@cords.cedar`), then The Juno Circle (`@juno.cedar`).
