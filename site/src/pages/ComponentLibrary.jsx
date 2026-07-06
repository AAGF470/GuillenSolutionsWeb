import { Link } from 'react-router-dom'
import {
  HeroSection,
  FeatureGrid,
  Steps,
  PricingPlans,
  ServiceList,
  HoursLocation,
  Gallery,
  Testimonials,
  Faq,
  ImageText,
  CtaBanner,
  ContactSection,
  NewsletterSignup,
} from '@aagf470/ui'
import { useT } from '../i18n.jsx'

// ---------------------------------------------------------------------------
// Component library — living showcase. Every section is rendered live from
// sample data inside a labeled frame. The showcase is exported standalone so
// the merged Work & Library page embeds it; it stays code-only by design
// (it's a demo, not content).
// ---------------------------------------------------------------------------

function Spec({ name, tag, desc, children }) {
  return (
    <section className="gs-spec">
      <div className="gs-spec__head">
        <h2 className="gs-spec__name">{name}</h2>
        <span className="gs-spec__tag">{tag}</span>
      </div>
      <p className="gs-spec__desc">{desc}</p>
      <div className="gs-spec__demo">{children}</div>
    </section>
  )
}

const IMG = ['/img/sample-1.svg', '/img/sample-2.svg', '/img/sample-3.svg']

// Every exported component, grouped — the compact name-grid at the end of the
// showcase. No live demos for these (the page is long enough); the specs above
// demo the workhorses.
const CATALOG = [
  { label: 'Sections', items: [
    'HeroSection', 'FeatureGrid', 'Steps', 'ImageText', 'Testimonials', 'Gallery',
    'Faq', 'PricingPlans', 'ServiceList', 'HoursLocation', 'CtaBanner',
    'ContactSection', 'Checklist', 'NewsletterSignup',
  ] },
  { label: 'Content blocks', items: [
    'TitleBlock', 'CalloutBlock', 'CodeBlock', 'ImageBlock', 'FactGrid',
    'ScreenshotGallery', 'VideoPlayer', 'SideBySide', 'ContentCards',
    'RoadmapBlock', 'ChangelogBlock', 'SystemRequirements', 'AssetGrid',
    'HierarchyBlock', 'ArchitectureBlock', 'RawDiagramBlock', 'Spacer',
  ] },
  { label: 'Showcase pieces', items: [
    'CinematicHero', 'CinematicBanner', 'FeatureSpotlight', 'LabHero',
    'EmbeddedApp', 'PricingCTA', 'PlatformBadge', 'ProductInfoBar',
    'BackgroundCanvas', 'PageLoader', 'DocLayout', 'DocSidebar',
    'Button', 'Card', 'Pill', 'SiteNav', 'SocialIcon',
  ] },
]

// The four-card value strip — how the library works for clients.
export function LibraryFacts() {
  const t = useT()
  return (
    <FeatureGrid
      eyebrow={t('How the library works for you', 'Cómo funciona la biblioteca para ti')}
      headline={t('Bigger with every project — safer for every client', 'Más grande con cada proyecto — más segura para cada cliente')}
      items={[
        { icon: 'layers', title: t('47+ and counting', '47+ y contando'),        body: t('Heroes, pricing tables, galleries, FAQs, forms, checklists — a deep, diverse toolkit that already covers most of what a business site needs.', 'Portadas, tablas de precios, galerías, preguntas frecuentes, formularios, listas de verificación — un kit profundo y variado que ya cubre casi todo lo que necesita el sitio de un negocio.') },
        { icon: 'zap',    title: t('Grows with every project', 'Crece con cada proyecto'), body: t('When a client needs something new, we build it into the library — so every site we ship makes the next one better, faster, and cheaper.', 'Cuando un cliente necesita algo nuevo, lo incorporamos a la biblioteca — así cada sitio que entregamos hace que el siguiente sea mejor, más rápido y más barato.') },
        { icon: 'shield', title: t('Controlled access', 'Acceso controlado'),        body: t('You edit your content freely; the design, layout, and device behavior are locked inside the components. You can’t break your own site.', 'Editas tu contenido con libertad; el diseño, la disposición y el comportamiento en cada dispositivo quedan bloqueados dentro de los componentes. No puedes romper tu propio sitio.') },
        { icon: 'star',   title: t('One system, any look', 'Un sistema, cualquier look'),     body: t('A single theme file restyles the whole library — the same components power a contractor, a game studio, and this very page.', 'Un solo archivo de tema reestiliza toda la biblioteca — los mismos componentes dan vida a un contratista, a un estudio de videojuegos y a esta misma página.') },
      ]}
      columns={4}
      variant="alt"
    />
  )
}

export function LibraryShowcase() {
  const t = useT()
  return (
    <div className="gs-showcase">
      <div className="gs-showcase__inner">

        <Spec name={t('Hero', 'Portada')} tag="<HeroSection />"
          desc={t('The page opener — headline, supporting line, and call-to-action buttons.', 'La apertura de la página — titular, línea de apoyo y botones de llamada a la acción.')}>
          <HeroSection
            eyebrow="Your business"
            headline="A headline that sells in one line."
            subtext="Supporting copy that explains what you do and why it matters, then points to the next step."
            ctas={[{ label: 'Primary action', href: '#', variant: 'solid' }, { label: 'Secondary', href: '#', variant: 'ghost' }]}
          />
        </Spec>

        <Spec name={t('Hero — editorial expression', 'Portada — expresión editorial')} tag='<HeroSection expression="editorial" />'
          desc={t('Same hero content, different skeleton: masthead rule, headline left, supporting copy in a right column.', 'El mismo contenido de portada, otro esqueleto: línea de cabecera, titular a la izquierda y texto de apoyo en una columna a la derecha.')}>
          <HeroSection
            expression="editorial" size="compact"
            eyebrow="Same content, new bones"
            headline="One component, several silhouettes."
            subtext="Expressions change the structure, not the content — so two sites built from the same block never share a skeleton."
            ctas={[{ label: 'Primary action', href: '#', variant: 'solid' }]}
          />
        </Spec>

        <Spec name={t('Feature grid', 'Cuadrícula de características')} tag="<FeatureGrid />"
          desc={t('A responsive grid of icon + title + text — for services, benefits, or trust signals.', 'Una cuadrícula adaptable de ícono + título + texto — para servicios, beneficios o señales de confianza.')}>
          <FeatureGrid
            eyebrow="Why us" headline="Three reasons to pick you"
            columns={3}
            items={[
              { icon: 'shield', title: 'Trustworthy', body: 'A short line explaining this benefit to your customer.' },
              { icon: 'zap',    title: 'Fast',        body: 'A short line explaining this benefit to your customer.' },
              { icon: 'star',   title: 'Proven',      body: 'A short line explaining this benefit to your customer.' },
            ]}
          />
        </Spec>

        <Spec name={t('Feature grid — list expression', 'Cuadrícula de características — expresión de lista')} tag='<FeatureGrid expression="list" />'
          desc={t('The same items as numbered editorial rows — reads like a manifesto instead of a card grid.', 'Los mismos elementos como filas editoriales numeradas — se lee como un manifiesto en lugar de una cuadrícula de tarjetas.')}>
          <FeatureGrid
            expression="list"
            eyebrow="Why us" headline="Three reasons, restated"
            items={[
              { title: 'Trustworthy', body: 'A short line explaining this benefit to your customer.' },
              { title: 'Fast',        body: 'A short line explaining this benefit to your customer.' },
              { title: 'Proven',      body: 'A short line explaining this benefit to your customer.' },
            ]}
          />
        </Spec>

        <Spec name={t('Steps', 'Pasos')} tag="<Steps />"
          desc={t('A numbered vertical process — how it works, onboarding, or your service flow.', 'Un proceso vertical numerado — cómo funciona, la incorporación o el flujo de tu servicio.')}>
          <Steps
            eyebrow="How it works" headline="Three simple steps"
            items={[
              { title: 'First', body: 'What happens at this stage, in one or two plain sentences.' },
              { title: 'Then',  body: 'What happens at this stage, in one or two plain sentences.' },
              { title: 'Done',  body: 'What happens at this stage, in one or two plain sentences.' },
            ]}
          />
        </Spec>

        <Spec name={t('Pricing / packages', 'Precios / paquetes')} tag="<PricingPlans />"
          desc={t("Package cards with a name, price, feature list, optional 'most popular' badge, and CTA.", "Tarjetas de paquete con nombre, precio, lista de características, insignia opcional de 'más popular' y llamada a la acción.")}>
          <PricingPlans
            headline="Simple pricing"
            plans={[
              { tag: 'Starter', name: 'Basic', price: '$500', period: 'one-time', description: 'For getting started.', features: ['One page', 'Hosting included', 'Yours to keep'], cta: { label: 'Choose', href: '#', variant: 'ghost-bordered' } },
              { badge: 'Most popular', tag: 'Complete', name: 'Standard', price: '$950', period: 'first year', description: 'The full setup.', features: ['Multi-page site', 'Managed hosting', 'Content editor', 'Everything is yours'], featured: true, cta: { label: 'Choose', href: '#', variant: 'solid' } },
            ]}
          />
        </Spec>

        <Spec name={t('Service list / menu', 'Lista / menú de servicios')} tag="<ServiceList />"
          desc={t('A clean menu of services with optional prices and a dotted leader — great for salons or contractors.', 'Un menú limpio de servicios con precios opcionales y una guía punteada — ideal para salones o contratistas.')}>
          <ServiceList
            headline="Services & pricing" columns={2}
            services={[
              { name: 'Service one',   description: 'Short description of what it includes', price: 'from $65' },
              { name: 'Service two',   description: 'Short description of what it includes', price: '$40' },
              { name: 'Service three', description: 'Short description of what it includes', price: '$120' },
              { name: 'Service four',  description: 'Short description of what it includes', price: 'Quote' },
            ]}
          />
        </Spec>

        <Spec name={t('Hours + location', 'Horario + ubicación')} tag="<HoursLocation />"
          desc={t('A business-hours table with address, phone, email, and an optional embedded map.', 'Una tabla de horario de atención con dirección, teléfono, correo y un mapa incrustado opcional.')}>
          <HoursLocation
            eyebrow="Come see us" headline="Hours & location"
            hours={[
              { day: 'Mon–Fri', time: '9:00 AM – 5:00 PM' },
              { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
              { day: 'Sunday', closed: true },
            ]}
            address="123 Main Street, Your Town, NY 10001"
            phone="(555) 555-0100"
            email="hello@yourbusiness.com"
          />
        </Spec>

        <Spec name={t('Gallery', 'Galería')} tag="<Gallery />"
          desc={t('A responsive image grid with hover captions — completed projects, looks, or products.', 'Una cuadrícula de imágenes adaptable con leyendas al pasar el cursor — proyectos terminados, looks o productos.')}>
          <Gallery
            eyebrow="Our work" headline="Recent projects" columns={3} aspect="4 / 3"
            images={[
              { src: IMG[0], alt: 'Sample', caption: 'Project one' },
              { src: IMG[1], alt: 'Sample', caption: 'Project two' },
              { src: IMG[2], alt: 'Sample', caption: 'Project three' },
            ]}
          />
        </Spec>

        <Spec name={t('Testimonials', 'Testimonios')} tag="<Testimonials />"
          desc={t('Client quotes with auto-generated avatar initials and attribution.', 'Citas de clientes con iniciales de avatar autogeneradas y atribución.')}>
          <Testimonials
            eyebrow="Kind words" headline="What clients say"
            items={[
              { quote: 'A genuine, specific quote from a happy customer goes right here.', author: 'Jordan P.', role: 'Owner', company: 'Local Co.' },
              { quote: 'Another short, believable testimonial that builds trust with visitors.', author: 'Sam R.', role: 'Manager', company: 'Shop Inc.' },
            ]}
          />
        </Spec>

        <Spec name={t('FAQ', 'Preguntas frecuentes')} tag="<Faq />"
          desc={t('An accessible accordion built on native details/summary — keyboard-friendly, no JavaScript required.', 'Un acordeón accesible construido sobre details/summary nativos — amigable con el teclado, sin necesidad de JavaScript.')}>
          <Faq
            eyebrow="Questions" headline="Frequently asked"
            items={[
              { q: 'A common question customers ask?', a: 'A clear, reassuring answer in one or two sentences.' },
              { q: 'Another thing people want to know?', a: 'A clear, reassuring answer in one or two sentences.' },
            ]}
          />
        </Spec>

        <Spec name={t('Image + text', 'Imagen + texto')} tag="<ImageText />"
          desc={t('A two-column split — image on one side, copy and an optional button on the other.', 'Una división en dos columnas — imagen de un lado, texto y un botón opcional del otro.')}>
          <ImageText
            eyebrow="About" headline="Tell your story"
            body="A paragraph about your business, your values, or what makes you different — paired with a supporting image."
            image={IMG[2]} imageAlt="Sample"
            cta={{ label: 'Learn more', href: '#', variant: 'ghost-bordered' }}
          />
        </Spec>

        <Spec name={t('CTA banner', 'Banner de llamada a la acción')} tag="<CtaBanner />"
          desc={t('A bold, full-width call-to-action — usually a colored section that closes the page.', 'Una llamada a la acción llamativa de ancho completo — normalmente una sección de color que cierra la página.')}>
          <CtaBanner
            eyebrow="Ready?" headline="A strong closing call to action"
            subtext="One last nudge toward the thing you want visitors to do."
            cta={{ label: 'Get started', href: '#' }}
            variant="accent"
          />
        </Spec>

        <Spec name={t('Newsletter signup', 'Suscripción al boletín')} tag="<NewsletterSignup />"
          desc={t("An email-capture band that posts straight to the client's newsletter vendor — the account stays in the client's name.", 'Una franja de captura de correos que envía directo al proveedor de boletines del cliente — la cuenta queda a nombre del cliente.')}>
          <NewsletterSignup
            eyebrow="Stay in the loop"
            headline="News, offers, and updates — straight from us"
            subtext="One short email when there's something worth knowing. No spam, unsubscribe anytime."
            action="#"
            disclaimer="Your address goes to YOUR newsletter account — never to a third party."
          />
        </Spec>

        <Spec name={t('Contact', 'Contacto')} tag="<ContactSection />"
          desc={t("Contact details beside a working inquiry form — submissions route straight to the owner's inbox.", 'Datos de contacto junto a un formulario de consulta funcional — los envíos llegan directo a la bandeja del dueño.')}>
          <ContactSection
            eyebrow="Get in touch" headline="Contact us"
            subtext="Tell us what you need and we'll get back to you."
            email="hello@yourbusiness.com" phone="(555) 555-0100"
          />
        </Spec>

        <section className="gs-catalog">
          <div className="gs-spec__head">
            <h2 className="gs-spec__name">{t('Full catalog', 'Catálogo completo')}</h2>
            <span className="gs-spec__tag">@aagf470/ui</span>
          </div>
          <p className="gs-spec__desc">
            {t('Everything the library exports, at a glance — and all of it is available in every client’s editor, from business-site sections to studio-grade showcase pieces.', 'Todo lo que exporta la biblioteca, de un vistazo — y todo está disponible en el editor de cada cliente, desde secciones para sitios de negocios hasta piezas de vitrina de nivel estudio.')}
          </p>
          {CATALOG.map(group => (
            <div className="gs-catalog__group" key={group.label}>
              <h3 className="gs-catalog__label">{group.label}</h3>
              <ul className="gs-catalog__pills">
                {group.items.map(name => (
                  <li className="gs-catalog__pill" key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <p className="gs-showcase__foot">
          {t('Want a page built from these?', '¿Quieres una página construida con estos?')} <Link to="/pricing#order">{t('Build your quote →', 'Arma tu cotización →')}</Link>
        </p>
      </div>
    </div>
  )
}
