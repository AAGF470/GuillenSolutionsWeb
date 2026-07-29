import { Link } from '../lib/LangLink.jsx'
import { HeroSection, Faq, CtaBanner, Reveal } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import { useContent } from '../content.js'
import { CONTACT } from '../data.js'
import { industryBySlug } from '../industryPages.js'
import './MarketGuide.css'
import './EsLanding.css'

// ---------------------------------------------------------------------------
// IndustryPage — one trade, every market, at /websites-for-<trade>/.
//
// Targets the long-tail Search Console shows already ranking without a page
// ("website design for contractor …" at position 19), which is the winnable
// space for a young domain. English-only for now, so Seo runs `standalone`.
// ---------------------------------------------------------------------------

export default function IndustryPage({ slug }) {
  const page = industryBySlug(slug)
  const { PACKAGES } = useContent()
  if (!page) return null

  const schema = [{
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Website design for ${page.industry}`,
    name: page.metaTitle,
    url: `https://guillensolutions.com/${page.slug}/`,
    description: page.metaDescription,
    provider: { '@type': 'ProfessionalService', name: 'Guillen Solutions', url: 'https://guillensolutions.com/' },
    areaServed: ['Boston, MA', 'North Houston, TX', 'Dallas, TX', 'New York, NY'].map(n => ({ '@type': 'City', name: n })),
    offers: PACKAGES.filter(p => !p.tbd).map(p => ({
      '@type': 'Offer', name: p.name, price: String(p.firstYear), priceCurrency: 'USD',
    })),
  }, {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }]

  return (
    <>
      <Seo title={page.metaTitle} description={page.metaDescription} path={`/${page.slug}/`} schema={schema} standalone />

      <HeroSection
        eyebrow={`Websites for ${page.industry}`}
        headline={page.h1}
        subtext={page.lead}
        size="compact"
        variant="alt"
        ctas={[
          { label: 'Build your quote', href: '/pricing/#order', variant: 'solid' },
          { label: `Text us · ${CONTACT.textLine.display}`, href: `sms:${CONTACT.textLine.sms}`, variant: 'ghost-bordered' },
        ]}
      />

      {/* Proof before pitch — for trades, credibility is the whole sale. */}
      <section className="section section--default gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">Proof</p>
          <h2 className="section-title">{page.proof.title}</h2>
          <p className="section-sub">{page.proof.body}</p>
          <Link to={page.proof.linkTo} className="gs-eslanding__wa">{page.proof.linkLabel} →</Link>
        </div>
      </section>

      <section className="section section--alt gs-seam-top gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">What it needs</p>
          <h2 className="section-title">{page.needs.title}</h2>
          <Reveal stagger className="gs-eslanding__trust">
            {page.needs.items.map((it, i) => (
              <div key={i} className="gs-eslanding__trust-card">
                <span className="gs-eslanding__trust-num">{i + 1}</span>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </Reveal>
          <p className="gs-eslanding__note" style={{ marginTop: '18px' }}>{page.marketsLine}</p>
        </div>
      </section>

      <Faq
        eyebrow="Common questions"
        headline={`Questions from ${page.industry}`}
        items={page.faq.map(f => ({ q: f.q, a: f.a }))}
        variant="default"
      />

      <CtaBanner
        headline="Price it yourself, in about a minute"
        subtext="Pick a plan and any add-ons for a transparent, all-in number — every figure confirmed in writing before you commit to anything."
        cta={{ label: 'Build your quote', href: '/pricing/#order' }}
      />
    </>
  )
}
