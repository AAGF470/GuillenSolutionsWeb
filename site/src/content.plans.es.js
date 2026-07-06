// ---------------------------------------------------------------------------
// content.plans.es.js — Spanish version of planPages.js (the per-plan sales
// pages). Same structure/keys; only human-readable text is translated.
// Merged over the English PLAN_PAGES by content.js.
// ---------------------------------------------------------------------------
export const PLAN_PAGES = {
  freelance: {
    seo: {
      title: 'El Plan Freelance / Individual — $600 el primer año',
      description: 'Un sitio web profesional y creíble para profesionales independientes — abogados, estilistas, contadores, diseñadores — $600 todo incluido el primer año, luego $200/año. Eres dueño de todo.',
    },
    hero: {
      eyebrow: 'Freelance / Individual · $600 el primer año',
      headline: 'Un sitio profesional que trabaja tan duro como tú.',
      subtext: 'Tú eres el negocio — tu sitio web solo tiene que dejarlo claro. Tres páginas diseñadas para ti, dos que llenas tú mismo, todo a tu nombre, en línea en días. Sin precio de agencia para una operación de una sola persona.',
    },
    whoTitle: 'Hecho para profesionales independientes',
    whoSub: 'Si tus clientes te contratan a ti — no a una tienda — este plan encaja. Algunos de los profesionales para quienes diseñamos:',
    who: [
      { icon: 'shield', title: 'Abogado independiente',     body: 'Áreas de práctica, credenciales y un formulario de consulta que te llega directo — credibilidad que un referido puede verificar en dos minutos.' },
      { icon: 'star',   title: 'Diseñador independiente',   body: 'Una cuadrícula de portafolio limpia, tu proceso y una vía de contacto — el sitio se quita del camino del trabajo.' },
      { icon: 'zap',    title: 'Estilista',         body: 'Tus looks, tu menú de precios, tus horarios y un enlace de reservas — la página que los clientes mandan a sus amigos.' },
      { icon: 'check',  title: 'Contador',           body: 'Servicios, temporadas y señales de confianza — más una forma segura para que los clientes nuevos inicien una conversación.' },
      { icon: 'users',  title: 'Modelo / talento',       body: 'Un portafolio rápido con tu comp card, medidas y contacto de representación — compartible como un solo enlace.' },
      { icon: 'wrench', title: 'Ceramista / artesano',          body: 'Una galería que le hace justicia a tu trabajo, tu historia y dónde comprar — encanto de puesto de mercado, acabado profesional.' },
      { icon: 'home',   title: 'Criador de perros',          body: 'Tu programa, pruebas de salud, camadas disponibles como actualizaciones autogestionables y un formulario de lista de espera.' },
      { icon: 'globe',  title: '…y cualquier profesional individual',    body: 'Tutor, fotógrafo, entrenador, notario, traductor — si cabe en cinco páginas enfocadas, este plan se hizo para ello.' },
    ],
    getTitle: 'Qué incluye realmente los $600',
    get: [
      'Tres páginas diseñadas para ti — inicio, sobre ti/servicios, contacto — sobre una plantilla profesional de nuestro sistema de componentes.',
      'Dos páginas autogestionables que controlas por completo — agrega un portafolio, una lista de precios, unas preguntas frecuentes — a través de tu propio editor.',
      'Tu propio CMS: cambia tus palabras, precios y fotos cuando quieras, gratis. Muestra solo lo que de verdad editas.',
      'Dominio registrado a tu nombre, hosting administrado, SSL y copias de seguridad — a cargo nuestro.',
      'Todo es tuyo desde el primer día. Vete cuando quieras y llévate todo.',
    ],
    getNote: 'Luego $200/año por hosting + renovación del dominio — acordado por escrito antes de que firmes.',
    steps: [
      { title: 'Cuéntanos sobre tu trabajo', body: 'Una llamada corta — qué haces, quién te contrata y el estilo que quieres. En inglés o español.' },
      { title: 'Diseñamos tus tres páginas', body: 'Construidas sobre nuestro sistema de componentes, así que se ve a la medida sin el costo a la medida — revisas una vista previa en vivo y ajustamos.' },
      { title: 'Llenas tus páginas autogestionables', body: 'Te entregamos tu editor y te guiamos por él. Quince minutos y puedes manejar el sitio tú mismo.' },
      { title: 'Lanzamiento — a tu nombre', body: 'El dominio, el hosting y los accesos son tuyos. Nosotros nos quedamos con el mantenimiento; tú eres dueño del recurso.' },
    ],
    faq: [
      { q: '¿Puedo subir a un plan más grande después?', a: 'Sí — tu contenido, dominio y diseño se transfieren, y solo cotizamos la diferencia de trabajo. Nada se tira.' },
      { q: '¿Qué es exactamente una página "autogestionable"?', a: 'Una página cuya maquetación configuramos nosotros y cuyo contenido llenas y actualizas tú mismo a través de tu editor — un portafolio, lista de precios o preguntas frecuentes. Editar siempre es gratis.' },
      { q: '¿La plantilla va a verse como el sitio de todos los demás?', a: 'No — es nuestro sistema de diseño interno, adaptado a ti. Los mismos componentes, tus colores, tu tipografía, tu voz.' },
    ],
    cta: { eyebrow: 'Listos cuando tú lo estés', headline: 'Tu nombre merece un mejor resultado de búsqueda.', subtext: 'Arma una cotización en un minuto — o contáctanos y lo conversamos.' },
  },

  standard: {
    seo: {
      title: 'El Plan Negocio Estándar — $950 el primer año',
      description: 'Un sitio web personalizado y gestionable para pequeños negocios — 6 páginas, 25 artículos importados, tu propio editor, $950 todo incluido el primer año, luego $350/año. Eres dueño de todo.',
    },
    hero: {
      eyebrow: 'Negocio Estándar · $950 el primer año · El más popular',
      headline: 'El paquete completo, construido alrededor de tu negocio.',
      subtext: 'Seis páginas diseñadas a la medida, un catálogo de tus productos o servicios y un editor que hace que actualizarlos sea tuyo para siempre. Este es nuestro propio sistema haciendo lo que mejor sabe hacer — diseño a la medida a un precio que un pequeño negocio realmente puede justificar.',
    },
    whoTitle: 'Hecho para negocios locales reales',
    whoSub: 'Cualquier cosa con servicios, productos, horarios y clientes que primero buscan en Google:',
    who: [
      { icon: 'fence',  title: 'Contratista',        body: 'Servicios por oficio, una galería de proyectos que vende el trabajo, zonas de servicio y un diseño enfocado en llamar.' },
      { icon: 'star',   title: 'Restaurante',        body: 'Tu menú como artículos que actualizas tú mismo — cambia un precio en un minuto, sin llamar a un "chico de la web".' },
      { icon: 'zap',    title: 'Salón / barbería', body: 'Un menú de servicios con precios, tus estilistas, tus looks y las reservas al frente y al centro.' },
      { icon: 'wrench', title: 'Taller mecánico',          body: 'Servicios, señales de confianza, horarios y un formulario de cotización que llega al mostrador.' },
      { icon: 'home',   title: 'Jardinero / paisajista',         body: 'Servicios de temporada, galerías de antes/después y los vecindarios que atiendes.' },
      { icon: 'layers', title: 'Boutique / comercio',  body: 'Un catálogo de productos como artículos — 25 importados por ti, ilimitados después, agrupados como vendas.' },
      { icon: 'droplet', title: 'Servicio de limpieza',  body: 'Planes y precios, zonas de servicio y un formulario de reserva — el sitio que gana la comparación.' },
      { icon: 'users',  title: 'Gimnasio / estudio',       body: 'Clases como artículos, horarios, entrenadores y membresías — actualizados por quien atiende la recepción.' },
    ],
    getTitle: 'Qué incluye realmente los $950',
    get: [
      'Hasta seis páginas diseñadas a la medida alrededor de tu negocio — no una plantilla con tu logo encima.',
      'Tu catálogo: 25 productos, artículos de menú o listados importados por ti — luego ilimitados, autogestionables, gratis, en grupos ilimitados.',
      'Tu propio CMS, moldeado a tu negocio: precios, fotos, horarios, artículos — y nada que no necesites.',
      'Dominio a tu nombre, hosting administrado, SSL, copias de seguridad y seguridad — a cargo nuestro.',
      'Construido sobre nuestro sistema de componentes interno: probado una vez, reutilizado en todas partes — por eso esto cuesta $950 y no $5,000.',
    ],
    getNote: 'Luego $350/año por hosting + renovación del dominio — acordado por escrito antes de que firmes.',
    steps: [
      { title: 'Conocemos tu negocio', body: 'Qué vendes, cómo te encuentran los clientes, qué necesita actualizarse cada semana vs. nunca. En inglés o español.' },
      { title: 'Diseñamos tus seis páginas', body: 'Compuestas desde nuestra biblioteca de componentes y adaptadas a ti — revisadas en un enlace de vista previa en vivo, ajustadas hasta que quede bien.' },
      { title: 'Importamos tu catálogo', body: 'Tus primeros 25 artículos entran como contenido estructurado — diseñados una vez, consistentes en todas partes, tuyos para extender gratis.' },
      { title: 'Llaves entregadas', body: 'Dominio, editor y cada acceso a tu nombre — con un acompañamiento. Nosotros lo mantenemos alojado, rápido y seguro.' },
    ],
    faq: [
      { q: '¿Cuál es la diferencia entre páginas y artículos?', a: 'Las páginas son maquetaciones diseñadas (tu inicio, sobre ti, servicios). Los artículos son las cosas que esas páginas listan — un producto, un platillo, un servicio. Un catálogo de 40 productos es una página más 40 artículos, no 40 páginas. Por eso es accesible.' },
      { q: '¿Puede mi personal actualizar el sitio?', a: 'Sí — el editor es seguro para entregar a cualquiera. El contenido es editable; el diseño está fijado, así que nadie puede romper la maquetación.' },
      { q: '¿Qué pasa cuando supero las 6 páginas?', a: 'Las páginas extra cuestan entre $75 y $200 cada una según la profundidad, cotizadas antes de construir. Los artículos son ilimitados y gratis cuando los agregas tú mismo.' },
    ],
    cta: { eyebrow: 'El que eligen la mayoría de los negocios', headline: 'Construyamos el sitio por el que tu negocio merece ser juzgado.', subtext: 'Arma una cotización en un minuto — o contáctanos y lo conversamos.' },
  },

  wordpress: {
    seo: {
      title: 'El Plan Negocio WordPress — $1,350 el primer año',
      description: 'Un sitio web para pequeños negocios en WordPress para máxima portabilidad — cualquier desarrollador puede mantenerlo. $1,350 todo incluido el primer año, luego $500/año con actualizaciones y seguridad administradas.',
    },
    hero: {
      eyebrow: 'Negocio WordPress · $1,350 el primer año',
      headline: 'Máxima portabilidad, dependencia cero de nosotros.',
      subtext: 'La misma configuración de seis páginas basada en catálogo que nuestro plan Estándar — construida sobre WordPress, la plataforma que hace funcionar a la mitad del internet. Cualquier desarrollador del mundo puede mantenerlo, lo que lo convierte en la opción correcta si lo que más te importa es nunca depender de un solo proveedor.',
    },
    whoTitle: 'Cuándo WordPress es la decisión correcta',
    whoSub: 'Nuestro propio sistema es más rápido y más barato de mantener seguro — pero WordPress gana en situaciones específicas:',
    who: [
      { icon: 'globe',  title: 'La independencia del proveedor primero', body: 'Quieres la opción de entrar a cualquier agencia o contratar a cualquier freelancer, en cualquier lugar, y que tomen el control en frío.' },
      { icon: 'users',  title: 'Ayuda interna después',       body: 'Planeas traer el marketing o el trabajo web internamente — las habilidades de WordPress son las más fáciles de contratar.' },
      { icon: 'layers', title: 'Necesidades del ecosistema de plugins',    body: 'Necesitas algo específico — membresías, eventos, integraciones concretas — que los plugins de WordPress ya resuelven.' },
      { icon: 'check',  title: 'Familiaridad',               body: 'Ya has usado WordPress antes y quieres el editor que ya conoces.' },
    ],
    getTitle: 'Qué incluye realmente los $1,350',
    get: [
      'Hasta seis páginas diseñadas sobre WordPress, con un tema limpio y rápido — no un lío de constructor de páginas inflado.',
      'Tu catálogo: 25 productos o listados importados, luego ilimitados y autogestionables a través del editor de WordPress.',
      'Dominio a tu nombre, hosting administrado, SSL y copias de seguridad — a cargo nuestro.',
      'Acceso completo de administrador desde el primer día. Es tu WordPress, no el nuestro.',
      'Máxima portabilidad: cualquier desarrollador puede mantenerlo, extenderlo o moverlo.',
    ],
    getNote: 'Luego $500/año — más que los $350 de nuestro plan Estándar. La sección de abajo explica exactamente por qué, porque mereces saber por qué estás pagando.',
    why: {
      eyebrow: 'Con precio honesto',
      title: 'Por qué la renovación de WordPress cuesta más — el desglose honesto',
      sub: 'Le cobramos a cada plataforma lo que realmente cuesta operarla de forma segura — nunca como una palanca de ataduras. El mantenimiento de WordPress es genuinamente más pesado, por tres razones:',
      items: [
        { icon: 'zap',    title: 'Más pesado de operar',           body: 'WordPress necesita un servidor PHP y una base de datos corriendo las 24 horas. Nuestro propio sistema sirve tu sitio como páginas estáticas preconstruidas — más rápido para los visitantes y mucho más barato de mantener en línea.' },
        { icon: 'shield', title: 'Mayor superficie de ataque',    body: 'WordPress hace funcionar gran parte de la web, lo que lo convierte en la plataforma más atacada del internet — y los plugins son su punto más débil. Mantenerse seguro exige actualizaciones continuas del núcleo, parcheo de plugins y monitoreo. Nuestra configuración headless tiene casi nada expuesto a ataques.' },
        { icon: 'globe',  title: 'Estás pagando por margen',  body: 'El sobreprecio es en realidad el costo de la portabilidad: una plataforma de propósito general que cualquier desarrollador puede tomar es menos eficiente que un sistema hecho a la medida para tu sitio. Ese intercambio vale la pena para algunos negocios — y lo cobramos al costo, no como una penalización.' },
        { icon: 'check',  title: 'Qué cubre los $500',     body: 'Hosting administrado, SSL, copias de seguridad diarias, actualizaciones de núcleo y plugins, parcheo de seguridad y monitoreo — el mantenimiento completo, por escrito, sin sorpresas.' },
      ],
    },
    steps: [
      { title: 'Conocemos tu negocio', body: 'El mismo descubrimiento que en todo plan — qué vendes, quién compra, qué cambia seguido. En inglés o español.' },
      { title: 'Construimos sobre WordPress', body: 'Un tema ligero, tus seis páginas y un editor afinado — nada del exceso de plugins que hace lentos a los sitios de WordPress.' },
      { title: 'Importamos tu catálogo', body: 'Tus primeros 25 artículos estructurados correctamente, para que agregar más tú mismo sea sencillo.' },
      { title: 'Llaves entregadas', body: 'Administrador completo, dominio y hosting a tu nombre. Nosotros lo mantenemos actualizado, parcheado y respaldado.' },
    ],
    faq: [
      { q: '¿Por qué la renovación es $500 cuando Estándar es $350?', a: 'Un WordPress administrado genuinamente cuesta más de mantener seguro: actualizaciones del núcleo, parcheo de plugins, hosting PHP y monitoreo de seguridad son trabajo continuo. Nuestro propio sistema es headless y servido de forma estática, así que simplemente hay menos que defender. Le ponemos precio a cada plataforma según lo que realmente cuesta — nunca como una palanca de ataduras.' },
      { q: '¿De verdad puede otro desarrollador tomar el control de esto?', a: 'Sí — ese es el punto de este plan. WordPress estándar, hosting estándar, acceso completo de administrador y tu repositorio entregado. Cualquier desarrollador de WordPress puede tomarlo en frío.' },
      { q: '¿Qué plan debería elegir realmente?', a: 'Si quieres el mejor valor y diseño, Estándar. Si la portabilidad garantizada a cualquier desarrollador pesa más que el mantenimiento más alto, WordPress. Te diremos con honestidad cuál encaja — incluso cuando sea el más barato.' },
    ],
    cta: { eyebrow: 'Portabilidad, con precio honesto', headline: 'Tu sitio, sobre la plataforma que habla todo el mundo.', subtext: 'Arma una cotización en un minuto — o contáctanos y lo conversamos.' },
  },
}
