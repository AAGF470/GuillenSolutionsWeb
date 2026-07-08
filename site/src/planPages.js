// ---------------------------------------------------------------------------
// Plan-page content — pure data, shared by the React page (fallback render)
// and cms/scripts/push-pages.mjs (CMS authoring). One source of truth.
// ---------------------------------------------------------------------------
export const PLAN_PAGES = {
  freelance: {
    seo: {
      title: 'The Freelance / Solo Plan — $600 First Year',
      description: 'A credible professional website for independent professionals — lawyers, stylists, accountants, designers — $600 all-in first year, then $200/yr. You own everything.',
    },
    hero: {
      eyebrow: 'Freelance / Solo · $600 first year',
      headline: 'A professional site that works as hard as you do.',
      subtext: 'You are the business — your website just has to make that obvious. Three pages designed for you, two you fill in yourself, everything in your name, live in days. No agency price tag for a one-person operation.',
    },
    whoTitle: 'Built for independent professionals',
    whoSub: 'If your clients hire you — not a storefront — this plan fits. A few of the professionals we design for:',
    who: [
      { icon: 'shield', title: 'Freelance lawyer',     body: 'Practice areas, credentials, and a consultation form that reaches you directly — credibility a referral can check in two minutes.' },
      { icon: 'star',   title: 'Freelance designer',   body: 'A clean portfolio grid, your process, and a contact path — the site stays out of the way of the work.' },
      { icon: 'zap',    title: 'Hair stylist',         body: 'Your looks, your price menu, your hours, and a booking link — the page clients send their friends.' },
      { icon: 'check',  title: 'Accountant',           body: 'Services, seasons, and trust signals — plus a secure way for new clients to start a conversation.' },
      { icon: 'users',  title: 'Model / talent',       body: 'A fast portfolio with your comp card, measurements, and representation contact — shareable as one link.' },
      { icon: 'wrench', title: 'Potter / maker',       body: 'A gallery that does your work justice, your story, and where to buy — market-stall charm, professional finish.' },
      { icon: 'home',   title: 'Dog breeder',          body: 'Your program, health testing, available litters as self-serve updates, and a waitlist form.' },
      { icon: 'globe',  title: '…and any solo pro',    body: 'Tutor, photographer, trainer, notary, translator — if it fits on five focused pages, this plan was built for it.' },
    ],
    getTitle: 'What the $600 actually includes',
    get: [
      'Three pages designed for you — home, about/services, contact — on a professional template from our component system.',
      'Two self-serve pages you control completely — add a portfolio, a price list, an FAQ — through your own editor.',
      'Your own CMS: change your words, prices, and photos anytime, free. It shows only what you actually edit.',
      'Domain registered in your name, managed hosting, SSL, and backups — handled.',
      'Everything is yours from day one. Leave anytime and take all of it.',
    ],
    getNote: 'Then $200/yr for hosting + domain renewal — agreed in writing before you sign.',
    steps: [
      { title: 'Tell us about your work', body: 'A short call — what you do, who hires you, and the look you want. English or Español.' },
      { title: 'We design your three pages', body: 'Built on our component system, so it looks custom without custom cost — you review a live preview and we adjust.' },
      { title: 'You fill your self-serve pages', body: 'We hand you your editor and walk you through it. Fifteen minutes and you can run the site yourself.' },
      { title: 'Launch — in your name', body: 'Domain, hosting, and logins are yours. We stay on for the upkeep; you own the asset.' },
    ],
    faq: [
      { q: 'Can I move up to a bigger plan later?', a: 'Yes — your content, domain, and design carry over, and we quote only the difference in work. Nothing is thrown away.' },
      { q: 'What exactly is a "self-serve" page?', a: 'A page whose layout we set up and whose content you fill and update yourself through your editor — a portfolio, price list, or FAQ. Editing is always free.' },
      { q: 'Is the template going to look like everyone else\'s site?', a: 'No — it\'s our in-house design system, themed to you. Same components, your colors, your type, your voice.' },
    ],
    cta: { eyebrow: 'Ready when you are', headline: 'Your name deserves a better search result.', subtext: 'Build a quote in a minute — or reach out and we\'ll talk it through.' },
  },

  standard: {
    seo: {
      title: 'The Standard Business Plan — $950 First Year',
      description: 'A custom-designed, content-managed website for small businesses — 6 pages, 25 items imported, your own editor, $950 all-in first year, then $350/yr. You own everything.',
    },
    hero: {
      eyebrow: 'Standard Business · $950 first year · Most popular',
      headline: 'The full setup, built around your business.',
      subtext: 'Six custom-designed pages, a catalog of your products or services, and an editor that makes updating them yours forever. This is our own system doing what it does best — custom-tier design at a price a small business can actually justify.',
    },
    whoTitle: 'Built for real local businesses',
    whoSub: 'Anything with services, products, hours, and customers who Google first:',
    who: [
      { icon: 'fence',  title: 'Contractor',        body: 'Services by trade, a project gallery that sells the work, service areas, and a call-first layout.' },
      { icon: 'star',   title: 'Restaurant',        body: 'Your menu as items you update yourself — change a price in a minute, no phone call to a web guy.' },
      { icon: 'zap',    title: 'Salon / barbershop', body: 'A service menu with prices, your stylists, your looks, and booking front and center.' },
      { icon: 'wrench', title: 'Auto shop',          body: 'Services, trust signals, hours, and a quote form that reaches the counter.' },
      { icon: 'home',   title: 'Landscaper',         body: 'Seasonal services, before/after galleries, and neighborhoods served.' },
      { icon: 'layers', title: 'Boutique / retail',  body: 'A product catalog as items — 25 imported for you, unlimited after, grouped however you sell.' },
      { icon: 'droplet', title: 'Cleaning service',  body: 'Plans and pricing, service areas, and a booking form — the site that wins the comparison.' },
      { icon: 'users',  title: 'Gym / studio',       body: 'Classes as items, schedules, trainers, and memberships — updated by whoever runs the desk.' },
    ],
    getTitle: 'What the $950 actually includes',
    get: [
      'Up to six pages custom-designed around your business — not a template with your logo on it.',
      'Your catalog: 25 products, menu items, or listings imported for you — then unlimited, self-serve, free, in unlimited groups.',
      'Your own CMS, shaped to your business: prices, photos, hours, items — and nothing you don\'t need.',
      'Domain in your name, managed hosting, SSL, backups, and security — handled.',
      'Built on our in-house component system: tested once, reused everywhere — which is why this costs $950 and not $5,000.',
    ],
    getNote: 'Then $350/yr for hosting + domain renewal — agreed in writing before you sign.',
    steps: [
      { title: 'We learn your business', body: 'What you sell, how customers find you, what needs updating weekly vs. never. English or Español.' },
      { title: 'We design your six pages', body: 'Composed from our component library and themed to you — reviewed on a live preview link, adjusted until it\'s right.' },
      { title: 'We import your catalog', body: 'Your first 25 items go in as structured content — designed once, consistent everywhere, yours to extend for free.' },
      { title: 'Keys handed over', body: 'Domain, editor, and every login in your name — with a walkthrough. We keep it hosted, fast, and safe.' },
    ],
    faq: [
      { q: 'What\'s the difference between pages and items?', a: 'Pages are designed layouts (your home, about, services). Items are the things those pages list — one product, one dish, one service. A 40-product catalog is one page plus 40 items, not 40 pages. That\'s why it\'s affordable.' },
      { q: 'Can my staff update the site?', a: 'Yes — the editor is safe to hand to anyone. Content is editable; the design is locked, so nobody can break the layout.' },
      { q: 'What happens when I outgrow 6 pages?', a: 'Extra pages are $75–200 each depending on depth, quoted before we build. Items are unlimited and free when you add them yourself.' },
    ],
    cta: { eyebrow: 'The one most businesses pick', headline: 'Let\'s build the site your business deserves to be judged by.', subtext: 'Build a quote in a minute — or reach out and we\'ll talk it through.' },
  },

  enhanced: {
    seo: {
      title: 'The Online Business Enhanced Plan — ~$1,900 First Year',
      description: 'Everything in Standard, bigger — plus active management for owners who\'d rather not handle updates themselves. 12 pages, 50 items imported, monthly SEO upkeep, seasonal changes, and more. ~$1,900 first year, then ~$650/yr. You own everything.',
    },
    hero: {
      eyebrow: 'Online Business Enhanced · ~$1,900 first year · actively managed',
      headline: 'Everything in Standard, bigger — and we run the updates for you.',
      subtext: 'Twelve custom-designed pages, a larger catalog, and a team quietly keeping it current — monthly SEO upkeep, seasonal refreshes, a custom inquiry form, and more. For owners who want a growing site without becoming its webmaster.',
    },
    whoTitle: 'Built for owners who\'d rather run the business',
    whoSub: 'When the site matters but your time is better spent elsewhere, active management earns its keep:',
    who: [
      { icon: 'star',   title: 'Busy restaurant owner',   body: 'Seasonal menus and holiday promos swapped for you twice a year — you cook, we keep the site fresh.' },
      { icon: 'layers', title: 'Growing retailer',        body: '50 items imported, more added anytime, and a small integration so your catalog stays accurate — without you touching a spreadsheet.' },
      { icon: 'fence',  title: 'Established contractor',   body: 'Twelve pages of trades and project galleries, redesigned twice a year as your work grows — kept ranking with monthly SEO upkeep.' },
      { icon: 'globe',  title: 'Bilingual business',      body: 'Full Spanish translation included, so both audiences get a first-class site — not a machine-translated afterthought.' },
      { icon: 'zap',    title: 'Seasonal business',       body: 'Two seasonal changeovers a year handled for you — the storm notice, the holiday banner, the summer hours — swapped in and back out on time.' },
      { icon: 'users',  title: 'Owner who won\'t log in',  body: 'You can edit anytime, free — but you\'d rather not. Active management means the changes just get made, and you approve them.' },
    ],
    getTitle: 'What the ~$1,900 actually includes',
    get: [
      'Everything in Standard — then bigger: up to 12 pages (8 designed by us + 4 you assemble), 4 CMS post styles, 50 items imported, 30 GB storage.',
      'Active management: monthly SEO upkeep and 2 seasonal changes a year, handled for you.',
      'A custom inquiry form and a small integration set up as part of the plan — no separate add-on fees.',
      'Full Spanish translation of your site, hand-done by a native speaker — both languages, first-class.',
      '2 page redesigns a year included, then 50% off any further redesigns — plus a QR menu for tables and the counter.',
      '20% off any CG render work when bundled — up from the standard 15%.',
    ],
    getNote: 'Then ~$650/yr — active management is ongoing work, so the recurring is higher than a self-managed plan. Agreed in writing before you sign.',
    steps: [
      { title: 'We learn your business', body: 'What you sell, how customers find you, and what you\'d rather never have to touch yourself. English or Español.' },
      { title: 'We design and translate', body: 'Up to 12 pages composed from our component library, themed to you, and fully translated to Spanish — reviewed on a live preview.' },
      { title: 'We import and integrate', body: 'Your first 50 items go in as structured content, your inquiry form and small integration are wired up, and your QR menu is ready.' },
      { title: 'We keep it running', body: 'Monthly SEO upkeep, seasonal swaps, and your included redesigns — handled on a schedule. You approve; we do the work.' },
    ],
    faq: [
      { q: 'What does "active management" actually cover?', a: 'Monthly SEO upkeep, two seasonal content changes a year, a custom inquiry form, a small integration, full Spanish translation, two page redesigns a year (then 50% off further ones), and a QR menu — all included, not billed as separate add-ons. It\'s the ongoing work of keeping a site current, done for you.' },
      { q: 'How is this different from Standard?', a: 'Standard is the same great site, self-managed: you make the changes, free, in your CMS. Enhanced is bigger (12 pages vs. 10, 50 imports vs. 30, 4 post styles vs. 2) and adds a team that runs the updates for you. If you\'d rather not log in, this is the plan.' },
      { q: 'Why is the recurring ~$650 instead of ~$350?', a: 'Because active management is real, ongoing work — monthly SEO, seasonal swaps, and included redesigns are labor every year, not just hosting. Standard\'s $350 is hosting and domain; Enhanced\'s ~$650 is that plus the management. Both are agreed in writing before you sign.' },
    ],
    cta: { eyebrow: 'A site that grows without the busywork', headline: 'Let\'s build the bigger site — and keep it current for you.', subtext: 'Build a quote in a minute — or reach out and we\'ll talk it through.' },
  },

  'private-hosting': {
    seo: {
      title: 'The Private Hosting Plan — In Development',
      description: 'For clients who want WordPress or their own isolated / dedicated server — maximally portable, kept off our main stack, so any developer can take it over. Specs and pricing are being finalized — reach out to talk it through.',
    },
    hero: {
      eyebrow: 'Private Hosting Plan · in development',
      headline: 'Your own server, maximum portability — let\'s talk it through.',
      subtext: 'For clients who want WordPress or their own isolated, dedicated server, kept off our main stack so any developer anywhere can take it over. We\'re still finalizing the specs and pricing, so this one starts with a conversation, not a fixed quote.',
    },
    whoTitle: 'When a private setup is the right call',
    whoSub: 'Most businesses are best served by our own stack — but a dedicated or WordPress setup wins in specific situations:',
    who: [
      { icon: 'globe',  title: 'Vendor independence first', body: 'You want the option of handing the whole thing to any agency or freelancer, anywhere, with nothing tied to us.' },
      { icon: 'shield', title: 'Isolation requirements',    body: 'You need your site kept on its own dedicated or isolated server, apart from any shared infrastructure.' },
      { icon: 'layers', title: 'WordPress specifically',    body: 'You want WordPress — for its plugin ecosystem, an in-house team that already knows it, or an editor you\'re used to.' },
      { icon: 'check',  title: 'Maximum portability',       body: 'Being able to move the whole setup to any host, maintained by any developer, matters more to you than anything else.' },
    ],
    getTitle: 'What we\'re still finalizing',
    get: [
      'The platform: WordPress, or your own dedicated / managed server — chosen with you.',
      'Maximum portability, so any developer can maintain, extend, or move it.',
      'Kept off our main stack, on its own isolated infrastructure.',
      'Page, CMS, and import specifics — being defined around what you actually need.',
      'Pricing — set honestly once the scope is clear, agreed in writing before anything starts.',
    ],
    getNote: 'This plan is in development: specs and pricing are being finalized, so we scope it with you rather than quote a fixed number up front. Reach out and we\'ll talk through what fits.',
    steps: [
      { title: 'Tell us what you need', body: 'WordPress or a dedicated server? What has to be portable, isolated, or kept apart? English or Español.' },
      { title: 'We scope it honestly', body: 'We research what your setup actually requires and define the platform, pages, and CMS around it — no guessing, no padding.' },
      { title: 'We price it in writing', body: 'Once the scope is clear, we put a fair number and the recurring in writing — nothing starts until you\'ve seen it.' },
      { title: 'We build it portable', body: 'Set up on your own server or WordPress, in your name, so any developer can take it over. You own it outright.' },
    ],
    faq: [
      { q: 'Why is there no fixed price yet?', a: 'This plan is genuinely still in development. A dedicated or WordPress setup varies a lot by what you need — the server, the platform, the integrations — so pricing it honestly means scoping it with you first, then putting a real number in writing. We\'d rather do that than quote a placeholder we\'d have to change.' },
      { q: 'How is this different from your Standard plan?', a: 'Standard runs on our own fast, headless stack, which is cheaper and easier for us to keep safe. This plan is for when you specifically want WordPress or your own isolated / dedicated server — maximally portable and off our main stack — and are willing to trade our efficiency for that independence.' },
      { q: 'Can any developer take this over?', a: 'Yes — that\'s the whole point. WordPress or a standard dedicated server, in your name, with full access handed over. Any competent developer can pick it up with no dependency on us.' },
    ],
    cta: { eyebrow: 'In development — let\'s scope it together', headline: 'Tell us what you need, and we\'ll figure out the right setup.', subtext: 'Reach out and we\'ll talk it through — no fixed quote, just an honest conversation about what fits.' },
  },
}
