# 04 - Text / Choice / Event-Driven / Legacy Life Sims (non-BitLife)

Research date: 2026-10-06. Scope: text, choice, event-driven and legacy-style life sims other than BitLife and Sims-style avatar games.

Confidence labels: **HIGH** = read from a primary source (code, store API, official page) or two independent sources agree. **MEDIUM** = single secondary source (Wikipedia, press) or my own inference from primary data. **LOW** = guess or weak source, needs verification. "unverified" = I looked and could not confirm.

Method notes and limits (stated up front):
- WebSearch hit its session cap (200/200) midway. Remaining facts came from WebFetch of known URLs, the GitHub REST API, the iTunes Search/Lookup API and the Steam store search API. Some topics (Student/Teen Life, idle-life incrementals, Chapters, Dream Daddy) are therefore thinner than the main targets.
- Counts for Life Restart data (events, talents, achievements) are my own row counts from the repo's `.xlsx` files at `main` on 2026-10-06 (HIGH for the counts, MEDIUM that they match any shipped build).
- iTunes ratings/prices are US store values on 2026-10-06.

---

## 0. Correction to the brief: "Alter Ego (mobile, Peter Lorenz / Jetapp)"

- I found no evidence of "Peter Lorenz" or "Jetapp" tied to Alter Ego. The credits page says the game was "originally written by Peter J. Favaro, Ph.D." (1986) and the current edition is "a production of Choose Multiple LLC" ([playalterego.com/credits](https://www.playalterego.com/credits.html)). HIGH.
- The App Store listing (id329703516) names seller "Choose Multiple LLC", $4.99 ([iTunes lookup](https://itunes.apple.com/lookup?id=329703516&country=us), [App Store](https://apps.apple.com/us/app/alter-ego/id329703516)). HIGH.
- "Peter Lorenz / Jetapp" = unverified; most likely a misremembered attribution (LOW). There may be a different "Alter Ego" app I did not find. Other App Store "ALTER EGO" hits are unrelated (e.g. CARAMEL COLUMN INC., 13.9k ratings, a different game) ([iTunes search](https://itunes.apple.com/search?term=alter%20ego&country=us&entity=software)).

---

## 1. Per-game deep dives

### 1.1 Alter Ego (Activision 1986; mobile/Steam editions by Choose Multiple LLC)

**Premise.** Text-based "what if you could live your life again": birth to death, over 1,000 multiple-choice questions, two substantially different male/female versions. ([Steam](https://store.steampowered.com/app/664780/Alter_Ego/), [App Store](https://apps.apple.com/us/app/alter-ego/id329703516)) HIGH.

**Loop.** Seven life phases (infancy, childhood, adolescence, young adulthood, adulthood, middle adulthood, old age). Each phase has branching "nodes" (vignettes). The player picks from menu options; outcomes change personality stats that affect later nodes. ([Wikipedia 1986](https://en.wikipedia.org/wiki/Alter_Ego_(1986_video_game))) HIGH.

**Systems.** Twelve tracked characteristics: Calmness, Confidence, Expressiveness, Familial, Gentleness, Happiness, Intellectual, Physical, Social, Thoughtfulness, Trustworthiness, Vocational ([Digital Antiquarian](https://www.filfre.net/2014/11/alter-ego/)). HIGH (one detailed source; Wikipedia lists only Physical/Confidence/Intellectual as examples, so the 12 is MEDIUM-HIGH).

**Content structure.** Hand-authored vignettes with menu choices, not a parser. Called one of the first computerized hypertext narratives ([Digital Antiquarian](https://www.filfre.net/2014/11/alter-ego/)). MEDIUM. The writer reportedly interviewed "hundreds of people" about memorable life experiences; rigor unclear (same source). LOW-MEDIUM.

**Monetization.** 1986: two versions (male/female) sold separately at $35 each ([credits page](https://www.playalterego.com/credits.html)). Now: paid $4.99 iOS ([iTunes](https://itunes.apple.com/lookup?id=329703516&country=us)); Steam edition, Choose Multiple LLC ([Steam](https://store.steampowered.com/app/664780/Alter_Ego/)). HIGH.

**Reception.** Zzap!64 98%; some critics found it repetitive after the first plays ([Wikipedia](https://en.wikipedia.org/wiki/Alter_Ego_(1986_video_game))). iOS 4.38 stars (186 ratings); Steam "Mixed" 65% positive (47 reviews) ([iTunes](https://itunes.apple.com/lookup?id=329703516&country=us), [Steam](https://store.steampowered.com/app/664780/Alter_Ego/)). HIGH. Criticism: sexism and heteronormativity of 1980s content; the female version has fewer opportunities ([Digital Antiquarian](https://www.filfre.net/2014/11/alter-ego/)). MEDIUM. Players on iOS request LGBTQ+ inclusion and customization ([App Store](https://apps.apple.com/us/app/alter-ego/id329703516)). MEDIUM.

**Lessons.** (a) Stat-gated menu vignettes are a 40-year-old, still-playable skeleton for a life sim. (b) Small audience today (hundreds of ratings) despite the pedigree: the format alone does not sell without modern presentation, sharing hooks and live content. (c) Content authored in 1986 needs inclusive rewrites; build content with identity-neutral templating from day one. MEDIUM (inference).

---

### 1.2 Life Restart Simulator / 人生重开模拟器 (China, Sept 2021)

**Premise.** Web text game that auto-plays a random life year by year. The player only builds the character (talents plus 20 attribute points), then watches. Tagline on the home screen: "这垃圾人生一秒也不想待了" (roughly "can't stand this garbage life one more second"). ([Home.tsx](https://raw.githubusercontent.com/VickScarlet/remake/main/apps/web/src/containers/Home.tsx)) HIGH.

**Origin and scale.**
- Created by 神户小德 (design/writing) and 神户小鸟 (code) in about two weeks; started as a visualisation of a QQ-group survey on how to rank face/intelligence/health/family wealth ([woshipm](https://www.woshipm.com/it/5129592.html), [ifanr/zh-wiki consistent](https://zh.wikipedia.org/wiki/%E4%BA%BA%E7%94%9F%E9%87%8D%E5%BC%80%E6%A8%A1%E6%8B%9F%E5%99%A8)). HIGH.
- Launched 2021-09-03 via Baidu Tieba; ~200 million plays in 3 days ([woshipm](https://www.woshipm.com/it/5129592.html), [zh-wiki](https://zh.wikipedia.org/wiki/%E4%BA%BA%E7%94%9F%E9%87%8D%E5%BC%80%E6%A8%A1%E6%8B%9F%E5%99%A8), [ifanr](https://www.ifanr.com/app/1439503)); zh-wiki adds 1 billion by day 8. HIGH for 200M/3 days; MEDIUM for 1B/8 days. Note: qbitai writes "2 billion" for the same window ([qbitai](https://www.qbitai.com/2021/09/28407.html)), which conflicts with the other three; treat as a typo. LOW.
- Over 10 million players in the launch window ([qbitai](https://www.qbitai.com/2021/09/28407.html)). MEDIUM.
- GitHub repo: 10.4k stars, 2.3k forks, MIT licence, created 2021-08-15, last push 2026-10-05; now named `VickScarlet/remake` ([GitHub API](https://api.github.com/repos/VickScarlet/lifeRestart)). HIGH. Still actively developed five years later.

**Loop (from the code, `packages/hooks/src/play.ts`, `packages/core/src/game.ts`).** Steps: Mode -> (Chara) -> Pick -> Alloc -> Play -> Summary -> Achv. ([play.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/hooks/src/play.ts), [game.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/core/src/game.ts)) HIGH.
1. Draw 10 talents, pick 3 (`PullCount=10`, `PickMax/Min=3`).
2. Distribute 20 points (`BasePoints=20`) over CHR/INT/STR/MNY, max 10 each (`AllocLimit=10`); SPR starts at 5. Some talents add bonus points (`Talent.points`).
3. Each "tick" = +1 age: fire any talent whose `condition` passes, pick one event from that age's pool, apply effects, check achievements, end when `life < 1`.
4. Summary: grades per stat, then the player may lock ONE talent (`LockLimit=1`) so it appears in the next life, then "再次重开" (restart). ([config.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/apps/web/src/config.ts), [Summary.tsx](https://raw.githubusercontent.com/VickScarlet/remake/main/apps/web/src/containers/Summary.tsx)) HIGH.

**The player makes zero decisions during the life.** All agency is in the pre-life build and the lock choice. HIGH (no choice UI in `Play`/`next`; `next()` takes only state/profile/rng).

**Stat model.** Six properties: CHR (looks), INT, STR, MNY (family wealth), SPR (happiness), plus AGE; `LIF` is a life counter that ends the run when `< 1`. The game tracks current, highest and lowest per property, and condition expressions can query all three (`CHR`, `HCHR`, `LCHR`...). ([state.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/core/src/state.ts)) HIGH.
Final score: `floor(sum(highest CHR,INT,STR,MNY,SPR) * 2 + highestAge / 2)`. HIGH (state.ts `summary`).

**Event schema (TypeScript types in the data package).** ([event.types.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/data/src/event.types.ts)) HIGH.
```
Event { id, event(text), grade 0..3 (rarity), postEvent?(follow-up text),
        effect?{CHR,INT,STR,MNY,SPR,LIF,AGE deltas},
        NoRandom?, include?(cond string), exclude?(cond string),
        branch?[{condition, event(id)}], format? }
```
Sample rows (older fork snapshot; the schema matches) ([SWERecker fork events.json](https://raw.githubusercontent.com/SWERecker/lifeRestart/HEAD/data/events.json)) HIGH:
```
10003 "你生了场重病。" postEvent "家里花了不少钱。" effect {MNY:-1,SPR:-1}
      exclude "STR>6"  branch ["TLT?[1001]:10004", "STR<2&MNY<3:10000"]   # 10000 = death
10007 "你开始看动漫。" effect {SPR:1} include "TLT?[1005]"
      exclude "(MNY<3)|(EVT?[10007,10008])" branch ["INT>5:20008","CHR>5:20007"]
```
Reading: events are tiny (one line plus one follow-up line), carry rarity, and chain through `branch` (first matching branch wins, recursively, via `trigger()` in [event.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/core/src/event.ts)). Branch to the "death" event (id 10000, effect `LIF:-1`) is how stat-based death is authored.

**Condition language** (package `condition`): infix strings with `&`, `|`, parentheses; atoms such as `AGE>10`, `STR<2`, and set membership `TLT?[1001,1002]` (has talent), `EVT?[...]` (event seen this life), `AEVT?`/`ATLT?`/`AACH?` (seen across all lives), `TMS` (lives played), `SUM`. ([condition/index.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/condition/index.ts), state.ts `FlatState`) HIGH. A single DSL gates events, talents and achievements, so cross-life memory is "free": any content can depend on profile history.

**Age pool and weights.** `age.xlsx` is one row per age (0 to 500) listing `eventId*weight` entries; a `|level` suffix assigns a priority tier. Each tick filters each tier by `include/exclude` and weighted-picks one event; the loop overwrites the pick for each non-empty tier ([age.types.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/data/src/age.types.ts), [game.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/core/src/game.ts)). HIGH for structure; the direction of tier precedence I did not independently verify (LOW). Fractional weights (e.g. `*0.001`) are scaled to integers; a huge weight (e.g. `10494*999999`) acts as "forced" ([fork age.json](https://raw.githubusercontent.com/SWERecker/lifeRestart/HEAD/data/age.json)). HIGH. The first-year pool shows gender chosen by weight (`10001*110`, `10002*100`) in the fork. HIGH.

**Content volume (my row counts, `main` @ 2026-10-06, [data dir](https://github.com/VickScarlet/remake/tree/main/packages/data/src)).** HIGH for counts:
- 1,720 events (rarity 0/1/2/3 = 1,233/240/163/84); 230 have `branch`; 152 are `NoRandom` (only reachable via branch); 1,539 carry an `include` and 1,475 an `exclude`.
- 184 talents (rarity 101/52/23/8), 165 achievements (149 checked each year, 7 at start, 5 at summary, 4 at end; 35 hidden), 100 historical "celebrity" characters.
- Original press said "1,500+ events", hand-written by one person ([woshipm](https://www.woshipm.com/it/5129592.html)). MEDIUM.
- Old fork snapshot: 1,717 events, 146 talents, 161 achievements ([fork data](https://github.com/SWERecker/lifeRestart/tree/HEAD/data)). HIGH.

**Randomness and talents (`talent.ts`, `config.ts`).** HIGH.
- Rarity pull rates: white 889 / blue 100 / purple 10 / orange 1 (out of 1000).
- Replay-based boosts: purple weight multiplied by (level+1) based on lives played (thresholds 0,10,30,50,70,100); orange multiplied by (level+1) based on achievements earned (same thresholds). Max x6. This is "soft pity" tied to engagement.
- Talent fields: `condition` (when it fires, e.g. "AGE?[30]" = age 30), `effect`, `max` triggers per life, `exclude` (mutually exclusive talents), `exclusive` (cannot be drawn normally), `points` (bonus build points), and `replacement` (a "blind box" talent that resolves into another talent, chained, by weight list or by rarity).
- Sample talents: "三十而立: at 30, family wealth +2", "四十不惑: at 40, intelligence +2" ([fork talents.json](https://raw.githubusercontent.com/SWERecker/lifeRestart/HEAD/data/talents.json)). Rarity-3 event "天赋卡【死者苏生】发动，你被复活了" (talent revives you) exists in `event.xlsx` row 20000 (my xlsx read).
- RNG is injected (`rng?: RNG` param on `pick`, `next`, `pull`), which makes the core testable and seedable. HIGH.

**Meta-progression and replay mechanics.** HIGH (code).
- Persistent `ProfileState`: lives played, talents ever owned, events ever seen, achievements, highest/lowest properties, locked talent.
- Lock-one-talent-for-next-life at the summary screen.
- Celebrity mode unlocks after 10 lives (`ModeLimit=10`; `useRemake` routes to the mode screen only when `times >= mode`): play as a historical figure "reborn in the modern day", with fixed stats and talents (e.g. Qin Shi Huang, Confucius rows in `character.xlsx`).
- Achievements fire at four timings: START, TRAJECTORY (each year), SUMMARY, END; "restart count" achievements at 10/50/200 lives (e.g. 既视感 = restart 10 times) ([fork achievement.json](https://raw.githubusercontent.com/SWERecker/lifeRestart/HEAD/data/achievement.json)).

**End-of-life summary and sharing.** Final screen shows a graded list: each stat gets a tier label from `jbase = 地狱|折磨|不佳|普通|优秀|罕见|逆天|传说` (Hell, Torment, Poor, Average, Good, Rare, Heaven-defying, Legendary); age has its own ladder from 胎死腹中 (died in the womb) via 花甲/古稀 up to 仙寿 (immortal lifespan); there are cultivation-flavoured words for extreme INT/STR ([display.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/data/etc/display.ts), config.ts judge lines). HIGH. The current web app has no share-image dependency in `package.json` (react, jotai, toast only) ([apps/web/package.json](https://raw.githubusercontent.com/VickScarlet/remake/main/apps/web/package.json)); press says players screenshotted summaries and posted them, and the game explicitly states there is no leaderboard ("别卷了！没有排行榜") ([woshipm](https://www.woshipm.com/it/5129592.html), [qbitai](https://www.qbitai.com/2021/09/28407.html)). HIGH for the code fact, MEDIUM for the press claim.

**Why it went viral (press + my reading).**
- Developer's own explanation: "people at work wanting to slack off" plus instant-play with no sound ([qbitai](https://www.qbitai.com/2021/09/28407.html), [woshipm](https://www.woshipm.com/it/5129592.html)). HIGH (both quote it).
- Dark-humour, meme-heavy writing on inequality, ageing, family pressure; after many runs most lives converge, which players found philosophically striking ([ifanr](https://www.ifanr.com/app/1439503)). MEDIUM.
- Zero-friction web, MIT open source (forks and mods spread it further), and a build screen that invites "what if I take talent X" conversation (my inference; LOW-MEDIUM). Players shared optimal builds ("family wealth beats everything") and extreme lives (a cultivation mod hitting 400+ years) ([woshipm](https://www.woshipm.com/it/5129592.html)). MEDIUM.

**Monetization and aftermath.** Web version free and open source. A licensed mobile version via TapTap (publisher 天津羽仁科技 / Yurenin) was announced 2021-09-07 and reached #1 in TapTap pre-orders ([woshipm](https://www.woshipm.com/it/5129592.html), [zh-wiki](https://zh.wikipedia.org/wiki/%E4%BA%BA%E7%94%9F%E9%87%8D%E5%BC%80%E6%A8%A1%E6%8B%9F%E5%99%A8)). MEDIUM. zh-wiki reports the mobile version drew criticism for permission requests and ads, and that many low-quality clones posed as "official" ([zh-wiki](https://zh.wikipedia.org/wiki/%E4%BA%BA%E7%94%9F%E9%87%8D%E5%BC%80%E6%A8%A1%E6%8B%9F%E5%99%A8)). MEDIUM. TapTap revenue/DAU: unverified.

**Reception and weakness.** Praised for randomness and variety; criticised for "insufficient content" after repeated play (zh-wiki). MEDIUM. 127 open GitHub issues at launch, developer admitted many bugs ([woshipm](https://www.woshipm.com/it/5129592.html)). MEDIUM.

**Clones and forks (GitHub, stars as of 2026-10-06 via [search API](https://api.github.com/search/repositories?q=life+restart&sort=stars)).** HIGH for the facts listed:
| Repo | Stars | What it is |
|---|---|---|
| AliyunWorkbench/lifeRestart | 121 | one-click cloud deploy |
| gameall3d/LifeRestart_Cocos | 113 | Cocos Creator port (mobile-oriented) |
| uiiang/lifeRestartWX | 35 | WeChat mini-program port |
| cc004/lifeRestart-py | 34 | Python port |
| myPirlo/lifeRestartZero | 27 | "invincible" cheat mod |
| chnjames/life-restart-ai | 29 | Vue 3; every event generated live by an LLM (Doubao) plus Seedream images; no fixed event library |
| Clouds-Heath/PM-life-restart | 20 | month-granularity variant (pushed 2026-09-26) |
The AI variant's design doc calls the 9-event fixed library a repetition problem and replaces it with prompt-built events from age, stats, tags and the last 5 events ([PURE-AI-EVENT-SYSTEM.md](https://raw.githubusercontent.com/chnjames/life-restart-ai/HEAD/PURE-AI-EVENT-SYSTEM.md)). HIGH for what it does; effectiveness unverified.

**Lessons.** Build-then-watch is a complete game; a handwritten event pool of about 1.7k one-liners plus a condition DSL carried a 200M-play viral hit; replay hooks (talent lock, rarity pity scaled by lives, achievements, unlockable mode) are cheap data, not code; the weakness is a flat curve (runs converge) and no in-life agency.

---

### 1.3 Reigns series (Nerial / Devolver Digital)

**Premise and loop.** Swipe left/right on cards (advisors, events) to rule as a king; four meters (church, people, army, money); if any meter hits an extreme, the ruler dies and the next ruler takes over, "breaking a Devil's curse across multiple reincarnations". Launched 2016-08-11 on mobile/PC ([Wikipedia](https://en.wikipedia.org/wiki/Reigns_(video_game))). HIGH.

**Card selection ("bag") system.** All cards form a base pool; cards are filtered out when conditions fail (e.g. queen cards when unmarried), each remaining card has a "size" (weight) so contextual cards get more space in the bag; recency checks stop immediate repeats; special sub-systems (wars, duels, devil) use small dedicated pools; designer cites Failbetter's quality-based narrative as inspiration ([Game Developer deep dive](https://www.gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-)). HIGH. Writing process: one-shot cards, then mini storylines, then add-ons and hidden meta-games, no hard card limit; initial build around 50 cards (same source). MEDIUM-HIGH.

**Scale of content.** Reigns: Her Majesty (2017) grew from 800 to 1,200-1,300 cards and added an item system; won the 2019 Writers' Guild Award for Best Writing in a Video Game ([Wikipedia](https://en.wikipedia.org/wiki/Reigns:_Her_Majesty)). MEDIUM.

**Monetization.** Premium, no IAP in the base game: $2.99 on mobile/Steam, 600k+ copies in about a month, majority from phones ([Game Developer](https://www.gamedeveloper.com/business/-i-reigns-i-sells-big-on-mobile-proves-premium-games-can-still-be-king)); 2 million by Aug 2019 ([Wikipedia](https://en.wikipedia.org/wiki/Reigns_(video_game))). HIGH. Current US App Store prices: Reigns $2.99, Her Majesty $2.99, Game of Thrones $3.99, The Witcher $5.99 (released 2026-02-25), a Beyond listing at $4.99 ([iTunes search](https://itunes.apple.com/search?term=reigns&country=us&entity=software)). HIGH.

**Reception.** Metacritic iOS 87, PC 77; critics noted repetition risk ([Wikipedia](https://en.wikipedia.org/wiki/Reigns_(video_game))). HIGH. Reigns: Her Majesty has 4.84 stars (15.5k ratings), Game of Thrones 4.82 (10.5k), original 4.75 (7.6k) ([iTunes](https://itunes.apple.com/search?term=reigns&country=us&entity=software)). HIGH.

**Spinoffs (brief).**
- Reigns: Game of Thrones (2018, HBO licence): same four meters recast as military/religion/popularity/wealth, playable characters unlocked (Daenerys, Cersei, Jon, Tyrion, Sansa), framed as Melisandre's "what if" visions to avoid canon conflicts, mini-games (jousting, brawling); Metacritic iOS 84; critics noted repetitive decisions across rulers ([Wikipedia](https://en.wikipedia.org/wiki/Reigns:_Game_of_Thrones)). MEDIUM.
- Reigns: Three Kingdoms (Nov 2022): Netflix-only, added combat and multiplayer, mixed reviews ([Wikipedia](https://en.wikipedia.org/wiki/Reigns:_Three_Kingdoms)). MEDIUM.
- Reigns: The Witcher (2026): store listing frames Geralt's story as bard Dandelion's ballads ([iTunes lookup](https://itunes.apple.com/lookup?id=6736946286&country=us)). HIGH.

**Studio outcome.** Nerial announced it is closing after 13 years and 11 games; press cites annual losses near GBP 800k (2025) and about GBP 1M (2024) from Companies House ([GameDev.net summary](https://gamedev.net/news/reigns-developer-nerial-closes-following-significant-trading-losses-over-past-two-years-r6159/)); the Kotaku article returned 403, so I did not read it directly. MEDIUM. Lesson: the format was a premium hit but the series did not become a sustainable business for the creator.

**Lessons.** Four opposing meters plus binary choice is the cheapest possible "decision with consequences" UI; a filtered, weighted "bag" gives narrative coherence without hand-wired links; death is just a transition to the next life (dynasty framing, cumulative storyline across deaths).

---

### 1.4 Princess Maker series (Gainax, Takami Akai, 1991 to now)

**Premise and loop.** Raise a daughter from age 10 to 18 by scheduling her months: training (academic, art, religion, military, magic), part-time jobs, adventures, rest. In PM2 each month has three periods (early, middle, late). Stats include body (strength, intelligence, charm...), skills (art, cooking, combat, magic), and mental stats (sin, morals, temperament), plus stress, which causes illness or delinquency when high; church work cleanses sin and raises morality ([Wikipedia PM2](https://en.wikipedia.org/wiki/Princess_Maker_2), [search summary of fandom/guides](https://www.arrpeegeez.com/2023/12/princess-maker-2-walkthrough-stats-guide.html)). HIGH for loop; MEDIUM for stat details (guide-level).

**Systems.** Zodiac sign and blood type shape growth and monthly stat drift; festivals (tournaments, dance, art, cooking) act as milestones; rival girls act as benchmarks; body and clothing changes from diet. 74 endings in PM2 (career endings plus 6 marriage endings attached) ([Wikipedia PM2](https://en.wikipedia.org/wiki/Princess_Maker_2)). HIGH.

**Commercial.** PM2 sold 30,000 copies by September 1993 with 10,000 fan letters ([Wikipedia PM2](https://en.wikipedia.org/wiki/Princess_Maker_2)); the franchise 200,000 by 1996 and 1M+ by 2005, popular in South Korea, Taiwan and Chinese-speaking regions ([Wikipedia](https://en.wikipedia.org/wiki/Princess_Maker)). HIGH. Credited as the progenitor of "raising simulation".

**Modern status.** Princess Maker: Children of Revelation entered Steam Early Access 2025-07-03, listed with release 2026-09-30, price about USD 34.99, "Mostly Positive" 78% of 1,115 reviews (recent 61% "Mixed") ([Steam](https://store.steampowered.com/app/3438810/Princess_Maker_Children_of_Revelation/), [RPGSite](https://www.rpgsite.net/news/17862-princess-maker-children-revelation-launches-for-pc-via-steam-early-access)). MEDIUM (Steam page fetched via a summariser; dollar price from RPGSite). A mobile port "Crunchyroll: Princess Maker 2" (2026-02-11) is gated behind Crunchyroll Mega/Ultimate membership and is rated 2.29 (7 ratings) ([iTunes](https://itunes.apple.com/lookup?id=6751303821&country=us)). HIGH for the store facts; too few ratings to judge quality.

**Lessons.** Scheduling UI (pick activities per period, then watch results) maps well to phone sessions; the endings table (74) is the replay engine; hidden mental stats (stress, sin) add a second axis beyond "skills up"; recurring annual festival events create anticipation.

---

### 1.5 Long Live the Queen (Hanako Games, 2012 web/PC; Steam 2013)

**Premise and loop.** Keep a 14-year-old princess alive for 40 weeks until her coronation; each week choose two classes (morning, afternoon) among 42 skills in categories like economics, intrigue, expression, military, medicine, conversation, magic; events then run skill checks ([Wikipedia](https://en.wikipedia.org/wiki/Long_Live_the_Queen_(video_game)), [search summary](https://indiegamefans.com/long-live-the-queen-princess-maker-death-and-politics/)). HIGH-MEDIUM (counts differ slightly across sources; "42 skills" from one review).

**Systems.** Visible stats (skills, moods on four emotional axes) plus hidden stats (military strength, treasury, noble and commoner satisfaction) ([Emily Short](https://emshort.blog/2015/07/21/long-live-the-queen-hanako-games/)). Failing a check can kill the princess in one of about 11 ways, or close story branches ([Wikipedia](https://en.wikipedia.org/wiki/Long_Live_the_Queen_(video_game))). Winning "is largely about learning which challenges are going to come up when and which skills you'll need" (Emily Short, same link). The game tracks habits as well as choices (a Cruelty stat appears after repeated killings). HIGH.

**Replay.** Players are expected to die often and win once; you cannot max all skills in one run. Many logged deaths and multiple endings (spouse, neighbouring nations, magic, father's fate) ([Wikipedia](https://en.wikipedia.org/wiki/Long_Live_the_Queen_(video_game))). HIGH-MEDIUM.

**Reception and price.** Steam: 94% positive of 4,718 reviews, Metacritic 67 ([Steam](https://store.steampowered.com/app/251990/Long_Live_the_Queen/)). HIGH. Release date discrepancy: Wikipedia says 2012-06-02, Steam page says 2013-11-08 (web/PC vs Steam launch, my guess, LOW). Sales: unverified.

**Lessons.** "Prepare for a known calendar of threats" is a different replay loop than random events: a fixed hidden timeline plus a stat-allocation puzzle. Pairing a schedule UI with death-as-feedback gives 10-20 hours of replay from small content.

---

### 1.6 Crusader Kings 3 (Paradox, 2020) - design reference only

- Characters have six skills (Diplomacy, Martial, Stewardship, Intrigue, Learning, Prowess) shaped by traits, education and inherited genes; a stress system penalises actions that conflict with personality traits, up to breakdowns and death; six lifestyles with perk trees; dynasty heads spend Renown on house-wide bonuses ([Wikipedia](https://en.wikipedia.org/wiki/Crusader_Kings_III)). HIGH.
- Traits: personality (up to 3, hard to change), congenital (born, hereditary), education (5 levels), lifestyle (earned). Opposite traits cannot coexist. Traits modify skills, health, fertility and opinions, and each personality trait ties to stress triggers ([Paradox wiki Traits](https://ck3.paradoxwikis.com/Traits)). HIGH.
- Event data shape: `namespace.id = { type, title, desc, theme, trigger = {...}, immediate = {...}, option = { name, trigger, ai_chance, effects }, after = {...} }`, with scopes (`root`, `scope:x`) and `on_action` hooks for births, deaths and inheritance ([Paradox wiki event modding](https://ck3.paradoxwikis.com/Event_modding)). HIGH. Same pattern as Life Restart: trigger (conditions), effects, options, per-option conditions and weights.
- Sales: over 1M in the first month, 2M by Mar 2022, 3M by Sep 2023, 4M+ by Apr 2025; Metacritic PC 91; five content chapters with 13 releases 2021-2026 (DLC-funded model) ([Wikipedia](https://en.wikipedia.org/wiki/Crusader_Kings_III)). HIGH.
- What to borrow: trait inheritance across generations; trait-conflict rules (mutually exclusive sets); stress as a hidden pressure meter; "play continues as heir" so death is not the end. Not borrowable at our scale: the grand-strategy map.

---

### 1.7 Football Manager / OOTP (career-mode analogs, brief)

- Football Manager: annual releases (FM24 released 2023-11-06, "over 19 million players as of September 2025"), database maintained by volunteer researchers, multi-platform including mobile ([Wikipedia](https://en.wikipedia.org/wiki/Football_Manager)). MEDIUM. Relevance: season-based loop with long careers and emergent stories from a rich database; the annual-edition model funds ongoing data.
- Out of the Park Baseball: text-based sim since 1999, 27 versions through Mar 2026, supports career, historical and fictional leagues ([Wikipedia](https://en.wikipedia.org/wiki/Out_of_the_Park_Baseball)). MEDIUM. Relevance: a text-heavy sim can sustain a decades-long franchise when stats and generated people are deep. Details on OOTP random-league generation: unverified.

---

### 1.8 Choices / Episode / Chapters (interactive story apps, brief)

- **Choices: Stories You Play** (Pixelberry, 2016): free; two currencies, diamonds (premium choices) and keys (gated chapters, refill every 2 hours); at least one premium choice per chapter (often 2) costing 5 to 75 diamonds; diamond packs USD 1.99 to 99.99 with 1.99 the best seller; VIP sub USD 14.99/month; a 30-second video ad before chapters; 100M+ downloads and USD 544M lifetime revenue by 2024; ~78% female, ~80% aged 10-21 (2018); Nexon acquired Pixelberry in 2017, Series Entertainment in 2024 ([Wikipedia](https://en.wikipedia.org/wiki/Choices:_Stories_You_Play), [Udonis](https://www.blog.udonis.co/mobile-marketing/mobile-games/choices-stories-you-play-monetization), [PocketGamer.biz](https://www.pocketgamer.biz/how-does-choices-stories-you-play-monetise/)). MEDIUM-HIGH. Critics call premium choices "pay-to-win" for narrative ([Wikipedia](https://en.wikipedia.org/wiki/Choices:_Stories_You_Play)). iOS 4.54 stars, 198.8k ratings ([iTunes](https://itunes.apple.com/search?term=story%20choices%20interactive&country=us&entity=software)). HIGH.
- **Episode** (Pocket Gems, 2014): user-generated stories with a no-code scripting tool; gems (premium choices) and passes (episode access); "over 150,000 narratives, 9 billion views, 12 million creators" as of 2021; content issues with sexual themes in a youth-marketed app ([Wikipedia](https://en.wikipedia.org/wiki/Episode_(app))). MEDIUM. Third-party estimates put Episode at about USD 4.4M and Chapters about USD 4M for an unspecified (historical) period ([ThinkGaming/AdExchanger snippet](https://www.adexchanger.com/mobile/storytelling-app-episode-like-interactive-tv-people-cant-put-phones/)): LOW, period unclear.
- **Chapters** (Crazy Maple): passes refill on a timer, better choices cost gems ([search snippet](https://thinkgaming.com/app-sales-data/6028/episode-choose-your-story/)); iOS 4.4 stars, 115.7k ratings ([iTunes](https://itunes.apple.com/search?term=story%20choices%20interactive&country=us&entity=software)). MEDIUM.
- Relevance: this is the proven monetization template for choice-driven content: energy (keys/passes) plus premium choices plus ads plus VIP. It is also the cautionary tale: premium choices gate outcomes.

---

### 1.9 Life Is Strange-style narrative (brief, limited relevance)

- Rewind mechanic, episodic release (five episodes in 2015, split for pacing and finance), choices with short- and long-term consequences ([Wikipedia](https://en.wikipedia.org/wiki/Life_Is_Strange)). MEDIUM. Not a life sim; relevance is the end-of-chapter "what percent of players chose X" comparison I did not verify in the fetched text (unverified), and the idea of a limited "undo" as a feature.

---

### 1.10 Kind Words / cozy text games (brief)

- Kind Words (Popcannibal, 2019): anonymous letters to and from real players, lo-fi music, stickers, your own room; 5.3M+ letters exchanged; Kind Words 2 released 2024-10-07 ([Wikipedia](https://en.wikipedia.org/wiki/Kind_Words_(video_game))). MEDIUM. Relevance: asynchronous, anonymous, low-pressure social without live multiplayer; moderation burden is the hidden cost (not verified here).

---

### 1.11 Dream Daddy / Hatoful Boyfriend (dating-sim/visual-novel analogs, brief)

- Dream Daddy (Game Grumps, 2017-07-20): seven dateable dads; hit #1 on Steam on launch day via the publisher's YouTube audience; 91% positive of 4,654 Steam reviews; a third-party estimate of about USD 2.9M gross ([search summary of Tubefilter/Steam](https://www.tubefilter.com/2017/07/26/dream-daddy-steam-game-grumps/), [Wikipedia](https://en.wikipedia.org/wiki/Dream_Daddy:_A_Dad_Dating_Simulator)). MEDIUM (revenue estimate LOW).
- Hatoful Boyfriend (PigeoNation, 2011): dating sim with pigeons; 3 stats via class attendance, 13 endings (14 in 2014 remake), a final route unlocked after four specific endings; success came from a ridiculous hook plus word of mouth, with a Flash server crashing twice ([Wikipedia](https://en.wikipedia.org/wiki/Hatoful_Boyfriend)). MEDIUM. Lesson: a one-line absurd premise plus "unlock the true route after N endings" is a cheap replay structure; novelty drives sharing.

---

### 1.12 Student Life / Teen Life / school life sims and mobile choice life sims

Evidence is mostly store data; no design write-ups found. Specific "Student Life"/"Teen Life" titles from the brief: unverified. What I could verify (iTunes US, 2026-10-06) ([search 1](https://itunes.apple.com/search?term=life%20choices%20simulator&country=us&entity=software), [search 2](https://itunes.apple.com/search?term=teen%20life%20simulator&country=us&entity=software)):

| App | Seller | Ratings (US) | Notes |
|---|---|---|---|
| 100 Years - Life Simulator | Voodoo | 4.58 / 181k | 3D, choices per "year" as levels, age cap reported 65, heavy ads; reviewers say "wrong" choices force ad-retry rather than branching ([App Store](https://apps.apple.com/us/app/100-years-life-simulator/id1524755868)). IAP: gem packs USD 0.99-5.99, ad removal 2.99-9.99, bundles 4.99-9.99. |
| Life Choices: Life Simulator | UNICO STUDIO | 4.55 / 14.2k | 1,000+ choices, alignment (good/evil), town building; IAP: gems 250=1.99, 1000=5.99, Remove Ads 5.99/9.99, VIP 3.99 ([App Store](https://apps.apple.com/us/app/life-choices-life-simulator/id1585419012)). |
| Everlife - Life Simulator | Eververse | 4.57 / 4.4k | swipe through life season by season, 8 life stats, 60+ free content updates per year; IAP are content decks/expansions USD 0.99-4.99, no gems ([App Store](https://apps.apple.com/us/app/everlife-life-simulator/id1603664467)). |
| The Life Simulator | Mind Vacation | 4.50 / 20.8k | finance-flavoured life sim, 15+ starting scenarios, perks ([iTunes](https://itunes.apple.com/lookup?id=1439862818&country=us)). |
| Life Simulator - Hobo CEO | Chimpanzee LLC | 4.76 / 9.1k | start homeless at 18; inheritance to children; leaderboards; IAP include "+20 years life expectancy" USD 4.99, "+60 years" 7.99, "Forever Young" 19.99 ([App Store](https://apps.apple.com/us/app/life-simulator-hobo-ceo/id1587216919)). |
| High School Life / High School Simulator | various | 4.22 / 1.3k; 3.84 / 24k | school sims; no further analysis ([iTunes](https://itunes.apple.com/search?term=teen%20life%20simulator&country=us&entity=software)). |
| BitLife | Candywriter | 4.76 / 1.79M | other agent's scope; shown only as scale reference ([iTunes](https://itunes.apple.com/search?term=life%20choices%20simulator&country=us&entity=software)). |

All HIGH for the store facts. The gap between BitLife (1.79M ratings) and the next challengers (181k, 20k, 14k) is large (HIGH, from the table); the best-rated challengers use swipe-style or choice-menu UIs.

---

### 1.13 Idle "life" incrementals

- Verified via iTunes: Idle Life Sim - Simulator Game (Codigames, 61k ratings), Idle Guy: Life Simulator (Heatherglade, 72k), From Zero to Hero: Idle game! (Heatherglade, 292k), Idle Success (Supersonic, 21k), Lamar - Idle Vlogger (Tabtale, 182k) ([iTunes search](https://itunes.apple.com/search?term=idle%20life&country=us&entity=software)). HIGH for presence and scale.
- Mechanics, monetization and retention for these: unverified (not fetched). On the browser side: Idle Success ("start unemployed, work out, study, climb the career ladder") and "Life Incremental: Dynasty" (big tech tree, online leaderboard) appear in [itch.io tag results](https://itch.io/games/new-and-popular/tag-idle/tag-life-simulation) via search snippet only. LOW.

---

### 1.14 Lifeline / gamebook-style

- Lifeline (3 Minute Games, 2015): text conversation with a stranded astronaut, binary choices answerable from the lock screen/watch, real-time delays ("one hour" for a one-hour task); 81% day-one retention; premium USD 2.99; series of sequels ([Game Developer](https://www.gamedeveloper.com/design/building-a-narrative-out-of-push-notifications-in-i-lifeline-i-), [Wikipedia](https://en.wikipedia.org/wiki/Lifeline_(2015_video_game)), [iTunes](https://itunes.apple.com/search?term=lifeline%20text%20adventure&country=us&entity=software)). HIGH for retention/price, MEDIUM for the rest. Ratings: Lifeline 4.66 (4.5k), Whiteout 4.74 (4.5k). HIGH.
- Relevance: push notifications as story delivery; "decisions are what make a notification worth opening". Applies to a life sim as year-end or milestone push ("Your character turned 18").

---

### 1.15 A Dark Room (brief)

- Doublespeak Games, browser 2013-06-10, open-sourced (MPL 2.0); iOS port by Amir Rajan late 2013, Android 2016, Switch 2019; top-downloaded App Store game in April 2014; progressive reveal: a fire in a cold room becomes resources, village, then world exploration ([Wikipedia](https://en.wikipedia.org/wiki/A_Dark_Room)). MEDIUM-HIGH.
- Relevance: progressive disclosure of mechanics (new systems appear as the run grows) fits a life sim where school, career, family and wealth unlock with age.

---

### 1.16 Hades / Rogue Legacy / Wildermyth: "multiple lives" meta-progression analogs

- **Hades** (Supergiant): death returns the player to the House of Hades hub; ~10 hours of dialogue reacting to chained events; Mirror of Night permanent upgrades; Pact of Punishment player-set difficulty; over 1M sold within days of 1.0 after 700k in two years of Early Access ([Wikipedia](https://en.wikipedia.org/wiki/Hades_(video_game))). MEDIUM-HIGH. Takeaway: every death advances story and unlocks something; dialogue memory of previous runs makes each life feel counted.
- **Rogue Legacy**: on death choose among three randomly generated heirs with quirky traits (colour-blindness, ADHD, dwarfism, etc.); gold carries into permanent manor upgrades; unspent gold is taken by Charon; New Game+ cycles ([Wikipedia](https://en.wikipedia.org/wiki/Rogue_Legacy)). MEDIUM-HIGH. Takeaway: "heir with random traits" is a compact legacy mechanic directly relevant to a life sim.
- **Wildermyth** (Worldwalker, Early Access 2019, full 2021, Metacritic 86): procedurally generated characters age across a campaign, form friendships/rivalries, and gain traits; layers of handcrafted and procedural content ([Wikipedia](https://en.wikipedia.org/wiki/Wildermyth)). MEDIUM. Takeaway: character-history-driven event text ("callbacks") is where emotional impact comes from.
- Slay the Spire-specific analysis: not performed (unverified).

---

## 2. Cross-cutting design extraction

### 2.1 Event structure

| Pattern | Used by | Shape |
|---|---|---|
| Age-slot pool: one row per age with weighted event ids | Life Restart ([age.types.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/data/src/age.types.ts)) | `age -> [(eventId, weight, tier)]`; filter by include/exclude; weighted pick |
| Global "bag" of cards, filtered by state, weighted by "size" | Reigns ([Game Developer](https://www.gamedeveloper.com/design/game-design-deep-dive-creating-an-adaptive-narrative-in-i-reigns-i-)) | all cards compete each turn |
| Storylets gated by qualities (QBN) | Fallen London; cited by Reigns ([Emily Short](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)) | storylet = text + choice + outcome; shown when quality thresholds are met |
| Scheduled slots then skill checks | Long Live the Queen, Princess Maker | player allocates time; events check stats on a calendar |
| Trigger/immediate/option/after with scopes and on-actions | CK3 ([wiki](https://ck3.paradoxwikis.com/Event_modding)) | richest; script language |
| JSON "packs" with choices, weighted outcomes, `goto` chains, cooldowns, `once`, `repeatDecay`, `forced`, "quiet year" dummy entry | lifesim (CommunityPokeOrg) ([README](https://raw.githubusercontent.com/CommunityPokeOrg/lifesim/HEAD/README.md)) | closest to a BitLife-style data model |
| Dice/attribute-check events | lifely ([interactive-events.ts](https://raw.githubusercontent.com/CarboxyDev/lifely/HEAD/lib/data/interactive-events.ts)) | `AttributeCheck{attribute,difficulty,success,failure}`, `DiceChallenge`, `MultiStageEvent{stages[{prompt,choices[{nextStage}]}]}` |
All HIGH for what each source states.

### 2.2 Branching

- Life Restart: result-of-event branching (`branch` conditions after effect) with recursion; most variation comes from weighted pools plus conditions, not authored trees. HIGH.
- Reigns: mostly flat cards with flags and occasional mini-storylines; "adaptive narrative" emerges as the player links unconnected cards. HIGH.
- lifesim: choices own weighted `outcomes`, each with optional `goto`, chain targets use `weight: 0` so they appear only via goto. HIGH.
- QBN (Fallen London): no branching tree; content gated by numeric qualities; easy to add content without breaking others, but heavy bookkeeping ([Emily Short](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)). HIGH.

### 2.3 Condition / requirement systems

- Life Restart: string DSL (`AGE>10`, `STR<2&MNY<3`, `(a)|(b)`, `TLT?[ids]`, `EVT?[ids]`, cross-life `AEVT?`, `AACH?`, `TMS`) shared across events, talents and achievements ([condition/index.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/condition/index.ts)). HIGH.
- lifesim: JSON tree `{kind: all|any|not, conditions[]}` with atoms for age, stat, money, trait, flag, past choices; zod-validated, "no eval, no code in packs", checks unique ids and dangling gotos ([README](https://raw.githubusercontent.com/CommunityPokeOrg/lifesim/HEAD/README.md)). HIGH. Better for tooling and validation than a string DSL; worse for hand-editing in a spreadsheet.
- CK3: `trigger = { ... }` blocks; scopes; `ai_chance`. HIGH.

### 2.4 Stat models

| Game | Stats |
|---|---|
| Alter Ego | 12 personality traits, hidden, gate later nodes |
| Life Restart | CHR, INT, STR, MNY, SPR + LIF + AGE; current/highest/lowest history |
| Reigns | 4 faction meters; 0 or 100 = death |
| Princess Maker 2 | body, skills, mental (sin, morals, temperament), stress, zodiac/blood type modifiers |
| Long Live the Queen | 42 skills + 4 emotion axes + hidden kingdom stats |
| CK3 | 6 skills + traits + stress |
| lifesim (OSS) | health/happiness/smarts/looks 0-100, unbounded money, traits, free flags, NPC relationship meters -100..100, ailments |
| Everlife | 8 life stats (mental/physical health, social, romance, family, career, finances) |
All HIGH where sourced above (Everlife from [App Store](https://apps.apple.com/us/app/everlife-life-simulator/id1603664467)).

### 2.5 Randomness

- Weighted tables everywhere (Life Restart `id*weight`, Reigns bag size, lifesim `weight`, `weightModifiers` on stat). HIGH.
- Rarity tiers with soft-pity scaling by lives played/achievements (Life Restart). HIGH.
- Seed support: lifesim states "Deterministic per seed" ([README](https://raw.githubusercontent.com/CommunityPokeOrg/lifesim/HEAD/README.md)); Life Restart injects an RNG into core functions (code). HIGH. A seed-based daily or share-a-life feature: neither shipped one that I verified (unverified).
- "Quiet year" filler entries to avoid event-every-year fatigue (lifesim). HIGH.
- Skill-check + dice (lifely: d-types, advantage/disadvantage). HIGH (code).

### 2.6 Replay value mechanics

| Mechanic | Example | Source |
|---|---|---|
| Lock a perk for next life | Life Restart (1 talent) | Summary.tsx |
| Pity/odds scaling with plays | Life Restart | config.ts |
| Mode unlocked after N lives | Life Restart celebrity mode at 10 | play.ts |
| Hidden achievements with trigger timings | Life Restart (35 hidden of 165) | xlsx |
| Many endings | Princess Maker 2 (74), Hatoful (13-14), LLtQ | Wikipedia |
| True-route unlock after N endings | Hatoful Boyfriend | Wikipedia |
| Permanent upgrades from death | Hades, Rogue Legacy | Wikipedia |
| Heirs with traits/inheritance | Rogue Legacy, CK3, Hobo CEO | Wikipedia, App Store |
| Learn-the-calendar mastery | Long Live the Queen | Emily Short |
| Leaderboard | Hobo CEO; deliberately absent in Life Restart | App Store; woshipm |
| Content updates as replay fuel | Everlife "60+ free updates a year" | App Store |
All HIGH or MEDIUM per the individual sources above.

### 2.7 Shareable end-of-life summaries (evidence)

- Life Restart: screenshot of the rank-labelled final screen was the share unit; no in-app share generator in the current code (see 1.2). Press attributes the spread to these screenshots ([woshipm](https://www.woshipm.com/it/5129592.html), [qbitai](https://www.qbitai.com/2021/09/28407.html)). HIGH (code) / MEDIUM (press).
- Why the screen is shareable (my reading from the data): extreme tier names ("Legendary", "Hell", "immortal lifespan") are funny at both ends; one-line list of the 3 talents is a "build"; the age ladder has a punchline at the bottom (died in the womb). MEDIUM (inference).
- Explicit lack of leaderboard prompted sharing of builds rather than competing on ranks (stated in the game text per woshipm). MEDIUM.
- Other titles' share mechanics (Reigns, Everlife, 100 Years): unverified.

---

## 3. Comparison table

| Game | Format | Agency in play | Randomness | Meta/replay | Monetization | Scale/reception (verified) | Conf. |
|---|---|---|---|---|---|---|---|
| Alter Ego (1986/mobile) | menu vignettes, 7 life phases | high per node, 1,000+ questions | little (authored) | male/female versions, replay different paths | 1986 $35; now $4.99 iOS/Steam | iOS 4.38 (186); Steam 65% (47) | HIGH |
| Life Restart | auto-played year log, build screen | none during life; build + lock only | talent draw 889/100/10/1, weighted yearly events | lock talent, odds scale, celebrity mode, 165 achievements | free web (MIT); licensed mobile with ads (per zh-wiki) | 200M plays/3 days; 10.4k GitHub stars | HIGH |
| Reigns | swipe cards, 4 meters | binary choice every card | filtered weighted bag | dynasty of reigns, many cards (800-1,300) | premium $2.99; Netflix for Three Kingdoms | 2M copies by 2019; MC iOS 87; studio closed | HIGH |
| Princess Maker 2 | monthly scheduling, ages 10-18 | high: schedule + events | blood type/zodiac drift, event rolls | 74 endings | premium; Crunchyroll membership mobile port | 1M+ franchise by 2005 | HIGH |
| Long Live the Queen | weekly class scheduling, 40 weeks | high + skill checks | check outcomes | many deaths, multiple endings, hidden timeline | premium PC | 94% of 4.7k Steam reviews | HIGH |
| CK3 | grand strategy with character events | very high | trait/stress/event weights | heir continues, dynasty renown | premium + DLC chapters | 4M+ copies, MC 91 | HIGH |
| Choices / Episode / Chapters | episodic visual-novel stories | choice menus | none (authored) | many titles, UGC (Episode) | F2P: keys/passes + diamonds/gems + ads + VIP sub | Choices 100M+ DL, USD 544M lifetime | MEDIUM-HIGH |
| 100 Years (Voodoo) | per-year choice levels | low (forced right answer reported) | n/a | n/a | ads + gems + no-ads IAP | 181k US ratings | MEDIUM |
| Everlife | swipe by season | medium (1 action/season) | scenario decks | content decks/expansions | $0.99-4.99 packs | 4.57 (4.4k) | HIGH |
| Hobo CEO | finance/life management | high | market/events | inheritance, leaderboards | boosters, life-expectancy IAP | 4.76 (9.1k) | HIGH |
| lifesim (OSS) | BitLife-style event engine | choices per event | weighted outcomes, seeds | pack mods, editor | none (OSS) | tiny (new repo) | MEDIUM |
| Hades / Rogue Legacy | action roguelite | action | procedural | death-driven meta progression | premium | Hades 1M+ | MEDIUM-HIGH |

---

## 4. Implications for our mobile life-sim game (8 to 12 bullets)

Each bullet is my inference from the evidence above, labelled by how strongly the evidence supports it.

1. **Make events pure data with one shared condition language.** Life Restart's whole content layer is rows (`id, text, rarity, effects, include, exclude, branch`) and one string DSL used for events, talents and achievements, which let one writer ship ~1.7k events in two weeks ([event.types.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/packages/data/src/event.types.ts)). Prefer a validated JSON/tree form like lifesim's (zod schema, dangling-goto checks) so tooling can catch authoring bugs. HIGH for the pattern, MEDIUM for choosing JSON over strings.
2. **Put randomness and "build" at the start of each life, as a draw.** A 10-card talent draw with rarity tiers is the entire hook of the most viral entry; Life Restart's odds (889/100/10/1) and soft-pity scaling by lives played and achievements are a ready template ([config.ts](https://raw.githubusercontent.com/VickScarlet/remake/main/apps/web/src/config.ts)). Keep the RNG injectable so lives are seedable and testable. HIGH.
3. **Mix modes of agency.** Auto-play (Life Restart) went viral but players hit "insufficient content" and convergence; the large mobile challengers use choice menus or swipes (Everlife, Life Choices) and are criticised when choices are fake (100 Years reviews). Plan: auto-advance routine years, stop for a small number of high-stake choices per life, and make those choices visibly change outcomes. MEDIUM.
4. **Design the end-of-life screen as the share unit from day one.** Life Restart relied on user screenshots; we can generate a card: rank labels per stat with extreme tiers, build (talents), age title, one-line "cause of death", plus a seed/code to replay the same life. The share-image feature was not shipped in the reference code, so this is an opportunity, not a copy. MEDIUM (virality causality inferred).
5. **Use cheap replay hooks that are data, not systems:** lock one perk into the next life, mode unlocks at N lives, hidden achievements fired at distinct timings (start/year/summary/end), a legacy/heir choice (Rogue Legacy: pick 1 of 3 random heirs with traits; CK3 trait inheritance; Hobo CEO inheritance). HIGH for existence, MEDIUM for fit.
6. **Gate content by quality-based state (QBN) so adding content never breaks old content.** Use filtered, weighted pools with cooldown/once/repeatDecay and a "quiet year" filler (lifesim) and a "bag" with relevance weights (Reigns); add life-memory flags so later events call back to earlier ones (Wildermyth, Hades). HIGH for the techniques.
7. **Writing voice is the product.** Life Restart's dark-humour copy was cited as the reason people shared; Reigns won a writing award; Alter Ego's praised writing is why it still has fans. Budget more for writers/localization (Vietnamese and English) than for art. MEDIUM-HIGH.
8. **Monetization: choose the model before building content gates.** Evidence: premium works but did not sustain Nerial; Choices earned USD 544M lifetime with keys/diamonds/ads/VIP but is criticised as pay-to-win; Everlife sells content decks (0.99-4.99) and has no gem economy; Hobo CEO sells life-expectancy extensions. Recommendation: lean to expansion packs plus ad removal plus cosmetic/legacy boosts, avoid selling "better outcomes" per choice. MEDIUM (strategic judgement on top of HIGH facts).
9. **Beware content exhaustion and ship a content cadence.** Life Restart reviews say content runs out; Everlife advertises 60+ updates per year; CK3 funds long-term content via DLC chapters. Plan live-ops or packs, and plan authoring tools (lifesim's visual node editor) so non-engineers add events. MEDIUM-HIGH.
10. **Keep death meaningful.** Reigns, Hades, Long Live the Queen and Rogue Legacy turn death into progress (unlocks, logged deaths, story). Log every cause of death as a collectible and use it to unlock content. MEDIUM-HIGH.
11. **Protect against clones and ship fast; open sourcing is a double-edged sword.** Life Restart's MIT repo spawned dozens of ports and "official" clones that hurt the original developer's reputation per zh-wiki; closed-source or licensed content matters if monetizing. MEDIUM.
12. **AI-generated events are an experiment, not a foundation.** The AI fork shows it is feasible (events from age, stats, tags, last 5 events) but needs a live API per event, has no verified quality or cost data, and removes balance control. If used, treat it as optional flavour on top of authored events. LOW-MEDIUM.

---

## 5. Gaps and unverified items

- "Peter Lorenz / Jetapp" attribution for Alter Ego: not found (see section 0).
- Life Restart: TapTap official revenue/DAU, whether the mobile app has a built-in share button, exact precedence direction of `|level` tiers, developer interview details (Gamersky article could not be parsed).
- Student Life / Teen Life specific titles; idle "life" incrementals' mechanics and monetization; Chapters details beyond store data; Dream Daddy revenue (third-party estimate only).
- Nerial closure details from Kotaku (403); GameDev.net summary used instead.
- Princess Maker mobile port quality (7 ratings); Princess Maker: Children of Revelation developer name differs between sources (D-ZARD per RPGSite snippet vs GEAR2 on Steam page).
- Hades/Slay the Spire parallels limited to Hades, Rogue Legacy, Wildermyth; Slay the Spire not examined.
- No Google Play data collected (iTunes only).
