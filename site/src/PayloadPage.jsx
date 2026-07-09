import { useEffect, useState } from 'react'
import {
  HeroSection, FeatureGrid, Steps, ImageText, Testimonials, Gallery, Faq,
  PricingPlans, ServiceList, HoursLocation, CtaBanner, ContactSection, Checklist, NewsletterSignup,
  TitleBlock, CalloutBlock, CodeBlock, ImageBlock, FactGrid, ScreenshotGallery,
  VideoPlayer, SideBySide, ContentCards, FeatureSpotlight, CinematicBanner,
  CinematicHero, LabHero, RoadmapBlock, ChangelogBlock, SystemRequirements,
  AssetGrid, HierarchyBlock, ArchitectureBlock, EmbeddedApp, PricingCTA, Spacer,
  LocationGrid, ContactMethods,
} from '@aagf470/ui'
import PackageConfigurator from './components/PackageConfigurator.jsx'
import Seo from './components/Seo.jsx'

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
  contactSection: ContactSection, checklist: Checklist, newsletterSignup: NewsletterSignup,
  // Studio / showcase catalog
  titleBlock: TitleBlock, callout: CalloutBlock, codeBlock: CodeBlock,
  imageBlock: ImageBlock, factGrid: FactGrid, screenshotGallery: ScreenshotGallery,
  videoPlayer: VideoPlayer, sideBySide: SideBySide, contentCards: ContentCards,
  featureSpotlight: FeatureSpotlight, cinematicBanner: CinematicBanner,
  cinematicHero: CinematicHero, labHero: LabHero, roadmapBlock: RoadmapBlock,
  changelogBlock: ChangelogBlock, systemRequirements: SystemRequirements,
  assetGrid: AssetGrid, hierarchyBlock: HierarchyBlock,
  architectureBlock: ArchitectureBlock, embeddedApp: EmbeddedApp,
  pricingCTA: PricingCTA, spacer: Spacer,
  locationGrid: LocationGrid, contactMethods: ContactMethods,
}

const API = import.meta.env.VITE_CMS_URL

// Upload value → URL string (depth>0 gives an object; depth 0 gives an id).
const url = v => (v && typeof v === 'object' ? v.url ?? null : typeof v === 'string' ? v : null)

// Render one nested child block (sideBySide columns) with the same MAP+adapt.
function renderNested(b) {
  if (!b) return null
  const C = MAP[b.blockType]
  return C ? <C {...adapt(b)} /> : null
}

// Normalize Payload's stored shape → the plain props the components expect.
function adapt(block) {
  const o = { ...block }
  if (o.columns != null) o.columns = Number(o.columns)                 // select string → number
  if (o.image?.url) o.image = o.image.url                              // upload → src
  if (o.image_src != null) o.image_src = url(o.image_src)              // snake_case uploads → src
  if (o.poster_src != null) o.poster_src = url(o.poster_src)
  if (Array.isArray(o.images))                                         // gallery uploads → {src,alt,caption}
    o.images = o.images.map(i => ({ src: i.image?.url ?? i.image, alt: i.alt || '', caption: i.caption || '' }))
  if (Array.isArray(o.plans))                                          // features [{text}] → [string]
    o.plans = o.plans.map(p => ({ ...p, features: (p.features || []).map(f => f?.text ?? f) }))
  if (o.blockType === 'checklist' && Array.isArray(o.items))           // checklist [{text}] → [string]
    o.items = o.items.map(i => i?.text ?? i)
  if (Array.isArray(o.tags)) o.tags = o.tags.map(t => t?.text ?? t)    // labHero tags [{text}] → [string]
  if (Array.isArray(o.platforms))                                      // featureSpotlight [{platform}] → [slug]
    o.platforms = o.platforms.map(p => p?.platform ?? p)
  if (Array.isArray(o.cards))                                          // contentCards image uploads → src
    o.cards = o.cards.map(c => ({ ...c, image_src: url(c.image_src) }))
  if (Array.isArray(o.assets))                                         // assetGrid preview uploads → src
    o.assets = o.assets.map(a => ({ ...a, preview_src: url(a.preview_src) }))
  if (Array.isArray(o.locations))                                      // locationGrid: image upload → src, areas [{text}] → [string]
    o.locations = o.locations.map(l => ({ ...l, image: url(l.image), areas: (l.areas || []).map(a => a?.text ?? a) }))
  if (Array.isArray(o.nodes))                                          // Payload reserves `id` in arrays
    o.nodes = o.nodes.map(n => ({ ...n, id: n.node_id ?? n.id }))      // → node_id back to the `id` prop
  if (o.blockType === 'sideBySide') {                                  // one nested block per column
    o.left = renderNested(o.left?.[0])
    o.right = renderNested(o.right?.[0])
  }
  // Payload always stores cta groups (defaults fill variant) — an empty group
  // is truthy and would render a blank Button. Drop CTAs with no label/href.
  const emptyCta = c => c && !c.label && !c.href
  if (emptyCta(o.cta)) delete o.cta
  if (Array.isArray(o.ctas)) o.ctas = o.ctas.filter(c => !emptyCta(c))
  if (Array.isArray(o.plans)) o.plans = o.plans.map(p => (emptyCta(p.cta) ? { ...p, cta: undefined } : p))
  // Payload stores empty text/select fields as null, which would override a
  // component's default-parameter value ("Changelog", "/lab", …). Strip them
  // so defaults apply; false / 0 are real values and stay.
  for (const k of Object.keys(o)) if (o[k] == null) delete o[k]
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
          {block.subtext && <p className="section-sub">{block.subtext}</p>}
          <PackageConfigurator />
        </div>
      </section>
    )
  const C = MAP[block.blockType]
  if (!C) return null
  // Payload's built-in "Block Name" doubles as an anchor: name a block
  // "packages" and links to #packages scroll to it (matches the bespoke pages'
  // <div id="..."> wrappers).
  const el = <C key={block.id} {...adapt(block)} />
  return block.blockName
    ? <div key={block.id} id={block.blockName.toLowerCase().replace(/\s+/g, '-')}>{el}</div>
    : el
}

// `seo`: { title, description, path, schema } — the route's SEO source of
// truth, rendered no matter which source (CMS or bespoke fallback) wins.
// Without it (dynamic /:slug pages), the CMS doc's own title is used.
export default function PayloadPage({ slug, fallback = null, fallbackWhileLoading = false, seo = null }) {
  const [page, setPage] = useState(null) // { layout, title }
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
        if (doc?.layout?.length) { setPage({ layout: doc.layout, title: doc.title }); setStatus('cms') } // non-empty CMS page wins
        else setStatus('none')                                              // missing/empty → fallback
      })
      .catch(() => { if (alive) setStatus('none') })
    return () => { alive = false }
  }, [slug])

  const meta = seo
    ? <Seo {...seo} />
    : status === 'cms'
      ? <Seo title={page.title} path={`/${slug}`} />
      : null

  if (status === 'cms') return <>{meta}{page.layout.map(renderBlock)}</>
  if (status === 'loading') return <>{meta}{fallbackWhileLoading ? fallback : null}</>
  return <>{meta}{fallback}</> // 'none'
}
