# 07 - UX / UI / Art / Audio / Onboarding / Accessibility for Mobile Life Sims

Research date: 2026-10-06. Slice owner: UX/UI/ART/AUDIO/ONBOARDING/ACCESSIBILITY. Non-goals: system design, monetization, tech stack (other files).

## 0. How to read this file

- Every factual claim carries a source URL and a confidence label: **HIGH** (read directly in the cited source this session), **MEDIUM** (secondary source or reasoned inference from a source), **LOW** (weak/indirect).
- Design recommendations are labelled **OPINION** with a rationale.
- "unverified" means no source was reachable; do not rely on it.
- Method limits (stated, not hidden): the WebSearch budget (200 calls/session) was exhausted mid-research, many sources returned 402/403 (Fandom, AppleVis, Screenhub, appunwrapper, Google Play, Dribbble), and App Store screenshots are marketing composites, not guaranteed live UI. Where I describe a screen I name the screenshot source. Full coverage gaps are listed in section 18.

---

## 1. Competitor snapshot (store facts)

| Game | Dev | Rating (US App Store, fetched 2026-10-06) | Age rating | Languages | Download size | Source |
|---|---|---|---|---|---|---|
| BitLife - Life Simulator | Candywriter | 4.76 / 1,794,736 ratings | 18+ on store page; `17+` in legacy API field | EN FR DE PT ES (5) | 384 MB | https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536 and https://itunes.apple.com/lookup?id=1374403536&country=us - HIGH |
| AltLife - Life Simulator | Mark Benyei | 4.70 / 1,176 | 13+ (page) / 12+ (API) | EN only | n/a | https://apps.apple.com/us/app/altlife-life-simulator/id1567044511 - HIGH |
| Alter Ego (Choose Multiple LLC, classic 1986 port) | Choose Multiple | 4.38 / 186 | 12+ | EN | 31 MB | https://itunes.apple.com/lookup?id=329703516&country=us - HIGH |
| Reigns: Her Majesty | Nerial / Devolver | 4.84 / 15,464 | 12+ | 12 | 196 MB | https://itunes.apple.com/lookup?id=1171040772&country=us - HIGH |
| Reigns (original) | Nerial / Devolver | 4.75 / 7,621 | 12+ | 14 | 130 MB | https://itunes.apple.com/search?term=Reigns&entity=software&country=us - HIGH |
| The Sims FreePlay | EA / Firemonkeys | 4.58 / 462,565 | 12+ | 12 | 2,607 MB | https://itunes.apple.com/lookup?id=466965151&country=us - HIGH |
| ZEPETO | NAVER Z | 4.65 / 541,910 | 12+ | 15 (incl. Arabic, Vietnamese, Thai) | 543 MB | https://itunes.apple.com/lookup?id=1350301428&country=us - HIGH |
| Life Sim 3D: Family Simulator (new entrant, released 2025-09-23) | Vira Games | 4.67 / 144,163 | 12+ | 8 | 892 MB | https://itunes.apple.com/lookup?id=6747178992&country=us - HIGH |

Observations:
- BitLife: 384 MB for a "text" game (it ships illustrated art and audio) - HIGH (store page). BitLife store page: "The developer indicated the app lacks support for certain accessibility features" (paraphrase of the fetch result; see section 12) - MEDIUM because the fetch tool paraphrased the Accessibility block.
- BitLife advisories list "Frequent/Intense Mature/Suggestive Themes" plus mild violence, drugs, profanity, nudity, simulated gambling - HIGH (https://itunes.apple.com/lookup?id=1374403536&country=us, `advisories` field).
- Reigns: Her Majesty carries an in-description warning "this game contains flickering images on rare occasions" - HIGH (App Store description, same lookup as above). That is a ready-made precedent for a photosensitivity notice.
- Credits on Reigns: Her Majesty: Francois Alliot (design/programming), Arnaud de Bock (art), Jim Guthrie (music), Leigh Alexander (narrative director) - HIGH (App Store description). For the original Reigns the visual designer named by Game Developer is Mieko Murakami - MEDIUM (https://www.gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-, via summarizing fetch).
- Life Sim 3D: Family Simulator (3D, 8 languages, 144k ratings within about 12 months of its 2025-09-23 release date) shows the 3D "Sims-like" lane is still being entered in 2025-26 - HIGH on numbers, MEDIUM on interpretation.

---

## 2. UI teardowns (what the sources actually show)

### 2.1 BitLife

Evidence from official App Store marketing screenshots (7 images, downloaded and viewed; URLs resolvable from https://itunes.apple.com/lookup?id=1374403536&country=us `screenshotUrls`). Caveat: marketing composites; layout elements below were visible in the images, nothing was inferred beyond them. Confidence HIGH on "visible", MEDIUM on "is the live UI".

| Element | What the screenshots show |
|---|---|
| Header | Solid red bar with BitLife logo; under it a light blue-grey strip: avatar thumbnail + flag + player name (underlined link-style, with an "i" info chip), life-stage/job subtitle ("Infant", "Fashion Designer", "Famous Fashion Designer"), right-aligned "Bank Balance" with large green currency figure |
| Feed | White card; line "Age: 28 years" in bold blue, followed by plain sentences in first person ("My big brother, Stanley, started college.") - blank vertical space below; the feed is plain text, no icons per line |
| Event popup | Off-white card with a colored category ribbon at top ("Love"), emoji-style icon + title ("First Date"), 2-3 sentence situation, a question ("What will you do?"), then 3 stacked full-width blue buttons with centered white labels |
| Outcome popup | Same card style; title ("Fairytale ending"), result sentence, and a labelled green progress bar ("Enjoyment") |
| Death screen | Tombstone graphic: name, "AGED 96 YEARS", date; lines for Net Worth, Residence, Career, Education, Children, Lovers; two green bars (Happiness, Karma); one-line epitaph; a "Famous" ribbon |
| Illustration style | Emoji-like rounded avatars with soft shading ("Memoji-ish"), bright saturated panel backgrounds; avatar visibly ages (infant, child, adult, elder) across screenshots |

Text-only (non-image) sources on the main screen:
- Age button is at lower middle, shown as a "+" sign; each tap advances one year - MEDIUM (search snippet from the BitLife Fandom wiki page "Age" https://bitlife-life-simulator.fandom.com/wiki/Age; the page itself returned 402 to direct fetch).
- Tabs/sections: Occupation, Assets, Relationships, Activities; four stats Happiness, Health, Smarts, Looks shown at the bottom - MEDIUM (same search snippet; the projectwet guide https://international.projectwet.org/discussion/ultimate-bitlife-guide-tips-and-tricks also says the main screen summarizes "age, happiness, health, smarts, looks, and karma" - MEDIUM).
- The "+" "forwards the game by up to a year or to the next nearest life event/choice" - HIGH (https://www.gravenoisemedia.com/game-review-bitlife-mobile-free-to-play/ via fetch).
- Menus unlock contextually (e.g., job menus when old enough) - MEDIUM (same GraveNoise review, fetch summary).
- Popups are the choice mechanism ("the boy next door asks you to go to the movies with him") - MEDIUM (same).
- Full-screen video ads "15 to 30 seconds before you can shut them" disrupt gameplay (review-era claim; this is a 2018-19 review) - MEDIUM.
- Sound cues: "The funeral march at your death, the baby cry at your birth" - MEDIUM (same review).

Unverified: exact bottom-bar icon set, exact pixel sizes, current (2026) home screen after the BitPass/community updates. A Reddit user complaint (Jan 2026) titled "Please remove from the gameplay screen" (score ~160) refers to monetization UI such as BitPass and expansion-pack entries permanently on the gameplay screen; comments say it also pops up on app open - HIGH on the existence of the thread and its comments (https://www.reddit.com/r/BitLifeApp/comments/1q8pqt6/please_remove_from_the_gameplay_screen/, read via Reddit API; the image itself was not viewable).

### 2.2 AltLife (BitLife-style, text-first; best visible mobile layout reference)

Screenshots (https://itunes.apple.com/lookup?id=1567044511&country=us, viewed) - HIGH on "visible":
- Top strip: logo, money pill "$73,208,620 / $73.2M / Tap for details", hamburger button.
- Six stat bars with emoji icon + numeric percentage text inside the bar: Health 90%, Happiness 6% (red), Appearance 97%, Intelligence 41%, Fitness 56%, Social 100%. Low value is red AND labelled with its number (i.e., not color-only).
- A two-tab segmented control: Childhood | Adulthood (life-stage filter for the feed).
- Feed: first-person sentences, year headers in yellow ("2056 - 34 years old"), full-width scroll.
- Bottom: two circular buttons "Relationships" and "Profile".
- Secondary screens: Inventory (3-column icon grid, "15 / 100" capacity pill, badge icons per tile) and Careers & Jobs (segmented Careers | Jobs | Gigs; list rows with salary right-aligned, "Dream Job" tag).
- Store text: "No real-time waiting, no timers" - HIGH (https://apps.apple.com/us/app/altlife-life-simulator/id1567044511).

### 2.3 Alter Ego (classic, Choose Multiple LLC port)

- Screenshot shows a serif, light-background questionnaire list with radio buttons (BUSINESS, SALES, CREATIVE, HEALTH SERVICE I ...) and a bottom "Next" button - HIGH (screenshot 4 of https://itunes.apple.com/lookup?id=329703516&country=us, viewed).
- Another screenshot shows a vertical flow-chart of lifetime events as colored icon tiles joined by lines (work, heart, baby, graduation cap, ...) i.e., a life-path map - HIGH (viewed, screenshot 2).
- Google Play lists a different "Alter Ego" (com.playalterego.android, text-based interactive fiction, 3.9 stars, 1.7K reviews per a search snippet) - MEDIUM; the page fetch failed. The user's brief says "Alter Ego"; confirm which product the team means (unverified).

### 2.4 Reigns / Reigns: Her Majesty

Evidence: App Store screenshots viewed (https://itunes.apple.com/lookup?id=1171040772&country=us) - HIGH.
- Top bar: four icons (church cross, person, sword, coin) each partially filled (fill level = stat value). When a choice would change a stat, a small dot appears above the affected icon (screenshot 3 shows dots above person and sword) - HIGH that the dots exist in the screenshot; MEDIUM that dot size encodes magnitude (not read in a source; unverified).
- Center: one question text in monospace-style pixel font, then a single large card with flat-vector portrait; the active choice label ("Obviously") appears on the card as it tilts while dragging - HIGH (screenshot 3).
- Bottom: ruler name, "N years" reign counter, a large counter (e.g. 1473) and a small triangle - HIGH.
- Mechanic facts: swipe left/right binary choice, "a hundred decisions in five minutes", four bars at top "that's your kingdom" - HIGH (https://www.inverse.com/gaming/23117-reigns-francois-alliot-nerial-developer-interview, fetch).
- Started with 50 cards expanded via probabilistic selection (fetch summary) - MEDIUM (https://www.gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-).
- GDC 2017 session "The Casual (but Regal) Swipe: Creating Game Mechanics in Reigns": 6-month production, "bifurcation and wandering" as method - HIGH (https://www.gdcvault.com/play/1024278/The-Casual-(but-Regal)-Swipe).
- One thumb: the mechanic is a horizontal drag on a single central card - HIGH from screenshots; the claim "one-handed by design" is not in a source I could read (unverified, but physically evident).

### 2.5 The Sims FreePlay / Sims Mobile (3D, management-style)

- FreePlay is 2.6 GB, 12 languages, 462k ratings - HIGH (iTunes API above).
- UI redesign work: portfolio sources describe a redesign for touch with a design system and decluttered HUD - MEDIUM (https://augustinestudio.io/games/the-sims-ryaex returned 404 later; the claim came from the search snippet); designer Anna Brandberg notes pregnancy was "the single most requested feature of the game's first six years" and that integrating features into "massive amount of existing legacy content" is hard - MEDIUM (https://www.annabrandberg.com/sims-freeplay-ux-design, fetch summary).
- GCAP 2025 (Adric Polkinghorne, Firemonkeys): talk on redesigning the meta because "unclear design and gameplay guidance had provided an obstacle for players and developers" - MEDIUM (search snippet attributed to https://www.screenhub.com.au/news/features/the-sims-freeplay-design-challenges-2682752/; direct fetch returned 403).
- Sims Mobile: "very polished, full 3D experience", players start with two Sims, event assignment finishes by itself so "you progress without actually playing"; critique that onboarding builds "a pre-set habit of collecting rewards, assigning events and leaving the session" - MEDIUM (https://mobilefreetoplay.com/deconstructing-sims-mobile/, summarizing fetch).

### 2.6 ZEPETO (avatar-first social)

- 15 store languages; store pitch is worlds + friends + feed/chat - HIGH (iTunes API, description).
- First screenshot: "Create Your Avatar" with 3D semi-realistic stylized faces, varied skin tones/hair textures (braids, curls), accessories - HIGH (viewed). Deeper UI/avatar-system details: unverified (no source fetched).

---

## 3. Screen inventory a life sim needs

Derived from the BitLife/AltLife screenshots and text sources above plus my synthesis. Priority is OPINION.

| # | Screen | Purpose | Seen in | Priority (OPINION) |
|---|---|---|---|---|
| 1 | Home / Timeline (age-up feed) | Core loop: read year summary, advance | BitLife, AltLife | P0 |
| 2 | Event card / choice popup | Decisions with 2-4 options | BitLife, Reigns | P0 |
| 3 | Outcome card | Show consequence + stat deltas | BitLife (bar), Reigns (dots) | P0 |
| 4 | Character / Profile | Stats, traits, skills, inventory | AltLife (Profile, Inventory) | P0 |
| 5 | Relationships list + detail | Family, friends, partners; interactions | BitLife, AltLife | P0 |
| 6 | Jobs / Career / Education | Apply, switch, promotions | BitLife Occupation, AltLife Careers | P0 |
| 7 | Activities menu (categorized) | Player-initiated actions per year | BitLife Activities | P0 |
| 8 | Assets (property, vehicles, items) | Buy/sell, capacity | BitLife, AltLife Inventory (15/100) | P1 |
| 9 | Character creation / birth | Name, country/background, appearance | all | P0 |
| 10 | End-of-life summary + share | Obituary/tombstone, legacy, share card | BitLife tombstone | P0 |
| 11 | Legacy / next generation | Continue as child (heirloom) | BitLife Legacy, Sims Mobile retire/heirloom | P1 |
| 12 | Achievements / challenges / life history | Replay motivation | BitLife (feature list), Reigns challenges | P1 |
| 13 | Settings (text size, haptics, sound, reduced motion, content filters, language, notifications) | Accessibility + control | n/a (HIG: personalize) | P0 |
| 14 | Shop / store | Cosmetics, passes | BitLife IAP $0.99-$20.99 | out of scope (monetization file) |
| 15 | Content warning / age gate | First launch | App Store ratings | P0 |

Sources for the Reigns "challenges" and Sims Mobile "heirloom" rows: https://apps.apple.com/us/app/reigns-her-majesty/id1171040772 (description: "Royal Challenges") - HIGH; https://mobilefreetoplay.com/deconstructing-sims-mobile/ ("Heirloom tokens") - MEDIUM. BitLife price range: https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536 ($0.99 Time Machine to $20.99 Boss Mode) - HIGH via fetch.

## 4. Information density and one-thumb ergonomics

### Evidence

| Fact | Source | Conf. |
|---|---|---|
| iOS default text 17 pt, minimum 11 pt; default control 44x44 pt, minimum 28x28 pt; about 12 pt padding around bezeled elements, about 24 pt around unbezeled | Apple HIG Accessibility, read from https://developer.apple.com/tutorials/data/design/human-interface-guidelines/accessibility.json | HIGH |
| Android: touch targets at least 48x48 dp (about 9 mm), separated by 8 dp or more; target size 7-10 mm | https://support.google.com/accessibility/android/answer/7101858 | HIGH |
| 49% of people hold phones with one hand; 75% of interactions are thumb-driven; keep frequent actions in the easy-reach zone | https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/ (2016 article summarizing earlier field studies; phones have grown since) | MEDIUM (dated) |
| Menus must adapt to aspect ratios such as 16:10, 19.5:9, 4:3; avoid fixed layouts; use safe areas | https://developer.apple.com/design/human-interface-guidelines/designing-for-games (read via JSON data file) | HIGH |
| Android 15 enforces edge-to-edge; use WindowInsets for system bars and cutouts | https://developer.android.com/design/ui/mobile/guides/foundations/system-bars | MEDIUM (fetch summary) |

### What the reference games do with density (from viewed screenshots)

| Game | Persistent chrome on the main screen | Count of live numbers/bars |
|---|---|---|
| BitLife | Header (name, job, balance) + feed + bottom stats/nav (Age "+" lower middle) | 1 balance + 4 stats (Happiness, Health, Smarts, Looks) in main view; karma elsewhere (MEDIUM) |
| AltLife | Money pill, hamburger, stage tabs, 6 stat bars with icons and %, feed, 2 bottom buttons | 1 money + 6 bars |
| Reigns | 4 icons top, 1 card, name/years/counter bottom | 4 meters, no numbers |

All HIGH on "visible in marketing screenshot" (sections 2.1, 2.2, 2.4).

### Recommendations (OPINION)

- **Budget 4-6 always-visible numbers**, no more. Rationale: AltLife already uses 7 and gives the feed about half the screen (viewed screenshot); Reigns proves 4 meters carry a whole game.
- **Put the Age/Continue button and the primary choice buttons in the bottom 40% of the screen**; put read-only status (balance, stats) at the top. Rationale: thumb-zone evidence above, and BitLife places Age lower-middle (MEDIUM, wiki snippet).
- **Hit targets 48 dp / 44 pt minimum, 8-12 spacing** (both platform guidelines agree within rounding).
- **Show a stat as bar + number + icon** (AltLife pattern) so low values remain legible without color (see section 12).
- **Progressive disclosure**: BitLife unlocks menus contextually (MEDIUM, GraveNoise review); copy that so a 5-year-old character does not see "Occupation".

---

## 5. Text presentation: typography, reading speed, emoji and icons

### Evidence

| Fact | Source | Conf. |
|---|---|---|
| Text-heavy games: "Allow players to progress through text prompts at their own pace" is a Basic accessibility guideline; "Allow the font size to be adjusted" is Advanced; "Provide high contrast between text/UI and background" is Basic | https://gameaccessibilityguidelines.com/full-list/ | HIGH |
| iOS: enlarge text by at least 200% (Dynamic Type or custom UI); contrast 4.5:1 up to 17 pt, 3:1 at 18 pt or bold | Apple HIG Accessibility JSON (above) | HIGH |
| WCAG 1.4.8 (Level AAA): width no more than 80 characters (40 if CJK), not justified, line spacing at least 1.5, paragraph spacing at least 1.5x line spacing | https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html | HIGH (note: AAA, aspirational) |
| 50-75 characters per line is optimal; Baymard gives no specific mobile count | https://www.baymard.com/blog/line-length-readability | MEDIUM (subagent fetch summary) |
| Adult English reading speed is roughly 175-320 wpm | https://en.wikipedia.org/wiki/Reading | MEDIUM |
| WCAG 2.2.2 requires a way to pause, stop or hide moving content that starts automatically, lasts over 5 seconds and is presented in parallel with other content, unless essential | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | MEDIUM (applicability to typewriter reveal is interpretation) |
| HIG: avoid tight leading for 3+ lines; layout must adapt to all font sizes | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/typography.json | MEDIUM (subagent) |

### Observed text style

- BitLife feed: first-person plain sentences under a bold blue "Age: N years" line (viewed). AltLife: same, with a yellow year header and no per-line icons (viewed). Reigns: one 2-3 line question in a monospace-style pixel face above the card (viewed).
- AltLife puts emoji inside stat bars (viewed); BitLife uses emoji-like illustrated art on cards (viewed). Cross-platform emoji rendering differences: unverified (no source fetched). Twemoji is MIT code with CC-BY 4.0 graphics, attribution required - MEDIUM (https://github.com/twitter/twemoji).

### Reading-time arithmetic (derived, OPINION)

At 175-320 wpm, a 12-word feed line takes about 2.3-4.1 s; a 40-word event card takes about 7.5-13.7 s. A 1-5 minute session (section 11) therefore fits roughly 10-30 cards if each is under 40 words. This is arithmetic on the cited wpm range, not a measured result (LOW-MEDIUM).

### Recommendations (OPINION)

- Body text 17 pt default (HIG default), scalable to at least 200%; layouts must reflow, not clip.
- Cap event cards at about 40 words and choices at about 6 words; push detail behind a tap.
- Keep line width at or under about 60 characters on tablets by constraining the content column (section 14).
- Any text animation (typewriter) must be skippable by tap and disabled under Reduce Motion.
- Use icon plus text label, never icon alone, for stats and nav; emoji only where a bundled, licensed set is used (consistency across devices).

---

## 6. Animation, "juice" and haptics for text games

### Evidence

| Fact | Source | Conf. |
|---|---|---|
| Reigns card tilts as dragged and shows the choice label on the card while dragging | Viewed App Store screenshot 3 (https://itunes.apple.com/lookup?id=1171040772&country=us) | HIGH |
| "Juice It or Lose It" (Jonasson and Purho, GDC Europe 2012) and "The Art of Screenshake" (Nijman, 2013) are the canonical juice talks | https://github.com/dr-jam/GameplayProgramming/blob/master/Juice.md (talk 1 existence); talk 2 only via search snippet | HIGH / MEDIUM (existence only; contents not read) |
| Apple: Reduce Motion should reduce zooming/scaling/peripheral motion; tighten springs; replace x/y/z transitions with fades; avoid animating into/out of blurs | Apple HIG Accessibility JSON | HIGH |
| Apple: avoid time-boxed auto-dismissing UI; offer alternatives to swipe (add a button) | Apple HIG Accessibility JSON | HIGH |
| Apple haptics: use system patterns per documented meaning; use consistently; complement visual/audio; avoid overuse; short haptics for discrete events; make haptics optional | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/playing-haptics.json | HIGH |
| Apple impact/notification/selection feedback categories | same | HIGH |
| Android: "Given the choice of buzzy haptics or no haptics for touch feedback, choose no haptics"; "less is more"; keyclick effect 10-20 ms | https://developer.android.com/develop/ui/views/haptics/haptics-principles | HIGH (re-verified by regex over page text) |
| Android: predefined VibrationEffect constants fall back to a platform default when a device lacks an optimized implementation; VibrationEffect.Composition "doesn't have automatic platform fallbacks"; without amplitude control, amplitudes map to on/off (minimum Android versions 10+ / 11+ came from a summarizing fetch) | https://developer.android.com/develop/ui/views/haptics/haptics-apis | HIGH (fallback quote, re-checked by reviewer) / MEDIUM (version numbers) |
| "There is no single Android haptics, there are dozens of versions" - test on real devices | https://swmansion.com/blog/what-is-the-difference-between-i-os-and-android-haptics/ | MEDIUM (vendor blog) |
| Reigns, Wordle or Threes haptics usage | none found | unverified |
| Evidence for tick-up numbers, confetti, screen shake benefit in text games | none found | unverified |

### Recommended juice-and-haptic map for life events (OPINION; rationale: Apple's rule of a consistent cause-effect mapping)

| Event | Visual | Haptic (iOS / Android) | Sound (section 7) |
|---|---|---|---|
| Tap Age/Continue | Year header slides in (fade under Reduce Motion) | Selection tick / predefined CLICK (or none) | soft page-turn |
| Choice press | Button depress + card exit | Impact light / CLICK | tick |
| Good outcome | Stat bar fills with ease-out; small icon pop | Notification success / CONFIRM-like | rising 2-note stinger |
| Bad outcome | Bar shrinks, brief red outline plus icon (not color alone) | Notification warning-error / REJECT-like | low 2-note stinger |
| Birth / marriage / graduation milestone | Full-width banner card | Notification success | longer fanfare, once per milestone |
| Death | Slow fade to tombstone/summary screen | Single heavy impact, once | funeral motif / silence |

Rules: one haptic per user action, never per animation frame; global toggle in Settings; every cue also has a visual equivalent (HIG: haptics complement, do not replace). Never fire flashing effects over 3 flashes per second (Reigns itself carries a flicker warning; see section 1).

---

## 7. Sound design and music

### Evidence

| Fact | Source | Conf. |
|---|---|---|
| BitLife: "The funeral march at your death, the baby cry at your birth"; effects "work well with the adult humour" | https://www.gravenoisemedia.com/game-review-bitlife-mobile-free-to-play/ | HIGH (single 2018-19-era review) |
| Reigns original music by Disasterpeace (additional by Mateo Lugo); Her Majesty music by Jim Guthrie | https://en.wikipedia.org/wiki/Reigns_(video_game) (MEDIUM); Her Majesty credit HIGH from App Store description | MEDIUM / HIGH |
| Florence uses music in place of dialogue (cello = Krish, piano = Florence), composer Kevin Penkin | https://en.wikipedia.org/wiki/Florence_(video_game) | MEDIUM |
| 80 Days: about 750,000 words, a player sees roughly 2% per playthrough | https://en.wikipedia.org/wiki/80_Days_(2014_video_game) | MEDIUM |
| iOS audio session: Ambient = silenced by Ring/Silent switch, does not interrupt other audio; Playback = not silenced by the switch, interrupts other audio by default; SoloAmbient (default) = silenced and interrupts | https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/AudioSessionCategoriesandModes/AudioSessionCategoriesandModes.html (table re-read via regex) | HIGH |
| Android audio focus: USAGE_GAME is treated like media; on focus loss pause or duck | https://developer.android.com/media/optimize/audio-focus | MEDIUM-HIGH |
| HIG: do not rely on audio alone; pair audio cues with haptics/visuals; no autoplay audio without controls | Apple HIG Accessibility JSON | HIGH |
| HIG notification sound: custom sounds should be short, distinctive, professionally produced; do not rely on sound for important info | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/notifications.json | HIGH |
| Adaptive stingers, silence-as-design, FMOD/Wwise mobile file-size data | not found | unverified |

### Recommendations (OPINION)

- **Music**: 3-4 short seamless loops keyed to life stage (childhood, young adult, mid-life, old age) rather than per-screen music; crossfade on age-stage change. Rationale: the game's core variable is age, and loops that outlast 1-5-minute sessions avoid fatigue. Keep them sparse enough that muted play loses nothing.
- **Stingers**: 6-8 two-to-four-second stingers for the event classes in the map above; each class always maps to the same sound (same rule Apple states for haptics). Death gets the longest cue and then silence.
- **Mixing behavior**: default to the iOS Ambient category so music respects the silent switch and does not stop the user's podcast (OPINION: casual in-pocket game); expose "Music" and "Effects" sliders. On Android, request focus with USAGE_GAME and duck, do not seize.
- **Budget**: BitLife ships 384 MB (HIGH); audio share unknown. Keep our audio under a stated ceiling (e.g. 30 MB) via compressed streams; this ceiling is OPINION, not a sourced number.

---

## 8. Art styles and production cost

### Evidence from shipped games (cost data is sparse; I report what exists)

| Style | Example | Cost/time evidence | Source | Conf. |
|---|---|---|---|---|
| Flat vector cards | Reigns | About 6 months total production; 2 credited creators (design/code/writing + art) | GDC abstract https://www.gdcvault.com/play/1024278/The-Casual-(but-Regal)-Swipe (HIGH for "6 months"); creators via https://en.wikipedia.org/wiki/Reigns_(video_game) | HIGH / MEDIUM |
| Illustrated "emoji-like" avatars + panel art | BitLife | App is 384 MB; no team/cost numbers found | App Store | HIGH on size, unverified on cost |
| Hand-drawn 2D (zine/comic) | Florence | "22 months to develop"; switched 3D to 2D because "The third dimension wasn't adding anything to the storytelling"; "made its money back and a little more" | https://www.gamedeveloper.com/design/how-simple-mechanics-and-vignettes-inspired-i-florence-i- (re-verified by regex) | HIGH |
| 2D layered rigs in Spine + 3D set | Neo Cab | "core art team was usually around 3 people"; characters are 2D sprite rigs built in Spine | http://www.vincentperea.com/neocab (re-verified) | HIGH |
| Hand-drawn 2D, small team | TOEM | 2 developers, 1.5 years (4 incl. prototyping), budget $183k (a Steam/console game, not mobile) | https://www.gamedeveloper.com/production/postmortem-toem (re-verified; the subagent's "8 team members" was wrong, corrected here) | HIGH |
| 3D stylized | Sims FreePlay / Life Sim 3D | FreePlay 2.6 GB; Life Sim 3D 892 MB; no cost data found | iTunes API (section 1) | HIGH on size, unverified on cost |
| Painterly | Disco Elysium | about 35 in-house developers plus about 20 outside consultants | https://en.wikipedia.org/wiki/Disco_Elysium | MEDIUM |
| Spine (skeletal 2D) | tool | Stores bone data only, so file size is small (the page does not state an asset-count comparison with frame-by-frame); skins swap attachment sets, so outfits reuse across characters | https://en.esotericsoftware.com/spine-in-depth | HIGH |
| Pixel art cost data | none found | unverified | | |

Reading these together: the evidence shows small teams (2-3 art people) shipping 2D styles in 1-2 years and a pivot from 3D to 2D being a deliberate cost-and-clarity decision (Florence). It does not give a per-asset price.

### Relative production-cost ranking for a life sim (OPINION, LOW confidence - not sourced)

| Style | Per-event art | Per-character art | Aging of avatar | Risk |
|---|---|---|---|---|
| Typography + icons only (AltLife-like) | none | none | none | lowest cost; weak share-card appeal |
| Flat vector layered 2D (Reigns/BitLife-like) | reusable scene tiles | layered parts x age stages | swap layer sets per stage | moderate; best reuse |
| Pixel art | medium | medium (but sprite sheets per stage) | per-stage sheets | moderate; style fit unverified for this genre |
| 2D skeletal/paper cutout (Spine) | medium | rig once, skins per outfit | skins per stage | animation depth good; tooling cost |
| 3D (Sims-like) | high | very high (rig, outfits, animation) | model per stage | highest; download 0.9-2.6 GB per competitors |

Rationale for the ordering: layered 2D reuses parts across thousands of characters (Spine skin reuse is documented; Florence/Neo Cab show small teams succeed in 2D), while the 3D competitors are 892 MB to 2.6 GB (HIGH numbers, interpretation MEDIUM).

---

## 9. Avatar and character generation

| Fact | Source | Conf. |
|---|---|---|
| HIG: avoid referencing a specific gender in an avatar where possible; give people tools to customize; if gender info is required offer "nonbinary, self-identify, and decline to state"; show range of body types, ages; avoid stereotypes | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/inclusion.json (re-verified by regex) | HIGH |
| HIG (games): "Give players the tools they need to represent themselves"; "Avoid stereotypes in your stories and characters" | https://developer.apple.com/design/human-interface-guidelines/designing-for-games (JSON) | HIGH |
| BitLife shows the same character as infant, child, adult, elder in marketing art | App Store screenshots 1 and 4 (viewed) | HIGH |
| AltLife offers hairstyles, outfits, accessories, tattoos, eyewear customization | https://apps.apple.com/us/app/altlife-life-simulator/id1567044511 | HIGH |
| Sims FreePlay has 6 life stages (Infant, Toddler, Preteen, Teen, Adult, Senior); pregnancy update lets players customize the infant's skin colour | https://en.wikipedia.org/wiki/The_Sims_FreePlay | MEDIUM |
| Crusader Kings 3 moved from 2D paperdoll (CK2) to DNA-driven 3D portraits; portraits reflect lineage, age, lifestyle, illness | https://www.thesixthaxis.com/2020/07/31/crusader-kings-3-developer-diary-contracts-portraits/ | MEDIUM (lineage/age/lifestyle/illness confirmed; gene counts snippet-only) |
| DiceBear: library code MIT; styles carry their own licenses (42 CC0, 14 CC BY 4.0, 4 under the artist's own terms incl. Avataaars/Bottts, 1 MIT as of the fetch); read each style's license | https://www.dicebear.com/licenses/ | HIGH (agent-reported counts, MEDIUM on exact numbers) |
| Bitmoji: Snap bought Bitstrips for "more than $100 million" (2016); a 2023 shift from 2D to 3D styling drew "some user dissatisfaction" | https://en.wikipedia.org/wiki/Bitmoji | MEDIUM |
| ZEPETO creates stylized 3D semi-realistic avatars with wide skin-tone/hair range (store art) | App Store screenshot 1 (viewed) | HIGH (visual only; system internals unverified) |
| Layer/variant counts for paperdoll systems | none found | unverified |

### Design implications (OPINION)

- **Layered 2D paperdoll** (base head/body per age stage x skin tone, plus hair, facial hair, eyes, brows, mouth, clothing, accessory layers) is the cheapest way to get thousands of unique faces and visible aging; evidence for the cost claim is indirect (section 8).
- Make the face **deterministic from a seed** (store seed + layer indices, not an image) so the end-of-life share card can re-render it at any resolution. (Engineering choice; defer to the tech-stack file.)
- Age progression: swap layer sets at life-stage boundaries and tint hair toward grey, mirroring the infant/child/adult/elder progression visible in BitLife's art (viewed).
- **Style lock-in risk**: Bitmoji's 2D-to-3D change drew complaints (MEDIUM), so choose the style once.
- Inclusion: gender-neutral default options, a wide skin-tone/hair-texture/body-type/mobility-aid range, pronouns separate from appearance (HIG, HIGH).

---

## 10. Onboarding and first-time user experience (FTUE)

### Evidence

| Fact | Source | Conf. |
|---|---|---|
| Apple: "Let people play as soon as installation completes"; "Teach through play"; "Defer requests until the right time"; ask for ratings only after quality time | https://developer.apple.com/design/human-interface-guidelines/designing-for-games (JSON) | HIGH |
| HIG: "Provide great default settings" so people start without changing many settings | same | HIGH |
| BitLife "New Life" offers a random life or Custom Life (name, country, stats) | https://www.playbite.com/q/how-to-create-a-custom-life-in-bitlife | MEDIUM (secondary Q&A) |
| BitLife opens at "Age: 1 year" with a first-person birth line ("I was born on December 3rd. I am a Sagittarius.") and zero balance | App Store screenshot 1 (viewed) | HIGH (marketing composite) |
| Reigns was designed as "an intuitive, tutorial-free experience" | https://en.wikipedia.org/wiki/Reigns_(video_game) | MEDIUM |
| Sims Mobile onboarding critique: builds "a pre-set habit of collecting rewards, assigning events and leaving the session"; energy "doesn't have story value" | https://mobilefreetoplay.com/deconstructing-sims-mobile/ | MEDIUM-HIGH |
| FreePlay added a daily task list (Oct 2025) to counter unclear guidance | https://simscommunity.info/2025/12/24/sims-freeplay-2025-updates/ | HIGH |
| Generic FTUE advice: "Get to playable inside 60 seconds. No account creation, no settings, no extended tutorial" | https://gamegrowthadvisor.com/blog/2026-03-17-mobile-game-retention-strategies-2026/ | MEDIUM (blog) |
| Mobile median D1 about 22%, D7 just under 4%, D30 0.68-0.79%; GameAnalytics states genre-level benchmarks are unavailable in that report | https://www.gameanalytics.com/reports/2026-mobile-pc-gaming-benchmarks (re-fetched) | HIGH |
| Simulation D1 30.10%, D7 8.71%, D30 2.96% (attributed to Mistplay, cohort/date unknown) | https://segwise.ai/blog/mobile-gaming-app-user-retention-strategies | LOW |
| Specific BitLife tutorial sequence, GDC/Game UX Summit FTUE talks, Naavik/Deconstructor of Fun BitLife teardown | not found | unverified |

### First-session beats (OPINION; built from the HIG rules and BitLife/Reigns patterns above)

| Time | Beat | Rationale |
|---|---|---|
| 0-10 s | Splash straight to "Be born" with one big **Random life** button and a smaller **Customize** | HIG: play at once, great defaults; BitLife offers random vs custom |
| 10-30 s | Name/pronoun confirm (pre-filled), country/background chip row, optional appearance | HIG inclusion; no account |
| 30-60 s | First card in the feed is a single-sentence birth line; a ghosted arrow on the Age button | Teach through play; tutorial-free like Reigns |
| 1-2 min | First meaningful choice (age 3-5, low stakes) with 2 buttons and a visible stat nudge | Show cause-effect early (Sims Mobile critique: choices must matter) |
| 2-3 min | First milestone (first day of school) with a stinger + haptic | Reward the loop, teach the cue vocabulary |
| 3-5 min | A natural stop: a soft "Come back tomorrow" is NOT used; instead autosave and show the next age as the resume point | Apple "defer requests"; no notification prompt yet |
| after first meaningful success or session 2 | Offer notification opt-in with a context line | Android: "do so in the correct context"; "let them familiarize themselves with your app" (HIGH, section 11) |
| session 2+ | Ask for a store rating after a positive moment (e.g. a milestone) | HIG: only after quality time |

---

## 11. Session design (1-5 minutes) and notifications

### Evidence

| Fact | Source | Conf. |
|---|---|---|
| Mobile median session length 3.1-3.5 min; 3.8-3.9 sessions per day; about 12 min daily playtime | https://www.gameanalytics.com/reports/2026-mobile-pc-gaming-benchmarks (re-fetched) | HIGH |
| The year/age step is the natural turn: "Tapping Age advances one year"; "+" jumps to the next event | wiki snippet / GraveNoise (section 2.1) | MEDIUM |
| Reigns: "a hundred decisions in five minutes" | https://www.inverse.com/gaming/23117-reigns-francois-alliot-nerial-developer-interview | HIGH |
| AltLife: "No real-time waiting, no timers" as a selling point | https://apps.apple.com/us/app/altlife-life-simulator/id1567044511 | HIGH |
| Sims Mobile: events finish themselves, "you progress without actually playing" - shallow engagement | https://mobilefreetoplay.com/deconstructing-sims-mobile/ | MEDIUM |
| Apple notifications: get consent first; concise; avoid multiple notifications for the same thing; no instructions to do tasks; avoid sensitive info; custom sounds short and distinctive | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/notifications.json | HIGH |
| Android 13+: POST_NOTIFICATIONS is a runtime permission; request "in the correct context"; "let them familiarize themselves with your app" | https://developer.android.com/develop/ui/views/notifications/notification-permission (re-verified by regex) | HIGH |
| iOS opt-in about 56% (Pushwoosh 2025) / 48.85% (Airship) / 58-56% (Batch); Android fell from 85% to 67% after Android 13 (Batch); games are lower | https://www.shno.co/marketing-statistics/push-notification-statistics (aggregator); https://www.pushwoosh.com/blog/push-notification-benchmarks/ | MEDIUM (aggregator, snippets) |
| Pushwoosh hypercasual CTR: Android 1.05%, iOS 0.82% | https://www.pushwoosh.com/blog/push-notification-benchmarks/ | MEDIUM |
| Opt-out cliff numbers (46% opt out at 2-5 messages per week, etc.) | shno.co aggregator | LOW |
| Wordle's creator: "Would I send you a push notification?" - appetite for things that "transparently don't want anything from you" | https://techcrunch.com/2022/01/12/josh-wardle-interview-wordle/ | HIGH |
| BitLife birthday/"your character turned 30" notification practice; BitLife push volume | not found; a Sept 2026 r/bitlife thread "Is anybody getting a ridiculous amount of push notifications?" exists (title only) | LOW / unverified |

### Recommendations (OPINION)

- **Session unit = one year-turn, 10-40 seconds each**; 3-8 turns per session. Rationale: median session 3.1-3.5 min (HIGH) and reading-time arithmetic (section 5).
- **Every turn ends at a safe stop**; the game autosaves on every Age tap (no "save" UI). No timers, no energy, as in AltLife's pitch.
- **Notifications**: opt-in prompt only after session 1 success; at most one per day, only event-driven content that is true (e.g. "Maya turns 18") and never a task instruction (HIG); a user-settable cap and quiet hours in Settings; sensitive life events (death, illness) never in lock-screen text (HIG: no sensitive info).
- Contrast with Sims Mobile: do not let the game play itself; progress must require choices.

---

## 12. Accessibility

### 12.1 Why this is a gap in the genre (evidence)

| Fact | Source | Conf. |
|---|---|---|
| BitLife VoiceOver stopped reading in 2026: AppleVis thread "has BitLife just became inaccessible" - "VoiceOver won't read anything"; a reply (10 May 2026) attributes it to a Unity plug-in bug where "direct touch is not respected"; a reply of 20 Aug 2026 says the developer announced on X that issues were "mostly fixed" | https://mail.applevis.com/forum/ios-ipados-gaming/bitlife-inaccessible-now (page text re-read via regex) | HIGH on thread content; MEDIUM on root cause (forum user claim) |
| A 2022 r/BitLifeApp post "Blind People Officially can't play Bitlife anymore" reached about 1,500 points and says the game "used to" be screen-reader accessible; the top reply asks for it to be fixed | https://www.reddit.com/r/BitLifeApp/comments/t334h8/ (read via Reddit API) | HIGH |
| A latest-50-reviews pull on 2026-10-06 for BitLife shows a 1-star review dated 2026-10-04 saying VoiceOver users cannot do anything in the game | https://itunes.apple.com/us/rss/customerreviews/page=1/id=1374403536/sortby=mostrecent/json (I filtered for blind/voiceover/screen reader/accessib; 1 of 50 matched) | HIGH on the review; LOW as a prevalence estimate |
| BitLife's App Store page says the developer indicates it lacks support for certain accessibility features; AltLife's page says the developer "has not yet indicated" supported features | https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536 ; https://apps.apple.com/us/app/altlife-life-simulator/id1567044511 | HIGH |
| A blind user thread (Sept 2026) says a classic Sims-type life sim is "not accessible", and lists "life simulator" as a category the poster wants | https://www.reddit.com/r/Blind/comments/1wd3kiv/ | HIGH (existence); small sample |
| BitLife's dark mode was behind a paywall: a 2021 post titled "Dark Mode being behind a paywall is incredibly ignorant of the visually impaired" (about 91 points) | https://reddit.com/r/BitLifeApp/comments/qpy53b/ (title via subagent search; not re-read by me) | MEDIUM |
| A 2021 post (about 1,500 points) from a player with cerebral palsy says BitLife is easier to manage than The Sims with limited arm movement | https://reddit.com/r/BitLifeApp/comments/qox783/ (subagent; not re-read) | MEDIUM |

### 12.2 Platform and standards requirements

| Requirement | Source | Conf. |
|---|---|---|
| Text enlargeable to at least 200% (Dynamic Type or custom UI); defaults 17/11 pt | Apple HIG Accessibility JSON | HIGH |
| Contrast 4.5:1 up to 17 pt, 3:1 at 18 pt or bold; check both light and dark appearances; provide higher-contrast scheme with Increase Contrast | same | HIGH |
| Convey information with more than color alone (shapes/icons; red-green and blue-orange are the problem pairs) | same; also https://gameaccessibilityguidelines.com/full-list/ (Basic) | HIGH |
| About 1 in 12 men and 1 in 200 women have color vision deficiency; roughly 300 million worldwide | https://www.colourblindawareness.org/colour-blindness/ | MEDIUM (subagent) |
| VoiceOver: describe interface and content; Voice Control: label elements; Switch Control support | Apple HIG Accessibility JSON | HIGH |
| Alternatives to gestures: "if you use a swipe gesture to dismiss a view, also make a button available" | same | HIGH |
| Avoid time-boxed auto-dismiss UI; confirm twice for hard-to-recover actions | same | HIGH |
| Reduce Motion: reduce automatic/repetitive animations; fades instead of x/y/z transitions; tighten springs | same | HIGH |
| Subtitles/captions and haptics alongside audio cues; augment audio with visual cues | same | HIGH |
| Apple "Accessibility Nutrition Labels" (VoiceOver, Voice Control, Larger Text 200%+, Dark Interface, Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions, Audio Descriptions - nine labels per the re-check) are voluntary now; Apple says that "over time, you'll be required to share accessibility support details"; claiming a label requires users to complete all common tasks with that feature | https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels | MEDIUM-HIGH (subagent fetch; not re-read) |
| Android: 48x48 dp targets, 8 dp spacing; shapes/text/icons not color alone; Compose `liveRegion = Polite` for dynamic content; `customActions` as swipe alternatives | https://support.google.com/accessibility/android/answer/7101858 (HIGH, re-read); https://developer.android.com/develop/ui/compose/accessibility/semantics and https://developer.android.com/guide/topics/ui/accessibility/principles (subagent, MEDIUM) | HIGH / MEDIUM |
| Game Accessibility Guidelines relevant to a text life sim: Basic - readable default font, high contrast, no color-only info, progress text at own pace, avoid flicker, simple controls, difficulty choice; Intermediate - adjust contrast, hide background movement, avoid repeated inputs, autosave, customizable subtitles; Advanced - adjustable font size, disable blood/gore, no precise timing required | https://gameaccessibilityguidelines.com/full-list/ | HIGH |
| Mobile screen-reader support is an Intermediate guideline; menu screen-reader support is Advanced | same (subagent) | MEDIUM |

### 12.3 Engine caveats for screen readers (all subagent-fetched, MEDIUM; not my own re-read)

- Unity 6 Assistive Support API: iOS 13+ VoiceOver and Android 8+ TalkBack; the app must build the accessibility hierarchy and notify the reader of changes (https://docs.unity3d.com/6000.0/Documentation/Manual/mobile-accessibility.html). BitLife's reported failure traced to a Unity plug-in (section 12.1) is a warning that engine-level accessibility can regress with OS releases (MEDIUM).
- Godot 4.5: screen-reader support via AccessKit labelled experimental; mobile coverage unverified (https://godotengine.org/releases/4.5/).
- Flutter: `SemanticsService.announce` deprecated, use `Semantics` (https://api.flutter.dev/flutter/semantics/SemanticsService/announce.html) - HIGH per subagent; React Native `accessibilityLiveRegion` is Android only (https://reactnative.dev/docs/accessibility).
- The tech-stack file owns the engine decision; the constraint to pass along: a text-heavy game should render the feed with native accessibility nodes (live region for new year entries) rather than a canvas.

### 12.4 Design requirements (OPINION; rationale = the cited standards and the genre gap)

1. Native or fully-labelled UI for feed, choice buttons, stat bars; stat bars expose "Happiness 62 percent, down 5".
2. Feed announcements: each Age tap appends entries and announces them once (polite live region); the event card traps focus until a choice is made.
3. Swipe is always optional: every swipe choice has a visible button (HIG).
4. Settings group "Accessibility": text size slider (to at least 200%), high-contrast theme, dark/light/system, reduce motion (also follows system), haptics on/off, sound/music sliders, "skip text animation", color-vision-safe stat indicators (icon + number), confirm-before-irreversible.
5. Never convey stat change by color alone: arrow icon + signed number + color.
6. No timed choices in the core loop (HIG; Game Accessibility Guidelines "no precise timing").
7. Add an automated check to CI that every interactive element has a label and 48 dp / 44 pt target (OPINION; tooling owned by tech-stack file).
8. Complete the Nutrition Label honestly; do not claim "VoiceOver" unless all common tasks work with it (Apple's rule, MEDIUM-HIGH).

### 12.5 Photosensitivity

- Reigns: Her Majesty states "this game contains flickering images on rare occasions" in its store text (HIGH). HIG: be cautious with fast-moving and blinking animations (HIGH); GAG Basic: avoid flickering images. Rule for us (OPINION): no element flashes more than 3 times per second; confetti and screen shake are removable via Reduce Motion.

---

## 13. Content warnings, age rating and sensitive themes

| Fact | Source | Conf. |
|---|---|---|
| Apple's age-rating tiers are now 4+, 9+, 13+, 16+, 18+ (13+, 16+, 18+ added to 4+ and 9+); developers had to answer updated questions by January 31, 2026 | https://developer.apple.com/news/?id=ks775ehf (re-read) | HIGH |
| BitLife is 18+ on its App Store page with "Mature or Suggestive Themes" frequent and violence/drugs/profanity/nudity/simulated gambling infrequent (API `advisories` list) | https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536 ; https://itunes.apple.com/lookup?id=1374403536&country=us | HIGH |
| AltLife is 13+ on its page (mature themes, alcohol/drug references, sexual content, weapons listed) | https://apps.apple.com/us/app/altlife-life-simulator/id1567044511 | HIGH |
| Items that push to 18+ include frequent simulated gambling and "psychological trauma or abuse" under Mature/Suggestive Themes | https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions | MEDIUM (subagent) |
| Google Play requires an IARC content-rating questionnaire for new apps and significant content changes; misrepresentation may lead to removal; ratings differ by territory | https://support.google.com/googleplay/android-developer/answer/9859655 | MEDIUM-HIGH (subagent) |
| GAG Advanced: "Provide an option to disable blood and gore" | https://gameaccessibilityguidelines.com/full-list/ | HIGH |
| Samaritans media guidelines (avoid detailing novel suicide methods; include helpline info) are a reference for handling self-harm content; games-specific guidance (e.g. Take This) could not be fetched | https://www.samaritans.org/about-samaritans/media-guidelines/ | MEDIUM / unverified for games |
| Ads in a mature game reaching users: a BitLife thread asks "why there are so many sexual ads"; a review sample of "100 Years - Life Simulator" had users reporting ads inappropriate for children | https://reddit.com/r/BitLifeApp/comments/1ea7qfr/ ; iTunes RSS reviews id=1524755868 | MEDIUM |

### Recommendations (OPINION)

- A first-launch screen: age gate consistent with the store rating, themes list ("death, illness, abuse, addiction, crime, romance"), and a per-theme "soften or skip" toggle in Settings; Apple's guideline to "avoid stereotypes" and respect for the player's identity applies to the toggles' wording.
- Death/suicide/abuse events get a short content tag on the card ("Contains: death of a family member") shown before the choice, and a one-tap "skip this kind of event" control.
- Crisis resources link in Settings and on any card tagged self-harm; region-appropriate numbers (list needs legal review; unverified).
- Make sure the ad/store configuration (if any) matches our age rating; the BitLife/100 Years threads are evidence of the mismatch risk (MEDIUM).

---

## 14. Dark mode, localization, RTL, tablet/foldable and one-handed layouts

### 14.1 Dark mode and contrast

- HIG: check minimum contrast in both light and dark appearances; prefer system colors that adapt; Nutrition Label includes "Dark Interface" (HIGH/MEDIUM above).
- AltLife ships a dark UI (viewed). BitLife's light-card UI plus a historically paywalled dark mode drew complaints (section 12.1).
- OLED true-black and battery claims: unverified (no source).
- Recommendation (OPINION): ship light, dark and system from day one, free; test stat colors in both (red/green on dark has different perceived contrast).

### 14.2 Localization

| Fact | Source | Conf. |
|---|---|---|
| English-to-European expansion by source length (IBM data via W3C): up to 10 chars 200-300%; 11-20 180-200%; 21-30 160-180%; 31-50 140-160%; 51-70 151-170%; over 70 about 130% | https://www.w3.org/International/articles/article-text-size.en.html (re-fetched) | HIGH |
| German compounds may not wrap automatically; Thai/Arabic/Chinese may need around 150% vertical space | same (subagent) | MEDIUM |
| RTL: use logical start/end; Android `supportsRtl`; `BidiFormatter.unicodeWrap()` for inserted LTR names | https://developer.android.com/training/basics/supporting-devices/languages | MEDIUM-HIGH (subagent) |
| Apple: mirror navigation/controls in RTL, not numbers or media controls | https://developer.apple.com/design/human-interface-guidelines/right-to-left | MEDIUM |
| ICU MessageFormat: nest `plural` inside `select` (gender) and write full sentences in each branch; Fluent supports per-language grammar | https://unicode-org.github.io/icu/userguide/format_parse/messages/ ; https://projectfluent.org/ | MEDIUM-HIGH (subagent) |
| Store language counts: BitLife 5 (EN FR DE PT ES); Sims FreePlay 12; Reigns Her Majesty 12; ZEPETO 15 incl. Arabic, Thai, Vietnamese, Indonesian, Turkish | iTunes lookup/search (section 1) | HIGH |
| BitLife users request more languages / missing countries (a review notes a missing country in the country list; a review requests Korean) | https://itunes.apple.com/us/rss/customerreviews/page=1/id=1374403536/sortby=mostrecent/json | LOW-MEDIUM (subagent, single reviews) |
| Per-app language on Android 13+ via `LocaleManager`/`localeConfig` | developer.android.com languages page | MEDIUM-HIGH |
| Vietnamese diacritics line-height numbers; they/them and age-based grammar handling in life sims | none found | unverified |

Recommendations (OPINION):
- Lay out for 200-300% expansion on button labels under 10 characters (W3C/IBM table above); test with pseudo-localization before real translations arrive.
- Generate event text from structured templates with ICU/Fluent grammar slots (name, pronoun set, relation, plural), never string concatenation; this is the single biggest localization risk for a procedural life sim (reasoned from sources above; MEDIUM).
- Start with the languages of the target markets chosen by the product owner; ZEPETO's 15 and Sims FreePlay's 12 are the competitive benchmark, BitLife's 5 is the floor.
- Budget RTL as a layout mode from day one (logical properties), even if Arabic ships later.

### 14.3 Tablet, foldable, one-handed

| Fact | Source | Conf. |
|---|---|---|
| Window size classes (dp): width compact <600, medium 600-840, expanded 840-1200, large 1200-1600, extra-large >=1600; height compact <480, medium 480-900, expanded >=900; classes track the window, not the device | https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes (re-fetched) | HIGH |
| Canonical large-screen layouts: list-detail, feed, supporting pane | https://developer.android.com/guide/topics/large-screens/get-started-with-large-screens | MEDIUM (subagent) |
| Foldables: use `FoldingFeature` state/orientation/`isSeparating`; avoid controls near the fold; tabletop = horizontal hinge, book = vertical | https://developer.android.com/develop/ui/compose/layouts/adaptive/foldables/make-your-app-fold-aware | MEDIUM (subagent) |
| Android 16 (target API 36): orientation, resizability and aspect-ratio restrictions no longer apply on displays with smallest width >= 600dp | https://developer.android.com/about/versions/16/behavior-changes-16 (re-read; whether games are exempt: unverified) | HIGH (rule) / unverified (game exemption) |
| Hoober field study (1,300+ people): 49% one-handed, 36% cradled, 15% two-handed; thumbs drive 75% of interactions; people change grips frequently | https://alistapart.com/article/how-we-hold-our-gadgets/ (re-read) | HIGH (2013 data) |
| HIG: dynamic layouts over fixed; menus must adapt to aspect ratios; safe areas | designing-for-games JSON | HIGH |

Recommendations (OPINION):
- Treat the phone layout as the compact class; at medium and above, cap the feed column near 600-700 dp (about 60-70 characters at 17 pt; derived from section 5) and use a **list-detail** layout (feed left, profile/relationships right) at expanded width.
- At large widths do not stretch the choice buttons full width; keep them in the content column.
- On foldables in half-open posture, put the feed above the fold and choices below (the half-open "tabletop" posture is described in the Android doc); verify on a device (unverified).
- One-handed: primary actions in the bottom third, secondary in menus reachable by the bottom nav; the thumb data is from 2013 and phones are larger now, so treat as direction, not spec (MEDIUM).

---

## 15. Share cards and shareable screenshots

### Evidence

| Fact | Source | Conf. |
|---|---|---|
| BitLife's death screen is itself a share-shaped artifact: tombstone with name, age at death, date, net worth, residence, career, education, children, lovers, two stat bars, epitaph, "Famous" ribbon | App Store screenshot 7 (viewed, marketing composite) | HIGH (visual) |
| Death options in BitLife (share, journal, bulldoze, continue) and a cemetery of past lives | Fandom wiki snippet only (page returned 402) | LOW-MEDIUM |
| BitLife has a QR-code character-sharing feature tied to a Valentine's Day event | https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536 (subagent read) | MEDIUM |
| Wordle's emoji grid was invented by a player (Elizabeth S), not the developer: "came up with the emoji grid as a spoiler-free way of sharing her results" | https://slate.com/culture/2022/01/wordle-game-creator-wardle-twitter-scores-strategy-stats.html (re-read) | HIGH |
| Wordle deliberately shipped no link in the share text: "They were sharing for themselves" | same (re-read) | HIGH |
| The once-per-day shared puzzle mattered to spread | https://techcrunch.com/2022/01/12/josh-wardle-interview-wordle/ | MEDIUM-HIGH (subagent) |
| Spotify Wrapped requires minimum listening (30 songs, 30 s each, 5 artists) so the summary feels personal; added in-app sharing and speed controls | https://newsroom.spotify.com/2025-12-03/2025-wrapped-user-experience/ | MEDIUM-HIGH (subagent) |
| Instagram Stories sharing: background asset recommended ratio 9:16 or 9:18, minimum 720x1280, JPG/PNG; Android intent `com.instagram.share.ADD_TO_STORY` with `source_application` = your Facebook App ID and a content URI | https://developers.facebook.com/docs/instagram-platform/sharing-to-stories/ (re-read via regex; page returned in Vietnamese but the technical values match) | HIGH |
| Android share: `Intent.ACTION_SEND` with `createChooser`, images via `FileProvider` + `FLAG_GRANT_READ_URI_PERMISSION` | https://developer.android.com/training/sharing/send | MEDIUM-HIGH (subagent) |
| BitLife challenge content on TikTok (billionaire/millionaire/"massive gains") exists | https://www.tiktok.com/tag/bitlifemillionaire (listing; no view counts) | LOW-MEDIUM |
| iOS UIActivityViewController specifics; 1:1 and 4:5 feed ratios; watermark/deep-link practice; PII risks in share cards | none fetched | unverified |

### Recommendations (OPINION)

- **Two artifacts from the same data**: (1) a 1080x1920 (9:16) end-of-life card that exceeds Instagram's 720x1280 minimum; (2) a text "life receipt" (emoji lines) for chat apps, Wordle-style, with no link by default (Wardle's reasoning that it feels less promotional; MEDIUM transfer to our case).
- Card content must be unique per life: a rendered avatar at age stages, name, years, one-line epitaph generated from the life's most surprising event, 3 stats, "cause of death" line, and a rarity chip ("1 in N lives"; needs backend; flag for system-design file).
- Enforce Spotify's lesson: do not offer sharing for a life that ended before it had enough content (e.g. under about 10 notable events) (OPINION).
- Strip personal data: only the character's fictional name (not the player's account), no device identifiers; offer "hide name" (OPINION; no source on privacy norms).
- Render the card from the avatar seed and event log (section 9) so every size is generated, not stored.
- Accessibility: the share image needs alt text composed from the same data when shared via the OS sheet (OPINION).

---

## 16. Common UX complaints (what players actually say)

All counts are from 50-review samples pulled from Apple's RSS feed on 2026-10-06 and filtered with crude keyword regexes by me, so they are directional only (MEDIUM-LOW). Reigns' sample is old (latest entry 2025-11-27).

| Game | Reviews sampled / latest | "ad/advert" | money/price/purchase | lost/save/restore | accessibility words |
|---|---|---|---|---|---|
| BitLife | 50 / 2026-10-04 | 5 | 19 | 5 | 1 |
| Sims FreePlay | 50 / 2026-10-04 | 0 | 11 | 5 | 0 |
| Reigns: Her Majesty | 50 / 2025-11-27 | 0 | 4 | 3 | 1 |

(Source for counts: https://itunes.apple.com/us/rss/customerreviews/page=1/id={1374403536|466965151|1171040772}/sortby=mostrecent/json. The subagent produced different category counts using a summarizer; I use my own regex counts. Neither is a statistical study.)

### Themes with sources

| Complaint | Evidence | Conf. |
|---|---|---|
| Monetization UI on the gameplay screen and at launch (BitPass, expansion packs, community entries) | r/BitLifeApp "Please remove from the gameplay screen" (about 160 points, Jan 2026) and its comments, read by me: paying users say they still see popups | HIGH |
| Ads even after paying for ad removal ("Bitizen doesn't stop Bitlife's ads") | r/BitLifeApp ID 1ot2c7e title/top comment (subagent) | MEDIUM |
| Ad wall to refresh asset lists (cars/houses): "a list of only 20 cars or houses and if you want to change it you have to make a refresh and watch an Ad" | r/BitLifeApp 1ct6zvh (2024), I read the post text | HIGH |
| Price inflation / "greedy" sentiment: threads with about 1,900 and about 680 points in late 2025 | r/BitLifeApp 1oqi3ep, 1p8ausf (subagent titles/scores) | MEDIUM |
| Lost saves and restore-purchases failures | r/BitLifeApp qq67m3, tc2twi, 1oxkf2c (subagent) | MEDIUM |
| Performance/removal of "Power User" setting made the game slow (2022 update) | comments under t334h8 (read by me) | MEDIUM |
| Sims FreePlay: 12-hour quest timers, grind, lost progress after a server shutdown | iTunes RSS reviews id=466965151 (subagent summary) | MEDIUM |
| Reigns: repetitiveness; wants variety updates | iTunes RSS id=1171040772 (subagent) | MEDIUM |
| Sims Mobile: shallow engagement because events finish themselves; choices do not change outcomes | https://mobilefreetoplay.com/deconstructing-sims-mobile/ (and subagent: "relationships progress identically whether cooking, watching TV, or chatting") | MEDIUM-HIGH |
| Accessibility regression (VoiceOver, dark mode paywall) | section 12.1 | HIGH/MEDIUM |

Pattern (MEDIUM): the loudest complaints are monetization intrusions, save loss and accessibility regressions rather than core-loop design; the Sims-type complaints are timers and grind. The monetization file owns the first; our UX slice should make the other three cheap to avoid (autosave, no timers, accessibility tests).

---

## 17. Annotated ASCII wireframes (our proposals - OPINION)

Frame = 390 x 844 pt portrait; each text column below is about 38 chars wide. Targets are at least 44 pt / 48 dp. Safe-area insets reserved at top and bottom. Everything in these wireframes is a design proposal, not a copy of any shipped screen.

### 17.1 Home / Timeline (the core loop)

```
+--------------------------------------+
| (safe area)                          |
| [av] Maya Tran            $12,450  [=]|  <- A: header 56pt: avatar, name,
|      Teacher, age 28      balance      |     job, money, menu. Tap name -> Profile
+--------------------------------------+
| (H) Health  ####------ 62  -5 v      |  <- B: 4 stat chips, icon+bar+number
| (:) Mood    #######--- 71  +2 ^      |     +signed delta arrow (not color only)
| (B) Smarts  ######---- 58            |     tap = detail sheet
| (*) Social  #####----- 49            |
+--------------------------------------+
|  Childhood | Teen | [Adult] | Senior |  <- C: stage filter tabs (AltLife-style),
+--------------------------------------+     scrollable, 44pt high
| 2043 - Age 28                        |  <- D: year header, sticky
|  You were promoted to Lead Teacher.  |
|  Your brother Leo moved to Hanoi.    |  <- feed: body 17pt scalable to 200%,
|  You caught a cold.            (H -5)|     max ~40 words per year block,
|                                      |     stat chips inline when relevant
| 2042 - Age 27                        |
|  ...                                 |
|                                      |
+--------------------------------------+
|                                      |
|        [      AGE +1 YEAR      ]     |  <- E: primary button, bottom-center,
|                                      |     56pt tall, in thumb zone;
+--------------------------------------+     long-press = "skip to next event"
| [Career] [People] [Activities] [Assets]|  <- F: bottom nav 56pt, icon+label,
+--------------------------------------+     48dp targets, 4 items max
| (home indicator safe area)           |
+--------------------------------------+
```
Annotations:
- A/B: 5 persistent numbers (balance + 4 stats) - within the 4-6 budget (section 4). Reigns uses 4; AltLife uses 7 (viewed).
- C: AltLife's Childhood/Adulthood tabs are the visible precedent (screenshot viewed).
- E: BitLife's Age "+" is lower-middle per wiki snippet (MEDIUM); we make the label explicit for screen readers.
- Accessibility: feed is a polite live region; the AGE button announces "Age to 29" and the new entries; Reduce Motion replaces the year slide with a fade.

### 17.2 Event card (choice popup) with swipe plus buttons

```
+--------------------------------------+
|  (dimmed feed behind, tap-block)     |
|                                      |
|   +------------------------------+   |
|   | [Love]                  1 of 1|   |  <- A: category ribbon + icon;
|   |                              |   |     text label, not color only
|   |  (illustration, 16:9)        |   |
|   |                              |   |  <- B: optional art; skip under
|   |  First Date                  |   |     low-data setting
|   |  You are at the movies with  |   |
|   |  Noah. The lights go down.   |   |  <- C: <= 40 words
|   |  What will you do?           |   |
|   |                              |   |
|   |  < swipe: Kiss     Hold hands >|  |  <- D: optional Reigns-style drag;
|   |                              |   |     label appears on card while dragging
|   |  [ Go in for the kiss      ] |   |  <- E: always-present buttons
|   |  [ Hold hands              ] |   |     (HIG: swipe needs button alternative),
|   |  [ Pretend to check phone  ] |   |     each >= 48dp, 2-4 choices
|   |                              |   |
|   |  Contains: romance           |   |  <- F: content tag (section 13);
|   +------------------------------+   |     "Skip this kind of event" in menu
+--------------------------------------+
```
Annotations:
- Buttons stacked full width as in BitLife's event card (viewed screenshot 2); swipe layer D is optional and off for VoiceOver.
- Stat nudge preview: Reigns shows dots over meters before commit (visible in screenshot; whether size = magnitude is unverified), so we show small +/- chips beside choice text only when the outcome is predictable; hidden-consequence choices show none (design choice).
- No timer, no auto-dismiss (HIG).
- Resolve into an outcome card (same frame): result sentence + animated stat deltas + [Continue].

### 17.3 Character / Profile

```
+--------------------------------------+
| [<]   Maya Tran, 28          [Share] |
+--------------------------------------+
|        (avatar, bust, current age)   |
|   Teacher - Hanoi, Vietnam - Single  |
+--------------------------------------+
| [ Overview ][ Skills ][ Traits ][ Items ]|  <- A: segmented tabs (AltLife:
+--------------------------------------+     Profile/Skills/Inventory, viewed)
| Health   ####------ 62               |
| Mood     #######--- 71               |  <- B: all stats with number text
| Smarts   ######---- 58               |
| Social   #####----- 49               |
| Looks    #######--- 70               |
| Karma    ####------ 40               |
+--------------------------------------+
| Traits: Curious, Anxious, Generous   |  <- C: 2-5 trait chips; tap = what it does
| Education: B.A. Education            |
| Net worth: $48,200   Debt: $0       |
| Goals: [ ] Buy a home  [ ] Marry     |  <- D: optional player-set goals
+--------------------------------------+
| Life summary so far (tap to expand)  |  <- E: 5-line timeline of milestones
+--------------------------------------+
```
Annotations: stat bars always include numbers (AltLife precedent). Items tab uses a 3-column grid with a capacity pill like AltLife's "15 / 100" (viewed).

### 17.4 Relationships

```
+--------------------------------------+
| [<]  People                    [+ ]  |
+--------------------------------------+
| Family                               |
|  [av] Linh (Mother, 58)   Bond ###-  |  <- A: row 64pt: avatar, role+age,
|  [av] Leo (Brother, 31)   Bond ##--  |     bond meter + word ("Close")
| Partner                              |
|  [av] Noah (Partner, 29)  Bond ####  |
| Friends                              |
|  [av] Hana (Friend, 27)   Bond ##--  |
| Colleagues                           |
|  ...                                 |
+--------------------------------------+
        (tap a row -> bottom sheet)
+--------------------------------------+
|  Noah - Partner - age 29             |
|  Bond: Close (####)  Trust: ###-     |  <- B: sheet at 60% height
|  [ Spend time ]  [ Gift ]            |     actions are year-limited
|  [ Talk about future ]  [ Argue ]    |     (e.g. "2 of 3 actions left")
|  [ Break up ]                        |  <- C: destructive = confirm twice
+--------------------------------------+     (HIG)
```
Annotations: BitLife lists relationships by parents, siblings, partners (MEDIUM, wiki snippet); grouping by category is our choice. Bond is word + number + bar.

### 17.5 Birth / character creation (FTUE, 30-60 s)

```
+--------------------------------------+
|             Who will you be?         |
|                                      |
|          (avatar preview, baby)      |
|                                      |
|  Name   [ Maya Tran         ] [dice] |  <- A: pre-filled random name,
|                                      |     dice rerolls
|  Born in  ( Vietnam )( USA )( Brazil )|  <- B: chips; "More..." opens a list
|                                      |
|  Pronouns ( she )( he )( they )( ... ) |  <- C: pronouns separate from
|                                      |     appearance (HIG inclusion)
|  [ Customize look > ]  (optional)    |  <- D: collapsed by default
|                                      |
|  [        START LIFE (random)     ]  |  <- E: one-tap path; <= 3 taps total
|  [ Content settings ]                |  <- F: link to the warnings step
+--------------------------------------+
```
Annotations: BitLife offers Random vs Custom life with name/country/stats (MEDIUM, Playbite). We default to random with a visible dice, per HIG "great default settings" and "play as soon as installation completes". Appearance is a collapsed optional step; the avatar is deterministic from a seed (section 9). No account wall.

### 17.6 End-of-life summary and share card

```
+--------------------------------------+
|           Maya Tran, 1999 - 2086     |  <- A: obituary header (BitLife
|           Age 87 - Teacher           |     tombstone has the same facts,
|   (avatar strip: baby child adult elder)|    viewed)
|                                      |
|  "She taught three generations to    |  <- B: generated epitaph from the
|   love maps, and never found her     |     life's most unusual events
|   umbrella."                         |
|                                      |
|  Net worth   $184,300                |
|  Children    2   Grandchildren 5     |
|  Career      Teacher -> Principal    |
|  Peak moment Won the regional prize  |
|  Happiness   ######---- 64           |
|  Cause       Peaceful, in sleep      |  <- C: facts; no graphic detail
|                                      |
|  [ SHARE CARD ]  [ Text receipt ]    |  <- D: both share forms (section 15)
|  [ Play as Leo, her son ]            |  <- E: legacy continuation (optional)
|  [ New life ]                        |
+--------------------------------------+

Share card (rendered image, 1080 x 1920, 9:16):
+--------------------------------------+
| (themed background by life tone)     |
|  MAYA TRAN  1999 - 2086              |
|  [avatar: age strip]                 |
|  "She taught three generations ..."  |
|  87 yrs | $184k | 2 kids | 5 peak    |
|  Rarity: 1 in 340 lives  (optional)  |
|  (small app logo, no link by default)|
+--------------------------------------+
```
Annotations: tombstone data fields mirror what BitLife's screen shows (viewed screenshot 7). Rarity needs a backend (owned by system-design). Content tag handling: if death involved sensitive content, the card uses the neutral epitaph only (OPINION).

---

## 18. Coverage, gaps and verification log

### What was verified by me directly in this session
- App Store metadata and screenshots for BitLife, AltLife, Alter Ego (Choose Multiple), Reigns: Her Majesty, FreePlay, ZEPETO, Life Sim 3D via iTunes lookup/search API; 18 screenshots viewed.
- Apple HIG pages (Accessibility, Playing haptics, Notifications, Designing for games, Inclusion) read from Apple's JSON data files, because the HTML pages render only a title for the fetch tool.
- Re-checked by regex or re-fetch: Android haptics principles, Android notification permission, WCAG 1.4.8, Android window size classes, Android 16 behavior change, Hoober (A List Apart), W3C text expansion, GameAnalytics 2026 benchmark, Slate Wordle interview, Florence/Neo Cab/TOEM facts, iOS audio-session table, AppleVis BitLife thread, Apple age-rating news, Instagram Stories sharing doc.
- Reddit: read the "remove from gameplay screen" thread, the "refresh with ad" post, the "Blind People ... Bitlife" thread, and the r/Blind accessible-games thread.

### Corrections made to subagent output
- TOEM: subagent said "8 team members"; the postmortem says 2 developers. Corrected in section 8.
- Subagent's review-category counts disagreed with my own regex pass; section 16 uses mine and says so.

### Gaps (not covered or only weakly covered)
1. No primary source for BitLife's current (2026) bottom navigation, settings screen, or death-screen share flow (Fandom returned 402; marketing screenshots only).
2. GDC/Game UX Summit coverage is thin: only the Reigns 2017 talk abstract was read; no content from "Juice it or lose it", Game UX Summit, or Sims FreePlay GCAP 2025 (Screenhub returned 403).
3. No cost data for pixel art or any per-asset price; section 8's ranking is OPINION/LOW.
4. No evidence on typewriter-reveal effects, number tick-up, confetti, or haptics in Reigns/Wordle.
5. No source for adaptive-music or stinger practice in text games; FMOD/Wwise mobile guidance unfetched.
6. Notification opt-in statistics come from aggregators (MEDIUM/LOW); no life-sim-specific notification study; no source for BitLife's actual notification strategy.
7. Localization: no source on gender/pronoun grammar practice in life sims; no per-language expansion for Finnish/Russian/Vietnamese.
8. "Alter Ego" ambiguity: the App Store listing (Choose Multiple LLC, classic 1986 port) and the Google Play listing (com.playalterego.android) may be different products; I could not confirm which one the brief means.
9. Zepeto internals, Sims Mobile screens, Sims FreePlay screens were not examined beyond store art and secondary text.
10. WebSearch hit its per-session limit (200) during this research; later steps used direct fetches and APIs only.
11. Marketing screenshots are not guaranteed to show the live UI.

### Primary references used (by area)
- Apple HIG (games, accessibility, haptics, notifications, inclusion): https://developer.apple.com/design/human-interface-guidelines/
- Android accessibility/haptics/large screens: https://developer.android.com/ (pages cited inline)
- Game Accessibility Guidelines: https://gameaccessibilityguidelines.com/full-list/
- GDC Vault Reigns talk: https://www.gdcvault.com/play/1024278/The-Casual-(but-Regal)-Swipe
- Mobile F2P Sims Mobile teardown: https://mobilefreetoplay.com/deconstructing-sims-mobile/
- GameAnalytics 2026 benchmarks: https://www.gameanalytics.com/reports/2026-mobile-pc-gaming-benchmarks

---

## 19. Implications for our mobile life-sim game

Each bullet is OPINION unless a source is cited; the rationale cites the section above.

1. **Core screen = year-turn feed plus a single bottom-center Age button, with 4-6 always-visible numbers.** BitLife and AltLife converge on this (sections 2.1, 2.2); Reigns shows 4 meters suffice (2.4); thumb-zone evidence supports bottom placement (4).
2. **Make choices a stacked-button card; add optional swipe, never swipe-only.** BitLife's card uses stacked buttons (viewed); Reigns proves swipe speed ("a hundred decisions in five minutes", HIGH) but Apple requires a button alternative to gestures (HIG, HIGH).
3. **Accessibility is a differentiator, not a checkbox.** BitLife's VoiceOver broke in 2026 and its dark mode was once paywalled (12.1); plan native/labelled UI, live-region feed, 200% text, Reduce Motion, dark mode free, and test with VoiceOver and TalkBack every release (12.4).
4. **Never encode stat change in color alone.** Pair icon + number + signed delta (HIG, GAG Basic; 12.2). AltLife already prints numbers inside bars (viewed).
5. **Target 1-5 minute sessions built from 10-40 second year-turns, with autosave every tap and zero timers/energy.** Median session is 3.1-3.5 minutes (HIGH); AltLife markets "no timers" (HIGH); Sims Mobile's self-playing events produced shallow engagement (MEDIUM) (11).
6. **First 60 seconds: one-tap Random life, optional customization, no account, notification prompt deferred.** Apple HIG and Android both say defer permission requests and let people start playing (HIGH) (10, 11).
7. **Layered 2D paperdoll avatars, deterministic from a seed, with per-age-stage layer sets.** Cheapest path to unique faces and visible aging; the 3D alternatives weigh 0.9-2.6 GB (HIGH) and small teams shipped 2D (Florence, Neo Cab) (8, 9). Cost ranking is LOW confidence; prototype before committing.
8. **Choose the art style once.** Bitmoji's 2D-to-3D switch drew complaints (MEDIUM) and Florence abandoned 3D deliberately for clarity (HIGH) (8, 9).
9. **Sound = 3-4 life-stage loops plus a fixed stinger vocabulary, and the same cue always means the same thing.** Apple's rule for haptics (consistency, complement visuals, optional; HIGH) is the model; default audio session respects the silent switch (iOS Ambient, HIGH facts, design OPINION) (6, 7).
10. **Haptics: short, sparse, optional, mapped to event classes**; Android guidance says to prefer none over buzzy and to test on real devices (HIGH/MEDIUM) (6).
11. **Share the end of life, not the app.** Build a 9:16 (1080x1920) generated card plus a no-link text receipt; Wordle's grid came from players and shipped without a link (HIGH); gate sharing behind enough content, as Wrapped does (MEDIUM) (15).
12. **Content warnings and theme toggles from day one.** BitLife is 18+ with frequent mature themes (HIGH); Apple now has 13+/16+/18+ tiers and required re-answers by 2026-01-31 (HIGH); GAG suggests optional gore disabling (HIGH). Tag sensitive events before the choice and allow "skip this kind" (13).
13. **Procedural text must use grammar-aware templates (ICU/Fluent), not string concatenation**, and layouts must absorb 200-300% expansion on short labels and RTL mirroring (HIGH for expansion table; MEDIUM for ICU/Fluent guidance) (14.2).
14. **Do not put store/monetization UI on the gameplay screen or at launch.** The loudest BitLife community complaints concern popups (HIGH thread), ads after paying (MEDIUM), and lost saves (MEDIUM) (16); coordinate with the monetization file.
15. **Use window-size-class layouts from the start**: phone = single feed; medium+ = capped-width feed column with list-detail (feed + profile); do not full-width stretch buttons; keep content away from fold when separating (HIGH classes, MEDIUM foldable guidance) (14.3).

