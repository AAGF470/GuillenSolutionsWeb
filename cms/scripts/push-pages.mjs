// ─────────────────────────────────────────────────────────────────────────────
//  push-pages.mjs — author CMS pages programmatically ("AI composes the page").
//
//  Logs into the live Payload API as an admin and upserts each page in PAGES
//  (create if the slug is new, update if it exists). Pages are built purely from
//  the curated block library — the same blocks a human edits in /admin.
//
//  Run (from cms/):
//    CMS_URL=https://cms.guillensolutions.com \
//    ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=... \
//    node scripts/push-pages.mjs
//
//  Node 18+ (uses global fetch). Nothing is deleted; re-running is idempotent.
// ─────────────────────────────────────────────────────────────────────────────
const CMS_URL = process.env.CMS_URL || 'https://cms.guillensolutions.com'
const EMAIL = process.env.ADMIN_EMAIL
const PASSWORD = process.env.ADMIN_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('✗ Set ADMIN_EMAIL and ADMIN_PASSWORD (your /admin login).')
  process.exit(1)
}

// ── Page definitions (blocks only — the components own the design) ───────────
const ABOUT_VALUES = [
  { icon: 'check',  title: 'Honest & upfront',           body: 'Fixed-scope deliverables and transparent pricing — including any third-party costs, billed to you directly.' },
  { icon: 'shield', title: 'You own everything',         body: 'Domain, website, content, email, phone, and logins are all in your name. Take them and leave anytime.' },
  { icon: 'star',   title: 'Design & hosting',           body: 'We design the site, manage hosting and security, and keep it fast — so you can focus on your business.' },
  { icon: 'users',  title: 'Guidance, not gatekeeping',  body: 'We explain how everything works and advise on your digital presence — in English or Spanish.' },
]
const OWNERSHIP = [
  'You own everything: your domain, website, content, email, phone number, and every login.',
  'We hand you the keys — take your assets and leave anytime. No lock-in, no ransom.',
  'We never manage or authorize your ad spend, or handle your money.',
  'Transparent pricing, including any third-party costs (Google, domain) billed to you directly.',
  'Every service is a defined, fixed-scope deliverable. Tailored combinations are quoted per business.',
]

const PAGES = [
  {
    title: 'About',
    slug: 'about',
    layout: [
      { blockType: 'hero', layout: 'centered', variant: 'default', ctas: [],
        eyebrow: 'About us', headline: 'Why we do what we do',
        subtext: 'Guillen Solutions exists because we watched a small business get taken advantage of — and decided to build the honest alternative.' },
      { blockType: 'imageText', layout: 'image-left', variant: 'default', imageAlt: 'Guillen Solutions',
        eyebrow: 'The story', headline: 'The $2,800 lesson',
        body: "A business we know was charged $2,800 for web development — and never actually owned any of it. Their leads were taken and handed to other clients who paid more. They didn't own their business profiles, their website design, their code, or their content. And they were being billed $2,800 in continuing service for something that was never theirs. Hearing that story, we set out to do the opposite." },
      { blockType: 'featureGrid', columns: '4', variant: 'alt',
        eyebrow: 'What we set out to build', headline: 'Honest, upfront services for small businesses',
        subtext: 'You own your designs. We provide hosting, design services, security, and guidance on your digital presence. Any content you create is yours — and so are your business profiles.',
        items: ABOUT_VALUES },
      { blockType: 'featureGrid', columns: '2', variant: 'default',
        eyebrow: 'The promise', headline: "What you own — and what we don't do",
        items: OWNERSHIP.map(line => ({ icon: 'check', title: line })) },
      { blockType: 'ctaBanner', variant: 'accent',
        eyebrow: "Let's talk", headline: 'Own your online presence.',
        subtext: 'Choose a package, add what you need, and keep every piece of it. English or Español.',
        cta: { label: 'Build your quote', href: '/#configure', variant: 'solid' } },
    ],
  },
]

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
