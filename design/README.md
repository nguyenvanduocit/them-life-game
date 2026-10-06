# Design probe: story and screens

Throwaway design artifacts for the working title **Subject to Change**. Not product code, and not approved: the sim-core spec at `docs/superpowers/specs/2026-10-06-sim-core-design.md` is still waiting for review.

| File | What it is |
|---|---|
| `story.md` | Story bible: premise, tone rules, cast, life structure, long-mode narrative, social, ranks, the long mystery, three sample case files, share card, UI voice |
| `mockups/index.html` | 28 screens in phone frames, grouped by flow. One self-contained file (CSS and icons inline). Open it in a normal browser; no server needed. Google Fonts load from the internet, and without them the page falls back to system fonts |
| `mockups-overview.png` | One full-page screenshot of the gallery |

## Screens (28)

First launch: splash, age gate, AI consent. Quick mode: desk, intake roll, incident, outcome stamp, time skip, autopsy report, share sheet. Long mode: your Subject, overnight report, decision needed, management style, case log, facts and associates. Colleagues: list, inter-office memo, report or block. Meta: archive, rank, quarterly review, supply closet, settings, content intensity, account and data. System: lock-screen pushes, AI outage.

## Visual system

- Screen background = the color of a carbon copy sheet: white (desk, meta), canary (quick mode), pink (your Subject, anything waiting on you).
- Carbon-blue ink for actions and lines, stamp red only for stamps.
- Archivo (extended, heavy) for headlines and stamps; Atkinson Hyperlegible for body text, chosen for accessibility.
- One animation: the red stamp slam on the outcome screen. It respects reduced motion.

## Assumptions and limits

- The Bureau framing, the pigeon Jev, the title and the cast are proposals. The in-world "Junior Event Validator" backronym for Jev is made up.
- Avatars are simple placeholder shapes standing in for the layered paperdoll the research recommends. They are not final art.
- Vietnamese: Archivo covers Vietnamese. Atkinson Hyperlegible does not (checked against the Google Fonts subsets), so body text falls back to Be Vietnam Pro. Not tested with real Vietnamese copy.
- Atkinson draws a slashed zero, visible in prices and times. Decide whether to keep it.
- The mockups are static. Only the stamp animates. There is no clickable flow and no dark-mode render, although the settings screen promises dark mode.
- Screens that rely on features the sim-core spec has not defined: Jev's lean percentages (spec has a Decider with probabilities, so plausible), ratings of Jev's calls (not built), ribbons and rank unlocks (not specified).
- Prices shown (remove ads $2.99, pack $4.99, and so on) are illustrative, taken from the research benchmarks in `references/06-monetization-business.md`.
- Humor in the sample copy is mine and unplayed: no one has rated it for funny yet.
