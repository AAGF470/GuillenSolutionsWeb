import { useParams } from 'react-router-dom'
import {
  HeroSection, FeatureGrid, Steps, PricingPlans, Faq, CtaBanner, Checklist,
} from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import PayloadPage from '../PayloadPage.jsx'
import { PACKAGES } from '../data'
import { PLAN_PAGES } from '../planPages.js'

// ---------------------------------------------------------------------------
// PlanPage — one config-driven sales page per package (/plans/:planId).
// Deliberately built from the same library blocks as everything else:
// the page that sells the system is made of the system.
// ---------------------------------------------------------------------------

const pkg = id => PACKAGES.find(p => p.id === id)

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

// The bespoke render — used directly and as the CMS fallback.
function PlanPageContent({ planId }) {
  const plan = PLAN_PAGES[planId]
  const data = pkg(planId)
  if (!plan || !data) return <NotFound />

  return (
    <>
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

// Route entry: CMS-first (slug "plans-<id>") with the bespoke render as the
// fallback — same pattern as the home page. push-pages authors the CMS copies
// from the identical PLAN_PAGES config, so both sources match until an editor
// tweaks the CMS version.
export default function PlanPage() {
  const { planId } = useParams()
  const plan = PLAN_PAGES[planId]
  if (!plan) return <NotFound />
  return (
    <PayloadPage
      slug={`plans-${planId}`}
      fallback={<PlanPageContent planId={planId} />}
      fallbackWhileLoading
      seo={{ ...plan.seo, path: `/plans/${planId}` }}
    />
  )
}
