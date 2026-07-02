import { Link } from 'react-router-dom'
import { HeroSection, PricingPlans, ServiceList, CtaBanner } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import PackageConfigurator from '../components/PackageConfigurator.jsx'
import { Estimator } from './OnDemand.jsx'
import { PACKAGES, ADDONS, ON_DEMAND, PRICING_PROMISE } from '../data'
import './OnDemand.css'

// ---------------------------------------------------------------------------
// Pricing & order — every plan, add-on, and on-demand service on one page,
// with full deliverable descriptions and both live estimators. The single
// place a buyer can see (and price) everything we sell.
// ---------------------------------------------------------------------------

const PLANS = PACKAGES.map(p => ({
  badge: p.badge, tag: p.tag, name: p.name, price: p.price, period: p.period,
  description: p.description, note: p.note, features: p.features, featured: p.featured,
  cta: { label: 'Configure below', href: '#order', variant: p.featured ? 'solid' : 'ghost-bordered' },
}))

const toServices = list => list.map(a => ({ name: a.name, description: a.body, price: a.price }))

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing & Order"
        description="Every plan, add-on, and on-demand service with full deliverable descriptions and honest prices — plus live estimators to build your own quote."
        path="/pricing"
      />
      <HeroSection
        eyebrow="Full pricing"
        headline="Everything we sell, on one page."
        subtext={`All three plans, every launch add-on, and every on-demand service, with what each one actually includes. ${PRICING_PROMISE}`}
        size="compact"
        variant="alt"
        ctas={[{ label: 'Build your order', href: '#order', variant: 'solid' }]}
      />

      <div id="plans">
        <PricingPlans
          eyebrow="The plans"
          headline="Three ways in"
          subtext="One flat first-year price covering design, hosting, and your domain, then a yearly rate for hosting and renewal. Each plan has a full deep-dive page if you want the long version."
          plans={PLANS}
          variant="default"
        />
        <div className="gs-inline-note-wrap">
          <p className="gs-note">
            Deep dives: <Link to="/plans/freelance">Freelance / Solo</Link> ·{' '}
            <Link to="/plans/standard">Standard Business</Link> ·{' '}
            <Link to="/plans/wordpress">WordPress Business</Link>
          </p>
        </div>
      </div>

      <ServiceList
        eyebrow="Launch add-ons"
        headline="Picked with your package"
        subtext="Optional pieces set up alongside the site — each one a fixed-scope deliverable, in your name."
        services={toServices(ADDONS)}
        columns={2}
        variant="alt"
      />

      <ServiceList
        eyebrow="On-demand services"
        headline="Added later, whenever you need them"
        subtext="Nothing here needs deciding at launch. Fixed prices, delivered when the need shows up."
        services={toServices(ON_DEMAND)}
        columns={2}
        variant="default"
      />

      {/* The order builder — package + add-ons */}
      <section id="order" className="section section--alt">
        <div className="section-container">
          <p className="section-eyebrow">Build your order</p>
          <h2 className="section-title">Package + add-ons</h2>
          <p className="section-sub">
            Pick a plan and any launch add-ons for a transparent, all-in number.
            Nothing is charged; every figure is confirmed in writing before work starts.
          </p>
          <PackageConfigurator />
        </div>
      </section>

      {/* The on-demand estimator */}
      <section id="estimate" className="section section--default">
        <div className="section-container">
          <p className="section-eyebrow">Already launched?</p>
          <h2 className="section-title">Estimate on-demand work</h2>
          <p className="section-sub">
            For existing sites: mix one-time jobs, per-unit work, and quoted items
            into one running total.
          </p>
          <Estimator />
        </div>
      </section>

      <CtaBanner
        eyebrow="Prefer to just talk?"
        headline="Tell us what you need and we'll price it in writing."
        subtext="Boston in person, everywhere else remote. English or Español."
        cta={{ label: 'Get in touch', href: 'mailto:contact@guillensolutions.com' }}
        variant="accent"
      />
    </>
  )
}
