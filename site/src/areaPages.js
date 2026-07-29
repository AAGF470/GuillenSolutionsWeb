// ---------------------------------------------------------------------------
// areaPages.js — generated hyperlocal SEO guides, one per town/neighborhood.
//
// The "borough pages" play: each area in AREAS becomes a full guide page in
// the LOCATION_GUIDES shape, so the existing machinery (GuideRoute dispatch,
// MarketGuide render, prerender, sitemap, locationGuideSchema) picks it up
// with zero extra wiring. Adding an area = adding one data entry here.
//
// Anti-doorway-page rules (Google punishes thin near-duplicates):
//   • every area carries hand-written local texture (roads, landmarks,
//     transit, a one-line "flavor" no other page has)
//   • copy rotates between template variants so pages don't read identical
//   • modest count, interlinked with the parent market guide
// Content is generated in BOTH languages; data.js appends the EN set and
// content.es.js the ES set.
// ---------------------------------------------------------------------------

const AREAS = [
  // ── North Houston, TX (home base) ──────────────────────────────────────────
  {
    slug: 'web-design-tomball', area: 'Tomball', state: 'TX', marketId: 'north-houston',
    roads: ['FM 2920', 'Kuykendahl Road', 'Tomball Parkway (SH 249)'],
    places: ['Old Town Tomball', 'Main Street', 'the Tomball German Heritage Festival'],
    flavor: {
      en: 'Tomball keeps its small-town Main Street feel while growing fast along FM 2920 and SH 249 — exactly the kind of place where a boutique, salon, or family shop wins by looking established online.',
      es: 'Tomball conserva su ambiente de pueblo en Main Street mientras crece rápido a lo largo de la FM 2920 y la SH 249 — justo el tipo de lugar donde una boutique, un salón o un negocio familiar gana viéndose establecido en línea.',
    },
  },
  {
    slug: 'web-design-spring-tx', area: 'Spring', state: 'TX', marketId: 'north-houston',
    roads: ['I-45 North', 'Cypresswood Drive', 'Louetta Road'],
    places: ['Old Town Spring', 'Spring Creek', 'the shops off Cypresswood'],
    flavor: {
      en: 'From the antique shops of Old Town Spring to the businesses lining Cypresswood and Louetta, Spring runs on word of mouth — a good website turns that reputation into customers who find you first on Google.',
      es: 'De las tiendas de antigüedades de Old Town Spring a los negocios de Cypresswood y Louetta, Spring funciona por recomendación — un buen sitio web convierte esa reputación en clientes que te encuentran primero en Google.',
    },
  },
  {
    slug: 'web-design-klein', area: 'Klein', state: 'TX', marketId: 'north-houston',
    roads: ['FM 1960', 'Louetta Road', 'Kuykendahl Road'],
    places: ['Champion Forest', 'the Klein ISD community', 'the FM 1960 corridor'],
    flavor: {
      en: 'Klein is neighborhoods first — Champion Forest, the Klein ISD community, the busy FM 1960 corridor — and its businesses live or die on being findable by the families right around them.',
      es: 'Klein es primero vecindarios — Champion Forest, la comunidad de Klein ISD, el activo corredor de la FM 1960 — y sus negocios viven de ser encontrados por las familias que los rodean.',
    },
  },
  {
    slug: 'web-design-the-woodlands', area: 'The Woodlands', state: 'TX', marketId: 'north-houston',
    roads: ['I-45', 'the Grand Parkway (SH 99)', 'Woodlands Parkway'],
    places: ['Market Street', 'The Woodlands Waterway', 'Hughes Landing'],
    flavor: {
      en: 'Between Market Street, the Waterway, and Hughes Landing, The Woodlands sets a high visual bar — customers here expect a business to look as polished online as the town does in person.',
      es: 'Entre Market Street, el Waterway y Hughes Landing, The Woodlands pone la vara visual alta — aquí los clientes esperan que un negocio se vea tan pulido en línea como se ve el lugar en persona.',
    },
  },
  {
    slug: 'web-design-conroe', area: 'Conroe', state: 'TX', marketId: 'north-houston',
    roads: ['I-45 North', 'Loop 336', 'FM 3083'],
    places: ['downtown Conroe', 'Lake Conroe', 'the Montgomery County courthouse square'],
    flavor: {
      en: 'Conroe is the seat of one of the fastest-growing counties in Texas — from the courthouse square downtown to the businesses serving Lake Conroe, new customers are arriving every month and searching online first.',
      es: 'Conroe es la sede de uno de los condados de más rápido crecimiento en Texas — de la plaza del tribunal en el centro a los negocios que sirven al Lago Conroe, cada mes llegan clientes nuevos que buscan primero en línea.',
    },
  },
  // ── Boston, MA (home base) ─────────────────────────────────────────────────
  {
    slug: 'web-design-roxbury', area: 'Roxbury', state: 'MA', marketId: 'boston',
    roads: ['Malcolm X Boulevard', 'Blue Hill Avenue', 'Warren Street'],
    places: ['Nubian Square', 'the Orange Line', 'Roxbury Community College'],
    flavor: {
      en: 'Roxbury’s small businesses — from Nubian Square to Blue Hill Ave — carry deep community roots, and many serve customers in two languages. That’s exactly how we build: bilingual, owned by you, priced flat.',
      es: 'Los pequeños negocios de Roxbury — de Nubian Square a Blue Hill Ave — tienen raíces comunitarias profundas, y muchos atienden en dos idiomas. Así construimos nosotros: bilingüe, tuyo, con precio plano.',
    },
  },
  {
    slug: 'web-design-south-end', area: 'South End', state: 'MA', marketId: 'boston',
    roads: ['Tremont Street', 'Washington Street', 'Columbus Avenue'],
    places: ['SoWa Open Market', 'the Orange Line', 'the Tremont Street restaurant row'],
    flavor: {
      en: 'The South End is boutique-and-restaurant Boston at its densest — SoWa makers, Tremont Street dining, corner studios — where a beautiful website is table stakes and a slow, templated one costs bookings.',
      es: 'El South End es el Boston de boutiques y restaurantes en su punto más denso — los makers de SoWa, los restaurantes de Tremont Street — donde un sitio web hermoso es lo mínimo y uno lento y de plantilla cuesta reservas.',
    },
  },
  {
    slug: 'web-design-seaport', area: 'Seaport', state: 'MA', marketId: 'boston',
    roads: ['Seaport Boulevard', 'Congress Street', 'Northern Avenue'],
    places: ['Fan Pier', 'the Silver Line', 'the Seaport innovation district'],
    flavor: {
      en: 'The Seaport moves fast — startups, showrooms, and waterfront restaurants along Seaport Boulevard — and businesses here are judged on digital polish before anyone walks through the door.',
      es: 'El Seaport se mueve rápido — startups, showrooms y restaurantes frente al agua en Seaport Boulevard — y aquí a los negocios se les juzga por su presencia digital antes de que alguien cruce la puerta.',
    },
  },
  {
    slug: 'web-design-west-roxbury', area: 'West Roxbury', state: 'MA', marketId: 'boston',
    roads: ['Centre Street', 'VFW Parkway', 'Washington Street'],
    places: ['the Centre Street business district', 'Millennium Park', 'the Needham commuter rail line'],
    flavor: {
      en: 'West Roxbury is main-street Boston — family practices, trades, and shops along Centre Street that win on trust. A clear, honest website with your services and real reviews fits how this neighborhood already does business.',
      es: 'West Roxbury es el Boston de calle principal — consultorios familiares, oficios y tiendas en Centre Street que ganan por confianza. Un sitio claro y honesto con tus servicios encaja con cómo este vecindario ya hace negocios.',
    },
  },
  {
    slug: 'web-design-downtown-boston', area: 'Downtown Boston', state: 'MA', marketId: 'boston',
    roads: ['Washington Street', 'Tremont Street', 'Summer Street'],
    places: ['Downtown Crossing', 'Faneuil Hall', 'Park Street on the Red and Green Lines'],
    flavor: {
      en: 'Downtown Crossing to Faneuil Hall is the highest-foot-traffic retail in New England — and the businesses that thrive pair that sidewalk traffic with a site that captures the customer who googles before visiting.',
      es: 'De Downtown Crossing a Faneuil Hall está el comercio con más tráfico peatonal de Nueva Inglaterra — y los negocios que prosperan combinan ese tráfico con un sitio que captura al cliente que googlea antes de visitar.',
    },
  },
  {
    slug: 'web-design-cambridge', area: 'Cambridge', state: 'MA', marketId: 'boston',
    roads: ['Massachusetts Avenue', 'Cambridge Street', 'Memorial Drive'],
    places: ['Harvard Square', 'Central Square', 'Kendall Square on the Red Line'],
    flavor: {
      en: 'From Harvard Square bookshops to Kendall Square startups, Cambridge businesses serve one of the most online-first customer bases anywhere — if your site is slow or dated here, people notice immediately.',
      es: 'De las librerías de Harvard Square a las startups de Kendall Square, los negocios de Cambridge atienden a una de las clientelas más digitales que existen — si tu sitio es lento o anticuado aquí, la gente lo nota de inmediato.',
    },
  },

  // ── Dallas metroplex, TX — added because Search Console already shows
  //    impressions for these towns with no page of their own (Grand Prairie
  //    alone drew 22 impressions across 4 queries, one already at position 19).
  {
    slug: 'web-design-grand-prairie', area: 'Grand Prairie', state: 'TX', marketId: 'dallas',
    roads: ['I-30', 'SH 161 (President George Bush Turnpike)', 'Great Southwest Parkway'],
    places: ['Lone Star Park', 'Epic Waters', 'Joe Pool Lake'],
    flavor: {
      en: 'Grand Prairie runs on working businesses — the Great Southwest industrial district, the shops and services along I-30, the trades that keep the whole metroplex moving — and it is heavily Spanish-speaking, so a bilingual site reaches both halves of the customer base at once.',
      es: 'Grand Prairie vive de negocios que trabajan — el distrito industrial Great Southwest, los comercios y servicios a lo largo de la I-30, los oficios que mantienen andando todo el metroplex — y es una ciudad con mucha población hispana, así que un sitio bilingüe llega a las dos mitades de tu clientela a la vez.',
    },
  },
  {
    slug: 'web-design-irving', area: 'Irving', state: 'TX', marketId: 'dallas',
    roads: ['SH 114', 'MacArthur Boulevard', 'Loop 12'],
    places: ['Las Colinas', 'the Toyota Music Factory', 'the Heritage District'],
    flavor: {
      en: 'Irving is two towns at once: the corporate polish of Las Colinas and the family businesses of the Heritage District and MacArthur corridor. Both need a site that looks credible next to much bigger competitors — and one of the most diverse customer bases in Texas makes bilingual a real advantage.',
      es: 'Irving son dos ciudades a la vez: el pulido corporativo de Las Colinas y los negocios familiares del Heritage District y el corredor de MacArthur. Las dos necesitan un sitio que se vea creíble junto a competidores mucho más grandes — y con una de las clientelas más diversas de Texas, ser bilingüe es una ventaja real.',
    },
  },
  // ── New York, NY — Staten Island drew impressions across 3 queries with no
  //    page of its own; the borough is small-business and home-services heavy.
  {
    slug: 'web-design-staten-island', area: 'Staten Island', state: 'NY', marketId: 'new-york',
    roads: ['Hylan Boulevard', 'Richmond Avenue', 'the Staten Island Expressway (I-278)'],
    places: ['St. George and the ferry terminal', 'New Dorp', 'Tottenville'],
    flavor: {
      en: 'Staten Island is the borough of small businesses — contractors, home services, family restaurants, shops along Hylan and Forest — where reputation travels by word of mouth and a customer\'s first check is your website on their phone.',
      es: 'Staten Island es el condado de los pequeños negocios — contratistas, servicios para el hogar, restaurantes familiares, comercios a lo largo de Hylan y Forest — donde la reputación viaja de boca en boca y lo primero que revisa un cliente es tu página en su teléfono.',
    },
  },
]

// Only North Houston and Boston are home markets (in-person). Dallas and New
// York are served remotely — the templates below must not claim otherwise.
const HOME = m => m === 'north-houston' || m === 'boston'
const MARKET_EN = { 'north-houston': 'North Houston', boston: 'Boston', dallas: 'the Dallas metroplex', 'new-york': 'New York' }
const MARKET_ES = { 'north-houston': 'el norte de Houston', boston: 'Boston', dallas: 'el metroplex de Dallas', 'new-york': 'Nueva York' }

const S = {
  en: {
    title: a => `Web Design in ${a.area}, ${a.state} — Websites You Own`,
    desc: a => `Custom, bilingual websites for ${a.area} small businesses — near ${a.places[0]} and the ${a.roads[0]} corridor. Flat pricing, and you own everything.`,
    lead: a => `Custom websites and digital setup for small businesses in ${a.area} — from ${a.places[0]} to ${a.roads[0]}. ${HOME(a.marketId) ? `Part of our ${MARKET_EN[a.marketId]} home market.` : `Part of the ${MARKET_EN[a.marketId]} area we serve.`}`,
    intro: a => [
      a.flavor.en,
      `We build for businesses along ${a.roads.join(', ')} and around ${a.places.slice(0, 2).join(' and ')}: custom design on our own component system, a simple editor you update from your phone, and hosting we manage. Every site ships fast, mobile-first, and structured so Google and AI assistants can actually read it.`,
      `And everything is yours — domain, content, photos, every login — registered in your name from day one, with flat pricing agreed in writing. English y español, both first-class.`,
    ],
    whyTitle: a => `Why ${a.area} businesses work with us`,
    why: a => [
      `${HOME(a.marketId) ? 'Local, genuinely: ' : 'We know the area: '}${a.marketId === 'north-houston' ? 'North Houston is home ground for us — we know the difference between the ' + a.roads[0] + ' corridor and ' + a.places[0] + '.' : a.marketId === 'boston' ? 'Boston is a home market — we meet ' + a.area + ' clients in person.' : 'we build for ' + a.area + ' businesses remotely, and the pages name the streets and places your customers actually search.'}`,
      `Found where people search: your site and Google Business Profile tuned for "${a.area}" searches — the neighborhoods, not just the metro.`,
      `Bilingual at no premium: full English/Spanish builds, because ${a.area} customers shop in both.`,
      `Owned, not rented: flat first-year pricing from $600, renewal locked in writing, and a written exit with a runnable copy of your site.`,
    ],
    faq: a => [
      { q: `Do you meet ${a.area} clients in person?`,
        a: a.marketId === 'north-houston'
          ? `Yes — North Houston is one of our two home markets (we’re from the Klein/Spring area), so in-person meetings around ${a.area} are available, with calls and screen-share keeping everything fast between visits.`
          : a.marketId === 'boston'
          ? `Yes — Boston is one of our two home markets, and in-person meetings are standard. We can come to you anywhere around ${a.area}.`
          : `We work with ${a.area} clients remotely — calls, WhatsApp, and screen-share — which keeps timelines fast and prices low. In-person visits are available in our home markets, Boston and North Houston.` },
      { q: `Can you help my business show up for "${a.area}" searches on Google?`,
        a: `That’s the point of a local build: your pages, your Google Business Profile, and your structured data all name ${a.area} and the places customers actually search — ${a.places.slice(0, 2).join(', ')}, ${a.roads[0]} — so you show up where you actually work.` },
      { q: `Do you build bilingual sites for ${a.area} businesses?`,
        a: `Yes — full English/Spanish sites are built in at no design premium. One site, both languages, maintained together.` },
    ],
  },
  es: {
    title: a => `Diseño Web en ${a.area}, ${a.state} — Sitios Que Son Tuyos`,
    desc: a => `Sitios web a la medida y bilingües para pequeños negocios de ${a.area} — cerca de ${a.places[0]} y el corredor de ${a.roads[0]}. Precios planos, y todo es tuyo.`,
    lead: a => `Sitios web a la medida y configuración digital para pequeños negocios de ${a.area} — de ${a.places[0]} a ${a.roads[0]}. ${HOME(a.marketId) ? `Parte de nuestro mercado base de ${MARKET_ES[a.marketId]}.` : `Parte de ${MARKET_ES[a.marketId]}, zona que atendemos.`}`,
    intro: a => [
      a.flavor.es,
      `Construimos para negocios a lo largo de ${a.roads.join(', ')} y alrededor de ${a.places.slice(0, 2).join(' y ')}: diseño a la medida sobre nuestro propio sistema de componentes, un editor simple que actualizas desde tu teléfono y hosting administrado por nosotros. Cada sitio sale rápido, primero-móvil y estructurado para que Google y los asistentes de IA puedan leerlo de verdad.`,
      `Y todo es tuyo — dominio, contenido, fotos, cada acceso — registrado a tu nombre desde el primer día, con precios planos acordados por escrito. English y español, ambos de primera.`,
    ],
    whyTitle: a => `Por qué los negocios de ${a.area} trabajan con nosotros`,
    why: a => [
      `${HOME(a.marketId) ? 'Locales de verdad: ' : 'Conocemos la zona: '}${a.marketId === 'north-houston' ? 'el norte de Houston es terreno propio — sabemos la diferencia entre el corredor de ' + a.roads[0] + ' y ' + a.places[0] + '.' : a.marketId === 'boston' ? 'Boston es mercado base — nos reunimos en persona con los clientes de ' + a.area + '.' : 'construimos para negocios de ' + a.area + ' de forma remota, y las páginas nombran las calles y lugares que tus clientes de verdad buscan.'}`,
      `Encontrado donde la gente busca: tu sitio y tu Perfil de Empresa de Google afinados para búsquedas de "${a.area}" — los vecindarios, no solo la ciudad.`,
      `Bilingüe sin costo extra: sitios completos en inglés y español, porque los clientes de ${a.area} compran en ambos.`,
      `Tuyo, no rentado: precio plano desde $600 el primer año, renovación fijada por escrito y una salida escrita con una copia ejecutable de tu sitio.`,
    ],
    faq: a => [
      { q: `¿Se reúnen en persona con clientes de ${a.area}?`,
        a: a.marketId === 'north-houston'
          ? `Sí — el norte de Houston es uno de nuestros dos mercados base (somos del área de Klein/Spring), así que las reuniones en persona por ${a.area} están disponibles, con llamadas y videollamadas entre visitas.`
          : a.marketId === 'boston'
          ? `Sí — Boston es uno de nuestros dos mercados base, y las reuniones en persona son lo estándar. Podemos ir a ti en cualquier punto de ${a.area}.`
          : `Con los clientes de ${a.area} trabajamos de forma remota — llamadas, WhatsApp y pantalla compartida — lo que mantiene los tiempos ágiles y los precios bajos. Las visitas en persona están disponibles en nuestros mercados base, Boston y el norte de Houston.` },
      { q: `¿Pueden ayudar a que mi negocio aparezca en búsquedas de "${a.area}" en Google?`,
        a: `Ese es el punto de una construcción local: tus páginas, tu Perfil de Empresa de Google y tus datos estructurados nombran ${a.area} y los lugares que la gente de verdad busca — ${a.places.slice(0, 2).join(', ')}, ${a.roads[0]} — para que aparezcas donde realmente trabajas.` },
      { q: `¿Construyen sitios bilingües para negocios de ${a.area}?`,
        a: `Sí — sitios completos en inglés y español integrados sin costo extra de diseño. Un sitio, dos idiomas, mantenidos juntos.` },
    ],
  },
}

export function buildAreaGuides(lang = 'en') {
  const t = S[lang]
  return AREAS.map(a => ({
    slug: a.slug,
    city: a.area,
    state: a.state,
    marketId: a.marketId,
    isArea: true,
    metaTitle: t.title(a),
    metaDescription: t.desc(a),
    lead: t.lead(a),
    intro: t.intro(a),
    whyTitle: t.whyTitle(a),
    why: t.why(a),
    faq: t.faq(a),
  }))
}
