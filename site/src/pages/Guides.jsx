import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSection } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import './Guides.css'

// ---------------------------------------------------------------------------
// Guides — /guides listing. Every CMS post is a guide/devlog card linking to
// /guides/:slug. Sorted newest-first by publishedAt; friendly empty state
// until the first post ships.
// ---------------------------------------------------------------------------

const API = import.meta.env.VITE_CMS_URL

export const formatDate = iso => {
  if (!iso) return null
  const d = new Date(iso)
  return isNaN(d) ? null : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Prefer the resized card rendition when the CMS has generated one.
const coverUrl = cover => cover?.sizes?.card?.url || cover?.url || null

function GuideCard({ post }) {
  const date = formatDate(post.publishedAt)
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

export default function Guides() {
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
        title="Guides & Devlogs"
        description="Build notes, case studies, and practical guides from real client projects — how the sites are built, what the tools are, and what we learned shipping them."
        path="/guides"
      />
      <HeroSection
        eyebrow="Guides · devlogs & case studies"
        headline="Notes from the workbench."
        subtext="How we build the sites we ship — real decisions, real code, real screenshots. Written for clients who like to look under the hood, and for anyone building something similar."
        size="compact"
        variant="alt"
        ctas={[]}
      />

      <section className="section">
        <div className="section-container">
          {posts === null && <div className="gs-guides__grid" aria-busy="true" />}
          {posts?.length === 0 && (
            <div className="gs-guides__empty">
              <h2>Guides are coming.</h2>
              <p>
                We&rsquo;re writing up the first batch right now — devlogs and case
                studies from real projects. Check back soon, or{' '}
                <Link to="/work">browse our work</Link> in the meantime.
              </p>
            </div>
          )}
          {posts?.length > 0 && (
            <div className="gs-guides__grid">
              {posts.map(p => <GuideCard key={p.id} post={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
