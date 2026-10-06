# 10 - Technology & Production for a Mobile Life Sim

Research date: 2026-10-06. Slice owner: TECHNOLOGY & PRODUCTION. Scope: engines/frameworks, architecture patterns, backend/analytics/LLM/privacy, CI/CD, testing, content tooling, team/timeline.

## 0. How to read this file

- Confidence labels: **HIGH** = read on a primary page this session. **MEDIUM** = from a secondary page, or inferred from HIGH facts. **LOW** = web-search snippet only (page not opened), or weak evidence. **OPINION** = my recommendation, with rationale. **unverified** = not confirmed this session; do not rely on it.
- Citations use `[S#]`. Each ID maps to a URL in section 14 (Sources). A claim with no `[S#]` is OPINION or derived arithmetic (the derivation is shown).
- Method limit: the WebSearch budget was exhausted mid-session (200/200 calls). Some topics were therefore verified only through direct page fetches. Section 13 lists every gap.
- Nothing here is a final stack decision. Stack choices are proposals (section 12).

---

## 1. Version snapshot (checked 2026-10-06)

| Tech | Current (as of today) | Evidence | Confidence |
|---|---|---|---|
| Godot | 4.7.2-stable (2026-08-18); 4.7.1 (07-14); 4.7 (06-18); 4.8 in dev (dev7 on 2026-09-29) | [S1] | HIGH |
| Godot support policy | 4.7 and 4.6 fully supported; 4.5 partial; ~4-month minor cycle | [S2] | HIGH |
| Unity | 6.6 released 2026-09-01 as a "Supported" (non-LTS) release; 6.3 LTS supported to Dec 2027; 6.0 LTS support ends Oct 2026; 6.7 is the next LTS (no date given) | [S3][S4] | HIGH |
| Unity pricing | Personal free up to $200k revenue+funding; Pro $2,310/seat/yr; Enterprise above $25M; Runtime Fee canceled 2024-09-12 | [S5] | HIGH |
| Flutter | 3.47 is the "current release" per docs; 3.44 shipped 2026-05-20 (Swift Package Manager default on iOS, Material/Cupertino frozen before moving to standalone packages) | [S6][S7] | HIGH (3.47 label); 3.47.6 / 2026-10-01 patch number is LOW (search snippet only) |
| React Native | 0.87 is latest per reactnative.dev/versions; New Architecture default since 0.76 (2024-10-23) | [S8][S11] | HIGH |
| Expo | SDK 57 (2026-06-30, RN 0.86, React 19.2); SDK 58 beta (RN 0.88 RC) | [S9][S10] | HIGH (57); LOW (58 beta, snippet) |
| Defold | 1.13.1 (Aug 2026 newsletter); free and open source; Lua | [S12][S13] | HIGH |
| Cocos Creator | 3.8.8 (2025-12-16) | [S15] | LOW (snippet) |
| fastlane | Maintained; MIT; docs built 2026-09-28 | [S63] | HIGH |

Release-churn implication (OPINION): Flutter freezing Material/Cupertino into packages [S7] and Expo shipping an SDK roughly every 3-4 months [S9] mean a framework upgrade lands about quarterly. Unity's LTS (6.3, to Dec 2027 [S3]) and Godot's 4-month cadence [S2] differ in how often you must upgrade. Pin a version at MVP and upgrade on a schedule.

---

## 2. Engine / framework comparison

Legend for cells: sourced facts carry `[S#]`; unlabeled judgments are OPINION.

| Dimension | Unity 6.x (C#) | Godot 4.7 (GDScript / C#) | Flutter 3.47 (Dart) | React Native 0.87 + Expo SDK 57 (TS; note SDK 57 ships RN 0.86, so pin versions together) | Native Swift + Kotlin | Capacitor (web in WebView) | Defold 1.13 (Lua) | Cocos Creator 3.8 | Unreal 5 |
|---|---|---|---|---|---|---|---|---|---|
| Fit for text/UI-heavy sim | Works; UI via uGUI/UI Toolkit, text-list UX is more effort than web/Flutter | Control nodes are capable; mobile list/scroll polish needs work | Strong: widget toolkit built for apps | Strong: native views, FlatList-style lists | Strongest per-platform UX, 2x work | Strong for text/CSS UI; WebView quality varies on low-end Android | Weak for rich UI (game GUI nodes) | Game-oriented UI | Poor fit (rule out) |
| Empty/minimal build size | Empty Unity 6 IL2CPP Android APK ~31.8 MB with stripping [S70]; older forum data: 20 MB APK / 62 MB installed [S74] | Standard template ~36 MB, Gradle build ~77 MB; some projects 100+ MB [S71] | iOS hello-world example 5.4 MB compressed [S6b] | unverified (no figure fetched) | Smallest | Small shell + web assets; unverified | "<2 MB" claimed [S14b]; adding AdMob extension raised arm64 APK from 5 MB to 12 MB [S14] | 8-15 MB APK for a typical 2D game [S15] | Large; unverified |
| iOS+Android parity | One codebase; SDK plugins mature | One codebase; Android export needs NDK r28b+ [S67] | One codebase | One codebase | Two codebases | One codebase | One codebase | One codebase | One codebase |
| Ad mediation SDKs | AppLovin MAX, LevelPlay, AdMob all have Unity plugins [S24][S19b] | MAX: official AppLovin plugin, Godot 4.x only [S19]; AdMob: community plugin (Poing Studios) [S21] | MAX plugin on pub.dev [S23]; LevelPlay Flutter plugin [S24]; AdMob: official `google_mobile_ads` (not fetched, unverified) | LevelPlay RN plugin [S24]; MAX RN module (npm) [S23b]; AdMob: community/RN lib (unverified) | First-party SDKs for everything | Community plugins (unverified) | AppLovin 2.0.0, LevelPlay, AdMob 4.2.1 extensions [S12] | unverified | MAX Unreal plugin exists (changelog page) [S23c] |
| IAP / subscription | Unity IAP (listed in UGS [S46]); RevenueCat Unity SDK (snippet: LOW [S25b]) | RevenueCat community plugin, Godot 4.7, iOS 15+/Android 7+, MIT, not official [S20] | RevenueCat Flutter SDK [S25] | RevenueCat RN SDK [S25] | StoreKit / Play Billing + RevenueCat iOS/Android [S25] | RevenueCat Capacitor SDK [S25] | Defold IAP extension (unverified) | unverified | unverified |
| Hot update / live content | Addressables + remote content; data/asset only [S69]; UGS Remote Config, CCD [S46] | Own PCK/JSON download (DIY) | Shorebird code push [S61]; data via CDN | EAS Update: JS, styles, images, translations; no native changes [S59] | App Store release for code; data via CDN | Appflow live updates still marketed, with a banner about "the future of Ionic's commercial products" [S18] | Live Update expanded for sounds, fonts, GUI, textures [S13] | unverified | Not applicable |
| Analytics/crash SDKs | Firebase Unity SDK (Analytics, Crashlytics, Remote Config, Auth, Firestore) [S47]; Sentry Unity [S64] | Sentry Godot [S64]; Firebase: no official SDK found (unverified) | Firebase Flutter (unverified, widely used); Sentry Flutter [S64] | Sentry RN + Expo [S64]; Firebase RN (unverified) | Firebase native | Firebase via plugins (unverified) | Extensions (unverified) | unverified | unverified |
| Dev velocity (OPINION) | High for game-feel, medium for app-style UI | High for small games; mobile SDK glue is the tax | High for UI; hot reload | High; shares TS with tooling | Lowest (2 stacks) | High if team is web | Medium (smaller ecosystem) | Medium | Low |
| Hiring (OPINION + survey) | C# is 27.8% of all SO respondents [S66]; Unity-specific count unverified | Small pool; GDScript is niche | Dart 5.9% [S66] | TypeScript 43.6% [S66] | Kotlin 10.8%, Swift 5.4% [S66] | Web pool (TypeScript 43.6%) [S66] | Small | Small (China-centric, unverified) | Large but console/PC skewed (unverified) |
| Licensing | Free <$200k; Pro $2,310/seat [S5] | MIT (unverified on page; widely known) | BSD (unverified) | MIT (unverified) | n/a | MIT (unverified); maintained by OutSystems [S17] | Free, open source [S13] | unverified | unverified, royalty model (not fetched) |

Notes:
- Godot C# on Android and iOS is documented as **experimental**; iOS simulator templates are x64 only [S68]. HIGH. GDScript has no such caveat in the same page. Practical consequence: if choosing Godot, plan on GDScript for the sim core, which removes the shared-core option with C# tooling.
- Flame is "purpose-built for game development, not general UI applications" [S16]. For a text/UI-heavy sim, use plain Flutter widgets, not Flame. OPINION, based on [S16].
- **Unreal: ruled out** (OPINION). Rationale: a text-and-card sim needs no 3D renderer; Unreal's packaged size and tooling overhead buy nothing here. I did not verify Unreal APK sizes (fetch returned no content), so the size claim is unverified; the rule-out rests on fit, not on size.
- Cocos and Defold are viable for tiny binaries but have the weakest rich-UI, SDK-parity, and hiring stories in this list. OPINION.
- 16 KB page-size: apps with native code that target API 35+ must support it by **2027-02-01** [S56]. Needs AGP 8.5.1+ and NDK r28+ (or linker flags) [S56]. Applies to every engine with native libraries (Unity, Godot, Flutter, RN, ad SDKs). HIGH.

---

## 3. What the reference games are known to use

| Game | Engine / stack evidence | Other evidence | Confidence |
|---|---|---|---|
| **BitLife** (Candywriter, Miami) | Candywriter's mobile job posting asks for a "Unity Developer" with "2D UI implementation in Unity", names BitLife as a product [S28]. The posting is undated, and it does not say BitLife is built in Unity; it is strong circumstantial evidence. | iOS launch 2018-09-29, Android 2019-02-04 [S30]. Current iOS build: v3.25.1, 384.1 MB, iOS 15+, 18+ rating, 1.8M ratings [S27]. | MEDIUM (Unity); HIGH (size/rating) |
| BitLife SDK/vendor list (from privacy policy) | Ad networks: Bidmachine, AdColony, AppLovin, Meta, Google, HyprMX, InMobi, ironSource, Liftoff, Smaato, Tapjoy, Mistplay, Amazon Publisher Services, Chartboost, DT Exchange, Moloco, Verve, Pangle, Bigo Ads, Gadsmes, Smadex. UA: Reddit, Snapchat, TikTok, Unity, AdJoe, X, Smadex, Adikteev, Remerge. Analytics/attribution: AppsFlyer, Firebase, GameAnalytics, Looker, Embrace, CleverTap. Support/consent: Zendesk, Didomi. | [S26] | HIGH (that these vendors are named); MEDIUM (inference below) |
| Inference from BitLife list | A 20+ network list implies bidding mediation (MAX or LevelPlay class). Nothing on the page states which mediator. Crash/perf vendor is Embrace, not Crashlytics-only. CMP is Didomi, not UMP alone. | [S26] | MEDIUM |
| BitLife business (2019-2020) | Candywriter 2019 revenue ~USD 26M, ~59% EBIT margin; ~1.2M DAU, 7.8M MAU; 42M BitLife downloads at 2020-04-23 [S29]. | Share of revenue from ads (">62%") and "13 full-time employees" appear only in search snippets, not on the pages I opened | HIGH (revenue, DAU/MAU, downloads); LOW (62% ads, 13 FTE) |
| Derived: BitLife ARPDAU | $26M / 365 / 1.2M DAU = ~$0.059 per DAU per day. Mixes 2019 revenue with a 2020 DAU snapshot, so treat as rough. | Arithmetic on [S29] | MEDIUM |
| **The Sims Mobile** (EA) | Engine **unverified**: no opened source names it. Developers moved Maxis (2017-2019) -> Firemonkeys (2019-2020) -> Slingshot (2020-2026); global launch 2018-03-06; content freeze 2024-01-29; delisted 2025-10-21; servers off 2026-01-20 [S33]. An earlier search summary claiming "proprietary Firemonkeys engine" had no supporting source; discard it. | Free-to-play, energy gating, SimCash IAP; reported ~$50K/day across stores at the time of a deconstruction article [S34]. 3D, event/quest-driven live ops with Career/Hobby/Relationship story types [S34]. | HIGH (timeline); unverified (engine) |
| **Alter Ego** (modern mobile edition) | Published by Choose Multiple LLC; $4.99; 30.9 MB on iOS; 13+; 1,000+ multiple-choice questions; text-based; iOS 11+ [S35]. Original by Peter J. Favaro, 1986 [S35b]. Engine **unverified**. A secondary summary suggested ChoiceScript but the page itself did not say so; do not rely on it. | Useful benchmark: a complete text life sim can ship at ~31 MB. | HIGH (size/content count); unverified (engine) |
| **Reigns** (Nerial, Devolver) | Built in **Unity**; François Alliot as designer/programmer/writer, Mieko Murakami as artist; 2016 release on Android/iOS/desktop; ~2M copies by Aug 2019 [S31]. | Nerial closed (reported 2026-10-01); original Reigns ~$6.2M generated, Reigns: Game of Thrones ~$2.2M, Reigns: The Witcher $191K; ~8 people affected [S32]. | HIGH (Unity, team, sales); MEDIUM (closure figures: secondary press) |

Takeaways (OPINION, derived from the table):
1. The two strongest sourced mobile life/card-sim data points (BitLife circumstantial, Reigns explicit) are Unity. The weak evidence base (engine unverified for Sims Mobile and Alter Ego) means "what top games use" is **not** strong evidence for or against any other stack.
2. BitLife's ad-vendor list [S26] shows revenue depends on a deep ad-demand stack, so SDK parity matters more than UI elegance for the monetization path.
3. A 384 MB BitLife [S27] vs a 30.9 MB Alter Ego [S35] shows size is a content/asset decision, not an engine constraint.

---

## 4. Architecture patterns

### 4.1 Layering rule (Functional Core, Imperative Shell)

- **Sim core**: pure functions, no engine/UI/I/O imports. `step(state, input, content, rng) -> (state', outputs, rng')`. Runs headless in CI and in a CLI for Monte Carlo. OPINION.
- **Shell**: UI, ads, IAP, analytics, consent, save/cloud. Calls the core; never mutates core state directly.
- Why: the core is the part you test 100,000x, port, and keep for years. The shell is the part that changes with every SDK/policy deadline (section 9). The cost of swapping engines drops to rewriting the shell.

### 4.2 Data-driven content with a condition DSL

Options for expressing conditions/effects as data:

| Option | Key properties | Source | Fit |
|---|---|---|---|
| **JsonLogic** | Serializable JSON; "no setters, no loops, no functions or gotos... no side effects and deterministic computation time"; no `eval()`; parsers for JavaScript, PHP, Python, Ruby, Go, Java, .NET, C++ | [S36] HIGH | Good: tiny, safe, data-only. No Dart/Swift/Kotlin parser listed on the page (community ports unverified). |
| **CEL** (Common Expression Language) | Linear-time evaluation, mutation-free, not Turing-complete; implementations listed: Go, C++, Java | [S37] HIGH | Strong semantics, but no mobile-runtime implementations listed on the page. Unverified for Dart/JS/C#. |
| **Custom mini-grammar** (`age >= 18 && stat.money < 1000`) compiled at content-build time | Writers read it easily; you own the parser; one grammar, one test suite | OPINION | Best writer ergonomics; highest build cost. |
| **ink** (inkle) | MIT; C# core, inkjs, community ports; Inky editor; compiled JSON; narrative-first | [S38] HIGH | Good for scripted multi-beat scenes (romance arcs, set pieces), not for weight/condition-driven random events. |
| **Yarn Spinner** | Unity, Godot (GDScript+C#), Unreal; VS Code tooling; built-in localization export/import | [S39] HIGH | Same fit as ink; no web/RN/Flutter runtime listed on the page. |

Recommendation (OPINION): events as plain JSON/YAML with **JsonLogic-style conditions and a closed effect vocabulary** (add, set, clamp, flag, queue, relationship ops). Use ink/Yarn only for authored set-piece scenes. Rationale: the closed vocabulary lets you validate content statically, and a non-Turing-complete DSL keeps downloaded content as **data**. App Store guideline 2.5.2 says apps "may not download, install, or execute code which introduces or changes features or functionality of the app" [S52]. Whether a downloaded condition tree counts as code is a policy-reading question; keeping it non-Turing-complete and declarative is the conservative position. **MEDIUM; confirm with Apple's text before relying on remote logic updates.**

### 4.3 Deterministic seeded simulation

- Store one 64-bit run seed per life. Derive **named RNG streams** (`hash(seed, "events")`, `hash(seed, "health")`, `hash(seed, "relationships")`) so adding a new event does not shift every downstream roll. OPINION.
- PCG is a small, fast, statistically strong RNG family with multiple streams, reproducibility and jump-ahead [S40] (HIGH). Implement the RNG inside the core (about 20 lines per language), never use engine RNG (`Random`, `Math.random`) in the core.
- Use integers or fixed-point for stat math in the core. Cross-platform floating-point reproducibility is a known hazard; this is general knowledge, not verified this session (OPINION).
- Benefits you get for free: share a seed ("play my life"), daily-challenge seeds, bug repro from `(seed, content_hash, choice_log)`, server-side verification of leaderboard runs by replay.
- Cost: a content change alters outcomes for old seeds. Pin `content_version` in the save and in shared seeds.

### 4.4 Save format, migration, cloud save, offline-first

- Save = **snapshot + schema_version + content_version + rng_state**, plus an optional choice log for replay/debug. Snapshot-first (not event-sourced-only) because a content update must not corrupt a live life. OPINION.
- Migration: one `migrate_vN_to_vN+1(save)` pure function per version, applied in order; keep fixture saves for every shipped version and test them in CI. OPINION.
- Local-first: the game works fully offline; sync is additive. OPINION.
- **Google Play Games Saved Games**: blob up to 3 MB, cover image up to 800 KB; requires PGS sign-in and enabling in Play Console; offline read/write that syncs later; guest mode progress is **not** saved/restored; recommends loading on start/resume and saving often; documents conflict handling [S41]. HIGH.
- iCloud/CloudKit: not verified this session. Cross-platform restore (Android -> iOS) needs your own account system (Firebase Auth/Supabase/PlayFab/Nakama), which triggers Apple's in-app account deletion requirement [S52] (guideline 5.1.1(v), HIGH).
- Cloud-save payload size is a non-issue for a life sim (OPINION: tens of KB), so the 3 MB cap [S41] is not a constraint.

### 4.5 Remote content and experiments

- **Content packs**: signed JSON bundles on a CDN (versioned, with manifest + hashes), loaded at launch, cached locally, falling back to the bundled pack. Works in every engine; no dependence on engine hot-update features. OPINION.
- **Remote config / A/B**: Firebase Remote Config, A/B Testing, Analytics and Crashlytics are free on both Spark and Blaze [S42] (HIGH). Unity has Remote Config and Game Overrides inside UGS [S46]. Firebase Unity SDK covers Remote Config on mobile [S47].
- Engine-specific OTA exists but only partly fits: EAS Update ships JS/styles/images/translations, not native code [S59]; Shorebird provides Flutter code push [S61]; Addressables moves assets, not code [S69]. Store policies still apply to what you ship [S59][S52].
- Release rule (OPINION): any content pack can be rolled back by flipping a Remote Config flag to the previous `content_version`.

### 4.6 Analytics: event taxonomy for a life sim (OPINION)

Keep a small, versioned taxonomy; every event carries `app_ver`, `content_ver`, `seed_id` (hashed), `age`, `life_index`.

| Event | Key params | Answers |
|---|---|---|
| `life_start` | country, difficulty, origin (new/share-seed/daily) | funnel entry, mode mix |
| `age_year` (sampled, or per decade) | age, stats bucket | pacing, where lives end |
| `event_shown` | event_id, weight_bucket | content coverage, dead events |
| `choice_made` | event_id, choice_id, ms_to_choose | choice balance, boredom |
| `life_end` | cause, age, score, run_length_s | retention loop, difficulty |
| `ad_shown` / `ad_reward` | placement, network, ILRD revenue | placement economics |
| `iap_view` / `iap_purchase` | sku, price, source_event | paywall conversion |
| `consent_result` | region, ump/att status | opt-in rates |
| `content_pack_load` | version, ms, fallback_used | OTA health |
| `error_*` | code, state hash | determinism/desync bugs |

Vendor options: Firebase (BitLife uses it [S26]), GameAnalytics (BitLife uses it [S26]; GameAnalytics docs list AnalyticsIQ/SegmentIQ/PipelineIQ [S65]), AppsFlyer for attribution (BitLife [S26]), Amplitude and Unity Analytics (Unity Analytics is listed in UGS [S46]; Amplitude: unverified this session).

### 4.7 Crash reporting and quality gates

- Google Play's bad-behavior thresholds (user-perceived): crash rate 1.09% overall, ANR 0.47% overall, 8% per device; exceeding them reduces visibility and shows store-listing warnings; memory/bitmap thresholds start affecting visibility from Feb 2027 [S57]. HIGH.
- Sentry has official SDKs for Unity, Godot, Flutter, React Native, Android, Apple [S64]. Firebase Crashlytics is free [S42]. BitLife uses Embrace [S26].
- Log the sim state hash and `(seed, content_ver)` with every crash so reports are replayable. OPINION.

### 4.8 Anti-cheat and server authority

- Single-player, offline-first: no server authority needed for core play. Cheating costs you nothing unless you add rankings or paid currency. OPINION.
- Where it matters: (a) IAP receipts - validate with RevenueCat or store APIs, not on-device [S25]; (b) leaderboards - verify by **replaying** `(seed, content_ver, choice_log)` on the server, which determinism (4.3) makes cheap; (c) rewarded-ad grants - trust the mediation SDK callback, accept some fraud.

### 4.9 Backend options

| Option | Free/entry terms | Strengths | Gaps | Source |
|---|---|---|---|---|
| **None** (static CDN + store services) | ~$0 | Simplest; fits offline-first | No cross-platform restore, no leaderboards | OPINION |
| **Firebase** | Spark: no card; Auth 50K MAU; Firestore 1 GiB, 50K reads/20K writes per day; Analytics, Crashlytics, Remote Config, A/B Testing, FCM free | One vendor for analytics+config+crash+auth+DB; SDKs for Unity/Flutter/RN/native; Firebase AI Logic for Gemini calls | Vendor lock-in; Godot SDK not found | [S42][S47][S48] HIGH |
| **Supabase** | Free: 50K MAU, 500 MB DB, 2 projects, pauses after 1 week inactivity; Pro $25/mo, 100K MAU | Postgres, SQL, row-level security | Free tier pausing is unsuitable for production; no mobile analytics/crash product | [S43] HIGH |
| **PlayFab** | Pricing not read | Player data, economy, live-service tools, experimentation; SDKs for Unity, Unreal, Cocos2d-x, C#/Java/JS | No Flutter/RN SDK listed on the hub page | [S44] HIGH (what it lists) |
| **Nakama** (Heroic Labs) | Apache-2.0 self-host; Heroic Cloud managed (pricing not read) | Leaderboards, friends, groups, chat, Go/TS/Lua runtime; SDKs for Unity, Unreal, Godot, Defold, Cocos2d-x, JS, C/C++, Java | You operate it (or pay); overbuilt for single-player | [S45] HIGH |
| **Unity Gaming Services** | Pricing not read | Auth, Cloud Save, Remote Config, Leaderboards, Economy, IAP, Analytics, CCD, Game Overrides in one place | Unity-only | [S46] HIGH |

Proposal (OPINION): launch with **no custom backend**: static CDN for content packs, Firebase (or UGS if Unity) for Remote Config, analytics and crash, RevenueCat for purchases. Add accounts + cloud save when retention data justifies it.

### 4.10 Social features (OPINION)

- **Share card**: render a "life summary" image on-device and hand it to the OS share sheet. No backend.
- **Seed deep-link**: `app://life?seed=...&content=...` lets a friend replay the same life (needs 4.3).
- **Daily seed + leaderboard**: needs a backend and replay verification (4.8). Defer past soft launch.
- Friends/chat: avoid at first; user-generated content triggers Apple guideline 1.2 (filtering, reporting, blocking, published contact info) [S52].

### 4.11 LLM-generated text: options, cost, risks

**Options**

| Route | Facts | Risk | Source |
|---|---|---|---|
| Cloud API via your own proxy | Claude Haiku 4.5: $1 in / $5 out per MTok; Sonnet 5.5: $2 / $10; Batch API -50%; cache reads 0.1x input | Per-player cost scales with play; latency; outages; moderation | [S49] HIGH |
| Cloud API called from the app via Firebase AI Logic (Gemini) | Android/iOS/Web/Flutter/Unity SDKs; App Check abuse protection; per-user rate limits; Gemini Developer API free tier | Locks to Gemini; free-tier limits not read | [S48] HIGH |
| On-device Android: Gemini Nano via ML Kit GenAI / AICore | Prompt API, rewriting, summarization; on-device, offline, no cloud cost; built-in safety filtering; device support list **not** on fetched page | Only AICore-capable devices; low-end Android likely excluded (unverified) | [S50] HIGH (features); unverified (device list) |
| On-device iOS: Apple Foundation Models | Swift API for on-device and Private Cloud Compute models, guided generation, tool calling; Small Business Program participants (<2M first-time downloads) get PCC use at no cloud API cost | Apple Intelligence hardware only (device list not on fetched page); Swift-only API means a native bridge in non-native stacks | [S51] HIGH (features) |
| Pre-generate offline (Batch) and ship as reviewed content | Batch is half price [S49]; human review possible | Not "dynamic" at play time | OPINION |

**Cost math (assumptions are mine)**: 800 input + 200 output tokens per call, no caching.
- Haiku 4.5: 800 x $1/M + 200 x $5/M = $0.0008 + $0.0010 = **$0.0018/call**; Batch: $0.0009. Sonnet 5.5: $0.0016 + $0.0020 = **$0.0036/call** [S49].
- 10 calls per DAU per day on Haiku = $0.018 per DAU-day. Against the rough BitLife-class ARPDAU of $0.059 (section 3), that is ~30% of revenue per active user. Under 3 calls per DAU-day keeps it under ~10%. Arithmetic on [S49] and [S29]; ARPDAU is MEDIUM.
- Newer models (Claude 4.7+) use a tokenizer that yields ~30% more tokens for the same text [S49]; recompute before choosing a model.

**Risks and mitigations (OPINION unless cited)**
1. **Policy**: Apple requires disclosure and explicit permission before sharing personal data with third-party AI (guideline 5.1.2(i)) [S52]. Google Play's AI-generated content policy bans, among others, "sexually gratifying generative AI apps" and requires apps to prevent offensive/prohibited content [S58]. A mature-themed life sim (BitLife is rated 18+ on iOS [S27]) sits close to those lines.
2. **Safety**: constrain the LLM to rewriting/flavoring a pre-authored event inside a JSON schema; never let it change state or invent choices; run a blocklist/classifier; log inputs/outputs.
3. **Determinism**: LLM output breaks replays. Cache by `(event_id, variant_hash, locale)` so a seed replays identically after first generation. This turns the LLM into a content generator, not a runtime dependency.
4. **Latency and offline**: always ship the authored text as fallback; prefetch the next 1-2 events.
5. **Cost spikes**: server-side rate limit per install, kill switch via Remote Config.
6. **Quality drift**: pin model IDs; re-run a text-quality test set on every model change.

### 4.12 Localisation pipeline

- Keys, not strings, in event data. Parameterized text with plural/gender rules (ICU-style; the standard is not verified this session, OPINION).
- Pipeline: source strings (en) -> export CSV/XLIFF/JSON -> translation vendor/tool -> import -> placeholder/length validator -> pack build. Yarn Spinner documents export strings / translate / import for its own content [S39].
- Evidence for "text must be data, not code": a Pocket Gamer report on the German BitLife launch (opening it returned 403; snippet only) says event text blocks were "hard coded into the game's development structure", making transcreation hard [S75]. LOW.
- Engine tooling for localization (Unity Localization, Flutter intl, i18next) was not verified this session.

### 4.13 CI/CD

| Tool | Facts | Source |
|---|---|---|
| **fastlane** | MIT; build, signing, screenshots, upload to TestFlight/App Store/Google Play; actively maintained (docs built 2026-09-28) | [S63] HIGH |
| **EAS (Expo)** | Free: 15 Android + 15 iOS builds, 1,000 update MAU, 60 CI minutes; Starter $19/mo ($45 build credit, 3,000 MAU); Production $199/mo (50,000 MAU); update MAU overage from $0.005/user | [S60] HIGH |
| **Codemagic** | Free: 500 macOS M2 minutes/mo; pay-as-you-go $0.095/min (M2), $0.114/min (M4), $0.045/min Linux/Windows; CodePush for RN $1 per 2,500 installs | [S62] HIGH |
| Unity Build Automation | Listed in UGS; terms not read | [S46] |

Required store toolchains (HIGH): iOS builds need Xcode 26 / SDK 26 since 2026-04-28 [S53]; Google Play new apps/updates must target API 36 from 2026-08-31 (extension to 2026-11-01 available via Play Console) [S55]. Both dates drive CI image updates.

### 4.14 Testing strategy (OPINION)

1. **Unit tests on the core** (pure functions): DSL evaluator, effect application, clamp rules.
2. **Golden/snapshot tests**: `(seed, content_hash, scripted choices) -> state hash`. A diff means content or logic changed outcomes.
3. **Monte Carlo balance runs**: 100k+ seeded lives headless in CI. Assert distributions (median age at death, wealth percentiles, % of lives reaching each career), event firing rates, absence of dead ends, and that no stat leaves bounds. Fail the build on drift beyond tolerance.
4. **Content lint**: schema validation, unreachable events, missing localisation keys, effect/condition referencing unknown variables, weight totals.
5. **Save-migration fixtures** for every released schema version (4.4).
6. **UI smoke tests** on a device farm; low-end Android profile included (section 8).

### 4.15 Content tooling for writers (OPINION)

- Writers author in Google Sheets/CSV or VS Code (YAML/ink/Yarn). A TypeScript CLI (runs under bun) validates, lints, runs a 10k-life smoke simulation, and emits the signed pack. Same CLI is the CI gate.
- Provide a "dry-run" web preview that loads the same pure core (easiest when the core is TypeScript/JS; with C#/Dart you need a second harness).
- Keep a content coverage report fed by Monte Carlo (events never fired, over-fired).

---

## 5. Team size and timeline estimates (OPINION, thin evidence)

Comparable anchors that were verified:

| Anchor | Fact | Source |
|---|---|---|
| Reigns (2016) | One designer/programmer/writer + one artist, Unity; later sold ~2M copies by Aug 2019 | [S31] HIGH |
| Alter Ego (modern) | 1,000+ multiple-choice questions, 30.9 MB | [S35] HIGH |
| BitLife | iOS 2018-09-29 -> Android 2019-02-04 (4+ months later); Android engineers hired afterward to close feature gaps | [S30] MEDIUM (HandWiki) |
| Narrative VN cost anchor | Rose Academy: ~1 year, $38,000 budget, 563 copies in 5 days. Postmortem by a solo dev on a different platform (Steam) and genre; shows revenue risk, not mobile ad economics | [S72] MEDIUM |
| Studio risk | Nerial (Reigns) closed after 13 years despite a successful franchise [S32] | MEDIUM |

I could not find or open a detailed postmortem for a comparable text life sim during the search budget. **Gap**: no verified dev-time/team postmortem for BitLife-class games. Estimates below are my own planning figures.

| Phase | Team (small) | Duration | Output | Notes |
|---|---|---|---|---|
| Prototype / vertical slice | 1 engineer + 1 designer-writer | 6-8 weeks | Core loop, ~60-100 events, 1 life, no monetization | Prove the sim core + content pipeline |
| MVP (internal alpha) | 1-2 engineers, 1 writer, part-time artist | 3-4 months | ~300-500 events, ages 0-90, save/load, ads+IAP wiring, analytics, consent | Content is the long pole, not code |
| Soft launch (select countries) | Same + part-time QA | +2-3 months | Retention/ARPDAU tuning, A/B tests, localization of top languages | Needs working CPI/retention dashboards |
| Live ops (steady state) | 1 engineer, 1-2 writers, part-time artist/QA | ongoing | Weekly/biweekly content packs, seasonal events | Content pack cadence beats binary cadence |

Risk drivers: ad SDK integration and consent flows (section 9) routinely take longer than the sim core (OPINION); App/Play review iterations; adult-content rating decisions.

---

## 6. Asset pipeline and cost (OPINION; cost figures unverified)

- Assets are small for a text sim: UI icons, avatars/portraits, backgrounds, SFX/music, store art. Size is a decision (Alter Ego 30.9 MB vs BitLife 384 MB; sections 3).
- Pipeline: vector/PSD -> atlas export -> engine-specific compression (ASTC on mobile is standard practice, not verified here). Keep portraits modular (layers: skin/hair/clothes) so combinatorial avatars do not multiply files.
- Cost: I have no verified price data for illustration/audio outsourcing. The only budget anchor in this file is the $38k visual-novel case [S72], which is a different genre/platform. Use quotes from vendors before budgeting.
- Distribution limits to check at release time: Play Asset Delivery / Addressables-style packs (Defold supports Play Assets Delivery [S13]); Android AAB size caps were not re-verified this session.

---

## 7. Performance on low-end Android (OPINION unless cited)

- A text/card UI is light; the risk is the *platform baseline* and SDK weight, not the game. Empty Unity IL2CPP Android APK ~31.8 MB [S70]; adding one Defold ad extension grew arm64 APK 5 MB -> 12 MB and AAB 3 MB -> 10 MB [S14]. Ad SDKs, not the engine, are often the largest line item.
- Targets: cold start < 3 s on a 2 GB RAM device; no per-frame animation on idle screens; virtualize long lists (life log); bitmap memory budget (Play will penalize memory/bitmap thresholds from Feb 2027 [S57]).
- Test matrix: at least one 2 GB / entry-level SoC device and one Android Go-class emulator profile; use Android vitals thresholds as release gates [S57]. Market-share data for low-end Android was not verified.
- 16 KB page-size support must be verified for every native lib including ad SDKs (deadline 2027-02-01) [S56].

---

## 8. Privacy, consent, platform requirements (dated)

| Item | Requirement | Source | Confidence |
|---|---|---|---|
| Google UMP SDK | Call `requestConsentInfoUpdate()` on every launch, `loadAndShowConsentFormIfRequired()`, then `canRequestAds()`; covers EEA, UK, Switzerland messages; `setDebugGeography()` for testing; API 21+ | [S54] | HIGH |
| Certified CMP for EEA/UK/CH ad serving | The UMP page did not state this; BitLife uses Didomi as its CMP [S26] | | unverified (the rule); HIGH (BitLife uses Didomi) |
| Apple ATT | Must receive explicit permission through ATT APIs to track | [S52] 5.1.2(i) | HIGH |
| Apple: third-party AI data | Disclose and obtain explicit permission before sharing personal data with third-party AI | [S52] 5.1.2(i) | HIGH |
| Apple: accounts | If you offer account creation, offer in-app account deletion | [S52] 5.1.1(v) | HIGH |
| Apple: Xcode/SDK | Xcode 26 / iOS 26 SDK required since 2026-04-28 | [S53] | HIGH |
| Apple: age rating | New age-rating system; questions must be answered in App Store Connect (deadline was 2026-01-31) | [S53] | HIGH |
| Apple: min OS target | iOS/iPadOS apps must target iOS 13 or later from 2026-09-09 (as summarized from the page) | [S53] | MEDIUM |
| Google Play: target API | New apps/updates target API 36 from 2026-08-31; extension to 2026-11-01 via Play Console | [S55] | HIGH |
| Google Play: ads declaration | Must declare ads, including those from third-party SDKs; misdeclaration can suspend the app | [S73] | HIGH |
| Google Play: 16 KB pages | Required for apps targeting API 35+ with native code by 2027-02-01 | [S56] | HIGH |
| Google Play: AI content | Generative-AI apps must prevent offensive/prohibited content; explicit bans listed | [S58] | HIGH |

Adult-content note (OPINION): BitLife is rated 18+ on iOS [S27] while Alter Ego is 13+ [S35]. Content maturity shapes ad demand, consent copy, store rating answers, and whether child-directed programs apply. Decide the maturity target before integrating mediation.

---

## 9. Proposed reference architecture (ASCII) - PROPOSAL

```
                          CONTENT PIPELINE (build-time, CI)
 ┌─────────────┐   ┌──────────────┐   ┌───────────────┐   ┌───────────────────────┐
 │ Writers:    │──▶│ Validator    │──▶│ Monte Carlo   │──▶│ Signed content pack   │
 │ Sheets/YAML │   │ schema+lint  │   │ 10k lives gate│   │ (JSON + manifest)     │
 │ ink/Yarn    │   │ i18n keys    │   │ balance report│   └──────────┬────────────┘
 └─────────────┘   └──────────────┘   └───────────────┘              │ upload
                                                                     ▼
                                                           ┌──────────────────┐
                                                           │ CDN / static host │◀── Remote Config:
                                                           └────────┬─────────┘     active content_ver,
                                                                    │ HTTPS         kill switches
 ┌───────────────────────── MOBILE APP (offline-first) ─────────────┼───────────────────────────┐
 │                                                                   ▼                           │
 │  ┌──────────────┐  intents   ┌──────────────────────────┐   ┌─────────────┐                  │
 │  │  UI SHELL    │──────────▶ │   SIM CORE  (pure)       │◀──│ Content     │                  │
 │  │ screens,     │◀────────── │ step(state,input,content,│   │ store       │                  │
 │  │ lists, share │  view-model│        rng) -> state'    │   │ bundled +   │                  │
 │  └──────┬───────┘            │ DSL eval · effects · PCG │   │ downloaded  │                  │
 │         │                    └────────────┬─────────────┘   └─────────────┘                  │
 │         │                                 │ snapshot (schema_v, content_v, rng)              │
 │         │                    ┌────────────▼─────────────┐   ┌──────────────────────────┐     │
 │         │                    │ SAVE STORE (local file)  │──▶│ Cloud sync (optional):   │     │
 │         │                    │ + migrations             │   │ PGS Saved Games / iCloud │     │
 │         │                    └──────────────────────────┘   │ / Firebase Auth+Firestore│     │
 │         │                                                    └──────────────────────────┘     │
 │  ┌──────▼──────────────────────── SERVICES (shell only) ──────────────────────────────────┐   │
 │  │ Consent: UMP/CMP + ATT │ Ads mediation (MAX/LevelPlay) │ IAP: RevenueCat │ Analytics  │   │
 │  │ Crash: Crashlytics/Sentry │ Remote Config/A-B │ optional LLM gateway client            │   │
 │  └──────────────────────────────────────────────────────────────────────────────────────┘   │
 └────────────────────────────────────────────────────────────────────────────────────────────┘
                                      │ (optional, later)
                                      ▼
                     ┌────────────────────────────────────────────┐
                     │ Thin server: LLM proxy (rate limit, cache, │
                     │ safety filter) · leaderboard replay verify │
                     └────────────────────────────────────────────┘
```

---

## 10. Minimal event schema + condition DSL sketch (PROPOSAL)

### 10.1 Event (JSON; YAML equivalent for writers)

```json
{
  "schema": 1,
  "id": "career.job_offer.first",
  "tags": ["career", "adult"],
  "weight": 3,
  "cooldown_years": 2,
  "once_per_life": false,
  "when": {
    "and": [
      { ">=": [{ "var": "age" }, 18] },
      { "<":  [{ "var": "age" }, 65] },
      { "!":  [{ "var": "flags.employed" }] },
      { ">=": [{ "var": "stats.smarts" }, 40] }
    ]
  },
  "text": "event.career.job_offer.first.body",
  "choices": [
    {
      "id": "accept",
      "label": "choice.career.job_offer.first.accept",
      "when": { "var": "flags.has_phone" },
      "effects": [
        { "op": "set_flag",  "flag": "employed", "value": true },
        { "op": "add",       "stat": "money",    "amount": 2000 },
        { "op": "add",       "stat": "happiness","amount": -5 },
        { "op": "queue",     "event": "career.first_day", "delay_years": 0 }
      ]
    },
    {
      "id": "decline",
      "label": "choice.career.job_offer.first.decline",
      "effects": [ { "op": "add", "stat": "happiness", "amount": 3 } ]
    }
  ],
  "random": [
    { "chance": 0.1, "when": { ">": [{ "var": "stats.looks" }, 70] },
      "effects": [ { "op": "add", "stat": "money", "amount": 500 } ] }
  ]
}
```

Design rules:
- `when` and `choices[].when` are JsonLogic [S36]: no loops, no side effects, bounded cost. Variables come from a closed, documented namespace (`age`, `stats.*`, `flags.*`, `rel.<role>.*`, `year`, `country`).
- `effects[].op` is a **closed vocabulary** (`add`, `set`, `clamp`, `set_flag`, `queue`, `spawn_npc`, `end_life`, ...). The validator rejects unknown ops/variables. This is what makes content a data update rather than a code update (see 4.2 policy note).
- All visible text is a **key** (`event.*.body`), never a literal; interpolation uses named placeholders (`{partner_name}`).
- `random[].chance` is rolled on the `events` RNG stream (4.3), never on engine RNG.

### 10.2 Core step (pseudocode)

```
step(state, input, content, rngStreams) -> { state', shown, rngStreams' }
  1. advance clock (age/year) deterministically
  2. candidates = content.events.filter(e => eval(e.when, state) && cooldownOk(e, state))
  3. pick = weightedPick(candidates, rngStreams.events)        // PCG stream "events"
  4. present(pick); on choice c: apply(c.effects, state) with clamps
  5. resolve c.random[] rolls on stream "events"
  6. return new immutable state + new rng positions
```

---

## 11. Engine fit summary for this game (OPINION)

- The game is: text and cards, list UIs, ad interstitial/rewarded placements, IAP, light animation, big content library, long live-ops tail.
- The sim core is engine-agnostic by design (4.1), so the engine mainly determines the shell: UI toolkit quality, ad/IAP SDK maturity, OTA story, build size, and who you can hire.

---

## 12. Implications for our mobile life-sim game

1. **Separate the sim core from the shell on day one.** A pure, seeded core makes the engine decision reversible and enables Monte Carlo balance tests, replay-verified leaderboards, shareable seeds, and cheap bug repro. HIGH value, OPINION.
2. **Content is the product; treat it as data.** JSON/YAML events with a JsonLogic-style condition DSL [S36] and a closed effect vocabulary; text as keys. Do not hard-code text (BitLife's German launch reportedly suffered from this [S75], LOW).
3. **Choose maturity first.** BitLife is 18+ [S27]; Alter Ego 13+ [S35]. Rating drives ad demand, consent, store forms, and AI-content policy exposure [S58]. Decide before wiring mediation.
4. **Ads are likely the main revenue path, so ad-SDK parity is a first-class engine criterion.** BitLife lists 20+ ad networks and attribution/analytics/CMP vendors [S26]. Unity has the broadest verified SDK coverage [S24][S19b][S47]; RN/Flutter have MAX/LevelPlay/RevenueCat plugins [S23][S24][S25]; Godot has an official MAX plugin but a community RevenueCat plugin [S19][S20].
5. **Start with no custom backend.** CDN content packs + Firebase free tier (Analytics, Crashlytics, Remote Config, A/B) [S42] + RevenueCat. Add accounts/cloud save/leaderboards later. Cloud save via PGS Saved Games costs nothing and is capped at 3 MB (plenty) [S41].
6. **Keep downloaded content declarative.** Apple 2.5.2 forbids downloaded code that changes functionality [S52]; a non-Turing-complete DSL (JsonLogic/CEL [S36][S37]) is the safest basis for remote content updates. Confirm the reading before launch (MEDIUM).
7. **LLM text: flavor, not logic.** Per-call cost is small ($0.0018 Haiku 4.5, [S49]) but 10 calls/DAU/day would be ~30% of a BitLife-class ARPDAU. Pre-generate in batch (-50%) or cache by event+variant; keep authored fallback; obey Apple 5.1.2(i) [S52] and Google's AI content policy [S58]. On-device models (Gemini Nano [S50], Apple Foundation Models [S51]) are free per call but device-limited and inconsistent across platforms.
8. **Plan platform deadlines into the calendar.** Target API 36 (extension to 2026-11-01) [S55]; Xcode 26 [S53]; 16 KB pages by 2027-02-01 [S56]; Android vitals memory thresholds from Feb 2027 [S57]; new Apple age-rating system [S53].
9. **Budget a quality gate from Android vitals**: crash 1.09% / ANR 0.47% bad-behavior thresholds [S57]. Add Sentry/Crashlytics from the first build [S64][S42].
10. **Content pack cadence beats binary cadence.** Live ops (weekly/biweekly events) should ship via CDN + Remote Config rollback flags, not store releases (4.5).
11. **Team plan (OPINION)**: 1-2 engineers + 1 writer + part-time artist for MVP in ~3-4 months; writers are the bottleneck. Verified anchor: Reigns was one programmer/designer/writer plus one artist [S31]. No verified life-sim postmortem was found (gap).
12. **Studio-risk reminder**: even Reigns' developer closed in Oct 2026 [S32]. Keep burn low and the core portable.

### Candidate stacks (PROPOSALS, not decisions)

| | **A. Unity 6.3 LTS (C#)** | **B. Expo/React Native + TypeScript core** | **C. Flutter (Dart), plain widgets (no Flame)** |
|---|---|---|---|
| Why | Closest to the reference-game evidence (Reigns explicit [S31], BitLife circumstantial [S28]); broadest verified ad/IAP/analytics SDK coverage (MAX, LevelPlay, AdMob, Unity IAP, Firebase Unity SDK) [S24][S46][S47] | One TypeScript codebase for app, content CLI, and web preview (fits the bun preference); JsonLogic has a JS implementation [S36]; EAS Update ships JS/translations OTA [S59]; RevenueCat/LevelPlay/MAX RN support [S25][S24][S23b] | Rich UI at small size; one codebase; MAX/LevelPlay/RevenueCat Flutter plugins [S23][S24][S25]; Shorebird for patches [S61] |
| Trade-offs | ~32 MB empty APK floor [S70]; list/text UI is more work than app frameworks; Unity version management (6.3 LTS to Dec 2027 [S3]); C# core cannot share code with a TS tooling CLI | Native ad SDK bridges can lag; JS engine startup on very low-end Android unmeasured (unverified); Expo SDK cadence ~quarterly [S9]; bridge issues possible with mediation adapters | Material/Cupertino being split into packages [S7]; Dart is 5.9% of SO respondents vs TypeScript 43.6% [S66]; JsonLogic parser for Dart not listed [S36]; core must be re-implemented for any tooling in JS |
| Choose if | Monetization via ads is the make-or-break and the team knows C#/Unity | Team is web/TypeScript-heavy and wants fastest content-tooling loop | Team knows Dart/Flutter and wants best UI polish per engineer |
| Biggest unknown | Cost of UI Toolkit/uGUI list-heavy screens | Real-world ad mediation SDK stability in RN | Ad SDK + consent flow polish in Flutter |

OPINION on ranking: if monetization risk dominates, A; if iteration speed and tooling dominate and the team is web-skilled, B; C is the middle path. Godot 4.7 is a credible fourth option (official MAX plugin [S19], free, small team ergonomics) but its RevenueCat/AdMob plugins are community-maintained [S20][S21] and C# mobile is experimental [S68]. **What I need from you to narrow it**: team skills, ad-vs-IAP revenue mix, and the content maturity target.

---

## 13. Gaps and unverified items (explicit)

- WebSearch budget exhausted; several topics rely on direct page fetches only.
- **Unverified**: engines of The Sims Mobile and Alter Ego; BitLife's engine at launch (2018) and the mediation vendor; any BitLife dev-time/team postmortem; Candywriter headcount and the ">62% ad revenue" share (snippet-only).
- **Not fetched / unverified**: Unreal Android package size; Cocos ad SDK support; Capacitor ad plugins; AdMob plugins for Flutter/RN (assumed to exist); Godot Firebase SDK; Amplitude details; GameAnalytics SDK platform list and event types; iCloud/CloudKit specifics; ICU MessageFormat and engine localization packages; Firebase Remote Config numeric limits (get-started page lacked them); Unity IAP and Build Automation terms; PlayFab and Heroic Cloud pricing; Android low-end market share; Apple Foundation Models device list; Gemini Nano device list; Expo/RN release APK sizes; Unity-specific hiring numbers; Godot/Flutter/RN license text.
- **Snippet-only (LOW)**: Cocos 3.8.8 date and APK range [S15]; Godot APK sizes [S71]; Unity 31.8 MB empty APK [S70]; RevenueCat Unity/KMP SDK support [S25b]; Flutter 3.47.6 patch number; Expo SDK 58 beta [S10]; Defold "<2 MB" [S14b].
- Section 5 timeline/cost figures are planning estimates, not benchmarks.

---

## 14. Sources

Primary/secondary pages opened (fetched) unless marked "snippet".

- S1 https://godotengine.org/download/archive/
- S2 https://docs.godotengine.org/en/stable/about/release_policy.html
- S3 https://unity.com/releases/unity-6/support
- S4 https://discussions.unity.com/t/unity-6-6-is-now-available/1735357
- S5 https://unity.com/products/pricing-updates
- S6 https://docs.flutter.dev/release/archive
- S6b https://docs.flutter.dev/perf/app-size
- S7 https://flutter.dev/blog/whats-new-in-flutter-3-44
- S8 https://reactnative.dev/versions
- S9 https://expo.dev/changelog/sdk-57
- S10 https://expo.dev/changelog/sdk-58-beta (snippet)
- S11 https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here
- S12 https://defold.com/2026/08/25/Newsletter-July-August-2026/
- S13 https://defold.com/2026/01/02/Defold-2025-Retrospective/
- S14 https://forum.defold.com/t/how-to-reduce-the-apk-size-increased-by-the-admob-extension/83145 (snippet)
- S14b https://en.wikipedia.org/wiki/Defold (snippet)
- S15 https://www.cocos.com/en/post/f539c7888e620701228458d6b89b80c7 (snippet)
- S16 https://docs.flame-engine.org/latest/
- S17 https://capacitorjs.com/docs
- S18 https://ionic.io/appflow
- S19 https://github.com/AppLovin/AppLovin-MAX-Godot
- S19b https://github.com/AppLovin/AppLovin-MAX-Unity-Plugin (snippet; referenced via search result)
- S20 https://github.com/godot-x/revenuecat
- S21 https://github.com/poingstudios/godot-admob-plugin (snippet)
- S23 https://pub.dev/packages/applovin_max (snippet)
- S23b https://www.npmjs.com/package/react-native-applovin-max (not opened; AppLovin RN module reported in search result, unverified)
- S23c https://support.applovin.com/zh/max/unreal/changelog (snippet)
- S24 https://docs.unity.com/en-us/grow/levelplay/sdk/flutter/plugin-integration and https://docs.unity.com/en-us/grow/levelplay/sdk/react/plugin-integration (snippet)
- S25 https://www.revenuecat.com/docs/platform-resources/sdk-reference (page lists iOS, Android, Flutter, React Native, Capacitor, Cordova, Web)
- S25b https://www.revenuecat.com/docs/getting-started/quickstart (snippet for Unity/KMP)
- S26 https://bitlifeapp.com/privacy
- S27 https://apps.apple.com/us/app/bitlife-life-simulator/id1374403536
- S28 https://jobs.smartrecruiters.com/Candywriter/743999714769753-unity-developer
- S29 https://www.stillfront.com/en/stillfront-group-acquires-candywriter-llc-and-discloses-updated-pro-forma-figures-for-2019/
- S30 https://handwiki.org/wiki/Software:BitLife
- S31 https://en.wikipedia.org/wiki/Reigns_(video_game)
- S32 https://mobilegamer.biz/reigns-and-card-shark-developer-nerial-closes-after-13-years/
- S33 https://en.wikipedia.org/wiki/The_Sims_Mobile
- S34 https://mobilefreetoplay.com/deconstructing-sims-mobile/
- S35 https://apps.apple.com/us/app/alter-ego/id329703516
- S35b https://www.playalterego.com/credits.html
- S36 https://jsonlogic.com/
- S37 https://github.com/google/cel-spec
- S38 https://github.com/inkle/ink
- S39 https://www.yarnspinner.dev/
- S40 https://www.pcg-random.org/
- S41 https://developer.android.com/games/pgs/savedgames
- S42 https://firebase.google.com/pricing
- S43 https://supabase.com/pricing
- S44 https://learn.microsoft.com/en-us/gaming/playfab/
- S45 https://heroiclabs.com/nakama/
- S46 https://docs.unity.com/ugs/en-us/manual/overview/manual/unity-gaming-services-home
- S47 https://firebase.google.com/docs/unity/setup
- S48 https://firebase.google.com/docs/ai-logic
- S49 https://platform.claude.com/docs/en/about-claude/pricing
- S50 https://developer.android.com/ai/gemini-nano
- S51 https://developer.apple.com/apple-intelligence/
- S52 https://developer.apple.com/app-store/review/guidelines/
- S53 https://developer.apple.com/news/upcoming-requirements/
- S54 https://developers.google.com/admob/android/privacy
- S55 https://support.google.com/googleplay/android-developer/answer/11926878
- S56 https://developer.android.com/guide/practices/page-sizes
- S57 https://developer.android.com/topic/performance/vitals
- S58 https://support.google.com/googleplay/android-developer/answer/14094294
- S59 https://docs.expo.dev/eas-update/introduction/
- S60 https://expo.dev/pricing
- S61 https://shorebird.dev/
- S62 https://codemagic.io/pricing/
- S63 https://docs.fastlane.tools/
- S64 https://docs.sentry.io/platforms/
- S65 https://docs.gameanalytics.com/
- S66 https://survey.stackoverflow.co/2025/technology
- S67 https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_android.html
- S68 https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/index.html
- S69 https://docs.unity3d.com/Packages/com.unity.addressables@2.0/manual/index.html
- S70 https://github.com/ArmDeveloperEcosystem/arm-learning-paths/pull/2558/files (snippet)
- S71 https://github.com/godotengine/godot/issues/86571 and https://forum.godotengine.org/t/godot-4-android-build-size-difference/58593 (snippet)
- S72 https://reddit.com/r/gamedev/comments/1sml2qm/i_spent_38000_making_an_visual_novel_so_you_dont/
- S73 https://support.google.com/googleplay/android-developer/answer/9859455
- S74 https://forum.unity.com/threads/apk-size-of-empty-scene-is-20mb-after-installation-on-phone-its-62mb.453297 (snippet, older Unity version)
- S75 https://www.pocketgamer.biz/goodgame-candywriter-launch-bitlife-german/ (fetch returned 403; snippet only)
