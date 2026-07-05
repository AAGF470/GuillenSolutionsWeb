// ---------------------------------------------------------------------------
// schema.js — JSON-LD structured data, DERIVED from the canonical pricing data
// so it can never drift from what the pages show. This is what lets AI
// assistants and search engines read our services, prices, and FAQs as facts
// instead of inferring them from marketing prose.
//
// Consumed via <Seo schema={...} /> (accepts an object or an array of nodes).
// ---------------------------------------------------------------------------
import {
  PACKAGES, ADDONS, ON_DEMAND, FAQS, CONTACT_EMAIL,
  CG_RENDER_TIERS, CG_RENDER_SHOTS, CG_RENDER_PACKAGES,
} from './data.js'

const SITE = 'https://guillensolutions.com'
const ORG_ID = `${SITE}#org`

// "$150–250" → { min: 150, max: 250 };  "$425" → { min: 425, max: 425 }
const range = str => {
  const n = (String(str).match(/\d[\d,]*/g) || []).map(x => Number(x.replace(/,/g, '')))
  return { min: n[0] ?? null, max: n[1] ?? n[0] ?? null }
}

const usd = (min, max) =>
  min == null
    ? undefined
    : min === max
      ? { '@type': 'Offer', priceCurrency: 'USD', price: String(min) }
      : { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', minPrice: min, maxPrice: max } }

const offer = ({ name, description, min, max, url, unit }) => ({
  ...usd(min, max),
  name,
  ...(description ? { description } : {}),
  ...(url ? { url } : {}),
  ...(unit ? { eligibleQuantity: { '@type': 'QuantitativeValue', unitText: unit } } : {}),
})

// ── The business ─────────────────────────────────────────────────────────────
export const ORG = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Guillen Digital Solutions',
  alternateName: 'Guillen Solutions',
  url: SITE,
  email: CONTACT_EMAIL,
  description:
    'Digital business solutions for small businesses — websites, CG product renders, and business setup. Flat all-in pricing, and the client owns everything: domain, content, images, and every login. No lock-in.',
  areaServed: [
    { '@type': 'City', name: 'Boston' },
    { '@type': 'Country', name: 'United States' },
  ],
  knowsLanguage: ['en', 'es'],
  priceRange: '$600–$1,350 first year',
  sameAs: ['https://guillen.studio'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Website plans',
    itemListElement: PACKAGES.map(p => ({
      '@type': 'Offer',
      name: p.name,
      description: p.description,
      priceCurrency: 'USD',
      price: String(p.firstYear),
      url: `${SITE}/plans/${p.id}`,
      category: 'Website design + hosting, first year all-in',
      ...(p.recurring
        ? { priceSpecification: [
            { '@type': 'UnitPriceSpecification', priceCurrency: 'USD', price: p.firstYear, name: 'First year, all-in' },
            { '@type': 'UnitPriceSpecification', priceCurrency: 'USD', price: p.recurring, name: 'Yearly renewal (hosting + domain)', billingDuration: 1, unitCode: 'ANN' },
          ] }
        : {}),
    })),
  },
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}#website`,
  url: SITE,
  name: 'Guillen Solutions',
  inLanguage: ['en', 'es'],
  publisher: { '@id': ORG_ID },
}

// ── FAQ (mirrors the on-page accordion on /pricing) ──────────────────────────
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE}/pricing#faq`,
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// Add-ons + on-demand as an offer catalog (exact prices where fixed).
const ADDON_CATALOG = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${SITE}/pricing#addons`,
  name: 'Add-ons & on-demand services',
  provider: { '@id': ORG_ID },
  itemListElement: [...ADDONS, ...ON_DEMAND].map(a => {
    const { min, max } = range(a.price)
    return offer({
      name: a.name,
      description: a.body,
      min: a.amount ?? min,
      max: a.amount ?? max,
      url: `${SITE}/pricing`,
      unit: a.unit,
    })
  }),
}

// ── CG product renders (Service on /renders) ─────────────────────────────────
export const RENDERS_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/renders#service`,
  serviceType: 'CG product rendering',
  name: 'CG Product Renders',
  description:
    'Studio-quality 3D product images — model once, render many. Complexity-tiered per product, cheap additional shots, and affordable multi-shot packages. 15% off bundled with a website.',
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'United States' },
  url: `${SITE}/renders`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Product render pricing',
    itemListElement: [
      ...CG_RENDER_TIERS.map(t => {
        const { min, max } = range(t.price)
        return offer({ name: `Per product — ${t.name}`, description: t.body, min, max, url: `${SITE}/renders` })
      }),
      ...CG_RENDER_SHOTS.map(s => {
        const { min, max } = range(s.price)
        return offer({ name: s.name, description: s.body, min, max, url: `${SITE}/renders` })
      }),
      ...CG_RENDER_PACKAGES.map(p => {
        const { min } = range(p.price)
        return offer({ name: p.name, description: p.body, min, max: min, url: `${SITE}/renders` })
      }),
    ],
  },
}

// ── Per-page graphs ──────────────────────────────────────────────────────────
export const homeSchema = [ORG, WEBSITE]
export const pricingSchema = [ORG, ADDON_CATALOG, FAQ_SCHEMA]
export const rendersSchema = [RENDERS_SERVICE]
