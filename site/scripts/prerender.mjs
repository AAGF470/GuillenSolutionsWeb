// ---------------------------------------------------------------------------
// prerender.mjs — static compatibility layer for the SPA.
//
// Runs after `vite build`. For each marketing route it bakes real HTML into
// the built shell: per-route <title>/meta/canonical/OG, the JSON-LD schema,
// and a readable content fallback (headings, prices, links) inside #root.
//
// Why: a client-rendered SPA returns an empty shell to any reader that doesn't
// execute JS — search crawlers' first pass, and the AI assistants buyers use to
// vet vendors. This makes the content + structured data visible in the raw HTML.
// In a real browser, createRoot() replaces the fallback with the live app.
//
// Content is DERIVED from the same data.js / schema.js the app uses, so it can't
// drift from the pages. nginx (try_files $uri $uri/ /index.html) serves the
// per-route index.html files this writes.
// ---------------------------------------------------------------------------
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerender, esc, list } from './prerender-core.mjs'
import {
  PACKAGES, SERVICES, ADDONS, ON_DEMAND, FAQS, FOUND, PARA_LATINOS,
  CG_RENDER_TIERS, CG_RENDER_SHOTS, CG_RENDER_PACKAGES, CONTACT_EMAIL,
  LOCATION_GUIDES, MARKETS, CONTACT,
} from '../src/data.js'
// Whole-module views for the Spanish mirror: ES overrides on the EN base, the
// same merge useContent() does at runtime, so nothing can drift between them.
import * as EN_ALL from '../src/data.js'
import * as ES_ALL from '../src/content.es.js'
import { ES_LANDINGS } from '../src/esLanding.js'
import { INDUSTRY_PAGES } from '../src/industryPages.js'
import { ORG, homeSchema, pricingSchema, rendersSchema, locationGuideSchema } from '../src/schema.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE = 'https://guillensolutions.com'
const NAME = 'Guillen Solutions'

// ── shared chrome (crawlable link graph) ─────────────────────────────────────
const NAV = [
  ['/', 'Home'], ['/work/', 'Work & Library'],
  ['/plans/freelance/', 'Freelance plan'], ['/plans/standard/', 'Standard plan'],
  ['/plans/enhanced/', 'Online Business Enhanced'], ['/plans/private-hosting/', 'Private Hosting plan'],
  ['/renders/', 'CG product renders'],
  ['/on-demand/', 'On-demand services'], ['/pricing/', 'Full pricing & order'],
  ['/guides/', 'Guides'], ['/status/', 'Status & updates'], ['/contact/', 'Contact'],
]
// Chrome is per-language: the Spanish pages must link to Spanish pages, or the
// /es cluster leaks all of its internal link equity back into English.
const chrome = (p = '') => {
  const es = p === '/es'
  const nav = NAV.map(([h, l]) => `<a href="${p}${h}">${l}</a>`).join('')
  const header = `<header><a href="${p || '/'}">Guillen Solutions</a><nav>${nav}</nav><a href="${p}/pricing/">${es ? 'Arma tu cotización' : 'Build your quote'}</a></header>`
  const blurb = es
    ? 'Servicios digitales honestos y transparentes para pequeños negocios — sitios web, renders de producto y toda la preparación alrededor. Eres dueño de tu dominio, tu contenido, tus cuentas y cada acceso — sin ataduras, nunca.'
    : 'Honest, upfront digital services for small businesses — websites, product renders, and the setup around them. You own your domain, your content, your accounts, and every login — no lock-in, ever.'
  const footer = `<footer><p>${blurb}</p><nav>${nav}</nav><p>${es ? 'Atendemos' : 'Serving'}: ${
    LOCATION_GUIDES.map(g => `<a href="${p}/guides/${g.slug}/">${esc(g.city)}</a>`).join(' · ')
  }</p>${!es ? `<p>Websites for: ${INDUSTRY_PAGES.map(P => `<a href="/${P.slug}/">${esc(P.industry)}</a>`).join(' · ')}</p>` : ''}${es ? `<p>Páginas web por zona: ${ES_LANDINGS.map(L => `<a href="/es/${L.slug}/">${esc(L.shortCity)}</a>`).join(' · ')}</p>` : ''}<p>${es ? 'Contáctanos' : 'Get in touch'}: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> · <a href="https://www.facebook.com/profile.php?id=61591594841523">Facebook</a> · <a href="https://www.instagram.com/guillensolutions/">Instagram</a> · English &amp; Español</p><p>© ${new Date().getFullYear()} ${NAME}</p></footer>`
  return { header, footer }
}
const { header, footer } = chrome('')
const ES_CHROME = chrome('/es')

const wrap = (h1, sub, inner) =>
  `${header}<main><h1>${esc(h1)}</h1><p>${esc(sub)}</p>${inner}</main>${footer}`

// ── per-route bodies (real content, derived from data) ───────────────────────
const planLine = p => `<strong>${esc(p.name)}</strong> — ${esc(p.price)} ${esc(p.period)}${p.tbd ? ' (in development)' : ` (then $${p.recurring}/yr)`}. ${esc(p.description)} <a href="/plans/${p.id}/">Details</a>`

const bodies = {
  home: wrap(
    'Everything your business needs to look real online — and you own all of it.',
    'Websites, studio-quality product images, and the business setup around them — built for small businesses, priced flat, and put in your name.',
    `<h2>What we do</h2>${list(SERVICES.map(s => `<strong>${esc(s.title)}</strong> (${esc(s.price)}) — ${esc(s.body)} <a href="${s.to}">${esc(s.linkLabel)}</a>`))}
     <h2>Website plans</h2>${list(PACKAGES.map(planLine))}
     <h2>${esc(FOUND.headline)}</h2><p>${esc(FOUND.lead)}</p>${list(FOUND.points.map(p => `<strong>${esc(p.title)}</strong> — ${esc(p.body)}`))}
     <h2 lang="es">${esc(PARA_LATINOS.headline)}</h2><p>${esc(PARA_LATINOS.subhead)}</p><p>${esc(PARA_LATINOS.lead)}</p>${list(PARA_LATINOS.points.map(p => `<strong>${esc(p.title)}</strong> — ${esc(p.body)}`))}
     <p><a href="/pricing/">Build your quote</a></p>`,
  ),
  work: wrap(
    'One toolkit. Every kind of business.',
    'From a Dallas electrician to a Long Island contractor to a Boston game studio — wildly different industries, three states, three completely different looks. All built from the same 47+ component library, and all owned by the client.',
    `${list([
      '<strong>Angel Electrical Services</strong> — licensed electrician, Dallas, Texas. Trust-first site with a quote form that routes to the owner.',
      '<strong>FencingPatrol</strong> — family general contractor, Long Island, New York. Bold, bilingual, call-first.',
      '<strong>Cryark Inc</strong> — game &amp; tools studio, Boston, Massachusetts. Cinematic dark-mode site with a devlog.',
      '<strong>Northeastern Satellite Lab</strong> — student CubeSat club, Boston. Dark aerospace theme (content being filled in by the club).',
    ])}<p>One component system, any look. <a href="/work/">Explore the library</a>.</p>`,
  ),
  pricing: wrap(
    'Price it yourself, right here.',
    'Pick a plan and any add-ons for a transparent, all-in number, or estimate on-demand work for a site that\'s already live. Every figure confirmed in writing.',
    `<h2>Plans</h2>${list(PACKAGES.map(p => `${planLine(p)}${list(p.features.map(esc))}`))}
     <h2>Add-ons</h2>${list([...ADDONS, ...ON_DEMAND].map(a => `<strong>${esc(a.name)}</strong> — ${esc(a.price)}: ${esc(a.body)}`))}
     <h2>Common questions</h2>${list(FAQS.map(f => `<strong>${esc(f.q)}</strong> ${esc(f.a)}`))}`,
  ),
  renders: wrap(
    'Studio-quality product images, without the studio.',
    'We build your product in 3D once, then render every shot you need from it. Model once, render many. 15% off bundled with a website; standalone at list.',
    `<h2>Per-product base (model + first shot)</h2>${list(CG_RENDER_TIERS.map(t => `<strong>${esc(t.name)}</strong> — ${esc(t.price)} ${esc(t.per)}. ${esc(t.body)} Examples: ${esc(t.examples)}`))}
     <h2>Extra shots</h2>${list(CG_RENDER_SHOTS.map(s => `<strong>${esc(s.name)}</strong> — ${esc(s.price)} ${esc(s.per)}. ${esc(s.body)}`))}
     <h2>Packages</h2>${list(CG_RENDER_PACKAGES.map(p => `<strong>${esc(p.name)}</strong> — ${esc(p.price)}. ${esc(p.body)}`))}`,
  ),
  ondemand: wrap(
    'Nothing here needs deciding today.',
    'Services businesses add after launch, whenever they need them — fixed-scope, priced upfront.',
    list(ON_DEMAND.map(s => `<strong>${esc(s.name)}</strong> — ${esc(s.price)}: ${esc(s.body)}`)),
  ),
  guides: wrap(
    'Guides',
    'Plain-English guides to owning your business online — including web design guides for the local markets we serve.',
    `<h2>Guides by location</h2>${list(LOCATION_GUIDES.map(g => `<a href="/guides/${g.slug}/"><strong>Web design in ${esc(g.city)}, ${esc(g.state)}</strong></a> — ${esc(g.lead)}`))}`,
  ),
  contact: wrap(
    'Text us — we\'ll text right back.',
    'The fastest way to reach us is a text or a message. Based in Boston and North Houston, remote everywhere else — in English or Español.',
    `${list([
      `<strong>Text line</strong> — ${esc(CONTACT.textLine.display)} (text-first — new inquiries by text)`,
      `<strong>WhatsApp</strong> — ${esc(CONTACT.whatsapp.display)} (text-first — new inquiries by text)`,
      `<strong>Email</strong> — <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>`,
    ])}<p>New inquiries are text only — current clients get calls, and in-person visits around Boston and North Houston.</p>`,
  ),
  status: wrap(
    'What we\'re running, and what\'s new.',
    'Live status of the services we run for you, plus a running log of stack updates, new features, and announcements. Transparency is part of the deal.',
    `<h2>Service status</h2><p>Live health checks run in your browser for the website and the content/inquiry API. Your content and backups live on separate, protected storage — if a public server fails, we rebuild from clean backups in hours.</p>
     <h2>Updates &amp; announcements</h2><p>Stack and infrastructure updates, new features, and business news are logged in the open. <a href="/status/">See the latest</a>.</p>`,
  ),
}

const planBody = p => wrap(
  p.name,
  p.description,
  `<p>${esc(p.price)} ${esc(p.period)} — ${p.tbd
    ? 'pricing is being finalized; reach out if this is what you need.'
    : `then $${p.recurring}/yr for hosting + domain renewal, agreed in writing.`}</p>${list(p.features.map(esc))}<p><a href="/pricing/#order">Build your quote</a></p>`,
)

// Local-market guide — real, indexable service-area content per market.
const guideBody = g => {
  const areas = MARKETS.find(m => m.id === g.marketId)?.areas ?? []
  return wrap(
    g.metaTitle,
    g.lead,
    `${g.intro.map(p => `<p>${esc(p)}</p>`).join('')}
     <h2>Areas we serve in ${esc(g.city)}</h2>${list(areas.map(esc))}
     <h2>${esc(g.whyTitle)}</h2>${list(g.why.map(esc))}
     <h2>What we build for ${esc(g.city)} businesses</h2>${list(SERVICES.map(s => `<strong>${esc(s.title)}</strong> (${esc(s.price)}) — ${esc(s.body)} <a href="${s.to}">${esc(s.linkLabel)}</a>`))}
     <h2>Questions · ${esc(g.city)}</h2>${list(g.faq.map(f => `<strong>${esc(f.q)}</strong> ${esc(f.a)}`))}
     <p><a href="/pricing/#order">Build your quote</a></p>`,
  )
}

// ── route manifest ───────────────────────────────────────────────────────────
const ROUTES = [
  { path: '/', title: 'Digital Business Solutions You Own', description: 'Websites, CG product renders, and business setup for small businesses — flat all-in pricing, and you own everything: domain, content, images, every login. English & Español.', schema: homeSchema, body: bodies.home },
  { path: '/work', title: 'Our Work & Component Library', description: 'Three states, three industries, one 47+ component system — client sites for an electrician, a contractor, and a game studio, plus the live toolkit they were built from.', schema: [ORG], body: bodies.work },
  { path: '/pricing', title: 'Pricing & Order', description: 'Build your order: pick a plan and add-ons for an all-in number, or estimate on-demand work for a live site. Every figure confirmed in writing.', schema: pricingSchema, body: bodies.pricing },
  { path: '/renders', title: 'CG Product Renders', description: 'Studio-quality 3D product images for e-commerce — model once, render many. Complexity-tiered per product, cheap extra shots, affordable multi-shot packages. Bundle with a website or order standalone.', schema: rendersSchema, body: bodies.renders },
  { path: '/on-demand', title: 'On-Demand Services', description: 'Services you add after launch, whenever you need them — newsletter setup, landing pages, QR menus, seasonal refreshes, translations. Fixed-scope, quoted in writing.', schema: [ORG], body: bodies.ondemand },
  { path: '/guides', title: 'Guides', description: 'Plain-English guides to owning your business online — from Guillen Solutions.', schema: [ORG], body: bodies.guides },
  { path: '/status', title: 'Status & Updates', description: 'Live service status and a running log of stack updates, new features, and announcements from Guillen Solutions — see us at work.', schema: [ORG], body: bodies.status },
  { path: '/contact', title: 'Contact', description: 'Reach Guillen Solutions — text us (text-first — new inquiries by text), message us on WhatsApp, or email. Based in Boston and North Houston, remote everywhere else. English or Español.', schema: [ORG], body: bodies.contact },
  ...PACKAGES.map(p => ({
    path: `/plans/${p.id}`, title: p.name, description: p.description, schema: [ORG], body: planBody(p),
  })),
  ...LOCATION_GUIDES.map(g => ({
    path: `/guides/${g.slug}`, title: g.metaTitle, description: g.metaDescription,
    schema: locationGuideSchema(g), body: guideBody(g),
  })),
]

// ── Spanish mirror (/es/…) ───────────────────────────────────────────────────
// Until now the Spanish site existed ONLY client-side (a toggle over the same
// English URL), so Google had nothing Spanish to index and the site couldn't
// rank for a single Spanish query. These are real, prerendered Spanish pages at
// their own URLs, paired to the English ones with reciprocal hreflang.
// Content comes from the same content.es.js the app uses — no new translations.
const ES = { ...EN_ALL, ...ES_ALL }
const esWrap = (h1, sub, inner) =>
  `${ES_CHROME.header}<main><h1>${esc(h1)}</h1><p>${esc(sub)}</p>${inner}</main>${ES_CHROME.footer}`
const esPlanLine = p => `<strong>${esc(p.name)}</strong> — ${esc(p.price)} ${esc(p.period)}${p.tbd ? ' (en desarrollo)' : ` (después $${p.recurring}/año)`}. ${esc(p.description)} <a href="/es/plans/${p.id}/">Detalles</a>`

const esBodies = {
  home: esWrap(
    'Todo lo que tu negocio necesita para verse real en línea — y todo es tuyo.',
    'Sitios web, imágenes de producto con calidad de estudio y toda la preparación del negocio alrededor — hechos para pequeños negocios, con precio plano y puestos a tu nombre.',
    `<h2>Qué hacemos</h2>${list(ES.SERVICES.map(s => `<strong>${esc(s.title)}</strong> (${esc(s.price)}) — ${esc(s.body)} <a href="/es${s.to}">${esc(s.linkLabel)}</a>`))}
     <h2>Planes de sitio web</h2>${list(ES.PACKAGES.map(esPlanLine))}
     <h2>${esc(ES.FOUND.headline)}</h2><p>${esc(ES.FOUND.lead)}</p>${list(ES.FOUND.points.map(p => `<strong>${esc(p.title)}</strong> — ${esc(p.body)}`))}
     <h2>${esc(ES.PARA_LATINOS.headline)}</h2><p>${esc(ES.PARA_LATINOS.subhead)}</p><p>${esc(ES.PARA_LATINOS.lead)}</p>${list(ES.PARA_LATINOS.points.map(p => `<strong>${esc(p.title)}</strong> — ${esc(p.body)}`))}
     <p><a href="/es/pricing/">Arma tu cotización</a></p>`,
  ),
  pricing: esWrap(
    'Calcula el precio tú mismo, aquí mismo.',
    'Elige un plan y los complementos que necesites para un número transparente y todo incluido. Cada cifra confirmada por escrito.',
    `<h2>Planes</h2>${list(ES.PACKAGES.map(p => `${esPlanLine(p)}${list(p.features.map(esc))}`))}
     <h2>Complementos</h2>${list([...ES.ADDONS, ...ES.ON_DEMAND].map(a => `<strong>${esc(a.name)}</strong> — ${esc(a.price)}: ${esc(a.body)}`))}
     <h2>Preguntas frecuentes</h2>${list(ES.FAQS.map(f => `<strong>${esc(f.q)}</strong> ${esc(f.a)}`))}`,
  ),
  renders: esWrap(
    'Imágenes de producto con calidad de estudio, sin el estudio.',
    'Construimos tu producto en 3D una vez y luego renderizamos todas las tomas que necesites. Modela una vez, renderiza muchas.',
    `<h2>Base por producto (modelo + primera toma)</h2>${list(ES.CG_RENDER_TIERS.map(t => `<strong>${esc(t.name)}</strong> — ${esc(t.price)} ${esc(t.per)}. ${esc(t.body)}`))}
     <h2>Tomas adicionales</h2>${list(ES.CG_RENDER_SHOTS.map(s => `<strong>${esc(s.name)}</strong> — ${esc(s.price)} ${esc(s.per)}. ${esc(s.body)}`))}
     <h2>Paquetes</h2>${list(ES.CG_RENDER_PACKAGES.map(p => `<strong>${esc(p.name)}</strong> — ${esc(p.price)}. ${esc(p.body)}`))}`,
  ),
  ondemand: esWrap(
    'Nada de esto hay que decidirlo hoy.',
    'Servicios que los negocios agregan después del lanzamiento, cuando los necesitan — alcance fijo, precio por adelantado.',
    list(ES.ON_DEMAND.map(s => `<strong>${esc(s.name)}</strong> — ${esc(s.price)}: ${esc(s.body)}`)),
  ),
  work: esWrap(
    'Un solo kit de herramientas. Todo tipo de negocio.',
    'De un electricista en Dallas a un contratista en Long Island y un estudio de videojuegos en Boston — industrias muy distintas, tres estados, tres estilos completamente diferentes. Todo construido con la misma biblioteca de 47+ componentes, y todo propiedad del cliente.',
    `<p>Un sistema de componentes, cualquier estilo. <a href="/es/work/">Explora la biblioteca</a>.</p>`,
  ),
  guides: esWrap(
    'Guías',
    'Guías en español claro para ser dueño de tu negocio en línea — incluyendo guías de diseño web para los mercados locales que atendemos.',
    `<h2>Guías por ubicación</h2>${list(ES.LOCATION_GUIDES.map(g => `<a href="/es/guides/${g.slug}/"><strong>Diseño web en ${esc(g.city)}, ${esc(g.state)}</strong></a> — ${esc(g.lead)}`))}`,
  ),
  contact: esWrap(
    'Escríbenos — te respondemos por mensaje.',
    'La forma más rápida de contactarnos es un mensaje de texto o WhatsApp. Con base en Boston y el norte de Houston, remoto en todas partes — en español o inglés.',
    `${list([
      `<strong>Línea de texto</strong> — ${esc(CONTACT.textLine.display)}`,
      `<strong>WhatsApp</strong> — ${esc(CONTACT.whatsapp.display)}`,
      `<strong>Correo</strong> — <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>`,
    ])}<p>Las consultas nuevas son por mensaje; los clientes actuales reciben llamadas y visitas en persona por Boston y el norte de Houston.</p>`,
  ),
  status: esWrap(
    'Qué tenemos funcionando y qué hay de nuevo.',
    'Estado en vivo de los servicios que operamos para ti, más un registro de actualizaciones y anuncios. La transparencia es parte del trato.',
    `<h2>Estado del servicio</h2><p>Las verificaciones de salud corren en vivo en tu navegador para el sitio y la API de contenido. Tu contenido y respaldos viven en almacenamiento separado y protegido.</p>`,
  ),
}

const esPlanBody = p => esWrap(
  p.name,
  p.description,
  `<p>${esc(p.price)} ${esc(p.period)} — ${p.tbd
    ? 'el precio se está finalizando; contáctanos si esto es lo que necesitas.'
    : `después $${p.recurring}/año por hosting + renovación del dominio, acordado por escrito.`}</p>${list(p.features.map(esc))}<p><a href="/es/pricing/#order">Arma tu cotización</a></p>`,
)

const esGuideBody = g => {
  const areas = ES.MARKETS.find(m => m.id === g.marketId)?.areas ?? []
  return esWrap(
    g.metaTitle,
    g.lead,
    `${g.intro.map(p => `<p>${esc(p)}</p>`).join('')}
     <h2>Zonas que atendemos en ${esc(g.city)}</h2>${list(areas.map(esc))}
     <h2>${esc(g.whyTitle)}</h2>${list(g.why.map(esc))}
     <h2>Qué construimos para negocios de ${esc(g.city)}</h2>${list(ES.SERVICES.map(s => `<strong>${esc(s.title)}</strong> (${esc(s.price)}) — ${esc(s.body)} <a href="/es${s.to}">${esc(s.linkLabel)}</a>`))}
     <h2>Preguntas · ${esc(g.city)}</h2>${list(g.faq.map(f => `<strong>${esc(f.q)}</strong> ${esc(f.a)}`))}
     <p><a href="/es/pricing/#order">Arma tu cotización</a></p>`,
  )
}

// Every ES route declares lang + its English counterpart, so prerender-core can
// emit reciprocal hreflang on both sides of each pair.
const ES_ROUTES = [
  { path: '/es', pair: '/', title: 'Soluciones Digitales Para Tu Negocio — Y Todo Es Tuyo', description: 'Sitios web, renders de producto 3D y la preparación del negocio para pequeños negocios — precio plano, y eres dueño de todo: dominio, contenido, imágenes y cada acceso. Hablamos español.', schema: homeSchema, body: esBodies.home },
  { path: '/es/work', pair: '/work', title: 'Nuestro Trabajo y Biblioteca de Componentes', description: 'Tres estados, tres industrias, un sistema de 47+ componentes — sitios para un electricista, un contratista y un estudio de videojuegos.', schema: [ORG], body: esBodies.work },
  { path: '/es/pricing', pair: '/pricing', title: 'Precios y Pedido', description: 'Arma tu pedido: elige un plan y complementos para un número todo incluido. Cada cifra confirmada por escrito.', schema: pricingSchema, body: esBodies.pricing },
  { path: '/es/renders', pair: '/renders', title: 'Renders de Producto 3D', description: 'Imágenes de producto con calidad de estudio para e-commerce — modela una vez, renderiza muchas. Desde $150 por producto.', schema: rendersSchema, body: esBodies.renders },
  { path: '/es/on-demand', pair: '/on-demand', title: 'Servicios a Pedido', description: 'Servicios que agregas después del lanzamiento, cuando los necesites — páginas de aterrizaje, menús QR, traducciones. Alcance fijo, cotizado por escrito.', schema: [ORG], body: esBodies.ondemand },
  { path: '/es/guides', pair: '/guides', title: 'Guías', description: 'Guías en español claro para ser dueño de tu negocio en línea — de Guillen Solutions.', schema: [ORG], body: esBodies.guides },
  { path: '/es/status', pair: '/status', title: 'Estado y Actualizaciones', description: 'Estado en vivo de los servicios y un registro de actualizaciones y anuncios de Guillen Solutions.', schema: [ORG], body: esBodies.status },
  { path: '/es/contact', pair: '/contact', title: 'Contacto', description: 'Contacta a Guillen Solutions — escríbenos por texto o WhatsApp, o por correo. Boston y el norte de Houston, remoto en todas partes. En español o inglés.', schema: [ORG], body: esBodies.contact },
  ...ES.PACKAGES.map(p => ({
    path: `/es/plans/${p.id}`, pair: `/plans/${p.id}`, title: p.name, description: p.description, schema: [ORG], body: esPlanBody(p),
  })),
  ...ES.LOCATION_GUIDES.map(g => ({
    path: `/es/guides/${g.slug}`, pair: `/guides/${g.slug}`, title: g.metaTitle, description: g.metaDescription,
    schema: locationGuideSchema(g), body: esGuideBody(g),
  })),
].map(r => ({ ...r, lang: 'es' }))

// Spanish-FIRST landing pages: written for how Hispanic owners search and
// ordered trust-first. Spanish-only, so they carry NO `pair` — claiming an
// hreflang counterpart that doesn't exist would point Google at a 404.
const esLandingBody = L => esWrap(
  L.h1,
  L.lead,
  `<h2>${esc(L.trust.title)}</h2><p>${esc(L.searchNote || '')}</p>${list(L.trust.points.map(p => `<strong>${esc(p.title)}</strong> — ${esc(p.body)}`))}
   <h2>${esc(ES.REFERRAL_PROGRAM.headline)}</h2><p>${esc(ES.REFERRAL_PROGRAM.lead)}</p>${list(ES.REFERRAL_PROGRAM.steps.map(st => `<strong>${esc(st.title)}</strong> — ${esc(st.body)}`))}
   <h2>${esc(L.industries.title)}</h2><p>${esc(L.industries.body)}</p>${list(L.industries.items.map(esc))}
   <h2>Zonas que atendemos</h2>${list(L.areas.map(esc))}<p>${esc(L.localNote)}</p>
   <h2>Lo que hacemos</h2>${list(ES.SERVICES.map(sv => `<strong>${esc(sv.title)}</strong> (${esc(sv.price)}) — ${esc(sv.body)}`))}
   <h2>Preguntas de dueños en ${esc(L.city)}</h2>${list(L.faq.map(f => `<strong>${esc(f.q)}</strong> ${esc(f.a)}`))}
   <p><a href="/es/pricing/">Ver precios</a> · <a href="/es/contact/">Contáctanos</a></p>`,
)

const ES_LANDING_ROUTES = ES_LANDINGS.map(L => ({
  path: `/es/${L.slug}`,
  lang: 'es',
  title: L.metaTitle,
  description: L.metaDescription,
  schema: [{
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: NAME,
    url: `${SITE}/es/${L.slug}/`,
    description: L.metaDescription,
    inLanguage: 'es',
    knowsLanguage: ['es', 'en'],
    areaServed: L.areas.filter(a => !a.startsWith('y ')).map(a => ({ '@type': 'City', name: a })),
    priceRange: '$600–$1,900 primer año',
    email: CONTACT_EMAIL,
  }],
  body: esLandingBody(L),
}))

// Industry long-tail pages (English-only → no `pair`, no hreflang).
const industryBody = P => wrap(
  P.h1,
  P.lead,
  `<h2>${esc(P.proof.title)}</h2><p>${esc(P.proof.body)}</p><p><a href="${P.proof.linkTo}">${esc(P.proof.linkLabel)}</a></p>
   <h2>${esc(P.needs.title)}</h2>${list(P.needs.items.map(i => `<strong>${esc(i.title)}</strong> — ${esc(i.body)}`))}
   <p>${esc(P.marketsLine)}</p>
   <h2>Questions from ${esc(P.industry)}</h2>${list(P.faq.map(f => `<strong>${esc(f.q)}</strong> ${esc(f.a)}`))}
   <p><a href="/pricing/">Build your quote</a></p>`,
)

const INDUSTRY_ROUTES = INDUSTRY_PAGES.map(P => ({
  path: `/${P.slug}`,
  lang: 'en',
  title: P.metaTitle,
  description: P.metaDescription,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: `Website design for ${P.industry}`,
      name: P.metaTitle,
      url: `${SITE}/${P.slug}/`,
      description: P.metaDescription,
      provider: { '@type': 'ProfessionalService', name: NAME, url: `${SITE}/` },
      areaServed: ['Boston, MA', 'North Houston, TX', 'Dallas, TX', 'New York, NY'].map(n => ({ '@type': 'City', name: n })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: P.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
  body: industryBody(P),
}))

// Pair the English routes back at their Spanish counterparts (same hreflang
// cluster, declared from both sides as Google requires).
const EN_ROUTES = ROUTES.map(r => {
  const es = ES_ROUTES.find(e => e.pair === r.path)
  return es ? { ...r, lang: 'en', pair: es.path } : { ...r, lang: 'en' }
})

// ── render + sitemap via the generic harness ─────────────────────────────────
prerender({
  dist: DIST,
  site: SITE,
  name: NAME,
  routes: [...EN_ROUTES, ...ES_ROUTES, ...ES_LANDING_ROUTES, ...INDUSTRY_ROUTES],
  priorityFor: path =>
    path === '/' ? '1.0'
      : path.startsWith('/plans/') ? '0.9'
      : path.startsWith('/guides/') ? '0.7'
      : path === '/guides' ? '0.6'
      : '0.7',
  changefreqFor: path => (path === '/guides' || path === '/status' ? 'weekly' : 'monthly'),
})
