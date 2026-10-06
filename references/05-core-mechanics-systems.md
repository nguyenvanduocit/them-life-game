# 05 - Core Mechanics and Systems Design: Life-Simulator Reference Catalog

Date: 2026-10-06. Scope: core mechanics and systems design across the life-sim genre. Non-goals: monetization, UI, tech stack (other agents).

Goal (verbatim from requester): "Research life simulator games thoroughly, in every aspect, because we will build a similar mobile game."

## 0. How to read this document

### 0.1 Labels

| Label | Meaning |
|---|---|
| HIGH | Read in a primary source (or ran the command / read the code) in this session. |
| MEDIUM | Secondary source, search-result snippet, or one fetch summary without corroboration. |
| LOW | Fan site, memory-based, or conflicting sources. Treat as a lead, not a fact. |
| OPINION | Design recommendation. Rationale given. Not a factual claim. |
| unverified | Could not be confirmed this session. Named so nobody builds on it blindly. |

### 0.2 Research limits (stated up front)

- WebSearch budget was exhausted (200/200) mid-session. Later topics were fetched by direct URL only. (evidence: tool error "used its web search budget (200 of 200)")
- WebFetch returns a small-model summary of the page, not raw text. Direct quotes below are as relayed by the fetch tool. PDFs I could download (Kreminski storylets paper, Valve L4D slides) were converted with `pdftotext` and read as raw text; those are HIGH.
- Blocked or missing: SSA life tables (HTTP 403 "Access Denied" via WebFetch and curl), sims.fandom.com (402), rimworldwiki.com (403), pnas.org (403), web.archive.org (blocked), several Wikipedia titles (404, no BitLife article exists: Wikipedia API search for "BitLife Candywriter" returned nothing).
- BitLife has no primary or encyclopedic source in this session. Every BitLife claim rests on two fan sites and is LOW.
- Coverage: about 60 fetches/API calls/PDFs and about 10 search queries before the search budget ended. This is a design-reference catalog, not an exhaustive literature review. Gaps are listed in section 26.

### 0.3 Reproducible computations in this document

Three numbers below were computed by me with scripts run in this session (not taken from a source):
1. Mortality Monte Carlo calibration (section 11.3).
2. Event weight probabilities (section 23.3).
3. Gompertz-style doubling time from WHO data (section 11.2).
Scripts are reproduced or described so they can be re-run.

---

## 1. Genre map and reference-game catalog

Definition: life-simulation games are those where "the player lives or controls one or more virtual characters", with subtypes god games, digital pets, social simulations, biological simulations, raising simulations. (HIGH, https://en.wikipedia.org/wiki/Life_simulation_game)

The games our design draws on, with the one mechanic each teaches best:

| Game | Year / source | Time model | Teaches us | Confidence |
|---|---|---|---|---|
| Alter Ego | 1986, Activision; designer Peter J. Favaro, clinical psychologist | Turn = experience; 7 life stages | Choice-tree life story, 3 stats, therapeutic framing | HIGH (https://en.wikipedia.org/wiki/Alter_Ego_(1986_video_game)) |
| Tamagotchi | 1990s | Real-time aging | Care meters, real-time decay, death by neglect | HIGH (https://en.wikipedia.org/wiki/Tamagotchi) |
| The Sims | 2000 (HIGH, genre page); Sims 2 added aging | Real-time, speed controls | Needs hierarchy (Maslow), traits/aspirations, autonomy | HIGH (https://en.wikipedia.org/wiki/The_Sims) |
| Princess Maker 2 | year unverified | 3 periods per month, age 10-18 | Scheduling, 74 endings, rival benchmark | HIGH (https://en.wikipedia.org/wiki/Princess_Maker_2) |
| Fallen London / StoryNexus | 2009 | Action-point gated, turn-based | Quality-based narrative, storylets, opportunity deck | HIGH (https://en.wikipedia.org/wiki/Fallen_London) |
| Crusader Kings III | year unverified | Pausable real-time | Traits, stress, dynasty, genetics, heir takeover | HIGH (https://en.wikipedia.org/wiki/Crusader_Kings_III) |
| Reigns | 2016, Nerial/Devolver | Turn = card = year-ish | 4 bars, binary swipe, dynasty restart, weighted deck | HIGH (https://en.wikipedia.org/wiki/Reigns_(video_game)) |
| Life Restart Simulator (human life restart) | viral after a Sept 3 release (year unverified; repo copyright starts 2021); open-source `VickScarlet/lifeRestart`, MIT | Turn = 1 year, auto-play with checks | Talent draw, 30-point allocation, event pools by age, data-driven | HIGH on data schema (GitHub), MEDIUM on gameplay (Baidu, search snippets) |
| Stardew Valley | year unverified | Real-time day, 28 days/season | Energy budget, passing-out penalty, season pacing | HIGH (https://stardewvalleywiki.com/Time) |
| Dwarf Fortress / Caves of Qud | years unverified / full release 2024-12-05 (HIGH) | Real-time / turn | Emergent stories, generated history, personality | HIGH (wikis below) |
| Wildermyth | year unverified | Campaign chapters | Handcrafted + procedural layers, aging, relationships | MEDIUM (https://en.wikipedia.org/wiki/Wildermyth) |
| BitLife | 2018, Candywriter | Turn = 1 year | Tap-to-age, many careers, crime; the direct competitor | LOW (fan sites only) |
| Prom Week, Versu, Facade | 2011 / 2014 / 2005 | Scene-based | Social physics, social practices, drama manager (research prototypes) | HIGH/MEDIUM |

Relevant observation (OPINION): the genre splits into two families. (A) Character-as-ledger games (BitLife, Life Restart, Alter Ego, Reigns): few stats, event table, fast loop. (B) Character-as-agent games (Sims, CK3, Dwarf Fortress, Prom Week): characters have needs/personality and act on their own. Family A is cheaper to build and fits a mobile one-tap loop. Family B gives emergent drama but costs AI, UI and balancing. Our MVP should be A with a few B-style seeds (personality traits driving event weights, NPC relationship values that evolve).

---

## 2. Time model

### 2.1 Options

| Model | Examples | Pros | Cons | Fit for mobile life sim |
|---|---|---|---|---|
| Turn = 1 year ("age" button) | BitLife (LOW), Life Restart, Reigns (card-based) | Entire life in 20-40 min; short sessions; each turn is one decision cluster | Years feel samey without event variety; no granularity inside a year | Best default |
| Turn = month / week schedule | Princess Maker 2: each month has early/middle/late periods (HIGH) | Planning depth, training | Many more turns; PM2 only covers age 10-18 | Use for a short "intensive" phase (exam year, startup year), not whole life |
| Real-time, pausable, speed controls | Sims, CK3 ("pausable real-time with variable speeds", HIGH) | Emergence, autonomy | Heavy simulation, needs attention | No |
| Real-clock tied | Animal Crossing: "the passage of time in the game world reflects that in reality" (HIGH, https://en.wikipedia.org/wiki/Animal_Crossing); Tamagotchi pet age increases in real time (HIGH) | Daily-return habit | Punishes absence; content paced by wall clock | Optional layer only (daily rewards) |
| Day-cycle with energy budget | Stardew: day 6am-2am = about 14 real minutes; 28 days/season, 4 seasons (HIGH); at 2am character passes out, loses up to 1,000 gold if outside | Natural session length, tension from running out of time | Needs spatial game | Borrow the "daily energy budget" idea for action points |
| Hybrid | Fallen London: action-point (candle) gated storylets + narrative turns (MEDIUM) | Real-time refill gates progress, turn-based content | Tied to monetization | Variant possible |

### 2.2 Hybrid design recommended (OPINION)

- Macro clock: 1 turn = 1 year, ages 0 to death.
- Micro clock: each year gives N "action points" (e.g. 3) the player spends on a menu (study, work out, socialize, side hustle). This is the Stardew/PM2 budget idea and gives a real decision every turn rather than only reacting to events. Rationale: BitLife-style pure "tap age and read" has weak agency; budget-allocation is the cheapest agency mechanism.
- Variable year granularity: skip boring spans automatically ("You spend 8 uneventful years at the firm") when the director finds nothing relevant. This is OPINION; mechanism is the Fallen London "pacing" principle: keep repeatable content short and offer goals with progress visible ("only 4 more points") (HIGH, https://www.failbettergames.com/news/narrative-snippets-pacing).

---

## 3. Stat models

### 3.1 What reference games track

| Game | Visible stats | Hidden / latent | Source |
|---|---|---|---|
| Alter Ego | Physical, Confidence, Intellectual (3) | Scenario-gating state | HIGH |
| Life Restart | CHR (looks), INT, STR (constitution), MNY (family wealth), SPR (happiness), LIF (lifespan), AGE as effect fields | Talents, event flags | HIGH (event.types.ts `EventEffect`) |
| Reigns | 4 meters: army, people, church, wealth; reign ends if any meter "completely filled or empty" | Card flags across generations | HIGH |
| BitLife | Happiness, Health, Smarts, Looks (reported); one fan guide lists Health, Happiness, Intelligence, Looks, Wealth | Unknown | LOW (conflicting fan sites: https://www.playbitlifegame.com/, https://www.bitlife.school/) |
| The Sims | Needs/motives, mood, aspiration meter | Personality traits | MEDIUM (needs list from training memory; sims.fandom.com fetch failed) |
| CK3 | 6 skills (Diplomacy, Martial, Stewardship, Intrigue, Learning, Prowess), stress | Genetics, inactive traits | HIGH / MEDIUM |
| Dwarf Fortress | Needs, mood | 46 personality facets, 0-100 each | HIGH (https://dwarffortresswiki.org/index.php/Personality_trait) |
| Fallen London | 4 core attributes (Watchful, Shadowy, Dangerous, Persuasive) plus unbounded "qualities"; menaces (Nightmares, Suspicion, Wounds, Scandal) | Most gating qualities | HIGH |

### 3.2 Visible vs hidden: patterns

1. Few visible "vital" stats (3-5) the player can reason about: Alter Ego 3, Reigns 4, BitLife 4 (LOW). (OPINION: past about 6 visible stats, players stop forming mental models.)
2. Hidden latent state drives events: flags, personality, luck, genes. Fallen London's insight: "each facet of the game world that might impact the narrative would be represented as a numeric quality" (HIGH-MEDIUM, search result summarizing https://www.failbettergames.com/news/new-narrative-structures and https://emshort.blog). A unified "quality" store means one data type for stats, items, flags and story progress.
3. Hidden values the player partly infers: Dwarf Fortress personality facets distribute as 78% neutral (40-60), and extremes are rare: 91-100 is 0.4% (HIGH). That shape is a ready-made template for trait rarity.

### 3.3 Caps, bounds and decay

| Pattern | Example | Note |
|---|---|---|
| Two-sided bound (0 and max both lose) | Reigns: full or empty ends the reign (HIGH) | Forces balancing instead of "maximize one stat". Cheap source of tension. |
| Floor = death or crisis | Tamagotchi: death by "poor care, old age, sickness" (HIGH); Sims needs (MEDIUM) | Good for health only. |
| Decay toward baseline | Hedonic adaptation: people "keep a fairly stable baseline level of happiness despite external events" (HIGH); but Lucas (2003): full adaptation after divorce/spousal loss, not after marriage or male job loss, severe long-term disability lowers well-being durably (HIGH) | Model happiness as mean-reverting with domain-specific exceptions. |
| Hard 0-100 cap + diminishing returns | OPINION | Prevent "everything 100" end states. |
| Age-dependent decay | Health/looks decline after age X | OPINION. Use rate curves, not constants. |

OPINION formulas (not from any source; test via section 21):

```ts
// happiness mean reverts to an individual set point; events push it away
happiness_next = clamp(0, 100,
  happiness + k * (setPoint - happiness) + sum(eventDeltas) )   // k ~ 0.3/yr, tune by simulation
// health: age-dependent baseline drift, mitigated by lifestyle
health_next = clamp(0, 100, health - agingDrift(age) + lifestyleBonus + eventDeltas)
```

### 3.4 Derived stats

Compute, never store, anything that is a function of other state (Functional Core principle from the project instructions). Examples: `attractiveness = f(looks, health, age, grooming)`, `creditScore = f(debt/income, defaults)`, `jobFit = f(skills, degree, personality)`, `lifeSatisfaction` for scoring. Derived values keep content authors from patching two places.

---

## 4. Life stages and what is playable when

| Game | Stages | Notes | Confidence |
|---|---|---|---|
| Alter Ego | Infancy, childhood, adolescence, young adulthood, adulthood, middle age, old age (7) | Choices in each stage affect "later scenarios" | HIGH |
| The Sims 2 | 7 stages infancy to old age | | HIGH |
| The Sims 4 | Newborn, infant, toddler, child, teen, young adult, adult, elder (8); toddlers added 2017, baby split into newborn/infant 2023; adults get 3 traits, children/teens 2; one aspiration per Sim | | HIGH |
| BitLife (reported) | Childhood 0-12, teen 13-19, young adult 20-39, middle age 40-65, senior 65+ | Both fan sites agree on this split | LOW (two fan sources) |
| Princess Maker 2 | Age 10 to 18 only | Raising, not living | HIGH |
| Tamagotchi | Baby, child, teen, adult, special, sometimes senior | | HIGH |

### 4.1 Playability gating (OPINION with rationale)

| Stage | Agency | Why |
|---|---|---|
| 0-5 | None (auto-run), only a "family circumstances" reveal | No decisions a toddler can plausibly make; keeps first-session time short. |
| 6-12 | Low: school effort, friends, one hobby | Teaches the stat loop with low stakes. |
| 13-17 | Medium: study path, risk behavior, first romance | Prime source of "regret" and crime-risk seeds. |
| 18-29 | Full: education, career, partner, location | Highest decision density, front-load content here. |
| 30-59 | Full plus family/dependents | Trade-offs between career and family emerge. |
| 60+ | Narrowing: health management, legacy, estate | Endgame: scoring, will, heir handoff. |

Reason: Alter Ego's seven stages and the Sims's eight both hang different content libraries on stages, so a single `stage` field in event `requires` is an established pattern. Skipping through infancy is an OPINION; Life Restart auto-plays whole lives.

---

## 5. Event engine patterns

The event engine is the heart of the genre. Seven patterns observed; all are combinable.

### 5.1 Pattern catalog

| # | Pattern | Mechanism | Examples | Authoring cost | Replay | Confidence |
|---|---|---|---|---|---|---|
| A | Weighted random pool keyed by age | Per age, a list of `[eventId, weight]`; draw one; event may branch | Life Restart `age.types.ts`: `Age = {age, event: EventWithWeight[][]}`, weights in `EventWithWeight = [number, number]` | Low (spreadsheet) | Medium | HIGH (code read) |
| B | Quality-based narrative (QBN) / storylets | Storylet = precondition + content + effects; unlocked by numeric "qualities"; player chooses among available | Fallen London, StoryNexus | Medium | High | HIGH |
| C | Salience-based | Compare world state to each content item's tags; pick best match; random among ties | The King of Chicago, Left 4 Dead dialogue, Firewatch | Medium | Medium | HIGH (Short blog + Kreminski Table 1) |
| D | Deck metaphor | Content "cards" dealt from a deck; relevance can add duplicates | Reigns (weighted random framed as deck, "a storylet (or card) that is highly relevant ... may be dealt into the deck multiple times"); Fallen London Opportunity deck | Medium | High | HIGH (Kreminski paper text) / MEDIUM (opportunity deck) |
| E | Drama manager / director | A module paces content by tension or story goals | Facade (drama manager over "beats"); Left 4 Dead AI Director; RimWorld storytellers | High | Very high | HIGH (L4D slides, Wikipedia) |
| F | Social physics / practices | Rules evaluate character relations; characters pick actions by volition | Prom Week (CiF; over 3500 sociocultural considerations, MEDIUM), Versu (social practices, MEDIUM) | Very high | Very high | MEDIUM |
| G | History generation ("simulate then narrate") | Simulate or generate historical events, then rationalize them in text | Dwarf Fortress world gen; Caves of Qud "first generates historical events and rationalizes them ex post facto, using a state machine and replacement grammar" | High | Very high | MEDIUM (abstract via search result: https://www.semanticscholar.org/paper/Subverting-historical-cause-&-effect:-generation-of-Grinblat-Bucklew/e73a3bcd1eca39a2de7add8940d6f36d15175d21); HIGH for DF (https://dwarffortresswiki.org/index.php/World_generation) |

Definitions (HIGH, https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/, as relayed by fetch):
- QBN: "storylets unlocked by qualities". Advantage: "short stories to slot together in interesting ways". Drawback: content "tends to be uninteresting until there are a fair number of storylets"; UI challenge surfacing relevant storylets.
- Salience-based: pick content "depending on which content element is judged to be most applicable at the moment". Advantage: easy to add content incrementally. Drawback: "obvious design vulnerability" when sequencing whole-story events; testing is hard without visualization.
- Waypoint: conversation-topic graph where the system pathfinds to authored trigger topics (Glass). Not relevant to our MVP.

The storylet design space (HIGH, Kreminski and Wardrip-Fruin, ICIDS 2018, read as text: https://mkremins.github.io/publications/Storylets_SketchingAMap.pdf):
- Common elements: preconditions, effects, content. Four independent dimensions: precondition type, repeatability, internal structure, content selection architecture.
- Table 1 classifies Reigns as: quality-check and location preconditions, usually repeatable, branching internal structure, weighted random selection. The King of Chicago: never repeatable, salience-based. Facade: drama manager. Starfreighter: dynamic-query preconditions (parametrized storylets that "bind" characters/items to named parameters).
- Repeatability options: never repeatable; repeatable unless blocked by hand-authored preconditions; per-storylet choice.
- Masking repetition: "Dynamic assembly ... may help to mask the fact that content is being repeated" via templated text or replacement grammars.

### 5.2 Fallen London structural patterns (HIGH, https://www.failbettergames.com/news/new-narrative-structures)

| Pattern | Mechanism | Life-sim use |
|---|---|---|
| Midnight Staircase | One storylet with many branches that each raise one progress quality; payoffs of rising difficulty unlock off it | "Training for the marathon", "building a startup": repeat actions raise a progress quality, big payoffs unlock later |
| Midnight Buffet | Several parallel progress qualities mixed to unlock outcomes ("a more ambitious storylet might need three or four of them at that level") | Heist-like or complex projects: network + capital + skill |
| Carousel | A timing quality locks/unlocks content phases; last storylet resets it | Annual cycle: exam season, tax season, holidays |
| Grandfather Clock | Fast-cycling progress quality (minute hand) advances a slow main chain (hour hand) | Career ladder: daily performance fills, rank advances |

Pacing lessons (HIGH, https://www.failbettergames.com/news/narrative-snippets-pacing): scatter branches in a "Sometimes deck" that each give a point in a quality; "Give the player goals ... tell the player how far along they are"; keep repeatable content short, "something that a player could do twenty times"; generic content ("stealing a diamond") is reusable.

### 5.3 Life Restart concrete event model (HIGH, https://raw.githubusercontent.com/VickScarlet/lifeRestart/main/packages/data/src/event.types.ts)

Fields on `Event`: `id`, `event` (text), `grade` (0-3 rarity), `postEvent`, `effect` (CHR/INT/STR/MNY/SPR/LIF/AGE), `NoRandom` (not reachable by random draw), `include` (only randomizable if condition holds), `exclude` (never randomizable if condition holds), `branch: {condition, event}[]`, `format`. In `age.types.ts` weights can carry a level suffix `eventId*weight|level`, split into levels (negative and positive). Condition DSL (HIGH, `packages/condition/index.spec.ts`): operators `>`, `>=`, `<`, `<=`, `=`, `!=`, `?` (membership in a list, works on array-valued properties), combined with `&`, `|` and parentheses. Content is authored in xlsx files (`event.xlsx`, `age.xlsx`, `talent.xlsx`, `achievement.xlsx`) and converted to TS types: a spreadsheet-driven pipeline. License MIT; repo had 10,436 stars and last push 2026-10-05 (GitHub API, queried today).

### 5.4 Director/pacing (HIGH, Valve L4D slides, Mike Booth, https://steamcdn-a.akamaihd.net/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf)

Algorithm: estimate "emotional intensity" per Survivor (increase on damage, incapacitation, ledge falls, nearby deaths; decay toward zero over time unless engaged); states Build Up, Sustain Peak (3-5 s), Peak Fade, Relax (30-45 s of minimal threat); goal: "peaks and valleys" because "constant, unchanging combat is fatiguing" and "long periods of inactivity are boring". Slide critique: intensity estimation is "crude, yet the resulting pacing" works.

Transfer to a life sim (OPINION): maintain a hidden `stress/drama` meter per life. Large negative events (death of a parent, bankruptcy) raise it; the director then lowers the weight of further disasters and raises calm/positive pools for 1-3 years ("Relax"), then resumes building tension. This is exactly the RimWorld "storyteller" idea: Cassandra Classic follows a classic structure, Phoebe Chillax gives more downtime, Randy Random picks randomly (HIGH, https://en.wikipedia.org/wiki/RimWorld). Internal RimWorld point formulas: unverified (wiki returned 403).

### 5.5 Chains, flags, cooldowns

| Mechanism | What it does | Source/justification |
|---|---|---|
| Flags / qualities | Boolean or numeric state set by events and read by conditions | Fallen London qualities (HIGH) |
| `include`/`exclude` | Event is only drawable when condition holds / never drawable when it holds | Life Restart (HIGH) |
| `branch` | After an event, jump to a follow-up chosen by condition | Life Restart (HIGH) |
| `NoRandom` | Event reachable only via branch/chain | Life Restart (HIGH) |
| Chained dialogue across runs | Hades: "a large number of potential chained events" (e.g. Eurydice then Orpheus) | HIGH (https://en.wikipedia.org/wiki/Hades_(video_game)) |
| Cooldown / once-per-life / max count | Prevent repetition | Talent `max` field in Life Restart (HIGH); repeatability dimension (Kreminski, HIGH) |
| Scheduled follow-up | "In N years, fire event X if still valid" | OPINION. Not in Life Restart's schema; see our schema section 22 |

### 5.6 Recommended hybrid (OPINION)

Per-year draw like Pattern A (cheap spreadsheet-authored pool), but each entry is a storylet-style object (Pattern B: preconditions, effects, repeatability), weights computed from state (Pattern D deck-style relevance), with a thin director (Pattern E) that applies a pacing multiplier. Skip F and G until later. Rationale: A gives volume, B gives coherence through flags, E controls tone, and F/G cost an order of magnitude more.

---

## 6. Choice design

### 6.1 Choice formats seen

| Format | Example | Notes |
|---|---|---|
| Binary swipe | Reigns (move card left or right; Tinder-inspired; 2M copies by Aug 2019) | HIGH. Very fast, one-handed, fits mobile. |
| 2-4 buttons with attribute check | Life Restart "attribute checks that compare current values against thresholds"; "choice events where you decide the outcome" | MEDIUM (search result summarizing Baidu/App listing) |
| Menu of activities | BitLife (gym, library, vacation) | LOW |
| Schedule grid | Princess Maker 2 | HIGH |
| Tree of experiences | Alter Ego | HIGH |
| Open storylet list | Fallen London (player picks among unlocked storylets) | HIGH |

### 6.2 What makes a choice interesting (OPINION, rationale)

1. Each option trades one resource for another (money vs time vs health vs relationship). A choice with a strictly better option is a dominant strategy and "renders all related decisions meaningless" (HIGH, https://en.wikipedia.org/wiki/Game_balance).
2. Show the cost, hide the odds partially. Visible costs make trade-offs readable; leaving some outcomes uncertain preserves drama.
3. Risk/reward tiers per choice: safe (small, certain), gamble (variance), investment (delayed). Use a probability from a skill check, e.g. `p = clamp(0.1, 0.9, 0.5 + (skill - 50)/100)`.
4. Delayed consequences: write a flag now, resolve in 1-5 years. This is the Fallen London "complicity and consequence" principle (Kennedy named choice, complicity and consequence, with consequence "often seen as the most important", MEDIUM from search summary). Hades implements the same across runs (HIGH).
5. Choices must be recognizable from the card. Reigns' constraint-led design (Alliot GDC talk: constraints with creative flexibility, HIGH on the abstract; mechanics detail unverified) shows that tight formats help authoring speed.

### 6.3 Anti-patterns

- Fake choices (all options reach the same outcome): fine occasionally for flavor, harmful in volume. OPINION.
- Visible dynamic difficulty that players can exploit: "when difficulty adjustment becomes visible, players exploit it" (HIGH, https://en.wikipedia.org/wiki/Dynamic_game_difficulty_balancing).
- Over-long consequence delay with no breadcrumb: players can't learn. OPINION; mitigate with a "life log" that links cause to effect.

---

## 7. Careers, education, skills

### 7.1 Reference data

- BitLife reportedly offers "over 150 different professions" and "over 50 different majors" (LOW, single fan page https://www.playbitlifegame.com/).
- Princess Maker 2: four activity categories (training, part-time jobs unlocked by age, adventure, free time) and a limited annual income (HIGH).
- CK3 lifestyle focuses (Diplomacy, Martial, Stewardship, Intrigue, Learning) with helpful traits per focus (HIGH, https://ck3.paradoxwikis.com/Lifestyle summary).

### 7.2 Real occupational data (HIGH)

O*NET 31.0: 1,016 O*NET-SOC rows ("occupations"), descriptors for skills, knowledge, abilities, work activities, work context, interests (RIASEC), work styles, task statements, education/training/experience; license CC BY 4.0; formats Excel, CSV, JSON, SQL; page last updated 2026-09-22 (https://www.onetcenter.org/database.html). It is a US classification (MEDIUM; training knowledge, not stated on the fetched page). Use as an authoring seed, not as runtime data for every country.

### 7.3 Career model (OPINION)

```ts
interface CareerDef {
  id: string;                    // "software_engineer"
  tracks: Tier[];                // ladder: intern -> junior -> senior -> lead -> exec
  requires: { educationLevel: EducationLevel; skills?: Record<SkillId, number> };
  incomeByCountry: Record<CountryId, { p25: number; p50: number; p90: number }>; // local-currency, year-indexed
  eventTags: string[];           // "office", "creative", "risk", for event pools
  volatility: number;            // layoff/boom sensitivity 0..1
  workHoursEffect: { health: number; happiness: number };
}
interface Tier { rank: number; titleKey: string; salaryMult: number; promotionRule: Condition; }
```

Mechanics to include in MVP: apply/rejection (probability by fit), performance (a hidden stat), promotion through the Grandfather-Clock pattern (performance is the minute hand, rank the hour hand), layoffs tied to country unemployment (section 20), education as a gate with time cost.

Skills: 5-10 broad skills (e.g. analytical, social, creative, physical, craft) rather than hundreds (OPINION). Skills train via action points and decay slowly if unused.

---

## 8. Economy

### 8.1 Components (OPINION, standard personal-finance model)

| Component | Model |
|---|---|
| Income | Job salary (percentile within career tier), side income, passive income (rent, dividends), transfers (family, pension) |
| Expenses | Cost of living (country multiplier), lifestyle tier (frugal/normal/lavish), housing, dependents, healthcare |
| Assets | Cash, investments (stocks/index with variance), property, business, valuables |
| Debt | Student loan, mortgage, consumer debt with interest; default triggers events |
| Inflation | Country-specific annual rate applied to costs and salaries |
| Taxes/benefits | Simplified bracket per country; optional in MVP |

### 8.2 Real inflation range matters (HIGH, World Bank API queried today)

`FP.CPI.TOTL.ZG` (Inflation, consumer prices, annual %), 2023: Nigeria 24.66, United States 4.12, Viet Nam 3.25. The same indicator for 2022: Nigeria 18.85, US 8.00, Viet Nam 3.16. A single global inflation constant would misrepresent Nigeria by roughly 6x relative to the US in 2023.

Design implication (OPINION): store money as "purchasing-power units" (PPU) within each life. Display in local currency and show cost-of-living indices. Avoid simulating exchange rates in the MVP.

### 8.3 Wealth distribution

Income inequality indicator `SI.POV.GINI` is available (2022: Nigeria 33.9, US 41.7, Viet Nam 36.1; 2023 US 41.8; many nulls) (HIGH, World Bank API). Use it as the spread parameter of the family-income draw at birth (log-normal with country mean and Gini-matched sigma). Mapping from Gini to a log-normal sigma: for a log-normal, `Gini = erf(sigma/2)`; this is standard statistics, MEDIUM (not fetched here).

### 8.4 Happiness and money (cap design)

The hedonic-adaptation literature (HIGH, section 3.3) supports diminishing happiness returns to income. The widely-cited Kahneman and Deaton 2010 "$75,000" result could not be fetched (pnas.org 403): unverified. Use diminishing returns without quoting a number.

---

## 9. Relationships

### 9.1 Reference models

| Model | Data | Used by |
|---|---|---|
| Single affinity number per NPC | One int 0-100 | Most mobile life sims (LOW: assumed from BitLife style, not verified) |
| Multi-axis edges + traits | Relationship types, statuses, cultural knowledge | Prom Week (CiF): rules over "social exchanges" and a large set of "sociocultural considerations" (MEDIUM) |
| Social practices | Reactive joint plans offering affordances; agents choose via utility | Versu: "practices never control the agents directly; they merely provide suggestions" (MEDIUM, IEEE/Semantic Scholar summary) |
| Opposite-trait pairs | Traits have opposites (Compassionate/Callous) | CK3 (HIGH, https://ck3.paradoxwikis.com/Traits) |
| Needs + moodlets | Social need and mood | Sims (MEDIUM) |

### 9.2 Evidence for compatibility rules

- Similarity is a primary factor in attraction for friendships and romance; "Similarity seems to carry considerable weight in initial attraction, while complementarity assumes importance as the relationship develops over time"; "perceived but not actual similarity" predicted attraction in a face-to-face initial encounter (HIGH, https://en.wikipedia.org/wiki/Interpersonal_attraction).
- Network size limits: Dunbar proposed about 150 stable relationships, with layers of about 5, 15, 50, 150; replications gave widely varying estimates, so "specifying any one number is of limited value" (HIGH, https://en.wikipedia.org/wiki/Dunbar%27s_number).

### 9.3 Social graph design (OPINION)

```ts
interface Person { id; name; age; sex; traits: TraitId[]; personality: Big5Like; stats: ...; alive: boolean; }
interface Edge   { a: PersonId; b: PersonId; type: "parent"|"child"|"sibling"|"spouse"|"friend"|"coworker"|"rival"|...;
                   affinity: number /*-100..100*/; familiarity: number; romance?: number; flags: string[]; lastInteractionYear: number; }
```

- Track at most about 15 active edges (Dunbar inner layers), others as "acquaintances" that can promote on events. This bounds UI and simulation cost.
- Compatibility = `w1 * similarity(personality) + w2 * sharedInterests + w3 * circumstance`; complement terms enter only after N years together (the timing finding above).
- Affinity decays without interaction (`lastInteractionYear`), rises with shared positive events. Betrayals set flags that persist (delayed consequences).
- Skip Prom Week/Versu-style volition engines in the MVP. They require a large rule base (Prom Week: over 3,500 considerations, MEDIUM) and heavy authoring.

---

## 10. Family, legacy, generational play

| Game | Mechanic | Source |
|---|---|---|
| CK3 | On ruler death play continues with heir provided one exists; dynasty Renown; congenital traits inherited | HIGH (Wikipedia) / MEDIUM (inheritance numbers) |
| Reigns | After each ruler dies a new monarch begins; completed tasks unlock cards that "can have effects spanning multiple generations"; goal: break a curse across centuries | HIGH |
| Wildermyth | Characters age, form friendships or rivalries, acquire traits; legacy-across-campaign details not found in fetched page | MEDIUM; legacy unverified |
| Sims | Genetics and generations (not verified in session) | unverified |
| Life Restart | Not generational: each restart is a fresh life with talent draw | HIGH |

### 10.1 Inheritance numbers

- CK3 (secondary guides): congenital traits rolled per trait; if both parents have the same congenital trait there is an 80% chance the child gets it; for leveled trait chains there is a 50% chance of the next level when both parents share a level (MEDIUM, https://www.thegamer.com/crusader-kings-3-genetic-traits-guide/ as relayed by search; not corroborated on paradoxwikis).
- Heritability of IQ in humans increases with age: "linearly increasing heritability of intelligence from infancy (20%) through adulthood (60%)" (the Wilson effect) (HIGH, https://en.wikipedia.org/wiki/Heritability_of_IQ).

### 10.2 Inheritance model (OPINION built on the above)

`childStat = h(age) * midParent + (1 - h(age)) * populationMean + noise`, with `h` rising from 0.2 to 0.6 over childhood. Because heritability is 0.2-0.6 rather than 1, children regress toward the mean: this is realism that also prevents dynasty snowballing. Wealth inheritance is explicit (estate, taxes, will), traits pass by probability, personality is partly inherited and partly shaped by events.

### 10.3 Generational play loop (OPINION)

On death, offer "Continue as child/relative" with carry-over: assets after estate rules, 1-2 inherited traits, family reputation, unlocked "cards". Choose heir among 1-3 candidates. This gives a second-order retention loop (CK3, Reigns) at a small cost: reuse the same engine with new stats.

---

## 11. Health, aging, death

### 11.1 Realistic vs fun (OPINION)

| Approach | Behavior | Risk |
|---|---|---|
| Realistic baseline | Death age sampled from actuarial hazards | Early deaths feel unfair; realistic mortality kills about 0.5% to 7% of newborns depending on country (see data below) |
| Fun-first | Death mostly from player-driven risks (illness events, risky choices) | Unrealistic centenarians |
| Hybrid (recommended) | Hazard = real baseline by country/age/sex x health multiplier x risk events; early-life death suppressed optionally by "protected years" setting | Needs tuning |

BitLife reportedly allows "120+ years with optimal health management" (LOW).

### 11.2 Actuarial data sources

| Source | What | Access | Confidence |
|---|---|---|---|
| WHO Global Health Observatory | Life tables nMx, nqx, lx, ndx, nLx, Tx, ex for 186 Member States 2000-2021 (abridged) | Free API | HIGH (https://www.who.int/data/gho/data/indicators/indicator-details/GHO/gho-ghe-life-tables-nqx-probability-of-dying-between-ages-x-and-x-n; methods https://cdn.who.int/media/docs/default-source/gho-documents/global-health-estimates/ghe2021_lifetable_methods.pdf) |
| UN World Population Prospects 2024 revision (28th edition) | Annual counts to 2023 for 237 countries/territories, medium/low/high projections to 2100, mortality/fertility/migration by age and sex | Download portal | HIGH on contents (https://en.wikipedia.org/wiki/World_Population_Prospects); whether a newer revision exists as of 2026-10: unverified |
| US SSA period life table | Death probability and life expectancy by single year of age and sex | Free; pages exist at https://www.ssa.gov/oact/STATS/table4c6.html and download area https://www.ssa.gov/OACT/Downloadables/CY/index.html | MEDIUM: contents confirmed by search snippet only; direct fetch blocked (403) |
| World Bank WDI | Life expectancy at birth `SP.DYN.LE00.IN` (2023: Nigeria 54.46, US 78.39, Viet Nam 74.59), infant mortality `SP.DYN.IMRT.IN` (2023: Nigeria 70.1, US 5.5, Viet Nam 12.4 per 1,000) | Free API | HIGH (queried today) |

Gompertz-Makeham law: hazard `mu(x) = alpha * e^(beta*x) + lambda` with alpha a scale, beta the exponential rate of increase with age, lambda background mortality; "well approximated ... from roughly ages 40 to 90"; not intended for infancy and early childhood; late-life plateau is debated (HIGH, https://en.wikipedia.org/wiki/Gompertz%E2%80%93Makeham_law_of_mortality).

WHO data format facts (HIGH, API queried today: `https://ghoapi.azureedge.net/api/LIFE_0000000030`): indicator `LIFE_0000000030` is "nqx - probability of dying between ages x and x+n"; rows are age bands (`AGEGROUP_YEARS00-01`, `01-04`, `05-09`, ... `80-84`, `85PLUS`) with `Dim1` = sex (`SEX_BTSX` both sexes). Bands after the first two are 5-year probabilities, so annual hazard `q = 1 - (1 - nqx)^(1/n)`.

Sample values, both sexes, 2021 (WHO API):

| Age band | Viet Nam nqx (5-yr) | USA nqx (5-yr) |
|---|---|---|
| 0-1 | 0.0133 | 0.0054 |
| 20-24 | 0.0042 | 0.0056 |
| 40-44 | 0.0138 | 0.0155 |
| 60-64 | 0.0663 | 0.0634 |
| 80-84 | 0.3814 | 0.2833 |

Derived (my calculation from the table): annual hazard at 60 vs 80 is 0.0136 vs 0.0916 for Viet Nam and 0.0130 vs 0.0644 for the USA, giving a hazard doubling time of about 7.3 years (VNM) and 8.7 years (USA) between 60-64 and 80-84 bands, consistent with Gompertz-like growth. 2021 may include pandemic excess mortality (the US WB life expectancy rises from 77.43 in 2022 to 78.39 in 2023 while WHO's 2021 e0 is 76.4); that is an inference (LOW).

### 11.3 Monte Carlo check: does a WHO-table-driven sim reproduce real life expectancy? (my computation, run in this session)

Method: convert each 5-year nqx to annual hazards, extrapolate 85+ with an assumed growth (hazard x1.09 per year, capped at 0.6; this is my assumption), simulate 200,000 lives per country, compare mean age at death to WHO e0 (`WHOSIS_000001`, 2021, both sexes).

| Country | WHO e0 2021 | Simulated mean age at death | q at ages 20 / 40 / 60 / 80 | q0 |
|---|---|---|---|---|
| Viet Nam | 74.0 | 74.1 | 0.0008 / 0.0028 / 0.0136 / 0.0916 | 0.0133 |
| USA | 76.4 | 76.6 | 0.0011 / 0.0031 / 0.0130 / 0.0644 | 0.0054 |
| Nigeria | 61.6 | 61.2 | 0.0014 / 0.0046 / 0.0204 / 0.1360 | 0.0696 |

Conclusion (HIGH, reproducible): a table-driven hazard engine matches published life expectancy within 0.4 years. Cost to build: about 30 lines. Core of the script:

```python
# per band: ann = 1 - (1 - nqx) ** (1 / n)   (n = band width in years)
# for x in range(85, 121): h[x] = min(0.6, h[x-1] * 1.09)       # assumption
# life = first age a where random() <= h[a]; mean over 200k lives vs WHO e0
```

### 11.4 Health model (OPINION)

- `health` 0-100 visible; hidden `conditions[]` (chronic illness with progression). Mortality multiplier `m = exp(gamma * (50 - health)/50)` with `gamma ~ 1` (to tune), applied to the baseline annual hazard; accident and illness events add separate hazards.
- Healthcare quality scales with country (use WB indicators) and wealth (treatment access).
- "Near-death" events get a save roll (preserves drama): hazard is realized as an event ("You collapse...") with an outcome table, not a silent roll.

---

## 12. Crime and risk

Evidence base is weak: BitLife's crime system ("quick cash but carry high risks of imprisonment", Crime Lord challenge) is from a fan page (LOW).

Design pattern (OPINION):
- Crime action = `{ payoff, detectionProb, severity, skillReq }`. `detectionProb` rises with a hidden `heat` stat and decays over time (the same shape as Left 4 Dead intensity: increase on actions, decay toward zero, HIGH, section 5.4).
- Consequences use the event engine: arrest event with branches (plea, fight, flee), prison = year skips with flags (criminal record blocks careers, SPR penalty, relationships decay).
- Cross-cultural legal differences (death penalty, drug laws) must be data-driven per country and content-rated for stores; decision belongs to the product/legal owner. Not researched here.

---

## 13. Luck/fate vs agency

Key idea (OPINION; concept from training knowledge, source unverified): "input randomness" (random before the player decides) is more fun than "output randomness" (dice after the decision). Life sims are mostly output randomness, so agency must come from (a) resource allocation before the roll and (b) visible odds.

Tools to keep luck feeling fair:

| Tool | What | Confidence |
|---|---|---|
| Visible pre-life luck | Life Restart: draw 10 talents, keep 3, allocate points (search result: 30 points over 4 attributes; MEDIUM; the data schema has `points` talent modifiers, HIGH) | MEDIUM/HIGH |
| Rarity tiers with weights | Talent grades White/Blue/Purple/Orange (HIGH, `talent.types.ts`); reported weights Legendary 6, Epic 16, Rare 34, Common 44 over 56 talents (MEDIUM, search snippet) | MEDIUM |
| Pseudo-random distribution (chance rises after failures) | Used in some games (Dota 2) | unverified (Wikipedia fetch returned 404) |
| Shuffle bag / deck | Draw without replacement so rare events appear predictably in the long run | Reigns "deck" framing (HIGH) |
| Alias method | O(1) draws from weighted tables; setup O(n) or O(n log n) | HIGH (https://en.wikipedia.org/wiki/Alias_method); unnecessary for tables of tens of items |
| Seeded RNG per life | Reproducible lives, replay codes, share seeds, test determinism | OPINION |

---

## 14. Difficulty and fail states

| Game | Fail state | Source |
|---|---|---|
| Reigns | Any bar full or empty ends the reign; game continues with a new ruler | HIGH |
| Tamagotchi | Neglect, illness, old age | HIGH |
| Life Restart | Life ends at death; a "LIF" stat modifies lifespan | HIGH (field in `EventEffect`) |
| Stardew | Passing out at 2am costs up to 1,000 gold, no penalty in bed | HIGH |
| CK3 | Stress breakdowns "negative and even lethal outcomes" | HIGH |
| Hades | Death is progression ("taken by the river Styx back to the House of Hades") | HIGH |
| Roguelikes | Permadeath "to put weight on every decision" | HIGH (https://en.wikipedia.org/wiki/Roguelike) |

Life sims have a built-in fail state (death). The design problem is making failure interesting before death: "soft fails" such as poverty, prison, divorce, depression that are survivable and generate story (OPINION, rationale: Dwarf Fortress "tantrum cascades" are the best-known game stories, "story generator" in Tarn Adams's words, HIGH https://en.wikipedia.org/wiki/Dwarf_Fortress).

Difficulty options:
- Static start difficulty (rich vs poor family, country).
- Opt-in player-controlled modifiers, like Hades' Pact of Punishment ("manually customize difficulty", HIGH).
- Hidden adaptive difficulty (DDA): known examples Resident Evil 4 hidden Difficulty Scale 1-10, Left 4 Dead director; players exploit visible DDA; a 2020 lawsuit against EA alleged undisclosed DDA used to encourage loot-box purchases, voluntarily dismissed in 2021 (HIGH, https://en.wikipedia.org/wiki/Dynamic_game_difficulty_balancing). OPINION: use only pacing-level director (section 5.4), not outcome rigging, and never tie it to monetization.

---

## 15. Endings and life scoring

### 15.1 Reference

- Princess Maker 2: "74 possible endings", determined by the daughter's career outcome, with a retrospective sequence before final evaluation (HIGH).
- Life Restart: end of life shows a full summary, achievements, and "revisit all the lives you've lived" (MEDIUM, search result); achievements have trigger moments START, TRAJECTORY, SUMMARY, END (HIGH).
- Alter Ego: reviewers said it is "fascinating the first time out" but becomes repetitive (Charles Ardai) (HIGH): endings and variety must support replay.
- Reigns: reign ends on bar extremes with a death text; a meta-goal spans reigns (HIGH).

### 15.2 Peak-end rule (HIGH, https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule)

People evaluate experiences mainly by "their most intense moment and their conclusion", not total or duration. Implication (OPINION): the life summary must show the best peak (e.g. "Highlight of your life") and a strong last scene; make the final year's event authored and emotional rather than random.

### 15.3 Scoring structure (OPINION)

```ts
interface LifeScore {
  axes: { wealth: number; happiness: number; relationships: number; legacy: number; health: number; achievement: number }; // 0..100 each, percentile vs generated population
  title: string;           // e.g. "The Quiet Craftsman" from rule table over axes
  peakMoment: EventLogRef; // highest |intensity| event
  finalScene: EventLogRef;
  seedChallenges: string[];// next-life modifiers earned
}
```

Normalize each axis against the starting conditions (country, family wealth) so a poor-start success scores higher than a rich-start coast: otherwise the score just reports luck. The scoring formula needs simulation (section 21) to ensure each title is reachable but rare.

---

## 16. Replay variety and meta-progression

| Technique | Example | Confidence |
|---|---|---|
| Random starting package (country, family, talents) | Life Restart talent draw | HIGH/MEDIUM |
| Hidden/rare events | Event `grade` 0-3 | HIGH |
| Meta-progression unlocks | Roguelites: "a metagame whereby achieving certain goals will unlock persistent features such as ... new items" | HIGH |
| Narrative carry-over | Hades dialogue advances each run | HIGH |
| Dynasty carry-over | Reigns, CK3 | HIGH |
| Templated/grammar text to hide repetition | Epitaph, Ice-Bound (Kreminski Table 1) | HIGH |
| Procedural history | Caves of Qud generates sultans and history each run ("five randomly generated ancient rulers", HIGH Wikipedia) | HIGH |

Rule of thumb (OPINION): variety comes from preconditions (the same event pool filters differently per life) more than from raw volume. Life Restart reportedly has over 1,500 events (MEDIUM) but an individual life shows only tens, so filter diversity matters. Reference Fallen London: content "tends to be uninteresting until there are a fair number of storylets" (HIGH): plan a content threshold before launch.

---

## 17. Achievements and collections

- Life Restart schema (HIGH): `Achievement {id, name, description, grade 0-3, condition, hide, opportunity: START|TRAJECTORY|SUMMARY|END}`. Conditions reuse the same DSL as events. `hide` allows secret achievements.
- Collections: completed lives, endings seen (PM2 has 74), talents/traits discovered, countries lived in (OPINION).
- Caution: gamification critiques note simple reward systems can replace "true game mechanics" and may create "an artificial sense of achievement" (Radoff, Deterding; HIGH, https://en.wikipedia.org/wiki/Gamification). Prefer achievements that reveal systems (e.g. "survive bankruptcy and recover") over counters.
- Peer reference (unverified): Hamari and Eranti's achievement design framework could not be fetched.

---

## 18. Mini-games

Evidence: Tamagotchi happiness rises by "playing mini-games with the pet or by feeding it a snack" (HIGH). Princess Maker 2 includes October festivals with martial tournaments, dance parties, art exhibitions, cooking competitions (HIGH). No mini-game evidence from BitLife or Life Restart in this session.

OPINION: mini-games are optional replacements for a probability roll on high-drama checks (interview, exam, court, duel). Rules: under 15 seconds, result = modifier (+/- 20% of roll success), always skippable (auto-resolve with the stat-based probability), reused across contexts (one timing game styled differently), and never required for progression. Build after the core loop proves retention.

---

## 19. Procedural generation of characters and worlds

### 19.1 Character at birth (OPINION structure; data sources HIGH)

1. Sample country (weighted by population or player choice). Population/demography from UN WPP, WB.
2. Sample birth year/era (modern only in MVP; era packs later).
3. Sample sex, family wealth (country mean + Gini-based spread), parents' ages (fertility rates: WB `SP.DYN.TFRT.IN`, 2023: Nigeria 4.48, US 1.62, Viet Nam 1.91; HIGH), siblings count (from fertility), health/looks/intelligence from a population distribution adjusted by family wealth.
4. Personality: sample a small trait set. Dwarf Fortress shows the distribution shape: most facets neutral, extremes rare (78% in the 40-60 band, 0.4% at 91-100, HIGH). Sims 4 uses a fixed small number (3 traits for adults, 2 for children and teens, HIGH). Choose 2-3 traits plus continuous Big-Five-like hidden values.
5. Name from locale data.

### 19.2 Names

| Option | Notes | Confidence |
|---|---|---|
| Faker (Python, MIT) | Locale-specific names, addresses, jobs; locales bg_BG through zh_TW | HIGH (https://faker.readthedocs.io/en/master/) |
| `philipperemy/name-dataset` | 730K first and 983K last names across 105-106 countries, Apache-2.0, but derived from the 2021 Facebook data leak of 533M users | HIGH on description (https://github.com/philipperemy/name-dataset). Recommendation (OPINION): do not ship it. Provenance is a leaked personal-data set, a legal and reputational risk even if "lists of names are not copyrightable" as the README argues. |
| Hand-curated lists per country (top 200 first, 200 last, from national statistics offices) | Safest provenance; sources per country unverified | unverified |

### 19.3 World and era generation

- World history generators exist at high cost (Dwarf Fortress simulates up to 2,000 years with "thousands of agents following loose turn rules", HIGH; Qud's state machine + grammar, MEDIUM). Not needed for MVP.
- Cheap alternative (OPINION): a "world state" per life with 5-10 macro variables (economic cycle, pandemic, war, tech level) advanced by a seeded random walk; these feed event weights (recession raises layoff weight, section 23).
- Era: CK3 uses three start dates (867, 1066, 1178) as scenario selection (HIGH). A life sim can offer "decade packs" later (1950, 1980, 2010) with different data tables, events, tech.

---

## 20. Cultural and regional customization with real statistics

### 20.1 Data sources, license and verification

| Source | Use | License / access | Evidence |
|---|---|---|---|
| World Bank WDI API (`https://api.worldbank.org/v2/country/{ISO3}/indicator/{code}?format=json`) | GDP/capita, inflation, fertility, unemployment, enrollment, Gini, infant mortality, life expectancy | CC BY 4.0 is "the default license for all Datasets produced by the World Bank itself"; attribution required; third-party data may have other terms | HIGH (https://datacatalog.worldbank.org/public-licenses); API verified 2026-10-06; WDI source `lastupdated` 2026-07-13; 296 entries in `/country` |
| UN WPP | Demography by age/sex, mortality, fertility, migration | License not verified this session | HIGH on contents (Wikipedia), license unverified |
| WHO GHO | Life tables, health indicators | License not verified this session | HIGH on API |
| O*NET | Occupation descriptors | CC BY 4.0 | HIGH |
| ILO/OECD wages, UNESCO education | Wage and schooling gaps | Not checked | unverified |

Verified sample (World Bank API, 2023 unless noted):

| Indicator | Nigeria | USA | Viet Nam |
|---|---|---|---|
| Life expectancy at birth (`SP.DYN.LE00.IN`) | 54.46 | 78.39 | 74.59 |
| GDP per capita, current US$ (`NY.GDP.PCAP.CD`) | 2,139 | 82,587 | 4,323 |
| Fertility rate (`SP.DYN.TFRT.IN`) | 4.48 | 1.62 | 1.91 |
| Unemployment, % of labor force (`SL.UEM.TOTL.ZS`) | 3.07 | 3.64 | 1.65 |
| Infant mortality per 1,000 (`SP.DYN.IMRT.IN`) | 70.1 | 5.5 | 12.4 |
| Gini (`SI.POV.GINI`), latest nonnull in range | 33.9 (2022) | 41.8 | 36.1 (2022) |
| Secondary school enrollment, % gross (`SE.SEC.ENRR`) | 46.9 | 97.5 (2022) | 93.4 (2022) |

Data-quality caution (HIGH): many values are null for recent years (e.g. Gini and enrollment), and Nigeria unemployment 3.07% (modeled ILO estimate) is far below lived-experience realism for informal economies. Treat the API as a seed table with overrides, and snapshot values into the repo with year and indicator code for reproducibility.

### 20.2 What to localize

| Layer | Source of truth | MVP? |
|---|---|---|
| Demography, mortality, fertility | WHO/UN/WB | Yes |
| Income level, inequality, inflation | WB | Yes |
| Education system stages/ages and costs | National data; manual | Simplified |
| Occupations and pay | O*NET shapes plus per-country multipliers | Simplified |
| Events (holidays, military service, exams, social norms) | Authored per culture | Later, start with 3-5 countries |
| Language, names | Locale data | Names yes, full translation later |

### 20.3 Cultural dimensions: caution

Hofstede's six dimensions (power distance, individualism, motivation towards achievement and success, uncertainty avoidance, long-term orientation, indulgence), from IBM surveys of 117,000 employees (1967-1973) covering 76 countries/regions; criticized for sampling bias ("privileged males working as engineers or sales personnel") and for ignoring within-country variation (HIGH, https://en.wikipedia.org/wiki/Hofstede%27s_cultural_dimensions_theory). OPINION: avoid driving gameplay from national stereotypes; use measurable structural data (income, schooling, fertility) for mechanics and reserve culture for authored flavor reviewed by locals.

---

## 21. Balancing methods

### 21.1 Methods

| Method | What | Evidence |
|---|---|---|
| Monte Carlo simulation | Run N lives with scripted/random policies; measure distributions. Error shrinks as `1/sqrt(N)`, so 4x samples halves the error | HIGH (https://en.wikipedia.org/wiki/Monte_Carlo_method) |
| Dominant-strategy search | "Dominant strategies ... render all related decisions meaningless"; find by simulating policies (always study, always work out, always gamble) | HIGH (https://en.wikipedia.org/wiki/Game_balance) |
| Power curves/cost curves | Ratio of power to cost per option; apply to actions and purchases | HIGH (Wikipedia Game_balance); Schreiber's Game Balance Concepts pages returned 404 |
| Telemetry | Choice rates, event frequency, death age distribution, churn by age | General practice; specific citations unverified |
| Playtesting | Add new testers periodically to avoid practice effects | HIGH (Game_balance) |
| Expressive range analysis | Compare distribution of generated outputs on metrics | unverified (Smith and Whitehead 2010; not fetched) |
| Machinations (Dormans) | Resource-flow diagrams for economy loops | unverified (Wikipedia 404) |

### 21.2 Metrics to track in the simulator (OPINION)

1. Age-at-death distribution per country vs WHO (target within 0.5 years of e0; validated approach in 11.3).
2. Events per life, by category, and share of lives that see each event (flag dead content, over-exposed content).
3. Choice dominance: any option chosen more than a set share in simulated "reasonable" policies.
4. Wealth distribution at 40 and 65 vs country Gini.
5. Score-axis distribution: each title reachable by between 0.1% and 30%.
6. Stat saturation: share of lives with a stat pinned at the cap at some age.
7. Crash tests: invalid state (negative money, impossible relationships).

### 21.3 Harness shape (OPINION)

```ts
// Pure core: step(state, input, rng) -> state. No I/O, deterministic with seed.
function simulate(seed: number, policy: Policy, content: ContentPack): LifeResult { ... }
// Batch: for s in 0..N: simulate(s, policy, content) -> aggregate metrics -> assert bounds in CI
```

Run in CI on every content change, with policy set {passive, balanced, optimizer, gambler}. Same engine runs in the app and in the test harness (Functional Core, Imperative Shell).

---

## 22. Core data structures (pseudo-TypeScript, OPINION synthesis of sections above)

```ts
// ---------- Qualities: one store for stats, flags, items, progress (Fallen London idea) ----------
type QualityId = string;                     // "health", "skill.analytical", "flag.hadCovid", "progress.marathon"
interface QualityDef {
  id: QualityId;
  kind: "stat" | "skill" | "flag" | "counter" | "relationship" | "item";
  min: number; max: number;                  // bounds, e.g. 0..100; flags 0..1
  visible: boolean;                          // shown in UI?
  initial: number | { dist: "normal"|"uniform"|"lognormal"; params: number[] };
  decay?: { toward: number; ratePerYear: number };      // mean reversion (hedonic adaptation)
  ageCurve?: { fromAge: number; driftPerYear: number }; // aging drift
  derivedFrom?: string;                      // expression, if computed not stored
}

// ---------- Conditions: data, not code. Same DSL for events, achievements, talents ----------
// String DSL (borrowed from Life Restart): "age>=18 & health>20 & (job.sector?[1,2,3] | wealth>5000)"
type Condition = string | ConditionNode;
type ConditionNode =
  | { all: Condition[] } | { any: Condition[] } | { not: Condition }
  | { q: QualityId; op: ">"|">="|"<"|"<="|"="|"!="|"in"; v: number | number[] }
  | { stage: LifeStage[] } | { country: CountryId[] } | { hasEdge: { type: string; minAffinity?: number } };

// ---------- Effects ----------
type Effect =
  | { q: QualityId; add?: number; set?: number; mulBy?: number }
  | { schedule: { event: string; inYears: [number, number]; onlyIf?: Condition } } // delayed consequence
  | { addEdge: EdgeSpec } | { editEdge: { target: string; affinity?: number } }
  | { log: string; intensity: number }       // feeds peak-end summary and director
  | { endLife: { cause: string } };

// ---------- Events (storylets) ----------
interface EventDef {
  id: string;
  pool: "annual" | "age:N" | "chain" | "trigger"; // "chain" = reachable only via branch/schedule (Life Restart NoRandom)
  tags: string[];                            // "career","negative","economy" for director/pacing
  requires: Condition;                       // preconditions (Kreminski)
  weight: { base: number; modifiers: { when: Condition; mul?: number; add?: number }[] };
  repeat: { maxPerLife: number; cooldownYears: number }; // repeatability dimension
  intensity: number;                         // 0..10 drama, for director
  text: Record<Locale, string>;              // templated: "Your boss {boss.name} calls you in."
  choices?: Choice[];                        // empty = auto event
  effects?: Effect[];                        // applied if no choices
}
interface Choice {
  id: string; textKey: string;
  requires?: Condition;                      // gated options
  cost?: Effect[];                           // visible costs
  outcomes: { weight: number | Expr; when?: Condition; effects: Effect[]; nextEvent?: string; logKey: string }[];
}

// ---------- World / country ----------
interface CountryProfile {
  id: string; iso3: string;
  lifeTable: { sex: "M"|"F"|"B"; nqx: Record<string, number> };   // WHO age bands, snapshot year recorded
  economy: { gdpPerCapitaUSD: number; gini: number; inflation: number; unemployment: number };
  demography: { tfr: number; urbanShare?: number };
  education: { enrollmentSecondary: number; stageAges: number[] };
  dataYear: Record<string, number>;          // provenance per field
  sources: string[];                         // indicator codes
}

// ---------- Director ----------
interface Director {
  intensity: number;                         // hidden "emotional intensity" (L4D)
  phase: "buildUp" | "sustainPeak" | "peakFade" | "relax";
  tagMultiplier(tag: string): number;        // e.g. negative: 0.3 during relax
}
```

Engine contract: `step(state, rng): state` per year: (1) update derived/decay, (2) compute mortality hazard, (3) director updates intensity and phase, (4) collect eligible events (`requires` true, repeat rules OK), (5) compute weights, apply director multipliers, (6) draw 1 major plus 0-2 minor, (7) resolve choice, apply effects, schedule follow-ups, (8) log.

---

## 23. Worked example: one event with weights, conditions, choices, effects

### 23.1 Event JSON

```json
{
  "id": "career.layoff.restructuring",
  "pool": "annual",
  "tags": ["career", "negative", "economy"],
  "intensity": 6,
  "requires": "stage?[2,3] & job.active=1 & job.tenureYears>=1 & age>=22 & age<=64 & !flag.laidOffRecently",
  "repeat": { "maxPerLife": 4, "cooldownYears": 3 },
  "weight": {
    "base": 6,
    "modifiers": [
      { "when": "country.unemployment>8", "mul": 1.5 },
      { "when": "job.performance<40",     "mul": 2.0 },
      { "when": "job.union=1",            "mul": 0.5 },
      { "when": "world.recession=1",      "mul": 1.8 }
    ]
  },
  "text": { "en": "{employer} announces a restructuring. Your role is on the list." },
  "choices": [
    {
      "id": "negotiate",
      "textKey": "choice.negotiate",
      "requires": "skill.negotiation>=30",
      "outcomes": [
        { "weight": "clamp(0.1,0.9, 0.5+(skill.negotiation-50)/100)",
          "effects": [ { "q": "money", "add": 3 }, { "q": "job.active", "set": 1 }, { "q": "happiness", "add": 3 } ],
          "logKey": "log.negotiate.win" },
        { "weight": "1-clamp(0.1,0.9, 0.5+(skill.negotiation-50)/100)",
          "effects": [ { "q": "job.active", "set": 0 }, { "q": "money", "add": 1 }, { "q": "happiness", "add": -8 },
                       { "schedule": { "event": "career.jobsearch.outcome", "inYears": [1, 2] } } ],
          "logKey": "log.negotiate.lose" }
      ]
    },
    {
      "id": "retrain",
      "textKey": "choice.retrain",
      "cost": [ { "q": "money", "add": -2 }, { "q": "time.actionPoints.nextYear", "add": -2 } ],
      "outcomes": [
        { "weight": 1,
          "effects": [ { "q": "job.active", "set": 0 }, { "q": "progress.retraining", "set": 1 },
                       { "schedule": { "event": "career.retrain.payoff", "inYears": [2, 3], "onlyIf": "progress.retraining>=1" } } ],
          "logKey": "log.retrain.start" }
      ]
    },
    {
      "id": "take_severance",
      "textKey": "choice.severance",
      "outcomes": [
        { "weight": 1,
          "effects": [ { "q": "money", "add": 4 }, { "q": "job.active", "set": 0 }, { "q": "flag.laidOffRecently", "set": 1 },
                       { "schedule": { "event": "career.jobsearch.outcome", "inYears": [1, 1] } } ],
          "logKey": "log.severance" }
      ]
    }
  ]
}
```

Notes: `money` is in purchasing-power units (section 8.2). `stage?[2,3]` uses the Life Restart-style `?` membership operator (HIGH syntax source). The `!` negation of a flag is my extension (not verified in the Life Restart DSL tests I read). Delayed consequences are `schedule` effects (my extension; Life Restart uses `branch`).

### 23.2 Selection step: weights in a pool

Pool for a 35-year-old employee (weights are my illustrative values):

| Event | Base weight | Modifiers |
|---|---|---|
| promotion | 8 | x2 if performance > 70; x0.5 if tenure < 1 year |
| layoff (the JSON above) | 6 | see JSON |
| health_scare | 5 | x(1 + max(0, 60 - health)/100) |
| windfall | 2 | none |
| quiet_year (filler) | 40 | none |

### 23.3 Computed probabilities (my script, 200,000 draws each; verified)

| State | Weights (promo / layoff / health / windfall / quiet) | Total | P(layoff) theoretical | P(layoff) empirical |
|---|---|---|---|---|
| A: mid performer (55), normal economy (unemp 4), health 70 | 8 / 6 / 5 / 2 / 40 | 61.00 | 0.0984 | 0.0993 |
| B: low performer (30), unemp 10, health 45 | 8 / 18 / 5.75 / 2 / 40 | 73.75 | 0.2441 | 0.2446 |
| C: top performer (85), union, health 80 | 16 / 3 / 5 / 2 / 40 | 66.00 | 0.0455 | 0.0463 |

(State B layoff weight: 6 x 1.5 (unemployment above 8) x 2.0 (performance below 40) = 18.) Reading: the same pool yields about a 2.5x higher layoff probability for the poorly performing worker in a weak economy than for the average worker, and about 5x higher than for a protected top performer. This is the "relevance" effect the Reigns deck uses ("highly relevant to the current game state may be dealt into the 'deck' multiple times", HIGH). Filler weight (40) controls event density: 40 of 61 means about 66% of years are quiet in state A, which tunes pacing without changing any event.

---

## 24. Minimum viable systems set vs later

### 24.1 MVP (OPINION, ordered by dependency)

| # | System | Why now |
|---|---|---|
| 1 | Year-turn clock with seeded RNG and pure `step()` function | Everything depends on it; enables sim testing |
| 2 | Quality store: 4-5 visible stats + hidden flags/skills (3.2) | One data model for all content |
| 3 | Life stages with age-based pool selection (4) | Content organization |
| 4 | Event engine: weighted pool + preconditions + effects + cooldown + `schedule` follow-ups (5, 22) | Core loop |
| 5 | Choices: 2-3 options with cost, odds, delayed consequence (6) | Agency |
| 6 | Birth generator: country (3-5), family wealth, 2-3 traits, name (19) | Replay start variety |
| 7 | Mortality from WHO life tables x health multiplier (11) | Realistic and cheap, validated |
| 8 | Education + job ladder, 15-30 careers, salary by country multiplier (7, 8) | Main life spine |
| 9 | Money: income/expenses/cash/debt in PPU, country inflation (8) | Consequence engine |
| 10 | Relationships: family + partner + friends, affinity, cap about 15 active (9) | Emotional payload |
| 11 | End-of-life summary with peak and final scene, score axes, title (15) | Replay trigger |
| 12 | Simulation harness: 10k-life batch in CI, mortality calibration, dominance checks (21) | Prevents balance rot |
| 13 | Director-lite: pacing multiplier from recent intensity (5.4) | Better rhythm for small cost |
| 14 | Spreadsheet-to-JSON content pipeline (as in Life Restart, 5.3) | Writer throughput |

### 24.2 Later

| System | Why later |
|---|---|
| Generational play and heir takeover (10) | Needs stable engine; strong retention add-on |
| Action-point yearly menu (2.2) | Can start as simple "focus" pick; expand |
| Crime/prison arc (12) | Content-heavy; content-rating concerns |
| Mini-games (18) | Prove loop first |
| Investments/property/business depth (8) | Economy tuning cost |
| Talent draw / meta-progression / achievements (16, 17) | Layer after core retention measured |
| More countries, eras, localization of events (20) | Content volume |
| NPC volition / social practices (9, 5.1 F) | Authoring cost very high |
| History generation / world sim (19.3) | Not needed for single-life scope |
| Hidden adaptive difficulty beyond pacing (14) | Ethical and exploit risk |

---

## 25. Implications for our mobile life-sim game

1. Build Family A (ledger plus event table) first. Cheapest to author, proven by Life Restart's 1,500-event scale and BitLife-style tap loop; borrow Family B ideas (traits, needs-like stress) as hidden variables only. (OPINION; sections 1, 5)
2. Use one `quality` store for stats, flags, skills, progress. It collapses content authoring to one data type, exactly Fallen London's simplification. (HIGH basis, section 5, 22)
3. Event selection = per-age weighted pool whose weights are computed from state; add preconditions, cooldown, `maxPerLife`, and scheduled follow-ups. This is a storylet system in Kreminski's terms (preconditions, effects, content; weighted random selection like Reigns). (HIGH basis, section 5.1, 23)
4. Add a thin director: hidden intensity meter, calm years after crises. L4D showed peaks-and-valleys beat constant intensity; RimWorld storytellers package the same idea. (HIGH basis, section 5.4)
5. Keep 4-5 visible stats; bound both ends for at least one stat (Reigns pattern) to force trade-offs; let happiness mean-revert (hedonic adaptation) so "win everything" does not exist. (HIGH basis, section 3)
6. Drive mortality from WHO life tables times a health multiplier. A 200k-life Monte Carlo reproduced e0 within 0.4 years for Viet Nam, USA and Nigeria, so realism costs about 30 lines and a snapshot of data. (HIGH, section 11.3)
7. Snapshot country data (World Bank CC BY 4.0, WHO, UN) into the repo with year and indicator code; handle nulls and overrides; attribute sources. Inflation and starting wealth differ enough across countries (Nigeria 24.7% vs Viet Nam 3.3% CPI in 2023) that a single global economy would mislead. (HIGH, section 8.2, 20)
8. Make agency visible: yearly action-point allocation plus 2-3 option choices with costs and odds; use "progress quality" patterns (Staircase, Grandfather Clock) with visible goal bars. (HIGH basis for patterns; OPINION for application; section 2.2, 5.2, 6)
9. Delayed consequences are the engine of regret and replay: invest in `schedule` effects and a life log connecting cause to result. (HIGH basis: Hades, Fallen London; section 6.2)
10. Design the ending for memory, not for accuracy: peak plus final scene, normalized multi-axis score vs starting conditions, many titles. Peak-end rule evidence is strong; Princess Maker 2's 74 endings show the appetite. (HIGH, section 15)
11. Replay hooks: random starting package (country, family, 2-3 traits, optionally a talent draw), rare event grades, collections of endings/lives. Do the filtering logic (preconditions) before the volume. (MEDIUM/HIGH, section 16)
12. Ship a simulation harness on day one (pure `step(state, rng)`, seeded RNG, batch runs in CI). It tests mortality, wealth distribution, dominant choices and score-title reachability on every content change. (HIGH basis for Monte Carlo and dominant-strategy risk; section 21)
13. Do not ship `name-dataset` (derived from the Facebook leak); use Faker (MIT) or curated lists with documented provenance. (HIGH on facts; OPINION on decision; section 19.2)
14. Avoid hidden adaptive difficulty tied to outcomes or monetization; keep any director at pacing level and consider player-visible difficulty modifiers (Hades Pact of Punishment). (HIGH on the controversy; OPINION; section 14)
15. Defer generational play, crime depth, mini-games, social volition engines, and history simulation; each is a separate content or AI investment. Generational play is the best first add-on because it reuses the same engine (CK3, Reigns). (OPINION; section 24)

---

## 26. Gaps and unverified items

| Item | Status |
|---|---|
| BitLife internals (stats, careers counts, crime, odds) | LOW: two fan sites only; no primary source; Wikipedia has no article. Competitor teardown should come from direct play or store data (other agent). |
| SSA US life table numbers | Page blocked (403); not used in calculations. WHO API used instead. |
| RimWorld storyteller internals (wealth points, threat curves) | Not verified (wiki 403). |
| The Sims needs list and decay rates | Not verified (fetch 402); only Maslow inspiration and trait counts verified. |
| CK3 stress thresholds and exact genetics numbers | Genetics probabilities MEDIUM from secondary guides; stress verified only qualitatively. |
| Wildermyth legacy across campaigns | Not in fetched page. |
| Hades narrative priority system internals; Reigns internals beyond Kreminski table | Not verified (search budget exhausted). |
| Pseudo-random distribution (Dota 2), expressive range analysis, Machinations, Schreiber cost curves | Not verified; named only as leads. |
| Kahneman and Deaton income-happiness result | Not verified (403). |
| Achievement design literature (Hamari and Eranti) | Not fetched. |
| UN WPP license; whether a revision newer than 2024 exists in 2026-10 | Not verified. |
| ILO/OECD wage data, UNESCO education data | Not checked. |
| Prom Week "3500 considerations" | MEDIUM: from search-result summary of the FDG 2011 paper (the PDF host had a certificate error); AAAI paper text read but did not state the number. |
| Telemetry practice specifics (event names, retention-by-age) | General guidance only; no citation. |
| Legal/ratings constraints on crime, gambling, substance content | Out of scope; flag for product/legal. |

---

## 27. Source index (URLs consulted)

Narrative and event systems
- https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/
- https://mkremins.github.io/publications/Storylets_SketchingAMap.pdf (also https://link.springer.com/chapter/10.1007/978-3-030-04028-4_14)
- https://www.failbettergames.com/news/new-narrative-structures
- https://www.failbettergames.com/news/narrative-snippets-pacing
- https://en.wikipedia.org/wiki/Fallen_London
- https://www.gdcvault.com/play/1024278/The-Casual-(but-Regal)-Swipe
- https://en.wikipedia.org/wiki/Reigns_(video_game)
- https://ieeexplore.ieee.org/document/6648395/ (Versu); https://dl.acm.org/doi/abs/10.1145/2159365.2159425 and https://cdn.aaai.org/ojs/12662/12662-52-16179-1-2-20201228.pdf (Prom Week)
- https://en.wikipedia.org/wiki/Fa%C3%A7ade_(video_game)
- https://www.semanticscholar.org/paper/Subverting-historical-cause-&-effect:-generation-of-Grinblat-Bucklew/e73a3bcd1eca39a2de7add8940d6f36d15175d21 (Caves of Qud history paper abstract)

Reference games
- https://github.com/VickScarlet/lifeRestart and raw files `packages/data/src/{event,talent,age,achievement}.types.ts`, `packages/condition/index.spec.ts` under https://raw.githubusercontent.com/VickScarlet/lifeRestart/main/
- https://baike.baidu.com/en/item/Life%20Restart%20Simulator/3289950
- https://en.wikipedia.org/wiki/Alter_Ego_(1986_video_game), https://en.wikipedia.org/wiki/Princess_Maker_2, https://en.wikipedia.org/wiki/Tamagotchi, https://en.wikipedia.org/wiki/The_Sims, https://en.wikipedia.org/wiki/The_Sims_4, https://en.wikipedia.org/wiki/Crusader_Kings_III, https://ck3.paradoxwikis.com/Traits, https://www.thegamer.com/crusader-kings-3-genetic-traits-guide/, https://en.wikipedia.org/wiki/RimWorld, https://en.wikipedia.org/wiki/Wildermyth, https://en.wikipedia.org/wiki/Hades_(video_game), https://en.wikipedia.org/wiki/Roguelike, https://en.wikipedia.org/wiki/Dwarf_Fortress, https://dwarffortresswiki.org/index.php/Personality_trait, https://dwarffortresswiki.org/index.php/World_generation, https://en.wikipedia.org/wiki/Caves_of_Qud, https://stardewvalleywiki.com/Time, https://en.wikipedia.org/wiki/Animal_Crossing, https://en.wikipedia.org/wiki/Life_simulation_game
- BitLife (LOW): https://www.playbitlifegame.com/, https://www.bitlife.school/

Design and psychology
- https://steamcdn-a.akamaihd.net/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf
- https://en.wikipedia.org/wiki/Dynamic_game_difficulty_balancing, https://en.wikipedia.org/wiki/Game_balance, https://en.wikipedia.org/wiki/Monte_Carlo_method, https://en.wikipedia.org/wiki/Alias_method, https://en.wikipedia.org/wiki/Gamification
- https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule, https://en.wikipedia.org/wiki/Hedonic_treadmill, https://en.wikipedia.org/wiki/Dunbar%27s_number, https://en.wikipedia.org/wiki/Interpersonal_attraction, https://en.wikipedia.org/wiki/Heritability_of_IQ, https://en.wikipedia.org/wiki/Hofstede%27s_cultural_dimensions_theory

Data
- https://api.worldbank.org/v2/ (queried 2026-10-06), https://datacatalog.worldbank.org/public-licenses
- https://ghoapi.azureedge.net/api/LIFE_0000000030 and `WHOSIS_000001` (queried 2026-10-06), https://www.who.int/data/gho/data/indicators/indicator-details/GHO/gho-ghe-life-tables-nqx-probability-of-dying-between-ages-x-and-x-n, https://cdn.who.int/media/docs/default-source/gho-documents/global-health-estimates/ghe2021_lifetable_methods.pdf
- https://en.wikipedia.org/wiki/World_Population_Prospects, https://population.un.org/wpp/
- https://www.ssa.gov/oact/STATS/table4c6.html (not retrievable), https://www.ssa.gov/OACT/Downloadables/CY/index.html
- https://en.wikipedia.org/wiki/Gompertz%E2%80%93Makeham_law_of_mortality
- https://www.onetcenter.org/database.html
- https://faker.readthedocs.io/en/master/, https://github.com/philipperemy/name-dataset
