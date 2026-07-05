// ---------------------------------------------------------------------------
// Seo — per-page title, meta, canonical, OG/Twitter cards, optional JSON-LD.
// Uses React 19's native head hoisting: render anywhere, tags land in <head>.
//
// Props:
//   title       string  — page title ("… — Guillen Solutions" appended)
//   description string  — meta + og/twitter description
//   path        string  — route path ("/about") for the canonical URL
//   schema      object? — JSON-LD schema.org object
// ---------------------------------------------------------------------------
const SITE = 'https://guillensolutions.com'
const NAME = 'Guillen Solutions'

export default function Seo({ title, description, path = '/', schema }) {
  const full = title ? `${title} — ${NAME}` : NAME
  const url = `${SITE}${path === '/' ? '' : path}`
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={full} />
      {description && <meta name="twitter:description" content={description} />}
      {schema && (Array.isArray(schema)
        ? schema.map((s, i) => (
            <script key={s['@id'] || i} type="application/ld+json">{JSON.stringify(s)}</script>
          ))
        : <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </>
  )
}

// The business itself — rendered once on the home page.
export const BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Guillen Digital Solutions',
  alternateName: NAME,
  url: SITE,
  email: 'contact@guillensolutions.com',
  description:
    'Custom, content-managed websites for small businesses — flat all-in pricing, and the client owns everything: domain, content, and every login. No lock-in.',
  areaServed: [
    { '@type': 'City', name: 'Boston' },
    { '@type': 'Country', name: 'United States' },
  ],
  knowsLanguage: ['en', 'es'],
  priceRange: '$600–$1,350 first year',
  sameAs: ['https://guillen.studio'],
}
