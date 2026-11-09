# SCINNOVA X component patterns

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

Files: `index.html`, `css/style.css`. Updated 9 November 2026.

| Property | Pattern |
| --- | --- |
| Surface | Open on `--obsidian-black`; no panels, gradients, shadows, or numbered labels |
| Separators | Each quotation starts with a `1px solid var(--charcoal-grey)` top rule and `2rem` top padding |
| Quotes | Inter `clamp(1rem, 1.3vw, 1.125rem)`, line-height `1.85`, pale text |
| Portrait | Matching square crops in each attribution; `object-fit: cover`; no decorative frame |
| Speaker name | Inter 600, `0.9rem`, line-height `1.5`, pale text |
| Speaker role | Inter `0.75rem`, line-height `1.6`, silver text, `0.35rem` top margin |
| Spacing | Attribution margin `2rem`; quotation gap `clamp(2.5rem, 5vw, 4.5rem)` |

Use semantic figure / blockquote / figcaption markup. Preserve full quotations, names, roles, and portraits. All four testimonials share the same treatment: Sabieh Anwar and Sajjad Haider Zaidi in the first row, Athar Osama and Ruhab Iqbal in the second. Stack into that reading order on phones. Keep attributions aligned at the bottom of each row.

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

The gallery has no visible motion control. Honor a previously saved gallery opt-in (`scinnova-gallery-motion=enabled`) when reduced motion is active; other effects continue to respect the browser preference. Data-saving mode and the gallery's phone breakpoint still disable parallax.

## Contact section

Files: `index.html`, `about.html`, `modules.html`, `css/style.css`.

| Property | Pattern |
| --- | --- |
| Layout | `.contact-layout`: 2-column split grid (`minmax(0, 1.4fr) minmax(0, 1fr)`), 1-column on mobile |
| Section boundary | Top and bottom `1px solid var(--charcoal-grey)` borders |
| Left introduction | Eyebrow, Bebas Neue title `LET’S CONNECT.`, metallic silver narrative copy |
| Right facts list | `.contact-facts`: subtle `1px solid var(--charcoal-grey)` row dividers, uppercase metadata labels (`<dt>`) |
| Channel values | Inter 600 / Bebas Neue, accent green links with diagonal indicator arrows |
| Focus | Global `--focus-ring`; native email, phone, Instagram, and maps directions links |

Use correctly labeled public contact channels: registration email (`reg.scinnova@cedar.edu.pk`), phone helpline (`+92 300 2526200`), official Instagram (`@scinnova_`), and host campus venue details (Cedar College DHA Campus). Contact is a focusable native anchor destination so keyboard navigation and URL fragments work without JavaScript interception.
