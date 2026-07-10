# System capacity vs. Webflow & Framer (July 2026)

Internal, honest assessment of our stack — `@aagf470/ui` (17 sections × variant/expression/columns axes, 7 style recipes × any accent), Payload CMS (41 blocks, EN/ES localization, media uploads, curated editing), static preview scaffold (`apps/freelance-template`), generic prerender harness (SEO/AI-readability), self-hosted on RAYA — against the two "pro" visual builders. Platform facts verified July 2026.

## Where we're genuinely ahead

| Axis | Us | Webflow | Framer |
|---|---|---|---|
| **Client's yearly cost** | $200–$650/yr (flat, in writing) | ~$300/yr site plan (+ bandwidth overages; 2026 repricing cut Premium to 50GB) | $120–$360/yr + $20/mo per editor seat |
| **Bilingual (EN/ES)** | Included, config-level | **$9–29/locale/mo** add-on (~$216+/yr for 3 locales) | **$20/locale/mo** (~$240/yr per locale) |
| **Exit / portability** | Runnable repo + content export, deploys anywhere — in writing | Static export only; **CMS pages export empty**, forms/search break | **Zero code export**; total hosting lock-in |
| **Content modeling** | Payload: unbounded collections/relations (Postgres) | 20k items / 40 collections (Premium) | 2.5k items (Basic), lighter relational CMS |
| **Editor safety** | Curated blocks — clients literally can't break layout | Designer/Editor split confuses non-technical clients | Good on-page editing, but seat fees per editor |
| **Stop-paying behavior** | Site keeps running (static + our hosting terms) | Site plan lapses → site down | Site down |
| **AI/SEO readability** | Prerendered HTML + JSON-LD + llms.txt, verified 3/3 | Good SEO control | Improved (SSR), still lighter technical control |

The structural difference: platforms monetize per-feature and per-seat (localization, editors, bandwidth, items); our marginal cost for those is ~zero, so we can bundle them and still be price-comparable. And ownership isn't a feature we compete on — it's a category they can't offer at all.

## Where they're honestly ahead

1. **Visual freeform design + animation.** Framer's Figma-like canvas and native animations, and Webflow's free GSAP integration (post-acquisition), beat our recipe system for bespoke motion-heavy one-offs. Our animation story is CSS transitions + the Reveal wrapper — fine for small business, thin for a cinematic brand site.
2. **Designer iteration speed.** In Webflow/Framer a designer restyles live, visually. Our per-client look = recipe + accent (+ CSS tokens); a truly novel layout means writing a component. The 7-recipe × expression system covers small-business range but is a curated menu, not a canvas.
3. **AI tooling.** Framer Workshop/Wireframer and Webflow's AI assistant generate components/pages natively. Our equivalent is "Claude Code writes components" — arguably stronger, but it's a developer loop, not a client-facing one.
4. **Day-one demos.** Framer can produce a flashy animated prototype in an afternoon. Our static-preview scaffold is config-fast but visually bounded by the section library.
5. **Ecosystem trust.** "Built on Webflow" reassures some buyers; our stack requires trusting *us* (mitigated by the ownership/exit guarantee — that's the counter-story, tell it).

## Verdict + gaps worth closing

**For our ICP (small local/boutique businesses, bilingual, ownership-minded, $600–$1,900 budgets) the stack is competitive-to-superior today** — cheaper on a like-for-like feature basis (especially bilingual), safer to edit, and categorically better on exit. **We should not chase** Framer-grade motion design or freeform canvas — that's a different market (venture-y brand sites) with a treadmill we've avoided on purpose.

Worth closing, in order:
1. **Motion floor:** 2–3 more entrance/scroll animation presets in the library (recipe-driven), so previews demo with more life. Small, high-perceived-value.
2. **More expressions** on the top sections (hero/featureGrid have 3 each; most others 1) — the audit's variability thread, continued.
3. **Demo velocity:** pre-built "show sites" per recipe (the fake-sites plan) so a sales call can show 7 distinct looks in five minutes — that's our answer to Framer's flash.
4. **Keep an eye on** Webflow's 2026 repricing fallout (ex-Business sites hit by bandwidth cuts) — those owners are exactly "burned by platform pricing" prospects, a natural article/audience later.
