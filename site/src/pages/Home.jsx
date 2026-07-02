import { Link } from 'react-router-dom'
import './Home.css'
import {
  HeroSection,
  FeatureGrid,
  ImageText,
  Steps,
  PricingPlans,
  Checklist,
} from '@aagf470/ui'
import PackageConfigurator from '../components/PackageConfigurator.jsx'
import { PACKAGES, OWNERSHIP, GROWTH_NOTE, PRICING_PROMISE, POSITIONING, CONTACT_EMAIL, CMS_LEAD, RUN_SAFE_POINTS } from '../data'

// Map shared pricing data → PricingPlans plan shape
const PLANS = PACKAGES.map(p => ({
  badge:       p.badge,
  tag:         p.tag,
  name:        p.name,
  price:       p.price,
  period:      p.period,
  description: p.description,
  note:        p.note,
  features:    p.features,
  featured:    p.featured,
  cta:         { label: 'Build your quote', href: '#configure', variant: p.featured ? 'solid' : 'ghost-bordered' },
}))

const WHAT_WE_DO = [
  { icon: 'star',   title: 'A custom-designed site',    body: 'Designed around your business on our in-house component system — custom-tier looks at template speed and cost, not a cookie-cutter template.' },
  { icon: 'layers', title: 'Update it yourself',        body: 'A simple control panel — your own CMS — that shows only what you actually change, so you can update the site yourself without touching code or breaking the design.' },
  { icon: 'shield', title: 'Managed hosting & security', body: 'SSL, backups, and uptime handled for you. You never have to think about servers or certificates.' },
  { icon: 'check',  title: 'You own everything',        body: 'Domain, content, accounts, and logins in your name from day one. Leave anytime with all of it.' },
]

const STEPS = [
  { title: 'Choose a package', body: 'Pick a base package and add only the pieces you need. The configurator gives you a transparent, all-in number.' },
  { title: 'We design & build', body: 'We build your site on our component system (or WordPress), sized to your business and ready for your content.' },
  { title: 'We set it up & explain it', body: 'Hosting, domain, SSL, and accounts — all configured in your name. Then we walk you through how everything works.' },
  { title: 'We hand you the keys', body: 'You own the domain, content, logins, and every asset. No lock-in, and we never touch your ad spend or your money.' },
]

const LIBRARY_PEEK = [
  { icon: 'star',   title: 'Heroes & banners',   body: 'Bold openers and call-to-action banners that set the tone.' },
  { icon: 'layers', title: 'Pricing & packages', body: 'Clear pricing tables and service menus — like the ones on this page.' },
  { icon: 'map',    title: 'Galleries & FAQs',   body: 'Project galleries, testimonials, and accessible FAQ accordions.' },
  { icon: 'mail',   title: 'Contact & forms',    body: 'Inquiry forms and hours/location blocks that route straight to you.' },
]

export default function Home() {
  return (
    <>
      <HeroSection
        eyebrow="Websites for small businesses · English & Español"
        headline="Get your business online — and own every piece of it."
        subtext="We design your website, set up everything around it, and put every login in your name. You update it yourself in plain English — and if you ever leave, you take all of it with you."
        ctas={[
          { label: 'See packages',     href: '#packages',  variant: 'solid' },
          { label: 'Build your quote', href: '#configure', variant: 'ghost' },
        ]}
        layout="left"
      />

      <FeatureGrid
        eyebrow="What we do"
        headline="Honest web services, start to finish"
        subtext="Design, hosting, security, and guidance — with one promise underneath all of it: everything we build is yours."
        items={WHAT_WE_DO}
        columns={4}
        variant="alt"
      />

      <ImageText
        eyebrow="Why we do it"
        headline="We built the opposite of a bad deal"
        body="A business we know was charged $2,800 for a website they never actually owned — their leads were siphoned to competitors who paid more, and their domain, content, and profiles were held hostage. We started Guillen Solutions to do the exact opposite: honest, upfront, and yours to keep."
        image="/img/sample-1.svg"
        imageAlt="Guillen Solutions"
        layout="image-right"
        cta={{ label: 'See what we build', href: '/work', variant: 'ghost-bordered' }}
        variant="default"
      />

      {/* Where we fit — the honest comparison against every alternative */}
      <FeatureGrid
        eyebrow="Where we fit"
        headline="Between doing it yourself and paying an agency"
        subtext="Tailored, long-term, content-managed websites that you own — the gap the alternatives leave open."
        items={POSITIONING}
        columns={4}
        variant="default"
      />

      <Steps
        eyebrow="How it works"
        headline="From package to keys in four steps"
        items={STEPS}
        variant="alt"
      />

      <div id="packages">
        <PricingPlans
          eyebrow="Packages"
          headline="Flat, all-in pricing"
          subtext={`Three tiers, one flat first-year price covering design, hosting, and your domain — then a low yearly rate for hosting + domain renewal, billed transparently. ${PRICING_PROMISE}`}
          plans={PLANS}
          variant="default"
        />
        <div className="gs-inline-note-wrap">
          <p className="gs-note">
            Each plan has its own deep dive ({' '}
            <Link to="/plans/freelance">Freelance</Link> ·{' '}
            <Link to="/plans/standard">Standard</Link> ·{' '}
            <Link to="/plans/wordpress">WordPress</Link>{' '}
            ) and every option lives on one page at <Link to="/pricing">full pricing &amp; order</Link>.
          </p>
          <p className="gs-note">{GROWTH_NOTE}</p>
        </div>
      </div>

      {/* Your custom CMS + security, one section — the run-it-yourself promise */}
      <FeatureGrid
        eyebrow="Run it yourself"
        headline="Your own control panel, built around your business"
        subtext={CMS_LEAD}
        items={RUN_SAFE_POINTS}
        columns={4}
        variant="alt"
      />

      {/* Component library snippet */}
      <section className="section section--default gs-libpeek">
        <div className="section-container">
          <p className="section-eyebrow">Built-in toolkit</p>
          <h2 className="section-title">Your site is built from a real component library</h2>
          <p className="section-sub">
            Every Guillen Solutions site is assembled from the same tested, mobile-ready,
            light-and-dark component set — the one this very page uses. One theme file morphs
            it into completely different looks, and the library grows with every project we
            ship. Every client gets controlled access to all of it: your content is yours to
            change, while the design system keeps every page safe and consistent. That's how
            you get custom-tier design at near-template cost.
          </p>

          <div className="gs-libpeek__stat">
            <span className="gs-libpeek__num">47<sup>+</sup></span>
            <span className="gs-libpeek__stat-copy">
              <span className="gs-libpeek__stat-label">components and counting</span>
              <span className="gs-libpeek__stat-sub">Yours to use — no code required.</span>
            </span>
          </div>

          <div className="gs-libpeek__grid">
            {LIBRARY_PEEK.map(item => (
              <div key={item.title} className="gs-libpeek__card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <Link to="/work#library" className="gs-libpeek__cta">Explore the full component library →</Link>
        </div>
      </section>

      {/* Configuration form */}
      <section id="configure" className="section section--default gs-configure">
        <div className="section-container">
          <p className="section-eyebrow">Build your quote</p>
          <h2 className="section-title">Configure your setup</h2>
          <p className="section-sub">
            Choose a package and add-ons to see a transparent, all-in estimate. Nothing is charged —
            it's just a starting point we'll confirm in writing.
          </p>
          <PackageConfigurator />
        </div>
      </section>

      {/* What you own / what we don't do — same Checklist component the CMS
          version renders, so both sources are pixel-identical. */}
      <Checklist
        eyebrow="The promise"
        headline="What you own — and what we don't do"
        items={OWNERSHIP}
        variant="alt"
      />

      <section className="section section--accent gs-home-cta">
        <div className="section-container">
          <p className="section-eyebrow">Ready?</p>
          <h2 className="section-title">Let's get your business online — the honest way.</h2>
          <p className="section-sub">
            Build a quote in a minute, or reach out and we'll talk it through. Boston in person, everywhere else remote. English or Español.
          </p>
          <div className="gs-home-cta__actions">
            <a className="gs-btn-solid" href="#configure">Build your quote</a>
            <a className="gs-btn-ghost" href={`mailto:${CONTACT_EMAIL}`}>Get in touch</a>
          </div>
        </div>
      </section>
    </>
  )
}
