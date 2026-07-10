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
  {
    title: 'Squarespace vs. a website you own: an honest comparison',
    slug: 'squarespace-vs-owning-your-website',
    excerpt: 'Squarespace is genuinely good at what it does. Here\'s the fair comparison nobody gives you — including the five-year math and what happens the day you stop paying.',
    tags: ['Compare', 'Small business'],
    publishedAt: '2026-07-10T14:00:00.000Z',
    body: [
      ['p', 'Let\'s start where most agency comparisons won\'t: Squarespace is good. The templates are genuinely polished, everything is in one place, and at $16–$39 a month (as of mid-2026) it\'s one of the cheapest ways to look respectable online. If it were bad, this article would be easy. It\'s not bad — it\'s a rental. The comparison worth making is what renting actually means for a business.'],
      ['h2', 'Where Squarespace genuinely wins'],
      ['ul', [
        '**Day-one speed.** You can have a decent site live this weekend, yourself, for the price of lunch.',
        '**All-in-one simplicity.** Hosting, templates, email campaigns, scheduling — one login, nothing to maintain.',
        '**Low cash cost.** Around $276/yr on the Core plan (annual billing) is less cash than any custom build. If your time is free and a template fits, it\'s the budget winner.',
      ]],
      ['h2', 'What renting actually means'],
      ['ul', [
        '**Stop paying and the site goes dark.** A lapsed Squarespace subscription shows visitors a "website expired" page — invisible to customers and to Google until you resubscribe. You\'re not pausing a service; you\'re turning off your business\'s front door.',
        '**You can\'t take it with you.** The export is a limited WordPress file: basic pages and one blog. Your store pages, products, galleries, custom styling, and design don\'t come out. Years of work stay behind.',
        '**The design ceiling is the template.** Custom code injection needs the mid tier or higher, and even then you\'re decorating their structure, not building yours.',
        '**Selling costs extra.** The entry plan adds its own fee on top of card processing for physical products; removing it means a higher tier.',
        '**Spanish costs extra, too.** There\'s no built-in multilingual — the official path is a paid third-party service, or maintaining duplicate pages by hand. For a bilingual business, that\'s a real gap.',
      ]],
      ['h2', 'The honest five-year math'],
      ['p', 'Squarespace Core, billed annually, runs about $1,400 over five years — plus every hour you spend building and maintaining it yourself. Our Standard plan runs about $2,350 over the same five years ($950 first year, then $350/yr). So yes: in pure cash, DIY is cheaper. What the difference buys is a site custom-designed around your business by someone else\'s hours, full English/Español at no premium, and — the part we care most about — **ownership**: your domain, your content, your logins, and a written exit path with a runnable copy of your site if you ever leave. Rent never converts to equity; a build does.'],
      ['h2', 'Who should still pick Squarespace'],
      ['p', 'Honestly: a solo owner with more time than budget, whose business fits a template, who doesn\'t sell in two languages, and who\'s comfortable doing their own updates forever. That\'s a real profile and Squarespace serves it well. If that\'s you today, take the $16 plan with our blessing — and keep the [ownership checklist](/guides/do-you-own-your-website) for the day you outgrow it.'],
      ['p', 'If you\'d rather own the asset than rent the template, that\'s the exact gap we built for: [see the plans](/pricing) — every number flat, all-in, and confirmed in writing.'],
    ],
  },
  {
    title: 'Wix vs. a website you own: an honest comparison',
    slug: 'wix-vs-owning-your-website',
    excerpt: 'Wix has the biggest app market in DIY and no sales commission. It also exports nothing — your site can never leave. Here\'s the fair trade-off, spelled out.',
    tags: ['Compare', 'Small business'],
    publishedAt: '2026-07-10T13:00:00.000Z',
    body: [
      ['p', 'Wix deserves a fair shake: it has the biggest app market of any site builder, drag-anywhere freedom, real multilingual support, strong booking and restaurant tools, and — credit where due — it takes no commission on your sales (you pay standard card processing, around 2.9% + 30¢ with Wix Payments as of mid-2026). For feature-heavy DIY on a budget, it\'s arguably the strongest platform. So here\'s the one sentence that should still give a business owner pause: **a Wix site can never leave Wix.**'],
      ['h2', 'The lock-in, precisely'],
      ['ul', [
        '**No export, period.** This isn\'t a limitation buried in fine print — Wix\'s own help pages say the site can\'t be transferred or hosted elsewhere. You can export your products, contacts, and orders as spreadsheets. The site itself — pages, design, layout, years of tweaks — stays, forever.',
        '**Rebuilds, not redesigns.** On the classic editor you still can\'t switch templates on an existing site; the official path is building a new site and copying content over by hand.',
        '**Lapsed payment = ads on your business.** Stop paying and your site stays up, but with Wix advertising on it and your custom domain disconnected — and a Wix-registered domain that lapses too long can take the whole site down with it.',
        '**The real plan costs more than the ad.** The advertised entry price doesn\'t take payments; selling anything means the mid tier, around $350/yr billed annually — and noticeably more if you pay monthly.',
      ]],
      ['h2', 'What "owning it" looks like instead'],
      ['p', 'A site you own is a thing that exists outside any platform: your domain at your registrar, your content in a portable database, your site as real code that any developer — or any future you — can host anywhere. That\'s how we build: if you leave us, you get a runnable copy of the whole site and a clean content export, in writing, before you ever sign. The test works on anyone, us included: ask "what exactly do I walk away with?" Wix\'s honest answer is spreadsheets. Ours is the site.'],
      ['h2', 'Who should still pick Wix'],
      ['p', 'If you need a specific Wix app, love tinkering, sell in one language or are happy with its multilingual tool, and accept that the site lives there for good — Wix will treat you fine, and cheaper than we can in cash. Plenty of businesses thrive on it. Just make the lock-in a decision you made on purpose, not a surprise you find out at moving time.'],
      ['p', 'And if ownership is the point: our plans start at $600 all-in for the first year, custom-designed, bilingual at no premium, with the exit path in writing. [Price it yourself](/pricing) — it takes about a minute.'],
    ],
  },
  {
    title: 'An affordable website for your non-profit — without giving up ownership',
    slug: 'nonprofit-website-guide',
    excerpt: 'What a small non-profit actually needs online, what it should cost, and the ownership trap that hits mission-driven organizations hardest.',
    tags: ['Non-profits', 'Guides'],
    publishedAt: '2026-07-10T16:00:00.000Z',
    body: [
      ['p', 'Small non-profits get squeezed from two directions online: agencies quote them like corporations, and "free" tools slowly sprawl into a mess of half-finished pages nobody can update. This is the plain guide we\'d give any organization — what you actually need, what it should cost, and the one risk that hits non-profits harder than any business.'],
      ['h2', 'What a small non-profit actually needs'],
      ['ul', [
        '**A clear mission page** — what you do, who it helps, and proof (photos, numbers, stories).',
        '**A donate path that goes straight to you.** Your donation provider, your account, funds flowing directly — never through a middleman, us included. We connect whichever provider you choose at no integration charge.',
        '**A way to update it without a developer** — events, programs, and announcements change monthly; the site should be editable by whoever runs the desk.',
        '**Volunteer & contact routes** that land in the org\'s inbox, not a vendor\'s.',
        '**Both languages, if your community speaks both.** For a lot of the communities we serve, English/Español isn\'t a nice-to-have.',
      ]],
      ['h2', 'The ownership trap — worse for non-profits'],
      ['p', 'Here\'s the failure mode we\'ve seen more than any other: the site was set up years ago by a volunteer, a board member\'s nephew, or a long-gone staffer — and the domain, hosting, and logins live in **their** personal accounts. People rotate through non-profits constantly. When that person moves on, the organization discovers it doesn\'t control its own website, sometimes not even its own domain. Whatever you build and whoever builds it, insist on this: **domain, hosting, and every login registered to the organization**, documented where the board can find them. (Our full [ownership checklist](/guides/do-you-own-your-website) applies doubly here.)'],
      ['h2', 'What it should cost'],
      ['p', 'Honestly? If a volunteer has the time and a free builder tier fits, that\'s a legitimate start — just do it in the org\'s accounts. For a professional build, we don\'t have a rigid non-profit discount; we price mission-driven work **case by case**, and we\'ve waived build costs entirely for causes we believe in. Every arrangement goes in writing, the organization owns everything from day one, and donations never touch our hands. If that sounds fair, [tell us about your organization](/contact) — no pitch, just a conversation.'],
    ],
  },
  {
    title: 'What an AI phone menu is — and why a small business might want one',
    slug: 'ai-phone-menu-explained',
    excerpt: 'A natural-sounding AI voice answers your line and routes every call — "press 1 for sales, 2 for support." What it is, what it costs, and who actually needs it.',
    tags: ['AI phone menu', 'How it works'],
    publishedAt: '2026-07-10T15:00:00.000Z',
    body: [
      ['p', 'When a customer calls a business and a clear, professional voice answers — "Thanks for calling. For sales, press 1. For support, press 2." — that business instantly sounds established. It used to take a receptionist or an expensive phone system to get there. Now it takes a studio-produced AI voice and a phone menu, and it\'s within reach of a one-person shop.'],
      ['h2', 'What it is (and isn\'t)'],
      ['p', 'An AI phone menu is a recorded, natural-sounding AI voice on your business line that greets callers and routes them — to you, to a voicemail box, to an after-hours message. It\'s **not** a bot pretending to be a human on the phone: callers hear an obviously professional menu, exactly like calling a bigger company. The "AI" part is how the voice is produced — studio quality, any script, updated in days instead of re-booking a voice actor.'],
      ['h2', 'Why it\'s worth it for a small business'],
      ['ul', [
        '**You stop sounding small.** A bare cell number that rings out is the phone equivalent of no website.',
        '**Calls get sorted before they interrupt you.** Sales inquiries, existing customers, and wrong numbers route differently — you answer what matters.',
        '**After-hours stops costing you customers.** A clear message with hours and options beats a dead ring at 9pm.',
        '**It can greet in two languages.** A bilingual menu ("para español, marca 2") serves your whole community from the first second — few small businesses do it, and it shows.',
      ]],
      ['h2', 'How we price it — and who owns it'],
      ['p', 'Ours is a **$200 one-time setup**: we script your menu with you, produce the AI voice, and configure the routing. The phone number and voice service then run on a **low-cost subscription in your own name, paid by you directly** — consistent with how we do everything: no middleman bills, no lock-in, and if you ever leave us, your number and menu keep working because they were never ours. You can hear what the voice quality sounds like on [our pricing page](/pricing), and the [plans](/pricing) page has the full add-on list.'],
      ['h2', 'Who doesn\'t need one'],
      ['p', 'If you answer every call yourself and like it that way, or your customers only ever text or DM — skip it. A phone menu earns its keep when missed or misrouted calls are actually costing you business. If that\'s where you are, [talk to us](/contact) and we\'ll set it up in a week.'],
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
