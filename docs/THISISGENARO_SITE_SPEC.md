# THISISGENARO.COM Personal Site Design & Interaction Specification

Project: THISISGENARO.COM
Version: 0.1
Status: Design Locked / Implementation Pending
Theme: Existing Imperial Gold theme
Primary Framework Dependency: OTF / OTL where appropriate
Purpose: Personal, professional, editorial, and operational portfolio site

---

## 1. Purpose

THISISGENARO.COM is a personal and professional site built around a restrained use of OTF's visual and interaction language.

The website must not feel like an OTF demonstration with personal content added around it.

Instead:

OTF provides the spatial and interaction language of the site, while the content remains personal, professional, editorial, and human.

The site combines four primary identities:

- PERSON
  - About
  - CV
- THINKING
  - Journal
- OPERATIONAL WORK
  - Incidents
- CURRENT ACTIVITY
  - Home

---

## 2. Primary Site Structure

The initial information architecture is:

- HOME
- ABOUT
  - CV
- JOURNAL
  - Journal Entry
- INCIDENTS
  - Incident Detail

Primary navigation should expose:

- HOME
- JOURNAL
- INCIDENTS
- ABOUT
- CV

CV may technically remain subordinate to About while still being directly reachable from the primary navigation.

---

## 3. Existing Imperial Gold Theme

The site must use the existing theme named Imperial Gold.

Do not create a second theme with the same identity or fork its tokens unnecessarily.

The intended visual roles are:

- DEEP TEAL -> primary page/background field
- WHITE / WARM WHITE -> primary typography
- IMPERIAL GOLD -> identity, selection, important accents
- AMBER -> attention, transitional emphasis, warning
- TEAL / TURQUOISE -> activity, topology, signals, secondary accents

Operational semantic colors such as failure states may use additional theme-supported colors where necessary.

Gold should remain relatively scarce.

It should feel intentional rather than decorative.

---

## 4. Theme Semantics

Recommended semantic hierarchy:

- Brand / Identity -> Imperial Gold
- Selected / Current -> Imperial Gold
- Active Signal -> Turquoise / Teal
- Navigation Signal -> Turquoise or Gold depending on context
- Attention / Degraded -> Amber
- Failure -> Semantic failure color
- Disabled -> Desaturated teal / neutral
- Primary Text -> White / warm white
- Secondary Text -> muted cool-white / teal-neutral

Do not use Imperial Gold for every active element.

Gold should primarily communicate identity and importance.

---

## 5. Persistent Dormant Grid

A major site-wide design element is the persistent OTF world/grid.

The grid should be mounted once and reused across major site experiences where technically appropriate.

Conceptually:

- Persistent World/Grid
  - Intro
  - Home
  - Journal
  - About
  - CV
  - Incidents
  - Incident Detail

The grid acts as the underlying spatial substrate.

Pages determine how visible or active that world becomes.

---

## 6. Dormant State

For most pages, the grid should remain dormant.

Dormant means:

- mounted
- visible at very low contrast
- not continuously animating
- not recalculating layout
- not propagating signals
- not creating DOM churn

Dormant must not mean:

- full animation still running at opacity: 0

The grid should be computationally quiet.

---

## 7. Dormant Grid Appearance

The dormant grid should feel atmospheric rather than technical.

Recommended characteristics:

- point-top hex geometry
- very low contrast
- deep teal against deeper teal
- subtle spatial presence
- no strong node labels
- no active topology unless required

The user should often perceive it subconsciously before consciously noticing it.

---

## 8. Ambient Constellation

The dormant grid may contain a small number of ambient constellation points.

These are decorative and intentionally non-semantic.

They may:

- fade in slowly
- remain illuminated briefly
- fade out independently
- occasionally use muted turquoise
- occasionally use restrained gold

They must not imply:

- selection
- signal transport
- routing
- failure
- node state
- connector state

Ambient constellation activity is visual atmosphere only.

---

## 9. Ambient Constellation Density

The constellation effect must remain sparse.

Recommended behavior:

- desktop -> a few independently illuminated points
- mobile -> fewer points
- reduced motion -> static or nearly static

Avoid synchronized pulsing.

Avoid rapid blinking.

Avoid patterns that look like active transport.

---

## 10. Socket Independence

The constellation concept must not depend on a formal OTF socket implementation.

If sockets exist and are later confirmed as an appropriate rendering primitive, they may be used.

If sockets do not exist:

The constellation effect should still be implementable as simple non-semantic grid junction markers.

Do not create new OTF socket semantics solely for the personal site.

---

## 11. Main-Site Transitions

The persistent grid should use the existing OTF transition system for major scene changes where appropriate.

Important:

The ability to transition between scenes does not mean every page change requires a full topology morph.

Use three conceptual transition levels:

- LEVEL 0 - CONTENT
  Grid remains dormant.
  Only page content transitions.
- LEVEL 1 - SIGNAL
  Grid geometry stays stable.
  A small navigation/state signal may occur.
- LEVEL 2 - SCENE
  OTF scene/layout transition is used.

---

## 12. Recommended Transition Usage

Level 0 - Content

Use for:

- Journal -> Journal Entry
- About -> CV
- minor content changes

Level 1 - Signal

Use for:

- primary navigation feedback
- small directional hex cues
- active route indication

Level 2 - Scene

Use for:

- Home intro -> Home
- Home/Incidents -> Incident Detail
- Incident Detail -> another significant incident topology

Scene transitions should communicate meaningful structural change.

---

## 13. Grid Reuse

The same world/grid should be reused across scene transitions.

Conceptually:

- GRID
  - persistent
- SCENE A
  - OTF transition
- SCENE B

Avoid unnecessary:

- destroy grid
- recreate grid
- recalculate complete world
- remount renderer

unless the current OTF implementation requires it.

---

## 14. Intro Experience

On the first meaningful site load, the homepage may begin with a viewport-fit grid sequence.

The opening should happen only once according to an appropriate persistence policy.

Possible policy:

- first visit/session

or:

- persistent intro-seen flag

Do not replay the full introduction on every navigation.

---

## 15. Intro Sequence

The intended intro is:

deep teal field
  -> dormant hex grid becomes visible
  -> signals / nodes activate
  -> GH identity resolves
  -> THIS IS GENARO
  -> signal activity dissipates
  -> grid settles into dormant state
  -> Home content becomes primary

The grid remains.

It does not disappear completely.

---

## 16. GH Logo

The supplied GH hexagonal identity is the primary brand mark.

For web use:

- retain the point-top hexagonal identity;
- preserve Imperial Gold;
- allow a flatter digital interpretation;
- do not require the full embossed/3D treatment everywhere.

The intro may use motion/light to suggest metallic richness.

The navigation mark should remain flatter and cleaner.

---

## 17. Navigation

Primary navigation must remain consistent across the site.

Desktop:

- GH
- HOME
- JOURNAL
- INCIDENTS
- ABOUT
- CV

The navigation may incorporate restrained directional hex language.

For example:

- hexes as directional / active-position cues

Do not replace readable labels with hexes alone.

---

## 18. Navigation Signals

A small signal may indicate movement through the primary navigation.

The effect should remain subtle:

current position -> tiny signal movement -> new position

Navigation signals are intentional UI feedback.

They are distinct from ambient constellation effects.

---

## 19. Home Page

The locked Home direction is:

- Alternative A - Hero Focus

The Home page is the primary expression of the site identity.

It should feel spacious, confident, and current.

---

## 20. Home Structure

Recommended desktop composition:

- NAVIGATION
- GENARO
- HERNANDEZ
- Short professional statement
- subtle dormant topology / grid presence
- LATEST JOURNAL
- LATEST INCIDENT + STATUS
- secondary navigation / footer

The hero should dominate the page.

---

## 21. Home Hero

The current headline direction is:

- GENARO
- HERNANDEZ

with a concise professional statement beneath it.

Example conceptual positioning:

I design and build systems for people to understand complex things.

Final copy may evolve.

The typography should remain strong and uncomplicated.

---

## 22. Home Grid Behavior

The Home page keeps the dormant grid visible.

The grid may contain:

- subtle topology punctuation
- ambient constellation
- very restrained signal activity

but should not compete with the hero.

Home is not an incident scene.

---

## 23. Home Latest Journal

The Home page must feature the latest Journal entry.

Minimum content:

- LATEST JOURNAL
- title
- date
- short excerpt / description
- entry link

The card should feel editorial.

---

## 24. Home Latest Incident

The Home page must feature the latest Incident.

Minimum content:

- LATEST INCIDENT
- incident ID
- title
- date
- short summary
- status pill

The status pill is mandatory.

Example statuses may include:

- OPEN
- INVESTIGATING
- IDENTIFIED
- MONITORING
- RESOLVED
- CLOSED

Exact status vocabulary should come from the site's incident content model.

---

## 25. Semi-Transparent Cards

Semi-transparent cards are a locked visual component.

They should create depth without becoming exaggerated glassmorphism.

Recommended behavior:

- dark teal transparent fill
- subtle border
- moderate blur only if performant
- soft highlight
- high text contrast

Avoid:

- heavy frosted-glass effects
- large bright glows
- excessive reflections

---

## 26. Card Principle

Cards should appear as surfaces within the persistent world, not opaque rectangles pasted on top of it.

The dormant grid may remain faintly visible through them.

However:

Readability has priority over transparency.

If text contrast becomes weak, increase surface opacity.

---

## 27. Card Hierarchy

Use semi-transparent cards primarily for:

- latest content
- compact information groups
- incident metadata
- What I Do sections
- small profile information
- secondary CTAs

Do not put every paragraph inside a card.

Large editorial text should often sit directly on the page field.

---

## 28. About Page

The About page uses a scrollable hybrid composition derived from the previously explored A, B, and C alternatives.

Conceptually:

- A - INTRO / PERSON
- B - WHAT I DO
- C - BEYOND THE WORK

The page should feel like one continuous story rather than three disconnected modules.

---

## 29. About Section A - Intro

The first section should retain the portrait-led composition.

Recommended:

- portrait / generated editorial image
- large personal statement
- short biography
- small contextual information
- CV link

The overall feeling should be human and editorial.

---

## 30. About Section B - What I Do

Instead of four small profile widgets, the preferred design uses a larger What I Do surface.

Possible focus areas:

- Systems Architecture
- Observability
- Automation
- Incident Knowledge
- Infrastructure
- Security / Resilience

Actual labels should match the final CV/professional narrative.

This section may use connected semi-transparent cards.

---

## 31. About Section C - Beyond the Work

This section should be more personal and less career-oriented.

Possible subjects:

- learning
- exploration
- thinking
- building
- creative interests
- values
- curiosity

It should prevent the About page from becoming a duplicate CV.

---

## 32. About Visual Behavior

The dormant grid persists throughout the About page.

As the visitor scrolls:

- grid remains spatially stable
- content moves
- ambient constellation remains subtle
- small connectors or junction markers may decorate sections

Avoid turning each section into a new OTF scene.

---

## 33. About Cards

The What I Do and Beyond the Work sections may use semi-transparent cards.

Preferred:

- soft transparent teal
- thin gold / turquoise details
- quiet connectors
- small junction markers
- no aggressive glow

Ambient junction illumination may be used decoratively if clearly non-semantic.

---

## 34. About Portrait

Generated imagery is appropriate for the About page.

The visual should feel:

- editorial
- human
- professional
- dark teal environment
- warm directional light
- restrained gold highlights

Avoid generic corporate stock-photo styling.

Avoid excessive cyberpunk effects.

---

## 35. CV Page

The CV is a subpage of About but also directly reachable.

It should feel like:

A highly designed professional document, not an operational dashboard.

OTF presence should be light.

---

## 36. CV Content

The CV should include:

- latest positions
- recent achievements
- education
- hard skills
- soft skills

It may also include:

- professional summary
- selected certifications
- selected projects
- contact / profile links

if content supports them.

---

## 37. CV Layout

Suggested structure:

- GENARO HERNANDEZ
- Professional Summary
- EXPERIENCE
- RECENT ACHIEVEMENTS
- EDUCATION
- CAPABILITIES
  - HARD SKILLS
  - SOFT SKILLS

A subtle vertical hex/timeline spine may connect professional history.

---

## 38. CV OTF Presence

Use OTF language sparingly:

- small axial/hex markers
- timeline nodes
- quiet connectors
- navigation signal

Do not place a world-grid topology scene behind dense CV text if it reduces legibility.

---

## 39. Journal

The Journal must feel like a professional's journal, not a technical documentation site.

Tone:

- human
- thoughtful
- editorial
- personal
- reflective

Technical depth may appear when appropriate, but the Journal is not the Incidents section.

---

## 40. Journal Index

Recommended structure:

- JOURNAL
- short introduction
- entry list
- date
- title
- short excerpt
- tags / reading time if useful

The page should prioritize reading and discovery.

---

## 41. Journal Entry

Individual Journal pages should minimize technical visual noise.

Recommended:

- narrow readable measure
- generous vertical spacing
- warm white typography
- subtle gold details
- very quiet dormant grid
- optional generated imagery

No full topology scene unless a specific article genuinely requires it.

---

## 42. Journal Imagery

Generated imagery may be used selectively.

Not every Journal entry requires a hero image.

Images should support the writing rather than become mandatory content decoration.

---

## 43. Incidents Index

The Incidents section should feel like a ServiceDesk / operational record.

It is intentionally denser and more technical than Journal.

Recommended entry:

- INC-0027
- Signal route failure
- system / area
- date
- severity
- status pill

---

## 44. Incidents Index Tone

Visual character:

- structured
- technical
- monospaced metadata where appropriate
- clear status
- clear severity
- clean filtering / sorting if later added

This page should still belong to Imperial Gold but feel more operational.

---

## 45. Incident Status Pills

Status pills are important visual primitives.

Possible semantic set:

- OPEN
- INVESTIGATING
- IDENTIFIED
- MONITORING
- RESOLVED
- CLOSED

Use the existing theme's semantic color system rather than hard-coding arbitrary colors.

---

## 46. Incident Detail

Incident Detail is the page where OTF becomes a primary explanatory medium.

Desktop structure:

- INCIDENT HEADER
- TOPOLOGY / WORLD
- INSPECTOR
- TIMELINE
- ROOT CAUSE
- RESOLUTION
- FOLLOW-UP / NOTES

---

## 47. Incident Scene Framing

Incident scenes should not automatically be viewport-fit.

The persistent grid may remain viewport-sized, but the incident topology should use a bounded framing policy.

Recommended default:

- FIT-SCENE

with comfortable hex padding.

Additional possible modes:

- FIT-SELECTION
- FREE PAN / ZOOM

---

## 48. Incident Viewport

Desktop incident topology should occupy a dedicated visual region next to the inspector.

The incident world may use the same persistent grid/world while applying a specific camera frame to the scene.

Do not force:

entire browser viewport = incident topology

---

## 49. Incident Mobile Layout

On mobile:

- Incident Header
- Topology Viewport
- Inspector
- Timeline
- Root Cause / Resolution

The inspector becomes vertically stacked.

The topology viewport should be bounded rather than forcing full-screen scene behavior.

---

## 50. Incident Scene Behavior

Incident topology may use:

- real nodes
- real connectors
- operational status
- Connector Signals
- Path Signals
- failure state
- rerouting
- selection
- inspector updates

where supported by the OTF implementation.

Incident pages are the primary place for semantic OTF activity.

---

## 51. Incident Transition

Entering an Incident Detail may activate the dormant world:

dormant grid -> incident requested -> grid gains contrast -> scene transitions into place -> camera settles -> inspector appears

Leaving:

signal activity stops -> scene settles/fades -> grid returns to dormant

Reuse the current grid.

---

## 52. Incident-to-Incident Transition

Where two incidents use related infrastructure, the OTF transition system may preserve shared spatial continuity.

Example:

Incident A API -> Worker -> DB
  transition
Incident B API -> Worker -> Queue

Shared topology may remain coherent while changed nodes/relationships transition.

This should be used only if the current OTF transition implementation supports it cleanly.

---

## 53. Main Page Scene Policy

Recommended default scene intensity:

- Home -> Dormant / Minimal
- About -> Dormant / Minimal
- CV -> Dormant / very quiet / None-minimal
- Journal -> Dormant / near invisible / None
- Journal Entry -> Dormant / near invisible / None
- Incidents -> Dormant / subtle / Optional
- Incident Detail -> Active / Full

This prevents OTF from overwhelming the content.

---

## 54. Responsive Transition Policy

Desktop and mobile should use the same semantic scene model with different transition intensity.

Conceptually:

- DESKTOP -> full transition where appropriate
- MOBILE -> shortened transition
- REDUCED MOTION -> crossfade / immediate state transition

Do not create separate semantic scene systems per device.

---

## 55. Mobile Performance

On mobile, avoid:

- complex continuous topology morphing
- large persistent animation loops
- unnecessary full-world recalculation
- excessive blur
- high-density ambient constellation
- many simultaneous signals

Prefer:

- static grid
- short transitions
- bounded scene viewport
- reduced ambient density
- simple opacity/state transitions

---

## 56. Reduced Motion

prefers-reduced-motion must be respected.

Semantic outcomes remain identical.

Only visual interpolation changes.

Example:

Normal: scene morph + signal movement
Reduced: scene crossfade + static highlighted result

---

## 57. Accessibility

The site must not rely exclusively on:

- gold
- turquoise
- motion
- glow

to communicate meaning.

Use:

- text labels
- status text
- icons
- patterns
- ARIA where appropriate
- clear typography

Operational status pills must include readable text.

---

## 58. Typography

The site may use three tonal typography modes.

Site Shell

- Clean modern sans/grotesk.

Journal

- Human/editorial typography.

Potentially a refined serif or humanistic sans for long-form text.

Incidents

- Monospaced typography for:
  - incident IDs
  - timestamps
  - technical metadata
  - status details

while preserving readable sans for longer explanations.

---

## 59. Surface Hierarchy

Use three primary surface levels:

- LEVEL 0 -> deep teal world/background
- LEVEL 1 -> semi-transparent content/card surface
- LEVEL 2 -> active / inspector / elevated surface

Avoid too many nested card layers.

---

## 60. Borders and Highlights

Preferred:

- thin teal borders
- subtle Imperial Gold highlight
- turquoise signal accents

Avoid:

- thick neon borders
- full-card gold outlines
- excessive bloom

The interface should feel premium and precise rather than game-like.

---

## 61. Generated Imagery

Generated imagery is part of the intended design language.

Best use:

- About portrait
- selected Journal imagery
- identity / editorial moments

Avoid generated decorative imagery in Incident Detail when real topology itself provides the visual explanation.

---

## 62. Content vs World

A core site principle is:

Content changes. The world persists.

Conceptually:

- PAGE -> content state
- GRID -> persistent world
- SCENE -> topology projection
- SIGNAL -> transient semantic activity
- AMBIENT CONSTELLATION -> non-semantic atmosphere

These must remain separate.

---

## 63. Semantic Visual Hierarchy

The user should be able to distinguish:

- ambient light
- navigation signal
- selected topology node
- operational signal
- failed infrastructure

This hierarchy is essential to prevent the site's OTF vocabulary from becoming visually ambiguous.

---

## 64. Persistent World Lifecycle

Conceptually:

- UNINITIALIZED
- INTRO
- DORMANT
- ACTIVE SCENE
- SUSPENDED

Optionally SUSPENDED when the browser tab is hidden.

---

## 65. Dormant Must Be Cheap

When dormant:

- no continuous scene transition
- no signal propagation
- no unnecessary requestAnimationFrame loop
- no topology re-layout
- no repeated DOM updates

Ambient constellation should use an efficient low-frequency mechanism.

---

## 66. Blur Caution

Semi-transparent cards may use background blur only if:

- performance remains acceptable
- mobile does not suffer
- text remains legible

A simple translucent fill may be preferable on lower-capability devices.

The visual design must not depend on expensive blur.

---

## 67. Navigation Persistence

Navigation should remain visually stable across page transitions.

Do not rebuild or relocate the primary nav for every scene.

The active state should transition gracefully.

---

## 68. Footer

The footer should remain restrained.

Potential content:

- email/contact
- GitHub / professional links
- copyright
- small GH identity

Do not turn the footer into another topology scene.

---

## 69. Content Model - Journal

A Journal entry should support at minimum:

- title
- date
- summary
- body
- tags/categories if needed

Optional:

- image
- reading time
- related entries

---

## 70. Content Model - Incident

An Incident should support at minimum:

- incident ID
- title
- status
- severity
- date
- summary
- affected system
- timeline
- root cause
- resolution

Optional OTF-linked content:

- scene data
- topology root
- affected nodes
- signal route
- failure state
- rerouting data

---

## 71. Content Model - CV

CV content should support:

- summary
- positions
- achievements
- education
- hard skills
- soft skills

The content model should allow the page to remain maintainable without hard-coding every section into layout logic.

---

## 72. Interaction Principle

Interactions should be purposeful.

Use OTF interactions when they explain:

- structure
- selection
- navigation
- communication
- operational state

Do not animate merely because the framework supports animation.

---

## 73. Site Personality

The target feeling is:

- precise
- human
- professional
- quietly technical
- confident
- exploratory
- operational when needed

Avoid:

- generic SaaS dashboard
- cyberpunk excess
- luxury-brand gold overload
- developer-console aesthetic everywhere
- constant motion

---

## 74. Locked Design Decisions

The following decisions are currently considered locked:

- Imperial Gold existing theme
- deep teal base
- white text
- gold / amber / turquoise accents
- persistent dormant point-top grid
- OTF transitions for meaningful main-scene changes
- semi-transparent cards
- ambient constellation effect
- Home = Hero Focus / Alternative A
- latest Journal on Home
- latest Incident on Home
- Incident status pill
- About = scrollable A -> B -> C hybrid
- About portrait-led intro
- What I Do larger card/grouping
- Beyond the Work section
- CV as About subpage
- Journal = human/editorial
- Incidents = ServiceDesk/operational
- Incident Detail = OTF scene + inspector
- Inspector stacks vertically on mobile
- Incident topology does not have to be viewport-fit

---

## 75. Items Still To Verify

Before implementation, verify against the current OTF/site code:

- Does OTF currently support sockets?
- What dormant-grid API exists?
- Can the world/grid remain mounted across route transitions?
- How are current OTF scene transitions exposed?
- Can scene camera framing be bounded independently of grid size?
- What reduced-motion policies already exist?
- Does the current Imperial Gold theme expose all required tokens?
- How are node/connector signals currently projected?
- Does the site router preserve shared layout components?
- What card/background blur strategy performs acceptably on mobile?

Do not invent framework APIs until these are checked.

---

## 76. Suggested Implementation Order

Recommended progression:

1. Site shell + Imperial Gold theme
2. Persistent grid container
3. Dormant state
4. Home A
5. Semi-transparent cards
6. Ambient constellation
7. Primary navigation signal behavior
8. About hybrid page
9. CV
10. Journal index + entry
11. Incidents index
12. Incident detail shell
13. OTF incident scene integration
14. Inspector responsive behavior
15. Intro animation
16. Performance / reduced-motion pass

The intro should not be the first thing implemented merely because it is the first thing visitors see.

Build the persistent world and Home state first.

---

## 77. Acceptance Criteria

The first complete design implementation should demonstrate:

- Home feels complete without requiring active topology
- Imperial Gold remains consistent across pages
- grid persists without becoming distracting
- ambient constellation feels atmospheric rather than semantic
- semi-transparent cards remain readable
- About feels personal rather than like a CV
- CV remains structured and professional
- Journal feels editorial
- Incidents feels operational
- Incident Detail uses OTF meaningfully
- mobile Incident inspector stacks cleanly
- scene transitions do not require grid recreation
- reduced motion remains fully usable
- mobile performance remains acceptable

---

## 78. Core Design Principle

The central design rule for THISISGENARO.COM is:

There is one persistent world, but not every page needs to wake it up.

And:

OTF should become most visible when it helps explain something, especially incidents.

The rest of the site should use the same visual language more quietly.

---

## 79. Continuation Guidance

When continuing this project in a new conversation:

1. Treat the decisions in this specification as the current design baseline.
2. Do not redesign Home from scratch.
3. Preserve Imperial Gold.
4. Preserve semi-transparent card surfaces.
5. Preserve the persistent dormant grid.
6. Preserve ambient constellation as non-semantic.
7. Use existing OTF transitions where appropriate.
8. Do not force viewport-fit topology onto Incident Detail.
9. Verify socket support before designing socket-specific behavior.
10. Reconcile all implementation decisions against the actual current OTF/site code.

---

End of THISISGENARO.COM Personal Site Design & Interaction Specification
