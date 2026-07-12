import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSection } from '@aagf470/ui'
import { Reveal } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import { useContent } from '../content.js'
import { useT } from '../i18n.jsx'
import './Guides.css'

// ---------------------------------------------------------------------------
// Guides — /guides listing. Every CMS post is a guide/devlog card linking to
// /guides/:slug. Sorted newest-first by publishedAt; friendly empty state
// until the first post ships.
// ---------------------------------------------------------------------------

const API = import.meta.env.VITE_CMS_URL

export const formatDate = (iso, locale = 'en-US') => {
  if (!iso) return null
  const d = new Date(iso)
  return isNaN(d) ? null : d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}

// Prefer the resized card rendition when the CMS has generated one.
const coverUrl = cover => cover?.sizes?.card?.url || cover?.url || null

function GuideCard({ post, locale }) {
  const date = formatDate(post.publishedAt, locale)
  const tags = (post.tags || []).map(t => t?.text ?? t).filter(Boolean)
  const src = coverUrl(post.cover)
  return (
    <Link to={`/guides/${post.slug}`} className="gs-guides__card">
      {src && (
        <div className="gs-guides__cover">
          <img src={src} alt={post.cover?.alt || ''} loading="lazy" />
        </div>
      )}
      <div className="gs-guides__body">
        <h3 className="gs-guides__title">{post.title}</h3>
        {post.excerpt && <p className="gs-guides__excerpt">{post.excerpt}</p>}
        <div className="gs-guides__meta">
          {date && <span className="gs-guides__date">{date}</span>}
          {tags.map(t => <span key={t} className="gs-guides__tag">{t}</span>)}
        </div>
      </div>
    </Link>
  )
}

// Local-market guides — always present, static, SEO-first. Rendered above the
// CMS devlog feed so /guides has real content even before the first post.
function LocalGuides() {
  const t = useT()
  const { LOCATION_GUIDES, MARKETS } = useContent()
  if (!LOCATION_GUIDES?.length) return null
  return (
    <section className="section section--alt gs-lguides-section">
      <div className="section-container">
        <p className="section-eyebrow">{t('By location', 'Por ubicación')}</p>
        <h2 className="section-title">{t('Guides for your area', 'Guías para tu zona')}</h2>
        <p className="section-sub">
          {t(
            'Where we work, who we serve, and how a local business gets found online — one guide per market.',
            'Dónde trabajamos, a quién servimos y cómo un negocio local se hace encontrar en línea — una guía por mercado.',
          )}
        </p>
        <Reveal stagger className="gs-lguides">
          {LOCATION_GUIDES.filter(g => !g.isArea).map(g => {
            const areas = MARKETS.find(m => m.id === g.marketId)?.areas ?? []
            const areaGuides = LOCATION_GUIDES.filter(x => x.isArea && x.marketId === g.marketId)
            return (
              <div key={g.slug} className="gs-lguide">
                <Link to={`/guides/${g.slug}`} className="gs-lguide__main">
                  <span className="gs-lguide__place">{g.city}, {g.state}</span>
                  <span className="gs-lguide__title">{t('Web design in', 'Diseño web en')} {g.city}</span>
                  <span className="gs-lguide__areas">{areas.slice(0, 4).join(' · ')}{areas.length > 4 ? ' …' : ''}</span>
                  <span className="gs-lguide__link">{t('Read the guide', 'Leer la guía')} →</span>
                </Link>
                {areaGuides.length > 0 && (
                  <div className="gs-lguide__chips">
                    {areaGuides.map(a => (
                      <Link key={a.slug} to={`/guides/${a.slug}`} className="gs-lguide__chip">{a.city}</Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default function Guides() {
  const t = useT()
  const locale = t('en-US', 'es-ES')
  const [posts, setPosts] = useState(null) // null = loading, [] = none

  useEffect(() => {
    let alive = true
    fetch(`${API}/api/posts?sort=-publishedAt&depth=1`)
      .then(r => r.json())
      .then(d => { if (alive) setPosts(d?.docs ?? []) })
      .catch(() => { if (alive) setPosts([]) })
    return () => { alive = false }
  }, [])

  return (
    <>
      <Seo
        title={t('Guides & Devlogs', 'Guías y Devlogs')}
        description={t('Build notes, case studies, and practical guides from real client projects — how the sites are built, what the tools are, and what we learned shipping them.', 'Notas de construcción, casos de estudio y guías prácticas de proyectos reales de clientes — cómo se construyen los sitios, cuáles son las herramientas y qué aprendimos al lanzarlos.')}
        path="/guides"
      />
      <HeroSection
        eyebrow={t('Guides · devlogs & case studies', 'Guías · devlogs y casos de estudio')}
        headline={t('Notes from the workbench.', 'Notas desde el taller.')}
        subtext={t('How we build the sites we ship — real decisions, real code, real screenshots. Written for clients who like to look under the hood, and for anyone building something similar.', 'Cómo construimos los sitios que entregamos — decisiones reales, código real, capturas reales. Escrito para clientes a los que les gusta mirar bajo el capó, y para cualquiera que esté construyendo algo similar.')}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      <LocalGuides />

      <section className="section">
        <div className="section-container">
          <p className="section-eyebrow">{t('Devlogs & case studies', 'Devlogs y casos de estudio')}</p>
          {posts === null && <div className="gs-guides__grid" aria-busy="true" />}
          {posts?.length === 0 && (
            <div className="gs-guides__empty">
              <h2>{t('Guides are coming.', 'Las guías vienen en camino.')}</h2>
              <p>
                {t('We’re writing up the first batch right now — devlogs and case studies from real projects. Check back soon, or', 'Estamos escribiendo el primer lote ahora mismo — devlogs y casos de estudio de proyectos reales. Vuelve pronto, o')}{' '}
                <Link to="/work">{t('browse our work', 'explora nuestro trabajo')}</Link>{t(' in the meantime.', ' mientras tanto.')}
              </p>
            </div>
          )}
          {posts?.length > 0 && (
            <Reveal stagger className="gs-guides__grid">
              {posts.map(p => <GuideCard key={p.id} post={p} locale={locale} />)}
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
