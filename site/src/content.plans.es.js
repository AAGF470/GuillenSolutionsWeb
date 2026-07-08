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
      { icon: 'home',   title: 'Profesor de música',        body: 'Tus clases, tarifas y estudio, más un formulario de inscripción para nuevos alumnos y una lista de espera cuando estés lleno.' },
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

  enhanced: {
    seo: {
      title: 'El Plan Negocio en Línea Enhanced — ~$1,900 el primer año',
      description: 'Todo lo del plan Estándar, pero más grande — más gestión activa para dueños que preferirían no encargarse ellos mismos de las actualizaciones. 12 páginas, 50 artículos importados, mantenimiento mensual de SEO, cambios de temporada y más. ~$1,900 el primer año, luego ~$650/año. Eres dueño de todo.',
    },
    hero: {
      eyebrow: 'Negocio en Línea Enhanced · ~$1,900 el primer año · gestionado activamente',
      headline: 'Todo lo del plan Estándar, pero más grande — y nosotros hacemos las actualizaciones por ti.',
      subtext: 'Doce páginas diseñadas a la medida, un catálogo más grande y un equipo que lo mantiene al día sin ruido — mantenimiento mensual de SEO, renovaciones de temporada, un formulario de contacto personalizado y más. Para dueños que quieren un sitio en crecimiento sin convertirse en su webmaster.',
    },
    whoTitle: 'Hecho para dueños que preferirían dedicarse al negocio',
    whoSub: 'Cuando el sitio importa pero tu tiempo rinde más en otra parte, la gestión activa se gana su lugar:',
    who: [
      { icon: 'star',   title: 'Dueño de restaurante ocupado',   body: 'Menús de temporada y promos navideñas cambiados por ti dos veces al año — tú cocinas, nosotros mantenemos el sitio fresco.' },
      { icon: 'layers', title: 'Comercio en crecimiento',        body: '50 artículos importados, más agregados cuando quieras y una integración pequeña para que tu catálogo se mantenga preciso — sin que toques una hoja de cálculo.' },
      { icon: 'fence',  title: 'Contratista establecido',   body: 'Doce páginas de oficios y galerías de proyectos, rediseñadas dos veces al año a medida que crece tu trabajo — bien posicionado con mantenimiento mensual de SEO.' },
      { icon: 'globe',  title: 'Negocio bilingüe',      body: 'Traducción completa al español incluida, para que ambos públicos reciban un sitio de primera — no una ocurrencia traducida por máquina.' },
      { icon: 'zap',    title: 'Negocio de temporada',       body: 'Dos cambios de temporada al año hechos por ti — el aviso de tormenta, el banner navideño, el horario de verano — puestos y quitados a tiempo.' },
      { icon: 'users',  title: 'Dueño que no iniciará sesión',  body: 'Puedes editar cuando quieras, gratis — pero preferirías no hacerlo. La gestión activa significa que los cambios simplemente se hacen, y tú los apruebas.' },
    ],
    getTitle: 'Qué incluye realmente los ~$1,900',
    get: [
      'Todo lo del plan Estándar — pero más grande: hasta 12 páginas (8 diseñadas por nosotros + 4 que armas tú), 4 formatos de publicación en el CMS, 50 artículos importados, 30 GB de almacenamiento.',
      'Gestión activa: mantenimiento mensual de SEO y 2 cambios de temporada al año, hechos por ti.',
      'Un formulario de contacto personalizado y una integración pequeña configurados como parte del plan — sin tarifas de complemento aparte.',
      'Traducción completa al español de tu sitio, hecha a mano por un hablante nativo — ambos idiomas, de primera.',
      '2 rediseños de página al año incluidos, luego 50% de descuento en cualquier rediseño adicional — más un menú QR para las mesas y el mostrador.',
      '20% de descuento en cualquier trabajo de renders CG al combinarlo — más que el 15% estándar.',
    ],
    getNote: 'Luego ~$650/año — la gestión activa es trabajo continuo, así que la tarifa recurrente es más alta que la de un plan autogestionado. Acordado por escrito antes de que firmes.',
    steps: [
      { title: 'Conocemos tu negocio', body: 'Qué vendes, cómo te encuentran los clientes y qué preferirías no tener que tocar tú mismo. En inglés o español.' },
      { title: 'Diseñamos y traducimos', body: 'Hasta 12 páginas compuestas desde nuestra biblioteca de componentes, adaptadas a ti y traducidas por completo al español — revisadas en una vista previa en vivo.' },
      { title: 'Importamos e integramos', body: 'Tus primeros 50 artículos entran como contenido estructurado, tu formulario de contacto y tu integración pequeña quedan conectados, y tu menú QR está listo.' },
      { title: 'Lo mantenemos en marcha', body: 'Mantenimiento mensual de SEO, cambios de temporada y tus rediseños incluidos — hechos según un calendario. Tú apruebas; nosotros hacemos el trabajo.' },
    ],
    faq: [
      { q: '¿Qué cubre exactamente la "gestión activa"?', a: 'Mantenimiento mensual de SEO, dos cambios de contenido de temporada al año, un formulario de contacto personalizado, una integración pequeña, traducción completa al español, dos rediseños de página al año (luego 50% de descuento en los siguientes) y un menú QR — todo incluido, no facturado como complementos aparte. Es el trabajo continuo de mantener un sitio al día, hecho por ti.' },
      { q: '¿En qué se diferencia esto del plan Estándar?', a: 'Estándar es el mismo gran sitio, autogestionado: tú haces los cambios, gratis, en tu CMS. Enhanced es más grande (12 páginas vs. 10, 50 importaciones vs. 30, 4 formatos de publicación vs. 2) y agrega un equipo que hace las actualizaciones por ti. Si preferirías no iniciar sesión, este es el plan.' },
      { q: '¿Por qué la tarifa recurrente es ~$650 en vez de ~$350?', a: 'Porque la gestión activa es trabajo real y continuo — el SEO mensual, los cambios de temporada y los rediseños incluidos son labor cada año, no solo hosting. Los $350 de Estándar son hosting y dominio; los ~$650 de Enhanced son eso más la gestión. Ambos se acuerdan por escrito antes de que firmes.' },
    ],
    cta: { eyebrow: 'Un sitio que crece sin el trabajo repetitivo', headline: 'Construyamos el sitio más grande — y lo mantenemos al día por ti.', subtext: 'Arma una cotización en un minuto — o contáctanos y lo conversamos.' },
  },

  'private-hosting': {
    seo: {
      title: 'El Plan de Hosting Privado — en desarrollo',
      description: 'Para clientes que quieren WordPress o su propio servidor aislado / dedicado — con máxima portabilidad, mantenido fuera de nuestra infraestructura principal, para que cualquier desarrollador pueda tomar el control. Las especificaciones y el precio se están finalizando — contáctanos para conversarlo.',
    },
    hero: {
      eyebrow: 'Plan de Hosting Privado · en desarrollo',
      headline: 'Tu propio servidor, máxima portabilidad — conversémoslo.',
      subtext: 'Para clientes que quieren WordPress o su propio servidor aislado y dedicado, mantenido fuera de nuestra infraestructura principal para que cualquier desarrollador en cualquier lugar pueda tomar el control. Todavía estamos finalizando las especificaciones y el precio, así que este empieza con una conversación, no con una cotización fija.',
    },
    whoTitle: 'Cuándo una configuración privada es la decisión correcta',
    whoSub: 'A la mayoría de los negocios les sirve mejor nuestra propia infraestructura — pero una configuración dedicada o de WordPress gana en situaciones específicas:',
    who: [
      { icon: 'globe',  title: 'La independencia del proveedor primero', body: 'Quieres la opción de entregar todo el conjunto a cualquier agencia o freelancer, en cualquier lugar, sin nada atado a nosotros.' },
      { icon: 'shield', title: 'Requisitos de aislamiento',    body: 'Necesitas tu sitio mantenido en su propio servidor dedicado o aislado, aparte de cualquier infraestructura compartida.' },
      { icon: 'layers', title: 'WordPress específicamente',    body: 'Quieres WordPress — por su ecosistema de plugins, un equipo interno que ya lo conoce o un editor al que estás acostumbrado.' },
      { icon: 'check',  title: 'Máxima portabilidad',       body: 'Poder mover todo el conjunto a cualquier host, mantenido por cualquier desarrollador, te importa más que cualquier otra cosa.' },
    ],
    getTitle: 'Qué estamos finalizando todavía',
    get: [
      'La plataforma: WordPress, o tu propio servidor dedicado / administrado — elegido contigo.',
      'Máxima portabilidad, para que cualquier desarrollador pueda mantenerlo, extenderlo o moverlo.',
      'Mantenido fuera de nuestra infraestructura principal, en su propia infraestructura aislada.',
      'Los detalles de páginas, CMS e importaciones — definiéndose alrededor de lo que realmente necesitas.',
      'El precio — establecido con honestidad una vez que el alcance esté claro, acordado por escrito antes de que empiece cualquier cosa.',
    ],
    getNote: 'Este plan está en desarrollo: las especificaciones y el precio se están finalizando, así que lo definimos contigo en vez de cotizar un número fijo de entrada. Contáctanos y conversamos qué encaja.',
    steps: [
      { title: 'Cuéntanos qué necesitas', body: '¿WordPress o un servidor dedicado? ¿Qué tiene que ser portable, aislado o mantenido aparte? En inglés o español.' },
      { title: 'Definimos el alcance con honestidad', body: 'Investigamos qué requiere realmente tu configuración y definimos la plataforma, las páginas y el CMS alrededor de ello — sin adivinar, sin rellenar.' },
      { title: 'Le ponemos precio por escrito', body: 'Una vez que el alcance esté claro, ponemos un número justo y la tarifa recurrente por escrito — nada empieza hasta que lo hayas visto.' },
      { title: 'Lo construimos portable', body: 'Configurado en tu propio servidor o WordPress, a tu nombre, para que cualquier desarrollador pueda tomar el control. Es tuyo por completo.' },
    ],
    faq: [
      { q: '¿Por qué todavía no hay un precio fijo?', a: 'Este plan genuinamente sigue en desarrollo. Una configuración dedicada o de WordPress varía mucho según lo que necesites — el servidor, la plataforma, las integraciones — así que ponerle precio con honestidad significa definir el alcance contigo primero, y luego poner un número real por escrito. Preferimos eso a cotizar un valor provisional que tendríamos que cambiar.' },
      { q: '¿En qué se diferencia esto de tu plan Estándar?', a: 'Estándar corre sobre nuestra propia infraestructura headless y rápida, que es más barata y fácil de mantener segura para nosotros. Este plan es para cuando específicamente quieres WordPress o tu propio servidor aislado / dedicado — con máxima portabilidad y fuera de nuestra infraestructura principal — y estás dispuesto a cambiar nuestra eficiencia por esa independencia.' },
      { q: '¿Puede cualquier desarrollador tomar el control de esto?', a: 'Sí — ese es todo el punto. WordPress o un servidor dedicado estándar, a tu nombre, con el acceso completo entregado. Cualquier desarrollador competente puede tomarlo sin ninguna dependencia de nosotros.' },
    ],
    cta: { eyebrow: 'En desarrollo — definámoslo juntos', headline: 'Cuéntanos qué necesitas y averiguamos la configuración correcta.', subtext: 'Contáctanos y lo conversamos — sin cotización fija, solo una conversación honesta sobre qué encaja.' },
  },
}
