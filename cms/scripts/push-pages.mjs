// ─────────────────────────────────────────────────────────────────────────────
//  push-pages.mjs — author CMS pages programmatically ("AI composes the page").
//
//  Logs into the live Payload API as an admin and upserts each page in PAGES
//  (create if the slug is new, update if it exists). Pages are built from the
//  curated block library — the same blocks a human edits in /admin. Highly
//  custom sections ride in as `customHtml` blocks (admin-only) until their
//  patterns are promoted into @aagf470/ui as real components.
//
//  Shared marketing copy is IMPORTED from ../site/src/data.js so pricing and
//  promises live in exactly one place. After a page is authored, the CMS copy
//  becomes the live source of truth — the bespoke React page is only a fallback.
//
//  Run (from cms/):
//    CMS_URL=https://cms.guillensolutions.com \
//    ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=... \
//    node scripts/push-pages.mjs
//
//  Node 18+ (uses global fetch). Nothing is deleted; re-running is idempotent.
// ─────────────────────────────────────────────────────────────────────────────
import {
  PACKAGES, ADDONS, OWNERSHIP, GROWTH_NOTE, PRICING_PROMISE,
  POSITIONING, PAGES_ITEMS, CMS_NOTE, CMS_LEAD, RUN_SAFE_POINTS, CONTACT_EMAIL,
} from '../../site/src/data.js'
import { PLAN_PAGES } from '../../site/src/planPages.js'

const CMS_URL = process.env.CMS_URL || 'https://cms.guillensolutions.com'
const EMAIL = process.env.ADMIN_EMAIL
const PASSWORD = process.env.ADMIN_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('✗ Set ADMIN_EMAIL and ADMIN_PASSWORD (your /admin login).')
  process.exit(1)
}

// ── Content that previously lived only in the bespoke Home.jsx ───────────────
// (Transitional duplication: once authored, the CMS holds the live copy.)
const WHAT_WE_DO = [
  { icon: 'star',   title: 'A custom-designed site',     body: 'Designed around your business on our in-house component system — custom-tier looks at template speed and cost, not a cookie-cutter template.' },
  { icon: 'layers', title: 'Update it yourself',         body: 'A simple control panel — your own CMS — that shows only what you actually change, so you can update the site yourself without touching code or breaking the design.' },
  { icon: 'shield', title: 'Managed hosting & security', body: 'SSL, backups, and uptime handled for you. You never have to think about servers or certificates.' },
  { icon: 'check',  title: 'You own everything',         body: 'Domain, content, accounts, and logins in your name from day one. Leave anytime with all of it.' },
]
const STEPS = [
  { title: 'Choose a package', body: 'Pick a base package and add only the pieces you need. The configurator gives you a transparent, all-in number.' },
  { title: 'We design & build', body: 'We build your site on our component system (or WordPress), sized to your business and ready for your content.' },
  { title: 'We set it up & explain it', body: 'Hosting, domain, SSL, and accounts — all configured in your name. Then we walk you through how everything works.' },
  { title: 'We hand you the keys', body: 'You own the domain, content, logins, and every asset. No lock-in, and we never touch your ad spend or your money.' },
]

// ── customHtml payloads (exact markup from the bespoke pages; site CSS has
//    these classes because the bespoke pages remain bundled as fallbacks) ─────
const KEY_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="9" r="5"/><line x1="11.5" y1="12.5" x2="20" y2="21"/><line x1="17" y1="18" x2="19" y2="16"/></svg>'

const HTML_NOTES = `
<div class="gs-inline-note-wrap">
  <p class="gs-note">${GROWTH_NOTE}</p>
  <p class="gs-note"><strong>Nothing else to decide today.</strong> Newsletters, landing pages,
    QR menus, seasonal refreshes, translations — all available later, whenever you
    need them. <a href="/on-demand">See on-demand services →</a></p>
  <p class="gs-note">Want the full picture? Each plan has its own deep dive:
    <a href="/plans/freelance">Freelance / Solo</a> ·
    <a href="/plans/standard">Standard Business</a> ·
    <a href="/plans/wordpress">WordPress Business</a></p>
</div>`

const HTML_EXPLAINER = `
<section class="section section--default gs-explain">
  <div class="section-container">
    <p class="section-eyebrow">Plain English</p>
    <h2 class="section-title">Pages vs. Items</h2>
    <p class="section-sub">${PAGES_ITEMS.intro}</p>
    <div class="gs-explain__grid">
      <div class="gs-explain__card">
        <span class="gs-explain__badge">Pages · 6 included</span>
        <h3 class="gs-explain__card-title">The rooms</h3>
        <p>${PAGES_ITEMS.pages}</p>
      </div>
      <div class="gs-explain__card">
        <span class="gs-explain__badge">Items · 25 included</span>
        <h3 class="gs-explain__card-title">The dishes</h3>
        <p>${PAGES_ITEMS.items}</p>
      </div>
    </div>
    <p class="gs-note">${PAGES_ITEMS.savings}</p>
    <div class="gs-cms-callout">
      <span class="gs-cms-callout__mark">${KEY_ICON}</span>
      <p><strong>You can do it yourself — free.</strong> ${CMS_NOTE}</p>
    </div>
  </div>
</section>`

const HTML_LIBPEEK = `
<section class="section section--default gs-libpeek">
  <div class="section-container">
    <p class="section-eyebrow">Built-in toolkit</p>
    <h2 class="section-title">Your site is built from a real component library</h2>
    <p class="section-sub">Every Guillen Solutions site is assembled from the same tested, mobile-ready, light-and-dark component set — the one this very page uses. One theme file morphs it into completely different looks, and the library grows with every project we ship. Every client gets controlled access to all of it: your content is yours to change, while the design system keeps every page safe and consistent. That's how you get custom-tier design at near-template cost.</p>
    <div class="gs-libpeek__stat">
      <span class="gs-libpeek__num">47<sup>+</sup></span>
      <span class="gs-libpeek__stat-copy">
        <span class="gs-libpeek__stat-label">components and counting</span>
        <span class="gs-libpeek__stat-sub">Yours to use — no code required.</span>
      </span>
    </div>
    <div class="gs-libpeek__grid">
      <div class="gs-libpeek__card"><h3>Heroes &amp; banners</h3><p>Bold openers and call-to-action banners that set the tone.</p></div>
      <div class="gs-libpeek__card"><h3>Pricing &amp; packages</h3><p>Clear pricing tables and service menus — like the ones on this page.</p></div>
      <div class="gs-libpeek__card"><h3>Galleries &amp; FAQs</h3><p>Project galleries, testimonials, and accessible FAQ accordions.</p></div>
      <div class="gs-libpeek__card"><h3>Contact &amp; forms</h3><p>Inquiry forms and hours/location blocks that route straight to you.</p></div>
    </div>
    <a href="/work#library" class="gs-libpeek__cta">Explore the full component library →</a>
  </div>
</section>`


// ── Page definitions ─────────────────────────────────────────────────────────
const grid = (props) => ({ blockType: 'featureGrid', columns: '4', variant: 'default', ...props })

const PAGES = [
  {
    title: 'Home',
    slug: 'home',
    layout: [
      { blockType: 'hero', layout: 'left', size: 'full', variant: 'default',
        eyebrow: 'Websites for small businesses · English & Español',
        headline: 'Get your business online — and own every piece of it.',
        subtext: 'We design your website, set up everything around it, and put every login in your name. You update it yourself in plain English — and if you ever leave, you take all of it with you.',
        ctas: [
          { label: 'See packages', href: '#packages', variant: 'solid' },
          { label: 'Build your quote', href: '#configure', variant: 'ghost' },
        ] },
      grid({ eyebrow: 'What we do', headline: 'Honest web services, start to finish',
        subtext: 'Design, hosting, security, and guidance — with one promise underneath all of it: everything we build is yours.',
        items: WHAT_WE_DO, variant: 'alt' }),
      { blockType: 'imageText', layout: 'image-right', variant: 'default', imageAlt: 'Guillen Solutions',
        eyebrow: 'Why we do it', headline: 'We built the opposite of a bad deal',
        body: 'A business we know was charged $2,800 for a website they never actually owned — their leads were siphoned to competitors who paid more, and their domain, content, and profiles were held hostage. We started Guillen Solutions to do the exact opposite: honest, upfront, and yours to keep.',
        cta: { label: 'See what we build', href: '/work', variant: 'ghost-bordered' } },
      grid({ eyebrow: 'Where we fit', headline: 'Between doing it yourself and paying an agency',
        subtext: 'Tailored, long-term, content-managed websites that you own — the gap the alternatives leave open.',
        items: POSITIONING }),
      { blockType: 'steps', variant: 'alt', eyebrow: 'How it works',
        headline: 'From package to keys in four steps', items: STEPS },
      { blockType: 'pricingPlans', blockName: 'packages', variant: 'default',
        eyebrow: 'Packages', headline: 'Flat, all-in pricing',
        subtext: `Three tiers, one flat first-year price covering design, hosting, and your domain — then a low yearly rate for hosting + domain renewal, billed transparently. ${PRICING_PROMISE}`,
        plans: PACKAGES.map(p => ({
          badge: p.badge, tag: p.tag, name: p.name, price: p.price, period: p.period,
          description: p.description, note: p.note, featured: Boolean(p.featured),
          features: p.features.map(text => ({ text })),
          cta: { label: 'Build your quote', href: '#configure', variant: p.featured ? 'solid' : 'ghost-bordered' },
        })) },
      { blockType: 'serviceList', columns: '2', variant: 'alt',
        eyebrow: 'Add-ons', headline: 'Pick only what fits',
        subtext: "Optional extras — add any to a package, or none. Most everyday changes you can make yourself for free once the site is live; these are for when you'd rather we handle it. Tailored combinations are quoted per business.",
        services: ADDONS.map(a => ({ name: a.name, description: a.body, price: a.price })) },
      { blockType: 'customHtml', variant: 'default', html: HTML_NOTES },
      { blockType: 'customHtml', variant: 'default', html: HTML_EXPLAINER },
      grid({ eyebrow: 'Run it yourself', headline: 'Your own control panel, built around your business',
        subtext: CMS_LEAD, items: RUN_SAFE_POINTS, variant: 'alt' }),
      { blockType: 'customHtml', variant: 'default', html: HTML_LIBPEEK },
      { blockType: 'configurator', variant: 'default',
        eyebrow: 'Build your quote', headline: 'Configure your setup',
        subtext: "Choose a package and add-ons to see a transparent, all-in estimate. Nothing is charged — it's just a starting point we'll confirm in writing." },
      { blockType: 'checklist', variant: 'alt',
        eyebrow: 'The promise', headline: "What you own — and what we don't do",
        items: OWNERSHIP.map(text => ({ text })) },
      { blockType: 'ctaBanner', variant: 'accent',
        eyebrow: 'Ready?', headline: "Let's get your business online — the honest way.",
        subtext: `Build a quote in a minute, or reach out at ${CONTACT_EMAIL} and we'll talk it through. Boston in person, everywhere else remote. English or Español.`,
        cta: { label: 'Build your quote', href: '#configure', variant: 'solid' } },
    ],
  },

]

// ── Plan pages: same PLAN_PAGES config the React fallback renders ────────────
const planLayout = (id) => {
  const plan = PLAN_PAGES[id]
  const data = PACKAGES.find(p => p.id === id)
  const layout = [
    { blockType: 'hero', layout: 'left', size: 'compact', variant: 'alt',
      eyebrow: plan.hero.eyebrow, headline: plan.hero.headline, subtext: plan.hero.subtext,
      ctas: [{ label: 'Build your quote', href: '/#configure', variant: 'solid' }] },
    { blockType: 'featureGrid', columns: '4', variant: 'default',
      eyebrow: "Who it's for", headline: plan.whoTitle, subtext: plan.whoSub, items: plan.who },
    { blockType: 'checklist', variant: 'alt',
      eyebrow: 'What you get', headline: plan.getTitle,
      items: plan.get.map(text => ({ text })), note: plan.getNote },
  ]
  if (plan.why) layout.push({ blockType: 'featureGrid', columns: '4', variant: 'default',
    eyebrow: plan.why.eyebrow, headline: plan.why.title, subtext: plan.why.sub, items: plan.why.items })
  layout.push(
    { blockType: 'steps', variant: 'default', eyebrow: 'How it works',
      headline: 'From first call to keys in hand', items: plan.steps },
    { blockType: 'pricingPlans', variant: 'alt', eyebrow: 'The numbers', headline: 'Flat, all-in, in writing',
      plans: [{ badge: data.badge, tag: data.tag, name: data.name, price: data.price,
        period: data.period, description: data.description, note: data.note, featured: true,
        features: data.features.map(text => ({ text })),
        cta: { label: 'Build your quote', href: '/#configure', variant: 'solid' } }] },
    { blockType: 'faq', variant: 'default', eyebrow: 'Good to know', headline: 'Common questions', items: plan.faq },
    { blockType: 'ctaBanner', variant: 'accent', eyebrow: plan.cta.eyebrow,
      headline: plan.cta.headline, subtext: plan.cta.subtext,
      cta: { label: 'Build your quote', href: '/#configure', variant: 'solid' } },
  )
  return layout
}
for (const id of ['freelance', 'standard', 'wordpress']) {
  PAGES.push({ title: PLAN_PAGES[id].seo.title, slug: `plans-${id}`, layout: planLayout(id) })
}

// ── API helpers ──────────────────────────────────────────────────────────────
async function login() {
  const res = await fetch(`${CMS_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`login failed (${res.status}): ${await res.text()}`)
  const { token } = await res.json()
  if (!token) throw new Error('login returned no token')
  return token
}

async function findBySlug(token, slug) {
  const res = await fetch(`${CMS_URL}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  return data?.docs?.[0] || null
}

async function upsert(token, page) {
  const existing = await findBySlug(token, page.slug)
  const url = existing ? `${CMS_URL}/api/pages/${existing.id}` : `${CMS_URL}/api/pages`
  const method = existing ? 'PATCH' : 'POST'
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(page),
  })
  if (!res.ok) throw new Error(`${method} ${page.slug} failed (${res.status}): ${await res.text()}`)
  console.log(`  ✓ ${existing ? 'updated' : 'created'} "${page.slug}"`)
}

// ── Run ──────────────────────────────────────────────────────────────────────
const token = await login()
console.log(`Logged in to ${CMS_URL}. Pushing ${PAGES.length} page(s)…`)
for (const page of PAGES) await upsert(token, page)
console.log('Done.')
