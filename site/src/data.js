// ---------------------------------------------------------------------------
// Guillen Solutions — shared content data.
// Pricing, add-ons, and ownership promises used across Home + Configurator.
// Keeping it here means the numbers live in exactly one place.
// ---------------------------------------------------------------------------

export const CONTACT_EMAIL = 'contact@guillensolutions.com'

export const PACKAGES = [
  {
    id: 'freelance',
    tag: 'Solo & freelancers',
    name: 'Freelance / Solo',
    price: '$600',
    period: 'first year, all-in',
    description: 'A polished professional template — a credible presence for independent professionals, without the custom-build cost.',
    note: 'After year one: $200/yr hosting + domain renewal.',
    features: [
      'Up to 5 pages — 3 designed for you + 2 self-serve',
      'Your own CMS — edit content anytime, free',
      'Domain registered in your name',
      'Managed hosting — SSL, backups, daily uptime',
      'Professional template on our design system',
      'Everything is yours to keep — leave anytime',
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
      'Up to 6 custom-designed pages — home, about, services…',
      'Your own CMS — 25 items imported for you, then unlimited self-serve, free',
      'Unlimited item groups — organize however you like',
      'Domain registered in your name',
      'Managed hosting — SSL, backups, uptime',
      'Built on our in-house component system — custom look, template speed',
    ],
    featured: true,
    firstYear: 950,
    recurring: 350,
  },
  {
    id: 'wordpress',
    tag: 'Maximum portability',
    name: 'WordPress Business',
    price: '$1,350',
    period: 'first year, all-in',
    description: "Built on the world's most widely-supported platform — maintainable by any developer, anywhere.",
    note: 'After year one: $500/yr — managed WordPress needs ongoing core/plugin updates and security upkeep.',
    features: [
      'Up to 6 designed pages — home, about, services…',
      'WordPress CMS — 25 items imported for you, then unlimited self-serve, free',
      'Unlimited item groups — organize however you like',
      'Domain registered in your name',
      'Managed hosting — SSL, backups, uptime',
      'Maximum portability — any developer can maintain it',
    ],
    firstYear: 1350,
    recurring: 500,
  },
]

// kind: 'onetime'  → one-time, adds to first-year all-in
//       'recurring' → adds to the recurring yearly total
//       'quoted'    → shown but not summed (needs a per-business quote)
//       'per-unit'  → priced per item/page; quantity chosen in the configurator
export const ADDONS = [
  {
    id: 'phone',
    name: 'Business Phone Line',
    price: 'from $180/yr',
    cadence: 'Recurring',
    body: 'A dedicated business number that forwards to your phone, with voicemail and call history. Yours and portable.',
    amount: 180, kind: 'recurring', approx: true,
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
    name: 'Extra Items (beyond 25)',
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
    body: 'New pages or reworked layouts as your business grows, quoted by page depth before we build. You only pay when you actually expand.',
    amount: null, kind: 'quoted',
  },
]

export const GROWTH_NOTE =
  'As your site grows: additional pages or redesigns are $75–200 each, quoted by page depth — so you only pay when you actually expand.'

export const REFERRAL_NOTE =
  'Know another business that needs a site? Every referral who signs earns you a 5% credit toward your next renewal.'

// Renewal honesty — grandfathering means fair, disclosed pricing, not a rate
// frozen forever. Never promise "your price never changes."
export const PRICING_PROMISE =
  'Renewal rates are agreed in writing before you sign — never a surprise. Today\'s prices are early rates; existing clients keep fair, gradual pricing.'

// Where we fit — versus the alternatives a small business actually compares us to.
export const POSITIONING = [
  { icon: 'layers', title: 'vs. DIY builders',    body: 'Squarespace and Wix hand you a blank template and a monthly bill. We hand you a finished, custom-designed site — with an editor made for your business, not a generic dashboard.' },
  { icon: 'zap',    title: 'vs. freelancers',     body: 'Freelance builds run $1,500–8,000 and start from scratch every time. Our component system industrializes the work — custom-looking sites at a fraction of the cost and time.' },
  { icon: 'star',   title: 'vs. agencies',        body: 'Agency work starts around $6,000 with overhead to match. You get comparable polish without the minimums — because our system does the heavy lifting.' },
  { icon: 'shield', title: 'vs. predatory vendors', body: 'Some local vendors keep your domain, resell your leads, and bill you forever. We\'re the opposite by design: you own everything, and we never touch your ad spend or your money.' },
]

// "You can do it yourself, free" — the fees are only for hands-off clients.
export const CMS_NOTE =
  'Because you own it, you can add or remove products and adjust page layouts yourself, anytime — no coding required, and no charge. The add-on fees are only for when you\'d rather we handle it for you.'

export const CMS_LEAD =
  'A CMS is just the screen where you log in to update your own site — change your words, prices, and photos, no code involved. Most are bloated and confusing. Yours is custom-built: it shows only the handful of things you actually change (prices, photos, products, hours) and hides everything else. A simple, safe place to run your own site — impossible to break, and yours to keep.'

export const CMS_POINTS = [
  { icon: 'layers', title: 'Only what you need',        body: 'We expose the exact controls your business uses and hide the rest — no overwhelming admin, no fields you\'ll never open.' },
  { icon: 'wrench', title: 'Tailored to your business', body: 'Products, menu, listings, hours — the CMS is shaped around what you actually manage, like a custom template built just for you.' },
  { icon: 'shield', title: 'Impossible to break',       body: 'Design and layout are locked into the components, so editing content can never break how your site looks. Safe to hand to anyone on your team.' },
  { icon: 'check',  title: 'Edit it yourself — free',   body: 'Add, change, and remove content anytime at no charge. Our fees only apply when you\'d rather we make the change for you.' },
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
    'Pages are the parts we design by hand — your home page, about page, services page, or a page showing all your products. Your package includes 6 pages, enough for most businesses.',
  items:
    'Items are the individual things those pages show — a single product, one menu item, one listing. We design the look once, and every item you add uses it automatically. Your package includes 25 items, and you can add more anytime.',
  savings:
    'Why this saves you money: a catalog of 40 products is 1 page plus 40 items — not 40 pages. You pay once for the layout, then a little to add each product. That’s how you get a full catalog affordably — and you can group items however you like, at no extra charge.',
}

export const OWNERSHIP = [
  'You own everything: your domain, website, content, email, phone number, and every login.',
  'We hand you the keys — take your assets and leave anytime. No lock-in, no ransom.',
  'We never manage or authorize your ad spend, or handle your money.',
  'Transparent pricing, including any third-party costs (Google, domain) billed to you directly.',
  'Every service is a defined, fixed-scope deliverable. Tailored combinations are quoted per business.',
]
