# 02 - BitLife Deep Dive (category leader, text-based life simulator)

Research date: 2026-10-06. Scope: BitLife only (other games and generic monetization theory live in sibling files).
Goal this file serves: "Research life simulator games thoroughly, in every aspect, because we will build a similar mobile game."

## 0. How to read this file

**Confidence labels**
- **HIGH** = I opened the source in this session and it states the claim (or I computed it from numbers in the source).
- **MEDIUM** = secondary / fan-edited / search-result snippet only / my inference from HIGH facts.
- **LOW** = guess. Marked "unverified" when I found nothing.

**Claim format**: `claim [source-id, LABEL]`. Source IDs resolve to URLs in the table below. Wiki pages use `W:<Page>` and resolve to `https://bitlife-life-simulator.fandom.com/wiki/<Page>` (fetched through the MediaWiki API at `.../api.php?action=parse`, because plain page fetch returned HTTP 402/403).

**Source quality warnings**
- The Fandom wiki is fan-edited, partly stale (the big "Updates" table stops at Oct 2023; many pages say "under construction"; salary cells mix EUR and USD and contain obvious typos). Use it for structure and mechanics, not for exact numbers.
- Reddit is used for aggregate sentiment and for quoting what players say Candywriter said. Candywriter's own wording is only HIGH where I opened an official page.
- Web search budget ran out mid-research (200/200 calls). Later lookups used direct fetches, the MediaWiki API, Reddit MCP, and an HTML search endpoint.

### Source table

| ID | URL | Type | Notes |
|---|---|---|---|
| S1 | https://bitlifeapp.com/ | Official site | "174M+" downloads, "4.7 stars", "4M Reviews" |
| S2 | https://bitlifeapp.com/whats-new/ | Official news feed | Sep 2026 and earlier items |
| S3 | https://bitlifeapp.com/whats-new/patch-notes/ | Official patch notes | Jul and Aug 2026 |
| S4 | https://bitlifeapp.com/help/ | Official FAQ | Purchases, restore, languages |
| S5 | https://bitlifeapp.com/whats-new/end-of-seasons/ | Official post | Seasons ended 14 Aug 2026 |
| S6 | https://bitlifeapp.com/whats-new/one-app-every-language-your-life-choices-just-got-international/ | Official post | Language apps merged |
| S7 | https://bitlifeapp.com/whats-new/movie-director-expansion-pack-is-out-now/ | Official post | Movie Director, 10 Sep 2026 |
| S8 | https://bitlifeapp.com/moviedirector/ | Official promo | Film Festival sweepstakes |
| S9 | https://bitlifeapp.com/win888/ | Official promo | 8th-birthday referral giveaway |
| S10 | https://bitlifeapp.com/whats-new/ultimate-fighter-mode/ | Official post | UFM mechanics |
| S11 | https://bitlifeapp.com/whats-new/vampire-mode/ | Official post | Vampire Mode mechanics |
| S12 | https://bitlifeapp.com/live-events/ | Official page | Live events |
| S13 | https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536 | App Store page | IAP price list, chart rank (fetched 2026-10-06) |
| S14 | https://itunes.apple.com/lookup?id=1374403536&country=us | Apple lookup API | Rating, ratings count, release date, version, languages |
| S15 | https://play.google.com/store/apps/details?id=com.candywriter.bitlife&hl=en_US | Google Play page | Rating, installs, IAP range (HTML parsed with curl) |
| S16 | https://candywriter.com/about/ | Studio site | Founded 2006, Miami, Stillfront 2020 |
| S17 | https://candywriter.com/games/ | Studio site | 4 live titles, 68 archived |
| S18 | https://www.stillfront.com/en/stillfront-group-acquires-candywriter-llc-and-discloses-updated-pro-forma-figures-for-2019/ | Acquirer press release | 2019 pro-forma numbers |
| S19 | https://www.gamedeveloper.com/business/stillfront-group-acquires-casual-game-maker-candywriter-for-74-4-million | Press | Same deal |
| S20 | https://news.cision.com/stillfront-group-ab/r/stillfront-group-acquires-candywriter--llc-and-discloses-updated-pro-forma-figures-for-2019,c3095736 | Press release | Same deal |
| S21 | https://www.stillfront.com/en/wp-content/uploads/sites/2/2021/10/stillfront-annual-report-2025-260422.pdf | Annual report 2025 | BitLife franchise page (pdftotext) |
| S22 | https://www.stillfront.com/en/wp-content/uploads/sites/2/2021/10/report-interim-report-q2-2026-260724.pdf | Q2 2026 interim report | BitLife net revenue and commentary |
| S23 | https://www.gamigion.com/bitlifes-aggressive-interstitial-monetization-strategy/ | Trade press, 2025-06-17 | Ad frequency, Sensor Tower-style stats |
| S24 | https://sensortower.com/blog/2025-q4-unified-top-5-simulator-games-revenue-us-60416e41241bc16eb8905c2f | Sensor Tower blog | US Q4 2025 simulator comparison |
| S25 | https://app.sensortower.com/overview/1374403536?country=us | Sensor Tower page | Only search-snippet figures readable |
| S26 | https://goodgamestudios.com/company/press/releases/goodgame-studios-partners-with-candywriter-to-launch-hit-mobile-game-bitlife-for-german-audiences/ | Press release, 2021-11-16 | German edition |
| S27 | https://handwiki.org/wiki/Software:BitLife | Wiki mirror | Release dates, ratings (old) |
| S28 | https://bitlife-life-simulator.fandom.com/ | Fan wiki | 6,009 pages / 1,580 articles / 29,659 edits (API `siteinfo`, 2026-10-06) |
| S29 | https://www.reddit.com/r/BitLifeApp/ and https://www.reddit.com/r/bitlife/ | Community | Thread permalinks cited inline |
| S30 | https://progameguides.com/bitlife/what-is-boss-mode-in-bitlife/ and sibling guides | Guide sites | Search snippets only (page fetch got 403) |
| S31 | https://www.instagram.com/p/DSS_bOvE6W8/ | Official Instagram (snippet) | Dec 2025 Seasons / BitPass / Music Producer |
| S32 | https://www.gamezebo.com/news/bitlife-developer-candywriter-has-acquired-instlife-and-will-merge-it-with-bitlife-over-the-coming-months/ | Press (snippet only) | InstLife acquisition |
| S33 | https://candywriter.com/ | Studio home | Miami studio, makers of BitLife |

---

## 1. Snapshot (as of 2026-10-06)

| Item | Value | Source |
|---|---|---|
| Genre | Text-based life simulator, choice-driven, single-player, free-to-play | S13 [HIGH] |
| Developer / publisher | Candywriter, LLC (Miami, FL), owned by Stillfront Group | S16, S21 [HIGH] |
| iOS launch | 29 Sep 2018 (Apple record: 2018-09-30T04:46Z) | S14, W:BitLife: Life Simulator [HIGH] |
| Android launch | 5 Feb 2019 (Google Play page) | S15 [HIGH] |
| Current iOS version | 3.25.1, released 2026-09-21 | S14 [HIGH] |
| App Store rating | 4.76 average from 1,794,736 ratings | S14 [HIGH] |
| Google Play rating | 4.40 average from 1,311,194 ratings; "50M+" installs shown | S15 [HIGH] |
| Official claim | "174M+ downloads", "4.7 stars", "4M Reviews" | S1 [HIGH that the site claims it; the number itself MEDIUM] |
| Age rating | iOS 17+ (API) / 18+ (store page); Google Play "Mature 17+" | S14, S13, S15 [HIGH] |
| Install size | 384 MB (iOS) | S14 [HIGH] |
| Languages | EN, FR, DE, PT, ES (all in one app since Aug 2026) | S14, S6 [HIGH] |
| Store chart | #7 in App Store "Roleplaying" games on 2026-10-06 | S13 [HIGH] |
| Reddit | r/BitLifeApp (official) 257,711 subscribers; r/bitlife (fan) 87,182 | S29 via `get_subreddit_info` [HIGH] |
| Wiki | 1,580 articles, 6,009 pages, 29,659 edits | S28 [HIGH] |
| Stillfront BitLife net revenue | 2025: SEK 485 M (-17% organic); H1 2026: SEK 204 M vs 277 M H1 2025 | S21, S22 [HIGH] |
| Stillfront BitLife net revenue (USD) | 2025 roughly USD 48-50 M (my conversion at about SEK 9.7-10 per USD) | inference [MEDIUM] |
| Max-age sanity | Game states longest observed life about 125 years; Geriatric ribbon at 120+ | W:Age, W:Ribbons [MEDIUM] |

---

## 2. Developer, ownership, history

### 2.1 Candywriter
- Candywriter says it was founded in 2006 in Miami with no outside funding and "turns a profit from day one"; it was among the first 552 apps on the App Store in 2008 [S16, HIGH]. The Stillfront release repeats founded 2006, founders Kevin O'Neil and Nadir Khan, one of first 552 iOS apps, earlier apps Adult Coloring Book, Letter Soup, Letter Fridge [S18, HIGH].
- Studio claims BitLife reached "#1 overall on iOS in the US, UK, and Canada" "with zero marketing spend", and "tens of millions" of players [S16, HIGH that they claim it; MEDIUM that it is true]. Wiki: #1 overall app in Nov 2018 across US, UK, CA, AU [S27, MEDIUM].
- Studio philosophy quote: get "to a category before it has a name, ship the first great version" with "great writing and sharp, replayable systems" [S16, HIGH].
- Portfolio today: BitLife, DogLife, CatLife, Letter Soup live; 68 archived titles [S17, HIGH].
- Official site says: "we hand-craft every event" (text is human-written, not procedural prose) [https://bitlifeapp.com/about/, HIGH].
- Team size: unverified. No developer interview located (searched for Kevin O'Neil / Nadir Khan interviews; only deal quotes found). Founders' LinkedIn titles per search snippet: Kevin O'Neil CEO, Nadir Khan COO [search result, MEDIUM].

### 2.2 Acquisition by Stillfront (Apr 2020)
| Fact | Value | Source |
|---|---|---|
| Date | 23-24 Apr 2020 | S20, S19 [HIGH] |
| Upfront | about USD 74.4 M (USD 37.5 M shares + USD 36.9 M cash) | S18, S19 [HIGH] |
| Earn-out | up to USD 120.6 M on 2020-2022 EBIT; total cap USD 195 M | S18 [HIGH] |
| 2019 revenue | about USD 26 M, EBIT margin about 59% | S18, S20 [HIGH] |
| 2019 users | DAU about 1.2 M, MAU about 7.8 M | S18 [HIGH] |
| Downloads at deal | 42 M; "top 5 most downloaded iOS game in 2019" | S19, S20 [HIGH] |
| Stillfront today | BitLife is one of 7 "key franchises"; Candywriter LLC listed as 100% owned US subsidiary | S21 [HIGH] |

Consequence for design culture: Stillfront's report lists "Games Services" (ad monetization, DTC payments, data and analytics, marketing hub, art hub, **AI hub**) as shared services for franchises [S21, HIGH]. Players blame Stillfront for monetization and AI art (see section 22); that attribution is player opinion [S29, MEDIUM].

### 2.3 Other Candywriter projects tied to BitLife
- **InstLife**: Candywriter bought InstLife (an earlier text life sim) and planned to merge it into BitLife [S32 snippet, MEDIUM]; wiki: Generations "appeared on InstLife before BitLife" [W:Generations, MEDIUM]. Players still reference InstLife nostalgically [S29, MEDIUM].
- **DogLife**: Android 1 Nov 2021, iOS 3 Nov 2021; 3-month age ticks; first spin-off [W:DogLife, MEDIUM]. **CatLife**: 3 Jan 2022 [W:CatLife, MEDIUM]. Studio site rates DogLife 4.6, CatLife 4.7 [S17, HIGH].
- **German edition** by Goodgame Studios (also Stillfront), announced 16 Nov 2021, includes "transcreation" [S26, HIGH]. In Aug-Dec 2026 the separate FR/PT/ES/DE apps are being retired into one app; old saves and purchases do not auto-transfer [S6, HIGH].
- Merchandise started 18 Oct 2019 [W:BitLife: Life Simulator, MEDIUM].

---

## 3. Version and content timeline

Cadence summary (computed from the wiki update table dates [W:Updates, MEDIUM]):
- Oct 2018 - Dec 2020: a themed content update every 2-5 weeks (1.0 through 1.46), each followed by a .1 hotfix within 1-3 days.
- Jan 2021 - Feb 2022: maintenance only (1.47.x, 1.48-1.51.x, then 3.0.x "major changes to the architecture of the game"). Patch 3.1 (11 Mar 2022) opens with thanks for "patience awaiting this first new content update in a while" [W:Updates, HIGH on the quote]. That is about 15 months (Dec 2020 Mafia to Mar 2022 Movie Star) with no content update, while DogLife and CatLife shipped.
- Mar 2022 onward: one named content drop every 1-4 months, mostly paid expansion or job packs, with weekly bug-fix builds.

| Date | Version | Name | Headline content | Source |
|---|---|---|---|---|
| 29 Sep 2018 | 1.0 | Launch | Text life sim | W:Updates [MEDIUM] |
| 16 Oct 2018 | 1.3 | - | Autosave, custom people (add friends as NPCs), remove ads via IAP, community on Reddit/Twitter | W:Updates [MEDIUM] |
| 21 Nov 2018 | 1.5 | - | Grandkids, twins/triplets, teen dating, **Ribbons**, Cemetery, Casino, gambling addiction. Notes #1 overall iOS | W:Updates [MEDIUM] |
| 1 Dec 2018 | 1.6 | - | First crime, last will and testament, driving test, prison escape minigame | W:Updates [MEDIUM] |
| 20 Dec 2018 | 1.8 | - | Siblings, 14 more ribbons, horse races, "Become an official Bitizen" | W:Updates [MEDIUM] |
| 12 Jan 2019 | 1.9 | - | Grand theft auto, lawyers, vasectomy/IVF, achievements overhaul | W:Updates [MEDIUM] |
| 5 Feb 2019 | - | Android launch | Android lags iOS for months ("Ketchup updates") | S15, W:Updates [HIGH/MEDIUM] |
| 17 Mar 2019 | 1.13 | Pets | Pets (exotic pets Bitizen-only), +8 countries | W:Updates [MEDIUM] |
| 10 Apr 2019 | 1.14 | Generations | Continue as child, cemetery sorting, model career | W:Updates [MEDIUM] |
| 26 Apr 2019 | 1.15 | Fame | Fame bar, celebrity activities | W:Updates [MEDIUM] |
| 29 May 2019 | 1.17 | Part-time jobs | Part-time jobs and gigs, stress, heart attacks | W:Updates [MEDIUM] |
| 15 Jul 2019 | 1.20 | - | Military deployments, birth control, **Time Machine** | W:Updates [MEDIUM] |
| 8 Aug 2019 | 1.21 | Prison | Gangs, riots, parole, conjugal visits | W:Updates [MEDIUM] |
| 30 Sep 2019 | 1.23 | School | Classmates, teachers, clubs, cliques | W:Updates [MEDIUM] |
| Oct 2019 | - | - | Candywriter floats **monthly Bitizenship** (tested in CA/AU), then reverses | W:Bitizenship [MEDIUM] |
| 29 Oct 2019 | 1.25 | Haunted | Ghosts, haunted houses | W:Updates [MEDIUM] |
| 18 Nov 2019 | 1.26 | Office | Co-workers, HR, workplace scenarios | W:Updates [MEDIUM] |
| 19 Dec 2019 | 1.28 | Friends | Friends, best friends, enemies | W:Updates [MEDIUM] |
| 17 Jan 2020 | 1.29 | Crime | Juvie, bank robbery, shoplifting | W:Updates [MEDIUM] |
| 8 Feb 2020 | 1.30 | Mind & Body | New faces and UI (widely criticised), disease system, martial arts, "Surprise me" | W:Updates, W:BitLife: Life Simulator [MEDIUM] |
| 22 Feb 2020 | 1.31 | Challenges | Timed global challenges with ranking; first: Alphabet | W:Challenges [MEDIUM] |
| 8 Mar 2020 | 1.32 | Luxury | Aircraft, boats, jewelry | W:Updates [MEDIUM] |
| 26 Mar 2020 | 1.33 | **God Mode** | Edit anyone; custom stats and looks (sold standalone) | W:God Mode [MEDIUM] |
| 4 Apr 2020 | 1.34 | Achievements | 88 new achievements, 10 new ribbons | W:Updates [MEDIUM] |
| 19 Apr 2020 | 1.35 | Politics | Campaigns, School Board to President | W:Updates [MEDIUM] |
| 23 Apr 2020 | - | Stillfront deal | See 2.2 | S18 [HIGH] |
| 12 Jun 2020 | 1.37 | Social Media | 5 platforms (7 by 2024), influencer monetization | W:Updates, W:Social Media [MEDIUM] |
| 30 Jun 2020 | 1.38 | Pride | Gender and sexuality systems reworked | W:Updates [MEDIUM] |
| 11 Aug 2020 | 1.40 | - | Option to age half a year at a time | W:Updates [MEDIUM] |
| 7 Sep 2020 | 1.41 | Royal | Royalty, "Respect" replaces Fame bar | W:Updates, W:Stats [MEDIUM] |
| 5 Oct 2020 | 1.42 | Pro Sports | 7 sports, athletic skills | W:Sports [MEDIUM] |
| 24 Nov 2020 | 1.45 | Pop Star | Bands, instruments, genres | W:Music [MEDIUM] |
| 20 Dec 2020 | 1.46 | Mafia | Syndicates, ranks, extortion | W:Mafia Update [MEDIUM] |
| 1-3 Nov 2021 | - | DogLife | Spin-off app | W:DogLife [MEDIUM] |
| Feb 2022 | 3.0.x | Architecture | "Major changes to the architecture of the game" | W:Updates [HIGH on quote] |
| 11 Mar 2022 | 3.1 | Movie Star | Actor special career; Actor Job Pack and **Boss Mode** introduced | W:Updates, W:Acting [MEDIUM] |
| ~Jun 2022 | 3.2 | Street Hustler | Job pack | W:Updates [MEDIUM] |
| ~Sep 2022 | 3.3 | Business | Business special career | W:Updates [MEDIUM] |
| 2 Oct 2022 | 3.5 | Challenge Vault | Back catalog of challenges, USD 4.99 | W:Updates [MEDIUM] |
| 23 Oct 2022 | 3.6 | Superstar Mode | Paid theme, unlockable by 100 challenges or USD 4.99 | W:Updates [MEDIUM] |
| 12 Dec 2022 | 3.7 | Stock Market | Investor Expansion Pack, about USD 4.99 | W:Updates, S30 [MEDIUM] |
| 8 Mar 2023 | 3.8 | Landlord | Landlord Expansion Pack | W:Updates [MEDIUM] |
| 1 Apr 2023 | 3.8.4 | Marketplace | One hub for all IAP | W:Updates [MEDIUM] |
| 16 Apr 2023 | 3.8.6 | Billionaire's Bundle | Business + Investor + Landlord bundle | W:Updates [MEDIUM] |
| 21 Apr 2023 | 3.8.7 | Golden Passport | Item: pick any emigration country | W:Nations [MEDIUM] |
| 23 May 2023 | 3.9 | Astronaut | Job pack | W:Updates [MEDIUM] |
| 8 Jul 2023 | 3.9.7 | Daily Quests | Free daily mystery reward (Quest Chest added 2 Sep 2023) | W:Updates [MEDIUM] |
| 28 Jul 2023 | 3.10 | Black Market | Expansion pack (museum, auction house) | W:Black Market [MEDIUM] |
| 17 Oct 2023 | 3.11 | C.U.L.T. | Cult-leader expansion | W:Updates [MEDIUM] |
| ~Mar 2024 | - | Secret Agent | Expansion pack | S29 (r/bitlife post "Secret agent pack update released") [MEDIUM] |
| May-Jun 2024 | 3.14.1 | Zoo | Expansion pack (zoo habitats, mythical animals) | W:Zoo, S30 [MEDIUM] |
| Apr 2024 | - | Scavenger Hunts | Seasonal clue-hunts for accessories; 10 hunts by Aug 2025 | W:Scavenger Hunts [MEDIUM] |
| ~mid 2025 | - | Outdoor Lifestyle | Camping, fishing, birdwatching expansion | W:Outdoor Pack Collection, S30 [MEDIUM] |
| 30 Oct 2025 | - | Vampire Mode | Expansion; one-time purchase | S2, S11 [HIGH] |
| 11 Dec 2025 | - | Seasons + BitPass | Monthly seasons; Holiday Season ran 11 Dec - 7 Jan | S31, S30 [MEDIUM] |
| Jan 2026 | - | Music Producer | "Final" Job Pack, early access via BitPass | S31 [MEDIUM] |
| 11 Jun 2026 | - | Ultimate Fighter Mode | Expansion; "best-selling expansion pack to date" | S2, S22 [HIGH] |
| 2 Jul 2026 | - | Soccer Striker Scavenger Hunt | World Cup tie-in, 11 badges | S2 [HIGH] |
| 14 Aug 2026 | - | End of Seasons | Seasons removed | S2, S5 [HIGH] |
| 31 Aug 2026 | - | One app, every language | Retire per-language apps | S2, S6 [HIGH] |
| 10 Sep 2026 | - | Movie Director | Expansion; "our biggest update yet" | S2, S7 [HIGH] |
| 18-22 Sep 2026 | - | 8th birthday | Referral giveaway, 8 x USD 888 | S2, S9 [HIGH] |
| 21 Sep 2026 | 3.25.1 | Maintenance | Current build | S14 [HIGH] |

Observed pattern for planning: one tentpole every 1-4 months, each one a **vertical career or lifestyle slice** (Actor, Astronaut, Landlord, Zoo, Vampire, Fighter, Director) gated behind a separate purchase, plus weekly bugfix builds and a seasonal scavenger hunt [S2, W:Updates; pattern is MEDIUM].

---

## 4. Core loop

1. **Start a life**: "New Life" then Random Life or Custom Life (choose name, gender, country, city; appearance and stats stay random unless you own God Mode) [W:BitLife: Life Simulator, W:Custom; MEDIUM].
2. **Birth screen**: parents (names, occupations), birthdate, star sign, conception circumstance, siblings, pets, starting stats [W:BitLife: Life Simulator, MEDIUM].
3. **Tap Age (+)**. Age button is lower-middle of the screen, adds 1 year (or 6 months if the half-year setting is on, since Aug 2020) [W:Age, W:Updates; MEDIUM].
4. **Year resolves**: stats drift a few points, passive text lines are appended to the year feed (news headlines, family career/love changes), and 0-n **event cards** appear. Cards offer 2-4 choices (apologize/argue, tell the truth/lie, etc.); choices change stats, relationship bars, karma, money, record [W:Events, W:Stats, MEDIUM].
5. **Between ages the player takes actions for free**: open Activities, spend time with a relative, apply for a job, study harder, go to the gym, commit a crime. I found no action-point cost; the limiters are attention and cooldowns (athlete skill practice "only once a year" per skill, heirloom search 12 h real-time cooldown, house party only once a year) [W:Sports, W:Minigames, W:Assets; MEDIUM]. Per-year limits on other actions (study, spend time) are from my play memory: LOW.
6. **Repeat to death**, then tombstone, ribbon, journal, "continue" options (new random/custom life, same life again, continue as a child) [W:Death, MEDIUM].
7. **Between sessions**: Daily Quest, Challenges, Scavenger Hunts, Events, Seasons (until Aug 2026) pull the player back [W:Updates, S2; MEDIUM].

**Ad hooks inside the loop (free users)**: ads when starting a new life, in the movie theater, when spending time with all relatives, "Boosts" (watch an ad for +30 Happiness or Health, +16 Smarts or Looks), random pop-ups; Bitizens and "Remove Ads" buyers see none [W:Bitizenship, W:Stats; MEDIUM]. Reported interstitial frequency "every 70 seconds" with D7 retention 15% and average 34 minutes per day across five sessions [S23; MEDIUM, source of the engagement numbers not disclosed in the article].

**"Surprise me"** option (Feb 2020) lets the game choose for the player on hard decisions [W:Updates, MEDIUM].

---

## 5. Screen-by-screen UI walkthrough

> Exact tab labels are from the fan wiki and my memory of the app; I could not open the live app in this session. Treat layout as MEDIUM and verify against screenshots before copying.

| Screen | Contents | Source |
|---|---|---|
| Main menu | New Life, Cemetery, Settings, Achievements, Ribbons, Challenges, Community page; Become a Bitizen button top-right; God Mode buttons; Marketplace | W:BitLife: Life Simulator, S4 [MEDIUM] |
| New life | Random Life vs Custom Life; custom picks name, gender, country, city; God Mode adds appearance, stat sliders, special talent (music, acting, athletic, crime...) | W:Custom, W:Acting, W:Music [MEDIUM] |
| Birth / "Year 0" | Journal feed starts with parents, birthday, siblings, pets, conception text | W:BitLife: Life Simulator [MEDIUM] |
| **Game screen** | Scrolling text journal grouped by age; avatar (emoji-style face, redesigned Feb 2020); **four stat bars** (Happiness, Health, Smarts, Looks) at bottom; Fame/Respect or Approval bar appears when relevant; stats colored green 31-100, orange 13-30, red 0-12 with warning icon below 13 | W:Stats [MEDIUM] |
| Bottom bar | Center **Age (+)**; neighbors: Occupation (Job), Assets, Relationships, Activities | W:Age, W:Careers/Occupation, W:Activities [MEDIUM] |
| Occupation | Schedule (stress), Education, Freelance Gigs, Job Recruiter, Jobs, Military, Part-Time Jobs, Special Careers | W:Careers/Occupation [HIGH on wiki text] |
| Assets | Houses, cars, jewelry, instruments, aircraft, boats, heirlooms, social media accounts (also via Activities) | W:Assets, W:Social Media [MEDIUM] |
| Relationships | List by role: parents, step-parents, siblings, lovers, exes, children, grandchildren, friends, nieces/nephews, pets, late relatives; each with a relationship bar; tap opens a profile with Relationship, Looks, Smarts, Craziness etc. and actions (conversation, compliment, insult, spend time, give money, gift) | W:Relationships, W:Profile, W:Stats [MEDIUM] |
| Activities | Long scrolling list; favourites pinned at top; greyed-out until minimum age (see section 15) | W:Activities [HIGH on wiki text] |
| Event card | Modal text card with 2-4 buttons; some include mini-games | W:Events [MEDIUM] |
| Death screen | Blood-drips animation with Bach "Toccata and Fugue in D minor" (or "Taps" for soldiers); tombstone with ribbon, net worth, kids, murders, years in prison, cause of death, funeral attendees, happiness and karma bars; buttons: journal, bulldoze, share, continue | W:Death [MEDIUM] |
| Cemetery | All past lives, sortable by net worth, age etc.; bulldoze unwanted graves; read old journals | W:Updates 1.14 [MEDIUM] |
| Ribbons / Achievements / Challenges | Grids with locked/unlocked states; secret ribbons show "?" | W:Ribbons, W:Achievements, W:Challenges [MEDIUM] |
| Marketplace | Hub for all IAP since 1 Apr 2023: packs, bundles, items, Time Machine | W:Updates 3.8.4 [MEDIUM] |
| Seasons panel (Dec 2025 - Aug 2026) | Task/BitPass strip at top of the main screen; "Bits" currency; seasonal shop; special lives | S31, S29 [MEDIUM] |
| Settings | Half-year aging, screenshot prompt off, favourites, language, dark mode (Bitizens), restore purchases | W:Age, S4 [MEDIUM] |

**Visual design (observable from App Store and community)**: flat, emoji-like character faces, large type, high-contrast bars, almost no animation outside death and mini-games (App Store size 384 MB mostly localized text and art) [S13, S14; MEDIUM]. Players in Jan 2026 and Sep 2026 call the UI cluttered by task strips, BitPass and shop banners at the top of the main screen ("unplayable for me", "why is there more on screen") [r/BitLifeApp/comments/1q40f8u, MEDIUM; opinion].

---

## 6. Stats system

### 6.1 Player stats

| Stat | Start range | Raised by (examples) | Lowered by (examples) | Source |
|---|---|---|---|---|
| Happiness | 50-100 | Vacation, new child (+50), win lottery, marriage, new friend (+16), pet (+30), bank robbery success (+50), Boost ad (+30) | Divorce (-30), spouse death (-50), child death (-100), arrest, fired, cheated on (-50), failed murder / caught (-100) | W:Stats [MEDIUM] |
| Health | 80-100 | Gym (+8), doctor, diet, walking, meditation (+4), Boost (+30) | Disease, STDs, assault, drugs/alcohol, bad diet, botched surgery, stress | W:Stats [MEDIUM] |
| Smarts | 0-100 | Study harder, library, books, memory test mini-game, education, Boost (+16) | Drugs, bad decisions, dementia, ghosts, bribing officials | W:Stats [MEDIUM] |
| Looks | 0-100 | Gym, salon/spa, plastic surgery, haircuts, Boost (+16) | Botched surgery, disease, aging, assault | W:Stats [MEDIUM] |
| Karma (hidden bar, shown via meditation and on tombstone) | - | Apologizing, calling police, donating heirlooms, helping, serving military | Crime, insulting, cheating, abandoning pets/children, drugs, prison | W:Karma [MEDIUM] |
| Fame (later "Respect" for royals) | - | Social media posts, TV interviews, books, commercials, verified account | Bad appearances, fired, prison, aging, emigrating | W:Stats [MEDIUM] |
| Approval | - | Speeches, rallies, working issues from the newspaper | Ignoring issues, bad rallies | W:Stats [MEDIUM] |
| Stress ("Schedule") | - | Too many part-time jobs or hours | Leads to high blood pressure, heart attack, stroke | W:Stats [MEDIUM] |

Design notes:
- "Having higher percentages on the bars will make a character live longer and more successfully" [W:Stats, HIGH on wiki text]; Health and Happiness high help lifespan, Karma helps in tough situations [W:Karma, MEDIUM].
- Newborn stats are inherited: kids' Looks and Smarts are an average of both parents [W:Stats, MEDIUM].
- Stat deltas are fixed-ish, visible numbers on many actions (+16, +30, -50, -100); the fandom wiki shows deltas at multiples of 4/8/16/30/50/100 [W:Stats, MEDIUM]. That suggests a small lookup of magnitude tiers rather than formulas (inference, LOW-MEDIUM).

### 6.2 Hidden NPC stats (drive event outcomes)

| Entity | Stats | Effect | Source |
|---|---|---|---|
| Parent | Relationship, Religiousness, Generosity, Money | Generosity + Money decide money gifts, pet, car, college tuition | W:Stats [MEDIUM] |
| Sibling | Relationship, Smarts, Looks, Petulance | High petulance means more fights, can assault | W:Stats [MEDIUM] |
| Lover | Relationship, Looks, Smarts, Money, Craziness, Willpower (God Mode only) | Craziness raises cheating, early proposals, refusing prenups; low willpower means easier to persuade or murder | W:Stats [MEDIUM] |
| Friend | Relationship, Looks, Smarts, Money, Craziness | Crazy friends escalate to best friend or enemy, invite you to illegal acts | W:Stats [MEDIUM] |
| Pet | Relationship, Health, Happiness, Smarts, Craziness | Crazy exotic pets maul people | W:Stats [MEDIUM] |
| Teacher | Relationship, Looks, Strictness, Popularity | Strict teachers punish rudeness | W:Education/Faculty Staff [MEDIUM] |
| Co-worker / boss | Relationship, Looks, Professionalism, Coolness | Low professionalism boss ignores HR complaints | W:Stats [MEDIUM] |
| Inmate | Relationship, Size, Craziness, Respect | Gang rivalry changes relationship | W:Stats [MEDIUM] |
| House / car / heirloom | Condition (and Hauntedness for houses) | Affects resale, ghosts | W:Stats [MEDIUM] |

Special **talents** (music, acting, athletic, crime...) are assigned randomly at birth, visible as flavor text, or chosen with God Mode [W:Music, W:Acting, W:Crime; MEDIUM].

---

## 7. Life stages (birth to death)

| Stage | Ages | What opens | Source |
|---|---|---|---|
| Infant | 0-2 | Only passive events and surrender | W:Age [MEDIUM] |
| Child | 3-11 | Primary school at about 6 (varies by country), library, family movies (6-17), gender identity (from 4), delinquency options start at 8 (pickpocket, shoplift, porch pirate) | W:Age, W:Activities [MEDIUM] |
| Teen | 12-20 | Secondary school, clubs, cliques, part-time jobs and freelance (13+), driving permit by country, burglary at 10 and GTA/murder at 14 (menu minimums), bank robbery/embezzle/train robbery at 16, birth control from 14 | W:Careers/Jobs, W:Activities [MEDIUM] |
| Adult | 21-44 | University, careers, marriage, kids, casino (18+), assets, adopt (18-25 depending on rule), hitman (18) | W:Age, W:Activities, W:BitLife: Life Simulator [MEDIUM] |
| Middle age | 45-64 | Gray hair visuals, retirement window (military mandatory retirement 62), disease risk | W:Age, W:Careers/Occupation [MEDIUM] |
| Elder | 65+ | Retirement, senior clubs and gangs (prison "Wrinkly Sneaks"), dementia/Alzheimer risk | W:Age, W:Prison/Gangs [MEDIUM] |
| Death | any | Surrender at any age (always gives Wasteful ribbon), old age, illness, accident, crime, war, execution | W:Death [MEDIUM] |

Minimum-age gating is **per activity and per country**: e.g. emigration at 18 (19 where high-school graduation is 19), adoption "18 available, 21 official" [W:Activities, MEDIUM].

---

## 8. Family, parents, siblings, step-families

- Parents are randomly generated: married, divorced, unknown father, one-night stand; they can divorce, remarry (stepparents/stepsiblings, Oct 2019), come out, die [W:Profile, W:Updates 1.24; MEDIUM].
- Siblings (Dec 2018): older/younger, half, twin (rare), triplets rare; sibling actions: conversation, compliment, insult, rumble (blocked across the adult/minor boundary), spend time [W:Relationships, MEDIUM].
- Extended: grandparents/grandchildren (Nov 2018), nieces and nephews (Dec 2018), step-children via lovers (Oct 2019) [W:Updates, MEDIUM].
- Orphanage if both parents die while you are a child (Feb 2020) [W:Updates 1.31, MEDIUM].
- Family also **lives its own life** ("Watch your family's careers and love lives unfold", Nov 2018) which produces feed text and funeral attendance [W:Updates 1.4, MEDIUM].
- Money flow: parents pay tuition, lessons, cars based on Generosity and Money; inheritance goes through the Will [W:Stats, W:Will/Testament; MEDIUM].
- Funeral: attendees are relatives with good relationship; choices to bury, cremate, taxidermy, donate body (Nov 2019 update) [W:Death/Final Results, W:Updates 1.27; MEDIUM].

---

## 9. School and university

| Topic | Facts | Source |
|---|---|---|
| Timing | Elementary about age 6, high school 10-15 by country; graduation age varies (Nations table has columns: enrollment age, graduation age, drop-out age, free university, driving age) | W:BitLife: Life Simulator, W:Nations [MEDIUM] |
| Actions | Study harder (per-year), classmates (compliment, make friend, bully, fight), teachers (compliment, act up, disrespect, suck up; Bitizen-gated), principal/dean, detention, reporting | W:Education/Faculty Staff [MEDIUM] |
| Clubs and sports | Clubs take weekly hours (Robotics, Science, Astronomy, Decathlon...), sports teams, scholarships (athletic via sports teams) | W:Education/Cliques, W:Sports [MEDIUM] |
| Cliques | Artsy, Band Geeks, Brainy, Drama, Gamers, Goths, Hipsters, Loners, Jocks, Mean Girls, Nerds, Normals, Popular, Skaters, Social Floaters; need qualifying traits; rejection costs -30 Happiness | W:Education/Cliques [HIGH on wiki text] |
| School events | Prom, school dance (low Looks gets rejected), bullying, cheating on tests, expulsion/suspension | W:Stats, W:Events [MEDIUM] |
| University | Majors rotate yearly (v1.14: "College majors refresh each year"), requires good smarts/grades; specific majors needed for some jobs (e.g. Computer Science/Information Systems for certain ribbons); free university in some countries; fraternities/sororities (rejection -50 Happiness) | W:Updates 1.14, W:Ribbons, W:Nations, W:Stats [MEDIUM] |
| Advanced | Graduate school, Medical School, Law School, Business School, Nursing School, Veterinary School required for job ladders | W:Careers/Jobs [MEDIUM] |
| Parental tuition | Parents may refuse tuition or argue about college plans (Feb 2019) | W:Stats, W:Updates 1.11 [MEDIUM] |

---

## 10. Careers, job ladders, salary

### 10.1 Structure
- Occupation tab: Schedule, Education, Freelance Gigs, Job Recruiter, Jobs, Military, Part-Time Jobs, Special Careers [W:Careers/Occupation, HIGH on wiki text].
- Full-time jobs: one at a time; interview question must be answered correctly; promotions depend on "performance" score (added Sep 2019), work harder action, and for some jobs looks/smarts; random workplace scenarios (hundreds, Nov 2019 Office update) [W:Careers/Jobs, W:Updates 1.22, 1.26; MEDIUM].
- **Career collection**: spending 20+ years in a job records it in a collection (Sep 2019) [W:Careers/Occupation, MEDIUM].
- Criminal record blocks some jobs; emigrating can erase it [W:Crime, W:Nations; MEDIUM].
- Emigration forces a new career [W:Nations, MEDIUM].
- Military: enlist or officer (needs university), 5 branches (Army, Navy, Air Force, Marines, Coast Guard), deployments with a minefield mini-game, mandatory retirement at 62 [W:Careers/Occupation, MEDIUM].
- Part-time: from 13; hourly; "gigs" like babysitter, dog walker, handyman where the player sets the hourly price and demand falls as price rises [W:Careers/Occupation, MEDIUM].

### 10.2 Sample job ladders (fan wiki; salaries are "average starting" values, units mixed, treat as illustrative - data quality LOW-MEDIUM)

| Department | Ladder | Education | Sample pay | Source |
|---|---|---|---|---|
| Police | Cadet, Patrolman, Trooper, Corporal, Sergeant, Inspector, Lieutenant, Chief of Police | Upper secondary school | Cadet $27,118 to Chief $68,839 | W:Careers/Jobs [MEDIUM] |
| Law firm | Junior Associate, Associate, Junior Partner, Partner | Law School | $122,112, $134,065, $187,855, $201,613 | W:Careers/Jobs [MEDIUM] |
| Judiciary | Magistrate, Magistrate Court Judge, District Court Judge, Associate Chief Justice, Chief Justice | Law School | $80,350 up to $216,400 | W:Careers/Jobs [MEDIUM] |
| Corporate | Assistant VP, VP, First VP, Senior VP, Executive VP, Managing Director, President | Business School | $101k up to $228,749 | W:Careers/Jobs [MEDIUM] |
| Engineering | Engineer I-III, Asst. Eng. Manager, Manager, Director, VP of Engineering | University | $43.7k up to $125k | W:Careers/Jobs [MEDIUM] |
| Airline | Pilot Trainee, Co-Pilot, Pilot, Chief Pilot | University + license | $64.8k, $44.7k, $71.5k, $85.4k (non-monotonic = wiki noise) | W:Careers/Jobs [LOW-MEDIUM] |
| Fast food | Crew Member, Shift Manager, Restaurant Manager, General Manager | none | $15.3k to $19.4k | W:Careers/Jobs [MEDIUM] |
| Model agency | Foot, Hand, Catalog, Lingerie, Runway (Superstar Model makes you famous) | none, looks-driven | $20,000 to $54,670 | W:Careers/Jobs [MEDIUM] |
| Hospital | Clinical Nurse Specialist, Family Physician, Brain Surgeon | Nursing / Medical School | $79,164 / $99,500 / $175,000 | W:Careers/Jobs [MEDIUM] |
| Mail, teaching, fire | Mail Carrier $35.9k-40.3k; Teacher $36.9k; Professor $80.4k; Firefighter $47.3k; Fire Chief $85.4k | varies | - | W:Careers/Jobs [MEDIUM] |

Wiki page structure shows about 24 department families (Corporate, Model Agency, Airline, Veterinary, Hospital, Municipal, Medical Office, Newspaper, School District, University, Law Firm, Restaurant, Police, Fire, Mortuary, Record Label, Film Studio, Small Business, Publisher, Retailer, Orchestra, Museum, Real Estate, Travel Agency, Circus, Salon, Bank, Trucking, Library, Fishery, Ride Sharing, Grocery, Fast Food) [W:Careers/Jobs, MEDIUM]. Typical pattern: 3-8 rungs, education gates at the first rung, wages scaling by country cost-of-living ("stricter adherence to cost-of-living differences", Feb 2019) [W:Updates 1.12, MEDIUM]. Exact salary formula: unverified.

### 10.3 Special careers (paid "Job Packs", plus Boss Mode bundle)
Per the wiki (Oct 2024): ten packs: Actor, Astronaut, Athlete, Business, Mafia, Musician, Politician, Street Hustler, Model, Dealer; USD 4.99 each, Boss Mode (all job packs) USD 11.99 [W:Careers/Occupation, MEDIUM]. A guide site quoted Street Hustler USD 3.99 and Boss Mode USD 13.99 at an earlier time [S30 snippet, MEDIUM]. App Store today: **Boss Mode USD 20.99** [S13, HIGH]. Reddit users saw a "-$69.99- to 20.99, BEST VALUE" strike-through banner on 24 Dec 2025 [r/BitLifeApp/comments/1punbjs, MEDIUM]. "Music Producer" is called the "final Job Pack" [S31, r/BitLifeApp/comments/1pjcpqc; MEDIUM].

| Special career | Core mechanic | Source |
|---|---|---|
| Actor (Mar 2022) | Acting lessons, extras, agent, casting on TV/movies, budgets, awards | W:Acting [MEDIUM] |
| Musician / Pop Star (Nov 2020) | Instruments from age 6, voice lessons from 8, bands vs solo, genres, labels, special musical talent, fame | W:Music [MEDIUM] |
| Pro Athlete (Oct 2020) | 7 sports with per-sport skills (e.g. basketball: Celebrations, Defending, Dribbling, Passing, Rebounding, Shooting, Tricks), scholarships, leagues, Ballon d'Or, practice once a year per skill | W:Sports [MEDIUM] |
| Mafia (Dec 2020) | 6 syndicates, ranks Associate/Soldier/Caporegime/Underboss/Godfather, tribute to the family (about 10% back), extortion, rats, whackings; must have 5+ crimes before joining | W:Mafia, W:Mafia Update [MEDIUM] |
| Politician (Apr 2020) | School Board to President; party, platform, budget; Approval bar; newspaper issues | W:Stats, W:Updates 1.35 [MEDIUM] |
| Astronaut (May 2023) | Training, space missions, moon events (e.g. discoveries, Nobel chance) | W:Astronaut, W:Achievements [MEDIUM] |
| Model | Looks-driven ladder to Superstar Model | W:Model [MEDIUM] |
| Street Hustler / Dealer | Hustling crime ladder; deals drugs | W:Updates 3.2 [MEDIUM] |
| Business (Sep 2022) | Run companies; Billionaire's Bundle combos | W:Updates [MEDIUM] |
| Music Producer (Jan 2026) | Final job pack; BitPass early access | S31 [MEDIUM] |

---

## 11. Assets, shopping, real estate

| Asset | Facts | Source |
|---|---|---|
| Types | Houses, cars, jewelry, instruments, aircraft, boats (heirlooms separately) | W:Assets [HIGH on wiki text] |
| Age/licence | Buy at 18; cars need driver's licence, aircraft pilot's licence, boats boating licence | W:Assets [MEDIUM] |
| Houses | Buy or mortgage; stats: cost, quality, mortgage rate, haunted flag, condition, age; renovate; house parties (noise complaints, drug arrests, overdoses); house required to adopt; value rises yearly (formula unknown) | W:Assets [MEDIUM] |
| Real estate as investment | "Real estate is the only asset you can profit from"; jewelry depreciates yearly | W:Assets [MEDIUM] |
| Landlord Expansion (Mar 2023) | Own and rent properties, tenants | W:Updates 3.8 [MEDIUM] |
| Stock Market / Investor (Dec 2022) | Stocks, bonds, crypto, real estate funds | W:Updates 3.7, S30 [MEDIUM] |
| Luxury (Mar 2020) | Aircraft, watercraft, jewelers (fakes), flights | W:Updates 1.32 [MEDIUM] |
| Black Market (Jul 2023) | Six sellers: Antique Peddler, Arms Dealer, Art Thief, Jewel Fencer, Street Chemist, Wildlife Smuggler; haggle, skip twice, auction house, own a museum; contraband can attract police | W:Black Market [MEDIUM] |
| Heirlooms | Attic flashlight mini-game, 12 h cooldown; items have value, rarity (Common to Super Rare), refurbish cost; 209 heirlooms as of 2026; some give luck bonuses | W:Heirloom, W:Minigames [MEDIUM] |
| Casino | Blackjack and other games; gambling illegal in some countries; debts lead to "defrauding a casino"; own a casino (expansion) | W:Casino [MEDIUM] |
| Inheritance | Houses/cars inherited by adult heirs; auctioned if heir is a minor; estate tax by country | W:Generations [MEDIUM] |
| Money display | Currency symbols differ by country (EUR, GBP, many show $) | W:Nations [MEDIUM] |
| Cost of living | Prices scale by country | W:Updates 1.12 [MEDIUM] |

---

## 12. Relationships: dating, marriage, kids, cheating, divorce

| Phase | Mechanics | Source |
|---|---|---|
| Meeting | Random "rumors" events from age 12; dating app (Dec 2018); asked out; teen dating (Nov 2018); lovers from other countries (Jul 2019) | W:Relationships, W:Updates [MEDIUM] |
| Dating | Spend time, conversation, compliment, gift, propose, break up, one-night stands (+16 Happiness, STD risk), threesomes for crazy partners | W:Stats [MEDIUM] |
| Marriage | Proposal, wedding, prenups (added Jan 2019; crazy partners refuse), name change by country, arranged marriages in some countries, renewing vows, same-sex rules by country (Nations table) | W:Updates 1.10, W:Arranged Marriage, W:Nations [MEDIUM] |
| Kids | Pregnancy, miscarriage (-50 Happiness), twins/triplets rare, contraception, IVF/surrogacy/sperm donor, adoption, "love children" for men; abortion available by country; Fertile ribbon needs 6+ biological children | W:Updates, W:Fertility, W:Relationships [MEDIUM] |
| Cheating | Lover craziness and low willpower raise cheating risk; you can cheat too (karma drop); cheated on = -50 Happiness | W:Stats, W:Karma [MEDIUM] |
| Divorce / breakup | -30 Happiness; alimony and child support; restraining orders; exes can stalk (Jun 2019 Exes update) | W:Stats, W:Updates 1.19 [MEDIUM] |
| Friends | Friends, best friends, enemies; friends can pull you into crime | W:Stats, W:Updates 1.28 [MEDIUM] |
| Relationship bar | Decays yearly if ignored; low bar yields insults, arguments, assault | W:Relationships [MEDIUM] |
| Relationship tab polish | "Spend time with all relationships at once" (Jul 2019) so upkeep is one tap, but an ad plays for non-Bitizens | W:Updates 1.20, W:Bitizenship [MEDIUM] |

Player complaint (Sep 2026, 446 points): "auto pregnancy" cannot be disabled easily [r/BitLifeApp/comments/1w8u6xj, MEDIUM].

---

## 13. Crime, police, prison

| Topic | Facts | Source |
|---|---|---|
| Crime menu | Bank robbery, burglary, delinquent acts, embezzle (needs job), grand theft auto, hitman, murder, pickpocket, porch pirate, shoplift, train robbery | W:Activities [HIGH on wiki text] |
| Event-triggered crimes | DUI, drug possession, supplying alcohol to minors, desertion, defrauding casino, extortion, racketeering, match fixing, securities fraud, corruption, illegal emigration, domestic violence, harboring fugitive, contempt of court, false accusation, etc. | W:Crime [HIGH on wiki text] |
| Detection | Success chance rises with "crime" special talent (God Mode) and lowers with random witnesses; police can be sued for false accusations; plea deals; lawyers (more expensive firm wins more) | W:Crime, W:Lawsuit [MEDIUM] |
| Murder | Victim list includes family, friends, coworkers, strangers; many methods (drive-by, poison, push off cliff, bear trap, etc.); failure can get you killed by the target; sentences include life or death by country | W:Murder, W:Death [MEDIUM] |
| Hitman | 18+, Bitizen-gated in old rules; may scam you or be an undercover cop; may demand extra money or kill you | W:Crime, W:Bitizenship [MEDIUM] |
| Juvie | Juvenile detention for under-18 offenders (Jan 2020) | W:Updates 1.29 [MEDIUM] |
| Prison (Aug 2019) | Security levels, gangs (10 gangs with entry requirements by respect, money, smarts 80+, looks 80+, age 65+ etc.), riots, bribes, conjugal visits, infirmary, care packages, parole, letters, gym | W:Prison/Gangs, W:Prison/Activities, W:Updates 1.21 [MEDIUM] |
| Escape mini-game | Grid puzzle vs guard who moves twice per your move; difficulty by prison security; optional rewarded ad to "dress as guard" once per life | W:Minigames [MEDIUM] |
| Heists | Burglary mini-game: Pac-Man-style house map, items (TV, teddy bear, diamond, guitar, computer, laptop, money), dogs and homeowner, SWAT if you linger | W:Minigames [MEDIUM] |
| Mafia | See section 10.3 | W:Mafia [MEDIUM] |
| Emigration | A legal move can wipe or hide record; returning can trigger arrest | W:Crime, W:Nations [MEDIUM] |
| Karma cost | Crime and prison lower Karma | W:Karma [MEDIUM] |

---

## 14. Health, disease, addictions

- Disease system overhauled Feb 2020 with symptoms; categories include childhood diseases, cancers, deadly diseases, STDs; some are random (cold, flu, pneumonia), some caused by choices [W:Diseases, W:Updates 1.30; MEDIUM].
- Treatment ladder: Medical Doctor (two doctors of varying quality), Alternative Doctor, Psychiatrist, Emergency Room, **Witch Doctor** (last resort, can kill), Optometrist (Bitizen) with eye-exam mini-game, Rehab, plastic surgery (botch risk, lawsuit up to about USD 1M), diet [W:Activities, W:Achievements, W:Medical category; MEDIUM].
- Healthcare is **free in some countries** (Nations column) [W:Nations, MEDIUM].
- Addictions: gambling (Nov 2018), alcohol, drugs; interventions and rehab; overdoses; alcohol/drug tries lower Health and Karma but sometimes raise Happiness or Smarts (LSD/marijuana "illuminated" to 100 Smarts) [W:Stats, W:Updates 1.5; MEDIUM].
- Stress: too many jobs leads to high blood pressure then heart attack or stroke [W:Stats, MEDIUM].
- STDs: condoms, "Promiscuity Potion" item (Apr 2023) grants STD immunity (paid marketplace item) [W:Updates 3.8.5, MEDIUM].
- Death causes catalogued: old age, illness, witch doctor, failed murder, assault, animal encounters (rescue/retreat/pet/run; hippopotamus achievement), failed rescue, overdose, lightning, botched surgery, exotic pet mauling, terrorist attacks (some countries), military deployment, execution, unpaid hitman, train-robbery cheat, vehicle accidents, mafia whacking, ghost-induced heart attack [W:Death, MEDIUM].
- Starting country risk: since 2022 residents of some countries (Afghanistan, Syria, etc.) can randomly die in conflict events [W:Death, MEDIUM].
- Nutrition and longevity: Mediterranean diet and high happiness recommended for 100+ [W:Scavenger Hunts, MEDIUM].

---

## 15. Activities menu (complete shape)

Greyed out until minimum age; favourites pinned [W:Activities, HIGH on structure].

| Activity | Notes (options and min age) |
|---|---|
| Accessories | Eyewear/headwear from challenges and hunts (age 0) |
| Adoption | Up to 6 juveniles with stats and backstory (18 available / 21 official) |
| Crime | See section 13 |
| Doctor | Doctor, Alternative, Donate Blood/Plasma, ER, Optometrist (Bitizen), Psychiatrist, Witch Doctor (4 / 18) |
| Emigrate | Choose among 8 random nations (18); Golden Passport item to pick any |
| Fame | Book, Commercial, Photo Shoot, Talk Show |
| Fertility | Birth control (14), IVF, sperm donor, tubal ligation, vasectomy (18) |
| Gamble | Casino; horse races (18) |
| Identity | Gender, Name Change, Sexuality |
| Lawsuit | Sue surgeons, attackers, police (18) |
| Licenses | Driver's, pilot's, boating (sign-quiz exams) |
| Mind and Body | Meditation, library, gym, memory test (Simon-style), books, diet, gardening, martial arts, walks, instruments |
| Movie Theater | Comedy +Happiness, documentary +Smarts, family movie (ads for non-Bitizens) |
| Nightlife | Clubs (Looks gate), bars, drugs |
| Pets | Shelter (everyone), breeders/exotic/horse/llama ranches (Bitizen), vet |
| Plastic Surgery | Botch risk |
| Relationships | Spend time, dating app |
| Salon and Spa | Haircuts, color, waxing, nails, massage; style changes (Bitizen) |
| Social Media | 7 platforms (Facebook, Instagram, OnlyFans, TikTok, Twitch, Twitter, YouTube): post, buy followers, verification, monetize, promote products, trolls, suspension |
| Vacation | Happiness boost, travel events, cruises |
| Will/Testament | Allocate inheritance, choose heir |
| Lottery | Buy tickets (win gives large Happiness) |
| Diet | Mediterranean and other diets affect Health and longevity |

Source for rows: W:Activities, W:Social Media, W:Pets, W:Will/Testament, W:Nightlife, W:Category:Activities (21 members) [MEDIUM].

---

## 16. Mini-games

| Mini-game | Description | Source |
|---|---|---|
| Burglary | Pac-Man-style house raid, dogs/owner, SWAT timer | W:Minigames [MEDIUM] |
| Heirloom search | Flashlight in the attic, 12 h cooldown | W:Minigames [MEDIUM] |
| Prison riot | Snake-style recruiting game | W:Minigames [MEDIUM] |
| Felony escape | Grid pursuit; rewarded-ad shortcut | W:Minigames [MEDIUM] |
| Military minefield | Minesweeper (3 mines first time, 10 second time); rewarded-ad metal detector | W:Minigames [MEDIUM] |
| Intelligence/memory test | Simon-style color memory; score sets Smarts | W:Minigames [MEDIUM] |
| Eye exam | 5 s odd-symbol-out puzzle | W:Minigames [MEDIUM] |
| Driving/boating/pilot test | Sign/scenario multiple choice | W:Activities [MEDIUM] |
| Casino games | Blackjack and others | W:Casino [MEDIUM] |
| Reading | Tap through pages of real-book titles; each book has age gate and stat effects | W:Mind & Body [MEDIUM] |
| UFM fighting | Interactive MMA bouts with 200+ moves (official copy; another guide says 100+) | S10, corada snippet [HIGH/LOW] |
| Vampire | Essence absorption, hypnosis, hunter fights, bloodlines | S11 [HIGH] |
| Movie Director | 11 genres, auditions, awards, festivals | S7 [HIGH] |

Takeaway: mini-games are **short, thematic, optional palate cleansers** inside an otherwise text-first loop, and several are the insertion points for rewarded video.

---

## 17. Expansion packs and "modes" (content-as-product)

| Product | Type | Price evidence | Source |
|---|---|---|---|
| Bitizenship | One-time premium upgrade | USD 7.99 or 9.99 on App Store | S13 [HIGH] |
| God Mode | One-time | USD 9.99 (launched at about USD 8.99 in 2020) | S13, W:God Mode [HIGH/MEDIUM] |
| Bitizenship + God Mode | Bundle | USD 15.99 | S13 [HIGH] |
| Boss Mode | All job packs | USD 20.99 | S13 [HIGH] |
| Landlord, Investor, C.U.L.T. expansions | One-time | USD 7.99 each on App Store | S13 [HIGH] |
| Ultimate Fighter Mode | One-time, "best-selling expansion pack to date" | about USD 10 | S10, S22 [HIGH]; price S30 [MEDIUM] |
| Vampire Mode | One-time | about USD 10-12 | S11 (no price); S30 [MEDIUM] |
| Movie Director | One-time, separate from Boss Mode/Bitizenship at launch | about USD 10 (player-reported title) | S7 (no price), r/BitLifeApp/comments/1wnheml [MEDIUM] |
| Time Machine | Use for USD 0.99, unlimited for USD 14.99 (2022 note); a player reports USD 24.99 in Dec 2025 | S13 [HIGH], W:Updates 3.5.1 [MEDIUM], r/BitLifeApp/comments/1pjghe2 [MEDIUM] |
| Remove Ads | One-time | USD 2.99 | S13 [HIGH] |
| Challenge Vault | One-time | USD 4.99 (2022) | W:Updates 3.5 [MEDIUM] |
| Superstar Mode | Theme | USD 4.99 or 100 challenges | W:Updates 3.6 [MEDIUM] |
| Marketplace items | Consumables/bundles | Promiscuity Potion, Spiked Brass Knuckles, Golden Passport, Billionaire's Bundle, Crime Pays Bundle | W:Updates [MEDIUM] |
| Google Play range | Per-item | USD 0.99 - 89.99 | S15 [HIGH] |
| BitPass (Dec 2025 - Aug 2026) | Premium season pass | price unverified | S31, S5 [MEDIUM] |

Stillfront credits LiveOps and Seasons as strategy and shows the franchise's best-selling expansion is a vertical-career pack [S21, S22; HIGH].

---

## 18. Ribbons, achievements, challenges, scavenger hunts

### 18.1 Ribbons (end-of-life tombstone titles)
- Introduced 21 Nov 2018 (v1.5); Android 29 May 2019. Fan wiki (edited 13 Sep 2026) counts **40 ribbons, 4 secret** (Model Bitizen, Teammate, Bandit, Big Boss) [W:Ribbons, MEDIUM].
- Examples: Academic (postgraduate), Fertile (6+ children), Family Guy, Famous, Geriatric (120+), Hero, Lazy (only pressed Age), Loaded/Rich, Mooch, Scandalous, Stupid, Successful, Unlucky (die under 30 from disease or terrorism), Wasteful (suicide or killed in one assault), Wicked, Cunning, Deadly, Thief, Houdini (prison escape), Jailbird, Globetrotter, Highroller, Influencer, Monopoly, Cat Lady, Veteran [W:Ribbons, W:Death, W:Age; MEDIUM].
- Ribbon assignment priority is implicit: a better-fitting ribbon overrides Unlucky; suicide always yields Wasteful [W:Death, MEDIUM].

### 18.2 Achievements
- 410 achievements across 45 categories as of 3 May 2026 per fan wiki (categories: Longevity, Wealth, Career, Combat, Disease, Entertainment, Fame, Fertility, Love, Military, Prison, Royalty, Real Estate, School, Social Media, Vehicle, Animal, Crime, Pet, General; plus special careers and expansions) [W:Achievements, MEDIUM]. Some require IAP; table lists difficulty, chance-based flag [W:Achievements, HIGH on structure].
- Achievements overhauled Jan 2019, 88 added Apr 2020 [W:Updates, MEDIUM].

### 18.3 Challenges
- Global timed challenges (about 3-7 days, a few per month): specific life objectives with a ranking by completion time; reward: accessories/headwear/eyewear [W:Challenges, MEDIUM]. First: Alphabet Challenge, 22-28 Feb 2020; early examples: Ghostbusters, Shamrock, Gold Digger (never work, marry 3+ times, USD 1M+ from divorces, own a Lamborghini), April Fools, Black Widow, 420, Vampire, Tiger King [W:Challenges, MEDIUM].
- Catalog extends through 2026 (e.g. Kahlo My World, 7-13 Mar 2026) [W:Challenges, MEDIUM]. Archived challenges moved to paid **Challenge Vault** in Oct 2022 [W:Updates 3.5, MEDIUM].
- The Film Festival (Aug 15 - Sep 8, 2026) reused the Gold Digger idea as "Biggest Box Office Disaster", with real-world prizes (Apple Watch, AirPods, iPhone) for sweepstakes entries [S8, HIGH].

### 18.4 Scavenger Hunts
- Since Apr 2024, seasonal clue hunts; reward an accessory of choice; 10 hunts by Aug 2025; Soccer Striker hunt (Jul 2026) had 11 badges [W:Scavenger Hunts, S2; MEDIUM/HIGH].

---

## 19. Premium meta-features

### 19.1 Bitizenship
- Official: "premium upgrade that allows you to play unlimited generations, fully interact with your teachers and bosses, change up your style in the salon and spa, access the pet store, change your game to Dark Mode, and enjoy much more storyline content!" Price varies by platform and country [S4, HIGH].
- Older wiki perk list adds: no ads, exotic pets, no forced social sharing, join prison gangs, hire a hitman, join a band, eye exams, presidency [W:Bitizenship, MEDIUM; likely partly outdated].
- Bitizenship used to promise **all future content**; Mar 2022 players noticed the store description removed "all future content" and "no more ads" [r/bitlife/comments/t9fpyu (832 points), MEDIUM]. Per players, "legacy Bitizens" (bought in 2018-2019) still receive job packs and some expansions free while newer buyers pay; players disagree on exactly which packs are covered [r/BitLifeApp/comments/1wcts2v, 1wft3lg, MEDIUM].

### 19.2 God Mode (26 Mar 2020)
- Edit name, looks, stats of anyone; set talents before a custom life; cannot change birthday, conception, siblings or pet; edited NPCs trigger journal lines "I'm not sure what has gotten into (name) lately" [W:God Mode, MEDIUM]. Official: "From eye color to hairstyle and smarts to craziness, you get to take full control." [S4, HIGH]. Also lets you switch to a child without dying [W:Death, MEDIUM].

### 19.3 Time Machine (Jul 2019)
- Undo to an earlier age, pay-per-use or unlimited [W:Updates 1.20, 3.5.1; MEDIUM]. Goodgame release also lists "In-game time machine feature allows reverting character age" [S26, HIGH].

### 19.4 Daily Quests, Quest Chest, Marketplace, Seasons
- Free Daily Quest (Jul 2023) with mystery reward; Quest Chest (Sep 2023) banks rewards for other characters [W:Updates, MEDIUM].
- Seasons: monthly; Bits earned from daily tasks; community goals unlock free rewards; seasonal shop; special lives; premium BitPass allowed early access to the Music Producer pack; Stillfront's 2025 annual report lists Seasons as a core LiveOps initiative [S31, S30, S21; MEDIUM/HIGH]. Ended 14 Aug 2026 after "Pride Season" because "we've seen all of your feedback (and, tbh, getting frustrated ourselves)" [S5, HIGH]. BitPass holders got compensation; Pride Season compensation: unlock all rewards for free and BitPass players plus 100k Bits [r/BitLifeApp/comments/1vb2gb8 (official post), HIGH on quote; S5].

### 19.5 BitBook
- No source found for any in-game feature or product named "BitBook". Unverified. (Possible confusion with the in-game Social Media platforms or the Community page.) [LOW]

---

## 20. Death, endings, legacy ("Continue as child")

### 20.1 How a life ends
- Always ends in death; no victory screen. Surrender (suicide) is possible at any age, always gives Wasteful ribbon [W:Death, MEDIUM].
- Death animation: blood drips, Bach "Toccata and Fugue in D minor"; "Taps" for fallen soldiers [W:Death, MEDIUM].
- Tombstone/obituary: ribbon, name, age, net worth, country/city, career, education, kids/grandkids, lovers, murders, prison years, cause of death, funeral attendees, one-paragraph life summary, **two bars (happiness at death and karma)**, plus a line from "friends" recounting a notable event (e.g. defrauded a casino, won a battle with a disease) [W:Death, W:Death/Final Results; MEDIUM]. For prisoners the text is written from the warden's view [W:Death/Final Results, MEDIUM].
- Funeral attendance requires good relationships; royals get "loyal followers" counts by Respect [W:Death/Final Results, MEDIUM].

### 20.2 Generations (10 Apr 2019)
- After death choose any living child (biological, adopted, step); new life starts **at the age the child was when the parent died**, with the death circumstances and inheritance as the opening text [W:Generations, MEDIUM].
- Inheritance: money minus estate tax (country), heirlooms, houses and cars (auctioned if the heir is a minor, proceeds kept) [W:Generations, MEDIUM].
- Will controls splitting: all to one child or evenly [W:Generations, MEDIUM].
- Limits: non-Bitizens get limited generations (wiki pages disagree: "once" vs "two"); Bitizens unlimited [W:Generations, W:Bitizenship; MEDIUM, conflicting]. Cannot continue as spouse [W:Generations, MEDIUM].
- Tied features: Cemetery (sort, bulldoze), "try the same life over again" [W:Updates 1.14, MEDIUM], special talents on generational lives (Apr 2022) [W:Updates 3.1.8, MEDIUM].
- Design role: Generations give meta-goals (dynasties, wealth transfer), and heirlooms accumulate across lives [W:Heirloom, MEDIUM].

---

## 21. Randomization and event distributions (what is observable)

- **No official probabilities are published.** Numeric event frequencies: unverified.
- Observable structure:
  - Events are hand-written templates with placeholders (e.g. "A [Number]-year-old boy in [Country] purchased a [Car]..."), used for filler news and for decision events [W:Events, MEDIUM; matches the "hand-craft every event" claim on S33/about page, HIGH].
  - Event categories: childhood, school, disease, love, pet, encounter (animal, sexual, SOS), addiction, work, friend/enemy, travel (vacations and cruises), crime, prison, juvie, relationship, limited-time, boosts, fame, orphanage [W:Events, HIGH on table of contents].
  - Eligibility filters: age, country laws, stats, relationships, assets, special talent, expansion ownership, Bitizenship.
  - Starting stats: Happiness 50-100, Health 80-100, Smarts 0-100, Looks 0-100 [W:Stats, MEDIUM].
  - Heredity: child Looks/Smarts average of parents [W:Stats, MEDIUM].
  - NPC hidden stats (craziness, generosity, petulance, strictness) bias outcome branches (section 6.2).
  - Stat annual drift of a few points; Smarts shows the largest minor changes [W:Stats, MEDIUM].
  - Death risk modifiers: health, karma, country (war zones), age (>= 65), risky choices; no hard cap besides about 125 [W:Death, W:Age; MEDIUM].
  - Some contested probabilities are reported only qualitatively (twins/triplets "rare", witch doctor kill chance rises with repeated treatments and low health) [W:Death, MEDIUM].
- **Player-perceived randomness problems**: forced events (auto pregnancy); players close and re-open the app to dodge bad outcomes, and the Aug 2026 thread "BitLife is being ruined" (457 points) is about a change that appears to stop this [r/BitLifeApp/comments/1vivt44, MEDIUM; a tweet reply quoted "fixing the refresh thing that's been in the game since the beginning", search snippet, LOW-MEDIUM]. My reading that a "refresh" fix was shipped is an inference.
- Country system: about 100 nations (Category:Nations lists 103 pages) with per-country columns for school ages, free university, driving age, same-sex dating/marriage legality, name change after marriage, free healthcare, gambling legality, death penalty, conjugal visits, commercial surrogacy, weekly work hours [W:Nations, MEDIUM]. Emigration offers 8 random nations each press [W:Nations, MEDIUM].

---

## 22. Monetization and business model (BitLife-specific)

### 22.1 Revenue levers
| Lever | Mechanism | Evidence |
|---|---|---|
| Interstitial ads | Between actions for free users | "interstitial ads every 70 seconds" [S23, MEDIUM]; "ad revenue about USD 3.6 M per month vs IAP about USD 3 M" (30-day window, mid-2025) [S23, MEDIUM] |
| Rewarded video | Boosts (stat refills), minigame helpers (guard disguise, metal detector), unlock features free | W:Stats, W:Minigames [MEDIUM] |
| One-time premium | Remove Ads USD 2.99; Bitizenship USD 7.99-9.99; God Mode USD 9.99 | S13 [HIGH] |
| Content packs | Job packs, Boss Mode, expansions (USD 7.99-10 each), bundles | S13, S10 [HIGH] |
| Consumables/items | Time Machine, potions, Golden Passport | W:Updates [MEDIUM] |
| Season pass (discontinued) | BitPass | S5 [HIGH] |
| DTC web store | bitlifeapp.com links "Store" and "Login" to community.candywriter.net/store (page rendered empty to my fetch); Stillfront lists DTC payments as a shared service | S1, S21 [MEDIUM] |
| Marketing giveaways | Film festival and 8th-birthday referral sweepstakes (invite 8 friends who each live a full life; USD 888 x 8) | S8, S9 [HIGH] |

### 22.2 Price history (direction of travel)
- 2018: ads removable by IAP (v1.3); Dec 2018 Bitizen introduced [W:Updates, MEDIUM].
- 2019: Bitizenship one-time, "all future content" (later removed); subscription test reversed Oct 2019 [W:Bitizenship, MEDIUM].
- 2020: God Mode about USD 8.99 [W:God Mode, MEDIUM].
- 2022: Boss Mode about USD 5, Actor pack about USD 2 at announcement per guide [S30, MEDIUM] (wiki says USD 5 per item or USD 10 pack [W:Acting, MEDIUM]); packs USD 4.99; Challenge Vault 4.99; unlimited Time Machine 14.99 [W:Updates, MEDIUM].
- Oct 2024: packs USD 4.99; Boss Mode USD 11.99 [W:Careers/Occupation, MEDIUM].
- Oct 2026 (App Store): Boss Mode 20.99; expansions 7.99; Bitizenship 7.99/9.99; God Mode 9.99; bundle 15.99 [S13, HIGH].
- Players note Boss Mode "from $69.99" strike-through and USD 17.99 items in Dec 2025 (regional/price-tier effects possible) [r/BitLifeApp/comments/1punbjs, 1pjghe2; MEDIUM].

### 22.3 Financials
| Period | Value | Source |
|---|---|---|
| 2019 | Candywriter revenue about USD 26 M, EBIT margin about 59%, DAU 1.2 M, MAU 7.8 M, 42 M downloads | S18 [HIGH] |
| Lifetime to mid-2025 | USD 136 M IAP, 130 M+ downloads, 1 M+ DAU "since 2018" | S23 [MEDIUM] (Sensor Tower-style estimates, not audited) |
| 2025 | Stillfront BitLife net revenue SEK 485 M, organic growth -17% (part of 2025 "tougher year-on-year comparables") | S21 [HIGH] |
| H1 2026 | SEK 204 M vs SEK 277 M H1 2025; Q2 2026 SEK 109 M vs 141 M; organic -19%; "driven by a stricter user acquisition approach and challenging comparison numbers"; sequential growth from LiveOps and Ultimate Fighter Mode | S22 [HIGH] |
| Last-twelve-months to Q2 2026 | SEK 413 M | S22 [HIGH] |
| US Q4 2025 | Sensor Tower blog: BitLife second in revenue among 5 compared simulators, led in active users (about 1.15 M); weekly revenue peak about USD 266 K, peak downloads about 80.6 K | S24 [MEDIUM; auto-generated blog] |
| Sensor Tower overview snapshot | US iOS about 300-400 K downloads and about USD 600-700 K revenue last month; US Google Play about 300-600 K downloads and about USD 300 K | S25 snippets [LOW-MEDIUM; snapshots vary] |
| Genre context | AppMagic: Life Sim genre H1 2025 about USD 80 M revenue (+30% YoY), 148 M downloads (-3%) (genre definition unverified, BitLife not named in snippet) | AppMagic casual report H1 2025 [LOW] |
| Implied | 2024 BitLife revenue about SEK 580 M (485 / 0.83, ignoring FX) | inference [LOW] |

Pattern: the category leader peaked in profitability in 2019 (59% EBIT margin on USD 26 M) and is **declining** (-17% in 2025, about -26% H1 2026 reported) while shifting to pricier content packs and cutting user acquisition [S21, S22; HIGH on numbers, interpretation MEDIUM].

### 22.4 Reception: ratings
- App Store 4.76 (1.79 M ratings) vs Google Play 4.40 (1.31 M) [S14, S15; HIGH]. Ratings stay high despite loud community anger (see 23) because ratings are dominated by casual players and prompts. (interpretation, LOW)

---

## 23. Controversies and community sentiment

| When | Issue | Evidence |
|---|---|---|
| Oct 2018 - 2019 | Content softened for stores: app logo changed from sperm to baby (sperm stays as secondary icon), "Abort x10" achievement removed, "Get an abortion" renamed "Don't keep the baby", "assault" renamed "charge"/"rumble" | W:BitLife: Life Simulator [MEDIUM] |
| 2019 | Android lagging iOS; first Android-first update was Oct 2019 Haunted | W:BitLife: Life Simulator [MEDIUM] |
| Oct 2019 | **Monthly Bitizenship subscription** floated and tested in Canada/Australia; "nearly unanimously negative"; reversed | W:Bitizenship [MEDIUM] |
| Feb 2020 | Mind and Body redesign: new faces called "creepy", UI "too big"; custom scenarios removed then restored two weeks later | W:BitLife: Life Simulator, W:Updates [MEDIUM] |
| Mar 2022 | "All future content" and "no more ads" text removed from Bitizenship description; one-star review calls | r/bitlife/comments/t9fpyu, tjlmjw [MEDIUM] |
| 2023-2024 | Players report AI-generated art in Secret Agent pack and Coach update; not confirmed by Candywriter in sources I opened | r/BitLifeApp/comments/1bri20u, 17eswi5 [MEDIUM; unverified claim] |
| Jun 2025 | Trade article calls interstitial cadence "aggressive" | S23 [HIGH] |
| Dec 2025 | BitPass/Seasons, daily task strips, "final job pack": players ask "is this a battle pass?"; fear that legacy Bitizens lose free content; UI clutter | r/BitLifeApp/comments/1pjghe2, 1pmry38, 1q40f8u [MEDIUM] |
| Jan 2026 | "upgraded menu for maximum profit" meme (1,239 points) | r/BitLifeApp/comments/1qlpxi0 [MEDIUM] |
| Jul-Aug 2026 | Pride Season broken; compensation; BitPass removed; Seasons canceled on 14 Aug | S5, r/BitLifeApp/comments/1vb2gb8, 1vmsx4e [HIGH/MEDIUM] |
| 10-12 Sep 2026 | **Movie Director not included for Bitizens or Boss Mode buyers**; heavy backlash ("Deleting BitLife after 8 years" 804 points, "Do NOT buy the director DLC"); official "A Note to the Bitizens!" post on 12 Sep says legacy Bitizens get it (players quote a "technical error" explanation); days later some legacy buyers still report no access (Sep 16, 19, Oct 2 posts) | r/BitLifeApp/comments/1wcts2v, 1wdq9z7, 1wdjukk, 1why5ly, 1wkr44c, 1wvda5x [MEDIUM] |
| Sep 2026 | "Some context to bitlife's current financial situation" thread speculating a "BitLife 2.0" to escape legacy promises (opinion) | r/BitLifeApp/comments/1wfw6hg [MEDIUM] |
| Ongoing | Prices (regional multipliers, e.g. a player in New Zealand reports packs at NZD 30-50 equiv), shallow packs ("seen everything after a few age-ups"), buggy builds, fewer dev conversations ("The og devs used to have conversations with us") | r/BitLifeApp/comments/1wft3lg, 1wdq9z7 [MEDIUM; opinion] |
| Mods | Players recommend cracked/MOD APKs; Android privacy/piracy a recurring concern (SEO mod sites pervade search results) | r/BitLifeApp/comments/1wcts2v, S29 [MEDIUM] |

Sentiment summary: **high core-game love, strong monetization distrust**. Sample counts from top-of-month r/BitLifeApp (Sep 2026): of top 25 posts, at least 8 are complaints about packs, Bitizen promises, "scam life", or deleting the app [r/BitLifeApp top month, MEDIUM; my count of titles].

### Community assets
- r/BitLifeApp (official, 257,711 subscribers, created 2018-10-19); r/bitlife (87,182, created 2015-03-29, described as fan-run) [S29, HIGH]; Candywriter staff post as u/BitLifeApp ("Devs here! We wanna know...", "Lives We Couldn't Ignore" monthly free-expansion contest, patch notes threads) [S29, HIGH].
- Official channels: Instagram, YouTube, TikTok, X, Snapchat [S1, HIGH].
- Fan wiki with 1,580 articles; many guide sites (ProGameGuides, LevelWinner, Gamepur) monetize BitLife SEO traffic [S28, S30; MEDIUM].

---

## 24. Seasonal and live-event content

- Seasonal updates: Halloween "Haunted" (Oct 2019), holiday updates, Pride (Jun 2020), Easter/Zodiac/Halloween/Thanksgiving scavenger hunts (2024) [W:Updates, W:Scavenger Hunts; MEDIUM].
- Official "Live Events" page lists 8th Birthday Party (172 countries) and Soccer Striker Scavenger Hunt (Ballon d'Or objective) [S12, HIGH].
- Real-world tie-ins: Film Festival sweepstakes with iPhone/Apple Watch/AirPods prizes (US excl. RI, CA, UK) [S8, HIGH]; referral giveaway [S9, HIGH].
- Monthly community contest on Reddit for a free expansion pack (June 2026) [r/BitLifeApp/comments/1tv37a9, HIGH].
- Push notifications for Fight Club (Jul 2026) [S3, HIGH].

---

## 25. Update and ops cadence (2026 snapshot)
- Weekly maintenance builds (3.25.1 on 21 Sep 2026; Android updated 18 Sep 2026 per Play page) [S14, S15; HIGH].
- Patch note themes mid-2026: Ultimate Fighter balance (Street Cred no longer lost from losing fights, difficulty bars, move style data, drug detection tied to wiliness, coach training rebalance), dead characters leaking into interaction lists, deceased fiancés interactive, heirloom condition damage, custody video evidence, prom royalty [S3, HIGH]. These are **state-consistency bugs** typical of a large hidden-state sim.
- Accessibility: voice-supported accessibility (May 2022), marketplace accessibility bugs (Aug 2026) [W:Updates 3.1.11, S3; MEDIUM/HIGH].

---

## 26. What BitLife does well (observed)

1. One-button core loop (Age) that makes sessions as short as 30 seconds and as long as an hour [W:Age, S23; MEDIUM].
2. Dark-humor, hand-written text with sharp, shareable moments (tombstone, headlines) [S33 about page, S21 ("renowned for its humor"); HIGH].
3. Huge breadth of life domains, each cheap to build as text plus a small table (jobs, crimes, diseases, countries) [W:*, MEDIUM].
4. Country system that changes laws, school ages, healthcare and gambling per country, producing replay variety at low content cost [W:Nations, MEDIUM].
5. Meta collection (ribbons, achievements, cemetery, heirlooms, accessories, challenges) giving goals without changing the sim [W:*, MEDIUM].
6. Legacy loop (Generations) that converts death into the next session [W:Generations, MEDIUM].
7. Community co-creation: custom people, scenario creator, community suggestions drive features (siblings was "top thing you've been asking for") [W:Updates 1.3, 1.8; MEDIUM].
8. Virality without marketing: #1 overall iOS in several countries in Nov 2018 [S16, S27; MEDIUM].
9. Season-less, evergreen content that does not rot (text sim ages gracefully) [inference, LOW-MEDIUM].

## 27. What BitLife does badly (observed)

1. Monetization stack accumulated into clutter and distrust (ads, boosts, pass, packs, bundles, marketplace) [section 23; MEDIUM].
2. Broken promises ("all future content"), re-reversed twice (job packs, Movie Director) [section 23; MEDIUM].
3. Content droughts and quality complaints; vertical packs reuse the same systems [section 3, 23; MEDIUM].
4. Weak simulation persistence: dead NPCs interact, state bugs [S3, HIGH].
5. Platform fragmentation: purchases do not transfer across iOS and Android; language apps separate until 2026 [S4, S6; HIGH].
6. Opaque randomness; players want control (auto-pregnancy toggle, event preferences) [r/BitLifeApp/comments/1w8u6xj; MEDIUM].
7. Regional price inconsistency [section 22.2; MEDIUM].
8. Limited devs-to-players communication in the community, per long-time players [r/BitLifeApp/comments/1wdq9z7; MEDIUM].

---

## 28. Unverified gaps (explicit)

| Gap | Status |
|---|---|
| Developer interviews (design philosophy, team size, tooling) | none found; **unverified** |
| BitPass price and exact Seasons mechanics (free vs premium track, Bits sink) | **unverified** (only official social snippet and Reddit titles) |
| Exact interstitial cadence and ad revenue share today | Gamigion article (Jun 2025) only; **MEDIUM** |
| Lifetime revenue and downloads from Sensor Tower/AppMagic | only secondary and snapshot numbers; the official "174M+" is a claim |
| Current DAU/MAU | 2019 DAU 1.2 M; Q4 2025 "about 1.15 M active users" (US blog, definition unclear) |
| Event probability tables, salary formulas, stat deltas for random events | not published; **unverified** |
| Movie Director and BitPass prices | USD 10 reported by players only |
| Whether AI art is used (and where) | player claim; no Candywriter statement opened |
| "BitBook" | no evidence it exists |
| Exact release months for Secret Agent, Zoo, Outdoor, Racing, Luxury Pack, Casino pack | **MEDIUM at best** |
| Legal status of "all future content" promise | not researched; players speculate |
| Android UI differences | not checked |

---

## 29. Implications for our mobile life-sim game

1. **Copy the one-button yearly tick + text-event card.** It is the cheapest-to-build, most replayable loop in the genre, and BitLife shows it carries a 1 M DAU business for 8 years [S23, S24; MEDIUM]. Keep the bottom bar to Age plus 4 tabs and protect that screen from monetization banners (BitLife's clutter is the top UI complaint) [section 5, 23].
2. **Copy data-driven content: hand-written event templates + country/law tables + eligibility filters.** Put events in data (JSON/YAML) with placeholders, tags (age, country, stats, owned packs), and weights so writers can ship without code. Stillfront itself says BitLife is "building tools to accelerate content development" [S21, HIGH].
3. **Copy the death-to-legacy loop** (obituary screen, ribbons, cemetery, continue as child with inheritance, heirlooms). It converts churn moments into the next session. Ship it free in v1; BitLife's hard Bitizen gate on unlimited generations is a conversion lever you can instead place on cosmetic or convenience items.
4. **Avoid selling "all future content" in a one-time purchase.** BitLife removed the promise (Mar 2022) and, per players, excluded legacy buyers from the Movie Director at launch (Sep 2026; the official 12 Sep note says legacy Bitizens get it, so the exclusion rests on Reddit reports only), producing the biggest sustained backlash and legal speculation in its history [section 19.1, 23; MEDIUM]. Decide entitlements in writing at launch: e.g. "Premium = no ads + QoL + 1 expansion per year" and a separately priced content pass.
5. **Avoid layering a season/battle pass on a narrative sim.** BitLife launched BitPass/Seasons in Dec 2025 and cancelled it in Aug 2026 after Pride Season failed; Stillfront had listed it as the LiveOps strategy [S5, S21; HIGH]. Narrative sims reward long-tail evergreen content, not time-limited FOMO.
6. **Improve content cadence discipline.** BitLife's gap between Mafia (Dec 2020) and Movie Star (Mar 2022) cost momentum while spin-offs (DogLife/CatLife) shipped [section 3; MEDIUM]. Plan 4-6 week content beats, and ship vertical packs only when they integrate with core systems (family, economy, crime) instead of siloed careers; players say expansions are "boring in the first hour" [r/BitLifeApp/comments/1wft3lg; MEDIUM].
7. **Improve ad ergonomics.** Rewarded video as player-initiated help (Boosts, mini-game helpers) works; interstitials every 70 seconds attracted trade-press criticism [S23, HIGH]. Cap interstitials per session, never interrupt choice cards, and always show a "remove ads" price that is small (BitLife: USD 2.99) [S13, HIGH].
8. **Improve entitlements and platform parity.** BitLife purchases do not transfer between iOS and Android and language apps were split for years [S4, S6; HIGH]. Build account-based entitlements, cloud save, one binary with all languages, and a web store (DTC) from day one [S21 lists DTC as a service; MEDIUM].
9. **Improve player agency over randomness.** Players ask for toggles (auto pregnancy), event preferences, and fair undo; BitLife sells a Time Machine (USD 0.99 per use up to 24.99 reported) and loses trust when players re-open the app to reroll [section 21, 22; MEDIUM]. Offer a limited free "rewind" per life and difficulty/content-safety toggles.
10. **Copy shareability, not controversy.** Tombstone screenshot, shareable obituary, custom NPCs from friends' names, and challenge ranking drove growth (#1 iOS in several countries with "zero marketing") [S16, W:Updates; MEDIUM]. But BitLife softened its logo and wording for stores; budget for age rating (17+/18+) and per-country legal variants early [W:BitLife: Life Simulator, S14; MEDIUM].
11. **Treat the market size honestly.** The leader's Stillfront revenue is about SEK 485 M (about USD 48-50 M) in 2025 and falling, with a 59% EBIT margin at USD 26 M in 2019 [S21, S18; HIGH on SEK/USD 26 M; USD conversion MEDIUM]. The genre has room (declining leader, angry core fans, "why isn't there a competitor yet" comments [r/BitLifeApp/comments/1vmsx4e; MEDIUM]), but plan for a USD single-digit to low-double-digit-million ceiling unless the loop is differentiated.
12. **Differentiate where BitLife is structurally weak.** Persistent world consistency (no dead NPCs in menus [S3]), meaningful family/economy depth, transparent monetization, and a strong first-session hook. BitLife's listed 2025 development priority was "optimizing early gameplay systems to increase retention" [S21, HIGH], which signals D1/D7 is its pressure point and a place to compete.
