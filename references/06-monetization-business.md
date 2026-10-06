# 06 - Monetization, Economy, Retention, Live-Ops, UA and Market (Mobile Life Sims)

Research date: 2026-10-06. Slice: BUSINESS only (mechanics and tech stack live in other files).

Conventions
- Confidence: **HIGH** = read on a primary page (company report, store listing, official doc) this session. **MEDIUM** = reputable secondary or a primary page summarized by a fetch tool. **LOW** = aggregator, vendor blog, single unverified claim, or my own calculation. **unverified** = not found.
- "(calc)" = my arithmetic from cited inputs, not a published number.
- Research limits (stated up front): the WebSearch budget (200 calls) ran out before I could check ATT opt-in rates, Google Play Families details beyond the policy page, YouTube/TikTok creator statistics, and Apple's standard year-2 subscription rate. Those are marked unverified. Several vendor blogs disagree with each other by up to 14x on CPI (see 5.2); I report ranges, not a single "truth".
- Naming correction: the brief mentions "BitLife+" and "Boost". Neither appears among the 10 in-app purchases the App Store page shows (Apple truncates that list, and it also omits the Movie Director pack and BitPass, so absence there is not proof they never existed). The SKUs seen are Bitizenship, God Mode, Boss Mode, expansion packs, Remove Ads, Time Machine, and (until Aug 2026) BitPass. See 1.1.

---

## 1. Revenue models of reference titles

### 1.1 BitLife (Candywriter, owned by Stillfront since 2020) - hybrid: ads + one-time unlocks + expansion packs

App Store listing (US), IAP list and prices. Source: https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536 (fetched 2026-10-06). Confidence HIGH for the list, MEDIUM for exact prices (regional).

| SKU | Price (US) | Type | Notes |
|---|---|---|---|
| Time Machine Use | $0.99 | consumable | Rewind a life / undo a death (revive-like) |
| Remove Ads | $2.99 | one-time | Removes interstitials |
| Bitizenship | $7.99-$9.99 | one-time | Premium perks bundle |
| God Mode | $9.99 | one-time | Edit stats (the "cheat" product) |
| Bitizenship + God Mode | $15.99 | bundle | ~11% discount vs. separate |
| Landlord / Investor / C.U.L.T. expansion packs | $7.99 each | one-time | Content packs |
| Boss Mode | $20.99 | one-time | Highest-priced SKU |
| BitPass | not listed in fetched text | seasonal pass | Retired Aug 2026 (see 1.1b) |

- Rated 4.8 out of 5 with 1.8M ratings, **age rating 18+**, 384 MB; the privacy label says it collects data "used to track you across apps and websites" and shows third-party ads. HIGH. Same URL.
- Business facts from Stillfront (primary investor documents):
  - 2019 net revenue about USD 26M; 42M downloads to date; about 1.2M DAU and 7.8M MAU at acquisition; USD 74.4M upfront price plus earn-out up to USD 120.6M. HIGH. https://www.stillfront.com/en/stillfront-group-acquires-candywriter-llc-and-discloses-updated-pro-forma-figures-for-2019/
  - Net revenue (SEK millions): Q2 2026 = 109 (Q2 2025: 141); H1 2026 = 204 (H1 2025: 277); last-12-months = 413; FY2025 = 485. Organic growth Q2 2026 = -19%, H1 2026 = -19%, LTM = -16.6%. HIGH. https://www.stillfront.com/en/wp-content/uploads/sites/2/2021/10/report-interim-report-q2-2026-260724.pdf (table "Net revenue by product portfolio", extracted with pdftotext).
  - Q1 2026: SEK 95M (Q1 2025: 136M), organic -19%. Stillfront attributes the decline to "a more disciplined user acquisition approach" and "stricter user acquisition approach and challenging comparison numbers"; Q1 shipped "webshop enhancements for U.S. players". HIGH. https://www.stillfront.com/en/wp-content/uploads/sites/2/2021/10/stillfront-interim-report-q1-2026-260429.pdf
  - Q2 2026 sequential recovery was credited to "strong LiveOps execution" and the **Ultimate Fighter Mode expansion pack, "the franchise's best-selling expansion pack to date"**. HIGH (Q2 report, same URL as above).
  - USD equivalent of FY2025 SEK 485M at an assumed SEK 9-10 per USD is about USD 48-54M (calc; FX rate is my assumption, so LOW). Whether Stillfront "net revenue" is after store fees is unverified.
  - Portfolio-level (NOT BitLife-specific) KPIs in the same report: bookings split Q2 2026 = ads 12%, third-party stores 42%, **direct-to-consumer (webshop) 46% (Q2 2025: 39%)**; group gross margin 84% (82%) "driven by a higher share of DTC bookings"; user-acquisition cost = 26% of group net revenue (30%), 30% for key franchises. Portfolio ARPDAU SEK 2.14. Do not read these as BitLife numbers. HIGH as group data.
- A secondary claim that "over 62% of BitLife's revenue is in-game advertising" appeared in a search summary with no traceable source; the cited Mintegral page did not contain it. **unverified**. Treat the ads-vs-IAP split of BitLife as unknown.
- Mintegral "BitLife case study" (eCPM $17-30, D30 ROAS 91%) quotes match-3 expertise, so it is probably mis-attributed. LOW, do not use. https://www.mintegral.com/en/case/candywriter-case-study
- Studio size: about 30 employees (Tracxn, as of 2026-07-31, via search summary) vs. 13 in 2019 (search summary). LOW. Implied revenue per head about SEK 16M (calc, LOW).

#### 1.1b BitPass / Seasons (the cautionary tale)
- Candywriter sold a seasonal pass (BitPass) with "early access" to career packs (BitLife X post, Dec 2025: "Grab a BitPass and play through seasons for early access"). https://x.com/BitLifeApp/status/2003194195276648948 (MEDIUM, from search snippet).
- A BitLife post said "Pride Season hasn't gone according to plan", unlocked all rewards for free and BitPass holders and granted 100k Bits. https://x.com/BitLifeApp/status/2082900685792686263 (MEDIUM, snippet).
- The official what's-new page states seasons were discontinued in Aug 2026 in favour of expansion packs, live events and patches. https://bitlifeapp.com/whats-new/ (MEDIUM; fetched summary).
- Reading: a battle-pass layer was tried, hurt trust, and was removed within about a year. The expansion pack (one-time purchase, big content drop) is the format that set a sales record in the same period.

### 1.2 Other reference titles

| Title | Model | Evidence | Source | Conf. |
|---|---|---|---|---|
| The Sims FreePlay (EA, 2011) | F2P, timers + premium currency (Life Points) + soft currency (Simoleons) + Social Points; ads present; flagged "loot boxes" | IAP ladder $0.99 to $19.99; age 13+; 4.6 stars, 463k ratings | https://apps.apple.com/us/app/the-sims-freeplay/id466965151 | HIGH |
| The Sims FreePlay revenue | about USD 2.2M per month and about 1M downloads per month (AppMagic, Oct 2025) | | https://mobilegamer.biz/ea-is-closing-down-the-sims-mobile/ | MEDIUM |
| The Sims Mobile (EA, 2018) | F2P, **energy** gating + SimCash premium currency (restores energy, buys cosmetics); heirloom/legacy tokens | USD 15M in first 4 months; USD 25M by Sep 2018 (58% US, 7.9% UK); 41.5M downloads | https://sensortower.com/blog/the-sims-mobile-revenue-25-million | HIGH |
| The Sims Mobile lifetime | USD 81M+ on 152M downloads; at the end only about USD 150k per month; content stopped 2024-01-29; delisted 2025-10-21; servers closed 2026-01-20 | | https://mobilegamer.biz/ea-is-closing-down-the-sims-mobile/ ; https://en.wikipedia.org/wiki/The_Sims_Mobile | MEDIUM |
| Sims Mobile design critique | energy = "a means to grind"; opaque XP requirements; timers compress instead of reward | | https://www.deconstructoroffun.com/blog/2018/7/2/simz | MEDIUM |
| Reigns (Nerial/Devolver, 2016) | **Premium** $2.99 on iOS/Android/Steam | 600k+ sold in just over a month; 2M by Aug 2019; first-month gross about USD 1.8M (calc) | https://www.gamedeveloper.com/business/-i-reigns-i-sells-big-on-mobile-proves-premium-games-can-still-be-king ; https://www.gamesradar.com/how-reigns-convinced-two-million-people-to-swipe-right-to-rule-their-kingdom-and-captured-the-game-of-thrones-license/ | MEDIUM |
| Alter Ego (text life sim) | iOS listing shows **paid $4.99, no IAP** | 4.4 stars, 186 ratings (tiny base) | https://apps.apple.com/us/app/alter-ego/id329703516 | HIGH |
| Alter Ego (newer clicker/"ALTER EGO" variant) | Free, bottom banner + rewarded ads; $2.99 remove-ads; IAPs up to $9.99 | secondary review only | https://minireview.io/incremental/alter-ego | LOW |
| Life Restart Simulator (人生重开模拟器) | Free web game; no IAP on iOS; viral text-roll game; "10-pull" talent draw | went viral about 12 h after release, "200 million visits within three days"; built by two people in two weeks, 1,500+ events; iOS clone has 7 ratings | https://baike.baidu.com/en/item/Life%20Restart%20Simulator/3289950 ; https://apps.apple.com/us/app/life-restart-simulator/id1585104858 | LOW (traffic claim), HIGH (listing) |
| Avakin Life (Lockwood, UK) | F2P social world; cosmetics, premium currency, VIP | Lockwood FY2023 revenue GBP 22.35M, EBITDA -GBP 11.2M (aggregator); "200M registered users" (claim) | https://www.preqin.com/data/profile/asset/lockwood-publishing-limited/398573 | LOW. A "USD 1.1B revenue 2024" figure shown by another aggregator is clearly wrong; ignore. |
| Zepeto (Naver Z) | F2P avatar social + **UGC creators**; cosmetics, gacha-style item boxes, brand items | "400M+ users", "123M items sold per month", "161M UGC creations per month" are platform marketing claims; revenue estimates range USD 16M to USD 500M across aggregators | https://expandedramblings.com/index.php/zepeto-statistics-and-facts/ | LOW. Revenue: **unverified** |

Key observation: no free life sim publishes clean revenue. The most reliable data points are Stillfront's reports (BitLife) and AppMagic via trade press (Sims).

### 1.3 Premium vs F2P tradeoff

| Dimension | Premium ($2.99-$4.99) | F2P ads + IAP (BitLife style) |
|---|---|---|
| Revenue ceiling | Reigns: 2M units in about 3 yrs; 2M x $2.99 = about USD 6M gross upper bound (calc, ignores discounts/fees) | BitLife: about SEK 485M in FY2025 (HIGH) |
| UA need | Low: store feature/press-driven; no paid UA possible at $3 price (CPI > LTV) | High: paid UA is the growth engine (and the cause of the 2026 decline when cut) |
| Ethics/regulatory load | Low (no ads, no tracking, simpler COPPA/Families) | High (ad SDKs, ATT, consent, age gating) |
| Content treadmill | Ship once + paid DLC | Mandatory live-ops cadence |
| Store fees | 30%/15% of a small base | Same, plus ads revenue outside store fees |
| Failure mode | Discoverability | Trust erosion (ads, paywalls on content) |

Confidence: MEDIUM (my synthesis from the cited facts).

---

## 2. Monetization market data, ads and subscriptions

### 2.1 Market size (context)
| Metric | Value | Source | Year | Conf. |
|---|---|---|---|---|
| Mobile game IAP revenue | USD 82B, +1% YoY | https://sensortower.com/press/press-release-sensor-tower-state-of-gaming-gaming-drove-52-billion-downloads-82b-iap-revenue-on-mobile-and-12b-premium-revenue-on-steam | 2025 data | HIGH |
| Downloads (mobile+PC+console) | 52B; mobile "entered a more mature phase"; growth shifted to retention/monetization | same | 2025 | HIGH |
| Top mobile grossers | 4X strategy leads (Last War, Whiteout Survival) | same | 2025 | HIGH |
| Simulation/life-sim share of spend | **unverified** (not in the press release) | | | |

### 2.2 Ad formats and eCPM
Ranges differ by source, platform and quarter. Use as order-of-magnitude, then measure with your own mediation.

| Format | Typical range (top-tier markets) | Source | Year | Conf. |
|---|---|---|---|---|
| Rewarded video | $10-$30+ | https://appfollow.io/blog/mobile-game-ads-formats-monetization | undated (2025-26) | LOW |
| Interstitial | $4-$15 | same | | LOW |
| Banner | $0.10-$1.00 | same | | LOW |
| Playable | $8-$25; Native $2-$6 | same | | LOW |
| "Tier-2 markets 30-60% lower" | | same | | LOW |

By region (Appodeal Q4 2024, via Playio): https://blog.playio.co/mobile-game-ecpm-benchmarks-2026 (MEDIUM)

| Region | Rewarded iOS | Rewarded Android | Interstitial iOS | Interstitial Android |
|---|---|---|---|---|
| North America | ~$13.6 | ~$9.0 | ~$10.4 | ~$9.6 |
| Europe | ~$8.9 | ~$5.1 | ~$5.3 | ~$3.6 |
| APAC | ~$7.5 | ~$8.2 | ~$5.3 | ~$5.5 |
| Middle East | ~$8.4 | ~$2.4 | ~$3.3 | ~$1.6 |
| Latin America | ~$3.4 | ~$1.8 | ~$2.2 | ~$1.3 |

Conflict to note: another aggregator quotes US rewarded eCPM of $24-30 (iOS $24.39, Android $30.25) and Tenjin x CAS (Q2 2024) lists South Korea rewarded at $20.94 (iOS) / $22.01 (Android) (same Playio page, MEDIUM). Differences come from dataset (games-only vs all apps), quarter (Q4 is the price peak) and whether the number is rewarded-only.

Adjust (primary, 2024 data, published 2025): global median **ad revenue per mille (ARPM) for simulation games rose from $7.18 to $7.45**; hybrid casual $2.70; all-gaming NA $5.01, US $4.71, Japan $3.27, APAC $1.57, India $0.50. HIGH. Source: https://investgame.net/wp-content/uploads/2025/05/gamingreport2025_ebook_en.pdf (Adjust "gaming app insights report 2025", pdftotext). ARPM is per 1,000 impressions or per mille of sessions depending on definition; I read it as the closest published analogue to a blended eCPM for sims.

Ad ARPDAU by game type (AppFollow, undated): hyper-casual $0.01-$0.10, casual $0.05-$0.50, mid-core $0.30-$1.50 (LOW). Heuristic from the same source: more than 3 interstitials per session correlates with "20-30% lower D7 retention" (LOW; vendor heuristic, no study cited).

### 2.3 IAP and subscription benchmarks

| Metric | Value | Source | Year | Conf. |
|---|---|---|---|---|
| ARPMAU (all gaming, ad+IAP) | $0.28 (2023: $0.31); casino $1.92, strategy $1.18, RPG $3.63, hyper casual $0.15 | Adjust, link in 2.2 | 2024 | HIGH |
| IAP ARPMAU (all gaming) | $0.58 (2023: $0.83); RPG $6.48, strategy $5.34, action $1.46, board $0.30 | Adjust | 2024 | HIGH |
| Simulation-specific ARPMAU | in chart only, not extractable as text | Adjust | 2024 | unverified |
| Hybrid-casual ARPDAU | $0.15-$0.50 blended; about 40-50% of revenue from IAP | https://blog.playio.co/arpdau-benchmarks-mobile-games ; https://www.gamigion.com/2025-hybridcasual-market-overview-with-real-data/ | 2025-26 | LOW |
| Casual ads-only ARPDAU | $0.01-$0.05 | Playio (citing Game Growth Advisor) | 2026 | LOW |
| D90 ARPPU, casual | "$7.26" attributed to AppsFlyer 2026 | Playio page above | 2026 | LOW (secondhand, not seen in AppsFlyer) |
| Payer conversion (games IAP) | "near 1%" used as an example only; **no trustworthy primary benchmark found** | Playio page | 2026 | unverified. Playio itself says there is no trustworthy primary source for IAP-heavy titles. |
| Subscription: download-to-paid, **gaming** apps | 1.0% median; trial-to-paid 25.0%; 82% choose weekly plans; monthly realized LTV per payer $8.41; time to $1K MRR 32 days | RevenueCat State of Subscription Apps 2026, https://www.revenuecat.com/state-of-subscription-apps/ | 2026 | MEDIUM (page summarized by fetch tool) |
| Subscription price medians (all categories) | weekly $5-$5.99; monthly about $10; yearly $34.80; IN/SEA about 50% of NA price | same | 2026 | MEDIUM |
| Hard paywall vs freemium conversion | 10.7% vs 2.1% | same | 2026 | MEDIUM |

BitLife price anchors (HIGH, listing in 1.1): $2.99 remove-ads, $7.99 packs, $9.99 God Mode, $20.99 Boss Mode. Those are the price points that have survived about 8 years of testing; start there.

### 2.4 Platform fees and policy (as of 2026-10-06)

| Rule | Detail | Source | Conf. |
|---|---|---|---|
| Apple standard | 30%; **Small Business Program 15%** for developers with up to USD 1M proceeds in prior year (re-qualify annually) | https://developer.apple.com/app-store/small-business-program/ | HIGH |
| Apple, US link-outs | Courts barred Apple from commission on US external payment links; Ninth Circuit refused to pause (2026-04-29); Apple's court-ordered proposal if allowed to charge: **15% standard, 10% for subscription renewals/news/video, 5% for Small Business members**; Supreme Court review pending (oral arguments from October) | https://techcrunch.com/2026/04/29/apple-epic-games-app-store-fees-pause-changes-supreme-court/ ; https://www.macrumors.com/2026/08/13/app-store-fees-apple-link-outs/ | MEDIUM-HIGH; the fee outcome is **unsettled**, so plan with 0-15% on web checkout |
| Apple subscriptions | Must provide "ongoing value", at least 7-day period, work across devices (guideline 3.1.2(a)); year-2 rate 15% from background knowledge, not re-verified this session | https://developer.apple.com/app-store/review/guidelines/ | HIGH (rules), unverified (year-2 %) |
| Apple loot boxes | Must disclose odds of each item type before purchase (3.1.1) | same | HIGH |
| Apple purchased currency | "may not expire"; restore mechanism required (3.1.1) | same | HIGH |
| Apple Kids Category | No purchases or links out except behind a parental gate; no third-party analytics/ads (1.3) | same | HIGH |
| Apple age ratings | New rating system (adds 13+/16+/18+ tiers per Apple), developers had to answer new questions by **2026-01-31** | https://developer.apple.com/news/upcoming-requirements/?id=07242025a | HIGH (deadline); details of tiers not fetched |
| Google Play fees (from 2026-06-30 in US/EEA/UK) | Service fee **20%** on IAP for new installs, **10%** on subscriptions, optional Play Billing fee +5%; the Android Developers Blog (https://android-developers.googleblog.com/2026/06/play-expanded-billing.html) states a **10% fee on the first $1M of annual earnings**, so a small indie may pay 10% across IAP as well (verify the exact tier rules before modelling); developer programs 15% on new installs; global by 2027-09-30; Australia Sep 2026, Korea/Japan end 2026 | https://techcrunch.com/2026/03/04/google-settles-with-epic-games-drops-its-play-store-commissions-to-20 | MEDIUM-HIGH |
| Google Play Families policy | Child-directed apps may only use Families self-certified ad SDKs; no personalized ads; no transmitting Android advertising ID; neutral age screen for mixed audiences | https://support.google.com/googleplay/android-developer/answer/9893335 | HIGH |
| ATT (iOS tracking prompt) | Opt-in rate **unverified**. BitLife's privacy label declares cross-app tracking, so it runs the ATT prompt. Plan on lower iOS ad eCPMs and attribution gaps for non-consenting users | App Store listing (1.1) | HIGH (label), unverified (rate) |

---

## 3. Retention and engagement benchmarks

Warning from Game Growth Advisor (https://gamegrowthadvisor.com/blog/2026-03-17-mobile-game-retention-strategies-2026/, MEDIUM): "every 2026 genre table you find is an anchor from four years ago wearing a current date." Genre retention tables circulating online are mostly old and funded-game-biased. Prefer GameAnalytics (11,600 games, 2025) for the market baseline and treat genre numbers as optimistic.

| Source | Population | D1 | D7 | D30 | Year | Conf. |
|---|---|---|---|---|---|---|
| GameAnalytics median (P50) | all mobile games | ~22% | just under 4% | 0.68-0.79% | 2025 | HIGH |
| GameAnalytics top quartile (P75) | all | ~30% | 6-7% | 1.6-1.8% | 2025 | HIGH |
| GameAnalytics top 1% (P99) | all | 64-68% | 25-28% | 13-15% | 2025 | HIGH |
| Adjust (global, attributed) | all games | 27% (from 28%) | n/a | n/a | 2024 | HIGH |
| Mistplay via Segwise | simulation | 30.10% | 8.71% | 2.96% | year unstated | LOW |
| MWM | casual | 35-45% | 12-20% | 5-10% | Q3 2025 (published 2026) | LOW (looks like top-performer range; median D30 across catalog 3.9% per same page) |
| Gamigion | hybrid-casual | n/a | about 20% | about 10% | 2025 | LOW (target, not median) |

Sources: https://www.gameanalytics.com/reports/2026-mobile-pc-gaming-benchmarks ; Adjust PDF in 2.2 ; https://segwise.ai/blog/mobile-gaming-app-user-retention-strategies ; https://mwm.ai/glossary/retention ; Gamigion link in 2.3.

Practical targets for planning (my synthesis, MEDIUM-LOW): D1 30%+, D7 8-10%, D30 3-4% would place a life sim in or above the GameAnalytics top quartile and roughly in line with the Mistplay simulation row. A D7 of 20% is about 3x the top quartile of the entire market (Game Growth Advisor).

Engagement

| Metric | Value | Source | Year | Conf. |
|---|---|---|---|---|
| Median daily playtime | ~12 min (top 1%: 94+ min) | GameAnalytics | 2025 | HIGH |
| Median session length | 3.1-3.5 min (top 1%: 22+ min) | GameAnalytics | 2025 | HIGH |
| Median sessions per day | 3.8-3.9 (top 1%: 12+) | GameAnalytics | 2025 | HIGH |
| Session length, simulation | 24.31 min avg (all gaming 30.75; sports 26.72; action 45.15; US 24.76) | Adjust (definition differs: it measures time between app open/close for attributed users) | 2024 | HIGH as quoted; not comparable to GameAnalytics |
| Hybrid-casual session | 21.6 min | Adjust | 2024 | HIGH |

Implication: a life-sim "year" tap-loop of 2-4 minutes fits the median session; Adjust shows sims hold longer sessions than most casual categories.

---

## 4. Live-ops, content and economy

### 4.1 Cadence observed
| Game | Cadence | Evidence | Conf. |
|---|---|---|---|
| BitLife | Major content every 1-2 months (Vampire Mode Oct 2025, Ultimate Fighter Mode Jun 2026, Movie Director pack Sep 2026); expansion packs sold at $7.99; seasons dropped Aug 2026 | https://bitlifeapp.com/whats-new/ ; BitLife TikTok bio "The Movie Director Expansion Pack is HERE" https://www.tiktok.com/@bitlifeapp | MEDIUM |
| Sims FreePlay | Continuous themed events since 2011 (e.g. "Tale of Knights"; version 117 in 2026), 2.6 GB client | App Store listing (1.2) | HIGH |
| Sims Mobile | Event-and-energy loop; content froze 2024-01-29, shut down 2026-01-20 | Wikipedia; mobilegamer | MEDIUM |

Lesson from Sims: the newer, heavier, energy-gated game (Sims Mobile, about USD 150k/month at the end) lost to the older timer-and-premium-currency game (FreePlay, about USD 2.2M/month) (MEDIUM, mobilegamer). Energy gating plus opaque requirements drew design criticism (Deconstructor of Fun, MEDIUM).

### 4.2 Content-update economics
- **Content cost per hour of play: unverified.** No public figure was found for any life sim.
- Data points that bound it: Life Restart Simulator shipped about 1,500 events built by two people in two weeks (LOW, Baidu wiki). BitLife sells packs at $7.99 and ships one every 1-2 months with a studio of about 30 (LOW headcount).
- Model to use instead (formula, not data): `content ROI = (pack units sold x net price) / (dev cost + marketing)`; track `payback = dev cost / (net revenue per month)`. Instrument per-pack attach rate from day one.
- Text-event content is the cheapest "hour of play" in the genre (no art/animation), which is why indie clones appear continuously: Reddit threads from Jan-Sep 2026 show at least three developers announcing BitLife-style games in r/bitlife (examples: https://reddit.com/r/bitlife/comments/1qjr2gb/ , https://reddit.com/r/bitlife/comments/1whtb84/ , https://reddit.com/r/bitlife/comments/1wigiqf/) (HIGH that the threads exist; they show competition risk and demand signal, not sales).

### 4.3 Economy design notes from references
- BitLife has no soft-currency economy for core play; it sells **access** (modes, packs) and **convenience** (no ads, time machine). That is why it avoids energy/premium-currency backlash.
- Sims FreePlay/Mobile run multi-currency economies (Simoleons, Life/Social Points, SimCash, Heirloom/Fashion Tokens). Strong monetization of impatience, but listing flags loot boxes and 13+ rating.
- Apple rule: purchased in-game currency may not expire (3.1.1). Design currencies accordingly.

---

## 5. User acquisition and marketing

### 5.1 Organic, social and creator ecosystem
| Fact | Value | Source | Conf. |
|---|---|---|---|
| BitLife official TikTok followers | 71.7M | https://www.tiktok.com/@bitlifeapp (fetched 2026-10-06; the "7 million likes" figure on the same fetch looks inconsistent, ignore) | MEDIUM |
| r/bitlife subscribers | 87,182; fan-run, not affiliated with devs (mods say so) | Reddit API via MCP, 2026-10-06 | HIGH |
| BitLife YouTube channel size, creator view totals, #bitlife hashtag views | **unverified** (pages did not render) | | |
| BitLife paid TikTok UA | TikTok Smart+ case study: ROAS +43% over KPI, CPI -25%, CTR +31% vs manual campaigns; expanded from iOS to UK/CA/AU/Android; used TikTok Creator Challenge for creative variety | https://ads.tiktok.com/business/en/inspiration/candywriter-bitlife (vendor-authored) | MEDIUM |
| Life Restart Simulator | viral within 12 h via sharing of a text "life result" | Baidu wiki | LOW |

Shareability is a structural advantage of the genre: every run produces a story (absurd death, crime, fame) that fits a 15-30 s screen recording or a screenshot. Treat a shareable end-of-life summary card and a "replay my life" video export as growth features, not extras. (Analysis, MEDIUM.)

### 5.2 CPI (cost per install)

Published CPI benchmarks conflict by up to 14x (Game Growth Advisor: one 2026 benchmark says $0.14, another $2.00 for casual Android). Use bands and measure.

| Benchmark | Value | Source | Year | Conf. |
|---|---|---|---|---|
| Adjust global median CPI, all gaming | $0.36 (2023: $0.38) | Adjust PDF (2.2) | 2024 | HIGH |
| North America / US | $1.20 / $1.22 | same | 2024 | HIGH |
| DACH / Singapore | $1.22 / $1.35 | same | 2024 | HIGH |
| APAC / India | $0.17 / $0.02 | same | 2024 | HIGH |
| By genre | hybrid casual $0.95 (from $0.54), hyper casual $0.40, casino $1.50 | same | 2024 | HIGH |
| Casual games, iOS vs Android | $1.41 vs $0.14; simulation iOS about 10x Android (no figure) | Liftoff 2025 Casual Gaming Apps Report, https://liftoff.ai/2025-casual-gaming-apps-report/ | 2025 (Feb 2024 - Feb 2025 data) | MEDIUM |
| D30 ROAS casual | iOS 47%, Android 15% | same | 2025 | MEDIUM |
| Android casual by country | US $1.50-3.50; UK/CA/AU $1.00-2.50; W. Europe $0.60-1.50; LATAM $0.15-0.60; SEA $0.20-0.60; India $0.08-0.30; iOS = 3-4x | Game Growth Advisor citing Admiral Media/Adjust/Liftoff, https://gamegrowthadvisor.com/blog/2026-03-17-user-acquisition-cpi-benchmarks-2026/ | 2026 | LOW |
| Simulation CPI by country (simulation-specific) | **unverified** (only the iOS/Android 10x ratio found) | | | |

Group-level context: Stillfront spends 26-30% of net revenue on UA (HIGH, 1.1). BitLife cut UA in 2026 and its revenue fell 19% organically: BitLife is paid-UA dependent.

### 5.3 ASO / virality
Specific ASO conversion benchmarks: **unverified**. Category: Simulation/Games; BitLife title keyword "Life Simulator" is the generic keyword for the genre (listing title, HIGH). Name your app with the genre keyword in subtitle.

---

## 6. Unit economics: LTV vs CAC (worked example)

All inputs are illustrative assumptions, anchored where possible to cited benchmarks. Do not treat the output as a forecast.

**Cohort:** 10,000 paid-plus-organic installs, mix weighted to US/UK/CA/AU on iOS+Android.

Step 1 - retention curve (assumption, near top quartile of GameAnalytics and near the Mistplay sim row): D1 30%, D3 17%, D7 10%, D14 7%, D30 4%, D60 2.5%, D90 1.8%.
Trapezoid integration gives expected active days in first 90 days = 0.65 + 0.47 + 0.54 + 0.595 + 0.88 + 0.975 + 0.645 = **4.76 active days per install** (calc).

Step 2 - ad revenue: 4 ad impressions per active day (1 rewarded + 3 interstitial) at blended $7.45 per 1,000 (Adjust simulation ARPM 2024, HIGH) = **$0.030 per DAU**; round to $0.04 for a US-weighted mix. Ad LTV90 = 4.76 x $0.04 = **$0.19** (calc). Ads are not subject to store fees.

Step 3 - IAP: 2% of installs pay by D90 (assumption; no primary benchmark exists, see 2.3) at $12 each (say $2.99 remove-ads + $7.99 pack, partly overlapping). IAP gross LTV90 = 0.02 x $12 = **$0.24**; after 30% store fee = $0.168; after 15% = $0.204 (calc). Under a 10% first-$1M tier the figure would be $0.216; the 30%/15% rows are the conservative case.

Step 4 - totals: Gross LTV90 = $0.19 + $0.24 = $0.43. **Net LTV90 = $0.19 + $0.168 = $0.36** (30% fee) or $0.39 (15% fee).

Step 5 - CAC: paid CPI $1.20 (Adjust NA median, HIGH); 30% of installs organic at zero cost -> blended CAC = 0.7 x $1.20 = **$0.84** (calc).

Result, scenario A (baseline): LTV90 / CAC = 0.36 / 0.84 = **0.43**. Sanity check: Liftoff reports D30 ROAS for casual iOS 47% and Android 15% (MEDIUM); a D90 ratio of 43% is in the same range. Paid US acquisition does not pay back at D90 here.

| Scenario | Assumptions changed | Net LTV90 | CAC | LTV90/CAC |
|---|---|---|---|---|
| A baseline | above | $0.36 | $0.84 | 0.43 |
| B improved | active days 5.5 (D30 5%), ad ARPDAU $0.06, 3% payers at $15 | $0.33 ads + $0.315 IAP = $0.645 | $0.84 | 0.77 |
| B at D365 | assume LTV365 = 1.8x LTV90 (assumption, LOW) | about $1.16 | $0.84 | about 1.4 |
| C cheap geos | scenario A LTV scaled to 60% for lower eCPM/ARPPU, CPI $0.30 (LATAM/SEA Android band), 30% organic | $0.22 | $0.21 | about 1.0 |
| D no paid UA | 100% organic/creator | $0.36 | $0 (excluding content cost) | n/a |

How to use it: the break-even rule is `CPI_max = (net LTV at your payback horizon) / (1 - organic share)`. At scenario A that is $0.36 / 0.7 = $0.51 for D90 payback; the US market at $1.22 is out of reach, LATAM/SEA/India Android is within reach but with lower LTV. Raise LTV levers in this order: (1) retention (every extra active day is worth about $0.04-$0.06 in ads alone), (2) payer conversion via a visible, fairly priced one-time unlock, (3) ARPPU via packs, (4) lower store fee via web shop (46% of Stillfront bookings now flow through DTC channels, HIGH group-level).

---

## 7. Ethical and regulatory considerations

| Topic | Fact | Source | Conf. |
|---|---|---|---|
| FTC v Epic (Fortnite) | USD 520M total: USD 275M COPPA penalty + USD 245M refunds for dark patterns (confusing one-button purchases); voice/text chat on by default for minors | https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations | HIGH (2022-12-19) |
| FTC v Cognosphere (Genshin Impact) | USD 20M; no loot boxes for under-16s without parental consent; odds and virtual-currency conversion disclosure; real-money direct purchase option; delete data of under-13s | https://www.gamedeveloper.com/business/genshin-impact-developer-fined-20-million-over-loot-box-practices | HIGH-MEDIUM (2025-01) |
| COPPA 2025 rule | Separate verifiable parental consent to disclose children's data for targeted advertising; retention limits; broader personal-information definition (biometrics); effective 2025-06-23, main compliance date **2026-04-22** (already passed) | https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data ; https://www.hunton.com/privacy-and-cybersecurity-law-blog/coppa-rule-amendment-compliance-deadline-approaches | HIGH (rule), MEDIUM (dates from secondary) |
| Brazil | Law prohibiting loot boxes for under-18s, in force **March 2026**; loot-box games must be rated 18+ | https://wnhub.io/news/legal/item-48938 ; https://wccftech.com/brazil-president-signs-law-to-ban-loot-boxes/ | MEDIUM |
| Belgium / Netherlands | Paid loot boxes treated as gambling | https://www.1d3.com/blog/loot-box-regulation-worldwide | MEDIUM |
| UK / Australia | UK: not gambling (voluntary code, as of Jun 2026); Australia: largely unregulated, 2023 Senate inquiry recommended mandatory rating label | https://programminginsider.com/loot-boxes-regulation-and-where-the-line-sits-in-2026/ | MEDIUM-LOW |
| EU consumer authorities (CPC) on in-game currencies | A March 2025 action on virtual currencies exists in my memory; fetch failed. | | **unverified** |
| GDPR Art. 8 (child consent age 13-16 per member state) and UK Children's Code | background knowledge, not fetched this session | | unverified |
| Gacha for avatars (Zepeto, Avakin) | Mostly opaque item boxes; falls under Apple 3.1.1 odds disclosure and the Brazil/Belgium rules above | Apple guidelines | HIGH (Apple rule) |

Design consequences for a life sim (analysis, MEDIUM):
- A life sim with crime, drugs and sex belongs at a mature rating. BitLife is **18+** on iOS (HIGH) which keeps it out of Kids Category and simplifies COPPA exposure, but you still need an age gate because under-13s will install.
- If you target teens/families, you must use Families-certified ad SDKs, drop personalized ads and ATT-based tracking, and put purchases behind a parental gate (Apple 1.3, Google Families).
- Never ship random-reward paid mechanics (gacha, "random talent draw" for real money) without odds disclosure; avoid them entirely if any under-18 audience exists.
- Dark patterns that cost real money in enforcement (Epic): accidental one-tap purchases, confusing buttons, hidden totals. Add confirm steps and refund paths.

---

## 8. "Lives" structure: monetization patterns and backlash

| Pattern | Seen in | Evidence | Backlash level (my assessment) | Evidence for assessment |
|---|---|---|---|---|
| Pay/watch ad to revive or rewind a death (Time Machine, second chance) | BitLife ($0.99 Time Machine, HIGH) | App Store listing | Low-Medium. Players treat it as optional; risk if it becomes mandatory for progress | No complaint thread found specifically about it; **unverified** |
| Pay to skip waits/timers | Sims FreePlay (Life Points) | $0.99-$19.99 ladder | Medium; classic F2P critique, 13+ rating and loot-box flag | App Store listing |
| Energy gating | Sims Mobile | Deconstructor of Fun critique; game shut down | High | MEDIUM |
| One-time "cheat/sandbox" unlock (God Mode, Bitizenship) | BitLife | $9.99 / $7.99-9.99 | Low; accepted, long-lived | still listed, 4.8 stars |
| Expansion packs | BitLife | $7.99; Ultimate Fighter = best-selling pack | Low when content is new; **High when it follows an ad promise**: r/bitlife user filed a BBB complaint because Vampire Mode was "advertised in the job pack" and then sat behind another paywall (score ~48-50) | https://reddit.com/r/bitlife/comments/1owyi9w/ |
| Season/battle pass (BitPass) | BitLife | Retired Aug 2026 after "not going as planned" | **High**: removed within about a year, with free reward unlocks and 100k Bits as apology | bitlifeapp.com what's-new; X post |
| Ads frequency | BitLife | "Gave up because of too many ads" (r/bitlife, Oct 2024); "Bitlife really is at its lowest point now" (score 286, 121 comments, Dec 2024): "another lackluster expansion for $5.99", "turn into just another cash grab" | Medium-High, slow burn | https://reddit.com/r/bitlife/comments/1hf2l8s/ ; /1g8b1on/ |
| Previously free content moved behind paywall | BitLife | Players "feel betrayed" per forum summaries; a Change.org petition "Stop the greed of BitLife devs" exists (signature count unverified) | High | https://www.change.org/p/stop-the-greed-of-bitlife-devs (LOW) |
| Cosmetics (outfits, portraits, mansions) | Sims, Avakin, Zepeto | Core of avatar economies | Lowest | Sims Mobile design note: hard currency "focuses on cosmetics and convenience" (MEDIUM) |
| Legacy/generational boosts (heirloom tokens, inherit traits) | Sims Mobile | Heirloom Tokens from retiring Sims unlock trait boosts | Low-Medium; good fit with "lives" loop | Deconstructor of Fun |
| Premium one-time purchase for the whole game | Reigns, Alter Ego | $2.99 / $4.99 | Lowest | listings |

Demand signals from the community (r/bitlife thread, Jan 2026, 155 comments): "make the cooler stuff free like the career packs", "don't sell our data", fictional celebrities instead of real ones, realistic legal system, property decoration, inherited traits, grandparents. https://reddit.com/r/bitlife/comments/1qjr2gb/ (HIGH that these were said; MEDIUM as market signal).

---

## 9. Implications for our mobile life-sim game

1. **Recommended stack (launch):** free to start + (a) rewarded ads as primary ad format, interstitials capped at natural break points (e.g. every N life years, never mid-decision); (b) one-time **Remove Ads** at about $2.99; (c) one-time **sandbox/"cheat" mode** at about $9.99; (d) **content expansion packs at $4.99-$7.99** every 6-8 weeks; (e) low-risk cosmetics (portraits, UI themes). These are BitLife's surviving SKUs (HIGH) and have the lowest backlash.
2. **Defer** any subscription until there is continuous value: Apple 3.1.2(a) demands ongoing value; gaming subscription conversion is about 1.0% download-to-paid with 82% weekly plans (RevenueCat 2026, MEDIUM). Test a "Plus" (ad-free + all packs + sandbox) once pack count exceeds about 6.
3. **Skip the season/battle pass** at launch. BitLife retired BitPass in Aug 2026 after backlash; its best pack of the year was a one-time purchase.
4. **Never retro-paywall** content you advertised as free or already shipped; announce paid vs free before release (BBB-complaint thread, Dec 2024 "cash grab" thread).
5. **Revive/second-chance:** offer one rewarded-ad revive per life, plus a small IAP "Time Machine" ($0.99 anchor). Do not gate story progress behind it. Avoid energy systems entirely (Sims Mobile closed at about USD 150k/month vs FreePlay about USD 2.2M/month).
6. **Plan for paid UA not paying back** in Tier-1 markets: baseline LTV90/CAC 0.43 in section 6, consistent with Liftoff D30 ROAS (iOS 47%, Android 15%). Launch with organic/creator/TikTok-first growth, soft-launch in Android Tier-2/3 where CPI is $0.02-$0.60, and only scale US iOS after measured D30 ROAS exceeds your own payback target.
7. **Build shareability into the loop:** end-of-life summary card, short-video export, "challenge seeds". BitLife has 71.7M TikTok followers (MEDIUM) and Life Restart Simulator went viral from shared results (LOW); zero-cost distribution is the genre's main advantage.
8. **Build a web shop early (DTC):** Stillfront's DTC share rose to 46% of group bookings and lifted gross margin to 84% (HIGH, group-level); BitLife shipped US webshop enhancements in Q1 2026. US link-outs are currently commission-free, but Apple has proposed 5-15% and the case is before the Supreme Court: model both 0% and 15%.
9. **Rating and compliance by design:** choose a mature rating (BitLife is 18+), add an age gate at first launch, support ATT and consent flows, odds disclosure for any randomized paid item, non-expiring purchased currency. If any under-13 or Kids-Category audience is intended, remove personalized ads, use Families-certified SDKs, and gate purchases (Apple 1.3, Google Families, COPPA 2026 compliance date passed).
10. **Avoid:** gacha/loot boxes (Genshin USD 20M, Brazil minors ban from March 2026, Belgium/NL), confusing purchase buttons (Epic USD 245M refunds), energy timers, cross-app data sale (a top-voted concern in r/bitlife).
11. **Retention targets:** D1 30%, D7 8-10%, D30 3-4%. Market median is D1 22%, D7 under 4%, D30 about 0.7% (GameAnalytics 2025, HIGH). Do not plan around "40% D1, 20% D7" claims.
12. **Live-ops cadence:** one content drop every 6-8 weeks plus weekly light events; content is the main cost, so keep the event format text-first. Track attach rate and payback per pack; "content cost per hour of play" has no public benchmark (unverified), so instrument it yourself.
13. **Revenue expectation (calibration, not forecast):** the category leader makes about SEK 485M (about USD 50M, FX assumed) per year after 8 years and is shrinking 16-19% organically; a new entrant should plan on a small indie P&L (premium Reigns-style ceiling of roughly USD 6M gross lifetime) and treat any F2P scale-up as an option, not the base case.
14. **Competitive window:** the BitLife community is showing fatigue (ads, paywalls, seasons failure) and at least three indie clone projects appeared on its subreddit in 2026 (HIGH that threads exist). A trust-first monetization stance (clear prices, no retro paywalls, fewer ads) is itself a differentiator.
15. **Open verification list before committing budget:** ATT opt-in rate; simulation-specific CPI by country; payer conversion and ARPPU for life sims; BitLife ad-vs-IAP split; YouTube/creator data; EU virtual-currency rules; Apple year-2 subscription fee; Zepeto/Avakin real revenue.
