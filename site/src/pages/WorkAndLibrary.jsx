import { useState, useEffect } from 'react'
import { HeroSection, CtaBanner } from '@aagf470/ui'
import { LibraryFacts, LibraryShowcase } from './ComponentLibrary.jsx'
import { useT } from '../i18n.jsx'
import './Work.css'

const CMS = import.meta.env.VITE_CMS_URL
// Payload media URLs are relative to the CMS server — make them absolute.
const mediaUrl = u => (u ? (/^https?:\/\//.test(u) ? u : `${CMS}${u}`) : null)

// ---------------------------------------------------------------------------
// Work & Library — merged showcase page: what we've built (client work) and
// what we build with (the live component system). One narrative: the proof,
// then the machine behind it.
// ---------------------------------------------------------------------------

function BrowserFrame({ url, image, alt }) {
  return (
    <div className="work-frame">
      <div className="work-frame__bar">
        <span className="work-frame__dots"><i /><i /><i /></span>
        <span className="work-frame__url">{url}</span>
      </div>
      <img className="work-frame__screen" src={image} alt={alt} loading="lazy" />
    </div>
  )
}

// A browser frame that shows a screenshot once one exists at `image`, and a
// tidy "drop it here" placeholder until then. Just save the real capture at the
// given path — no code change needed (the onError fallback swaps automatically).
function ScreenshotFrame({ url, image, alt }) {
  const t = useT()
  const [failed, setFailed] = useState(false)
  return (
    <div className="work-frame">
      <div className="work-frame__bar">
        <span className="work-frame__dots"><i /><i /><i /></span>
        <span className="work-frame__url">{url}</span>
      </div>
      {failed ? (
        <div className="work-shot-ph">
          <span className="work-shot-ph__tag">{t('Screenshot coming soon', 'Captura próximamente')}</span>
          <small>{image}</small>
        </div>
      ) : (
        <img
          className="work-frame__screen" src={image} alt={alt} loading="lazy"
          onError={() => setFailed(true)}
          // A missing file can still "load" (e.g. a dev-server HTML fallback);
          // a real image has a non-zero natural width, a broken one doesn't.
          onLoad={e => { if (!e.currentTarget.naturalWidth) setFailed(true) }}
        />
      )}
    </div>
  )
}

export default function WorkAndLibrary() {
  const t = useT()

  const CLIENTS = [
    {
      name: 'Angel Electrical Services',
      location: 'Dallas, Texas',
      industry: t('Licensed Electrician', 'Electricista con licencia'),
      url: 'angelelectrical.com',
      image: '/img/work/angel-electrical.svg',
      blurb: t('A trust-first site for a residential & commercial electrician — clear service list, service-area coverage, and a quote form that routes straight to the owner.', 'Un sitio que genera confianza para un electricista residencial y comercial — lista de servicios clara, cobertura por zona y un formulario de cotización que llega directo al dueño.'),
      quote: t('Booked three new commercial jobs the first month. The site finally looks as professional as the work we do.', 'Conseguimos tres trabajos comerciales nuevos el primer mes. Por fin el sitio se ve tan profesional como el trabajo que hacemos.'),
      author: 'Angel R.',
      role: t('Owner', 'Dueño'),
    },
    {
      name: 'FencingPatrol',
      location: 'Long Island, New York',
      industry: t('General Contractor', 'Contratista general'),
      url: 'fencingpatrol.com',
      image: '/img/work/fencingpatrol.svg',
      blurb: t('A bold, bilingual site for a family contractor — roofing, fencing, and paving, with a project gallery and a call-first layout in English and Español.', 'Un sitio llamativo y bilingüe para un contratista familiar — techos, cercas y pavimentación, con una galería de proyectos y un diseño enfocado en la llamada, en English y Español.'),
      quote: t('Sending people one link that shows everything we do — in both languages — changed how we win jobs.', 'Mandar a la gente un solo enlace que muestra todo lo que hacemos — en los dos idiomas — cambió la forma en que ganamos trabajos.'),
      author: 'FencingPatrol',
      role: t('Family crew', 'Equipo familiar'),
    },
    {
      name: 'Cryark Inc',
      location: 'Boston, Massachusetts',
      industry: t('Game Development Studio', 'Estudio de desarrollo de videojuegos'),
      url: 'cryark.net',
      image: '/img/work/cryark.svg',
      blurb: t('A cinematic, dark-mode studio site for a game & tools developer — product showcases, a devlog, and a component-driven docs system.', 'Un sitio de estudio cinematográfico en modo oscuro para un desarrollador de juegos y herramientas — vitrinas de productos, un devlog y un sistema de documentación basado en componentes.'),
      quote: t('It carries the mood of what we make. The same system that built a contractor site scaled to a full studio presence.', 'Transmite el ambiente de lo que creamos. El mismo sistema que construyó el sitio de un contratista escaló hasta la presencia completa de un estudio.'),
      author: 'Cryark',
      role: t('Studio team', 'Equipo del estudio'),
    },
  ]

  const REACH = [
    { stat: '3', label: t('states', 'estados'), sub: 'Texas · New York · Massachusetts' },
    { stat: '3', label: t('industries', 'industrias'), sub: t('Electrical · Construction · Games', 'Electricidad · Construcción · Videojuegos') },
    { stat: '1', label: t('component system', 'sistema de componentes'), sub: t('behind every one of them', 'detrás de cada uno de ellos') },
  ]

  // In-development builds — pulled from the CMS `builds` collection so they're
  // fully editable without code: in /admin, upload a screenshot + a line of
  // text and it appears here (newest first). The section hides itself until
  // there's at least one entry.
  const [builds, setBuilds] = useState(null) // null = loading, [] = none

  useEffect(() => {
    if (!CMS) { setBuilds([]); return }
    let alive = true
    fetch(`${CMS}/api/builds?sort=-createdAt&depth=1&limit=12`)
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
        subtext={t('From a Dallas electrician to a Long Island contractor to a Boston game studio — genuinely different businesses, genuinely different looks, none of them a template. Every one designed to fit the business, and owned by the client outright. Real client work and builds in progress below.', 'Desde un electricista en Dallas hasta un contratista de Long Island y un estudio de videojuegos en Boston — negocios genuinamente distintos, con looks genuinamente distintos, ninguno una plantilla. Cada uno diseñado a la medida del negocio y propiedad total del cliente. Trabajo real de clientes y construcciones en curso abajo.')}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      {/* Reach / versatility stats */}
      <section className="section section--default work-reach-sec">
        <div className="section-container">
          <div className="work-reach">
            {REACH.map(r => (
              <div key={r.label} className="work-reach__item">
                <span className="work-reach__stat">{r.stat}</span>
                <span className="work-reach__label">{r.label}</span>
                <span className="work-reach__sub">{r.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client showcases */}
      <section className="section section--alt work-list-sec">
        <div className="section-container">
          {CLIENTS.map((c, i) => (
            <article key={c.name} className={`work-item${i % 2 ? ' work-item--reverse' : ''}`}>
              <div className="work-item__media">
                <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer"
                  className="work-item__link" aria-label={`Visit ${c.name} (opens in a new tab)`}>
                  <BrowserFrame url={c.url} image={c.image} alt={`${c.name} website`} />
                </a>
              </div>
              <div className="work-item__info">
                <span className="work-item__badge">{c.location}</span>
                <h2 className="work-item__name">{c.name}</h2>
                <p className="work-item__industry">{c.industry}</p>
                <p className="work-item__blurb">{c.blurb}</p>
                <blockquote className="work-quote">
                  <p>“{c.quote}”</p>
                  <footer><strong>{c.author}</strong> · {c.role}</footer>
                </blockquote>
                <span className="work-item__note">{t('Site view is a design placeholder', 'La vista del sitio es un marcador de diseño')}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* In development — CMS-managed (the `builds` collection). Hidden until
          there's at least one entry, so a fresh site stays clean. */}
      {builds?.length > 0 && (
        <section className="section section--default work-examples-sec">
          <div className="section-container">
            <p className="section-eyebrow">{t('On the workbench', 'En el taller')}</p>
            <h2 className="section-title">{t('Currently in development', 'Actualmente en desarrollo')}</h2>
            <p className="section-sub">
              {t('Sites we\'re building right now — different businesses, different looks, none of them a template.', 'Sitios que estamos construyendo ahora mismo — negocios distintos, looks distintos, ninguno una plantilla.')}
            </p>
            <div className="work-examples">
              {builds.map(b => (
                <div key={b.id} className="work-concept">
                  <ScreenshotFrame
                    url={b.url || t('in development', 'en desarrollo')}
                    image={mediaUrl(b.image?.sizes?.card?.url || b.image?.url)}
                    alt={`${b.title} — screenshot`}
                  />
                  <div className="work-concept__cap">
                    <h3 className="work-concept__name">{b.title}</h3>
                    {b.kind && <p className="work-concept__kind">{b.kind}</p>}
                    {b.blurb && <p className="work-concept__blurb">{b.blurb}</p>}
                  </div>
                </div>
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
    </>
  )
}
