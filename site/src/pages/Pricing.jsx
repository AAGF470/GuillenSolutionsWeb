import { Link } from 'react-router-dom'
import { HeroSection, CtaBanner, Faq, FeatureGrid, VoiceSample } from '@aagf470/ui'
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
// Pricing & order — the working page, not another brochure. The order builder
// leads (it's the thing people came to do): pick a plan, add what you need,
// watch the total on a sticky calculator + request form. Everything below the
// builder is reference — the shared baseline, the four plans in full, how
// integrations work, and an on-demand estimator for sites already live.
// ---------------------------------------------------------------------------

export default function Pricing() {
  const t = useT()
  const {
    PRICING_PROMISE,
    FAQS,
    PACKAGES,
    BASELINE_INCLUDES,
  } = useContent()
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
          'Pick a plan, add only what you need, and watch the all-in number update as you go. Full plan details and everything included are just below.',
          'Elige un plan, agrega solo lo que necesitas y observa cómo se actualiza el número todo incluido. Los detalles completos de cada plan están justo abajo.',
        )} ${PRICING_PROMISE}`}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      {/* The order builder leads — plan + add-ons on the left, a sticky
          calculator + request form on the right, always in view. */}
      <section id="order" className="section section--default gs-seam-bottom">
        <div className="section-container gs-wide">
          <p className="section-eyebrow">{t('Build your order', 'Arma tu pedido')}</p>
          <h2 className="section-title">{t('Build your order', 'Arma tu pedido')}</h2>
          <p className="section-sub">
            {t(
              'Choose a plan, add only the extras you want, and your all-in total updates live on the right — then send the exact setup as a request. Not sure which plan fits?',
              'Elige un plan, agrega solo los extras que quieras y tu total todo incluido se actualiza en vivo a la derecha — luego envía la configuración exacta como solicitud. ¿No sabes cuál plan te queda?',
            )}{' '}
            <a href="#finder">{t('Take the 60-second quiz ↓', 'Haz el test de 60 segundos ↓')}</a>
          </p>
          <PackageConfigurator />
        </div>
      </section>

      {/* Not sure where to start: the 60-second plan finder */}
      <section id="finder" className="section section--alt gs-seam-top gs-seam-bottom">
        <div className="section-container">
          <p className="section-eyebrow">{t('Not sure where to start?', '¿No sabes por dónde empezar?')}</p>
          <h2 className="section-title">{t('Find your plan in 60 seconds', 'Encuentra tu plan en 60 segundos')}</h2>
          <p className="section-sub">
            {t(
              'Four quick questions, one clear recommendation — a full package with a real number, sent as a request in one click.',
              'Cuatro preguntas rápidas, una recomendación clara — un paquete completo con un número real, enviado como solicitud en un clic.',
            )}
          </p>
          <PlanFinder />
        </div>
      </section>

      {/* What every plan includes — the shared baseline */}
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
        <div className="section-container gs-wide">
          <p className="section-eyebrow">{t('Every plan in full', 'Cada plan en detalle')}</p>
          <h2 className="section-title">{t('The four plans', 'Los cuatro planes')}</h2>
          <p className="section-sub">
            {t(
              'Every plan is a real, all-in number, with everything above already inside. Here is exactly what each one carries — pick your starting point up in the builder.',
              'Cada plan es un número real, todo incluido, con todo lo de arriba ya adentro. Esto es exactamente lo que lleva cada uno — elige tu punto de partida arriba en el configurador.',
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

      {/* Integrations — the two sizes, explained plainly */}
      <section id="integrations" className="section section--default gs-seam-bottom">
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

      {/* AI phone menu voice preview — clip audio is CMS-uploaded; shows a
          "sample coming soon" state until the voice clips are added. */}
      <VoiceSample
        eyebrow={t('The AI phone menu, out loud', 'El menú telefónico con IA, en voz alta')}
        headline={t('Hear what your callers would hear', 'Escucha lo que escucharían quienes llaman')}
        subtext={t(
          'A natural AI voice answers your line and routes every call. This is the actual quality that greets your customers — tap a sample to listen.',
          'Una voz de IA con sonido natural contesta tu línea y dirige cada llamada. Esta es la calidad real que recibe a tus clientes — toca una muestra para escuchar.',
        )}
        callerName={t('AI phone menu · demo', 'Menú telefónico con IA · demo')}
        clips={[
          { label: t('Main greeting', 'Saludo principal'), sub: t('“Thank you for calling…”', '“Gracias por llamar…”') },
          { label: t('Press 1 — Sales', 'Marca 1 — Ventas') },
          { label: t('Press 2 — Support', 'Marca 2 — Soporte') },
          { label: t('After-hours message', 'Mensaje fuera de horario') },
        ]}
        variant="default"
      />

      {/* Existing sites: on-demand estimator */}
      <section id="estimate" className="section section--alt gs-seam-top gs-seam-bottom">
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
