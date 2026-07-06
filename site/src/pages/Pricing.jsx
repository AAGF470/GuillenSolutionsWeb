import { Link } from 'react-router-dom'
import { HeroSection, CtaBanner, Faq } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import PackageConfigurator from '../components/PackageConfigurator.jsx'
import PlanFinder from '../components/PlanFinder.jsx'
import { Estimator } from './OnDemand.jsx'
import { pricingSchema } from '../schema'
import { useContent } from '../content.js'
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
          <Link to="/plans/wordpress">WordPress</Link>
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
  const { PRICING_PROMISE, FAQS } = useContent()
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
