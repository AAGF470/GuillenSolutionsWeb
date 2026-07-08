import { useState, useEffect } from 'react'
import { HeroSection, CtaBanner } from '@aagf470/ui'
import { LibraryFacts, LibraryShowcase } from './ComponentLibrary.jsx'
import { useT } from '../i18n.jsx'
import './Work.css'

// ---------------------------------------------------------------------------
// Work & Library — the proof (real builds, CMS-managed) + the machine behind
// it (the live component system). The build showcase reads from the CMS
// `builds` collection: each card is a cover screenshot; clicking opens a popup
// gallery of all its images. Status = "in development" or "published"; the
// live link is optional (client privacy).
// ---------------------------------------------------------------------------

const CMS = import.meta.env.VITE_CMS_URL
// Payload media URLs are relative to the CMS server — make them absolute.
const mediaUrl = u => (u ? (/^https?:\/\//.test(u) ? u : `${CMS}${u}`) : null)
// Prefix a bare domain with https:// so the optional link works either way.
const asHref = u => (u ? (/^https?:\/\//.test(u) ? u : `https://${u}`) : null)

// A browser frame showing a screenshot, with a tidy placeholder if it's absent.
function ScreenshotFrame({ url, image, alt }) {
  const t = useT()
  const [failed, setFailed] = useState(false)
  return (
    <div className="work-frame">
      <div className="work-frame__bar">
        <span className="work-frame__dots"><i /><i /><i /></span>
        <span className="work-frame__url">{url}</span>
      </div>
      {failed || !image ? (
        <div className="work-shot-ph">
          <span className="work-shot-ph__tag">{t('Screenshot coming soon', 'Captura próximamente')}</span>
        </div>
      ) : (
        <img
          className="work-frame__screen" src={image} alt={alt} loading="lazy"
          onError={() => setFailed(true)}
          onLoad={e => { if (!e.currentTarget.naturalWidth) setFailed(true) }}
        />
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const t = useT()
  const label = status === 'published' ? t('Published', 'Publicado') : t('In development', 'En desarrollo')
  return <span className={`work-status work-status--${status || 'in-development'}`}>{label}</span>
}

// Popup gallery — all of a build's images, its details, and the optional link.
function BuildModal({ build, onClose }) {
  const t = useT()
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const imgs = [build.image, ...(build.images || []).map(r => r.image)].filter(Boolean)
  const href = asHref(build.url)

  return (
    <div className="work-modal" role="dialog" aria-modal="true" aria-label={build.title} onClick={onClose}>
      <div className="work-modal__panel" onClick={e => e.stopPropagation()}>
        <button type="button" className="work-modal__close" onClick={onClose} aria-label={t('Close', 'Cerrar')}>×</button>
        <div className="work-modal__head">
          <StatusBadge status={build.status} />
          <h3 className="work-modal__title">{build.title}</h3>
          {build.kind && <p className="work-modal__kind">{build.kind}</p>}
          {build.blurb && <p className="work-modal__blurb">{build.blurb}</p>}
          {href && (
            <a className="work-modal__link" href={href} target="_blank" rel="noopener noreferrer">
              {t('Visit the live site', 'Visitar el sitio')} ↗
            </a>
          )}
        </div>
        <div className="work-modal__gallery">
          {imgs.length === 0 && <p className="work-modal__empty">{t('Images coming soon.', 'Imágenes próximamente.')}</p>}
          {imgs.map((im, i) => (
            <img key={i} src={mediaUrl(im?.sizes?.hero?.url || im?.url)} alt={`${build.title} — ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WorkAndLibrary() {
  const t = useT()
  const [builds, setBuilds] = useState(null) // null = loading, [] = none
  const [active, setActive] = useState(null) // the build shown in the popup

  useEffect(() => {
    if (!CMS) { setBuilds([]); return }
    let alive = true
    // depth=2 populates the nested gallery uploads (images[].image).
    fetch(`${CMS}/api/builds?sort=-createdAt&depth=2&limit=24`)
      .then(r => (r.ok ? r.json() : { docs: [] }))
      .then(d => { if (alive) setBuilds(d?.docs ?? []) })
      .catch(() => { if (alive) setBuilds([]) })
    return () => { alive = false }
  }, [])

  return (
    <>
      <HeroSection
        eyebrow={t('Our work', 'Nuestro trabajo')}
        headline={t('Custom sites, built to be owned.', 'Sitios a la medida, hechos para ser tuyos.')}
        subtext={t(
          'Real builds — in development and shipped — genuinely different businesses with genuinely different looks, none of them a template. Every one designed to fit the business and owned by the client outright.',
          'Construcciones reales — en desarrollo y publicadas — negocios genuinamente distintos con looks genuinamente distintos, ninguno una plantilla. Cada uno diseñado a la medida del negocio y propiedad total del cliente.',
        )}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      {/* Build showcase — CMS-managed (`builds`). Click a card → popup gallery.
          Hidden until there's at least one entry. */}
      {builds?.length > 0 && (
        <section className="section section--default work-examples-sec">
          <div className="section-container">
            <p className="section-eyebrow">{t('The work', 'El trabajo')}</p>
            <h2 className="section-title">{t('In development & published', 'En desarrollo y publicados')}</h2>
            <p className="section-sub">
              {t('Sites we\'re building and shipping. Click any one to open its gallery.', 'Sitios que estamos construyendo y lanzando. Haz clic en cualquiera para abrir su galería.')}
            </p>
            <div className="work-examples">
              {builds.map(b => (
                <button key={b.id} type="button" className="work-concept work-concept--btn" onClick={() => setActive(b)}>
                  <ScreenshotFrame
                    url={b.url || t('in development', 'en desarrollo')}
                    image={mediaUrl(b.image?.sizes?.card?.url || b.image?.url)}
                    alt={`${b.title} — screenshot`}
                  />
                  <div className="work-concept__cap">
                    <StatusBadge status={b.status} />
                    <h3 className="work-concept__name">{b.title}</h3>
                    {b.kind && <p className="work-concept__kind">{b.kind}</p>}
                    {b.blurb && <p className="work-concept__blurb">{b.blurb}</p>}
                    <span className="work-concept__cta">{t('View gallery ↗', 'Ver galería ↗')}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The system behind the work */}
      <LibraryFacts />

      {/* The live showcase — every component, rendered from sample content */}
      <section className="section section--default" id="library" style={{ paddingBottom: 0 }}>
        <div className="section-container">
          <p className="section-eyebrow">{t('The toolkit, live', 'El kit de herramientas, en vivo')}</p>
          <h2 className="section-title">{t('Every component, rendered right here', 'Cada componente, mostrado aquí mismo')}</h2>
          <p className="section-sub">
            {t('Everything below is a real production component shown with sample content — mobile-ready, light and dark, tested once and reused everywhere. Your site is composed from these, themed to your business.', 'Todo lo de abajo es un componente real de producción mostrado con contenido de ejemplo — listo para móvil, claro y oscuro, probado una vez y reutilizado en todas partes. Tu sitio se compone a partir de estos, con el tema de tu negocio.')}
          </p>
        </div>
      </section>
      <LibraryShowcase />

      <CtaBanner
        eyebrow={t("Your industry's next", 'Tu industria es la que sigue')}
        headline={t('Whatever you do, we can build it — and hand it to you.', 'Hagas lo que hagas, podemos construirlo — y entregártelo.')}
        subtext={t('Different trade, different state, different style. Same honest, you-own-everything setup.', 'Otro oficio, otro estado, otro estilo. La misma configuración honesta en la que eres dueño de todo.')}
        cta={{ label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order' }}
        variant="accent"
      />

      {active && <BuildModal build={active} onClose={() => setActive(null)} />}
    </>
  )
}
