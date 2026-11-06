# Scinnova X: competitive audit and redesign roadmap

Prepared 6 November 2026. Status: research and implementation brief; proposed features have not been built.

## Objective

Make Scinnova X immediately recognizable, compelling to prospective delegates, and easy to use from discovery through preparation and registration. A competitive lead should be demonstrated through visual review and participant tasks, with comparable testing conditions across sites.

Keep the existing Doomsday identity, black/green/silver palette, Scinnova and Cedar branding, and static HTML/CSS/JavaScript stack as the working assumptions. The branding has not yet been confirmed by the organizer. No framework migration is needed to deliver the primary improvements below.

## Evidence and limits

Reviewed the three local HTML pages, shared CSS and JavaScript, content notes, and asset inventory. Checked local HTML paths and same-page fragment references with an HTML parser. Reviewed the extracted public content of KGSO, Alpha's Epsilon VI article, and the public Scinnova site. This is a source and content audit: rendered layouts, contrast, browser behavior, Core Web Vitals, registration destinations, and PDF contents have not been tested. No numerical competitor ranking or measured speed advantage is claimed.

### Local baseline

| Area | Verified finding | Implication |
| --- | --- | --- |
| Homepage | Hero/countdown → gallery → testimonials → footer. No introductory explanation or module overview. | The central story and choices require navigating away from the homepage. |
| Event date | `index.html` encodes `2027-01-08T08:00:00+05:00` in the timer. | This is an implementation value, not confirmation of the event's complete dates or registration deadline. |
| Registration | All three HTML pages use the same Google Forms short link; `public/Content.md` names a different link. | Resolve which destination belongs to edition X before changing or promoting it. |
| Guides | Nine PDFs exist in `public/StudyGuides/`; no guide link appears in the current HTML pages. | Valuable preparation content is undiscoverable. Edition and release approval remain unverified. |
| Testimonials | The third card uses a Ruhab Iqbal image and alt text beside Dr. Sajjad Haider Zaidi's name. Its quote also differs from the content notes. | Identity, portrait, quotation, and title need organizer verification as one record. |
| Images | Homepage: 25 images, zero lazy-loaded, zero with explicit width/height attributes. About: 13 images, same findings. Modules: 18 images, seven lazy-loaded, nine with dimensions. | Prioritize loading and reserve space consistently. Missing dimensions do not by themselves prove layout shift because CSS can reserve space. |
| Hero asset | Existing hero JPEG is 190,068 bytes, approximately 186 KiB. | Preserve its reasonable transfer size while evaluating cropping, formats, and loading priority. |
| Typography | The Google Fonts import requests nine families. | Consolidate roles and load only the families and weights actually used. |
| Navigation | Mobile menu toggles opacity, pointer events, and body overflow. No Escape handling, focus management, or expanded-state update exists in its function. | Keyboard and assistive-technology behavior needs implementation and browser verification. Closed overlay links remain a focusability concern. |
| Semantics | Homepage has no main landmark; About has neither a main landmark nor an H1. Modules has both. | Standardize page structure and navigation semantics. |
| Existing resilience | JavaScript includes CDN guards, native FAQ buttons, reduced-motion support, and loader fallbacks. | Preserve these useful foundations and verify behavior under failure conditions. |
| Metadata | Page titles/descriptions exist. No Open Graph, Twitter card, canonical, or JSON-LD markup is present in the three pages. | Shared links and discovery need a complete publishing pass. |
| Link integrity | All parsed local HTML file references and same-page fragment references resolve. | Preserve this baseline. External links, CSS URLs, and PDF contents were not validated by this check. |
| Maintenance | CSS contains 2,405 lines including legacy carousel styles; JavaScript still contains its carousel initializer. | Audit actual selector usage before removing old presentation code. File length alone is not a defect. |

### Competitive comparison

| Reference | Verified strengths in published content | Opportunity for Scinnova X |
| --- | --- | --- |
| [KGSO](https://kgso.net/) | Concise event introduction and dates, legacy by year, internal/external registration choices, guidebook, practical FAQ. The retrieved page still describes the 2026 event. | Deliver equally clear event facts and preparation access, with richer module decision support and a distinctive tenth-edition narrative. |
| [Alpha's Epsilon VI coverage](https://college.alpha.edu.pk/article/epsilonvi/24) | Describes the theme, named challenges, hands-on activities, and wider campus experience. This is an institutional article about January 2026, not a verified standalone event website. | Explain what delegates actually do and what the experience feels like, using approved Scinnova examples and photography. |
| [Public Scinnova site](https://scinnova.cedar.edu.pk/) | Edition IX content includes an introduction, guide downloads, sponsor recognition, and practical FAQ. It still displays IX and January 2026 in the retrieved content. | Make X a clear progression while preserving useful participant resources and planning the handoff on the official domain. |

Competitor omissions in extracted text do not establish that a feature is absent from a rendered site. Additional rivals and Epsilon's exact standalone URL remain to be identified before a broader market ranking.

## Proposed experience

Art direction: **a scientific command center approaching Doomsday**. Use one recognizable X/countdown composition, restrained instrument graphics, sharp editorial typography, and real event photographs. Reserve crimson for meaningful alerts. Keep plain-language labels beside thematic names: “Modules,” “Study guides,” “Schedule,” and “Register.”

Proposed opening copy, subject to organizer review:

> SCINNOVA X · THE TENTH EDITION  
> DOOMSDAY IS COMING.  
> Cedar College's science olympiad. Nine disciplines. Your team's next challenge.  
> Explore the modules · Register your team

Display the confirmed date range and venue alongside this copy. Keep the countdown subordinate to the identity and visitor actions. Never use it as the only way to communicate the date.

Homepage sequence:

1. Identity, introduction, confirmed date/venue, registration and module actions.
2. A compact explanation of Scinnova and essential participation facts.
3. Nine-module preview with clear disciplines and links.
4. Tenth-edition legacy and selected real-event highlights.
5. Verified testimonials and current partners, where approved.
6. Practical registration summary, FAQ, and contact route.

Retain `about.html` for the fuller story and organizing team. Retain `modules.html` for exploration and approved preparation resources. Add a dedicated registration-information page if confirmed logistics justify it. A separate event-day page is a later feature dependent on an approved schedule.

## The 24 improvements

Priority definitions: **P0** resolves correctness or access risks; **P1** establishes the essential experience; **P2** creates a distinctive advantage; **P3** supports later event operations. Priorities are sequencing decisions, not measured severity scores.

### Identity and first impression

**1. Give Scinnova X a signature composition — P1.** Build the opening around a deliberate X/countdown focal point with black, green, silver, and a small amount of crimson. Adapt the composition for portrait and landscape screens. Success: the logo, event explanation, and primary actions remain readable at the agreed phone and desktop sizes without waiting for an animation.

**2. Establish a disciplined type and component system — P1.** Reduce the nine-family request to two primary families and, only if useful, one numeric/display accent. Define heading sizes, reading widths, spacing, buttons, borders, and focus states. Success: all three pages use documented roles consistently; font loading includes only needed weights.

**3. Design the homepage as a persuasive sequence — P1.** Introduce the event and modules before the longer archive. Give each section one clear purpose and a useful onward action. Success: in a proposed five-person first-impression check, at least four can explain the event and identify their next action after a brief view. Record observations rather than treating a small sample as statistical proof.

**4. Create one restrained motion language — P2.** Use the same reveal rhythm, hover behavior, and transition timing throughout. Make the hero animation optional and lightweight; respect reduced motion and allow immediate reading. Success: information and navigation work with animation libraries blocked, with JavaScript disabled where native links apply, and with reduced motion enabled. No automatic sound or forced intro is needed.

### Understanding the competition

**5. Put essential event facts within immediate reach — P0.** Display confirmed dates, venue, eligibility, team size, and registration status in readable text. Distinguish the event countdown from registration deadlines. Success: visitors can find these facts without opening the external form; unknown details are explicitly awaiting announcement.

**6. Bring all nine modules onto the homepage — P1.** Preview each discipline, its recognizable module name, and a concise description. Link directly to stable anchors on the module page. Success: all nine choices are discoverable without a carousel or guessing what a themed name means.

**7. Turn descriptions into practical module briefs — P1.** For each module, provide approved examples of activities, relevant skills, format, preparation resources, and any confirmed requirements. Success: a student can explain how two modules differ and identify the appropriate preparation resource. Do not invent rounds, equipment rules, or difficulty ratings.

**8. Publish event and registration logistics together — P1.** Explain how to form a team, choose modules, register, pay, submit proof if required, and receive confirmation. Present confirmed fees, inclusions, deadlines, and refund policy. Success: the sequence and payment destination are consistent with the current official form and organizer instructions.

### Registration and preparation

**9. Make the registration handoff deliberate — P0.** Verify the edition X form and reconcile the content notes. Use a clear primary action on desktop and mobile; explain that it opens the official form. Success: every registration action reaches the verified destination, including from deep pages. No form submission is needed to verify the handoff.

**10. Restore access to approved study guides — P1.** Match each module to its PDF after checking the edition and release status. Label the edition, file type, and approximate size; identify prior-edition material honestly if retained. Success: all nine module records have either a verified resource or an explicit release status. Older guides never silently appear as current X rules.

**11. Answer decisions in the FAQ — P1.** Cover eligibility, private teams, team size, packages if applicable, fees, deadlines, payment confirmation, preparation, and contact. Preserve the existing native-button accessibility. Success: each answer has an authoritative current source and no contradictions with event facts or the form.

**12. Add a useful help route — P1.** Provide an approved email, contact link, or WhatsApp destination, with a brief prompt describing what information to include in an inquiry. Success: visitors have an identifiable route when the FAQ does not resolve their question. Do not invent a contact or response-time promise.

### Distinctive features

**13. Build an interactive module explorer — P2; recommended signature feature.** Let students browse all modules and compare up to three using the same approved fields. Add shareable module anchors and direct guide actions. Keep the full roster accessible without JavaScript. Success: a student can compare two modules and reach their guides in a proposed 30-second task. This is a Scinnova design proposal, not a verified claim that competitors lack such a tool.

**14. Offer short challenge previews — P2.** Include one organizer-approved practice problem or activity preview for selected modules, with an accessible reveal/explanation. Success: each preview conveys the module's character, works on touch and keyboard, and is clearly separate from official competition questions. Build a small pilot before extending across all modules.

**15. Tell the tenth-edition story — P2.** Combine existing edition logos, verified years, selected achievements, and captioned event photographs into a short legacy sequence. Success: every milestone has an approved fact or asset; historic figures and sponsors are identified by edition.

**16. Give teams a preparation checklist — P2.** Provide a simple downloadable or browser-local checklist for confirmed registration, guides, permitted equipment, and arrival preparation. Saved progress is optional and secondary. Success: it remains readable and printable without accounts, and every instruction matches approved rules. Exclude module conflict detection until an authoritative timetable exists.

### Trust, sharing, and event usefulness

**17. Correct attribution and quotation handling — P0.** Verify each testimonial's speaker, portrait, title, and exact approved quotation together. Preserve source records; identify paraphrases rather than presenting rewritten copy as direct speech. Success: no mismatched identity remains and every displayed endorsement has organizer approval.

**18. Curate the gallery as evidence — P1.** Select photos showing actual experiments, teamwork, competition, and atmosphere. Add accurate contextual captions and useful alt text; enlarge images only through an accessible interaction if one is warranted. Success: photos help explain the experience and do not imply unverified attendance or activities.

**19. Make shared links communicate the event — P1.** Add page-specific social titles/descriptions, an approved share image, and absolute URLs based on the confirmed production domain. Give module links stable anchors. Success: shared page previews show X branding and correct details; module deep links land at the right section.

**20. Plan an event-day mode — P3.** Once timings are approved, offer a clear schedule, venue information, urgent contact, and dated announcements. Enable calendar export only with verified dates and timezone. Publish results only through an organizer-approved process. Success: a delegate can find their next activity and help contact quickly. Live scores, push messages, and a participant portal require separate operational scope.

### Quality and measurement

**21. Complete responsive and keyboard navigation — P0.** Remove closed menu content from the tab order; provide menu state, focus entry/return, and Escape behavior appropriate to an overlay. Add main landmarks, the missing About H1, a skip link, and active-page semantics. Success: navigation, FAQ, module actions, and any new comparison UI are usable with keyboard and touch; focus stays visible at 200% zoom. Use the [W3C modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) if the menu is implemented as a modal.

**22. Set and verify a loading budget — P1.** Lazy-load suitable below-fold imagery, reserve image space, minimize font requests, and keep decorative motion off the critical path. Evaluate removing the full-screen loader or making it nonblocking: its current animation starts on `window.load`, after page resources have loaded, while CSS supplies an eight-second failsafe. Success targets: LCP ≤2.5 seconds, INP ≤200 ms, and CLS ≤0.1 at the 75th percentile, split by mobile/desktop when field data exists, following [Google's Web Vitals guidance](https://web.dev/articles/vitals). Use lab results as diagnostics until field data is available; do not report targets as measured results.

**23. Finish discovery and the official-domain handoff — P1.** Expand useful titles/descriptions, use the confirmed canonical domain, and add an accurate sitemap, robots configuration, and event structured data only when required facts and publishing details are known. Plan the switch from public IX content to X and preserve important resource links. Success: the intended production URL serves X, metadata agrees with visible facts, and retained historic material has clear edition labels. Deployment and DNS changes are outside this audit deliverable.

**24. Measure decisions and keep the site coherent — P1.** Maintain one authoritative event/module content source appropriate to the existing static site, and document the reusable UI rules. If analytics is approved, record `register_click`, `module_view`, `guide_click`, and comparison interactions with nonpersonal context. Success: content changes remain consistent across pages and events fire once per intended interaction. A form-link click is not a completed registration, and a PDF click is not proof of a completed download. Only measure completed registrations if the official form provides a valid integration or reconciled aggregate counts.

## Delivery order

| Milestone | Work | Reviewable result |
| --- | --- | --- |
| A. Establish accurate content | 5, 9, 17; gather authoritative inputs for 8, 10, 11, 12 | Verified fact sheet, registration destination, testimonial records, and guide release status. |
| B. Establish the core design | 1, 2, 3, 6, 7, 8, 11, 12, 18, 21 | Responsive homepage, useful module page, and consistent About/registration information. Resolve foundational accessibility during implementation. |
| C. Add the defining experience | 4, 10, 13, 15 | Coherent motion, approved guides, module comparison, and tenth-edition narrative. |
| D. Prepare for launch | 19, 22, 23, 24 | Checked sharing previews, measured performance, domain handoff plan, consistent content and optional approved analytics. |
| E. Extend with evidence | 14, 16, 20 | Challenge previews, preparation checklist, and event-day tools when content and operations support them. |

The initial build should cover A–D with a bounded version of module exploration. E is deliberately conditional: it should earn its place through participant needs and available content. Avoid a backend migration, account system, payment processing, or live scoreboard solely to make the feature list longer.

## How to judge whether the lead is real

Use the same phone, connection profile, and task wording for Scinnova X and each verified competitor site. Record the edition and test date. Review desktop separately.

| Dimension | Proposed check | Evidence to record |
| --- | --- | --- |
| Recognition | Briefly show the homepage, then ask what the event is, who hosts it, and what action is available. | Answers and misunderstood details from at least five prospective participants. |
| Participation clarity | Ask a participant to find the date, eligibility, team size, and registration steps. | Time, wrong turns, and unresolved questions. |
| Module choice | Ask a participant to compare two relevant modules and locate an approved guide. | Time, comparison quality, and guide findability. |
| Registration handoff | Ask a participant to find fees and reach the official form without submitting it. | Time and uncertainty at the handoff. |
| Visual distinction | Show similarly sized page views without leading participants toward a preferred answer. | Recognition, perceived clarity, and reasons for preference. |
| Performance | Run equivalent repeated lab measurements; use field metrics when sufficient data exists. | Device, network, tool configuration, median lab results, and field sample context. |
| Accessibility and resilience | Keyboard-only navigation, 200% zoom, reduced motion, slow resources, and blocked animation scripts. | Reproducible failures and completed task outcomes. |

An overall superiority claim remains unproven until the new site and competitor experiences are tested. Improvements to specific tasks can be reported directly once observed.

## Inputs required before factual publication

- Official date range, exact venue/campus, and event timezone.
- Edition X eligibility, team size, module/package rules, fees, deadlines, and policies.
- Verified edition X registration form and payment/confirmation procedure.
- Release status and edition of every guide; approved sample challenges if pursued.
- Approved testimonial text, identities, portraits, and titles; approved legacy facts and current sponsors.
- Public contact route, production domain/deployment arrangement, and any analytics preference.
- Exact Epsilon competition website URL and other named competitor URLs for full rendered comparison.

These inputs do not prevent design planning. They do prevent presenting guessed logistics as official information.

## Audit validation

- Parsed all three local HTML pages; found no missing local `src`/`href` paths or broken same-page fragment targets.
- Counted image loading/dimension attributes, page landmarks/headings, requested font families, and guide files directly from the workspace.
- Rechecked source implementations for the menu, loader, countdown, FAQ, and reduced-motion handling.
- Distinguished source-level findings from behavior that still requires browser QA.
- Created this roadmap only. Existing application files and the pre-existing `index.html` working-tree change were preserved.
