import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import RichContent from '../components/RichContent.jsx'
import { formatDate } from './Guides.jsx'
import { useT } from '../i18n.jsx'
import './GuidePost.css'

// ---------------------------------------------------------------------------
// GuidePost — /guides/:slug. Fetches the post at depth=2 (so cover, embedded
// block uploads, and the related project all arrive populated) and renders the
// lexical body through RichContent. Unknown slugs fall back to a noindex 404
// (same pattern as CmsPage.jsx).
// ---------------------------------------------------------------------------

const API = import.meta.env.VITE_CMS_URL

function NotFound() {
  const t = useT()
  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>
      {/* SPA soft-404 returns HTTP 200 — tell crawlers not to index it. */}
      <title>{t('Guide not found — Guillen Solutions', 'Guía no encontrada — Guillen Solutions')}</title>
      <meta name="robots" content="noindex" />
      <h1 style={{ marginBottom: '0.5rem' }}>{t('Guide not found', 'Guía no encontrada')}</h1>
      <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
        {t('This guide doesn’t exist (yet). It may not have been published in the CMS.', 'Esta guía no existe (todavía). Puede que no se haya publicado en el CMS.')}
      </p>
      <Link to="/guides" className="gs-nav__cta">{t('All guides', 'Todas las guías')}</Link>
    </section>
  )
}

// Related project — only when the relationship came back populated.
function ProjectCard({ project }) {
  const t = useT()
  if (!project || typeof project !== 'object') return null
  const links = (project.links || []).filter(l => l?.href)
  return (
    <aside className="gs-post__project">
      <p className="gs-post__project-eyebrow">{t('From the project', 'Del proyecto')}</p>
      <h3 className="gs-post__project-title">{project.title}</h3>
      {project.tagline && <p className="gs-post__project-tagline">{project.tagline}</p>}
      {project.summary && <p className="gs-post__project-summary">{project.summary}</p>}
      {links.length > 0 && (
        <div className="gs-post__project-links">
          {links.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label || l.href} ↗
            </a>
          ))}
        </div>
      )}
    </aside>
  )
}

export default function GuidePost() {
  const t = useT()
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ok' | 'none'

  useEffect(() => {
    let alive = true
    setStatus('loading')
    setPost(null)
    fetch(`${API}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`)
      .then(r => r.json())
      .then(d => {
        if (!alive) return
        const doc = d?.docs?.[0]
        if (doc) { setPost(doc); setStatus('ok') }
        else setStatus('none')
      })
      .catch(() => { if (alive) setStatus('none') })
    return () => { alive = false }
  }, [slug])

  if (status === 'loading') return null
  if (status === 'none') return <NotFound />

  const date = formatDate(post.publishedAt, t('en-US', 'es-ES'))
  const tags = (post.tags || []).map(t => t?.text ?? t).filter(Boolean)
  const cover = post.cover?.sizes?.hero?.url || post.cover?.url || null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(cover ? { image: cover } : {}),
    author: { '@type': 'Organization', name: 'Guillen Digital Solutions' },
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/guides/${slug}`} schema={schema} />
      <article className="gs-post">
        <header className="gs-post__header">
          <Link to="/guides" className="gs-post__back">{t('← All guides', '← Todas las guías')}</Link>
          <h1 className="gs-post__title">{post.title}</h1>
          <div className="gs-post__meta">
            {date && <span className="gs-post__date">{date}</span>}
            {tags.map(t => <span key={t} className="gs-post__tag">{t}</span>)}
          </div>
        </header>

        {cover && (
          <div className="gs-post__cover">
            <img src={cover} alt={post.cover?.alt || ''} />
          </div>
        )}

        <div className="gs-post__body">
          <RichContent content={post.content} />
        </div>

        <ProjectCard project={post.project} />
      </article>
    </>
  )
}
