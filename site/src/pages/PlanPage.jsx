import { useParams } from 'react-router-dom'
import {
  HeroSection, FeatureGrid, Steps, PricingPlans, Faq, CtaBanner, Checklist,
} from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import PayloadPage from '../PayloadPage.jsx'
import { useContent } from '../content.js'
import { useT } from '../i18n.jsx'

// ---------------------------------------------------------------------------
// PlanPage — one config-driven sales page per package (/plans/:planId).
// Deliberately built from the same library blocks as everything else:
// the page that sells the system is made of the system.
// ---------------------------------------------------------------------------

function NotFound() {
  const t = useT()
  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>
      <title>Plan not found — Guillen Solutions</title>
      <meta name="robots" content="noindex" />
      <h1>{t('Plan not found', 'Plan no encontrado')}</h1>
      <p style={{ opacity: 0.7 }}>{t('See all packages on the home page instead.', 'Mejor mira todos los paquetes en la página de inicio.')}</p>
      <a className="gs-nav__cta" href="/#packages">{t('See packages', 'Ver paquetes')}</a>
    </section>
  )
}

// The bespoke render — used directly and as the CMS fallback.
function PlanPageContent({ planId }) {
  const t = useT()
  const { PACKAGES, PLAN_PAGES } = useContent()
  const plan = PLAN_PAGES[planId]
  const data = PACKAGES.find(p => p.id === planId)
  if (!plan || !data) return <NotFound />

  return (
    <>
      <HeroSection
        eyebrow={plan.hero.eyebrow}
        headline={plan.hero.headline}
        subtext={plan.hero.subtext}
        size="compact"
        variant="alt"
        ctas={[{ label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order', variant: 'solid' }]}
      />
      <FeatureGrid
        eyebrow={t("Who it's for", 'Para quién es')}
        headline={plan.whoTitle}
        subtext={plan.whoSub}
        items={plan.who}
        columns={4}
        variant="default"
      />
      <Checklist
        eyebrow={t('What you get', 'Lo que obtienes')}
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
        eyebrow={t('How it works', 'Cómo funciona')}
        headline={t('From first call to keys in hand', 'De la primera llamada a las llaves en mano')}
        items={plan.steps}
        variant="default"
      />
      <PricingPlans
        eyebrow={t('The numbers', 'Los números')}
        headline={t('Flat, all-in, in writing', 'Plano, todo incluido, por escrito')}
        plans={[{
          badge: data.badge, tag: data.tag, name: data.name, price: data.price,
          period: data.period, description: data.description, note: data.note,
          features: data.features, featured: true,
          cta: { label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order', variant: 'solid' },
        }]}
        variant="alt"
      />
      <Faq
        eyebrow={t('Good to know', 'Bueno saber')}
        headline={t('Common questions', 'Preguntas comunes')}
        items={plan.faq}
        variant="default"
      />
      <CtaBanner
        eyebrow={plan.cta.eyebrow}
        headline={plan.cta.headline}
        subtext={plan.cta.subtext}
        cta={{ label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order', variant: 'solid' }}
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
  const { PLAN_PAGES } = useContent()
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
