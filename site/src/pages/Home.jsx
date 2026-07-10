import { Link } from 'react-router-dom'
import './Home.css'
import {
  HeroSection,
  FeatureGrid,
  ImageText,
  Steps,
  PricingPlans,
  LocationGrid,
  PromiseContract,
  Reveal,
} from '@aagf470/ui'
import { CONTACT_EMAIL } from '../data'
import { useContent } from '../content.js'
import { useMarketImages } from '../lib/marketImages.js'
import { useT } from '../i18n.jsx'

export default function Home() {
  const t = useT()
  const {
    PACKAGES, OWNERSHIP, GROWTH_NOTE, PRICING_PROMISE, POSITIONING,
    CMS_LEAD, RUN_SAFE_POINTS, SERVICES, REFERRAL_PROGRAM, FOUND, WHERE_WE_ARE, MARKETS,
  } = useContent()
  // Market photos come from the CMS `markets` global (upload → appears here).
  const marketImages = useMarketImages()

  // Map shared pricing data → PricingPlans plan shape
  const PLANS = PACKAGES.map(p => ({
    badge:       p.badge,
    tag:         p.tag,
    name:        p.name,
    price:       p.price,
    period:      p.period,
    description: p.description,
    note:        p.note,
    features:    p.features,
    featured:    p.featured,
    cta:         { label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order', variant: p.featured ? 'solid' : 'ghost-bordered' },
  }))

  const WHAT_WE_DO = [
    { icon: 'star',   title: t('A custom-designed site', 'Un sitio diseñado a la medida'),    body: t('Designed around your business on our in-house component system — custom-tier looks at template speed and cost, not a cookie-cutter template.', 'Diseñado alrededor de tu negocio sobre nuestro sistema de componentes interno — aspecto a la medida a velocidad y costo de plantilla, no una plantilla genérica.') },
    { icon: 'layers', title: t('Update it yourself', 'Actualízalo tú mismo'),        body: t('A simple control panel — your own CMS — that shows only what you actually change, so you can update the site yourself without touching code or breaking the design.', 'Un panel simple — tu propio CMS — que muestra solo lo que de verdad cambias, para que actualices el sitio tú mismo sin tocar código ni romper el diseño.') },
    { icon: 'shield', title: t('Managed hosting & security', 'Hosting y seguridad administrados'), body: t('SSL, backups, and uptime handled for you. You never have to think about servers or certificates.', 'SSL, copias de seguridad y disponibilidad a cargo nuestro. Nunca tienes que pensar en servidores ni certificados.') },
    { icon: 'check',  title: t('You own everything', 'Eres dueño de todo'),        body: t('Domain, content, accounts, and logins in your name from day one. Leave anytime with all of it.', 'Dominio, contenido, cuentas y accesos a tu nombre desde el primer día. Vete cuando quieras con todo.') },
  ]

  const STEPS = [
    { title: t('Choose a package', 'Elige un paquete'), body: t('Pick a base package and add only the pieces you need. The configurator gives you a transparent, all-in number.', 'Elige un paquete base y agrega solo las piezas que necesitas. El configurador te da un número transparente y todo incluido.') },
    { title: t('We design & build', 'Diseñamos y construimos'), body: t('We build your site on our component system, sized to your business and ready for your content.', 'Construimos tu sitio sobre nuestro sistema de componentes, a la medida de tu negocio y listo para tu contenido.') },
    { title: t('We set it up & explain it', 'Lo configuramos y te lo explicamos'), body: t('Hosting, domain, SSL, and accounts — all configured in your name. Then we walk you through how everything works.', 'Hosting, dominio, SSL y cuentas — todo configurado a tu nombre. Luego te guiamos por cómo funciona todo.') },
    { title: t('We hand you the keys', 'Te entregamos las llaves'), body: t('You own the domain, content, logins, and every asset. No lock-in, and we never touch your ad spend or your money.', 'Eres dueño del dominio, contenido, accesos y cada recurso. Sin ataduras, y nunca tocamos tu gasto en anuncios ni tu dinero.') },
  ]

  const LIBRARY_PEEK = [
    { icon: 'star',   title: t('Heroes & banners', 'Portadas y banners'),   body: t('Bold openers and call-to-action banners that set the tone.', 'Aperturas llamativas y banners de llamada a la acción que marcan el tono.') },
    { icon: 'layers', title: t('Pricing & packages', 'Precios y paquetes'), body: t('Clear pricing tables and service menus — like the ones on this page.', 'Tablas de precios claras y menús de servicios — como los de esta página.') },
    { icon: 'map',    title: t('Galleries & FAQs', 'Galerías y preguntas frecuentes'),   body: t('Project galleries, testimonials, and accessible FAQ accordions.', 'Galerías de proyectos, testimonios y acordeones de preguntas frecuentes accesibles.') },
    { icon: 'mail',   title: t('Contact & forms', 'Contacto y formularios'),    body: t('Inquiry forms and hours/location blocks that route straight to you.', 'Formularios de contacto y bloques de horarios/ubicación que te llegan directo a ti.') },
  ]

  return (
    <>
      <HeroSection
        eyebrow={t('Digital business solutions · English & Español', 'Soluciones digitales para tu negocio · English & Español')}
        headline={t(
          <>Everything your business needs to look real online — <span className="gs-hl-em">and you own</span> <span className="gs-hl-gold">all of it.</span></>,
          <>Todo lo que tu negocio necesita para verse real en línea — <span className="gs-hl-em">y todo</span> <span className="gs-hl-gold">es tuyo.</span></>,
        )}
        subtext={t(
          'Websites, studio-quality product images, and the business setup around them — email, phone, profiles — built for small businesses, priced flat, and put in your name. If you ever leave, you take every piece with you.',
          'Sitios web, imágenes de producto con calidad de estudio y toda la preparación del negocio alrededor — correo, teléfono, perfiles — hechos para pequeños negocios, con precio plano y puestos a tu nombre. Si algún día te vas, te llevas cada pieza contigo.',
        )}
        ctas={[
          { label: t('See what we do', 'Ver qué hacemos'),   href: '#services',  variant: 'solid' },
          { label: t('Build your quote', 'Arma tu cotización'), href: '/pricing', variant: 'ghost' },
        ]}
        layout="left"
      />

      {/* Contract-style fact strip under the hero (double rule + three facts) */}
      <div className="section-container gs-hero-facts">
        <span><b>Boston</b> {t('in person · everywhere else remote', 'en persona · todo lo demás remoto')}</span>
        <span><b>{t('Flat pricing,', 'Precios planos,')}</b> {t('confirmed in writing', 'confirmados por escrito')}</span>
        <span><b>{t('Proudly', 'Con orgullo,')}</b> {t('LGBTQ+ & Latino-owned', 'propiedad LGBTQ+ y latina')}</span>
      </div>

      {/* The service lines — websites are the core, no longer the whole story */}
      <Reveal>
      <section className="section section--alt gs-svc" id="services">
        <div className="section-container">
          <p className="section-eyebrow">{t('What we do', 'Qué hacemos')}</p>
          <h2 className="section-title">{t('One team for your digital presence', 'Un solo equipo para tu presencia digital')}</h2>
          <p className="section-sub">
            {t(
              'Most clients start with a website. But everything a small business needs to look established — the site, the product photos, the email, the AI phone menu — comes from the same system, the same team, and the same promise: you own it. Especially built for boutiques, makers, restaurants, and the businesses people choose with their eyes.',
              'La mayoría de los clientes empiezan con un sitio web. Pero todo lo que un pequeño negocio necesita para verse establecido — el sitio, las fotos de producto, el correo, el menú telefónico con IA — viene del mismo sistema, el mismo equipo y la misma promesa: es tuyo. Hecho especialmente para boutiques, artesanos, restaurantes y los negocios que la gente elige con los ojos.',
            )}
          </p>
          <Reveal stagger className="gs-svc__grid">
            {SERVICES.map(s => (
              <Link key={s.id} to={s.to} className="gs-svc__card">
                <span className="gs-svc__tag">{s.tag}</span>
                <h3 className="gs-svc__title">{s.title}</h3>
                <p className="gs-svc__body">{s.body}</p>
                <span className="gs-svc__foot">
                  <span className="gs-svc__price">{s.price}</span>
                  <span className="gs-svc__link">{s.linkLabel} →</span>
                </span>
              </Link>
            ))}
          </Reveal>
          {/* Mission-driven builds — nonprofits are an explicit early focus */}
          <p className="gs-note">
            {t(
              'Run a non-profit? We price mission-driven builds case by case — we\'ve waived build costs for causes we believe in, and donations always flow straight to you, never through us. ',
              '¿Diriges una organización sin fines de lucro? Los proyectos con causa los cotizamos caso por caso — hemos exonerado costos de construcción por causas en las que creemos, y las donaciones siempre fluyen directo a ti, nunca a través de nosotros. ',
            )}
            <Link to="/contact">{t('Talk to us →', 'Habla con nosotros →')}</Link>
          </p>
        </div>
      </section>
      </Reveal>

      <FeatureGrid
        expression="list"
        eyebrow={t('How websites work here', 'Cómo funcionan los sitios web aquí')}
        headline={t('Honest digital services, start to finish', 'Servicios digitales honestos, de principio a fin')}
        subtext={t('Design, hosting, security, and guidance — with one promise underneath all of it: everything we build is yours.', 'Diseño, hosting, seguridad y orientación — con una promesa debajo de todo: todo lo que construimos es tuyo.')}
        items={WHAT_WE_DO}
        columns={4}
        variant="default"
      />

      <ImageText
        eyebrow={t('Why we do it', 'Por qué lo hacemos')}
        headline={t('We built the opposite of a bad deal', 'Construimos lo opuesto a un mal trato')}
        body={t(
          'A business we know was charged $2,800 for a website they never actually owned — their leads were siphoned to competitors who paid more, and their domain, content, and profiles were held hostage. We started Guillen Solutions to do the exact opposite: honest, upfront, and yours to keep.',
          'A un negocio que conocemos le cobraron $2,800 por un sitio web que nunca fue suyo — sus clientes potenciales se desviaban a competidores que pagaban más, y su dominio, contenido y perfiles quedaron secuestrados. Empezamos Guillen Solutions para hacer exactamente lo opuesto: honesto, transparente y tuyo para conservar.',
        )}
        image="/img/sample-1.svg"
        imageAlt="Guillen Solutions"
        layout="image-right"
        cta={{ label: t('See what we build', 'Ver lo que construimos'), href: '/work', variant: 'ghost-bordered' }}
        variant="default"
      />

      {/* Where we fit — the honest comparison against every alternative */}
      <FeatureGrid
        expression="columns"
        eyebrow={t('Where we fit', 'Dónde encajamos')}
        headline={t('Between doing it yourself and paying an agency', 'Entre hacerlo tú mismo y pagarle a una agencia')}
        subtext={t('Tailored, long-term, content-managed websites that you own — the gap the alternatives leave open.', 'Sitios web a la medida, de largo plazo y gestionables que son tuyos — el hueco que las alternativas dejan abierto.')}
        items={POSITIONING}
        columns={4}
        variant="default"
      />

      <Reveal>
        <Steps
          eyebrow={t('How it works', 'Cómo funciona')}
          headline={t('From package to keys in four steps', 'Del paquete a las llaves en cuatro pasos')}
          items={STEPS}
          variant="alt"
        />
      </Reveal>

      <div id="packages">
        <PricingPlans
          eyebrow={t('Packages', 'Paquetes')}
          headline={t('Flat, all-in pricing', 'Precio plano, todo incluido')}
          subtext={`${t(
            'Three tiers, one flat first-year price covering design, hosting, and your domain — then a low yearly rate for hosting + domain renewal, billed transparently.',
            'Tres niveles, un precio plano el primer año que cubre diseño, hosting y tu dominio — luego una tarifa anual baja por hosting + renovación del dominio, facturada con transparencia.',
          )} ${PRICING_PROMISE}`}
          plans={PLANS}
          variant="default"
        />
        <div className="gs-inline-note-wrap">
          <p className="gs-note">
            {t('Each plan has its own deep dive', 'Cada plan tiene su propio recorrido a fondo')} ({' '}
            <Link to="/plans/freelance">Freelance</Link> ·{' '}
            <Link to="/plans/standard">{t('Standard', 'Estándar')}</Link> ·{' '}
            <Link to="/plans/enhanced">{t('Enhanced', 'Enhanced')}</Link> ·{' '}
            <Link to="/plans/private-hosting">{t('Private Hosting', 'Hosting Privado')}</Link>{' '}
            ) {t('and every option lives on one page at', 'y todas las opciones viven en una página en')} <Link to="/pricing">{t('full pricing & order', 'precios completos y pedido')}</Link>.
          </p>
          <p className="gs-note">{GROWTH_NOTE}</p>
        </div>
      </div>

      {/* CG product renders — the newest service line, spotlighted */}
      <ImageText
        eyebrow={t('New — CG product renders', 'Nuevo — renders de producto 3D')}
        headline={t('Product photos, without the photo studio', 'Fotos de producto, sin el estudio fotográfico')}
        body={t(
          'We build a 3D model of your product once, then render every shot you need from it — clean white-background listing images, detail crops, and staged lifestyle scenes. No samples shipped, no reshoot fees, and every extra shot is cheap because the model already exists. From $150 per product, with multi-shot packages made for small businesses — and 15% off when bundled with a website.',
          'Construimos un modelo 3D de tu producto una vez, y luego renderizamos cada toma que necesites a partir de él — imágenes de listado con fondo blanco limpio, acercamientos de detalle y escenas ambientadas. Sin enviar muestras, sin costos de repetición, y cada toma extra es económica porque el modelo ya existe. Desde $150 por producto, con paquetes de varias tomas hechos para pequeños negocios — y 15% de descuento al combinarlo con un sitio web.',
        )}
        image="/img/sample-2.svg"
        imageAlt="CG product render examples"
        layout="image-left"
        cta={{ label: t('Explore product renders', 'Explorar renders de producto'), href: '/renders', variant: 'solid' }}
        variant="default"
      />

      {/* Your custom CMS + security, one section — the run-it-yourself promise */}
      <Reveal>
        <FeatureGrid
          eyebrow={t('Run it yourself', 'Manéjalo tú mismo')}
          headline={t('Your own control panel, built around your business', 'Tu propio panel de control, hecho alrededor de tu negocio')}
          subtext={CMS_LEAD}
          items={RUN_SAFE_POINTS}
          columns={4}
          variant="alt"
        />
      </Reveal>

      {/* Found by search & AI — how we build for discoverability, honestly */}
      <Reveal>
        <FeatureGrid
          expression="list"
          eyebrow={FOUND.eyebrow}
          headline={FOUND.headline}
          subtext={FOUND.lead}
          items={FOUND.points}
          columns={4}
          variant="default"
        />
      </Reveal>

      {/* Component library snippet */}
      <section className="section section--default gs-libpeek">
        <div className="section-container">
          <p className="section-eyebrow">{t('Built-in toolkit', 'Kit de herramientas incluido')}</p>
          <h2 className="section-title">{t('Your site is built from a real component library', 'Tu sitio se construye a partir de una biblioteca de componentes real')}</h2>
          <p className="section-sub">
            {t(
              "Every Guillen Solutions site is assembled from the same tested, mobile-ready, light-and-dark component set — the one this very page uses. One theme file morphs it into completely different looks, and the library grows with every project we ship — and every new component lands in your toolkit too, free. Every client gets controlled access to all of it: your content is yours to change, while the design system keeps every page safe and consistent. That's how you get custom-tier design at near-template cost.",
              'Cada sitio de Guillen Solutions se arma con el mismo conjunto de componentes probados, listos para móvil y con modo claro y oscuro — el mismo que usa esta página. Un solo archivo de tema lo transforma en aspectos completamente distintos, y la biblioteca crece con cada proyecto que entregamos — y cada componente nuevo llega también a tu kit de herramientas, gratis. Cada cliente obtiene acceso controlado a todo: tu contenido es tuyo para cambiar, mientras el sistema de diseño mantiene cada página segura y consistente. Así obtienes diseño a la medida a un costo casi de plantilla.',
            )}
          </p>

          <div className="gs-libpeek__stat">
            <span className="gs-libpeek__num">47<sup>+</sup></span>
            <span className="gs-libpeek__stat-copy">
              <span className="gs-libpeek__stat-label">{t('components and counting', 'componentes y contando')}</span>
              <span className="gs-libpeek__stat-sub">{t('Yours to use — no code required.', 'Tuyos para usar — sin necesidad de código.')}</span>
            </span>
          </div>

          <Reveal stagger className="gs-libpeek__grid">
            {LIBRARY_PEEK.map(item => (
              <div key={item.title} className="gs-libpeek__card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </Reveal>
          <Link to="/work#library" className="gs-libpeek__cta">{t('Explore the full component library →', 'Explora la biblioteca de componentes completa →')}</Link>
        </div>
      </section>

      {/* The promise — the written-contract band (interactive: hoverable
          clauses stagger in, the exit clause links to the ownership guide). */}
      <PromiseContract
        eyebrow={t('The promise', 'La promesa')}
        headline={t(
          <>Ownership isn't a feature you pay extra for. <em>It's the default.</em></>,
          <>Ser dueño no es una función por la que pagas extra. <em>Es lo predeterminado.</em></>,
        )}
        frameLabel={t('In writing — before you sign', 'Por escrito — antes de firmar')}
        clauses={[
          ...OWNERSHIP.slice(0, 2).map(text => ({ text })),
          { text: OWNERSHIP[2], href: '/guides/do-you-own-your-website' },
          ...OWNERSHIP.slice(3).map(text => ({ text })),
        ]}
        signature={{
          name: 'Guillen Solutions',
          sub: t('Every number confirmed in writing · English & Español', 'Cada número confirmado por escrito · English & Español'),
        }}
        stamp={t('NO LOCK-IN', 'SIN ATADURAS')}
        cta={{ label: t('Build your quote', 'Arma tu cotización'), href: '/pricing#order' }}
      />

      {/* Where we are now — honest about being a new, owner-run studio */}
      <Reveal>
        <FeatureGrid
          expression="columns"
          eyebrow={WHERE_WE_ARE.eyebrow}
          headline={WHERE_WE_ARE.headline}
          subtext={WHERE_WE_ARE.lead}
          items={WHERE_WE_ARE.points}
          columns={3}
          variant="default"
        />
      </Reveal>

      {/* Referral commission — open to anyone, not just clients */}
      <Reveal>
      <section className="section section--default gs-refer">
        <div className="section-container">
          <p className="section-eyebrow">{REFERRAL_PROGRAM.eyebrow}</p>
          <h2 className="section-title">{REFERRAL_PROGRAM.headline}</h2>
          <p className="section-sub">{REFERRAL_PROGRAM.lead}</p>
          <Reveal stagger className="gs-refer__steps">
            {REFERRAL_PROGRAM.steps.map((s, i) => (
              <div key={s.title} className="gs-refer__step">
                <span className="gs-refer__num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </Reveal>
          <p className="gs-refer__fine">{REFERRAL_PROGRAM.fine}</p>
        </div>
      </section>
      </Reveal>

      {/* Primary markets — LocationGrid from the shared library; images are
          CMS-owned (uploaded via a locationGrid block), not hardcoded here. */}
      <Reveal>
        <LocationGrid
          eyebrow={t('Where we work', 'Dónde trabajamos')}
          headline={t('Markets we serve', 'Mercados que servimos')}
          subtext={t(
            'The areas we focus on, with the local neighborhoods and towns covered in each. Boston in person; everywhere else, remotely — in English or Español.',
            'Las zonas en las que nos enfocamos, con los vecindarios y pueblos que cubrimos en cada una. Boston en persona; todo lo demás, de forma remota — en inglés o español.',
          )}
          serveLabel={t('Areas we serve', 'Áreas que servimos')}
          columns={4}
          variant="alt"
          locations={MARKETS.map(m => ({ ...m, image: marketImages[m.id] }))}
        />
      </Reveal>

      <section className="section section--accent gs-home-cta">
        <div className="section-container">
          <p className="section-eyebrow">{t('Ready?', '¿Listo?')}</p>
          <h2 className="section-title">{t("Let's get your business online — the honest way.", 'Pongamos tu negocio en línea — de la forma honesta.')}</h2>
          <p className="section-sub">
            {t(
              "Build a quote in a minute, or reach out and we'll talk it through. Boston in person, everywhere else remote. English or Español.",
              'Arma una cotización en un minuto, o contáctanos y lo conversamos. Boston en persona, todo lo demás remoto. En inglés o español.',
            )}
          </p>
          <div className="gs-home-cta__actions">
            <Link className="gs-btn-solid" to="/pricing">{t('Build your quote', 'Arma tu cotización')}</Link>
            <a className="gs-btn-ghost" href={`mailto:${CONTACT_EMAIL}`}>{t('Get in touch', 'Contáctanos')}</a>
          </div>
        </div>
      </section>
    </>
  )
}
