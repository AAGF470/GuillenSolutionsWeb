import { Link } from '../lib/LangLink.jsx'
import { HeroSection, Faq, CtaBanner, Reveal } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import { useContent } from '../content.js'
import { CONTACT } from '../data.js'
import { esLandingBySlug } from '../esLanding.js'
import './MarketGuide.css'
import './EsLanding.css'

// ---------------------------------------------------------------------------
// EsLanding — a Spanish-FIRST landing page at /es/<slug>.
//
// Not a translation of an English page: the copy is written for how Hispanic
// owners search, and the page is ORDERED the way this market buys — confianza
// and referrals first, then who we serve locally, then the offer. Spanish-only,
// so Seo runs `standalone` (no hreflang pair to a page that doesn't exist).
// ---------------------------------------------------------------------------

export default function EsLanding({ slug }) {
  const page = esLandingBySlug(slug)
  const { SERVICES, REFERRAL_PROGRAM } = useContent()
  if (!page) return null

  // LocalBusiness + the service area, in Spanish, so assistants and Google can
  // cite this page for "páginas web en <ciudad>" style questions.
  const schema = [{
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Guillen Solutions',
    url: `https://guillensolutions.com/es/${page.slug}/`,
    description: page.metaDescription,
    inLanguage: 'es',
    knowsLanguage: ['es', 'en'],
    areaServed: page.areas.filter(a => !a.startsWith('y ')).map(a => ({ '@type': 'City', name: a })),
    priceRange: '$600–$1,900 primer año',
    telephone: CONTACT.textLine.sms,
    email: CONTACT.email,
  }]

  return (
    <>
      <Seo title={page.metaTitle} description={page.metaDescription} path={`/${page.slug}/`} schema={schema} standalone />

      <HeroSection
        eyebrow={`Páginas web · ${page.shortCity}, ${page.state}`}
        headline={page.h1}
        subtext={page.lead}
        size="compact"
        variant="alt"
        ctas={[
          { label: 'Escríbenos por WhatsApp', href: CONTACT.whatsapp.link, variant: 'solid' },
          { label: 'Ver precios', href: '/es/pricing/', variant: 'ghost-bordered' },
        ]}
      />

      {/* CONFIANZA FIRST — this market buys on trust, not on feature lists. */}
      <section className="section section--default gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">Confianza primero</p>
          <h2 className="section-title">{page.trust.title}</h2>
          {page.searchNote && <p className="section-sub">{page.searchNote}</p>}
          <Reveal stagger className="gs-eslanding__trust">
            {page.trust.points.map((p, i) => (
              <div key={i} className="gs-eslanding__trust-card">
                <span className="gs-eslanding__trust-num">{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Referral program — the actual acquisition channel in this market. */}
      <section className="section section--alt gs-seam-top gs-seam-bottom">
        <div className="section-container gs-eslanding__ref">
          <div>
            <p className="section-eyebrow">{REFERRAL_PROGRAM.eyebrow}</p>
            <h2 className="section-title">{REFERRAL_PROGRAM.headline}</h2>
            <p className="section-sub">{REFERRAL_PROGRAM.lead}</p>
            <a className="gs-eslanding__wa" href={CONTACT.whatsapp.link}>
              Recomiéndanos por WhatsApp · {CONTACT.whatsapp.display}
            </a>
          </div>
          <ol className="gs-eslanding__steps">
            {REFERRAL_PROGRAM.steps.map((s, i) => (
              <li key={i}><b>{s.title}</b><span>{s.body}</span></li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we serve locally + the areas — concrete, not template filler. */}
      <section className="section section--default gs-seam-bottom">
        <div className="section-container gs-eslanding__local">
          <div>
            <p className="section-eyebrow">A quién servimos</p>
            <h2 className="section-title">{page.industries.title}</h2>
            <p className="section-sub">{page.industries.body}</p>
            <ul className="gs-eslanding__inds">
              {page.industries.items.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <aside className="gs-guide__areas">
            <p className="gs-guide__areas-label">Zonas que atendemos</p>
            <ul className="gs-guide__pills">
              {page.areas.map(a => <li key={a}>{a}</li>)}
            </ul>
            <p className="gs-eslanding__note">{page.localNote}</p>
          </aside>
        </div>
      </section>

      {/* The offer, kept brief and last. */}
      <section className="section section--alt gs-seam-top gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">Lo que hacemos</p>
          <h2 className="section-title">Todo lo que tu negocio necesita en línea</h2>
          <Reveal stagger className="gs-guide__services">
            {SERVICES.map(s => (
              <Link key={s.id} to={s.to} className="gs-guide__service">
                <span className="gs-guide__service-tag">{s.tag}</span>
                <span className="gs-guide__service-title">{s.title}</span>
                <span className="gs-guide__service-price">{s.price}</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq
        eyebrow="Preguntas frecuentes"
        headline={`Preguntas de dueños en ${page.city}`}
        items={page.faq.map(f => ({ q: f.q, a: f.a }))}
        variant="default"
      />

      <CtaBanner
        headline="Hablemos — en español, sin compromiso"
        subtext="Mándanos un mensaje y te decimos exactamente qué costaría tu página, por escrito, antes de que decidas nada."
        cta={{ label: 'Escríbenos por WhatsApp', href: CONTACT.whatsapp.link }}
      />
    </>
  )
}
