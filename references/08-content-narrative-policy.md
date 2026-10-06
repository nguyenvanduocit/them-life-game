# 08 - Content, Narrative, Tone, Sensitive Topics, Store Policy and Legal/Rating Constraints for Mobile Life Sims

> Research date: 2026-10-06. Slice owner: content / narrative / policy. Non-goals: mechanics, monetization numbers, tech stack (other files in this folder).
>
> **NOT LEGAL ADVICE.** This is engineering/product research. Store policies, ratings rules and age-assurance laws change monthly. Before launch, re-read the live policy pages and have counsel review the markets you ship to (US, EU/UK, Vietnam, China, Korea, Gulf).

## 0. Method, confidence labels and limits

- Labels: **HIGH** = read on the primary source or measured by me this session; **MEDIUM** = from a secondary source, a search snippet, or a primary page read through the WebFetch summarizer; **LOW** = inference or design opinion, needs verification. **unverified** = I could not confirm it.
- WebFetch returns model-summarized text, not raw HTML. Section numbers and quotes below came from that output. Re-open the page and confirm the exact wording before you cite it in a compliance doc.
- Limits hit in this session:
  - WebSearch budget reached 200/200, so the second half of research used direct page fetches, the Reddit tool and GitHub measurement only.
  - Some pages returned 403/402/404: bitlife.zendesk.com, progameguides.com, Wikipedia `BitLife`, fandom wiki, tvtropes, reportingonsuicide.org, Lexology Decree 147.
  - Apple's guidelines page showed no "last updated" date. Apple's news page (below) lists revisions on 2025-11-13 and 2026-06-08.
- Coverage statement: I did not obtain official event counts for BitLife or Alter Ego. Only Life Restart (open source) was measured (section 2).

---

## 1. How successful life sims write events

### 1.1 Observed patterns

| Pattern | Evidence | Confidence |
|---|---|---|
| **Very short, declarative, second-person or implied-you lines.** Life Restart Simulator events: median **13 Chinese characters**, mean 15.5 (I computed on `event.xlsx`, 1,720 rows with text). Examples: "普通的内卷生活。" ("Just an ordinary rat-race life."), "高考结束，你们班一本率40%。" ("Gaokao is over; your class has a 40% top-tier admission rate."). | https://github.com/VickScarlet/lifeRestart (`packages/data/src/event.xlsx`, measured 2026-10-06) | HIGH |
| **Short line + punchy consequence.** Reigns writer François Alliot: "short direct question, quick snappy answer, dire consequences"; deliberately avoided complex sentences; inspired by Oulipo constrained writing. Tone "humorous and weird" with dark death/Devil premise shown abstractly. | https://en.wikipedia.org/wiki/Reigns_(video_game) | MEDIUM |
| **Tongue-in-cheek treatment of adult topics, text-only (no explicit images).** Common Sense Media: mature themes "presented in a tongue-in-cheek manner"; players can murder, assault, have one-night stands and abortions; "Pornography is mentioned"; drugs "often shown without consequences". | https://www.commonsensemedia.org/app-reviews/bitlife-life-simulator | MEDIUM |
| **Absurdism and realism mix.** Life Restart mixes mundane realism (school, gaokao, "neijuan") with xianxia fantasy ("你突破到金丹八层", breakthrough to Golden Core stage 8; "[绝密消息]" secret-info rarity events). | Same repo, sampled rows | HIGH (sample of 8 rows, not whole corpus) |
| **Rarity tiers in the event table.** Life Restart has a `grade` column (0-3): 1,233 rows blank (0), 240 grade 1, 163 grade 2, 84 grade 3. Rare events carry the "shareable story" load. | Same repo, measured | HIGH |
| **Dark outcomes are normal, brevity keeps them non-graphic.** BitLife's own Apple advisories list "Frequent/Intense Mature/Suggestive Themes" while violence is only "Infrequent/Mild Cartoon or Fantasy Violence". | iTunes Search API, 2026-10-06: `https://itunes.apple.com/search?term=bitlife&entity=software&country=us` | HIGH (field values as returned) |
| **Addictive "one more life" loop.** SmartSocial quotes a student: "life after life... itching for another fix". Writing must stay replayable, so lines are short and modular. | https://www.smartsocial.com/post/bitlife-app | MEDIUM |

### 1.2 Style guide candidates for us (design opinion, LOW until playtested)

1. One event = 1-2 sentences, under ~140 characters for choice text, outcome line under ~100. Mobile screen width forces this.
2. Second person, present or simple past, consistent across the entire corpus ("You failed the exam."). Pronoun/gender agreement must be handled by the template engine, not hand-written (see BitLife pronoun failure, section 6).
3. Dark topics via implication and dry humor, never method detail or gore. This is what keeps the rating budget (section 5.2) and safe-messaging rules (section 5) manageable.
4. Reserve absurdism for low-stakes events (aliens, talking pets) and use plain realism for high-stakes ones (illness, bereavement, abuse). Mixing jokes into serious events is where backlash starts.
5. Every event tagged at authoring time with: `topic`, `intensity (0-3)`, `region_tags`, `age_gate`. Tags drive filters, ratings and regional builds (section 3 pipeline).

---

## 2. Content volume benchmarks

| Game | Measured / reported volume | Source | Confidence |
|---|---|---|---|
| **Life Restart Simulator (lifeRestart, MIT, ~10.4k GitHub stars)** | **1,720 events** (1,721 non-empty rows incl. one label row), **185 talents**, **166 achievements**, **101 preset characters**; `age.xlsx` has 5,493 rows mapping ages to event pools; 166 events have a follow-up `postEvent` text; event fields: stat effects (CHR/INT/STR/MNY/SPR/LIF/AGE), include/exclude conditions, branches. All authored in **xlsx**. | https://github.com/VickScarlet/lifeRestart/tree/main/packages/data/src (I downloaded and counted with openpyxl, 2026-10-06) | HIGH |
| **BitLife** | Public descriptions say only "thousands of random events, choices, and outcomes" and "more than 200 challenges". No official event count found. | Search snippet of https://bitlife-life-simulator.fandom.com/wiki/Events (page itself returned 402) | LOW |
| **Alter Ego (Caramel Column, 2019 app; and Choose Multiple LLC, 2009 app)** | No content-volume figure found. Apple age ratings from iTunes API: 9+ (Caramel Column, only "Infrequent/Mild Horror/Fear") and 12+ (Choose Multiple, "Infrequent/Mild Sexual Content and Nudity" + "Mature/Suggestive Themes"). | iTunes Search API `term=alter+ego+life+simulator` 2026-10-06. I could not confirm which of these is "the" Alter Ego that you mean. | HIGH for ratings, volume = unverified |
| **Reigns** | Card count not stated in source. | https://en.wikipedia.org/wiki/Reigns_(video_game) | MEDIUM |
| **ink (as a scale reference)** | Tool has supported "literally millions of words of highly branching narrative". | https://www.inklestudios.com/ink/ | MEDIUM |

Takeaway (LOW): a credible launch corpus is on the order of **1,500-2,000 short events** (the lifeRestart scale, built by a hobby team and proven viral) plus talents/traits/achievements. BitLife's true scale is unverified. Plan 3-5x event count for regional variants if you localise life stages and institutions (section 12).

---

## 3. Writing pipelines

| Option | Fit for life sim | Evidence | Confidence |
|---|---|---|---|
| **Spreadsheet (xlsx/Google Sheets) -> typed JSON** | Best match. lifeRestart ships `event.xlsx`, `talent.xlsx`, `age.xlsx` with typed columns (`include`, `exclude`, `branch[]`, `effect:*`) converted by TypeScript transformers (`event.types.ts`). Writers who are not programmers can edit rows; diffs can be reviewed. | https://github.com/VickScarlet/lifeRestart/blob/main/packages/data/src/event.types.ts | HIGH |
| **ink / Inky** | Text-first branching; Unity plugin; MIT license. Good for scripted story arcs (a few hand-authored chapters), clumsy for thousands of independent stat-gated events. | https://www.inklestudios.com/ink/ | MEDIUM (fit = LOW) |
| **Yarn Spinner** | VS Code authoring, built-in localisation export/import, Unity/Godot/Unreal; 100+ games incl. Night in the Woods, A Short Hike, DREDGE. Fits dialogue scenes (romance, job interview). | https://www.yarnspinner.dev/ | MEDIUM |
| **Twine / articy:draft** | Not researched this session. | n/a | unverified |

Recommended (LOW, design opinion): **Sheets as source of truth for the event pool + a lint step**, with optional ink/Yarn only for hand-authored "milestone scenes". Lint rules: max length, required tags, banned-word list per region, pronoun-template validity, orphan `branch` targets, rating-budget report (counts of events per topic x intensity, see section 9.3).

---

## 4. LLM-assisted content: policy and pitfalls

### 4.1 Where LLMs help and where they hurt (LOW, design opinion except where cited)

| Use | Risk | Handling |
|---|---|---|
| **Offline (design-time) drafting of events, then human edit** | Homogeneous voice; accidental real-brand/celebrity mentions; stereotypes; unintentional graphic detail; duplicates | Human edit pass, lint, topic/intensity tags assigned by a human reviewer, dedupe by embedding. Treat output as untrusted copy. |
| **Runtime (live) generation inside the app** | Unfiltered output reaches users; store AI-content rules apply; privacy consent for third-party AI | Avoid in v1, or constrain heavily (section 4.2). |
| **Translation / localisation drafts** | Cultural errors on sensitive topics (religion, death, sexuality) | Native reviewer per market. |

### 4.2 Store and platform rules that touch AI content

| Rule | Text (as returned by fetch) | Source | Confidence |
|---|---|---|---|
| Google Play AI-Generated Content policy | "AI-generated content is content that is created by generative AI models based on user prompts." Apps must prevent restricted content (child exploitation, deceptive behavior, etc.) and **must include in-app user reporting/flagging without leaving the app**, using feedback to improve filtering. | https://support.google.com/googleplay/android-developer/answer/13985936 | MEDIUM (summarizer; no revision date shown) |
| Apple App Review Guideline **5.1.2(i)** | "You must clearly disclose where personal data will be shared with third parties, **including with third-party AI**, and obtain explicit permission before doing so." Revised 2025-11-13. | https://developer.apple.com/app-store/review/guidelines/ and https://developer.apple.com/news/ | HIGH |
| Apple **1.2** UGC (applies if players can share generated text) | Filtering method, report mechanism with timely responses, block abusive users, published contact info. | https://developer.apple.com/app-store/review/guidelines/ | HIGH |
| Steam (analog, not our store) | Separates **pre-generated** vs **live-generated** AI; live needs described guardrails; Valve "will not ship Live-Generated AI Adult Only Sexual Content". | https://partner.steamgames.com/doc/gettingstarted/contentsurvey | MEDIUM |

### 4.3 Cautionary precedent

- **AI Dungeon (Latitude), April 2021**: a content filter to block AI-generated sexual content involving minors triggered human review of private stories, many false positives (e.g., "eight-year-old laptop"), review-bombing and protests. Lesson: runtime LLM moderation creates privacy, false-positive and communication problems. Source: https://en.wikipedia.org/wiki/AI_Dungeon (MEDIUM; Wikipedia summary, outcome not stated).

---

## 5. Content categories, risk and handling

### 5.1 Content-risk matrix (topic x store-policy risk x recommended handling)

Risk scale: **Low** (routine in rated games), **Med** (rating/age-gate drives outcome), **High** (rejection, regional ban or legal exposure likely if mishandled). "Apple map" uses Apple's 2025+ questionnaire (section 8.2). All "recommended handling" cells are LOW-confidence design opinion; the policy cells cite sources.

| Topic | Store policy touchpoints | Rating impact | Risk | Recommended handling |
|---|---|---|---|---|
| **Death (natural, accident, illness)** | Core to genre. No specific store ban. | None to low | Low | Keep. Plain, non-graphic wording. |
| **Suicide / self-harm** | Apple 1.4 (physical harm) covers medical accuracy, drugs, risky challenges, not suicide by name in the fetched text (summarizer reported "not present"). Google Inappropriate Content page (as fetched) did not list suicide; **unverified** whether another Play policy applies. BitLife uses the neutral label "surrender" in place of suicide (secondary source, see 6). Samaritans guidance for fiction: avoid content harmful to vulnerable people; avoid glamorisation; do not name novel methods. | Raises "Mature themes" | High (reputational and user-safety, store text ambiguous) | No method detail; no reward/achievement tied to it; not a player-selectable "optimal" choice; show help-line screen when the player picks it; region-specific hotline data; consider default-off. Follow https://www.samaritans.org/about-samaritans/media-guidelines/ |
| **Violence / murder / crime** | Apple **1.1.2**: "Realistic portrayals of people or animals being killed, maimed, tortured, or abused, or content that encourages violence." Apple **1.1.3**: weapons use/purchase. Google: gratuitous violence prohibited; "fictional violence in games is generally permitted". | Apple: infrequent realistic violence -> 13+, frequent -> 18+; prolonged graphic/sadistic -> unpublishable ("Unrated") | Med | Text-only outcomes, no gore; no weapon-purchase links; avoid "tutorial" tone. |
| **Drugs / alcohol / tobacco** | Apple **1.4.3**: "Apps that encourage consumption of tobacco and vape products, illegal drugs, or excessive amounts of alcohol are not permitted." Google: no marijuana/tobacco sales facilitation; alcohol must not promote illegal use or target minors. | Apple: infrequent -> 13+, **frequent -> 18+** | Med-High | Depict addiction with consequences (health, relationships) rather than reward; never grant stat bonuses for drug use; keep references "infrequent" if 16+ is desired. |
| **Sex / relationships / dating** | Apple **1.1.4**: no "explicit descriptions or displays of sexual organs or activities intended to stimulate erotic rather than aesthetic or emotional feelings." Google: no sexual content or profanity "including pornography" outside educational/artistic. | Apple: infrequent sexual content -> 13+; frequent mature/suggestive themes -> 16+; frequent sexual content -> 18+; graphic -> unpublishable | Med | Fade-to-black text; no sexual-content mini-game; no minors in any romantic/sexual event (hard rule); marriage/dating events age-gated (>=18 in-game for sexual content). |
| **Abuse (domestic, child, bullying)** | Apple 1.1.2 ("abused"). Google: bullying/harassment prohibited as app content. | Mature themes | High (esp. child abuse) | Optional/toggle category, never played from the abuser's perspective for reward; no detailed depiction; link to support resources. |
| **Mental illness** | Apple age-rating questionnaire has "Health or Wellness Topics" (9+) and "Medical or Treatment Information" (infrequent 13+, frequent 16+). Apple 1.4.1 covers health measurements/medical claims. | Medical descriptors | Med | Do not offer "treatment" claims; keep depiction non-stigmatising; avoid slurs ("crazy"); no therapy outcome presented as medical advice. |
| **Discrimination (race, gender, sexuality, nationality)** | Apple **1.1.1**: "Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin..." Google: hate speech prohibited "based on race or ethnic origin, religion, disability, age, nationality...". | N/A (policy violation, not rating) | High | Do not randomise outcomes by protected class in a way that reads as endorsing stereotypes; model discrimination as an event the player endures, with neutral framing; test with sensitivity readers. China crackdown on gender-stigmatizing content (section 11). |
| **Religion** | Apple **1.1.5**: "Inflammatory religious commentary or inaccurate or misleading quotations of religious texts." Gulf and China restrictions (section 11). | Regional | Med-High | Neutral, non-mocking religion events; avoid quoting scripture; make religion events regional. |
| **Politics / real countries / sensitive events** | Apple **1.1.7**: "Harmful concepts which capitalize or seek to profit on recent or current events, such as violent conflicts, terrorist attacks, and epidemics." Google: must not "capitalize on or are insensitive toward a sensitive event with significant social, cultural, or political impact." China requires maps consistent with official claims; North Korea content sensitive in Korea (Pangea). | Regional | Med-High | Fictional or generic institutions; no live-news events; no real politicians; no maps in v1. |
| **Real brands / celebrities** | Apple **5.2.1**: "Don't use protected third-party material such as trademarks, copyrighted works, or patented ideas in your app without permission." Apple **4.1(c)** for names/icons of another developer. | None | Med-High (IP, not rating) | Fictional brands only (section 13). |
| **Gambling (simulated)** | Apple age rating "Simulated Gambling": infrequent 13+, **frequent 18+**; real-money gaming under 5.3.4 needs licenses and geo-restriction and must be free. Apple **5.3.3**: no IAP currency used for real-money gaming. Google: social-casino-style content is **not** allowed for apps that carry gambling ads (see 8.3); Families policy bars "gambling simulations" for child audiences. BitLife's Apple advisories list "Infrequent/Mild Simulated Gambling". | 13+ to 18+ | Med | Casino/lottery as a rare life event with no virtual-currency cash-in/cash-out and no IAP linkage; no gambling ads; never expose to under-13/Families. |
| **Profanity / crude humor** | Apple: infrequent -> 9+, frequent -> 13+. Korea: from Oct 2026 the two descriptors "infrequent profanity/crude humor" and "infrequent mature/suggestive themes" move to 12+ (Apple news 2026-08-12). | Rating | Low | Use a profanity list per age band. |
| **Minors (any sexual/violent depiction involving children in-game)** | Google AI policy bars child exploitation content; Apple 1.1.x and law. | Illegal territory | Critical | Hard-block rule in tooling: no event tagged `minor` may carry `sexual`/`abuse-graphic` tags. |
| **Real-world health claims / medical** | Apple 1.4.1 (accuracy claims), medical device declaration deadlines noted in Apple news (early 2027, EEA/UK/US). | Medical descriptors | Low-Med | No diagnosis/treatment features. |

Sources for the table: Apple guidelines https://developer.apple.com/app-store/review/guidelines/ (HIGH for quoted clause text, via summarizer); Apple rating mapping https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions (HIGH); Google Inappropriate Content https://support.google.com/googleplay/android-developer/answer/9878810 (MEDIUM, summarizer, no date); Pangea localisation https://www.pangea.global/blog/sensitive-content-in-game-localization-religion-politics-and-the-decisions-that-protect-your-launch/ (MEDIUM).

### 5.2 Rating budget implications (derived from Apple's mapping, HIGH for the mapping, LOW for the design plan)

| Target Apple rating | Hard limits you must stay under (from Apple's table) |
|---|---|
| **9+** | Only infrequent profanity/crude humor, infrequent horror, infrequent mild suggestive themes, infrequent cartoon violence/weapons. Life sims with death, drugs and sex cannot hit this. |
| **13+** | Infrequent alcohol/tobacco/drug references; infrequent sexual content; infrequent realistic violence; infrequent simulated gambling; frequent profanity/horror allowed. |
| **16+** | Adds frequent mature/suggestive themes and frequent medical info. Drug references must remain infrequent. |
| **18+** | Needed once drugs/alcohol, realistic violence or simulated gambling are **frequent**, or sexual content is frequent. BitLife-like content lands here. |
| **Unrated (cannot publish)** | Graphic sexual content/nudity or prolonged graphic/sadistic realistic violence at any frequency. |

---

## 6. Controversies and backlash (examples with sources)

| Case | What happened | Source | Confidence |
|---|---|---|---|
| **BitLife Pride update, 2020** | Update 1.38 (30 June 2020) added gender-identity and pronoun options incl. they/them; recalled in 1.38.1 days later because plural pronouns "wreaked havoc on the game's writing"; Candywriter announced a switch to singular zie/zir/zirs/zirself. Queer players criticised it. Critic (Jo Moses, 2020-09-22): developer "prioritiz[ed] fixing grammar issues... over the comfort of their queer customers"; three months later still unchanged. | BitLife's X post https://x.com/BitLifeApp/status/1278881109971881985 (title seen in search, page not opened); https://jomoses.com/three-months-later-and-bitlife-is-still-failing-its-queer-players/ (opened) | MEDIUM (opinion piece + tweet title; I did not open the tweet) |
| **BitLife age/safety criticism** | Rated 17+ on Apple's legacy scale; Protect Young Eyes: no parental controls in-app, some 18+ ads, third-party tracking; SmartSocial puts it in its "Red Zone"; Common Sense says 14+. | https://www.protectyoungeyes.com/apps/bitlife-parental-controls ; https://www.smartsocial.com/post/bitlife-app ; https://www.commonsensemedia.org/app-reviews/bitlife-life-simulator | MEDIUM |
| **Suicide naming** | Secondary source: BitLife calls it "surrendering", previously called "suicide". I could not open the primary source (tvtropes 403). | via search snippet of https://tvtropes.org/pmwiki/pmwiki.php/TheManyDeathsOfYou/BitLife | LOW |
| **BitLife monetization petitions** | Change.org petitions about "greed" and asking Stillfront to sell BitLife exist (content not read). Belongs to the monetization file, listed only for completeness. | https://www.change.org/p/stop-the-greed-of-bitlife-devs | LOW |
| **"Revenge on Gold Diggers" (Steam, China), June 2025** | Launched 2025-06-19, hit #4 on Steam global bestsellers on day one; creator's and game's Bilibili accounts were banned hours after release; the Cyberspace Administration of China stressed cracking down on content stigmatizing specific gender groups and stricter game review. Later renamed "Emotional Fraud Simulator". Relevance: a relationship/"life choices" simulator that targets a gender can trigger regulator action. | https://www.sixthtone.com/news/1017276 (published 2025-06-26) | MEDIUM |
| **AI Dungeon filter, 2021** | See section 4.3. | https://en.wikipedia.org/wiki/AI_Dungeon | MEDIUM |
| **Middle East bans for LGBT content** | Examples reported: The Last of Us Part II (KSA/UAE), Mass Effect 2/3, Dragon Age: Origins. | https://www.albawaba.com/node/sonys-last-us-2-banned-ksa-and-uae-due-gay-content-1359066 and https://www.juegostudio.com/blog/banned-games-in-the-uae (search snippets) | MEDIUM |

Not found (coverage gap): any documented removal of BitLife from a store; press coverage of BitLife and abortion; Reddit threads about specific BitLife event backlash. My Reddit searches returned only image-meme threads with no readable text.

---

## 7. Giving players agency over sensitive content

What the evidence supports:
- BitLife itself has **no in-app parental controls** (Protect Young Eyes), so parents rely on device-level controls. Users of 17+ games are the only gate. (MEDIUM, https://www.protectyoungeyes.com/apps/bitlife-parental-controls)
- Apple has moved the burden to developers via age-assurance APIs and a mandatory questionnaire; Apple 4.7.5 and 1.2.1(a) already require "a way for users to identify content that exceeds the app's age rating" for mini-app and creator contexts (HIGH, https://developer.apple.com/news/).
- Google Play's UGC policy accepts sexual UGC only if hidden by default behind filters needing "at least two user actions" to disable (MEDIUM, https://support.google.com/googleplay/android-developer/answer/9876937). This is a store-approved pattern for opt-in sensitive content.

Proposed patterns (LOW, design opinion; no competitor example verified, `unverified` how other life sims implement toggles):

| Pattern | What | Why |
|---|---|---|
| **Content intensity setting at new-game** | Three presets (Gentle / Standard / Unfiltered), mapped to event `intensity` tags; stored in profile; changeable in Settings | One column in the event sheet drives it; cheap to iterate |
| **Topic toggles** | Per-topic switches for: self-harm, abuse, drugs, sexual content, violence, gambling. Off = event pool skips them | Lets one build ship in multiple regions and lets players self-manage |
| **Soft-lock / "skip" choice** | Any sensitive event shows a pre-roll warning and a "skip this" option, with no gameplay penalty | Avoids punishing players who opt out |
| **Region profiles** | Default presets by region (e.g., religion/LGBT/politics tags off in strict markets) | See section 11 |
| **Age-aware defaults** | Use Apple Declared Age Range / Google Play Age Signals to default minors to Gentle and to block the app where age-rating demands it (section 10) | Law/store alignment |
| **Support screens** | Hotline/support information when a player selects self-harm content | Aligns with Samaritans guidance |

---

## 8. Store policy digest (Apple and Google, as read 2026-10-06)

### 8.1 Apple App Review Guidelines - sections relevant to a life sim

Source for all rows: https://developer.apple.com/app-store/review/guidelines/ (no last-updated date on page; revisions 2025-11-13 and 2026-06-08 per https://developer.apple.com/news/). Confidence: HIGH for clause identity and quoted text as returned; re-verify wording.

| Section | Rule (quoted/condensed) | Life-sim implication |
|---|---|---|
| **1.1.1** | Defamatory, discriminatory, or mean-spirited content incl. religion, race, sexual orientation, gender, national/ethnic origin | Event writing review for stereotypes |
| **1.1.2** | Realistic portrayals of people or animals being killed, maimed, tortured, abused; content encouraging violence | Text-only, non-graphic |
| **1.1.3** | Depictions that encourage illegal or reckless use of weapons; facilitate buying firearms | No purchase flows |
| **1.1.4** | Overtly sexual or pornographic material | Fade to black |
| **1.1.5** | Inflammatory religious commentary; misleading quotations of religious texts | Avoid quoting scripture |
| **1.1.6** | False information; "for entertainment purposes" does not overcome it | Avoid fake real-world claims (health, legal) |
| **1.1.7** | Harmful concepts that capitalize on current events (conflicts, terrorist attacks, epidemics) | No timely-event content |
| **1.2** | UGC needs filtering, reporting with timely response, blocking abusers, published contact | Applies if we add shared lives, names, bios, chat |
| **1.2.1(a)** | Creator apps need a way to identify content exceeding the age rating and an age restriction based on verified or declared age | Applies if players can publish custom lives |
| **1.3** | Kids Category: no links out/purchases without parental gate; no PII to third parties | Do not enter Kids Category |
| **1.4.3** | No encouragement of tobacco/vape, illegal drugs, excessive alcohol | Drug events must not reward |
| **1.4.5** | Don't urge activities that risk physical harm (bets, challenges) | No real-world challenge prompts |
| **2.3.6** | "Answer the age rating questions in App Store Connect honestly... If your app is mis-rated... it could trigger an inquiry from government regulators." Must follow local rating requirements in each territory. | Rating budget is a compliance matter |
| **3.1.1** | Loot-box style randomized purchases must disclose odds before purchase | Monetization file's concern |
| **4.1(c)** | Cannot use another developer's icon, brand or product name | Do not name the game or art "BitLife-like" |
| **4.2** | Lasting entertainment value or utility | Not a thin wrapper |
| **4.7 / 4.7.5** | Mini-app/game software must identify age-exceeding content and age-restrict | Only if we load external games |
| **5.1.1(i), (ii), (v)** | Privacy policy link in App Store Connect and in app; consent for data collection even if anonymous; account deletion if account creation | Needed for cloud saves/accounts |
| **5.1.2(i)** | Disclose and get permission before sharing personal data with third parties incl. third-party AI | LLM features |
| **5.1.4(a)(b)** | Care with kids' data; kids-primary apps should not include third-party analytics/advertising; privacy policy and compliance with children's privacy statutes | COPPA-risk if audience includes under-13 |
| **5.2.1** | No protected third-party trademarks, copyrighted works without permission | Fictional brands |
| **5.3.3 / 5.3.4** | No IAP currency for real-money gaming; real-money gaming needs licensing, geo-restriction, free | We must stay outside real-money gaming |

### 8.2 Apple age-rating system changes (2025-26)

| Fact | Source | Confidence |
|---|---|---|
| Apple replaced 12+ and 17+ with **13+, 16+, 18+**, kept 4+ and 9+; new questions on in-app controls, sensitive content, violence themes, medical/wellness; developers had to answer by **2026-01-31** or be blocked from submissions/updates. Existing apps were auto-mapped for iOS 26-family. | https://developer.apple.com/news/upcoming-requirements/?id=07242025a ; https://ptkd.com/journal/app-store-age-ratings-2025-update | HIGH (deadline, tiers); MEDIUM (blocking consequence from secondary) |
| Questionnaire categories: Mature Themes (profanity, horror, alcohol/tobacco/drugs); Sexuality or Nudity; Violence; Chance-based (gambling, **simulated gambling**, contests, loot boxes); In-app controls (parental controls, age assurance); Capabilities (unrestricted web, UGC, social media, messaging, advertising); Medical or Wellness. | https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions | HIGH |
| 2026-05-21: Australia drops 15+ (apps become 16+); Vietnam gets region-specific ratings 00+/12+/16+/18+ per **Decree 147** (from 2026-06-18). | https://developer.apple.com/news/ | MEDIUM-HIGH |
| 2026-07-09: new "Social Media" descriptor, questions in age rating; 2026-09-16: answers required for new submissions/updates (Time Allowances in iOS 27). Relevant only if we add a social feed. | https://developer.apple.com/news/ | MEDIUM-HIGH |
| 2026-08-12: Korea - developers can override rating with a GRAC Rating Classification Number; from Oct 2026 two descriptors move from "All" to 12+. | https://developer.apple.com/news/ | MEDIUM-HIGH |

### 8.3 Google Play policies

All Google Play Help pages below were read via the summarizer, none showed a revision date (only "(c) 2026 Google"). Confidence MEDIUM.

| Policy | Key points | Source |
|---|---|---|
| **Inappropriate Content** | No sexual content or profanity incl. pornography (educational/artistic exceptions); hate speech vs. race, ethnic origin, religion, disability, age, nationality etc.; "gratuitous violence" banned, "fictional violence in games is generally permitted"; must not "capitalize on or are insensitive toward a sensitive event"; bullying/harassment banned; controlled substances (marijuana/tobacco sales) banned, alcohol must not target minors. | https://support.google.com/googleplay/android-developer/answer/9878810 |
| **Real-Money Gambling, Games, Contests** | Real-money gambling only for licensed operators in approved countries, rated AO/IARC-equivalent, free to download. The sentence "App must not provide simulated gambling content (for example, social casino apps; apps with virtual slot machines)" appears under the section "Ads for Gambling or Real-Money Games, Contests, and Tournaments within Play-distributed Apps", i.e. it constrains apps that **carry gambling ads**. I could not confirm a general ban on simulated gambling. | https://support.google.com/googleplay/android-developer/answer/9877032 |
| **User Generated Content** | Terms acceptance before UGC creation; "in-app system for reporting and blocking objectionable UGC and users"; blocking for direct user interaction; sexual content hidden behind "at least two user actions". | https://support.google.com/googleplay/android-developer/answer/9876937 |
| **AI-Generated Content** | See 4.2. | https://support.google.com/googleplay/android-developer/answer/13985936 |
| **Families (Designed for Families)** | Child-directed vs mixed-audience; only Families Self-Certified Ad SDKs; no personalized ads/remarketing to children; no AAID/IMEI/MAC from child-directed apps; prohibited for child audiences: violence, gambling simulations, sexual material, substance glorification, dating. | https://support.google.com/googleplay/android-developer/answer/9893335 |
| **Target Audience and Content** | Declare audiences in Play Console; select multiple age groups only if app is designed for them; misrepresentation may cause removal. | same page (anchor `#target_audience`) |
| **Content ratings (IARC)** | Misrepresentation may result in removal or suspension; rating authorities can override; ads must match rating; mature content (e.g., 18+) can be blocked from minors in the EEA, Australia, Brazil, Singapore, Switzerland, UK. | https://support.google.com/googleplay/android-developer/answer/9859655 |
| **Data safety** | All published apps (incl. test tracks) must complete the form; privacy policy required; disclose data transmitted by third-party SDKs; deletion-request question; non-compliance = blocked updates or removal. | https://support.google.com/googleplay/android-developer/answer/10787469 |
| **Play Age Signals API (beta)** | Returns age range/verification status; bands 0-12, 13-15, 16-17, 18+; returned for Brazil since 2026-03-17 and Texas accounts created after 2026-05-28; **cannot be used for ads or analytics**; global rollout announced 2026-07-29 for later in 2026 (secondary source). | https://developer.android.com/google/play/age-signals/use-age-signals-api ; https://www.techdogs.com/tech-news/td-newsdesk/google-expands-play-age-signals-api-worldwide-by-end-of-2026 |

---

## 9. Age ratings

### 9.1 What comparable games actually got (data pulled 2026-10-06)

Apple, via iTunes Search API. The `contentAdvisoryRating` field still showed the legacy scale (17+, 12+), so it may lag Apple's new 13+/16+/18+ display; Protect Young Eyes reports "Apple: 18+" for BitLife.

| App | Apple rating (API) | Apple advisories (API) | Seller |
|---|---|---|---|
| BitLife - Life Simulator (release 2018-09-30; 1.79M ratings; avg 4.76; version dated 2026-09-21) | 17+ | Frequent/Intense Mature/Suggestive Themes; Infrequent/Mild: Cartoon or Fantasy Violence, Alcohol Tobacco or Drug Use, Profanity or Crude Humor, Sexual Content and Nudity, Simulated Gambling | Candywriter, LLC |
| BitLife Dogs - DogLife | 17+ | Frequent/Intense Mature/Suggestive; infrequent profanity, cartoon violence, alcohol/drug, sexual content | Candywriter, LLC |
| 100 Years - Life Simulator | 17+ | Frequent/Intense Mature/Suggestive; infrequent horror, realistic violence, profanity, sexual content, cartoon violence | Voodoo |
| Medieval Life - Life Simulator | 12+ | Infrequent: cartoon violence, profanity, mature/suggestive, sexual content | Naji Studios |
| Alter Ego (Caramel Column, 2019) | 9+ | Infrequent horror/fear | Caramel Column Inc. |
| Alter Ego (Choose Multiple, 2009) | 12+ | Infrequent sexual content; infrequent mature/suggestive | Choose Multiple LLC |
| Life Restart Simulator (id1585104858, release 2021-09-11) | 4+ | none listed (7 ratings in US storefront) | individual developer |

Source: https://itunes.apple.com/search?term=bitlife&entity=software&country=us ; https://itunes.apple.com/search?term=alter+ego+life+simulator&entity=software&country=us ; https://itunes.apple.com/lookup?id=1585104858&country=us . Confidence: HIGH for the values returned. Observation: the 4+ rating on Life Restart's US listing likely reflects a self-declared questionnaire on a tiny app (LOW); do not treat it as evidence that the content qualifies as 4+.

Other platforms for BitLife:
- Google Play: "Mature 17+" per search snippet of https://www.playbite.com/q/what-is-the-age-rating-for-bitlife (MEDIUM). Protect Young Eyes: "Google Play: Mature" (MEDIUM).
- ESRB: search at https://www.esrb.org/search/ for "bitlife" returned "0 ratings" (HIGH for that query result). Claims on third-party sites that BitLife is ESRB "Teen" or "M", and PEGI 16, conflict and are **unverified**. IARC-issued ratings may not appear in ESRB's console-oriented search.
- BitLife support says under-17 should not play (search snippet of https://bitlife.zendesk.com/hc/en-us/articles/360038753331; page itself 403) (LOW-MEDIUM).

### 9.2 IARC mechanics

- One questionnaire produces ESRB (North America), PEGI (Europe), USK (Germany), ClassInd (Brazil), GRAC (Korea), ACB (Australia) ratings; ratings can differ because each authority applies local standards. Connected stores: Google Play, Nintendo eShop, Microsoft Store, PlayStation Store, Epic, Meta Quest, others. Source: https://en.wikipedia.org/wiki/International_Age_Rating_Coalition and https://usk.de/en/home/age-classification-for-games-and-apps/games-and-apps-in-the-iarc-system/ (MEDIUM, via search summary).
- Apple does not use IARC; it uses its own questionnaire (section 8.2). Rating numbers differ by store, so keep a single internal **content-descriptor ledger** and answer both questionnaires from it.

### 9.3 Content ledger (recommendation, LOW)

For each release, generate counts from the event sheet: events per topic x intensity x region. Use it to answer Apple's frequency questions ("infrequent"/"frequent") consistently. Apple does not publish numeric thresholds for "infrequent" vs "frequent" in the pages I read (unverified), so a conservative internal rule (e.g., <1% of events encountered per life) is an assumption to validate with App Review feedback.

---

## 10. Children's privacy and age assurance

| Law / rule | Status and requirement | Source | Confidence |
|---|---|---|---|
| **COPPA (US), amended rule** | FTC published final amendments 2025-04-22, effective 2025-06-23, **full compliance deadline 2026-04-22** (now passed). Adds separate verifiable parental consent for disclosing children's data to third parties for targeting, retention limits, broader "personal information", security requirements. | https://www.lw.com/en/insights/ftc-publishes-updates-to-coppa-rule ; https://www.finnegan.com/en/insights/articles/coppas-amended-rule-is-now-in-full-effect-what-operators-need-to-know.html | MEDIUM-HIGH |
| **GDPR-K (EU)** | Art. 8(1): default age 16 for consent to information society services, Member States may lower to not below 13; Art. 8(2): "reasonable efforts to verify" parental consent. | https://gdpr-info.eu/art-8-gdpr/ | HIGH |
| **GDPR special categories** | Art. 9(1) includes racial/ethnic origin, religious beliefs, health data, data concerning sex life or sexual orientation; processing needs explicit consent (9(2)(a)). Relevance: if a player's character orientation/religion/health is tied to an identifiable account and sent to analytics, it can become special-category data. Needs legal review. | https://gdpr-info.eu/art-9-gdpr/ | HIGH (text), LOW (applicability to fictional characters) |
| **Texas SB2420 (App Store Accountability Act)** | District court enjoined it in Dec 2025; Fifth Circuit stayed the injunction 2026-05-28 so it can be enforced during litigation. Apple news 2026-06-03: new Texas users confirm 18+, under-18 accounts join Family Sharing, parental consent for downloads/IAP/significant changes; developers should implement Declared Age Range API, PermissionKit Significant Change API, StoreKit age-rating property; effective 2026-06-04. | https://ccianet.org/news/2026/05/appeals-court-pauses-injunction-on-texas-app-store-law-that-likely-violates-first-amendment/ ; https://developer.apple.com/news/ | MEDIUM-HIGH |
| **Utah, Louisiana** | Similar laws in 2026 per Apple news; **California AB 1043** from 2027 per a secondary guide. Current in-force status unverified. | https://developer.apple.com/news/ ; https://appbot.co/blog/age-verification-apis-for-apps-google-apple/ | MEDIUM / LOW |
| **Apple Declared Age Range API / Google Play Age Signals API** | See 8.2 and 8.3. Google bars using the signal for ads/analytics. | above | MEDIUM-HIGH |

Positioning (LOW): a game rated 16+/18+ is not "directed to children", but if age assurance returns a minor, a parental-consent or gentle-mode path is required in regulated regions. Do not rely on age-gating by self-declared birthdate alone.

---

## 11. Regional restrictions

| Region | Requirement | Source | Confidence |
|---|---|---|---|
| **China (mainland)** | Paid or IAP game needs an NPPA approval number (ISBN). 2026 approvals: January 177 titles; March 130 domestic + 3 import; April 147 + 7; May 154 + 4; July 193 + 4; August 209 domestic + 6 imported. Imports are about 3% of approvals in 2026. Foreign companies running an office/subsidiary in China cannot apply for the ISBN; a state-owned Chinese publisher must verify the operator. Mandatory real-name verification, anti-addiction rules for minors (time and spending limits), simplified Chinese localisation, data on mainland servers; three-tier minors ratings (8+/12+/16+). Banned content: drugs, gambling (incl. Mahjong/poker), organized crime, pornographic/sexual content. Religious themes treated as "superstition" are blocked (Pangea). | https://substack.nikopartners.com/p/china-approves-197-video-games-in ; https://www.pocketgamer.biz/china-approves-158-games-in-may-as-licensing-pace-accelerates-in-2026/ ; https://www.mfat.govt.nz/en/trade/mfat-market-reports/entering-chinas-mobile-gaming-market-a-guide-to-licensing-and-regulatory-approval ; Pangea link above | MEDIUM (counts differ between sources: 197 vs 193+4 for July; MFAT report undated) |
| **South Korea** | All games rated by GRAC; mobile open-market games self-rate via designated stores (Google, Apple, Samsung); probability disclosure law for randomized items, with GRAC reporting 1,255 cases monitored and 266 corrective actions in the first 100 days of enforcement (about 60% against overseas operators). Apple lets developers override ratings with a GRAC RCN (2026-08-12). | https://www.grac.or.kr/english/enforcement/enforcement.aspx ; https://www.researchgate.net/publication/395466350 (search snippets) ; Apple news | MEDIUM |
| **India** | Online Gaming Act 2025 (passed 2025-08-22) bans "online money games" (stakes + monetary return) incl. real-money rummy/poker; "online social games" and e-sports are separately recognised. New voluntary rating standard IS 19690:2026 (U/A 0+ ... A). A life sim without stakes or cash-out sits outside the ban. Do not include real-money prizes. | https://law.asia/online-gaming-act-2025-india/ ; https://www.lexology.com/library/detail.aspx?g=67f5157a-fefc-4836-9f9f-97987c0174da ; https://en.wikipedia.org/wiki/Video_game_content_rating_system | MEDIUM |
| **Saudi Arabia / UAE** | GCAM-style rating tiers up to **21+** (Saudi updated in 2025); content involving alcohol, gambling mechanics, pork imagery, nudity, LGBTQ+ themes and blasphemous religious content is restricted or banned; the UAE Media Council reviews games. | https://www.pangea.global/blog/sensitive-content-in-game-localization-religion-politics-and-the-decisions-that-protect-your-launch/ ; https://en.wikipedia.org/wiki/Video_game_content_rating_system | MEDIUM |
| **Vietnam** | Apple requires region-specific ratings 00+/12+/16+/18+ per Decree 147 (from 2026-06-18). Other obligations of Decree 147 (account verification, licensing) **unverified** (Lexology page returned 403). | https://developer.apple.com/news/ | MEDIUM for rating; unverified for licensing |
| **Indonesia** | IGRS ratings 3+/7+/13+/15+/18+; Wikipedia claims a 2024 rule requires a publisher representative office, enforced from Jan 2026. | https://en.wikipedia.org/wiki/Video_game_content_rating_system | LOW |
| **Brazil** | ClassInd ratings (via IARC); Google Play Age Signals live for Digital ECA since 2026-03-17. | https://developer.android.com/google/play/age-signals/use-age-signals-api | MEDIUM |
| **Germany** | USK via IARC; strict on Nazi symbols (most studios ship symbol-free versions). | Pangea link above | MEDIUM |
| **Australia** | Apple drops 15+ (16+ replaces); ACB via IARC. | Apple news | MEDIUM |
| **EEA/UK/Australia/Brazil/Singapore/Switzerland** | Google can block acquisition of 18+ rated apps for minors. | https://support.google.com/googleplay/android-developer/answer/9859655 | MEDIUM |
| **Russia, Japan, other markets** | Russia RARS (0+/6+/12+/16+/18+) per Wikipedia; Japan not researched. | https://en.wikipedia.org/wiki/Video_game_content_rating_system | LOW / unverified |

---

## 12. Cultural localisation of life events

Evidence for specific per-country life-event differences is thin in my sources. What is documented vs. proposed:

| Topic | Documented evidence | Proposal for us (LOW) |
|---|---|---|
| **Education systems** | Life Restart's event rows are anchored to China's system (gaokao, "一本率", political-education class "思修"), proving a locale-specific set is the strength of a local hit. | Build event pools per locale (school stages, exams, tuition model); ship a locale pack, not translations. |
| **Marriage / family** | No source read. | Locale flags for age norms, dowry/arranged marriage, same-sex marriage legality; neutral default. |
| **Careers / money** | No source read. | Locale currency, wage bands, formal vs informal work; avoid real employers. |
| **Religion** | Gulf and China restrictions (section 11). | Religion events optional per locale; no mocking of any faith. |
| **Politics / maps** | China demands maps match official claims; Hearts of Iron banned; Korea sensitive to North Korea content (Pangea). | No maps; fictional countries or generic "your country". |
| **Strategy for restricted markets** | Pangea's framework: **Adapt / Remove / Keep** (e.g., Wolfenstein swastikas replaced; Fallout 3 nuke option removed in Japan; Cyberpunk 2077 shipped 18+). | Tag events by `region_tags` and choose per market whether to adapt, remove or keep. |

---

## 13. Trademark / IP risks

| Issue | Evidence | Handling |
|---|---|---|
| **Third-party marks and works in the app** | Apple 5.2.1: "Don't use protected third-party material such as trademarks, copyrighted works, or patented ideas in your app without permission." | Fictional brands for companies, universities, cars, apps. Run a name-collision search per market before ship. |
| **Names/icons of another developer's app** | Apple 4.1(c) | Do not trade on "BitLife" in name, keywords or screenshots. |
| **Parody defence is narrower than assumed (US)** | In *Jack Daniel's Properties v. VIP Products* (2023), the Supreme Court held the *Rogers* test does not apply when a mark is used as a designation of source for the infringer's own goods, and the dilution "noncommercial use" exclusion does not shield parody used as a source designation; the Ninth Circuit judgment was vacated and remanded. I verified this against the Court's PDF syllabus (https://www.supremecourt.gov/opinions/22pdf/22-148_3e04.pdf) after a first summary stated the holding backwards. Applies to marks used as your own branding, not to fictional-brand parody inside narrative text (applicability to games: LOW). | Do not make real brands your own product identity; counsel for any in-game parody. |
| **Real people / celebrities / politicians** | Apple 1.1.1 (defamatory content), 1.1.7 (current events); right-of-publicity law not researched. BitLife community posts show real-politician references can arise (a 2025 r/BitLifeApp post "So I cant but Trump can?" with 6,090 score and image-only content), but I could not read the content. | No real people. If "celebrity" characters are a feature, use fictional archetypes. |
| **Real universities, employers, cities** | Not researched. | Fictional names or generic ("a state university"); real cities only as setting where no event reflects negatively on them (LOW). |
| **Copyright of event text** | lifeRestart is MIT-licensed; its data is reusable only under MIT terms with attribution (license metadata via GitHub API, HIGH), but event text may derive from third-party cultural references (unverified). | Write original text; do not copy event tables. |

---

## 14. Inclusive design

| Point | Evidence | Recommendation (LOW unless cited) |
|---|---|---|
| **Gender and pronouns are a writing-architecture problem.** BitLife's rollout of they/them failed because strings hard-coded plural/singular grammar. | https://progameguides.com (blocked); https://jomoses.com/... (opened); X title seen in search | Build pronoun and agreement templating into the event engine from day one (`{they} {are}`), validate in lint. Offer he/she/they and custom. Avoid neologism-only fixes. |
| **Orientation and relationships** | Gulf markets ban or restrict LGBTQ+ themes (section 11). Apple 1.1.1 prohibits discriminatory content about sexual orientation. | Orientation as a character trait selectable by the player, same romance mechanics for all orientations; region profile can hide explicitness, not erase representation by default. |
| **Disability and chronic illness** | Google bans hate speech toward disability (MEDIUM). No life-sim practice researched. | Represent as ordinary life conditions with agency, avoid pity or "cure" arcs; sensitivity read. |
| **Race / ethnicity** | Apple 1.1.1; Google hate-speech policy. | Do not use ethnicity as a hidden stat modifier that reads as a stereotype; if differences are modelled, explain them as structural events (discrimination) with neutral framing. |
| **Accessibility** | Not researched this session. | Text-first design helps screen readers; confirm in UX file. |

---

## 15. Implications for our mobile life-sim game

1. **Plan for an 18+ (Apple) / Mature (IARC) game if you copy BitLife's content; plan for 16+ or 13+ only if you cut it.** Apple's table pushes frequent drug/alcohol references, realistic violence or simulated gambling to 18+ and frequent mature themes to 16+ (HIGH, Apple age-ratings help page). Decide the target tier first and let it set the writing budget.
2. **Add `topic`, `intensity`, `region_tags`, `age_gate` columns to every event row from day one**; derive rating answers, regional builds and player toggles from them (lifeRestart already stores typed columns in xlsx, HIGH).
3. **Use a spreadsheet pipeline with a lint step** (length, tags, banned words, pronoun templates, orphan branches, content ledger). ink/Yarn only for scripted milestone scenes (MEDIUM).
4. **Write short.** Median 13 characters per event in the viral Life Restart; punchy one-line outcomes in Reigns. Short text fits phones, localises cheaper and is less graphic (HIGH for Life Restart measurement, MEDIUM for Reigns).
5. **Treat suicide, abuse and child-related content as opt-in, non-rewarded, non-graphic, with support screens.** Store text is ambiguous here (Apple's fetched 1.4 text does not name suicide; unverified Play coverage), so the safe standard is Samaritans-style handling (MEDIUM).
6. **Hard-block rule in tooling: no minor character in sexual/abuse-graphic events.** Prevents the one category that ends in store removal and illegality (policy-based, LOW on exact wording).
7. **Ship pronoun/gender templating in v1.** BitLife's 2020 pronoun failure is the best documented writing-engine backlash (MEDIUM).
8. **Use fictional brands, places, institutions and people.** Apple 5.2.1 and 4.1(c) plus trademark law make real marks a risk with no upside; do not model "parody" on real marks (HIGH for Apple clauses; the Supreme Court holding verified from PDF syllabus).
9. **Keep gambling as a rare event, with no real-money, no cash-out, no IAP link, no gambling ads.** Apple rates frequent simulated gambling 18+; Google's simulated-gambling sentence targets apps with gambling ads, so ad-network choice matters (MEDIUM).
10. **Keep out of Kids/Families programs and implement age assurance.** Integrate Apple Declared Age Range and Google Play Age Signals; do not use the Google signal for ads/analytics; default minors to gentle mode where legally required (MEDIUM-HIGH).
11. **Run COPPA/GDPR-K-safe analytics from launch**: no third-party ad SDKs on suspected minors, deletion path, Data safety/Privacy labels accurate, privacy policy in both stores (Apple 5.1.1, 5.1.4; Google Data safety; COPPA amended rule fully in effect since 2026-04-22; MEDIUM-HIGH).
12. **If you use LLMs, use them offline for drafting and run the human + lint gate.** Runtime generation requires in-app reporting (Google), explicit consent for third-party AI (Apple 5.1.2(i)), and carries AI Dungeon-style moderation risk (MEDIUM).
13. **Default to a region profile system.** China requires an ISBN and a Chinese publisher (foreign share ~3%, so treat China as out-of-scope for v1), Korea needs GRAC handling, Gulf bans LGBTQ+/religion/alcohol/gambling content, Vietnam has Decree 147 ratings; keep policy-sensitive tags removable per market (MEDIUM).
14. **Give players a Gentle / Standard / Unfiltered setting plus per-topic toggles and a "skip this event" soft-lock.** It costs one column in the sheet and is the one control BitLife is criticised for lacking (MEDIUM, Protect Young Eyes: "no parental controls"; toggle design itself is LOW).
15. **Budget a policy re-check every release.** Apple revised guidelines on 2025-11-13 and 2026-06-08, shifted age tiers, and added questions in July and September 2026; Google rolled out Age Signals in March-July 2026. Add the Apple news and Play policy pages to a monthly review (HIGH for the dated changes).
16. **Obtain legal review before launch for: ratings per market, kids' privacy, special-category data handling (orientation, religion, health) and any use of real marks.** This document is research, not legal advice.

---

## 16. Gaps, unverified items and next steps

- **Unverified:** BitLife and Alter Ego event counts; whether BitLife's ESRB/PEGI ratings are Teen/M/16 (conflicting third-party claims, ESRB search showed 0 results); Play-wide ban status on simulated gambling content absent gambling ads; whether Google Play has a policy naming suicide/self-harm content; Apple's numeric thresholds for "infrequent" vs "frequent"; Vietnam Decree 147 operational duties; Utah/Louisiana law status in October 2026; California AB 1043 details; Indonesia IGRS representative-office rule; Japan and Russia details; accessibility and disability depictions in comparable games; right-of-publicity law; Twine and articy research.
- **Not collected:** primary-source competitor patterns for content toggles (no example verified); BitLife's own policy for "surrender"; press coverage of BitLife backlash beyond the 2020 pronouns episode.
- **Next steps if you want to close gaps:** (1) re-run searches once the web-search budget is raised; (2) open each policy page in a browser and capture exact text with dates for the compliance record; (3) sample 30 BitLife events manually from gameplay to calibrate tone and intensity; (4) commission a legal check of target markets.
