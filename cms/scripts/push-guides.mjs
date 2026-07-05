// ─────────────────────────────────────────────────────────────────────────────
//  push-guides.mjs — author Guides (CMS Posts) programmatically.
//
//  Logs into the live Payload API as an admin and upserts each article in
//  ARTICLES (create if the slug is new, PATCH if it exists). Article bodies are
//  written in a tiny readable DSL (h2/p/ul/quote + **bold** and [text](href))
//  and compiled to Payload lexical JSON — the same shape site/src/components/
//  RichContent.jsx renders. Uses only native lexical nodes (no embedded blocks),
//  so there's nothing for block validation to reject.
//
//  Run (from cms/):
//    CMS_URL=https://cms.guillensolutions.com \
//    ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=... \
//    node scripts/push-guides.mjs
//
//  Dry run (no network, prints the payloads — used to verify the build):
//    node scripts/push-guides.mjs --dry
//
//  Idempotent; re-running updates the same slugs. Node 18+ (global fetch).
// ─────────────────────────────────────────────────────────────────────────────

const CMS_URL = process.env.CMS_URL || 'https://cms.guillensolutions.com'
const EMAIL = process.env.ADMIN_EMAIL
const PASSWORD = process.env.ADMIN_PASSWORD
const DRY = process.argv.includes('--dry')

// ── lexical builders ─────────────────────────────────────────────────────────
const BOLD = 1
const textNode = (text, format = 0) => ({ type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 })
const linkNode = (href, label) => ({
  type: 'link', version: 1, direction: 'ltr', format: '', indent: 0,
  fields: { linkType: 'custom', url: href, newTab: /^https?:/.test(href) },
  children: [textNode(label)],
})
// inline parser: **bold** and [label](href)
function inline(str) {
  const out = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0, m
  while ((m = re.exec(str))) {
    if (m.index > last) out.push(textNode(str.slice(last, m.index)))
    if (m[1] !== undefined) out.push(textNode(m[1], BOLD))
    else out.push(linkNode(m[3], m[2]))
    last = re.lastIndex
  }
  if (last < str.length) out.push(textNode(str.slice(last)))
  return out.length ? out : [textNode(str)]
}
const para = str => ({ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children: inline(str) })
const head = (tag, str) => ({ type: 'heading', tag, version: 1, direction: 'ltr', format: '', indent: 0, children: inline(str) })
const item = str => ({ type: 'listitem', version: 1, value: 1, direction: 'ltr', format: '', indent: 0, children: inline(str) })
const list = (items, ordered = false) => ({
  type: 'list', tag: ordered ? 'ol' : 'ul', listType: ordered ? 'number' : 'bullet', start: 1,
  version: 1, direction: 'ltr', format: '', indent: 0,
  children: items.map((s, i) => ({ ...item(s), value: i + 1 })),
})
const quote = str => ({ type: 'quote', version: 1, direction: 'ltr', format: '', indent: 0, children: inline(str) })

// DSL: ['h2', str] | ['h3', str] | ['p', str] | ['ul', [..]] | ['ol', [..]] | ['quote', str]
const build = rows => ({
  root: {
    type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
    children: rows.map(([kind, val]) =>
      kind === 'h2' ? head('h2', val) :
      kind === 'h3' ? head('h3', val) :
      kind === 'p' ? para(val) :
      kind === 'ul' ? list(val, false) :
      kind === 'ol' ? list(val, true) :
      kind === 'quote' ? quote(val) :
      para(String(val))
    ),
  },
})

// ── the articles ─────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    title: 'Do you actually own your website? A quick checklist',
    slug: 'do-you-own-your-website',
    excerpt: 'Six things to verify before you trust anyone with your business online — and how to tell an honest web deal from a trap.',
    tags: ['Ownership', 'Small business'],
    publishedAt: '2026-07-05T14:00:00.000Z',
    body: [
      ['p', 'A lot of small businesses find out they never owned their website at the worst possible moment: when they try to leave. The domain turns out to be registered to the "web guy." The content lives on a platform they can\'t export. The leads from their own contact form were quietly going somewhere else. We started Guillen Solutions after watching exactly that happen, so here\'s the plain checklist we wish every owner had before signing anything — with us or anyone.'],
      ['h2', 'The six things to check'],
      ['ol', [
        '**Is the domain registered in your name?** Not the agency\'s account "on your behalf" — your name, your registrar login. This is the single most important one. Whoever holds the domain holds the business.',
        '**Do you have the hosting and CMS logins?** You should be able to log in and change your own content without asking anyone. If updates always route through the vendor, you don\'t control your own site.',
        '**Can you export your content?** Your text, photos, and product data should come out in a standard, portable format any developer can import elsewhere. Ask exactly what you get if you leave.',
        '**Are your accounts yours?** Email, Google Business Profile, any payment processor — in your name, paid by you directly. A vendor that inserts itself between you and those providers can hold them hostage.',
        '**Who gets your leads?** Contact-form submissions and inquiries should go straight to your inbox. If they pass through the vendor first, ask why.',
        '**Is there a written exit path?** Not a promise on a call — a clause. What you receive, in what format, and how long you have to collect it.',
      ]],
      ['quote', 'Ownership isn\'t a feature you pay extra for. It\'s the default you should refuse to give up.'],
      ['h2', 'How to test it in one question'],
      ['p', 'Ask any vendor: "If I leave in a year, what exactly do I walk away with, and what does it cost?" An honest answer is specific — your domain, your content export, your logins, and a clear number (or zero) for the handoff. A vague or defensive answer is the answer.'],
      ['p', 'For the record, here\'s ours: you own your domain, content, and every login from day one; if you leave, you get a runnable copy of the site and your content export, and nothing about your business is held for ransom. That\'s in writing before you sign. If you want to see how we structure it, [build a quote](/pricing) or just [reach out](/pricing) — no pressure, no lock-in.'],
    ],
  },
  {
    title: 'What a small-business website should cost in 2026',
    slug: 'small-business-website-cost-2026',
    excerpt: 'DIY builders, freelancers, agencies, and everything in between — real 2026 numbers, and how to tell what you\'re actually paying for.',
    tags: ['Pricing', 'Guides'],
    publishedAt: '2026-07-04T14:00:00.000Z',
    body: [
      ['p', 'Website pricing is deliberately confusing, so here are honest ranges for 2026 and what actually drives the number. The goal isn\'t to point you at us — it\'s to help you tell a fair quote from a padded one.'],
      ['h2', 'The four tiers, roughly'],
      ['ul', [
        '**DIY builders (Squarespace, Wix):** about $200–$500 a year, and you do all the work. Great if you have the time and taste; the cost is your hours, and you\'re renting, not owning.',
        '**Freelancers:** roughly $1,500–$8,000 for a build. Quality swings wildly with the person, and continuity is the risk — freelancers move on.',
        '**Agencies:** typically $6,000 and up, with overhead and timelines to match. You\'re paying for process and polish, which is worth it at a certain size and overkill below it.',
        '**Component-system studios (like us):** built to sit below freelancer rates by reusing a tested library instead of starting from scratch each time — custom-looking work without the custom-build labor.',
      ]],
      ['h2', 'What actually drives the price'],
      ['p', 'Not the number of products — that\'s a common trap. A catalog of 40 items is one page design plus 40 entries, not 40 pages ([here\'s why](/guides/pages-vs-items)). What drives real cost is the number of hand-designed **page layouts**, custom functionality (online checkout, booking, integrations), and how much content you need someone else to load for you.'],
      ['h2', 'First year vs. every year after'],
      ['p', 'Always separate the two. A healthy structure is a higher first-year number that covers design and setup, then a low, flat annual cost for hosting and domain renewal — agreed in writing. Be wary of two things: a monthly platform fee that only ever goes up, and "cheap" builds that quietly bill you forever or take a cut of your sales.'],
      ['quote', 'The right question isn\'t "what\'s the cheapest?" It\'s "what do I pay in year three, and do I own it by then?"'],
      ['h2', 'The hidden costs to ask about'],
      ['ul', [
        'Transaction fees — some platforms skim a percentage of every online sale on top of card processing.',
        'Lock-in — if leaving means rebuilding from scratch, the low price wasn\'t low.',
        'Content updates — free if you do them yourself; make sure that\'s actually possible.',
      ]],
      ['p', 'If you want a transparent, all-in number for your specific case, our [pricing page](/pricing) builds one live — no "contact us for a quote" wall.'],
    ],
  },
  {
    title: 'Pages vs. items: why a 40-product catalog isn\'t 40 pages',
    slug: 'pages-vs-items',
    excerpt: 'The one idea that keeps a full catalog affordable — and the question it lets you ask to tell an honest web quote from a padded one.',
    tags: ['How it works', 'Guides'],
    publishedAt: '2026-07-03T14:00:00.000Z',
    body: [
      ['p', 'When people hear "I have 40 products," they often assume 40 pages of work and a scary bill. That\'s not how a well-built site works, and understanding why can save you thousands.'],
      ['h2', 'Think of a restaurant'],
      ['p', 'The **pages** are the rooms — the entrance, the dining room, the "about us" wall. The **items** are the dishes on the menu. You can have a lot of dishes, and they all share one menu design. You don\'t rebuild the room every time you add a dish.'],
      ['h2', 'Pages are the layouts'],
      ['p', 'Pages are the parts designed by hand: your home page, about page, services page, or a page that lists all your products. Most businesses need a handful — six is plenty for the majority. Each one is real design work, which is why they\'re what a fair quote should be priced on.'],
      ['h2', 'Items are the things those pages list'],
      ['p', 'Items are the individual entries — one product, one menu item, one listing. The look is designed once, and every item you add uses it automatically. Add a product and it just appears, styled correctly, in the catalog and on its own detail view. No new design, no new page.'],
      ['quote', 'A 40-product catalog is one page plus 40 items — not 40 pages. That\'s the whole trick to an affordable catalog.'],
      ['h2', 'Why it saves you money'],
      ['p', 'You pay once for the layout, then very little (or nothing, if you add them yourself) per item. That\'s how a full catalog stays affordable, and how you can grow from 25 products to 250 without a redesign. You can also group items however you sell them — by category, season, or brand — at no extra charge.'],
      ['h2', 'The question it lets you ask'],
      ['p', 'If a vendor quotes you "per page" for a product catalog, ask whether your products are pages or items. If they say every product is its own page, they\'re either using the wrong tool or padding the bill. On our plans, items are unlimited and free to add yourself — see the [full pricing](/pricing) for how the counts work.'],
    ],
  },
  {
    title: 'Getting found on Google: what actually moves the needle for a local business',
    slug: 'getting-found-on-google-local',
    excerpt: 'The honest version — what helps you show up for "near me" searches, what barely matters, and who\'s overselling you.',
    tags: ['Local SEO', 'Guides'],
    publishedAt: '2026-07-02T14:00:00.000Z',
    body: [
      ['p', 'Plenty of people will promise to "get you to the top of Google." Most of it is smoke. Here\'s the honest breakdown of what actually helps a local business get found — in rough order of impact.'],
      ['h2', 'What actually matters'],
      ['ol', [
        '**Your Google Business Profile.** For "near me" and map searches, this is the single biggest lever — more than your website. Claim it, verify it, fill it out completely, keep hours and photos current. If you do one thing, do this.',
        '**Reviews.** Volume and recency of genuine reviews strongly influence local ranking and, more importantly, whether someone clicks you over the shop next door. Ask happy customers, every time.',
        '**On-page basics.** Your site should clearly say what you do and where — "computer repair in [your town]," not just "tech solutions." Real words your customers actually type.',
        '**Speed and mobile.** A fast, mobile-friendly site is a real (if smaller) ranking signal, and it keeps visitors from bouncing. This is a technical baseline a good build gives you for free.',
        '**Structured data.** Machine-readable markup helps Google — and increasingly AI assistants — understand your business, hours, and services. It\'s plumbing, not magic, but it\'s worth having.',
      ]],
      ['h2', 'What barely matters (or hurts)'],
      ['ul', [
        'Keyword stuffing — writing "best cheap fast plumber plumbing plumb" reads as spam to both people and Google.',
        'Buying backlinks — a fast way to get penalized.',
        'Anyone guaranteeing a #1 ranking — nobody can honestly promise that. If they do, that\'s the tell.',
      ]],
      ['quote', 'We build you a fast, clean, well-structured site and set up your Google Business Profile. We don\'t sell ads or promise rankings — because the people who promise rankings are guessing.'],
      ['h2', 'The honest bottom line'],
      ['p', 'The platform under your site matters far less than most agencies imply. What moves the needle for a local shop is your Google Business Profile, your reviews, and content that says plainly what you do and where. A good website makes all of that easier to convert — but it\'s the foundation, not a magic ranking machine. If you want the foundation done right, that\'s exactly what we build; see [our plans](/pricing) or the [Google Business Profile setup](/pricing) add-on.'],
    ],
  },
]

// ── compile ──────────────────────────────────────────────────────────────────
const posts = ARTICLES.map(a => ({
  title: a.title,
  slug: a.slug,
  excerpt: a.excerpt,
  tags: a.tags.map(text => ({ text })),
  publishedAt: a.publishedAt,
  content: build(a.body),
}))

// ── dry run: verify the payloads build, no network ───────────────────────────
if (DRY) {
  for (const p of posts) {
    const nodes = p.content.root.children.length
    console.log(`• ${p.slug} — "${p.title}" (${p.tags.map(t => t.text).join(', ')}) · ${nodes} blocks`)
  }
  console.log(`\n${posts.length} articles built OK. Sample content JSON for "${posts[0].slug}":`)
  console.log(JSON.stringify(posts[0].content, null, 2).slice(0, 900) + '\n…')
  process.exit(0)
}

// ── live: login + upsert ─────────────────────────────────────────────────────
if (!EMAIL || !PASSWORD) {
  console.error('✗ Set ADMIN_EMAIL and ADMIN_PASSWORD (your /admin login), or pass --dry.')
  process.exit(1)
}

async function login() {
  const res = await fetch(`${CMS_URL}/api/users/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`login failed (${res.status}): ${await res.text()}`)
  const { token } = await res.json()
  if (!token) throw new Error('login returned no token')
  return token
}

async function findBySlug(token, slug) {
  const res = await fetch(`${CMS_URL}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  return data?.docs?.[0] || null
}

async function upsert(token, post) {
  const existing = await findBySlug(token, post.slug)
  const url = existing ? `${CMS_URL}/api/posts/${existing.id}` : `${CMS_URL}/api/posts`
  const method = existing ? 'PATCH' : 'POST'
  const res = await fetch(url, {
    method, headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(post),
  })
  if (!res.ok) throw new Error(`${method} ${post.slug} failed (${res.status}): ${await res.text()}`)
  console.log(`  ✓ ${existing ? 'updated' : 'created'} "${post.slug}"`)
}

const token = await login()
console.log(`Logged in to ${CMS_URL}. Pushing ${posts.length} guide(s)…`)
for (const post of posts) await upsert(token, post)
console.log('Done.')
