import { Link } from 'react-router-dom'
import { HeroSection, Faq, CtaBanner } from '@aagf470/ui'
import { Reveal } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import { useContent } from '../content.js'
import { CONTACT_EMAIL } from '../data.js'
import { locationGuideSchema } from '../schema.js'
import { useT } from '../i18n.jsx'
import './MarketGuide.css'

// ---------------------------------------------------------------------------
// MarketGuide — a local-market SEO page at /guides/:slug for one of the
// LOCATION_GUIDES markets. Distinct, indexable service-area content: intro,
// the neighborhoods we serve (from MARKETS), why local presence matters, the
// services we offer, and a local FAQ. Geo schema via locationGuideSchema.
// The routing dispatcher (App.jsx) renders this only for known guide slugs.
// ---------------------------------------------------------------------------

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
)

export default function MarketGuide({ guide }) {
  const t = useT()
  const { MARKETS, SERVICES } = useContent()
  const market = MARKETS.find(m => m.id === guide.marketId)
  const areas = market?.areas ?? []

  return (
    <>
      <Seo
        title={guide.metaTitle}
        description={guide.metaDescription}
        path={`/guides/${guide.slug}`}
        schema={locationGuideSchema(guide)}
      />

      <HeroSection
        eyebrow={`${t('Local guide', 'Guía local')} · ${guide.city}, ${guide.state}`}
        headline={guide.metaTitle}
        subtext={guide.lead}
        size="compact"
        variant="alt"
        ctas={[
          { label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order', variant: 'solid' },
          { label: t('Talk to us', 'Habla con nosotros'), href: `mailto:${CONTACT_EMAIL}`, variant: 'ghost-bordered' },
        ]}
      />

      {/* Intro + the areas we serve */}
      <section className="section section--default gs-seam-bottom">
        <div className="section-container gs-guide">
          <div className="gs-guide__intro">
            <p className="gs-guide__back"><Link to="/guides">{t('← All guides', '← Todas las guías')}</Link></p>
            {guide.intro.map((p, i) => (
              <p key={i} className="gs-guide__lead">{p}</p>
            ))}
          </div>
          <aside className="gs-guide__areas">
            <div
              className="gs-guide__photo"
              style={market?.image ? { backgroundImage: `url(${market.image})` } : undefined}
              role="img"
              aria-label={`${guide.city}, ${guide.state}`}
            >
              {!market?.image && <span className="gs-guide__pin"><Pin /></span>}
            </div>
            <p className="gs-guide__areas-label">{t('Areas we serve', 'Áreas que servimos')}</p>
            <ul className="gs-guide__pills">
              {areas.map(a => <li key={a}>{a}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      {/* Why it matters locally */}
      <section className="section section--alt gs-seam-top gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('The local advantage', 'La ventaja local')}</p>
          <h2 className="section-title">{guide.whyTitle}</h2>
          <Reveal stagger as="ul" className="gs-guide__why">
            {guide.why.map((w, i) => (
              <li key={i}><span className="gs-guide__why-num">{i + 1}</span><span>{w}</span></li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* What we build here — reuse the site-wide services */}
      <section className="section section--default gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('What we offer', 'Lo que ofrecemos')}</p>
          <h2 className="section-title">
            {t(`What we build for ${guide.city} businesses`, `Lo que construimos para negocios en ${guide.city}`)}
          </h2>
          <Reveal stagger className="gs-guide__services">
            {SERVICES.map(s => (
              <Link key={s.id} to={s.to} className="gs-guide__service">
                <span className="gs-guide__service-tag">{s.tag}</span>
                <h3 className="gs-guide__service-name">{s.title}</h3>
                <p className="gs-guide__service-price">{s.price}</p>
                <p className="gs-guide__service-body">{s.body}</p>
                <span className="gs-guide__service-link">{s.linkLabel} →</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq
        eyebrow={`${t('Questions', 'Preguntas')} · ${guide.city}`}
        headline={t(`Working with us in ${guide.city}`, `Trabajar con nosotros en ${guide.city}`)}
        items={guide.faq}
        single
        variant="alt"
      />

      <CtaBanner
        eyebrow={t('Ready when you are', 'Listos cuando tú lo estés')}
        headline={t(`Let's get your ${guide.city} business online.`, `Pongamos tu negocio de ${guide.city} en línea.`)}
        subtext={t(
          'Build a quote in a minute, or reach out and we\'ll talk it through — in English or Español.',
          'Arma una cotización en un minuto, o contáctanos y lo conversamos — en inglés o español.',
        )}
        cta={{ label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order' }}
        variant="accent"
      />
    </>
  )
}
