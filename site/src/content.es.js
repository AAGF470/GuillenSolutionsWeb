// ---------------------------------------------------------------------------
// content.es.js — Spanish overrides for data.js, hand-written (never machine-
// translated). Structures mirror data.js exactly: same ids, prices, amounts,
// kinds, icons and flags — only the human-readable text is in Spanish — so the
// configurator/estimator math and component props keep working unchanged.
//
// useContent() (content.js) merges these over the English base, so any export
// not present here transparently falls back to English.
// ---------------------------------------------------------------------------

export const PACKAGES = [
  {
    id: 'freelance',
    tag: 'Individuales y freelancers',
    name: 'Freelance / Individual',
    price: '$600',
    period: 'primer año, todo incluido',
    description: 'Una plantilla profesional y pulida — una presencia creíble para profesionales independientes, sin el costo de un diseño a la medida.',
    note: 'Después del primer año: $200/año por hosting + renovación del dominio.',
    features: [
      'Hasta 5 páginas — 3 diseñadas para ti + 2 que gestionas tú',
      'Tu propio CMS — edita el contenido cuando quieras, gratis',
      'Dominio registrado a tu nombre',
      'Hosting administrado — SSL, copias de seguridad, disponibilidad diaria',
      'Plantilla profesional sobre nuestro sistema de diseño',
      'Todo es tuyo para conservar — vete cuando quieras',
    ],
    firstYear: 600,
    recurring: 200,
  },
  {
    id: 'standard',
    badge: 'El más popular',
    tag: 'Diseño personalizado interno',
    name: 'Negocio Estándar',
    price: '$950',
    period: 'primer año, todo incluido',
    description: 'Diseño personalizado sobre nuestro sistema de componentes — rápido, moderno y fácil de actualizar tú mismo.',
    note: 'Después del primer año: $350/año por hosting + renovación del dominio.',
    features: [
      '6 páginas diseñadas por nosotros + hasta 4 que armas tú, gratis (10 en total)',
      'Tu propio CMS — 25 artículos importados por nosotros, luego ilimitados y autogestionables, gratis',
      'Grupos de artículos ilimitados — organiza como quieras',
      'Dominio registrado a tu nombre',
      'Hosting administrado — SSL, copias de seguridad, disponibilidad',
      'Construido sobre nuestro sistema de componentes interno — aspecto a la medida, velocidad de plantilla',
    ],
    featured: true,
    firstYear: 950,
    recurring: 350,
  },
  {
    id: 'enhanced',
    tag: 'Gestión activa',
    name: 'Negocio en Línea Enhanced',
    price: '~$1,900',
    period: 'primer año, gestionado activamente',
    description: 'Todo lo del plan Estándar, pero más grande — más una gestión continua para dueños que preferirían no encargarse ellos mismos de las actualizaciones.',
    note: 'Después del primer año: ~$650/año — la gestión activa es trabajo continuo.',
    features: [
      'Hasta 12 páginas — 8 diseñadas por nosotros + 4 que armas tú',
      '4 formatos de publicación en el CMS — categorías y entradas ilimitadas',
      '50 importaciones al CMS incluidas, luego $7/artículo',
      '30 GB de almacenamiento',
      'Gestión activa: mantenimiento mensual de SEO, 2 cambios de temporada al año, un formulario de contacto personalizado, una integración pequeña, traducción completa al español, 2 rediseños de página al año (luego 50% de descuento), un menú QR',
      '20% de descuento en trabajo de renders CG al combinarlo',
    ],
    firstYear: 1900,
    recurring: 650,
    approxPrice: true,
  },
  {
    id: 'private-hosting',
    tag: 'WordPress o servidor dedicado',
    name: 'Plan de Hosting Privado',
    price: 'Precio por definir',
    period: 'en desarrollo',
    description: 'Para clientes que quieren WordPress o su propio servidor aislado/dedicado — con máxima portabilidad, para que cualquier desarrollador pueda tomar el control. Las especificaciones y el precio se están finalizando.',
    note: 'En desarrollo — contáctanos si esto es lo que necesitas.',
    features: [
      'WordPress, o tu propio servidor dedicado / administrado',
      'Máxima portabilidad — cualquier desarrollador puede mantenerlo',
      'Mantenido fuera de nuestra infraestructura principal, para aislarlo',
      'Detalles de páginas / CMS / importaciones en definición',
    ],
    tbd: true,
  },
]

export const BASELINE_INCLUDES = [
  { icon: 'star',   title: 'Diseño personalizado', body: 'Construido sobre nuestra biblioteca de componentes interna — un aspecto a la medida, nunca una plantilla.' },
  { icon: 'zap',    title: 'SEO con rastreabilidad por IA', body: 'Verificado en nuestro propio sitio (3/3 en legibilidad para IA, 97 de rendimiento en escritorio). Rápido, optimizado técnicamente y estructurado para las búsquedas y la IA.' },
  { icon: 'map',    title: 'Indexación en Google (gratis)', body: 'Verificamos tu sitio y lo enviamos a Google Search Console para que quede indexado y se pueda encontrar. (Google Maps es un complemento aparte.)' },
  { icon: 'layers', title: 'Tu propio CMS', body: 'Un editor simple que muestra solo lo que cambias — categorías y entradas ilimitadas en todos los planes.' },
  { icon: 'shield', title: 'Hosting administrado', body: 'SSL, copias de seguridad, disponibilidad — nunca piensas en servidores.' },
  { icon: 'globe',  title: 'Un dominio gratis (primer año)', body: 'Registrado a tu nombre, con hasta $50 de crédito por el valor del dominio. Los dominios premium por encima de $50 se facturan al costo.' },
  { icon: 'check',  title: 'Propiedad completa', body: 'Dominio, contenido, cuentas y cada acceso a tu nombre. Sin ataduras, vete cuando quieras.' },
  { icon: 'wrench', title: 'Tarifas estándar de complementos', body: 'Los precios de los complementos son idénticos en todos los planes — nunca pagas más por un extra por tu tipo de plan.' },
]

export const ADDONS = [
  {
    id: 'phone',
    name: 'Menú Telefónico con IA',
    price: '$200 de instalación + suscripción',
    cadence: 'Instalación única',
    body: 'Una voz de IA con sonido natural contesta tu línea y dirige a quien llama — "marca 1 para ventas, 2 para soporte" — para que nunca pierdas una llamada ni suenes pequeño. Nosotros redactamos y producimos el menú de voz; el número y el servicio de voz luego corren en una suscripción de bajo costo a tu nombre, pagada por ti directamente.',
    amount: 200, kind: 'onetime',
  },
  {
    id: 'email',
    name: 'Correo y Workspace de negocio',
    price: 'cotizado',
    cadence: 'Recurrente',
    body: 'Correo personalizado en tu dominio con Google Workspace — configuración del buzón, o migración desde una cuenta de Office/correo antigua. Tu cuenta, cotizada como un monto anual fijo.',
    amount: null, kind: 'quoted',
  },
  {
    id: 'logo',
    name: 'Logo y tarjetas de presentación',
    price: '$225',
    cadence: 'Único',
    body: 'Un logo profesional (dos formatos) más un diseño de tarjeta de presentación a juego, con un pedido de recogida listo en una imprenta local a tu nombre.',
    amount: 225, kind: 'onetime',
  },
  {
    id: 'form',
    name: 'Formulario de contacto personalizado',
    price: '$250',
    cadence: 'Único',
    body: 'Un formulario de contacto/cotización que envía las consultas directo a tu bandeja de entrada. Los envíos van a ti — ningún dato de tus clientes se queda con nosotros.',
    amount: 250, kind: 'onetime',
  },
  {
    id: 'rush',
    name: 'Entrega express',
    price: '$400',
    cadence: 'Único',
    body: '¿Necesitas tu sitio en días en vez de la semana o dos habituales? Despejamos la agenda y movemos tu proyecto al frente de la fila. Disponible en todos los planes.',
    amount: 400, kind: 'onetime',
  },
  {
    id: 'gbp',
    name: 'Perfil de Empresa de Google',
    price: '$300',
    cadence: 'Único',
    body: 'Ponemos tu negocio en Google Maps — o arreglamos tu presencia actual. Todo incluido: un acompañamiento guiado para crear y verificar tu Perfil de Empresa de Google, configurado a tu nombre.',
    amount: 300, kind: 'onetime',
  },
]

export const ON_DEMAND = [
  {
    id: 'newsletter',
    name: 'Configuración de boletín',
    price: '$225',
    cadence: 'Único',
    body: 'Formularios de suscripción integrados en tu sitio, una cuenta de boletín abierta a TU nombre (los planes gratuitos cubren a la mayoría de pequeños negocios) y una plantilla de correo diseñada a juego con tu sitio. Tú escribes y envías; nada pasa por nosotros.',
    amount: 225, kind: 'onetime',
  },
  {
    id: 'landing',
    name: 'Página de aterrizaje',
    price: '$150/página',
    cadence: 'Por página',
    body: 'Una página única y enfocada para una promoción, temporada o servicio concreto — compuesta con el sistema de componentes de tu sitio para que combine a la perfección y salga rápido.',
    amount: 150, kind: 'per-unit', unit: 'página', unitPlural: 'páginas',
  },
  {
    id: 'qrmenu',
    name: 'Menú QR / lista de precios',
    price: '$120',
    cadence: 'Único',
    body: 'Tu menú o lista de precios como una página limpia, lista para imprimir, con un código QR. Como lee del mismo contenido que tu sitio, actualizar un precio actualiza ambos — gratis, para siempre.',
    amount: 120, kind: 'onetime',
  },
  {
    id: 'seasonal',
    name: 'Renovación de temporada',
    price: '$45/cambio',
    cadence: 'Por cambio',
    body: 'Banner navideño, promo de temporada, aviso de tormenta — cambiamos el contenido y las imágenes destacadas por la temporada y los revertimos después. Un cambio de contenido en nuestro sistema, no un rediseño.',
    amount: 45, kind: 'per-unit', unit: 'cambio', unitPlural: 'cambios',
  },
  {
    id: 'items',
    name: 'Artículos extra (más allá de lo incluido en tu plan)',
    price: '$7/artículo',
    cadence: 'Por artículo',
    body: 'Agregar artículos tú mismo siempre es gratis e ilimitado. Esto es para cuando prefieras que nosotros hagamos la importación — agregamos cada producto, platillo o listado por ti. Agrega una versión en español de cualquier artículo por $2 más (ambos idiomas en una sola entrada).',
    amount: 7, kind: 'per-unit', unit: 'artículo', unitPlural: 'artículos',
  },
  {
    id: 'spanish',
    name: 'Páginas en español',
    price: '$30/página',
    cadence: 'Por página',
    body: 'Páginas completas traducidas a mano por un hablante nativo de español (nunca por máquina), con el diseño ajustado para que se vea limpio. Los artículos cuestan $2 cada uno; las páginas se cotizan aquí.',
    amount: 30, kind: 'per-unit', unit: 'página', unitPlural: 'páginas',
  },
  {
    id: 'extrapage',
    name: 'Páginas extra y rediseños',
    price: '$75–200',
    cadence: 'Cotizado',
    body: 'Páginas nuevas o diseños reelaborados hechos por nosotros, cotizados según la profundidad de la página antes de construir. Armar páginas tú mismo desde la biblioteca de componentes siempre es gratis — esta tarifa es solo para las páginas que diseñamos nosotros.',
    amount: null, kind: 'quoted',
  },
  {
    id: 'integration',
    name: 'Integración grande',
    price: 'desde $400',
    cadence: 'Único, por integración',
    body: 'Construimos una experiencia de tienda completa sobre un motor externo — Shopify o Square — con nuestros componentes como la capa rápida y diseñada a la medida: navegación de productos, disponibilidad en vivo, incluso el carrito, todo leyendo de tu cuenta en la plataforma ("saber antes de ir"). El checkout, los pagos y los datos privados de clientes se quedan con la plataforma — su seguridad de nivel bancario, no la de un estudio pequeño. Transferible, y preciso hasta la última sincronización. Los $400 son el punto de partida para sistemas con APIs limpias; se confirma o se cotiza más alto después de investigar tu sistema.',
    amount: 400, kind: 'onetime', approx: true,
  },
  {
    id: 'posttype',
    name: 'Formato de publicación personalizado',
    price: '$125',
    cadence: 'Único',
    body: 'Un nuevo tipo de contenido diseñado alrededor de tu negocio — entradas de blog, novedades, casos de estudio, anuncios comunitarios. Diseñamos el formato una vez; después publicas entradas ilimitadas tú mismo, gratis.',
    amount: 125, kind: 'onetime',
  },
]

export const CG_RENDER_LEAD =
  'Fotografía de producto con calidad de estudio, hecha en software — sin enviar muestras del producto, sin reservar un estudio fotográfico, sin costos de repetición de tomas. Construimos un modelo 3D de tu producto una vez, y luego lo iluminamos y renderizamos en nuestra escena de estudio estandarizada. La primera toma viene con el modelo; cada toma después de esa es económica, porque lo difícil ya está hecho.'

export const CG_RENDER_TIERS = [
  {
    id: 'simple',
    name: 'Producto simple',
    price: '$150–250',
    per: 'por producto · modelo + primera toma',
    body: 'Productos de forma sencilla y única, con materiales directos.',
    examples: 'Botellas, frascos, cajas, tazas, velas, empaques simples.',
  },
  {
    id: 'standard',
    name: 'Producto estándar',
    price: '$250–400',
    per: 'por producto · modelo + primera toma',
    body: 'Productos de varias partes, empaques en capas o detalle moderado.',
    examples: 'Electrodomésticos, herramientas, cajas con arte, bolsos, ropa.',
    featured: true,
  },
  {
    id: 'complex',
    name: 'Producto complejo',
    price: '$400–600+',
    per: 'por producto · modelo + primera toma',
    body: 'Geometría intrincada, materiales difíciles o detalle mecánico fino.',
    examples: 'Joyería, electrónica, vidrio/líquidos, piezas transparentes o mecánicas.',
  },
]

export const CG_RENDER_SHOTS = [
  {
    id: 'studio',
    name: 'Render de estudio adicional',
    price: '$40–75',
    per: 'por toma',
    body: 'Otro ángulo, un acercamiento de detalle o una variante de color/etiqueta en la misma escena de estudio limpia. El modelo ya existe, así que cada toma extra es rápida — esta es la ventaja del proceso pasada directamente a ti.',
  },
  {
    id: 'lifestyle',
    name: 'Toma ambientada premium',
    price: '$100–250',
    per: 'por toma',
    body: 'Tu producto puesto en escena en un entorno personalizado — una encimera de cocina, un escritorio, un set exterior — compuesto e iluminado como imagen principal para anuncios, banners y tu página de inicio.',
  },
]

export const CG_RENDER_PACKAGES = [
  {
    id: 'starter',
    name: 'Set de listado inicial',
    price: '$425',
    body: 'Un producto modelado + 4 tomas de estudio — frente, reverso, tres cuartos y un acercamiento de detalle. Una galería de listado completa y consistente.',
    includes: ['1 modelo de producto (simple–estándar)', '4 renders de estudio', 'Fondo blanco, listo para marketplace', 'Todos los archivos en alta resolución, tuyos para conservar'],
  },
  {
    id: 'full',
    name: 'Paquete de listado completo',
    price: '$600',
    badge: 'El más popular',
    featured: true,
    body: 'Un producto + 6 tomas de estudio + 1 escena ambientada premium — todo lo que un listado de marketplace y un destacado de página de inicio necesitan, de una sola vez.',
    includes: ['1 modelo de producto (hasta complejo)', '6 renders de estudio', '1 toma ambientada principal', 'Todos los archivos en alta resolución, tuyos para conservar'],
  },
  {
    id: 'launch',
    name: 'Set de lanzamiento de producto',
    price: '$700',
    body: 'Un producto + 8 tomas incluyendo 2 escenas ambientadas y variantes de color/etiqueta — un kit completo para un lanzamiento en tu tienda, anuncios y redes.',
    includes: ['1 modelo de producto (hasta complejo)', '6 renders de estudio + variantes', '2 escenas ambientadas', 'Ajustadas para tienda, anuncios y redes'],
  },
  {
    id: 'motion-launch',
    name: 'Set de lanzamiento con movimiento',
    price: '$1,100–1,400',
    body: 'Un producto + la galería completa de tomas fijas + un giro 360° + un video corto de producto — un kit de lanzamiento completo con movimiento. El paquete premium para negocios de producto que van con todo en un lanzamiento.',
    includes: ['1 modelo de producto (hasta complejo)', 'Galería completa de tomas fijas', 'Giro / 360°', 'Video corto de producto', 'Ajustado para tienda, anuncios y redes'],
  },
]

export const CG_RENDER_MOTION = {
  lead:
    'El movimiento vende. Un producto que gira, atrapa la luz y muestra cada ángulo convierte mejor que cualquier toma fija — y como animamos el mismo modelo 3D que ya construimos, es el producto real en movimiento, perfectamente consistente, cada cuadro. Sin repeticiones, sin distorsión, tuyo para conservar.',
  items: [
    { id: 'turntable', name: 'Giro / 360°', price: '$150–300', per: 'por producto', body: 'Una rotación fluida y en bucle de tu producto sobre el fondo de estudio estándar — el clásico "gira para ver todos los lados." Construido a partir del modelo existente; entregado como video + un archivo listo para bucle. Más económico para productos simples, más alto para complejos.' },
    { id: 'video',     name: 'Video corto de producto', price: '$300–600', per: 'por clip', body: 'Un clip de producto compuesto de 5–15s — movimiento, barridos de luz, acercamientos de detalle, resaltado de funciones — para anuncios, redes y la portada de tu sitio. Con precio según duración y complejidad.' },
    { id: 'lifestyle-anim', name: 'Animación ambientada premium', price: '$500–900+', per: 'por escena', body: 'Tu producto animado dentro de una escena ambientada — sobre una encimera, un escritorio, un set exterior — una pieza principal en movimiento para lanzamientos y campañas pagadas. Cotizada por escena y duración.' },
    { id: 'motion-addon', name: 'Complemento de animación (modelo ya construido)', price: 'desde $120', per: 'complemento', body: 'Agregar movimiento a un producto que YA modelamos para tomas fijas — el camino más económico, porque el recurso ya existe. Una razón para volver después de una sesión de tomas fijas.' },
  ],
  note:
    'Por qué el movimiento cuesta más: es más tiempo de render y composición que una toma fija, y es un entregable premium — pero aun así reutiliza el modelo, así que se mantiene muy por debajo del costo de una producción de video completa. Escalonado por complejidad/duración o cotizado por producto, nunca tarifa plana — igual que las tomas fijas.',
}

export const CG_RENDER_VARIANT_NOTE =
  '¿Vendes un producto en muchas variantes? Si tu línea son 30 aromas del mismo frasco de vela, o 12 colores de la misma botella, modelamos la forma UNA vez — y después cada variante de etiqueta, color o sabor es solo un render adicional, no un modelo nuevo. Las imágenes de toda una línea de productos por una fracción del costo por producto. Cuéntanos sobre tu línea y la cotizamos así automáticamente.'

export const CG_RENDER_NOTES = {
  bundled: 'Combinado con la construcción de un sitio web — 15% de descuento en cualquier trabajo de render (20% para clientes de Online Business Enhanced), agregado a tu pedido.',
  standalone: 'Por separado, sin necesidad de un sitio web — con el precio tal cual está listado. Aun así eres dueño de cada archivo en alta resolución.',
  market: 'Los estudios de CG de producto de servicio completo cobran entre $800 y $3,500 por producto. Nuestro proceso de escena de estudio estandarizada nos permite quedarnos muy por debajo de eso — genuinamente accesible — mientras seguimos escalando por el esfuerzo real de modelado, de modo que los productos complejos se cobran de forma justa y los simples siguen siendo económicos.',
  quote: 'Escalamos por complejidad o cotizamos por producto — nunca tarifa plana — porque el tiempo de modelado varía mucho más que el de render. Recibes un monto fijo por producto, acordado por escrito, antes de que empiece cualquier trabajo.',
}

export const CG_RENDER_ADVANTAGE = [
  { icon: 'wrench', title: 'Modela una vez', body: 'Construimos un modelo 3D preciso de tu producto una sola vez. Ese modelo es el recurso del que se genera todo lo demás — y nunca hay que reconstruirlo.' },
  { icon: 'zap',    title: 'Renderiza muchas', body: 'Nuevos ángulos, fondos, colores y escenas ambientadas salen todos del mismo modelo en nuestra configuración de estudio estandarizada — así cada toma después de la primera es rápida y económica.' },
  { icon: 'star',   title: 'Precio a la medida', body: 'Como las tomas extra nos cuestan poco, podemos ofrecer paquetes de varias tomas que un pequeño negocio realmente puede pagar — mientras se nos paga de forma justa por el modelado.' },
]

export const SERVICES = [
  {
    id: 'web',
    tag: 'Servicio principal',
    title: 'Sitios web que son tuyos',
    price: 'desde $600',
    body: 'Sitios personalizados y gestionables con precio plano todo incluido — dominio, hosting, CMS y cada acceso a tu nombre desde el primer día.',
    to: '/pricing',
    linkLabel: 'Ver planes y precios',
  },
  {
    id: 'renders',
    tag: 'Nuevo',
    title: 'Renders de producto 3D',
    price: 'desde $150',
    body: 'Imágenes de producto con calidad de estudio a partir de un modelo 3D que construimos una vez — paquetes de listado y tomas ambientadas, sin estudio fotográfico, sin repetir tomas.',
    to: '/renders',
    linkLabel: 'Explorar renders de producto',
  },
  {
    id: 'business',
    tag: 'Configurado a tu nombre',
    title: 'Prepárate y hazte visible',
    price: 'complementos',
    body: 'Perfil de Empresa de Google para que los locales te encuentren en Maps, además de correo en tu dominio, un menú telefónico con IA que dirige las llamadas y logo y tarjetas — lo esencial para que te descubran, todo tuyo.',
    to: '/pricing',
    linkLabel: 'Ver complementos',
  },
  {
    id: 'ondemand',
    tag: 'Cuando lo necesites',
    title: 'Trabajo a pedido',
    price: 'desde $45',
    body: 'Páginas de aterrizaje, boletines, menús QR, traducciones, cambios de temporada — trabajos de alcance fijo, cotizados por escrito, entregados rápido.',
    to: '/on-demand',
    linkLabel: 'Ver el menú',
  },
]

export const WHERE_WE_ARE = {
  eyebrow: 'Dónde estamos ahora',
  headline: 'Un estudio nuevo — y honestos al respecto.',
  lead: 'Guillen Solutions es joven y manejado por su propio dueño, y por eso mismo el trato es así de justo. Trabajas directamente con la persona que construye tu sitio, los precios son bajos porque no hay sobrecostos de agencia, y cada promesa en esta página es una que podemos respaldar personalmente. Preferimos ganarnos tu confianza con trabajo honesto que impresionarte con afirmaciones infladas. Y somos, con orgullo, un negocio LGBTQ+ y latino — te atendemos en inglés y español, ambos de primera.',
  points: [
    { icon: 'users',  title: 'Trabajas con quien lo construye',       body: 'Sin equipo de ventas, sin gerentes de cuenta, sin traspasos — una línea directa con la persona que de verdad diseña y construye tu sitio.' },
    { icon: 'zap',    title: 'Precios de cliente temprano',           body: 'Las tarifas de hoy son iniciales. Empieza ahora y aseguras precios justos y graduales a medida que crecemos — por escrito, antes de firmar.' },
    { icon: 'shield', title: 'Cada promesa, respaldada en persona',   body: 'Somos lo bastante pequeños para respaldar cada promesa con nombre y apellido — propiedad, términos de salida, el número que te cotizamos. Sin juegos de letra chica.' },
  ],
}

export const FOUND = {
  eyebrow: 'Encontrado por las búsquedas — y por la IA',
  headline: 'Hecho para que te descubran, no solo para verse bien',
  lead: 'Verse bien es solo la mitad — que te encuentren es la otra mitad, así que construimos para ello desde el primer día. Cada sitio es rápido, mobile-first, y viene con los datos estructurados y el HTML real y legible que los buscadores y los asistentes de IA necesitan para entender y recomendar tu negocio. También configuramos tu Perfil de Empresa de Google. Lo que no haremos es venderte anuncios ni prometer un ranking #1 — cualquiera que lo garantice está adivinando. Nosotros ponemos la base técnica honesta; el resto se gana.',
  points: [
    { icon: 'star',   title: 'Datos estructurados, incluidos',      body: 'Cada sitio viene con JSON-LD limpio — el esquema legible por máquina que le dice a Google y a los asistentes de IA exactamente qué es tu negocio, qué ofreces y cuánto cuesta. Hechos que pueden citar, no prosa que tengan que adivinar.' },
    { icon: 'zap',    title: 'HTML real, no una cáscara vacía',  body: 'Tus páginas se prerenderizan a HTML legible con el contenido ya incluido, así los rastreadores de búsqueda y las herramientas de IA que la gente ahora usa para evaluar negocios pueden leerte y citarte a la primera — no una página en blanco esperando a JavaScript.' },
    { icon: 'layers', title: 'Rápido y mobile-first',            body: 'Páginas ligeras y mobile-first con los fundamentos que las búsquedas premian — buenos Core Web Vitals, marcado semántico y metadatos limpios — para que tu sitio compita por sus méritos, no por el gasto en anuncios.' },
    { icon: 'shield', title: 'Abierto a la IA, en tus términos',      body: 'Damos la bienvenida explícita a los asistentes de IA — un resumen en llms.txt y una política de rastreo amigable con la IA — para que herramientas como ChatGPT, Claude, Gemini y Perplexity puedan encontrarte y recomendarte, donde cada vez más clientes empiezan su búsqueda.' },
  ],
}

export const REFERRAL_PROGRAM = {
  eyebrow: 'Programa de referidos',
  headline: '¿Conoces un negocio que nos necesita? Gana hasta un 10%.',
  lead: 'Cualquiera puede referir — no tienes que ser cliente. Cuando alguien que nos envías firma y paga un paquete, ganas una comisión: 10% de los primeros $600, más 5% de lo que exceda esa cantidad. Refiere a cuantas personas quieras.',
  steps: [
    { title: 'Envíalos con nosotros',      body: 'Que mencionen tu nombre cuando nos contacten — o cuéntanos tú de ellos. Cualquier orden sirve: a quien nos llegue primero, simplemente lo confirmamos con el otro. Sin registro, sin panel, sin formularios.' },
    { title: 'Firman y pagan',        body: 'Tu referido elige cualquier paquete — un plan de sitio web o un paquete de renders de producto — y lo paga.' },
    { title: 'Pagado el mismo día, por Zelle', body: 'Una vez que ambas partes se nombran entre sí y el paquete está pagado por completo, te enviamos tu comisión por Zelle el mismo día. 10% de los primeros $600, más 5% de lo que exceda.' },
  ],
  fine: 'La comisión aplica al primer paquete que un cliente nuevo firma y paga. La atribución es de dos lados: el cliente te nombra y tú nombras al cliente — en cualquier orden — y las respuestas coincidentes activan el pago el mismo día. Sin ciclos de pago, sin mínimos.',
}

export const GROWTH_NOTE =
  'A medida que tu sitio crece, las páginas extra o rediseños cuestan entre $75 y $200 cada uno, cotizados según la profundidad. Y los referidos pagan: envíanos un cliente que firme y recibe el 10% de los primeros $600 (más 5% de lo que exceda) por Zelle, el mismo día — seas cliente o no.'

export const PRICING_PROMISE =
  'Las tarifas de renovación se acuerdan por escrito antes de que firmes, así que no hay sorpresas. Los precios de hoy son tarifas iniciales; los clientes existentes conservan precios justos y graduales.'

export const POSITIONING = [
  { icon: 'layers', title: 'vs. constructores DIY',    body: 'Squarespace y Wix te entregan una plantilla en blanco y una factura mensual. Nosotros te entregamos un sitio terminado y diseñado a la medida, con un editor hecho para tu negocio.' },
  { icon: 'zap',    title: 'vs. freelancers',     body: 'Los proyectos freelance cuestan entre $1,500 y $8,000 y empiezan de cero cada vez. Nuestro sistema de componentes hace el trabajo pesado, así obtienes un trabajo con aspecto a la medida por una fracción del costo.' },
  { icon: 'star',   title: 'vs. agencias',        body: 'El trabajo de agencia empieza cerca de $6,000, con gastos generales a la altura. Nuestro sistema entrega un acabado comparable sin los mínimos.' },
  { icon: 'shield', title: 'vs. proveedores abusivos', body: 'Algunos proveedores locales se quedan con tu dominio, revenden tus clientes potenciales y te cobran para siempre. Con nosotros eres dueño de todo, y nunca tocamos tu gasto en anuncios ni tu dinero.' },
]

export const CMS_NOTE =
  'Como es tuyo, puedes agregar o quitar productos y ajustar el diseño de las páginas tú mismo, cuando quieras — sin programar, y sin costo. Las tarifas de los complementos son solo para cuando prefieras que nosotros nos encarguemos.'

export const CMS_LEAD =
  'Un CMS es simplemente la pantalla donde inicias sesión para actualizar tu propio sitio — cambiar tus palabras, precios y fotos, sin código de por medio. La mayoría son abrumadores y confusos. El tuyo es hecho a la medida: muestra solo el puñado de cosas que de verdad cambias (precios, fotos, productos, horarios) y esconde todo lo demás. Un lugar simple y seguro para manejar tu propio sitio — tus ediciones no pueden romper el diseño, y es tuyo para conservar.'

export const CMS_POINTS = [
  { icon: 'layers', title: 'Solo lo que necesitas',        body: 'Mostramos los controles exactos que usa tu negocio y ocultamos el resto — sin un panel abrumador, sin campos que nunca abrirás.' },
  { icon: 'wrench', title: 'Hecho a la medida de tu negocio', body: 'Productos, menú, listados, horarios — el CMS se moldea alrededor de lo que realmente gestionas, como una plantilla personalizada hecha solo para ti.' },
  { icon: 'shield', title: 'Tus ediciones no pueden romperlo',       body: 'El diseño y la maquetación están fijados en los componentes, así que editar contenido nunca puede dañar cómo se ve tu sitio. Seguro para entregar a cualquiera de tu equipo.' },
  { icon: 'check',  title: 'Edítalo tú mismo — gratis',   body: 'Agrega, cambia y elimina contenido cuando quieras sin costo. Nuestras tarifas solo aplican cuando prefieras que nosotros hagamos el cambio por ti.' },
]

export const RUN_SAFE_POINTS = [
  { icon: 'layers', title: 'Solo lo que necesitas',      body: 'Tu editor muestra las cosas exactas que tu negocio cambia: precios, fotos, productos, horarios. Nada más.' },
  { icon: 'shield', title: 'Tus ediciones no pueden romperlo',     body: 'El diseño y la maquetación están fijados en los componentes. Cualquiera de tu equipo puede editar contenido sin romper el sitio.' },
  { icon: 'check',  title: 'Editar siempre es gratis',  body: 'Agrega, cambia y elimina contenido cuando quieras sin costo. Las tarifas solo aplican cuando quieres que lo hagamos por ti.' },
  { icon: 'zap',    title: 'A prueba de desastres por diseño', body: 'Tu contenido vive en almacenamiento separado y respaldado. Si el servidor público llegara a fallar, reconstruimos desde copias limpias en horas.' },
]

export const SECURITY_LEAD =
  'Construimos sobre una arquitectura headless y dinámico-estática: el sitio público y tu contenido real viven en lugares separados, y tus datos están respaldados en almacenamiento mantenido aparte del servidor en vivo. Así el servidor público es desechable — si alguna vez falla o es atacado, tu contenido queda intacto. Podríamos borrarlo por completo y no perder nada más que un poco de disponibilidad, volviendo a traer tus datos y redesplegando en cuestión de horas.'

export const SECURITY_POINTS = [
  { icon: 'layers', title: 'Separado por diseño',   body: 'Tu contenido y datos viven en su propio almacenamiento respaldado — no en el servidor público que reciben los visitantes.' },
  { icon: 'shield', title: 'Copias mantenidas aparte',    body: 'Las copias de seguridad independientes se guardan separadas del servidor en vivo, así que una falla o ataque en uno nunca alcanza al otro.' },
  { icon: 'clock',  title: 'De vuelta en horas',         body: 'Si el servidor público se borra, volvemos a traer tus datos y redesplegamos — tu sitio regresa en horas, sin perder nada más que un poco de disponibilidad.' },
  { icon: 'zap',    title: 'A prueba de todo por diseño',  body: 'Headless y servido de forma estática, el sitio público es desechable — podemos reconstruirlo por completo desde tus datos protegidos en cualquier momento.' },
]

export const PAGES_ITEMS = {
  intro:
    'Piensa en tu sitio web como un restaurante. Las páginas son los espacios — la entrada, el comedor, la pared de “sobre nosotros”. Los artículos son los platillos del menú: puedes tener muchos, y todos comparten un mismo diseño de menú.',
  pages:
    'Las páginas son las maquetaciones en sí — tu página de inicio, sobre nosotros, servicios. Tu paquete incluye 6 diseñadas por nosotros, y puedes armar hasta 4 más tú mismo desde la biblioteca de componentes, gratis (10 en total). La tarifa por página solo aplica cuando nosotros hacemos el diseño.',
  items:
    'Los artículos son las cosas individuales que esas páginas muestran — un solo producto, un platillo del menú, un listado. Diseñamos el aspecto una vez, y cada artículo que agregas lo usa automáticamente. Tu paquete incluye 25 artículos, y puedes agregar más cuando quieras.',
  savings:
    'Por qué esto te ahorra dinero: un catálogo de 40 productos es 1 página más 40 artículos — no 40 páginas. Pagas una vez por la maquetación, y luego un poco por agregar cada producto. Así consigues un catálogo completo de forma accesible — y puedes agrupar los artículos como quieras, sin cargo adicional.',
}

export const OWNERSHIP = [
  'Eres dueño de todo: tu dominio, sitio web, contenido, correo, número de teléfono y cada acceso.',
  'Te entregamos las llaves — toma tus recursos y vete cuando quieras. Sin ataduras, sin rescates.',
  'Si te vas, recibes una copia ejecutable de todo el sitio — un contenedor del sitio, la biblioteca de componentes (integrada y como código fuente) y tu exportación completa de contenido — con 30 días para recogerlo, extensibles a pedido hasta un tope máximo de 120. La salida está diseñada, no castigada.',
  'Nunca gestionamos ni autorizamos tu gasto en anuncios, ni manejamos tu dinero.',
  'Precios transparentes, incluyendo cualquier costo de terceros (Google, dominio) facturado a ti directamente.',
  'Cada servicio es un entregable definido y de alcance fijo. Las combinaciones a la medida se cotizan por negocio.',
]

export const FAQS = [
  {
    q: '¿Qué obtengo exactamente si me voy — y puede otro desarrollador tomar el control?',
    a: 'Una copia completa y ejecutable de tu sitio — la salida es algo para lo que construimos, no que castigamos. Recibes una sola descarga limpia que contiene: un contenedor de tu sitio web (todo su front end funcional), la biblioteca de componentes tanto integrada en ese sitio como incluida por separado como código fuente, y una copia de tu CMS en su propia carpeta. Tu contenido — cada producto, listado, precio, foto y bloque de texto — se exporta en archivos limpios y portables. Tienes 30 días para recoger todo, extensibles a pedido hasta un tope máximo de 120 días, y lo que sea demasiado grande para entregar directamente lo movemos por una transferencia de nube a nube. Nota honesta: como el sitio corre sobre una arquitectura moderna (un contenedor más un CMS headless), levantarlo de nuevo en otro lugar es un trabajo para un desarrollador competente o una herramienta de código con IA capaz — no una restauración de un clic que harías tú mismo — pero todo lo que necesitan está en la caja, sin ninguna dependencia de nosotros después. Y esto no es un pasatiempo que abandonaremos: corremos nuestros propios sitios sobre la misma infraestructura bajo compromisos de varios años, así que la plataforma en la que está el tuyo es una de la que depende nuestro propio sustento.',
  },
  {
    q: '¿Puedo verlo antes de pagar algo?',
    a: 'Sí — antes de cualquier depósito, te construimos una demo gratis: tu negocio representado en nuestro sistema, para que puedas juzgar el ajuste del diseño y cómo se siente el editor antes de que cambie de manos un solo dólar. Es la forma más rápida de saber si somos los indicados para ti, y no cuesta más que un poco de tu tiempo. Somos nuevos y nos estamos ganando la confianza a propósito — la demo gratis es parte de cómo lo hacemos.',
  },
  {
    q: '¿De verdad soy dueño de todo? ¿Incluso del diseño?',
    a: 'Eres dueño de tu dominio, contenido, cuentas, imágenes y cada acceso por completo, desde el primer día. La biblioteca de componentes es la única pieza que licenciamos en vez de vender — y la licencia es generosa: obtienes el derecho perpetuo de usarla en tu sitio, comercialmente, incluso a través de cualquier desarrollador que contrates después para mantener o cambiar ese sitio. Los únicos límites: no puedes entregar la biblioteca a otra agencia, y no puedes usarla para construir otros proyectos que compitan — es la herramienta central de la que depende todo nuestro negocio, no un regalo para revender. Esa restricción nunca afecta a un negocio normal; tu sitio es tuyo para operar y modificar por siempre. Si vendes tu negocio, tu sitio, dominio, contenido y marca se transfieren con él — el comprador simplemente sigue operando bajo los mismos términos de la biblioteca.',
  },
  {
    q: '¿Tengo que usar sus cuentas? ¿Quién paga Shopify, mi dominio, el correo?',
    a: 'Tus cuentas son tuyas, y les pagas a esos proveedores directamente a sus tarifas — sin recargo de nuestra parte, y nunca nos ponemos entre tú y un proveedor. Tu dominio, tu plan de Shopify (o Square/Toast/Clover) y sus comisiones por transacción, tu correo — todo a tu nombre. La única cosa que operamos activamente y te facturamos más allá de tu plan es el correo de Google Workspace, si lo eliges. Incluso tu menú telefónico con IA es solo una instalación única de nuestra parte, y luego una suscripción de bajo costo a tu nombre. Todo lo demás, tú lo posees y lo pagas directamente, así que nunca quedas atado a nosotros por una factura.',
  },
  {
    q: '¿Pueden construirme una tienda en línea con checkout?',
    a: 'Sí — a través de una integración con plataforma externa ($400, único por integración). Conectamos tu sitio a un motor como Shopify: nuestros componentes son la tienda rápida y diseñada a la medida que ven tus clientes — la navegación e incluso el carrito viven en tu propio sitio — y la plataforma por debajo maneja el checkout, los pagos, los reembolsos y la sincronización del inventario con su seguridad de nivel bancario. Esa separación es intencional — los datos de tu tarjeta pertenecen a una empresa de pagos, no a ningún estudio pequeño — y mantiene todo el conjunto transferible. Los pedidos y reembolsos se manejan en el panel de la plataforma; el contenido de tu sitio se queda en tu CMS. (Los $400 son nuestra tarifa única de integración; el plan mensual propio de la plataforma y sus comisiones por transacción son aparte y los pagas tú directamente.)',
  },
  {
    q: '¿Cómo funcionan las páginas? ¿Puedo agregar las mías?',
    a: 'Los planes incluyen 6 páginas diseñadas por nosotros, y puedes armar hasta 4 más tú mismo desde la biblioteca de componentes — 10 en total — gratis. La tarifa de $75–200 por página solo aplica cuando quieres que NOSOTROS diseñemos una página nueva o reelaboremos una maquetación. Y recuerda que los artículos no son páginas: tus 40 productos viven en el CMS y fluyen hacia una sola maquetación de producto, así que un catálogo grande nunca se come tu conteo de páginas.',
  },
  {
    q: 'Tengo docenas de productos. ¿No costará una fortuna?',
    a: 'No — para esto es exactamente el modelo de páginas-vs-artículos. Productos, entradas de menú y listados son artículos: diseñamos la maquetación una vez y cada artículo la usa. Tu plan importa los primeros 25 por ti; después de eso, agregar artículos tú mismo es ilimitado y gratis, para siempre ($7/artículo solo si prefieres que hagamos la captura nosotros). Cuarenta productos es una página más cuarenta artículos — no cuarenta páginas.',
  },
  {
    q: '¿Puedo agregar un blog o sección de novedades después?',
    a: 'Sí. Un formato de publicación personalizado cuesta $125, único: diseñamos un nuevo tipo de contenido alrededor de tu negocio — entradas de blog, novedades, casos de estudio — y de ahí en adelante publicas entradas ilimitadas tú mismo, gratis.',
  },
  {
    q: '¿Y las fotos de producto?',
    a: 'Ese es nuestro servicio de renders CG: construimos un modelo 3D de tu producto una vez, y luego renderizamos cada toma que necesites a partir de él. Si vendes un producto en muchas variantes — digamos, 30 aromas del mismo frasco de vela — modelamos el frasco una vez y cada variante de etiqueta es solo un render adicional a $40–75, no un modelo nuevo. Las imágenes de toda una línea de productos por una fracción de la fotografía por producto. 15% de descuento al combinarlo con un sitio web.',
  },
  {
    q: '¿Mi precio de renovación va a subir cada año?',
    a: 'Tu tarifa de renovación se acuerda por escrito antes de que firmes — sin sorpresas, nunca. Los precios de hoy son tarifas iniciales y subirán para clientes nuevos a medida que crezca la demanda, pero los clientes existentes conservan precios justos y graduales. Lo ponemos en el contrato porque "el precio nunca cambia" es una promesa que nadie puede hacer con honestidad — "siempre sabrás el número por adelantado" sí es una que podemos hacer.',
  },
  {
    q: '¿Quién escribe y carga todo mi contenido?',
    a: 'Cualquiera de los dos. Editar tu propio sitio siempre es gratis e ilimitado — ese es el punto de tu CMS personalizado. Si prefieres delegarlo, importamos tus primeros 30 artículos gratis en Estándar (50 en Negocio en Línea Enhanced), y $7/artículo después de eso. Para la construcción en sí, te guiamos exactamente sobre lo que necesitamos desde el inicio para que el proyecto nunca se detenga por falta de contenido.',
  },
  {
    q: '¿La gente realmente encontrará mi negocio en línea?',
    a: 'Que te encuentren importa tanto como verse bien, así que construimos para ello. Cada sitio es rápido, mobile-first, y viene con datos estructurados limpios — el esquema legible por máquina que Google y los asistentes de IA leen para entender tu negocio — que es la base técnica que las búsquedas premian. También configuramos y verificamos tu Perfil de Empresa de Google ($300) para que aparezcas en Maps en búsquedas "cerca de mí". Lo que no haremos es venderte anuncios ni prometer un ranking #1 — cualquiera que garantice eso está adivinando. Te damos un sitio rápido, limpio y bien estructurado y una base local honesta; nunca tocamos tu gasto en anuncios ni tu dinero.',
  },
  {
    q: '¿Construyen para restaurantes, cafés y tiendas?',
    a: 'Sí — la comida y el comercio minorista encajan de forma natural. Tu menú o lista de productos vive como artículos, así que un menú completo con bebidas de temporada se diseña una vez y es tuyo para mantenerlo al día, gratis. Los pedidos en línea, las reservas y la lealtad corren a través de una integración con plataforma externa ($400): revestimos tu configuración de Square, Toast, Clover o Shopify para que combine con tu sitio, mientras los pagos y pedidos se quedan en el sistema seguro de la plataforma — nunca con nosotros. Agrega un menú QR ($120) para las mesas y el mostrador, y renovaciones de temporada ($45) para los menús navideños. Obtienes un sitio de café que se ve a la medida y maneja pedidos reales, sin que nosotros jamás retengamos tus ventas.',
  },
  {
    q: '¿Mi sitio combinará con mi marca — o se verá como una empresa de tecnología?',
    a: 'Se ve como tú, no como nosotros. El sistema de componentes es solo el esqueleto; un único archivo de tema define toda la personalidad — tipografías, colores, calidez, imágenes. La misma biblioteca construyó un sitio oscuro y cinematográfico de estudio de videojuegos, un sitio bilingüe y llamativo de contratista, y un sitio limpio de laboratorio universitario, y ninguno se parece al otro. Una cafetería recibe algo cálido, acogedor y con foco en las fotos; un despacho de abogados recibe algo sobrio y serio. Diseñamos según tu onda — el sistema compartido solo significa que llegamos ahí más rápido y más barato que empezando de una página en blanco.',
  },
  {
    q: '¿Cuánto tarda una construcción, y qué pasa si algo se rompe después?',
    a: 'Una construcción estándar tarda de una a dos semanas una vez que tenemos tu contenido; la Entrega Express ($400) te mueve al frente de la fila si la necesitas en días. Después del lanzamiento, el hosting administrado significa que SSL, copias de seguridad y disponibilidad quedan a cargo nuestro — y como tu contenido vive en almacenamiento separado y respaldado, podemos reconstruir desde copias limpias en horas si el servidor público llegara a fallar. Las ediciones que haces tú mismo no pueden romper el diseño (está fijado en los componentes), y si algo sale mal, le escribes directo a un equipo — no a una fila de tickets.',
  },
  {
    q: '¿Qué mantienen ustedes — y qué me toca a mí?',
    a: 'Nosotros mantenemos la maquinaria en marcha: hosting, seguridad, disponibilidad, copias de seguridad y arreglar cualquier error que sea nuestro. Lo que no hacemos es gestionar tu contenido del día a día ni rehacer tu diseño por nuestra cuenta — editar tus productos, precios, horarios y fotos es tuyo para hacerlo cuando quieras, gratis, en tu CMS (ese es todo el punto). Si prefieres que nosotros hagamos un cambio o agreguemos una página, esa es una simple solicitud pagada. Línea clara: nosotros somos dueños de que funcione; tú eres dueño de lo que dice.',
  },
  {
    q: '¿Trabajan con organizaciones sin fines de lucro?',
    a: 'Sí — contáctanos. Todavía no tenemos un descuento rígido para organizaciones sin fines de lucro, así que las manejamos caso por caso, y hemos exonerado costos de construcción por causas en las que creemos. También conectamos tu proveedor de donaciones (el que elijas) sin cargo de integración — las donaciones fluyen directo a ti, nunca a través de nosotros. Cuéntanos sobre tu organización y pondremos un arreglo justo por escrito.',
  },
  {
    q: '¿Cómo funciona el programa de referidos? ¿Puedo referir a una organización sin fines de lucro o al negocio de un amigo?',
    a: 'Cualquiera puede referir a cualquiera — clientes, amigos, otros dueños de negocio, organizaciones sin fines de lucro incluidas. Cuando alguien que envías firma y paga un paquete, ganas 10% de los primeros $600 y 5% de lo que exceda, pagado por Zelle el mismo día en que ambas partes se confirman entre sí. Sin registro, sin formularios: mencionan tu nombre, lo confirmamos contigo, listo.',
  },
]

// ---------------------------------------------------------------------------
// LOCATION_GUIDES — Spanish overrides. slug, marketId y state se mantienen
// idénticos al inglés (son claves / abreviatura de estado de EE. UU.).
// ---------------------------------------------------------------------------
export const LOCATION_GUIDES = [
  {
    slug: 'web-design-new-york',
    marketId: 'new-york',
    city: 'Nueva York', state: 'NY',
    metaTitle: 'Diseño web para pequeños negocios en la Ciudad de Nueva York',
    metaDescription: 'Sitios web a la medida, renders de producto y configuración de negocio para empresas de Nueva York en los cinco condados — precio fijo, y tú eres dueño de todo. English & Español.',
    lead: 'Sitios web a la medida y visuales de producto para pequeños negocios de Nueva York — creados para destacar en el mercado más competitivo del país, y de tu propiedad por completo.',
    intro: [
      'En una ciudad donde cada cuadra tiene competencia, un sitio de plantilla genérica desaparece. Les construimos a los pequeños negocios de Nueva York un sitio diseñado a la medida sobre nuestro propio sistema de componentes — el pulido de una construcción hecha a la medida por una fracción del costo de una agencia — para que te veas tan establecido en línea como lo eres en tu vecindario.',
      'Desde locales en Manhattan hasta estudios en Brooklyn y negocios de servicios en Queens, estamos listos para trabajar con dueños en los cinco condados, de forma remota. Conservas tu dominio, tu contenido y cada acceso — sin ataduras, en inglés o español.',
    ],
    whyTitle: 'Por qué importa en Nueva York',
    why: [
      'La búsqueda es hiperlocal: las búsquedas de "cerca de mí" y por nombre de condado deciden a quién le llaman. Configuramos tu sitio y tu Perfil de Empresa de Google para que aparezcas en los vecindarios correctos.',
      'La vara está alta. Los clientes de Nueva York juzgan en segundos — un sitio limpio, rápido y a la medida transmite que eres de verdad.',
      'Bilingüe por defecto: conecta con los clientes hispanohablantes de Nueva York con un sitio totalmente traducido, sin recargo de diseño.',
    ],
    faq: [
      { q: '¿Se reúnen en persona con clientes en Nueva York?', a: 'Trabajamos con los clientes de Nueva York de forma remota — llamadas, correo y pantalla compartida — lo que mantiene bajos los costos y ágiles los tiempos. Las visitas en persona están reservadas para el área de Boston.' },
      { q: '¿Pueden ayudar a que mi negocio aparezca en Google Maps en mi condado?', a: 'Sí. La configuración del Perfil de Empresa de Google ($300) es uno de nuestros complementos más populares para los negocios locales de NYC — muchas veces importa más que cualquier cosa dentro del sitio en sí.' },
      { q: '¿Construyen tiendas en línea para comercios de NYC?', a: 'Construimos un escaparate limpio revestido sobre Square o Shopify, para que los clientes vean producto y disponibilidad en vivo — mientras el checkout, los pagos y los datos del cliente se quedan con la seguridad de nivel bancario de la plataforma.' },
    ],
  },
  {
    slug: 'web-design-boston',
    marketId: 'boston',
    city: 'Boston', state: 'MA',
    metaTitle: 'Diseño web para pequeños negocios en Boston, MA',
    metaDescription: 'Sitios web a la medida, renders de producto y configuración de negocio para empresas del área de Boston — desde Roxbury hasta el Seaport. Precio fijo, propiedad total, en persona en Boston.',
    lead: 'Sitios web a la medida y visuales de producto para pequeños negocios de Boston — el único mercado donde trabajamos en persona, desde Roxbury hasta el Seaport.',
    intro: [
      'Boston es nuestra base. Es el único mercado donde nos reunimos con los clientes cara a cara — conociendo tu espacio, entendiendo a tus clientes y construyendo un sitio que encaje con el vecindario, ya sea una boutique en el South End o un negocio familiar en Dorchester.',
      'Cada sitio se diseña a la medida sobre nuestra propia biblioteca de componentes, así que obtienes un look hecho a la medida sin la factura de agencia. Eres dueño total de tu dominio, tu contenido y tus accesos — y todo se entrega en inglés, español o ambos.',
    ],
    whyTitle: 'Por qué importa en Boston',
    why: [
      'Somos locales: los clientes de Boston tienen reuniones en persona — el único mercado donde eso está sobre la mesa.',
      'La búsqueda por vecindario gana: desde Back Bay hasta Jamaica Plain, ajustamos tu sitio y tu presencia en Maps a las zonas que realmente atiendes.',
      'La velocidad cuenta: el público concurrido y mobile-first de Boston no va a esperar por un sitio lento — los nuestros puntúan alto en velocidad y son legibles por asistentes de IA de fábrica.',
    ],
    faq: [
      { q: '¿Podemos reunirnos en persona?', a: 'Sí — Boston es el único mercado donde las reuniones en persona son lo estándar. Podemos ir a ti en cualquier punto del área metropolitana, de Charlestown a Dorchester.' },
      { q: '¿Con qué vecindarios de Boston trabajan?', a: 'Con todos — Roxbury, el South End, Seaport, Back Bay, Dorchester, Jamaica Plain y más allá. Ajustamos tu SEO local a las zonas que atiendes.' },
      { q: '¿Trabajan con negocios bilingües de Boston?', a: 'Por completo. Los sitios totalmente en inglés/español vienen integrados sin recargo de diseño — una ventaja real en los diversos vecindarios de Boston.' },
    ],
  },
  {
    slug: 'web-design-north-houston',
    marketId: 'north-houston',
    city: 'Norte de Houston', state: 'TX',
    metaTitle: 'Diseño web para pequeños negocios en el Norte de Houston, TX',
    metaDescription: 'Sitios web a la medida, renders de producto y configuración de negocio para The Woodlands, Klein, Spring y Tomball — precio fijo, propiedad total, English & Español.',
    lead: 'Sitios web a la medida y visuales de producto para pequeños negocios por todo el Norte de Houston — The Woodlands, Klein, Spring y Tomball.',
    intro: [
      'El Norte de Houston está en pleno auge, y cada día nuevos clientes buscan negocios locales. Les construimos a los dueños en The Woodlands, Klein, Spring y Tomball un sitio a la medida sobre nuestro propio sistema de componentes — para que un negocio en crecimiento luzca a la altura sin un presupuesto de agencia.',
      'Trabajamos con los clientes del Norte de Houston de forma remota, en inglés o español, y tú eres dueño de todo: tu dominio, tu contenido y cada acceso. Sin ataduras, sin sorpresas.',
    ],
    whyTitle: 'Por qué importa en el Norte de Houston',
    why: [
      'Suburbios de rápido crecimiento significan competencia de rápido crecimiento — un sitio a la medida y rápido te ayuda a destacar a medida que la zona se llena.',
      'La búsqueda local lo es todo: configuramos tu sitio y tu Perfil de Empresa de Google para que los clientes de Woodlands y Spring te encuentren primero.',
      'Alcance bilingüe: un sitio totalmente traducido al español te conecta con la gran comunidad hispana del Norte de Houston, sin recargo de diseño.',
    ],
    faq: [
      { q: '¿Se reúnen en persona con clientes en Houston?', a: 'Trabajamos con los clientes del Norte de Houston de forma remota, lo que mantiene los tiempos ágiles y los costos bajos. Las reuniones en persona están reservadas para el área de Boston, pero las llamadas y la pantalla compartida cubren todo lo que necesitamos.' },
      { q: '¿Qué zonas del Norte de Houston cubren?', a: 'The Woodlands, Klein, Spring y Tomball, además de las comunidades circundantes del Norte de Houston.' },
      { q: '¿Pueden ayudarme a posicionar específicamente en mi ciudad?', a: 'Sí — optimizamos tu sitio y tu Perfil de Empresa de Google para las ciudades específicas que atiendes, para que no te pierdas entre los resultados del gran Houston.' },
    ],
  },
  {
    slug: 'web-design-dallas',
    marketId: 'dallas',
    city: 'Dallas', state: 'TX',
    metaTitle: 'Diseño web para pequeños negocios en Dallas, TX',
    metaDescription: 'Sitios web a la medida, renders de producto y configuración de negocio para Dallas, Irving y Grand Prairie — precio fijo, propiedad total, English & Español.',
    lead: 'Sitios web a la medida y visuales de producto para pequeños negocios por todo el área metropolitana de Dallas — incluyendo Irving y Grand Prairie.',
    intro: [
      'Nuestro primerísimo sitio de cliente fue para un electricista de Dallas — así que el área metropolitana nos queda cerca del corazón. Les construimos a los negocios del área de Dallas sitios a la medida sobre nuestro propio sistema de componentes: enfocados en la confianza, rápidos, con formularios de cotización que llegan directo al dueño.',
      'Atendemos Dallas, Irving y Grand Prairie de forma remota, en inglés o español. Eres dueño total de tu dominio, tu contenido y cada acceso — sin ataduras, nunca.',
    ],
    whyTitle: 'Por qué importa en Dallas',
    why: [
      'Los negocios de servicios viven o mueren por la llamada: construimos sitios enfocados en la confianza con formularios de cotización que te llegan al instante.',
      'La búsqueda en el área metropolitana es competitiva: ajustamos tu sitio y tu Perfil de Empresa de Google a Irving, Grand Prairie y tu rincón del DFW.',
      'Bilingüe por defecto: conecta con el gran mercado hispanohablante de Dallas con un sitio totalmente traducido, sin recargo de diseño.',
    ],
    faq: [
      { q: '¿Han construido antes para negocios de Dallas?', a: 'Sí — nuestro primer sitio de cliente fue Angel Electrical Services, un electricista con licencia en Dallas: diseño enfocado en la confianza con un formulario de cotización que llega al dueño.' },
      { q: '¿Qué zonas de Dallas atienden?', a: 'Dallas propiamente, además de Irving, Grand Prairie y el área metropolitana circundante.' },
      { q: '¿Se reúnen en persona en Dallas?', a: 'Trabajamos con los clientes de Dallas de forma remota, lo que mantiene todo ágil y accesible. Las reuniones en persona son una oferta exclusiva de Boston, pero las llamadas y la pantalla compartida se encargan de todo.' },
    ],
  },
]

