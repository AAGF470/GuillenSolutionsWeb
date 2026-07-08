import { Link } from 'react-router-dom'
import { HeroSection, CtaBanner, Faq, FeatureGrid } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import PackageConfigurator from '../components/PackageConfigurator.jsx'
import PlanFinder from '../components/PlanFinder.jsx'
import { Estimator } from './OnDemand.jsx'
import { pricingSchema } from '../schema'
import { useContent } from '../content.js'
import { CONTACT_EMAIL } from '../data.js'
import { useT } from '../i18n.jsx'
import './OnDemand.css'
import './Pricing.css'

// ---------------------------------------------------------------------------
// Pricing & order — the working page, not another brochure. Visitors arrive
// here having seen the plans elsewhere, so this page is just the two tools
// with a compact explainer rail beside them. Configurator = new orders
// (plan + launch add-ons); estimator = on-demand work for live sites.
// ---------------------------------------------------------------------------

function Rail() {
  const t = useT()
  return (
    <aside className="gs-rail">
      <div className="gs-rail__card">
        <h3>{t('Included vs. add-ons', 'Incluido vs. complementos')}</h3>
        <p>
          {t(
            'Every plan already covers design, hosting, SSL, backups, your domain, and your own editor. Add-ons are optional launch extras: phone line, email, logo, forms, rush delivery. Plan details:',
            'Cada plan ya incluye diseño, hosting, SSL, copias de seguridad, tu dominio y tu propio editor. Los complementos son extras opcionales de lanzamiento: línea telefónica, correo, logo, formularios, entrega urgente. Detalles de los planes:',
          )}{' '}
          <Link to="/plans/freelance">Freelance</Link> ·{' '}
          <Link to="/plans/standard">{t('Standard', 'Estándar')}</Link> ·{' '}
          <Link to="/plans/enhanced">{t('Enhanced', 'Enhanced')}</Link> ·{' '}
          <Link to="/plans/private-hosting">{t('Private Hosting', 'Hosting Privado')}</Link>
        </p>
      </div>
      <div className="gs-rail__card">
        <h3>{t('Pages vs. items', 'Páginas vs. artículos')}</h3>
        <p>
          {t(
            'Pages are the layouts: 6 designed by us, plus up to 4 you assemble yourself from the component library, free (10 total). Items are the things they list — products, dishes, listings — all sharing one design (25 imported, then unlimited self-serve, free). A 40-product catalog is 1 page plus 40 items, not 40 pages.',
            'Las páginas son los diseños: 6 diseñadas por nosotros, más hasta 4 que armas tú mismo desde la biblioteca de componentes, gratis (10 en total). Los artículos son las cosas que listan — productos, platillos, anuncios — todos compartiendo un mismo diseño (25 importados, luego ilimitados de autoservicio, gratis). Un catálogo de 40 productos es 1 página más 40 artículos, no 40 páginas.',
          )}
        </p>
      </div>
      <div className="gs-rail__card">
        <h3>{t('On-demand, later', 'A pedido, después')}</h3>
        <p>
          {t(
            'Newsletters, landing pages, QR menus, seasonal swaps, translations — added after launch, whenever you need them. Nothing to decide today; estimate below or see',
            'Boletines, páginas de aterrizaje, menús QR, cambios de temporada, traducciones — se agregan después del lanzamiento, cuando los necesites. Nada que decidir hoy; estima abajo o mira',
          )}{' '}
          <Link to="/on-demand">{t('the full menu', 'el menú completo')}</Link>.
        </p>
      </div>
    </aside>
  )
}

export default function Pricing() {
  const t = useT()
  const {
    PRICING_PROMISE,
    FAQS,
    PACKAGES,
    BASELINE_INCLUDES,
    ADDONS,
    ON_DEMAND,
  } = useContent()
  const catalog = [...ADDONS, ...ON_DEMAND]
  return (
    <>
      <Seo
        title={t('Pricing & Order', 'Precios y pedido')}
        description={t(
          'Build your order: pick a plan and add-ons for an all-in number, or estimate on-demand work for a live site. Every figure confirmed in writing.',
          'Arma tu pedido: elige un plan y complementos para un número todo incluido, o estima trabajo a pedido para un sitio en vivo. Cada cifra confirmada por escrito.',
        )}
        path="/pricing"
        schema={pricingSchema}
      />
      <HeroSection
        eyebrow={t('Pricing & order', 'Precios y pedido')}
        headline={t('Price it yourself, right here.', 'Ponle precio tú mismo, aquí mismo.')}
        subtext={`${t(
          "Pick a plan and any add-ons for a transparent, all-in number, or estimate on-demand work for a site that's already live.",
          'Elige un plan y los complementos que quieras para un número transparente, todo incluido, o estima trabajo a pedido para un sitio que ya está en vivo.',
        )} ${PRICING_PROMISE}`}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      {/* Not sure where to start: the 60-second plan finder */}
      <section id="finder" className="section section--alt gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('Not sure where to start?', '¿No sabes por dónde empezar?')}</p>
          <h2 className="section-title">{t('Find your plan in 60 seconds', 'Encuentra tu plan en 60 segundos')}</h2>
          <p className="section-sub">
            {t(
              'Four quick questions, one clear recommendation — a full package with a real number, sent as a request in one click. Prefer full control? The complete builder is right below.',
              'Cuatro preguntas rápidas, una recomendación clara — un paquete completo con un número real, enviado como solicitud en un clic. ¿Prefieres control total? El configurador completo está justo abajo.',
            )}
          </p>
          <PlanFinder />
        </div>
      </section>

      {/* What every plan includes — the shared baseline, before any tier */}
      <section className="section section--default gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('In every plan', 'En cada plan')}</p>
          <h2 className="section-title">{t('What every plan includes', 'Lo que incluye cada plan')}</h2>
          <p className="section-sub">
            {t(
              'No tier is charged more for the essentials. These come with every plan on this page — from the smallest to the largest.',
              'Ningún nivel paga más por lo esencial. Esto viene con cada plan de esta página — del más pequeño al más grande.',
            )}
          </p>
          <FeatureGrid items={BASELINE_INCLUDES} columns={4} />
        </div>
      </section>

      {/* The four plans — full detail cards with every feature listed */}
      <section id="plans" className="section section--alt gs-seam-top gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('Pick a starting point', 'Elige un punto de partida')}</p>
          <h2 className="section-title">{t('The four plans', 'Los cuatro planes')}</h2>
          <p className="section-sub">
            {t(
              'Every plan is a real, all-in number — everything above is already inside. Add optional extras below, or build your full quote in the configurator.',
              'Cada plan es un número real, todo incluido — todo lo de arriba ya está adentro. Agrega extras opcionales abajo, o arma tu cotización completa en el configurador.',
            )}
          </p>
          <div className="gs-plans">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`gs-plan${pkg.featured ? ' gs-plan--featured' : ''}${pkg.tbd ? ' gs-plan--tbd' : ''}`}
              >
                {pkg.badge && <span className="gs-plan__badge">{pkg.badge}</span>}
                <p className="gs-plan__tag">{pkg.tag}</p>
                <h3 className="gs-plan__name">{pkg.name}</h3>
                <p className="gs-plan__price">
                  <span className="gs-plan__amount">{pkg.price}</span>
                  {pkg.period && <span className="gs-plan__period">{pkg.period}</span>}
                </p>
                <p className="gs-plan__desc">{pkg.description}</p>
                <ul className="gs-plan__features">
                  {pkg.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                {pkg.note && <p className="gs-plan__note">{pkg.note}</p>}
                {pkg.tbd ? (
                  <a className="gs-plan__cta gs-plan__cta--ghost" href={`mailto:${CONTACT_EMAIL}`}>
                    {t('Talk to us', 'Habla con nosotros')}
                  </a>
                ) : (
                  <Link className="gs-plan__cta" to="/pricing#order">
                    {t('Build your quote', 'Arma tu cotización')}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on library — the full optional catalog, scannable */}
      <section id="addons" className="section section--default gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('Optional extras', 'Extras opcionales')}</p>
          <h2 className="section-title">{t('Add-on library', 'Biblioteca de complementos')}</h2>
          <p className="section-sub">
            {t(
              'Everything you can add — at launch or any time after. Prices are identical on every plan; nothing here is required to get started.',
              'Todo lo que puedes agregar — al lanzar o en cualquier momento después. Los precios son idénticos en cada plan; nada de esto es obligatorio para empezar.',
            )}
          </p>
          <div className="gs-addons">
            {catalog.map((a) => (
              <div key={a.id} className="gs-addon">
                <div className="gs-addon__head">
                  <span className="gs-addon__name">{a.name}</span>
                  <span className="gs-addon__price">{a.price}</span>
                </div>
                <p className="gs-addon__cadence">{a.cadence}</p>
                <p className="gs-addon__body">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations — the two sizes, explained plainly */}
      <section id="integrations" className="section section--alt gs-seam-top gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('Connecting outside services', 'Conectando servicios externos')}</p>
          <h2 className="section-title">{t('Integrations, two sizes', 'Integraciones, dos tamaños')}</h2>
          <p className="section-sub">
            {t(
              'When your site needs to talk to something outside it, we build a clean visual layer over that service — no messy embeds.',
              'Cuando tu sitio necesita comunicarse con algo externo, construimos una capa visual limpia sobre ese servicio — sin incrustaciones desordenadas.',
            )}
          </p>
          <div className="gs-integrations">
            <div className="gs-integration">
              <p className="gs-integration__size">{t('Small integration', 'Integración pequeña')}</p>
              <p className="gs-integration__price">
                {t('Included in Enhanced · add-on otherwise', 'Incluida en Enhanced · complemento en los demás')}
              </p>
              <p className="gs-integration__body">
                {t(
                  'A simple visual skin over one outside service — a newsletter signup, a donation display, and the like. It looks native to your site instead of a bolted-on widget. Comes free with the Online Business Enhanced plan; a small add-on on any other plan.',
                  'Una capa visual sencilla sobre un servicio externo — un registro a boletín, un contador de donaciones y similares. Se ve nativa de tu sitio en lugar de un widget pegado. Gratis con el plan Online Business Enhanced; un pequeño complemento en cualquier otro plan.',
                )}
              </p>
            </div>
            <div className="gs-integration gs-integration--large">
              <p className="gs-integration__size">{t('Large integration', 'Integración grande')}</p>
              <p className="gs-integration__price">{t('from $400', 'desde $400')}</p>
              <p className="gs-integration__body">
                {t(
                  'A Square or Shopify product CMS as the visual skin, with your CMS reading live product and availability counts so the site stays accurate — "know before you go." We do NOT handle carts, checkout, payments, or customer data — those stay with the platform and its bank-grade security. Fully transferable. $400 is the starting point for services with clean APIs; quoted higher after we assess yours.',
                  'Un CMS de productos de Square o Shopify como capa visual, con tu CMS leyendo conteos de productos y disponibilidad en vivo para que el sitio siga siendo preciso — "sabe antes de ir." NO manejamos carritos, pago, cobros ni datos de clientes — eso se queda con la plataforma y su seguridad de grado bancario. Totalmente transferible. $400 es el punto de partida para servicios con APIs limpias; se cotiza más alto tras evaluar el tuyo.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New orders: configurator with the explainer rail beside it */}
      <section id="order" className="section section--default gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('New site', 'Sitio nuevo')}</p>
          <h2 className="section-title">{t('Build your order', 'Arma tu pedido')}</h2>
          <div className="gs-order">
            <div className="gs-order__main">
              <PackageConfigurator />
            </div>
            <Rail />
          </div>
        </div>
      </section>

      {/* Existing sites: on-demand estimator */}
      <section id="estimate" className="section section--alt gs-seam-top">
        <div className="section-container">
          <p className="section-eyebrow">{t('Already launched?', '¿Ya lanzaste?')}</p>
          <h2 className="section-title">{t('Estimate on-demand work', 'Estima trabajo a pedido')}</h2>
          <p className="section-sub">
            {t(
              'One-time jobs, per-unit work, and quoted items in one running total.',
              'Trabajos únicos, trabajo por unidad y artículos cotizados en un solo total acumulado.',
            )}
          </p>
          <Estimator />
        </div>
      </section>

      {/* The questions buyers (and their AI assistants) actually ask */}
      <Faq
        eyebrow={t('Before you decide', 'Antes de decidir')}
        headline={t('The questions people actually ask', 'Las preguntas que la gente realmente hace')}
        subtext={t(
          "Exit policy, ownership, online stores, page limits, referrals — answered plainly. If yours isn't here, just ask.",
          'Política de salida, propiedad, tiendas en línea, límites de páginas, referidos — respondidas con claridad. Si la tuya no está aquí, solo pregunta.',
        )}
        items={FAQS}
        single
        variant="default"
      />

      <CtaBanner
        eyebrow={t('Prefer to just talk?', '¿Prefieres solo hablar?')}
        headline={t("Tell us what you need and we'll price it in writing.", 'Dinos qué necesitas y te lo cotizamos por escrito.')}
        subtext={t(
          'Boston in person, everywhere else remote. English or Español.',
          'Boston en persona, todo lo demás remoto. En inglés o español.',
        )}
        cta={{ label: t('Get in touch', 'Contáctanos'), href: 'mailto:contact@guillensolutions.com' }}
        variant="accent"
      />
    </>
  )
}
