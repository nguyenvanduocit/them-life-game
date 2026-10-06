# Life Simulator Research: Index and Synthesis

Research for a mobile life-simulator game. Compiled 2026-10-06 from 9 parallel research passes (about 5,000 lines in total). The index below links every document. The synthesis section is the orchestrator's cross-reading of the docs' "Implications" sections.

## How to read these docs

- Every claim carries a source URL and a confidence label. HIGH means the author opened the source. MEDIUM means inferred or taken from a secondary source. LOW means a guess or a search snippet.
- Design recommendations are labelled OPINION.
- Each doc ends with "Implications for our mobile life-sim game" and a gaps list.
- Not independently verified: the cited pages were not re-opened by a second reader, except the spot checks listed under "Verification status".
- Policy and legal text (doc 08) came through summarized page fetches. Re-read the live pages before relying on wording. Doc 08 is research, not legal advice.

## Index

| Doc | Topic | Lines |
|---|---|---|
| [01-genre-landscape.md](01-genre-landscape.md) | Taxonomy, history, 50-title catalog, market signals, white space | 232 |
| [02-bitlife-deep-dive.md](02-bitlife-deep-dive.md) | BitLife: loop, systems, monetization, controversies, revenue | 737 |
| [03-avatar-household-life-sims.md](03-avatar-household-life-sims.md) | Sims family, Tomodachi, Zepeto, inZOI, Paralives, Pocket Love | 260 |
| [04-text-choice-legacy-life-sims.md](04-text-choice-legacy-life-sims.md) | Life Restart Simulator, Alter Ego, Reigns, Choices, Crusader Kings, open-source schemas | 395 |
| [05-core-mechanics-systems.md](05-core-mechanics-systems.md) | Event engine, stats, mortality, economy, endings, schemas, balancing | 925 |
| [06-monetization-business.md](06-monetization-business.md) | Revenue models, benchmarks, retention, UA, platform fees, compliance | 333 |
| [07-ux-ui-art-audio.md](07-ux-ui-art-audio.md) | Layout patterns, onboarding, art, audio, accessibility, 6 wireframes | 800 |
| [08-content-narrative-policy.md](08-content-narrative-policy.md) | Writing, sensitive topics, store policy, age ratings, regions, risk matrix | 360 |
| [09-player-research.md](09-player-research.md) | Reddit and review mining: personas, pains, wishes (42 threads read) | 416 |
| [10-tech-production.md](10-tech-production.md) | Engines, architecture, event DSL, LLM cost, three candidate stacks | 537 |

## Synthesis: where the docs agree

1. **Event-driven text lane is the cheapest proven loop.** One Age button, a year-turn feed and 4-6 meters. Docs 01, 02, 05 and 07 converge on this. Doc 01 reports that Life Restart took about two weeks to build and BitLife reached #1 on iOS in three countries without marketing.
2. **Content is data.** Events are rows with conditions, effects and weights, plus a shared condition language (docs 04, 05, 08, 10). Life Restart's open-source data holds about 1,720 events written in spreadsheets.
3. **Storylet / quality-based selection** is the engine pattern (doc 05, 04): preconditions, weighted pick, cooldowns, scheduled follow-ups, a quiet-year filler.
4. **The death-to-legacy loop is the retention backbone.** Continue as a child, heirlooms, collectible causes of death (docs 02, 04, 09).
5. **The end-of-life summary is the share unit** (docs 01, 04, 06, 07). Life Restart's virality came from player screenshots, because its code has no share feature. That makes a generated share card an opportunity.
6. **Price integrity is the biggest churn lever.** BitLife's broken "pay once, get future content" promise and the retired season pass are the main backlash (docs 02, 06, 09). Avoid retroactive paywalls, avoid a season pass on a narrative sim, keep ads away from choice moments.
7. **Sims-style mobile live services are failing** (docs 01, 03): The Sims Mobile shut down, Pocket Camp ended its live service, Life by You was cancelled.
8. **Accessibility and content toggles are open gaps** (docs 07, 08, 09): BitLife's VoiceOver broke in 2026, and both cozy and gritty audiences ask for tone toggles.
9. **Decide the age-rating target first** (docs 02, 08, 10). It sets the writing budget, ad demand, consent flows and store forms.
10. **Separate a pure, seeded simulation core from the UI** (docs 05, 10). This makes the engine choice reversible and enables Monte Carlo balance tests.

## Market reality check

- BitLife (Stillfront): SEK 485M in FY2025 (doc 02, doc 06), down about 17-19% organically, with UA cuts cited. The documents' planning calibration is a single-digit to low-double-digit million USD ceiling for a new entrant.
- Paid UA in Tier-1 markets does not pay back in doc 06's worked example (LTV90/CAC about 0.43). Doc 06 recommends organic and creator-led growth plus Tier-2 Android soft launch.
- Doc 06's retention targets: D1 30%, D7 8-10%, D30 3-4%, against market medians of about 22%, under 4% and 0.7% (GameAnalytics 2025).

## Corrections to the original research brief

The brief given to the research agents contained errors. Treat these as settled:

- "BitLife+" and "Boost" are not among the 10 in-app purchases the App Store page shows (Apple truncates that list, so this is absence of evidence, not proof). SKUs seen: Remove Ads, Bitizenship, God Mode, Boss Mode, expansion packs and Time Machine. BitPass (seasons) was retired on 2026-08-14, confirmed on bitlifeapp.com (docs 02, 06).
- Doc 02 found no evidence that a "BitBook" feature exists.
- Alter Ego's author is Peter J. Favaro (1986); the current owner is Choose Multiple LLC. No evidence for "Peter Lorenz / Jetapp" (doc 04).

## Unreconciled discrepancies

- **Life Restart counts (open):** doc 04 reports 184 talents and 165 achievements. Doc 08 reports 185 and 166 (counted with openpyxl). The audit could not parse the xlsx files, so neither is confirmed. A header row likely explains the one-off gap (MEDIUM). Say "about 1,720 events, about 185 talents, about 166 achievements" until someone recounts.
- **Movie Director and legacy Bitizens (open):** player reports say legacy buyers were excluded at launch, but BitLife's official 12 Sep note says they get it (doc 02). The exclusion rests on Reddit only.
- **Google Play fee (open):** doc 06 now cites both the 20% new-install IAP rate and the 10% first-$1M tier from Google's blog. Confirm which applies before modelling margins.
- **BitLife age rating (resolved):** the live App Store page shows 18+ with "Frequent: Mature or Suggestive Themes". The iTunes API's 17+ is the legacy field, and Apple's new tiers have no 17+. Docs 08 and 02 mention 17+ only as the API or legacy value. ESRB/PEGI ratings still conflict across third-party sources (doc 08).
- **Alter Ego:** doc 07 notes the App Store and Google Play listings may be different products.

## Verification status

- Every agent reported hitting its web-search quota. Several fell back to direct fetches and APIs.
- Orchestrator spot checks: all 10 files exist and the line counts match the agents' reports; the iTunes API confirms BitLife's 4.757 rating and about 1.79M ratings (matches doc 02).
- Independent refutation audit (2026-10-06) of 14 load-bearing claims, using sources the auditor opened. Confirmed: The Sims Mobile delisting and shutdown dates, Life by You cancellation, Stillfront's BitLife revenue (SEK 485M FY2025, 204M vs 277M H1 2026), BitLife App Store prices, Alter Ego authorship, Tomodachi Life release and sales, Apple's 13+/16+/18+ tiers and 2026-01-31 deadline, tool versions (Godot 4.7.2, Unity 6.3 LTS, Flutter 3.47, RN 0.87, Expo SDK 57), and BitLife's 18+ store rating.
- Corrected after the audit: the "BitLife is about 2.0 after the paid pack" claim (the store rating is 4.76; the 2.0 is a sample mean, doc 09), the Google Play fee tier (doc 06), the "legacy buyers excluded" claim (doc 02), "BitLife+ does not exist" (now absence-of-evidence wording, doc 06), "Life by You cost $19.2M" (a write-down, doc 01), and the RN/Expo version pairing (doc 10).
- Not confirmed by the audit: Life Restart's exact counts, the Monte Carlo result in doc 05 (inputs confirmed, simulation not rerun; its 85+ extrapolation is the author's assumption, so the 0.4-year match is calibration), and Unity 6.6 in doc 10. Claims beyond these 14 have not been audited.

## Consolidated gaps (not yet researched or unverified)

- No primary source for BitLife internals: event probabilities, salary formulas and event counts are unpublished (docs 02, 05).
- No verified retention, session-length or revenue data for most Sims-family and avatar games (doc 03).
- YouTube/TikTok creator data, ATT opt-in rates, simulation-genre CPI by country, payer conversion and ARPPU (doc 06).
- Google Play data and Student/Teen Life, idle life games and Chapters (doc 04).
- No verified postmortem or team size for a comparable life sim; doc 10's timeline is a planning figure, not a benchmark.
- Legal items: ratings per market, kids' privacy rules, Vietnam Decree 147 duties, real-brand use (doc 08).
- No hands-on play of BitLife was possible, so its UI details are MEDIUM at best (doc 02).

## Open decisions for the product owner

These come out of the docs and are not settled by research:

1. **Sub-genre lane:** text/event life path (BitLife lane), household sim, or raising/legacy hybrid (doc 01, 03).
2. **Maturity target:** 18+ with frequent mature themes, or a 13+/16+ cut (doc 08, 10).
3. **Monetization contract:** ads plus one-time unlocks and packs, or premium (doc 04, 06).
4. **Stack:** Unity, Expo/TypeScript or Flutter. Doc 10 asks for team skills, ad-versus-purchase revenue mix and maturity target before narrowing (doc 10 section 12).
5. **Markets and languages at launch**, including Vietnamese plus English (docs 01, 04, 08).
