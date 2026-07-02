import { useEffect, useState } from 'react'
import {
  HeroSection, FeatureGrid, Steps, ImageText, Testimonials, Gallery, Faq,
  PricingPlans, ServiceList, HoursLocation, CtaBanner, ContactSection,
} from '@aagf470/ui'
import PackageConfigurator from './components/PackageConfigurator.jsx'

// ---------------------------------------------------------------------------
// PayloadPage — renders a CMS `pages` doc's block layout with @aagf470/ui.
// The site fetches a page by slug and maps each block → its section component.
// Editors control the blocks + their content; the components own the design.
//
// Used two ways:
//  • Main routes (/, /work, /about): fallback = the bespoke React page, shown
//    immediately (fallbackWhileLoading) so there's no blank flash. A CMS page at
//    that slug takes over once it has blocks.
//  • /:slug (CmsPage): fallback = a 404, shown only after the fetch resolves.
// ---------------------------------------------------------------------------
const MAP = {
  hero: HeroSection, featureGrid: FeatureGrid, steps: Steps, imageText: ImageText,
  testimonials: Testimonials, gallery: Gallery, faq: Faq, pricingPlans: PricingPlans,
  serviceList: ServiceList, hoursLocation: HoursLocation, ctaBanner: CtaBanner,
  contactSection: ContactSection,
}

const API = import.meta.env.VITE_CMS_URL

// Normalize Payload's stored shape → the plain props the components expect.
function adapt(block) {
  const o = { ...block }
  if (o.columns != null) o.columns = Number(o.columns)                 // select string → number
  if (o.image?.url) o.image = o.image.url                              // upload → src
  if (Array.isArray(o.images))                                         // gallery uploads → {src,alt,caption}
    o.images = o.images.map(i => ({ src: i.image?.url ?? i.image, alt: i.alt || '', caption: i.caption || '' }))
  if (Array.isArray(o.plans))                                          // features [{text}] → [string]
    o.plans = o.plans.map(p => ({ ...p, features: (p.features || []).map(f => f?.text ?? f) }))
  return o
}

function renderBlock(block) {
  // Escape-hatch blocks render raw HTML: richText via its generated content_html
  // (safe, lexical-derived); customHtml via admin-authored markup.
  if (block.blockType === 'richText')
    return (
      <section key={block.id} className={`gs-cms-richtext gs-cms-richtext--${block.variant || 'default'}`}>
        <div className="gs-cms-richtext__inner" dangerouslySetInnerHTML={{ __html: block.content_html || '' }} />
      </section>
    )
  if (block.blockType === 'customHtml')
    return (
      <section key={block.id} className={`gs-cms-html gs-cms-html--${block.variant || 'default'}`}>
        <div dangerouslySetInnerHTML={{ __html: block.html || '' }} />
      </section>
    )
  // The interactive quote builder — fixed widget with an optional intro heading.
  if (block.blockType === 'configurator')
    return (
      <section key={block.id} className={`section section--${block.variant || 'default'}`} id="configure">
        <div className="section-container">
          {block.eyebrow && <p className="section-eyebrow">{block.eyebrow}</p>}
          {block.headline && <h2 className="section-title">{block.headline}</h2>}
          {block.subtext && <p className="section-subtext">{block.subtext}</p>}
          <PackageConfigurator />
        </div>
      </section>
    )
  const C = MAP[block.blockType]
  return C ? <C key={block.id} {...adapt(block)} /> : null
}

export default function PayloadPage({ slug, fallback = null, fallbackWhileLoading = false }) {
  const [layout, setLayout] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'cms' | 'none'

  useEffect(() => {
    if (!slug) { setStatus('none'); return }
    let alive = true
    setStatus('loading')
    fetch(`${API}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`)
      .then(r => r.json())
      .then(d => {
        if (!alive) return
        const doc = d?.docs?.[0]
        if (doc?.layout?.length) { setLayout(doc.layout); setStatus('cms') } // non-empty CMS page wins
        else setStatus('none')                                              // missing/empty → fallback
      })
      .catch(() => { if (alive) setStatus('none') })
    return () => { alive = false }
  }, [slug])

  if (status === 'cms') return <>{layout.map(renderBlock)}</>
  if (status === 'loading') return fallbackWhileLoading ? fallback : null
  return fallback // 'none'
}
