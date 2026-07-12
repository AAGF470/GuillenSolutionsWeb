import { HeroSection, CtaBanner , Reveal } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import RenderFinder from '../components/RenderFinder.jsx'
import { CONTACT_EMAIL } from '../data'
import { useContent } from '../content.js'
import { useT } from '../i18n.jsx'
import { useSiteImages } from '../lib/siteImages.js'
import { rendersSchema } from '../schema'
import './CGRenders.css'

// ---------------------------------------------------------------------------
// CG Product Renders — a separate visual service (not web). Priced around the
// "model once, render many" advantage: complexity-tiered per-product base,
// cheap additional shots, and affordable multi-shot e-commerce packages.
//
// IMAGE PLACEHOLDERS: each .gs-cg__ph is a swap slot. Drop a file into
// site/public/img/renders/ and replace the <div className="gs-cg__ph">…</div>
// with <img className="gs-cg__img" src="/img/renders/your-file.jpg" alt="…" />.
// ---------------------------------------------------------------------------

// A CMS-fed image slot (Globals → Site images). Unfilled slots render
// nothing — keying an image into the slot in the CMS makes the shot appear.
function Shot({ label, img, wide }) {
  if (!img) return null
  return (
    <figure className={`gs-cg__shot${wide ? ' gs-cg__shot--wide' : ''}`}>
      <img className="gs-cg__ph" src={img} alt={label} loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      <figcaption>{label}</figcaption>
    </figure>
  )
}

export default function CGRenders() {
  const t = useT()
  const siteImages = useSiteImages()
  const {
    CG_RENDER_LEAD, CG_RENDER_ADVANTAGE, CG_RENDER_TIERS, CG_RENDER_SHOTS,
    CG_RENDER_PACKAGES, CG_RENDER_NOTES, CG_RENDER_VARIANT_NOTE, CG_RENDER_MOTION,
  } = useContent()

  const quoteHref =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t('CG product render quote', 'Cotización de renders de producto 3D'))}` +
    `&body=${encodeURIComponent(t(
      'Hi — I\'d like a quote for product renders.\n\n' +
      'Product(s): \n' +
      'Roughly how many shots per product: \n' +
      'Do you also need a website (bundle discount)? : \n\n' +
      '(Links or photos of the product help us tier complexity.)',
      'Hola — me gustaría una cotización para renders de producto.\n\n' +
      'Producto(s): \n' +
      'Aproximadamente cuántas tomas por producto: \n' +
      '¿También necesitas un sitio web (descuento por combinar)? : \n\n' +
      '(Enlaces o fotos del producto nos ayudan a ubicar la complejidad.)',
    ))}`

  return (
    <>
      <Seo
        title={t('CG Product Renders', 'Renders de producto 3D')}
        description={t('Studio-quality 3D product images for e-commerce — model once, render many. Complexity-tiered per product, cheap extra shots, affordable multi-shot packages. Bundle with a website or order standalone.', 'Imágenes de producto en 3D con calidad de estudio para e-commerce — modela una vez, renderiza muchas. Con precio por complejidad por producto, tomas extra económicas y paquetes de varias tomas accesibles. Combínalo con un sitio web o pídelo por separado.')}
        path="/renders"
        schema={rendersSchema}
      />

      <HeroSection
        eyebrow={t('Product renders · model once, render many', 'Renders de producto · modela una vez, renderiza muchas')}
        headline={t('Studio-quality product images, without the studio.', 'Imágenes de producto con calidad de estudio, sin el estudio.')}
        subtext={t('We build your product in 3D once, then light and render it in our standardized studio scene. No samples shipped, no photographer booked, no reshoot fees — and every extra shot is cheap, because the model already exists.', 'Construimos tu producto en 3D una vez, y luego lo iluminamos y renderizamos en nuestra escena de estudio estandarizada. Sin enviar muestras, sin contratar fotógrafo, sin costos de repetición — y cada toma extra es económica, porque el modelo ya existe.')}
        size="compact"
        variant="alt"
        ctas={[
          { label: t('Get a quote', 'Pide una cotización'), href: quoteHref, variant: 'solid' },
          { label: t('See pricing', 'Ver precios'), href: '#pricing', variant: 'ghost' },
        ]}
      />

      {/* ── The advantage ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="section-container">
          <p className="section-eyebrow">{t("Why it's affordable", 'Por qué es accesible')}</p>
          <h2 className="section-title">{t('One model. Every shot you need.', 'Un modelo. Cada toma que necesitas.')}</h2>
          <p className="section-sub">{CG_RENDER_LEAD}</p>
          <Reveal stagger className="gs-cg__adv">
            {CG_RENDER_ADVANTAGE.map((a, i) => (
              <div className="gs-cg__adv-card" key={a.title}>
                <span className="gs-cg__adv-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Gallery of placeholders ───────────────────────────────────── */}
      <section className="section section--alt">
        <div className="section-container">
          <p className="section-eyebrow">{t('Recent work', 'Trabajo reciente')}</p>
          <h2 className="section-title">{t('From studio packs to lifestyle heroes', 'De paquetes de estudio a tomas principales ambientadas')}</h2>
          <p className="section-sub">
            {t(
              'Placeholders below — swap in real renders as we build the portfolio. The same model produces the clean listing shots and the staged scenes.',
              'Marcadores de posición abajo — los reemplazamos con renders reales conforme armamos el portafolio. El mismo modelo produce las tomas de listado limpias y las escenas ambientadas.',
            )}
          </p>
          <div className="gs-cg__gallery">
            <Shot wide label={t('Lifestyle hero — product staged in a real scene', 'Toma principal ambientada — producto montado en una escena real')} slot="renders-lifestyle-hero" img={siteImages['renders-lifestyle-hero']} />
            <Shot label={t('White-background listing shot', 'Toma de listado con fondo blanco')} slot="renders-studio-front" img={siteImages['renders-studio-front']} />
            <Shot label={t('Three-quarter angle', 'Ángulo de tres cuartos')} slot="renders-studio-34" img={siteImages['renders-studio-34']} />
            <Shot label={t('Detail crop — materials & finish', 'Acercamiento de detalle — materiales y acabado')} slot="renders-detail" img={siteImages['renders-detail']} />
            <Shot label={t('Color / label variant', 'Variante de color / etiqueta')} slot="renders-variant" img={siteImages['renders-variant']} />
            <Shot wide label={t('Second lifestyle scene — ad / banner ready', 'Segunda escena ambientada — lista para anuncio / banner')} slot="renders-lifestyle-2" img={siteImages['renders-lifestyle-2']} />
          </div>
        </div>
      </section>

      {/* ── Pricing: complexity tiers ─────────────────────────────────── */}
      <section className="section" id="pricing">
        <div className="section-container">
          <p className="section-eyebrow">{t('Per-product base', 'Base por producto')}</p>
          <h2 className="section-title">{t('Priced by complexity, not guesswork', 'Con precio según complejidad, no adivinanzas')}</h2>
          <p className="section-sub">
            {t(
              "Each product's base covers the 3D model plus your first studio shot. We tier by modeling effort — never flat-rate — because that's the part that actually varies.",
              'La base de cada producto cubre el modelo 3D más tu primera toma de estudio. Escalonamos según el esfuerzo de modelado — nunca tarifa plana — porque esa es la parte que de verdad varía.',
            )}
          </p>
          <div className="gs-cg__tiers">
            {CG_RENDER_TIERS.map(tier => (
              <div className={`gs-cg__tier${tier.featured ? ' is-featured' : ''}`} key={tier.id}>
                {tier.featured && <span className="gs-cg__tier-badge">{t('Most common', 'El más común')}</span>}
                <h3 className="gs-cg__tier-name">{tier.name}</h3>
                <p className="gs-cg__tier-price">{tier.price}</p>
                <p className="gs-cg__tier-per">{tier.per}</p>
                <p className="gs-cg__tier-body">{tier.body}</p>
                <p className="gs-cg__tier-eg"><span>{t('Examples', 'Ejemplos')}</span>{tier.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Add-on shots ──────────────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="section-container">
          <p className="section-eyebrow">{t('More shots, once the model exists', 'Más tomas, una vez que el modelo existe')}</p>
          <h2 className="section-title">{t('Extra renders are the cheap part', 'Los renders extra son la parte barata')}</h2>
          <div className="gs-cg__shots">
            {CG_RENDER_SHOTS.map(s => (
              <div className="gs-cg__shotrow" key={s.id}>
                <div className="gs-cg__shotrow-head">
                  <h3>{s.name}</h3>
                  <span className="gs-cg__shotrow-price">{s.price}<small>{s.per}</small></span>
                </div>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="gs-cg__variant">
            <span className="gs-cg__note-tag">{t('The product-line play', 'La jugada de la línea de productos')}</span>
            <p>{CG_RENDER_VARIANT_NOTE}</p>
          </div>
        </div>
      </section>

      {/* ── Product motion / animation ────────────────────────────────── */}
      <section className="section">
        <div className="section-container">
          <p className="section-eyebrow">{t('Product motion · new', 'Movimiento de producto · nuevo')}</p>
          <h2 className="section-title">{t('Animate the model you already have', 'Anima el modelo que ya tienes')}</h2>
          <p className="section-sub">{CG_RENDER_MOTION.lead}</p>
          <div className="gs-cg__shots">
            {CG_RENDER_MOTION.items.map(m => (
              <div className="gs-cg__shotrow" key={m.id}>
                <div className="gs-cg__shotrow-head">
                  <h3>{m.name}</h3>
                  <span className="gs-cg__shotrow-price">{m.price}<small>{m.per}</small></span>
                </div>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
          <div className="gs-cg__variant">
            <span className="gs-cg__note-tag">{t('Why motion costs more', 'Por qué el movimiento cuesta más')}</span>
            <p>{CG_RENDER_MOTION.note}</p>
          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────────────────── */}
      <section className="section section--alt" id="packages">
        <div className="section-container">
          <p className="section-eyebrow">{t('The small-business sweet spot', 'El punto ideal para el pequeño negocio')}</p>
          <h2 className="section-title">{t('Multi-shot packages', 'Paquetes de varias tomas')}</h2>
          <p className="section-sub">
            {t(
              'Built on one model, so a whole listing gallery stays affordable. All files are full-resolution and yours to keep.',
              'Construidos sobre un solo modelo, para que toda una galería de listado siga siendo accesible. Todos los archivos son de resolución completa y tuyos para conservar.',
            )}
          </p>
          <div className="gs-cg__packs">
            {CG_RENDER_PACKAGES.map(p => (
              <div className={`gs-cg__pack${p.featured ? ' is-featured' : ''}`} key={p.id}>
                {p.badge && <span className="gs-cg__pack-badge">{p.badge}</span>}
                <h3 className="gs-cg__pack-name">{p.name}</h3>
                <p className="gs-cg__pack-price">{p.price}</p>
                <p className="gs-cg__pack-body">{p.body}</p>
                <ul className="gs-cg__pack-list">
                  {p.includes.map(x => <li key={x}>{x}</li>)}
                </ul>
                <a className="gs-cg__pack-cta" href={quoteHref}>{t('Start this package', 'Empezar este paquete')}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Render finder quiz ────────────────────────────────────────── */}
      <section className="section" id="render-finder">
        <div className="section-container">
          <p className="section-eyebrow">{t('Not sure what you need?', '¿No sabes qué necesitas?')}</p>
          <h2 className="section-title">{t('Find your render package in 60 seconds', 'Encuentra tu paquete de renders en 60 segundos')}</h2>
          <p className="section-sub">
            {t(
              'Four quick questions and we\'ll point you at a starting package and a rough estimate — then send it as a free request in one click.',
              'Cuatro preguntas rápidas y te apuntamos a un paquete inicial y un estimado aproximado — luego envíalo como solicitud gratuita con un clic.',
            )}
          </p>
          <RenderFinder />
        </div>
      </section>

      {/* ── Notes: bundle / standalone / market / quote ───────────────── */}
      <section className="section">
        <div className="section-container">
          <div className="gs-cg__notes">
            <div className="gs-cg__note gs-cg__note--accent">
              <span className="gs-cg__note-tag">{t('Bundle & save', 'Combina y ahorra')}</span>
              <p>{CG_RENDER_NOTES.bundled}</p>
            </div>
            <div className="gs-cg__note">
              <span className="gs-cg__note-tag">{t('Standalone', 'Por separado')}</span>
              <p>{CG_RENDER_NOTES.standalone}</p>
            </div>
            <div className="gs-cg__note">
              <span className="gs-cg__note-tag">{t('Where we fit', 'Dónde encajamos')}</span>
              <p>{CG_RENDER_NOTES.market}</p>
            </div>
            <div className="gs-cg__note">
              <span className="gs-cg__note-tag">{t('How we quote', 'Cómo cotizamos')}</span>
              <p>{CG_RENDER_NOTES.quote}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={t('Send us your product', 'Envíanos tu producto')}
        headline={t('Get a per-product quote — free, in writing.', 'Obtén una cotización por producto — gratis, por escrito.')}
        subtext={t("Share a link or a few photos and a rough shot (or motion) count. We'll tier the complexity and send a fixed number before any work starts. Bundling with a website? Ask about the discount.", 'Comparte un enlace o unas fotos y un conteo aproximado de tomas (o de movimiento). Ubicamos la complejidad y te enviamos un número fijo antes de empezar cualquier trabajo. ¿Lo combinas con un sitio web? Pregunta por el descuento.')}
        cta={{ label: t('Get a quote', 'Pide una cotización'), href: quoteHref }}
        variant="accent"
      />
    </>
  )
}
