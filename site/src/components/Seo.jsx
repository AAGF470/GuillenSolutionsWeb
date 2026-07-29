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
import { useLang } from '../i18n.jsx'

const SITE = 'https://guillensolutions.com'
const NAME = 'Guillen Solutions'
const OG_IMAGE = `${SITE}/og.png`

// `standalone` — the page exists in ONE language only (e.g. the Spanish-first
// landing pages). Claiming an hreflang counterpart that doesn't exist would
// point Google at a 404, so alternates are omitted for those.
export default function Seo({ title, description, path = '/', schema, standalone = false }) {
  const { lang } = useLang()
  const full = title ? `${title} — ${NAME}` : NAME
  // `path` is always the ENGLISH path. Normalize it to exactly one trailing
  // slash (matching the 200 URL the server serves), then derive both language
  // URLs. Critical: without the /es prefix here, the client render would stamp
  // an English canonical onto a Spanish page and Google would treat the whole
  // Spanish site as duplicate content.
  const bare = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`
  const enUrl = `${SITE}${bare}`
  const esUrl = `${SITE}${bare === '/' ? '/es/' : `/es${bare}`}`
  const url = lang === 'es' ? esUrl : enUrl
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {!standalone && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {!standalone && <link rel="alternate" hrefLang="es" href={esUrl} />}
      {!standalone && <link rel="alternate" hrefLang="x-default" href={enUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_ES'} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${NAME} — websites you own, top to bottom.`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={OG_IMAGE} />
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
  priceRange: '$600–$1,900 first year',
  sameAs: ['https://guillen.studio'],
}
