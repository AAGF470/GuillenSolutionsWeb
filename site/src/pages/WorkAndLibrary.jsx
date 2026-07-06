import { HeroSection, CtaBanner } from '@aagf470/ui'
import { LibraryFacts, LibraryShowcase } from './ComponentLibrary.jsx'
import { useT } from '../i18n.jsx'
import './Work.css'

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

  // Design concepts — spec builds that prove the range (and, for the boutique,
  // double as a showcase of the CG product renders). Live, scrollable, labeled
  // as concepts. Add more here as the portfolio grows.
  const EXAMPLES = [
    {
      name: 'Marigold & Ash',
      kind: t('Hair studio & spa · design concept', 'Estudio de cabello y spa · concepto de diseño'),
      url: 'marigoldandash.com',
      href: '/examples/salon/index.html',
      blurb: t('Warm, editorial, photo-forward — the presentation an aesthetic-driven business lives or dies on. A world away from a template, and from a dark technical brand.', 'Cálido, editorial, con la foto al frente — la presentación de la que depende un negocio guiado por la estética. A un mundo de distancia de una plantilla, y de una marca técnica oscura.'),
    },
    {
      name: 'Ember & Field',
      kind: t('Candles & ceramics · design concept', 'Velas y cerámica · concepto de diseño'),
      url: 'emberandfield.com',
      href: '/examples/boutique/index.html',
      blurb: t('A product-forward shop for a small-batch maker — clean, tactile, gallery-minimal. The product grid is exactly where our CG renders live: model once, shoot every listing.', 'Una tienda con el producto al frente para un fabricante de lotes pequeños — limpia, táctil, de galería minimalista. La cuadrícula de productos es justo donde viven nuestros renders CG: modela una vez, fotografía cada artículo.'),
    },
    {
      name: 'Copper & Rye',
      kind: t('Cocktail bar & kitchen · design concept', 'Bar de cócteles y cocina · concepto de diseño'),
      url: 'copperandrye.com',
      href: '/examples/bar/index.html',
      blurb: t('Dark, cinematic, and moody — near-black and copper with a high-contrast serif. The same system can turn the lights way down for a bar or restaurant.', 'Oscuro, cinematográfico y con carácter — casi negro y cobre con una tipografía serif de alto contraste. El mismo sistema puede bajar mucho las luces para un bar o restaurante.'),
    },
    {
      name: 'Kinetic',
      kind: t('Fitness studio · design concept', 'Estudio de fitness · concepto de diseño'),
      url: 'kineticstudio.com',
      href: '/examples/studio/index.html',
      blurb: t('Loud, bold, color-blocked, high-energy — heavy type and electric coral. Proof the range runs all the way to confident and kinetic, not just calm and premium.', 'Estridente, atrevido, con bloques de color y mucha energía — tipografía gruesa y coral eléctrico. La prueba de que el rango llega hasta lo seguro y dinámico, no solo lo calmado y premium.'),
    },
  ]

  return (
    <>
      <HeroSection
        eyebrow={t('Our work', 'Nuestro trabajo')}
        headline={t('Custom sites, built to be owned.', 'Sitios a la medida, hechos para ser tuyos.')}
        subtext={t('From a boutique salon to a Long Island contractor to a Boston game studio — genuinely different businesses, genuinely different looks, none of them a template. Every one designed to fit the business, and owned by the client outright. Concepts and real client work below.', 'Desde un salón boutique hasta un contratista de Long Island y un estudio de videojuegos en Boston — negocios genuinamente distintos, con looks genuinamente distintos, ninguno una plantilla. Cada uno diseñado a la medida del negocio y propiedad total del cliente. Conceptos y trabajo real de clientes abajo.')}
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

      {/* Design concepts — live, scrollable spec sites that prove the range */}
      <section className="section section--default work-examples-sec">
        <div className="section-container">
          <p className="section-eyebrow">{t('Design concepts', 'Conceptos de diseño')}</p>
          <h2 className="section-title">{t('What "custom" actually looks like', 'Cómo se ve realmente lo "a la medida"')}</h2>
          <p className="section-sub">
            {t('Everyone says "custom." Here\'s the proof — concept builds for the kind of businesses whose first impression is everything. Different worlds, different looks, none of them a template. They\'re live: open one and scroll.', 'Todos dicen "a la medida." Aquí está la prueba — construcciones conceptuales para el tipo de negocios cuya primera impresión lo es todo. Mundos distintos, looks distintos, ninguno una plantilla. Están en vivo: abre uno y desplázate.')}
          </p>
          <div className="work-examples">
            {EXAMPLES.map(ex => (
              <a key={ex.href} className="work-concept" href={ex.href} target="_blank" rel="noopener noreferrer">
                <div className="work-frame">
                  <div className="work-frame__bar">
                    <span className="work-frame__dots"><i /><i /><i /></span>
                    <span className="work-frame__url">{ex.url}</span>
                  </div>
                  <div className="work-concept__viewport">
                    <iframe
                      className="work-concept__frame"
                      src={ex.href}
                      title={`${ex.name} — design concept`}
                      loading="lazy" tabIndex={-1} aria-hidden="true" scrolling="no"
                    />
                  </div>
                </div>
                <div className="work-concept__cap">
                  <h3 className="work-concept__name">{ex.name}</h3>
                  <p className="work-concept__kind">{ex.kind}</p>
                  <p className="work-concept__blurb">{ex.blurb}</p>
                  <span className="work-concept__cta">{t('Open the live concept ↗', 'Abrir el concepto en vivo ↗')}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

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
