import { Link } from 'react-router-dom'
import { HeroSection, CtaBanner, Faq } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import PackageConfigurator from '../components/PackageConfigurator.jsx'
import { Estimator } from './OnDemand.jsx'
import { PRICING_PROMISE, FAQS } from '../data'
import { pricingSchema } from '../schema'
import './OnDemand.css'
import './Pricing.css'

// ---------------------------------------------------------------------------
// Pricing & order — the working page, not another brochure. Visitors arrive
// here having seen the plans elsewhere, so this page is just the two tools
// with a compact explainer rail beside them. Configurator = new orders
// (plan + launch add-ons); estimator = on-demand work for live sites.
// ---------------------------------------------------------------------------

function Rail() {
  return (
    <aside className="gs-rail">
      <div className="gs-rail__card">
        <h3>Included vs. add-ons</h3>
        <p>
          Every plan already covers design, hosting, SSL, backups, your domain, and
          your own editor. Add-ons are optional launch extras: phone line, email,
          logo, forms, rush delivery. Plan details:{' '}
          <Link to="/plans/freelance">Freelance</Link> ·{' '}
          <Link to="/plans/standard">Standard</Link> ·{' '}
          <Link to="/plans/wordpress">WordPress</Link>
        </p>
      </div>
      <div className="gs-rail__card">
        <h3>Pages vs. items</h3>
        <p>
          Pages are the layouts: 6 designed by us, plus up to 4 you assemble
          yourself from the component library, free (10 total). Items are the
          things they list — products, dishes, listings — all sharing one design
          (25 imported, then unlimited self-serve, free). A 40-product catalog is
          1 page plus 40 items, not 40 pages.
        </p>
      </div>
      <div className="gs-rail__card">
        <h3>On-demand, later</h3>
        <p>
          Newsletters, landing pages, QR menus, seasonal swaps, translations — added
          after launch, whenever you need them. Nothing to decide today; estimate
          below or see <Link to="/on-demand">the full menu</Link>.
        </p>
      </div>
    </aside>
  )
}

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing & Order"
        description="Build your order: pick a plan and add-ons for an all-in number, or estimate on-demand work for a live site. Every figure confirmed in writing."
        path="/pricing"
        schema={pricingSchema}
      />
      <HeroSection
        eyebrow="Pricing & order"
        headline="Price it yourself, right here."
        subtext={`Pick a plan and any add-ons for a transparent, all-in number, or estimate on-demand work for a site that's already live. ${PRICING_PROMISE}`}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      {/* New orders: configurator with the explainer rail beside it */}
      <section id="order" className="section section--default gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">New site</p>
          <h2 className="section-title">Build your order</h2>
          <div className="gs-order">
            <div className="gs-order__main">
              <PackageConfigurator />
            </div>
            <Rail />
          </div>
        </div>
      </section>

      {/* Existing sites: on-demand estimator */}
      <section id="estimate" className="section section--alt gs-seam-top">
        <div className="section-container">
          <p className="section-eyebrow">Already launched?</p>
          <h2 className="section-title">Estimate on-demand work</h2>
          <p className="section-sub">
            One-time jobs, per-unit work, and quoted items in one running total.
          </p>
          <Estimator />
        </div>
      </section>

      {/* The questions buyers (and their AI assistants) actually ask */}
      <Faq
        eyebrow="Before you decide"
        headline="The questions people actually ask"
        subtext="Exit policy, ownership, online stores, page limits, referrals — answered plainly. If yours isn't here, just ask."
        items={FAQS}
        single
        variant="default"
      />

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
