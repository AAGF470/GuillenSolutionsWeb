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
import { PACKAGES, OWNERSHIP, GROWTH_NOTE, PRICING_PROMISE, POSITIONING, CONTACT_EMAIL, CMS_LEAD, RUN_SAFE_POINTS, SERVICES, REFERRAL_PROGRAM } from '../data'

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
  cta:         { label: 'Build your quote', href: '/pricing#order', variant: p.featured ? 'solid' : 'ghost-bordered' },
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
        eyebrow="Digital business solutions · English & Español"
        headline="Everything your business needs to look real online — and you own all of it."
        subtext="Websites, studio-quality product images, and the business setup around them — email, phone, profiles — built for small businesses, priced flat, and put in your name. If you ever leave, you take every piece with you."
        ctas={[
          { label: 'See what we do',   href: '#services',  variant: 'solid' },
          { label: 'Build your quote', href: '/pricing', variant: 'ghost' },
        ]}
        layout="left"
      />

      {/* The service lines — websites are the core, no longer the whole story */}
      <section className="section section--alt gs-svc" id="services">
        <div className="section-container">
          <p className="section-eyebrow">What we do</p>
          <h2 className="section-title">One team for your digital presence</h2>
          <p className="section-sub">
            Most clients start with a website. But everything a small business needs
            to look established — the site, the product photos, the email, the phone
            line — comes from the same system, the same team, and the same promise:
            you own it.
          </p>
          <div className="gs-svc__grid">
            {SERVICES.map(s => (
              <Link key={s.id} to={s.to} className="gs-svc__card">
                <span className="gs-svc__tag">{s.tag}</span>
                <h3 className="gs-svc__title">{s.title}</h3>
                <p className="gs-svc__body">{s.body}</p>
                <span className="gs-svc__foot">
                  <span className="gs-svc__price">{s.price}</span>
                  <span className="gs-svc__link">{s.linkLabel} →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="How websites work here"
        headline="Honest digital services, start to finish"
        subtext="Design, hosting, security, and guidance — with one promise underneath all of it: everything we build is yours."
        items={WHAT_WE_DO}
        columns={4}
        variant="default"
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

      {/* CG product renders — the newest service line, spotlighted */}
      <ImageText
        eyebrow="New — CG product renders"
        headline="Product photos, without the photo studio"
        body="We build a 3D model of your product once, then render every shot you need from it — clean white-background listing images, detail crops, and staged lifestyle scenes. No samples shipped, no reshoot fees, and every extra shot is cheap because the model already exists. From $150 per product, with multi-shot packages made for small businesses — and 15% off when bundled with a website."
        image="/img/sample-2.svg"
        imageAlt="CG product render examples"
        layout="image-left"
        cta={{ label: 'Explore product renders', href: '/renders', variant: 'solid' }}
        variant="default"
      />

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
            ship — and every new component lands in your toolkit too, free. Every client gets
            controlled access to all of it: your content is yours to change, while the design
            system keeps every page safe and consistent. That's how you get custom-tier design
            at near-template cost.
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

      {/* What you own / what we don't do — same Checklist component the CMS
          version renders, so both sources are pixel-identical. */}
      <Checklist
        eyebrow="The promise"
        headline="What you own — and what we don't do"
        items={OWNERSHIP}
        variant="alt"
      />

      {/* Referral commission — open to anyone, not just clients */}
      <section className="section section--default gs-refer">
        <div className="section-container">
          <p className="section-eyebrow">{REFERRAL_PROGRAM.eyebrow}</p>
          <h2 className="section-title">{REFERRAL_PROGRAM.headline}</h2>
          <p className="section-sub">{REFERRAL_PROGRAM.lead}</p>
          <div className="gs-refer__steps">
            {REFERRAL_PROGRAM.steps.map((s, i) => (
              <div key={s.title} className="gs-refer__step">
                <span className="gs-refer__num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <p className="gs-refer__fine">{REFERRAL_PROGRAM.fine}</p>
        </div>
      </section>

      <section className="section section--accent gs-home-cta">
        <div className="section-container">
          <p className="section-eyebrow">Ready?</p>
          <h2 className="section-title">Let's get your business online — the honest way.</h2>
          <p className="section-sub">
            Build a quote in a minute, or reach out and we'll talk it through. Boston in person, everywhere else remote. English or Español.
          </p>
          <div className="gs-home-cta__actions">
            <Link className="gs-btn-solid" to="/pricing">Build your quote</Link>
            <a className="gs-btn-ghost" href={`mailto:${CONTACT_EMAIL}`}>Get in touch</a>
          </div>
        </div>
      </section>
    </>
  )
}
