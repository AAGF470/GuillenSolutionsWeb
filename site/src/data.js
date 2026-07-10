// ---------------------------------------------------------------------------
// Guillen Solutions — shared content data.
// Pricing, add-ons, and ownership promises used across Home + Configurator.
// Keeping it here means the numbers live in exactly one place.
// ---------------------------------------------------------------------------

export const CONTACT_EMAIL = 'contact@guillensolutions.com'

// Text-only contact lines — no voice calls on either. Display strings plus the
// raw values used to build sms: and wa.me links.
export const CONTACT = {
  email: 'contact@guillensolutions.com',
  textLine: { display: '(617) 528-0733', sms: '+16175280733' },       // Google Voice, text only
  whatsapp: { display: '(346) 332-6885', link: 'https://wa.me/13463326885' }, // WhatsApp, text only
}

export const PACKAGES = [
  {
    id: 'freelance',
    tag: 'Solo & freelancers',
    name: 'Freelance / Solo',
    price: '$600',
    period: 'first year, all-in',
    description: 'A polished, credible presence for independent professionals, without the custom-build cost.',
    note: 'After year one: $200/yr hosting + domain renewal.',
    features: [
      '5 pages — 3 designed for you + 2 you assemble yourself',
      '1 CMS post format — unlimited categories & posts',
      'CMS imports: none included ($7/item if you\'d like us to import)',
      '10 GB storage',
      'Standard add-on rates',
    ],
    firstYear: 600,
    recurring: 200,
  },
  {
    id: 'standard',
    badge: 'Most popular',
    tag: 'Custom in-house design',
    name: 'Standard Business',
    price: '$950',
    period: 'first year, all-in',
    description: 'Custom in-house design on our component system — fast, modern, and easy to update yourself.',
    note: 'After year one: $350/yr hosting + domain renewal.',
    features: [
      'Up to 10 pages — 6 designed by us + 4 you assemble yourself',
      '2 CMS post formats — unlimited categories & posts',
      '30 CMS imports included, then $7/item',
      '20 GB storage',
      '15% off CG render work when bundled',
    ],
    featured: true,
    firstYear: 950,
    recurring: 350,
  },
  {
    id: 'enhanced',
    tag: 'Active management',
    name: 'Online Business Enhanced',
    price: '~$1,900',
    period: 'first year, actively managed',
    description: "Everything in Standard, bigger — plus ongoing management for owners who'd rather not handle updates themselves.",
    note: 'After year one: ~$650/yr — active management is ongoing work.',
    features: [
      'Up to 12 pages — 8 designed by us + 4 you assemble yourself',
      '4 CMS post formats — unlimited categories & posts',
      '50 CMS imports included, then $7/item',
      '30 GB storage',
      'Active management: monthly SEO upkeep, 2 seasonal changes/yr, a custom inquiry form, a small integration, full Spanish translation, 2 page redesigns/yr (then 50% off), a QR menu',
      '20% off CG render work when bundled',
    ],
    firstYear: 1900,
    recurring: 650,
    approxPrice: true,
  },
  {
    id: 'private-hosting',
    tag: 'WordPress or dedicated server',
    name: 'Private Hosting Plan',
    price: 'Pricing TBD',
    period: 'in development',
    description: 'For clients who want WordPress or their own isolated/dedicated server — maximally portable, so any developer can take it over. Specs & pricing are being finalized.',
    note: 'In development — reach out if this is what you need.',
    features: [
      'WordPress, or your own dedicated / managed server',
      'Maximum portability — any developer can maintain it',
      'Kept off our main stack, for isolation',
      'Page / CMS / import specifics being finalized',
    ],
    tbd: true,
  },
]

// Baseline every plan includes — no tier is charged more for these. Rendered
// as the "what every plan includes" section above the plan cards.
export const BASELINE_INCLUDES = [
  { icon: 'star',   title: 'Custom design', body: 'Built on our in-house component library — a tailored look, never a template.' },
  { icon: 'zap',    title: 'SEO with AI crawlability', body: 'Verified on our own site (3/3 AI-readability, 97 desktop performance). Fast, technically optimized, structured for search and AI.' },
  { icon: 'map',    title: 'Google indexing (free)', body: 'We verify your site and submit it to Google Search Console so it\'s indexed and findable. (Google Maps is a separate add-on.)' },
  { icon: 'layers', title: 'Your own CMS', body: 'A simple editor showing only what you change — unlimited categories and posts on every plan.' },
  { icon: 'shield', title: 'Managed hosting', body: 'SSL, backups, uptime — you never think about servers.' },
  { icon: 'globe',  title: 'A free domain (year one)', body: 'Registered in your name, up to a $50 domain-value credit. Premium domains above $50 billed at cost.' },
  { icon: 'check',  title: 'Full ownership', body: 'Domain, content, accounts, and every login in your name. No lock-in, leave anytime.' },
  { icon: 'wrench', title: 'Standard add-on rates', body: 'Add-on prices are identical on every plan — you never pay more for an extra because of your tier.' },
]

// kind: 'onetime'  → one-time, adds to first-year all-in
//       'recurring' → adds to the recurring yearly total
//       'quoted'    → shown but not summed (needs a per-business quote)
//       'per-unit'  → priced per item/page; quantity chosen in the configurator
export const ADDONS = [
  {
    id: 'phone',
    name: 'AI Phone Menu',
    price: '$200 setup + subscription',
    cadence: 'One-time setup',
    body: 'A natural-sounding AI voice answers your line and routes callers — "press 1 for sales, 2 for support" — so you never miss a call or sound small. We script and produce the voice menu; the phone number and voice service then run on a low-cost subscription in your own name, paid by you directly.',
    amount: 200, kind: 'onetime',
  },
  {
    id: 'email',
    name: 'Business Email & Workspace',
    price: 'quoted',
    cadence: 'Recurring',
    body: 'Custom email at your domain via Google Workspace — inbox setup, or migration from an old Office/email account. Your account, quoted as a flat yearly number.',
    amount: null, kind: 'quoted',
  },
  {
    id: 'logo',
    name: 'Logo & Business Cards',
    price: '$225',
    cadence: 'One-time',
    body: 'A professional logo (two formats) plus a matching business-card design, with a pickup order set up at a local print shop in your name.',
    amount: 225, kind: 'onetime',
  },
  {
    id: 'form',
    name: 'Custom Inquiry Form',
    price: '$250',
    cadence: 'One-time',
    body: 'A contact/quote form that sends inquiries straight to your inbox. Submissions go to you — none of your customer data sits with us.',
    amount: 250, kind: 'onetime',
  },
  {
    id: 'rush',
    name: 'Rush Delivery',
    price: '$400',
    cadence: 'One-time',
    body: 'Need your site in days instead of the standard week or two? We clear the schedule and move your build to the front of the line. Available on every plan.',
    amount: 400, kind: 'onetime',
  },
  {
    id: 'gbp',
    name: 'Google Business Profile',
    price: '$300',
    cadence: 'One-time',
    body: 'We get your business on Google Maps — or clean up your existing presence. All-inclusive: a guided walkthrough of creating and verifying your Google Business Profile, set up in your name.',
    amount: 300, kind: 'onetime',
  },
]

// ── On-demand services ───────────────────────────────────────────────────────
// Deliberately separated from the launch add-ons so choosing a package stays
// simple: NOTHING here needs deciding today. These are delivered whenever a
// client ends up needing them — bounded, fixed-scope, quoted in writing.
export const ON_DEMAND = [
  {
    id: 'newsletter',
    name: 'Newsletter Setup',
    price: '$225',
    cadence: 'One-time',
    body: 'Signup forms built into your site, a newsletter account opened in YOUR name (free tiers cover most small businesses), and an email template designed to match your website. You write and send; nothing routes through us.',
    amount: 225, kind: 'onetime',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    price: '$150/page',
    cadence: 'Per page',
    body: 'A focused one-page pitch for a promotion, season, or single service — composed from your site\'s component system so it matches perfectly and ships fast.',
    amount: 150, kind: 'per-unit', unit: 'page', unitPlural: 'pages',
  },
  {
    id: 'qrmenu',
    name: 'QR Menu / Price Sheet',
    price: '$120',
    cadence: 'One-time',
    body: 'Your menu or price list as a clean, print-ready page with a QR code. Because it reads from the same content as your site, updating a price updates both — free, forever.',
    amount: 120, kind: 'onetime',
  },
  {
    id: 'seasonal',
    name: 'Seasonal Refresh',
    price: '$45/swap',
    cadence: 'Per swap',
    body: 'Holiday banner, seasonal promo, storm notice — we swap featured content and imagery for the season and swap it back after. A content change in our system, not a redesign.',
    amount: 45, kind: 'per-unit', unit: 'swap', unitPlural: 'swaps',
  },
  {
    id: 'items',
    name: 'Extra Items (beyond your plan\'s included)',
    price: '$7/item',
    cadence: 'Per item',
    body: 'Adding items yourself is always free and unlimited. This is for when you\'d rather we do the import — we add each product, menu item, or listing for you. Add a Spanish version of any item for $2 more (both languages in one entry).',
    amount: 7, kind: 'per-unit', unit: 'item', unitPlural: 'items',
  },
  {
    id: 'spanish',
    name: 'Spanish Pages',
    price: '$30/page',
    cadence: 'Per page',
    body: 'Full pages hand-translated by a native Spanish speaker (never machine-translated), with the layout adjusted to stay clean. Items are $2 each; pages are priced here.',
    amount: 30, kind: 'per-unit', unit: 'page', unitPlural: 'pages',
  },
  {
    id: 'extrapage',
    name: 'Extra Pages & Redesigns',
    price: '$75–200',
    cadence: 'Quoted',
    body: 'New pages or reworked layouts designed by us, quoted by page depth before we build. Assembling pages yourself from the component library is always free — this fee is only for pages we design.',
    amount: null, kind: 'quoted',
  },
  {
    id: 'integration',
    name: 'Large integration',
    price: 'from $400',
    cadence: 'One-time, per integration',
    body: 'We build a full storefront experience on an outside engine — Shopify or Square — with our components as the fast, custom-designed skin: product browsing, live availability, even the cart, all reading from your platform account ("know before you go"). Checkout, payments, and private customer data stay with the platform — their bank-grade security, not a boutique\'s. Transferable, and accurate as of the last sync. $400 is the starting point for systems with clean APIs; confirmed or quoted higher after we research your system.',
    amount: 400, kind: 'onetime', approx: true,
  },
  {
    id: 'posttype',
    name: 'Custom Post Format',
    price: '$125',
    cadence: 'One-time',
    body: 'A new content type designed around your business — blog posts, news updates, case studies, community announcements. We design the format once; after that you publish unlimited posts yourself, free.',
    amount: 125, kind: 'onetime',
  },
]

// ── CG product renders ───────────────────────────────────────────────────────
// A separate visual service (not web). The economic engine: a standardized
// Unreal Engine scene system means we model a product ONCE, then every extra
// shot is cheap. So we tier the variable part (modeling complexity) and keep
// additional renders / multi-shot packages affordable — accessible to small
// businesses, fairly paid for the real modeling time. Deliberately priced
// below the market's $800–3,500 full-package range.

export const CG_RENDER_LEAD =
  'Studio-quality product photography, made in software — no product samples shipped, no photo studio booked, no reshoot fees. We build a 3D model of your product once, then light and render it in our standardized studio scene. The first shot comes with the model; every shot after that is cheap, because the hard part is already done.'

// Complexity-tiered per-product base. Each covers MODELING + the first studio
// shot. We tier (never flat-rate) because modeling time varies far more than
// render time.
export const CG_RENDER_TIERS = [
  {
    id: 'simple',
    name: 'Simple product',
    price: '$150–250',
    per: 'per product · model + first shot',
    body: 'Clean, single-form products with straightforward materials.',
    examples: 'Bottles, jars, boxes, mugs, candles, simple packaging.',
  },
  {
    id: 'standard',
    name: 'Standard product',
    price: '$250–400',
    per: 'per product · model + first shot',
    body: 'Multi-part products, layered packaging, or moderate detail.',
    examples: 'Appliances, tools, cartons with artwork, bags, apparel.',
    featured: true,
  },
  {
    id: 'complex',
    name: 'Complex product',
    price: '$400–600+',
    per: 'per product · model + first shot',
    body: 'Intricate geometry, tricky materials, or fine mechanical detail.',
    examples: 'Jewelry, electronics, glass/liquids, transparent or mechanical parts.',
  },
]

// Once the model exists, more shots are cheap — this is the whole advantage.
export const CG_RENDER_SHOTS = [
  {
    id: 'studio',
    name: 'Additional studio render',
    price: '$40–75',
    per: 'per shot',
    body: 'Another angle, a detail crop, or a color/label variant in the same clean studio scene. The model already exists, so each extra shot is fast — this is the pipeline advantage passed straight to you.',
  },
  {
    id: 'lifestyle',
    name: 'Premium lifestyle shot',
    price: '$100–250',
    per: 'per shot',
    body: 'Your product staged in a custom environment — a kitchen counter, a desk, an outdoor set — composed and lit as a hero image for ads, banners, and your homepage.',
  },
]

// The accessible small-business sweet spot: multi-shot bundles built on one
// model, so a business gets a whole listing gallery affordably.
export const CG_RENDER_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter listing set',
    price: '$425',
    body: 'One product modeled + 4 studio shots — front, back, three-quarter, and a detail crop. A complete, consistent product-listing gallery.',
    includes: ['1 product model (simple–standard)', '4 studio renders', 'White-background, marketplace-ready', 'All full-resolution files, yours to keep'],
  },
  {
    id: 'full',
    name: 'Full listing pack',
    price: '$600',
    badge: 'Most popular',
    featured: true,
    body: 'One product + 6 studio shots + 1 premium lifestyle scene — everything a marketplace listing and a homepage feature need, in one go.',
    includes: ['1 product model (up to complex)', '6 studio renders', '1 lifestyle hero shot', 'All full-resolution files, yours to keep'],
  },
  {
    id: 'launch',
    name: 'Product launch set',
    price: '$700',
    body: 'One product + 8 shots including 2 lifestyle scenes and color/label variants — a full kit for a launch across your store, ads, and social.',
    includes: ['1 product model (up to complex)', '6 studio renders + variants', '2 lifestyle scenes', 'Sized for store, ads & social'],
  },
  {
    id: 'motion-launch',
    name: 'Motion launch set',
    price: '$1,100–1,400',
    body: 'One product + the full still gallery + a turntable + a short product video — a complete launch kit with motion. The premium package for product businesses going all-in on a launch.',
    includes: ['1 product model (up to complex)', 'Full still gallery', 'Turntable / 360° spin', 'Short product video', 'Sized for store, ads & social'],
  },
]

// ── Product motion / animation ────────────────────────────────────────────────
// The premium motion tier — same model, now in motion. Positioned on accurate,
// deterministic, brand-safe motion (the real product, every frame consistent),
// not on "AI can't do this." Reuses the existing model, so it's incremental.
export const CG_RENDER_MOTION = {
  lead:
    'Motion sells. A product that turns, catches the light, and shows every angle converts better than any still — and because we animate the same 3D model we already built, it\'s the actual product in motion, perfectly consistent, every frame. No reshoots, no drift, yours to keep.',
  items: [
    { id: 'turntable', name: 'Turntable / 360° spin', price: '$150–300', per: 'per product', body: 'A smooth looping rotation of your product on the standard studio background — the classic "spin to see all sides." Built from the existing model; delivered as video + a loop-ready file. Lower end for simple products, higher for complex.' },
    { id: 'video',     name: 'Short product video', price: '$300–600', per: 'per clip', body: 'A composed 5–15s product clip — motion, light sweeps, detail push-ins, feature callouts — for ads, social, and your homepage hero. Priced by length and complexity.' },
    { id: 'lifestyle-anim', name: 'Premium lifestyle animation', price: '$500–900+', per: 'per scene', body: 'Your product animated within a styled scene — on a counter, a desk, an outdoor set — a hero motion piece for launches and paid campaigns. Quoted by scene and length.' },
    { id: 'motion-addon', name: 'Animation add-on (model already built)', price: 'from $120', per: 'add-on', body: 'Adding motion to a product we\'ve ALREADY modeled for stills — the cheapest path, since the asset already exists. A reason to come back after a still shoot.' },
  ],
  note:
    'Why motion is priced higher: it\'s more render and composition time than a still, and it\'s a premium deliverable — but it still reuses the model, so it stays far below the cost of a full video production shoot. Complexity/length-tiered or quoted per product, never flat-rate — same as stills.',
}

// The product-line play: one form, many variants — the single biggest saving
// for shops with big catalogs of the same physical shape.
export const CG_RENDER_VARIANT_NOTE =
  'Selling one product in many variants? If your line is 30 scents of the same candle jar, or 12 colorways of the same bottle, we model the form ONCE — then every label, color, or flavor variant is just an additional render, not a new model. A whole product line\'s imagery for a fraction of per-product cost. Tell us about your line and we\'ll quote it that way automatically.'

export const CG_RENDER_NOTES = {
  bundled: 'Bundled with a website build — 15% off any render work (20% for Online Business Enhanced clients), added to your order.',
  standalone: 'Standalone, no website needed — priced exactly as listed. You still own every file at full resolution.',
  market: 'Full-service product-CG studios charge $800–$3,500 per product. Our standardized studio-scene pipeline lets us sit well below that — genuinely accessible — while still tiering by real modeling effort, so complex products are priced fairly and simple ones stay cheap.',
  quote: 'We complexity-tier or quote per product — never flat-rate — because modeling time varies far more than render time. You get a fixed number per product, agreed in writing, before any work starts.',
}

export const CG_RENDER_ADVANTAGE = [
  { icon: 'wrench', title: 'Model once', body: 'We build an accurate 3D model of your product a single time. That model is the asset everything else is generated from — and it never needs rebuilding.' },
  { icon: 'zap',    title: 'Render many', body: 'New angles, backgrounds, colors, and lifestyle scenes all come off the same model in our standardized studio setup — so every shot after the first is fast and cheap.' },
  { icon: 'star',   title: 'Priced to match', body: 'Because extra shots cost us little, we can offer real multi-shot packages a small business can actually afford — while staying fairly paid for the modeling.' },
]

// ── What we offer — the service lines of a digital business solutions company.
// Websites remain the core, but they're one line among several now.
export const SERVICES = [
  {
    id: 'web',
    tag: 'Core service',
    title: 'Websites you own',
    price: 'from $600',
    body: 'Custom, content-managed sites with flat all-in pricing — domain, hosting, CMS, and every login in your name from day one.',
    to: '/pricing',
    linkLabel: 'See plans & pricing',
  },
  {
    id: 'renders',
    tag: 'New',
    title: 'CG product renders',
    price: 'from $150',
    body: 'Studio-quality product imagery from a 3D model we build once — listing packs and lifestyle heroes, no photo studio, no reshoots.',
    to: '/renders',
    linkLabel: 'Explore product renders',
  },
  {
    id: 'business',
    tag: 'Set up in your name',
    title: 'Get set up & found',
    price: 'add-ons',
    body: 'Google Business Profile so locals find you on Maps, plus email at your domain, an AI phone menu that routes callers, and logo & cards — the essentials that get you discovered, all owned by you.',
    to: '/pricing',
    linkLabel: 'Browse add-ons',
  },
  {
    id: 'ondemand',
    tag: 'Whenever you need it',
    title: 'On-demand work',
    price: 'from $45',
    body: 'Landing pages, newsletters, QR menus, translations, seasonal swaps — fixed-scope jobs, quoted in writing, delivered fast.',
    to: '/on-demand',
    linkLabel: 'See the menu',
  },
]

// ── Getting found — search + AI discoverability (how we "do SEO") ────────────
// Honest, capability-backed: we build the technical groundwork search rewards
// and welcome AI assistants — but never sell ads or promise a ranking.
export const FOUND = {
  eyebrow: 'Found by search — and by AI',
  headline: 'Built to be discovered, not just built',
  lead: "Looking good is only half of it — getting found is the other half, so we build for it from day one. Every site is fast, mobile-first, and ships with the structured data and real, readable HTML that search engines and AI assistants need to understand and recommend your business. We'll set up your Google Business Profile too. What we won't do is sell you ads or promise a #1 ranking — anyone who guarantees that is guessing. We do the honest technical groundwork; the rest is earned.",
  points: [
    { icon: 'star',   title: 'Structured data, built in',      body: 'Every site ships with clean JSON-LD — the machine-readable schema that tells Google and AI assistants exactly what your business is, what you offer, and what it costs. Facts they can cite, not prose they have to guess at.' },
    { icon: 'zap',    title: 'Real HTML, not an empty shell',  body: 'Your pages are prerendered to readable HTML with the content baked in, so search crawlers and the AI tools people now use to vet businesses can read and cite you on the first pass — not a blank page waiting on JavaScript.' },
    { icon: 'layers', title: 'Fast & mobile-first',            body: 'Lightweight, mobile-first pages with the fundamentals search rewards — strong Core Web Vitals, semantic markup, and clean metadata — so your site competes on its merits, not on ad spend.' },
    { icon: 'shield', title: 'Open to AI, on your terms',      body: 'We explicitly welcome AI assistants — an llms.txt summary and an AI-friendly crawler policy — so tools like ChatGPT, Claude, Gemini, and Perplexity can find and recommend you, where more and more buyers now start their search.' },
  ],
}

// ── Where we are now — honest about being a new, owner-run studio ─────────────
// Closes the gap between an ambitious site and an early-stage business by
// turning "new and small" into the real advantages it is: direct access,
// low prices, personal accountability. Never claims a track record we lack.
export const WHERE_WE_ARE = {
  eyebrow: 'Where we are now',
  headline: 'A new studio — and honest about it.',
  lead: "Guillen Solutions is young and owner-run, and that's exactly why the deal is this fair. You work directly with the person building your site, prices are low because there's no agency overhead, and every promise on this page is one we can personally stand behind. We'd rather earn your trust with honest work than impress you with inflated claims. And we're proudly LGBTQ+ and Latino-owned — serving you in English and Español, both first-class.",
  points: [
    { icon: 'users',  title: 'You work with the builder',        body: 'No sales team, no account managers, no hand-offs — a direct line to the person actually designing and building your site.' },
    { icon: 'zap',    title: 'Early-client pricing',             body: "Today's rates are introductory. Start now and you lock in fair, gradual pricing as we grow — put in writing before you sign." },
    { icon: 'shield', title: 'Every claim, personally backed',   body: 'Small enough to stand behind each promise by name — ownership, exit terms, the number you were quoted. No fine-print games.' },
  ],
}

// ── Referral commission program ──────────────────────────────────────────────
// Open to ANYONE (clients, other business owners, friends) — a network
// incentive, not a client perk. Commission on the package a referral pays for.
export const REFERRAL_PROGRAM = {
  eyebrow: 'Referral program',
  headline: 'Know a business that needs us? Earn up to 10%.',
  lead: 'Anyone can refer — you don\'t have to be a client. When someone you send our way signs and pays for a package, you earn a commission: 10% of the first $600, plus 5% of anything above that. Refer as many people as you like.',
  steps: [
    { title: 'Send them our way',      body: 'Have them mention your name when they reach out — or tell us about them yourself. Either order works: whoever reaches us first, we simply confirm with the other. No sign-up, no dashboard, no forms.' },
    { title: 'They sign & pay',        body: 'Your referral picks any package — a website plan or a product-render package — and pays for it.' },
    { title: 'Paid same day, by Zelle', body: 'Once both sides name each other and the package is paid in full, we send your commission by Zelle the same day. 10% of the first $600, plus 5% of anything above.' },
  ],
  fine: 'Commission applies to the first package a new customer signs and pays for. Attribution is two-sided: the client names you and you name the client — in either order — and matching answers trigger same-day payment. No payout cycles, no minimums.',
}

export const GROWTH_NOTE =
  'As your site grows, extra pages or redesigns run $75–200 each, quoted by depth. And referrals pay: send us a customer who signs and get 10% of the first $600 (plus 5% of anything above) by Zelle, same day — client or not.'

export const REFERRAL_NOTE = null // merged into GROWTH_NOTE

// Primary markets — the areas we focus on, each with the local sub-areas we
// serve. Place names are the same in every language, so these live here (not
// in the ES overrides); only the section copy is translated. Rendered via the
// shared LocationGrid section. Photos are NOT stored here — they're uploaded
// through the CMS (a `locationGrid` block with image uploads); no image paths
// live in code. Until authored in the CMS, cards show a tidy pin placeholder.
export const MARKETS = [
  {
    id: 'new-york',
    name: 'New York, NY',
    areas: ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'],
  },
  {
    id: 'boston',
    name: 'Boston, MA',
    areas: ['Roxbury', 'South End', 'Seaport', 'Back Bay', 'Dorchester', 'Jamaica Plain'],
  },
  {
    id: 'north-houston',
    name: 'North Houston, TX',
    areas: ['The Woodlands', 'Klein', 'Spring', 'Tomball'],
  },
  {
    id: 'dallas',
    name: 'Dallas, TX',
    areas: ['Irving', 'Grand Prairie'],
  },
]

// Local-market SEO guides — one indexable, prerendered page per market. Each
// is a real service-area page (distinct copy, local FAQ, geo schema), not a
// doorway clone. `marketId` links to MARKETS so the served neighborhoods stay
// in one place. Spanish prose lives in content.es.js under the same key.
export const LOCATION_GUIDES = [
  {
    slug: 'web-design-new-york',
    marketId: 'new-york',
    city: 'New York', state: 'NY',
    metaTitle: 'Web Design for Small Businesses in New York City',
    metaDescription: 'Custom small-business websites, product renders, and business setup for New York businesses across all five boroughs — flat pricing, and you own everything. English & Español.',
    lead: 'Custom websites and product visuals for New York small businesses — built to stand out in the most competitive market in the country, and owned entirely by you.',
    intro: [
      'In a city where every block has competition, a generic template site disappears. We build New York small businesses a custom-designed site on our own component system — the polish of a bespoke build at a fraction of agency cost — so you look as established online as you are in your neighborhood.',
      'From Manhattan storefronts to Brooklyn studios and Queens service businesses, we\'re set up to work with owners across the five boroughs, remotely. You keep your domain, your content, and every login — no lock-in, in English or Spanish.',
    ],
    whyTitle: 'Why it matters in New York',
    why: [
      'Search is hyper-local: "near me" and borough-name searches decide who gets the call. We set up your site and Google Business Profile so you surface in the right neighborhoods.',
      'The bar is high. New York customers judge in seconds — a clean, fast, custom site signals you are the real thing.',
      "Bilingual by default: reach New York's Spanish-speaking customers with a fully translated site at no design premium.",
    ],
    faq: [
      { q: 'Do you meet clients in person in New York?', a: 'We work with New York clients remotely — calls, email, and screen-share — which keeps costs down and timelines fast. In-person visits are reserved for the Boston area.' },
      { q: 'Can you help my business show up on Google Maps in my borough?', a: 'Yes. Google Business Profile setup ($300) is one of our most popular add-ons for local NYC businesses — it often matters more than anything on the site itself.' },
      { q: 'Do you build online stores for NYC shops?', a: "We build a clean storefront skinned over Square or Shopify, so customers get live product and availability — while checkout, payments, and customer data stay with the platform's bank-grade security." },
    ],
  },
  {
    slug: 'web-design-boston',
    marketId: 'boston',
    city: 'Boston', state: 'MA',
    metaTitle: 'Web Design for Small Businesses in Boston, MA',
    metaDescription: 'Custom small-business websites, product renders, and business setup for Boston-area businesses — from Roxbury to the Seaport. Flat pricing, full ownership, in-person in Boston.',
    lead: 'Custom websites and product visuals for Boston small businesses — the one market where we work in person, from Roxbury to the Seaport.',
    intro: [
      "Boston is home base. It's the one market where we meet clients face to face — seeing your space, understanding your customers, and building a site that fits the neighborhood, whether that's a South End boutique or a Dorchester family business.",
      'Every site is custom-designed on our own component library, so you get a bespoke look without the agency invoice. You own your domain, content, and logins outright — and everything ships in English, Spanish, or both.',
    ],
    whyTitle: 'Why it matters in Boston',
    why: [
      "We're local: Boston clients get in-person meetings — the only market where that's on the table.",
      'Neighborhood search wins: from Back Bay to Jamaica Plain, we tune your site and Maps presence to the areas you actually serve.',
      "Speed counts: Boston's crowded, mobile-first audience won't wait for a slow site — ours score high on speed and are readable by AI assistants out of the box.",
    ],
    faq: [
      { q: 'Can we meet in person?', a: 'Yes — Boston is the one market where in-person meetings are standard. We can come to you anywhere in the metro, from Charlestown to Dorchester.' },
      { q: 'Which Boston neighborhoods do you work with?', a: 'All of them — Roxbury, the South End, Seaport, Back Bay, Dorchester, Jamaica Plain, and beyond. We tune your local SEO to the areas you serve.' },
      { q: 'Do you work with bilingual Boston businesses?', a: "Absolutely. Full English/Spanish sites are built in at no design premium — a real advantage in Boston's diverse neighborhoods." },
    ],
  },
  {
    slug: 'web-design-north-houston',
    marketId: 'north-houston',
    city: 'North Houston', state: 'TX',
    metaTitle: 'Web Design for Small Businesses in North Houston, TX',
    metaDescription: 'Custom small-business websites, product renders, and business setup for The Woodlands, Klein, Spring, and Tomball — flat pricing, full ownership, English & Español.',
    lead: 'Custom websites and product visuals for small businesses across North Houston — The Woodlands, Klein, Spring, and Tomball.',
    intro: [
      'North Houston is booming, and new customers search for local businesses every day. We build owners in The Woodlands, Klein, Spring, and Tomball a custom site on our own component system — so a growing business looks the part without an agency budget.',
      'We work with North Houston clients remotely, in English or Spanish, and you own everything: your domain, your content, and every login. No lock-in, no surprises.',
    ],
    whyTitle: 'Why it matters in North Houston',
    why: [
      'Fast-growing suburbs mean fast-growing competition — a custom, fast site helps you stand out as the area fills in.',
      'Local search is everything: we set up your site and Google Business Profile so Woodlands and Spring customers find you first.',
      "Bilingual reach: a fully Spanish-translated site connects you with North Houston's large Hispanic community at no design premium.",
    ],
    faq: [
      { q: 'Do you meet clients in person in Houston?', a: 'We work with North Houston clients remotely, which keeps timelines fast and costs low. In-person meetings are reserved for the Boston area, but calls and screen-share cover everything we need.' },
      { q: 'Which North Houston areas do you cover?', a: 'The Woodlands, Klein, Spring, and Tomball, plus the surrounding North Houston communities.' },
      { q: 'Can you help me rank for my town specifically?', a: "Yes — we optimize your site and Google Business Profile for the specific towns you serve, so you're not lost in greater-Houston results." },
    ],
  },
  {
    slug: 'web-design-dallas',
    marketId: 'dallas',
    city: 'Dallas', state: 'TX',
    metaTitle: 'Web Design for Small Businesses in Dallas, TX',
    metaDescription: 'Custom small-business websites, product renders, and business setup for Dallas, Irving, and Grand Prairie — flat pricing, full ownership, English & Español.',
    lead: 'Custom websites and product visuals for small businesses across the Dallas metroplex — including Irving and Grand Prairie.',
    intro: [
      'Our very first client site was a Dallas electrician — so the metroplex is close to home. We build Dallas-area businesses custom sites on our own component system: trust-first, fast, with quote forms that route straight to the owner.',
      'Serving Dallas, Irving, and Grand Prairie remotely, in English or Spanish. You own your domain, your content, and every login outright — no lock-in, ever.',
    ],
    whyTitle: 'Why it matters in Dallas',
    why: [
      'Service businesses live or die by the call: we build trust-first sites with quote forms that reach you instantly.',
      'Metroplex search is competitive: we tune your site and Google Business Profile to Irving, Grand Prairie, and your corner of DFW.',
      "Bilingual by default: reach Dallas's large Spanish-speaking market with a fully translated site, no design premium.",
    ],
    faq: [
      { q: 'Have you built for Dallas businesses before?', a: 'Yes — our first client site was Angel Electrical Services, a licensed Dallas electrician: trust-first design with a quote form that routes to the owner.' },
      { q: 'Which Dallas areas do you serve?', a: 'Dallas proper, plus Irving, Grand Prairie, and the surrounding metroplex.' },
      { q: 'Do you meet in person in Dallas?', a: 'We work with Dallas clients remotely, which keeps things fast and affordable. In-person meetings are a Boston-only offering, but calls and screen-share handle everything.' },
    ],
  },
]

// Renewal honesty — grandfathering means fair, disclosed pricing, not a rate
// frozen forever. Never promise "your price never changes."
export const PRICING_PROMISE =
  'Renewal rates are agreed in writing before you sign, so there are no surprises. Today\'s prices are early rates; existing clients keep fair, gradual pricing.'

// Where we fit — versus the alternatives a small business actually compares us to.
export const POSITIONING = [
  { icon: 'layers', title: 'vs. DIY builders',    body: 'Squarespace and Wix hand you a blank template and a monthly bill. We hand you a finished, custom-designed site with an editor made for your business.' },
  { icon: 'zap',    title: 'vs. freelancers',     body: 'Freelance builds run $1,500 to $8,000 and start from scratch every time. Our component system does the heavy lifting, so you get custom-looking work at a fraction of the cost.' },
  { icon: 'star',   title: 'vs. agencies',        body: 'Agency work starts around $6,000, with overhead to match. Our system delivers comparable polish without the minimums.' },
  { icon: 'shield', title: 'vs. predatory vendors', body: 'Some local vendors keep your domain, resell your leads, and bill you forever. With us you own everything, and we never touch your ad spend or your money.' },
]

// "You can do it yourself, free" — the fees are only for hands-off clients.
export const CMS_NOTE =
  'Because you own it, you can add or remove products and adjust page layouts yourself, anytime — no coding required, and no charge. The add-on fees are only for when you\'d rather we handle it for you.'

export const CMS_LEAD =
  'A CMS is just the screen where you log in to update your own site — change your words, prices, and photos, no code involved. Most are bloated and confusing. Yours is custom-built: it shows only the handful of things you actually change (prices, photos, products, hours) and hides everything else. A simple, safe place to run your own site — your edits can\'t break the design, and it\'s yours to keep.'

export const CMS_POINTS = [
  { icon: 'layers', title: 'Only what you need',        body: 'We expose the exact controls your business uses and hide the rest — no overwhelming admin, no fields you\'ll never open.' },
  { icon: 'wrench', title: 'Tailored to your business', body: 'Products, menu, listings, hours — the CMS is shaped around what you actually manage, like a custom template built just for you.' },
  { icon: 'shield', title: 'Your edits can\'t break it',       body: 'Design and layout are locked into the components, so editing content can never break how your site looks. Safe to hand to anyone on your team.' },
  { icon: 'check',  title: 'Edit it yourself — free',   body: 'Add, change, and remove content anytime at no charge. Our fees only apply when you\'d rather we make the change for you.' },
]

// Home: one combined grid replaces the old separate CMS + security sections.
export const RUN_SAFE_POINTS = [
  { icon: 'layers', title: 'Only what you need',      body: 'Your editor shows the exact things your business changes: prices, photos, products, hours. Nothing else.' },
  { icon: 'shield', title: 'Your edits can\'t break it',     body: 'Design and layout are locked into the components. Anyone on your team can edit content without breaking the site.' },
  { icon: 'check',  title: 'Editing is always free',  body: 'Add, change, and remove content anytime at no charge. Fees only apply when you want us to do it for you.' },
  { icon: 'zap',    title: 'Disaster-proof by design', body: 'Your content lives on separate, backed-up storage. If the public server ever fails, we rebuild from clean backups in hours.' },
]

export const SECURITY_LEAD =
  'We build on a headless, dynamic-static architecture: the public website and your actual content live in separate places, and your data is backed up on storage kept apart from the live server. So the public server is disposable — if it ever fails or is attacked, your content is untouched. We could wipe it entirely and lose nothing but a little uptime, re-pulling your data and redeploying in a matter of hours.'

export const SECURITY_POINTS = [
  { icon: 'layers', title: 'Separated by design',   body: 'Your content and data live on their own backed-up storage — not on the public-facing server that visitors hit.' },
  { icon: 'shield', title: 'Backups kept apart',    body: 'Independent backups are stored separately from the live server, so a failure or attack on one never reaches the other.' },
  { icon: 'clock',  title: 'Back in hours',         body: 'If the public server is wiped, we re-pull your data and redeploy — your site returns in hours, with nothing lost but a little uptime.' },
  { icon: 'zap',    title: 'Nuke-proof by design',  body: 'Headless and statically served, the public site is disposable — we can rebuild the whole thing from your protected data anytime.' },
]

// Plain-English "Pages vs. Items" explainer.
export const PAGES_ITEMS = {
  intro:
    'Think of your website like a restaurant. The pages are the rooms — the entrance, the dining room, the “about us” wall. The items are the dishes on the menu: you can have a lot of them, and they all share one menu design.',
  pages:
    'Pages are the layouts themselves — your home page, about page, services page. Your package includes 6 designed by us, and you can assemble up to 4 more yourself from the component library, free (10 total). The page fee only applies when we do the designing.',
  items:
    'Items are the individual things those pages show — a single product, one menu item, one listing. We design the look once, and every item you add uses it automatically. Your package includes 25 items, and you can add more anytime.',
  savings:
    'Why this saves you money: a catalog of 40 products is 1 page plus 40 items — not 40 pages. You pay once for the layout, then a little to add each product. That’s how you get a full catalog affordably — and you can group items however you like, at no extra charge.',
}

export const OWNERSHIP = [
  'You own everything: your domain, website, content, email, phone number, and every login.',
  'We hand you the keys — take your assets and leave anytime. No lock-in, no ransom.',
  'If you leave, you get a runnable copy of the whole site — a container of the site, the component library (built in and as source), and your full content export — with 30 days to collect it, extendable on request up to a hard cap of 120. Leaving is designed for, not punished.',
  'We never manage or authorize your ad spend, or handle your money.',
  'Transparent pricing, including any third-party costs (Google, domain) billed to you directly.',
  'Every service is a defined, fixed-scope deliverable. Tailored combinations are quoted per business.',
]

// ── FAQ — the questions people actually ask (many verbatim from real
// AI-assisted shopping conversations about us). Reassurance lives here.
export const FAQS = [
  {
    q: 'What exactly do I get if I leave — and can another developer take over?',
    a: 'A complete, runnable copy of your site — leaving is something we build for, not punish. You receive one clean download containing: a container of your website (its full working front end), the component library both built into that site and included separately as source code, and a copy of your CMS in its own folder. Your content — every product, listing, price, photo, and text block — exports in clean, portable files. You get 30 days to collect everything, extendable on request up to a hard cap of 120 days, and anything too large to hand over directly we move by a cloud-to-cloud transfer. Honest footnote: because the site runs on a modern stack (a container plus a headless CMS), standing it back up elsewhere is a job for a competent developer or a capable AI coding tool — not a one-click restore you\'d do yourself — but everything they need is in the box, with zero dependency on us afterward. And this isn\'t a hobby we\'ll abandon — we run our own sites on the same infrastructure under multi-year commitments, so the platform yours sits on is one our own livelihood depends on.',
  },
  {
    q: 'Can I see it before I pay anything?',
    a: 'Yes — before any deposit, we\'ll build you a free demo: your business rendered in our system, so you can judge the design fit and how the editor feels before a dollar changes hands. It\'s the fastest way to know whether we\'re right for you, and it costs nothing but a little of your time. We\'re new and earning trust on purpose — the free demo is part of how we do that.',
  },
  {
    q: 'Do I really own everything? Even the design?',
    a: 'You own your domain, content, accounts, images, and every login outright, from day one. The component library is the one piece we license rather than sell — and the license is generous: you get the perpetual right to use it on your site, commercially, including by any developer you later hire to maintain or change that site. The only limits: you can\'t hand the library to another agency, and you can\'t use it to build other, competing projects — it\'s the core tool our whole business runs on, not a freebie to resell. That restriction never touches a normal business; your site is yours to run and modify forever. If you sell your business, your site, domain, content, and brand transfer with it — the buyer simply keeps operating under the same library terms.',
  },
  {
    q: 'Do I have to use your accounts? Who pays Shopify, my domain, email?',
    a: 'Your accounts are yours, and you pay those providers directly at their rates — no markup from us, and we never sit between you and a vendor. Your domain, your Shopify (or Square/Toast/Clover) plan and its transaction fees, your email — all in your name. The only thing we actively run and bill you for beyond your plan is Google Workspace email, if you choose it. Even your AI phone menu is just a one-time setup from us, then a low-cost subscription in your own name. Everything else, you own and pay for directly, so you\'re never locked to us by a bill.',
  },
  {
    q: 'Can you build me an online store with checkout?',
    a: 'Yes — through an external platform integration ($400, one-time per integration). We connect your site to an engine like Shopify: our components are the fast, custom-designed storefront your customers see — browsing and even the cart happen right on your site — and the platform underneath handles checkout, payments, refunds, and inventory syncing with its bank-grade security. That split is deliberate — your card data belongs with a payments company, not any boutique — and it keeps the whole setup transferable. Orders and refunds are managed in the platform\'s dashboard; your site content stays in your CMS. (The $400 is our one-time integration fee; the platform\'s own monthly plan and transaction fees are separate and paid by you directly.)',
  },
  {
    q: 'How do pages work? Can I add my own?',
    a: 'Plans include 6 pages designed by us, and you can assemble up to 4 more yourself from the component library — 10 total — free. The $75–200 page fee only applies when you want US to design a new page or rework a layout. And remember items aren\'t pages: your 40 products live in the CMS and flow into one product layout, so a big catalog never eats your page count.',
  },
  {
    q: 'I have dozens of products. Won\'t that cost a fortune?',
    a: 'No — this is exactly what the pages-vs-items model is for. Products, menu entries, and listings are items: we design the layout once and every item uses it. Your plan imports the first 25 for you; after that, adding items yourself is unlimited and free, forever ($7/item only if you\'d rather we do the typing). Forty products is one page plus forty items — not forty pages.',
  },
  {
    q: 'Can I add a blog or news section later?',
    a: 'Yes. A custom post format is $125, one-time: we design a new content type around your business — blog posts, news updates, case studies — and from then on you publish unlimited posts yourself, free.',
  },
  {
    q: 'What about product photos?',
    a: 'That\'s our CG render service: we build a 3D model of your product once, then render every shot you need from it. If you sell one product in many variants — say, 30 scents of the same candle jar — we model the jar once and each label variant is just an additional render at $40–75, not a new model. A whole product line\'s imagery for a fraction of per-product photography. 15% off when bundled with a website.',
  },
  {
    q: 'Will my renewal price creep up every year?',
    a: 'Your renewal rate is agreed in writing before you sign — no surprises, ever. Today\'s prices are early rates and will rise for new clients as demand grows, but existing clients keep fair, gradual pricing. We put that in the contract because "the price never changes" is a promise nobody can honestly make — "you\'ll always know the number in advance" is one we can.',
  },
  {
    q: 'Who writes and loads all my content?',
    a: 'Either of us. Editing your own site is always free and unlimited — that\'s the point of your custom CMS. If you\'d rather hand it off, we import your first 30 items free on Standard (50 on Online Business Enhanced), and $7/item after that. For the build itself, we walk you through exactly what we need up front so the project never stalls on missing content.',
  },
  {
    q: 'Will people actually find my business online?',
    a: 'Getting found matters as much as looking good, so we build for it. Every site is fast, mobile-first, and ships with clean structured data — the machine-readable schema that Google and AI assistants read to understand your business — which is the technical foundation search rewards. We\'ll also set up and verify your Google Business Profile ($300) so you appear on Maps for "near me" searches. What we won\'t do is sell you ads or promise a #1 ranking — anyone who guarantees that is guessing. We give you a fast, clean, well-structured site and honest local groundwork; we never touch your ad spend or your money.',
  },
  {
    q: 'Do you build for restaurants, cafés, and shops?',
    a: 'Yes — food and retail are a natural fit. Your menu or product list lives as items, so a full menu with seasonal drinks is designed once and yours to keep current, free. Online ordering, reservations, and loyalty run through an external platform integration ($400): we skin your Square, Toast, Clover, or Shopify setup so it matches your site, while payments and orders stay on the platform\'s secure system — never with us. Add a QR menu ($120) for tables and the counter, and seasonal refreshes ($45) for holiday menus. You get a café site that looks custom and handles real ordering, without us ever holding your sales.',
  },
  {
    q: 'Will my site match my brand — or will it look like a tech company?',
    a: 'It looks like you, not us. The component system is just the skeleton; a single theme file sets the whole personality — fonts, colors, warmth, imagery. The same library built a dark, cinematic game-studio site, a bold bilingual contractor site, and a clean university lab site, and none of them resemble each other. A coffee shop gets warm, inviting, and photo-forward; a law firm gets restrained and serious. We design to your vibe — the shared system just means we get there faster and cheaper than starting from a blank page.',
  },
  {
    q: 'How long does a build take, and what if something breaks later?',
    a: 'A standard build takes about one to two weeks once we have your content; Rush Delivery ($400) moves you to the front of the line if you need it in days. After launch, managed hosting means SSL, backups, and uptime are handled for you — and because your content lives on separate, backed-up storage, we can rebuild from clean backups in hours if the public server ever fails. Edits you make yourself can\'t break the design (it\'s locked into the components), and if something does go wrong, you email one team directly — not a ticket queue.',
  },
  {
    q: 'What do you maintain — and what\'s on me?',
    a: 'We keep the machinery running: hosting, security, uptime, backups, and fixing any bug that\'s ours. What we don\'t do is manage your day-to-day content or redo your design on our own — editing your products, prices, hours, and photos is yours to do anytime, free, in your CMS (that\'s the whole point of it). If you\'d rather we make a change or add a page, that\'s a simple paid request. Clear line: we own that it works; you own what it says.',
  },
  {
    q: 'Do you work with non-profits?',
    a: 'Yes — reach out. We don\'t have a rigid non-profit discount yet, so we handle these case by case, and we\'ve waived build costs for causes we believe in. We\'ll also connect your donation provider (whichever you choose) at no integration charge — donations flow straight to you, never through us. Tell us about your organization and we\'ll put a fair arrangement in writing.',
  },
  {
    q: 'How does the referral program work? Can I refer a non-profit or a friend\'s business?',
    a: 'Anyone can refer anyone — clients, friends, other business owners, non-profits included. When someone you send signs and pays for a package, you earn 10% of the first $600 and 5% of anything above, paid by Zelle the same day both sides confirm each other. No sign-up, no forms: they mention your name, we confirm with you, done.',
  },
]
