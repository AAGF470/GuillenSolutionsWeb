// ---------------------------------------------------------------------------
// esLanding.js — Spanish-FIRST landing pages (not translations).
//
// The /es mirror ranks for translated English keywords. These pages are written
// around how Hispanic owners actually search — "páginas web para negocios",
// "diseño de páginas web", "diseñador web en …", usually typed WITHOUT accents
// (hence accent-less slugs) — and are ordered the way this market actually
// buys: trust and referrals first, features last. Spanish-only by design, so
// they carry no hreflang pair.
//
// Rendered by pages/EsLanding.jsx and prerendered by scripts/prerender.mjs.
// ---------------------------------------------------------------------------

export const ES_LANDINGS = [
  {
    slug: 'paginas-web-norte-houston',
    city: 'el norte de Houston',
    shortCity: 'Norte de Houston',
    state: 'TX',
    metaTitle: 'Páginas Web para Negocios en el Norte de Houston — En Español',
    metaDescription:
      'Diseño de páginas web para negocios hispanos en el norte de Houston: Spring, Klein, Tomball, The Woodlands y Conroe. Todo en español, todo a tu nombre, precio fijo por escrito. Somos un estudio latino.',
    h1: 'Páginas web para negocios en el norte de Houston',
    lead:
      'Somos un estudio latino — y esta es nuestra zona. Hacemos páginas web para negocios en Spring, Klein, Tomball, The Woodlands y Conroe: todo el proceso en español, el dominio y las cuentas a tu nombre, y un precio fijo acordado por escrito antes de empezar.',
    // Trust before features — this market buys on confianza, not on feature lists.
    trust: {
      title: 'Por qué los dueños nos dan la confianza',
      points: [
        {
          title: 'Hablamos tu idioma, de principio a fin',
          body: 'Las llamadas, el contrato, los recibos y el soporte pueden ser todos en español. Nunca vas a firmar algo que no puedas leer completo, y nunca te vamos a explicar tu propio negocio en un idioma que no dominas.',
        },
        {
          title: 'Todo queda a tu nombre — por escrito',
          body: 'El dominio, la página, el correo y cada contraseña se registran a tu nombre desde el primer día, con un documento de entrega. Si un "muchacho de las computadoras" tiene secuestrado tu dominio o tus redes, sacarlo de ahí es trabajo que ya hemos hecho varias veces.',
        },
        {
          title: 'Nos conoces por recomendación',
          body: 'Así trabajamos: un dueño nos recomienda con otro. Puedes hablar directamente con la persona que va a construir tu página — no con un vendedor. Y si tú nos recomiendas a alguien, te pagamos comisión el mismo día.',
        },
        {
          title: 'Precio fijo, sin sorpresas',
          body: 'Un solo número, todo incluido el primer año, y la renovación anual acordada por escrito antes de que firmes. No manejamos tu dinero ni tu gasto en publicidad — eso siempre queda contigo.',
        },
      ],
    },
    // Concrete local industries — proves this is a real local page, not a template.
    industries: {
      title: 'Negocios que atendemos por aquí',
      body: 'Trabajamos con los negocios que sostienen esta zona — los que se eligen por recomendación y por cómo se ven cuando alguien los busca en el teléfono.',
      items: [
        'Taquerías, panaderías y restaurantes familiares',
        'Salones de belleza, barberías y estéticas',
        'Construcción, remodelación y contratistas',
        'Limpieza residencial y comercial',
        'Talleres mecánicos y servicios de auto',
        'Jardinería, techos y servicios para el hogar',
        'Tiendas, boutiques y negocios de productos',
        'Fotografía, eventos y servicios profesionales',
      ],
    },
    areas: ['Spring', 'Klein', 'Tomball', 'The Woodlands', 'Conroe', 'y el resto del norte de Houston'],
    localNote:
      'Esta es nuestra zona de casa: somos del área de Klein/Spring, así que aquí sí nos podemos ver en persona — en tu negocio, no en una oficina.',
    searchNote:
      'Si andas buscando un diseñador web en el norte de Houston, o simplemente quieres hacer una página web para tu negocio sin complicarte, aquí tienes el precio y el proceso completo — por escrito y en español.',
    faq: [
      {
        q: '¿Todo el proceso puede ser en español?',
        a: 'Sí, completamente: las llamadas, el contrato, los recibos, la capacitación y el soporte. También construimos tu página en los dos idiomas sin costo extra, para que atiendas a tus clientes hispanos y a los que hablan inglés con la misma página.',
      },
      {
        q: '¿El dominio queda a mi nombre o al de ustedes?',
        a: 'A tu nombre, siempre. El dominio, el hosting, el correo y cada cuenta se registran contigo como dueño desde el primer día, y te entregamos todas las contraseñas por escrito. Si algún día te quieres ir, te llevas todo — incluida una copia funcional de tu sitio.',
      },
      {
        q: '¿Cuánto cuesta y cómo puedo pagar?',
        a: 'Los planes empiezan en $600 el primer año, todo incluido (dominio, hosting, diseño y tu panel para editar), y después $200 al año. El plan más popular es $950 el primer año. Te damos el número exacto por escrito antes de empezar — y aceptamos Zelle.',
      },
      {
        q: 'Ya tengo Facebook e Instagram. ¿Para qué necesito una página?',
        a: 'Las redes son de las plataformas; tu página es tuya. Cuando alguien te busca en Google — que es lo que hace un cliente nuevo antes de llamarte — una página propia te hace ver establecido, aparece en el mapa y no depende de que un algoritmo te muestre. Y ahí sí controlas todo lo que dice de tu negocio.',
      },
      {
        q: '¿Ustedes manejan mi dinero o mis anuncios?',
        a: 'No, nunca. No tocamos tu gasto en publicidad ni cobramos a tus clientes por ti. Si vendes en línea, el cobro pasa por Square o Shopify directo a tu cuenta. Nosotros hacemos y mantenemos la página; el dinero es tuyo y pasa por tus manos.',
      },
      {
        q: '¿Puedo recomendar a otro dueño y ganar algo?',
        a: 'Sí. Cualquiera puede recomendar, seas cliente o no: cuando la persona que nos mandas firma y paga un paquete, te pagamos 10% de los primeros $600 más 5% de lo que exceda, por Zelle el mismo día. Sin registros ni formularios — solo menciona tu nombre.',
      },
    ],
  },
  {
    slug: 'paginas-web-dallas',
    city: 'Dallas',
    shortCity: 'Dallas',
    state: 'TX',
    metaTitle: 'Páginas Web para Negocios en Dallas — Diseño Web en Español',
    metaDescription:
      'Diseño de páginas web para negocios hispanos en Dallas, Irving, Grand Prairie y Mesquite. Todo en español, el dominio a tu nombre y precio fijo por escrito. Estudio latino — nuestro primer cliente fue un electricista de Dallas.',
    h1: 'Páginas web para negocios en Dallas',
    lead:
      'Nuestro primer cliente fue un electricista con licencia aquí en Dallas — así empezó todo. Hacemos páginas web para negocios en Dallas, Irving, Grand Prairie y Mesquite: el proceso completo en español, todo registrado a tu nombre y un precio fijo por escrito.',
    trust: {
      title: 'Por qué los dueños nos dan la confianza',
      points: [
        {
          title: 'Hablamos tu idioma, de principio a fin',
          body: 'Llamadas, contrato, recibos y soporte en español. Te explicamos cómo funciona todo hasta que lo entiendas — no te pedimos que firmes algo que no puedas leer completo.',
        },
        {
          title: 'Todo queda a tu nombre — por escrito',
          body: 'Dominio, página, correo y cada contraseña a tu nombre desde el primer día, con documento de entrega. Y si alguien más tiene control de tu dominio o tus redes, recuperarlo es trabajo que ya conocemos.',
        },
        {
          title: 'Trabajo que puedes ir a ver',
          body: 'Empezamos con Angel Electrical Services, un electricista de Dallas: página enfocada en confianza, con formulario de cotización que le llega directo al dueño. Puedes verla antes de decidir.',
        },
        {
          title: 'Precio fijo, sin sorpresas',
          body: 'Un número, todo incluido el primer año, con la renovación acordada por escrito. Nunca manejamos tu dinero ni tu gasto en anuncios.',
        },
      ],
    },
    industries: {
      title: 'Negocios que atendemos en el área',
      body: 'Los negocios de servicio viven de la llamada: construimos páginas que dan confianza rápido y mandan la cotización directo a tu teléfono.',
      items: [
        'Electricistas, plomeros y HVAC',
        'Construcción, remodelación y contratistas',
        'Talleres mecánicos, llantas y detallado',
        'Limpieza residencial y comercial',
        'Taquerías, panaderías y restaurantes familiares',
        'Salones, barberías y estéticas',
        'Jardinería, cercas y techos',
        'Fletes, mudanzas y transporte',
      ],
    },
    areas: ['Dallas', 'Irving', 'Grand Prairie', 'Mesquite', 'y el resto del metroplex'],
    localNote:
      'Con los clientes de Dallas trabajamos de forma remota — llamadas, WhatsApp y pantalla compartida — lo que mantiene el precio bajo y los tiempos rápidos.',
    searchNote:
      'Si buscas un diseñador web en Dallas, o necesitas hacer una página web para tu negocio y quieres saber cuánto cuesta de verdad, aquí está todo el proceso — por escrito y en español.',
    faq: [
      {
        q: '¿Todo el proceso puede ser en español?',
        a: 'Sí, completamente: llamadas, contrato, recibos, capacitación y soporte. Tu página también sale en español e inglés sin costo extra, para que llegues a todo el mercado del metroplex.',
      },
      {
        q: '¿El dominio queda a mi nombre o al de ustedes?',
        a: 'A tu nombre, siempre — dominio, hosting, correo y cada cuenta, con las contraseñas entregadas por escrito. Si algún día te vas, te llevas todo, incluida una copia funcional del sitio.',
      },
      {
        q: '¿Cuánto cuesta y cómo puedo pagar?',
        a: 'Desde $600 el primer año todo incluido (dominio, hosting, diseño y tu panel para editar), después $200 al año; el plan más popular es $950 el primer año. El número exacto va por escrito antes de empezar, y aceptamos Zelle.',
      },
      {
        q: '¿Han hecho páginas para negocios como el mío en Dallas?',
        a: 'Sí — nuestro primer cliente fue Angel Electrical Services, un electricista con licencia en Dallas. Trabajamos mucho con negocios de servicio: contratistas, limpieza, talleres y oficios donde la confianza y la llamada son todo.',
      },
      {
        q: '¿Me pueden ayudar a salir en Google Maps?',
        a: 'Sí. Configuramos tu Perfil de Empresa de Google ($300) y ajustamos la página para las ciudades que de verdad atiendes — Dallas, Irving, Grand Prairie — para que no te pierdas entre los resultados de todo el metroplex. Lo que no hacemos es prometerte el lugar #1: cualquiera que garantice eso está adivinando.',
      },
      {
        q: '¿Puedo recomendar a otro dueño y ganar algo?',
        a: 'Sí, cualquiera puede recomendar. Cuando la persona que nos mandas firma y paga, te pagamos 10% de los primeros $600 más 5% de lo que exceda, por Zelle el mismo día. Sin registros ni formularios.',
      },
    ],
  },
]

export const esLandingBySlug = slug => ES_LANDINGS.find(l => l.slug === slug)
