import { useParams } from 'react-router-dom'
import {
  HeroSection, FeatureGrid, Steps, PricingPlans, Faq, CtaBanner, Checklist,
} from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import { PACKAGES } from '../data'

// ---------------------------------------------------------------------------
// PlanPage — one config-driven sales page per package (/plans/:planId).
// Deliberately built from the same library blocks as everything else:
// the page that sells the system is made of the system.
// ---------------------------------------------------------------------------

const pkg = id => PACKAGES.find(p => p.id === id)

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

  wordpress: {
    seo: {
      title: 'The WordPress Business Plan — $1,350 First Year',
      description: 'A small-business website on WordPress for maximum portability — any developer can maintain it. $1,350 all-in first year, then $500/yr with managed updates and security.',
    },
    hero: {
      eyebrow: 'WordPress Business · $1,350 first year',
      headline: 'Maximum portability, zero dependence on us.',
      subtext: 'The same six-page, catalog-driven setup as our Standard plan — built on WordPress, the platform half the internet runs on. Any developer in the world can maintain it, which makes it the right choice if never depending on one vendor matters most to you.',
    },
    whoTitle: 'When WordPress is the right call',
    whoSub: 'Our own system is faster and cheaper to keep safe — but WordPress wins in specific situations:',
    who: [
      { icon: 'globe',  title: 'Vendor independence first', body: 'You want the option of walking into any agency or hiring any freelancer, anywhere, and having them take over cold.' },
      { icon: 'users',  title: 'In-house help later',       body: 'You plan to bring marketing or web work in-house — WordPress skills are the easiest to hire for.' },
      { icon: 'layers', title: 'Plugin ecosystem needs',    body: 'You need something niche — memberships, events, specific integrations — that WordPress plugins already solve.' },
      { icon: 'check',  title: 'Familiarity',               body: 'You\'ve run WordPress before and want the editor you already know.' },
    ],
    getTitle: 'What the $1,350 actually includes',
    get: [
      'Up to six designed pages on WordPress, with a clean, fast theme — not a bloated page-builder mess.',
      'Your catalog: 25 products or listings imported, then unlimited self-serve through the WordPress editor.',
      'Domain in your name, managed hosting, SSL, and backups — handled.',
      'Full admin access from day one. It\'s your WordPress, not ours.',
      'Maximum portability: any developer can maintain, extend, or move it.',
    ],
    getNote: 'Then $500/yr — more than our Standard plan\'s $350. The section below explains exactly why, because you deserve to know what you\'re paying for.',
    why: {
      eyebrow: 'Priced honestly',
      title: 'Why WordPress renewal costs more — the honest breakdown',
      sub: 'We charge each platform what it actually costs to run safely — never as a lock-in lever. WordPress\'s upkeep is genuinely heavier, for three reasons:',
      items: [
        { icon: 'zap',    title: 'Heavier to run',           body: 'WordPress needs a PHP server and database running around the clock. Our own system serves your site as pre-built static pages — faster for visitors and far cheaper to keep online.' },
        { icon: 'shield', title: 'Bigger attack surface',    body: 'WordPress powers much of the web, which makes it the internet\'s most-attacked platform — and plugins are its weakest point. Staying safe means continuous core updates, plugin patching, and monitoring. Our headless setup has almost nothing exposed to attack.' },
        { icon: 'globe',  title: 'You\'re buying headroom',  body: 'The premium is really the price of portability: a general-purpose platform any developer can take over is less efficient than a system purpose-built for your site. That trade is worth it to some businesses — and we price it at cost, not as a penalty.' },
        { icon: 'check',  title: 'What the $500 covers',     body: 'Managed hosting, SSL, daily backups, core and plugin updates, security patching, and monitoring — the full upkeep, in writing, no surprises.' },
      ],
    },
    steps: [
      { title: 'We learn your business', body: 'Same discovery as every plan — what you sell, who buys, what changes often. English or Español.' },
      { title: 'We build on WordPress', body: 'A lean theme, your six pages, and a tuned editor — none of the plugin bloat that makes WordPress sites slow.' },
      { title: 'We import your catalog', body: 'Your first 25 items structured properly, so adding more yourself is painless.' },
      { title: 'Keys handed over', body: 'Full admin, domain, and hosting in your name. We keep it updated, patched, and backed up.' },
    ],
    faq: [
      { q: 'Why is the renewal $500 when Standard is $350?', a: 'Managed WordPress genuinely costs more to keep safe: core updates, plugin patching, PHP hosting, and security monitoring are ongoing work. Our own system is headless and static-served, so there\'s simply less to defend. We price each platform at what it actually costs — never as a lock-in lever.' },
      { q: 'Can another developer really take this over?', a: 'Yes — that\'s the point of this plan. Standard WordPress, standard hosting, full admin access, and your repository handed over. Any WordPress developer can pick it up cold.' },
      { q: 'Which plan should I actually pick?', a: 'If you want the best value and design, Standard. If guaranteed portability to any developer outweighs the higher upkeep, WordPress. We\'ll tell you honestly which fits — even when it\'s the cheaper one.' },
    ],
    cta: { eyebrow: 'Portability, priced honestly', headline: 'Your site, on the platform the whole world speaks.', subtext: 'Build a quote in a minute — or reach out and we\'ll talk it through.' },
  },
}

function NotFound() {
  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>
      <title>Plan not found — Guillen Solutions</title>
      <meta name="robots" content="noindex" />
      <h1>Plan not found</h1>
      <p style={{ opacity: 0.7 }}>See all packages on the home page instead.</p>
      <a className="gs-nav__cta" href="/#packages">See packages</a>
    </section>
  )
}

export default function PlanPage() {
  const { planId } = useParams()
  const plan = PLAN_PAGES[planId]
  const data = pkg(planId)
  if (!plan || !data) return <NotFound />

  return (
    <>
      <Seo {...plan.seo} path={`/plans/${planId}`} />
      <HeroSection
        eyebrow={plan.hero.eyebrow}
        headline={plan.hero.headline}
        subtext={plan.hero.subtext}
        size="compact"
        variant="alt"
        ctas={[{ label: 'Build your quote', href: '/#configure', variant: 'solid' }]}
      />
      <FeatureGrid
        eyebrow="Who it's for"
        headline={plan.whoTitle}
        subtext={plan.whoSub}
        items={plan.who}
        columns={4}
        variant="default"
      />
      <Checklist
        eyebrow="What you get"
        headline={plan.getTitle}
        items={plan.get}
        note={plan.getNote}
        variant="alt"
      />
      {plan.why && (
        <FeatureGrid
          eyebrow={plan.why.eyebrow}
          headline={plan.why.title}
          subtext={plan.why.sub}
          items={plan.why.items}
          columns={4}
          variant="default"
        />
      )}
      <Steps
        eyebrow="How it works"
        headline="From first call to keys in hand"
        items={plan.steps}
        variant="default"
      />
      <PricingPlans
        eyebrow="The numbers"
        headline="Flat, all-in, in writing"
        plans={[{
          badge: data.badge, tag: data.tag, name: data.name, price: data.price,
          period: data.period, description: data.description, note: data.note,
          features: data.features, featured: true,
          cta: { label: 'Build your quote', href: '/#configure', variant: 'solid' },
        }]}
        variant="alt"
      />
      <Faq
        eyebrow="Good to know"
        headline="Common questions"
        items={plan.faq}
        variant="default"
      />
      <CtaBanner
        eyebrow={plan.cta.eyebrow}
        headline={plan.cta.headline}
        subtext={plan.cta.subtext}
        cta={{ label: 'Build your quote', href: '/#configure', variant: 'solid' }}
        variant="accent"
      />
    </>
  )
}
