// ---------------------------------------------------------------------------
// prerender.mjs — static compatibility layer for the SPA.
//
// Runs after `vite build`. For each marketing route it bakes real HTML into
// the built shell: per-route <title>/meta/canonical/OG, the JSON-LD schema,
// and a readable content fallback (headings, prices, links) inside #root.
//
// Why: a client-rendered SPA returns an empty shell to any reader that doesn't
// execute JS — search crawlers' first pass, and the AI assistants buyers use to
// vet vendors. This makes the content + structured data visible in the raw HTML.
// In a real browser, createRoot() replaces the fallback with the live app.
//
// Content is DERIVED from the same data.js / schema.js the app uses, so it can't
// drift from the pages. nginx (try_files $uri $uri/ /index.html) serves the
// per-route index.html files this writes.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  PACKAGES, SERVICES, ADDONS, ON_DEMAND, FAQS, FOUND,
  CG_RENDER_TIERS, CG_RENDER_SHOTS, CG_RENDER_PACKAGES, CONTACT_EMAIL,
} from '../src/data.js'
import { ORG, homeSchema, pricingSchema, rendersSchema } from '../src/schema.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE = 'https://guillensolutions.com'
const NAME = 'Guillen Solutions'

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const ldjson = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

// ── shared chrome (crawlable link graph) ─────────────────────────────────────
const NAV = [
  ['/', 'Home'], ['/work', 'Work & Library'],
  ['/plans/freelance', 'Freelance plan'], ['/plans/standard', 'Standard plan'],
  ['/plans/wordpress', 'WordPress plan'], ['/renders', 'CG product renders'],
  ['/on-demand', 'On-demand services'], ['/pricing', 'Full pricing & order'],
  ['/guides', 'Guides'], ['/status', 'Status & updates'],
]
const header = `<header><a href="/">Guillen Solutions</a><nav>${
  NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')
}</nav><a href="/pricing">Build your quote</a></header>`
const footer = `<footer><p>Honest, upfront digital services for small businesses — websites, product renders, and the setup around them. You own your domain, your content, your accounts, and every login — no lock-in, ever.</p><nav>${
  NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')
}</nav><p>Get in touch: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> · English &amp; Español</p><p>© ${new Date().getFullYear()} ${NAME}</p></footer>`

const list = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`
const wrap = (h1, sub, inner) =>
  `${header}<main><h1>${esc(h1)}</h1><p>${esc(sub)}</p>${inner}</main>${footer}`

// ── per-route bodies (real content, derived from data) ───────────────────────
const planLine = p => `<strong>${esc(p.name)}</strong> — ${esc(p.price)} ${esc(p.period)} (then $${p.recurring}/yr). ${esc(p.description)} <a href="/plans/${p.id}">Details</a>`

const bodies = {
  home: wrap(
    'Everything your business needs to look real online — and you own all of it.',
    'Websites, studio-quality product images, and the business setup around them — built for small businesses, priced flat, and put in your name.',
    `<h2>What we do</h2>${list(SERVICES.map(s => `<strong>${esc(s.title)}</strong> (${esc(s.price)}) — ${esc(s.body)} <a href="${s.to}">${esc(s.linkLabel)}</a>`))}
     <h2>Website plans</h2>${list(PACKAGES.map(planLine))}
     <h2>${esc(FOUND.headline)}</h2><p>${esc(FOUND.lead)}</p>${list(FOUND.points.map(p => `<strong>${esc(p.title)}</strong> — ${esc(p.body)}`))}
     <p><a href="/pricing">Build your quote</a></p>`,
  ),
  work: wrap(
    'One toolkit. Every kind of business.',
    'From a Dallas electrician to a Long Island contractor to a Boston game studio — wildly different industries, three states, three completely different looks. All built from the same 47+ component library, and all owned by the client.',
    `${list([
      '<strong>Angel Electrical Services</strong> — licensed electrician, Dallas, Texas. Trust-first site with a quote form that routes to the owner.',
      '<strong>FencingPatrol</strong> — family general contractor, Long Island, New York. Bold, bilingual, call-first.',
      '<strong>Cryark Inc</strong> — game &amp; tools studio, Boston, Massachusetts. Cinematic dark-mode site with a devlog.',
      '<strong>Northeastern Satellite Lab</strong> — student CubeSat club, Boston. Dark aerospace theme (content being filled in by the club).',
    ])}<p>One component system, any look. <a href="/work">Explore the library</a>.</p>`,
  ),
  pricing: wrap(
    'Price it yourself, right here.',
    'Pick a plan and any add-ons for a transparent, all-in number, or estimate on-demand work for a site that\'s already live. Every figure confirmed in writing.',
    `<h2>Plans</h2>${list(PACKAGES.map(p => `${planLine(p)}${list(p.features.map(esc))}`))}
     <h2>Add-ons</h2>${list([...ADDONS, ...ON_DEMAND].map(a => `<strong>${esc(a.name)}</strong> — ${esc(a.price)}: ${esc(a.body)}`))}
     <h2>Common questions</h2>${list(FAQS.map(f => `<strong>${esc(f.q)}</strong> ${esc(f.a)}`))}`,
  ),
  renders: wrap(
    'Studio-quality product images, without the studio.',
    'We build your product in 3D once, then render every shot you need from it. Model once, render many. 15% off bundled with a website; standalone at list.',
    `<h2>Per-product base (model + first shot)</h2>${list(CG_RENDER_TIERS.map(t => `<strong>${esc(t.name)}</strong> — ${esc(t.price)} ${esc(t.per)}. ${esc(t.body)} Examples: ${esc(t.examples)}`))}
     <h2>Extra shots</h2>${list(CG_RENDER_SHOTS.map(s => `<strong>${esc(s.name)}</strong> — ${esc(s.price)} ${esc(s.per)}. ${esc(s.body)}`))}
     <h2>Packages</h2>${list(CG_RENDER_PACKAGES.map(p => `<strong>${esc(p.name)}</strong> — ${esc(p.price)}. ${esc(p.body)}`))}`,
  ),
  ondemand: wrap(
    'Nothing here needs deciding today.',
    'Services businesses add after launch, whenever they need them — fixed-scope, priced upfront.',
    list(ON_DEMAND.map(s => `<strong>${esc(s.name)}</strong> — ${esc(s.price)}: ${esc(s.body)}`)),
  ),
  guides: wrap('Guides', 'Plain-English guides to owning your business online.', `<p><a href="/guides">Browse the guides</a>.</p>`),
  status: wrap(
    'What we\'re running, and what\'s new.',
    'Live status of the services we run for you, plus a running log of stack updates, new features, and announcements. Transparency is part of the deal.',
    `<h2>Service status</h2><p>Live health checks run in your browser for the website and the content/inquiry API. Your content and backups live on separate, protected storage — if a public server fails, we rebuild from clean backups in hours.</p>
     <h2>Updates &amp; announcements</h2><p>Stack and infrastructure updates, new features, and business news are logged in the open. <a href="/status">See the latest</a>.</p>`,
  ),
}

const planBody = p => wrap(
  p.name,
  p.description,
  `<p>${esc(p.price)} ${esc(p.period)} — then $${p.recurring}/yr for hosting + domain renewal, agreed in writing.</p>${list(p.features.map(esc))}<p><a href="/pricing#order">Build your quote</a></p>`,
)

// ── route manifest ───────────────────────────────────────────────────────────
const ROUTES = [
  { path: '/', title: 'Digital Business Solutions You Own', description: 'Websites, CG product renders, and business setup for small businesses — flat all-in pricing, and you own everything: domain, content, images, every login. English & Español.', schema: homeSchema, body: bodies.home },
  { path: '/work', title: 'Our Work & Component Library', description: 'Three states, three industries, one 47+ component system — client sites for an electrician, a contractor, and a game studio, plus the live toolkit they were built from.', schema: [ORG], body: bodies.work },
  { path: '/pricing', title: 'Pricing & Order', description: 'Build your order: pick a plan and add-ons for an all-in number, or estimate on-demand work for a live site. Every figure confirmed in writing.', schema: pricingSchema, body: bodies.pricing },
  { path: '/renders', title: 'CG Product Renders', description: 'Studio-quality 3D product images for e-commerce — model once, render many. Complexity-tiered per product, cheap extra shots, affordable multi-shot packages. Bundle with a website or order standalone.', schema: rendersSchema, body: bodies.renders },
  { path: '/on-demand', title: 'On-Demand Services', description: 'Services you add after launch, whenever you need them — newsletter setup, landing pages, QR menus, seasonal refreshes, translations. Fixed-scope, quoted in writing.', schema: [ORG], body: bodies.ondemand },
  { path: '/guides', title: 'Guides', description: 'Plain-English guides to owning your business online — from Guillen Solutions.', schema: [ORG], body: bodies.guides },
  { path: '/status', title: 'Status & Updates', description: 'Live service status and a running log of stack updates, new features, and announcements from Guillen Solutions — see us at work.', schema: [ORG], body: bodies.status },
  ...PACKAGES.map(p => ({
    path: `/plans/${p.id}`, title: p.name, description: p.description, schema: [ORG], body: planBody(p),
  })),
]

// ── render ───────────────────────────────────────────────────────────────────
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

for (const r of ROUTES) {
  const full = r.title ? `${r.title} — ${NAME}` : NAME
  const url = `${SITE}${r.path === '/' ? '' : r.path}`
  const head = [
    `<meta name="description" content="${esc(r.description)}" />`,
    `<meta name="robots" content="index,follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:title" content="${esc(full)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="es_ES" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(full)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    ...(r.schema || []).map(ldjson),
  ].join('\n    ')

  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(full)}</title>`)
    .replace('</head>', `    ${head}\n  </head>`)
    // createRoot() replaces this fallback with the live app in a real browser.
    .replace('<div id="root"></div>', `<div id="root">${r.body}</div>`)

  const outPath = r.path === '/'
    ? join(DIST, 'index.html')
    : join(DIST, r.path.slice(1), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
}

console.log(`✓ prerendered ${ROUTES.length} routes (head + JSON-LD + content baked into static HTML)`)
