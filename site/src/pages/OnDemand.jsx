import { useMemo, useState } from 'react'
import { HeroSection, ServiceList, CtaBanner } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import { CONTACT_EMAIL } from '../data'
import { useContent } from '../content.js'
import { useT } from '../i18n.jsx'
import './OnDemand.css'

// ---------------------------------------------------------------------------
// On-demand services — everything that can be added AFTER launch, whenever a
// client ends up needing it. Kept off the package flow on purpose so choosing
// a plan stays simple. Includes a custom estimator for the mixed cost
// structures (one-time / per-unit / quoted) — which is itself a live example
// of the custom forms we build for clients with complex pricing.
// ---------------------------------------------------------------------------

const money = n => `$${n.toLocaleString()}`

export function Estimator() {
  const t = useT()
  const { ON_DEMAND } = useContent()
  const [picked, setPicked] = useState(new Set())
  const [qty, setQty] = useState({})

  const toggle = id => {
    setPicked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else {
        next.add(id)
        const svc = ON_DEMAND.find(s => s.id === id)
        if (svc?.kind === 'per-unit') setQty(q => ({ ...q, [id]: q[id] || 1 }))
      }
      return next
    })
  }

  // Functional update — rapid clicks must each apply (no stale closure reads).
  const bump = (id, delta) =>
    setQty(q => ({ ...q, [id]: Math.max(1, Math.min(99, (q[id] || 1) + delta)) }))

  const chosen = ON_DEMAND.filter(s => picked.has(s.id))
  const { total, hasQuoted } = useMemo(() => {
    let total = 0, hasQuoted = false
    for (const s of chosen) {
      if (s.kind === 'quoted') hasQuoted = true
      else if (s.kind === 'per-unit') total += s.amount * (qty[s.id] || 1)
      else total += s.amount
    }
    return { total, hasQuoted }
  }, [chosen, qty])

  const lineLabel = s =>
    s.kind === 'per-unit' ? `${s.name} ×${qty[s.id] || 1}` : s.name
  const linePrice = s =>
    s.kind === 'quoted' ? t('quoted', 'cotizado') : s.kind === 'per-unit' ? money(s.amount * (qty[s.id] || 1)) : money(s.amount)

  const inquirySummary =
    `${t('On-demand', 'A pedido')}: ${chosen.map(lineLabel).join(', ') || t('(nothing picked)', '(nada elegido)')} — ${money(total)}${hasQuoted ? '+' : ''}`
  const inquiryDetails = {
    services: chosen.map(s => ({
      id: s.id, name: s.name, kind: s.kind,
      ...(s.kind === 'per-unit' ? { qty: qty[s.id] || 1 } : {}),
      line: linePrice(s),
    })),
    total, hasQuoted,
  }

  return (
    <div className="gs-ode">
      <div className="gs-ode__list">
        {ON_DEMAND.map(s => {
          const on = picked.has(s.id)
          return (
            <div key={s.id} className={`gs-ode__row${on ? ' is-on' : ''}`}>
              <label className="gs-ode__main">
                <input type="checkbox" checked={on} onChange={() => toggle(s.id)} />
                <span className="gs-ode__name">{s.name}</span>
                <span className="gs-ode__price">{s.price}</span>
              </label>
              {on && s.kind === 'per-unit' && (
                <div className="gs-ode__qty">
                  <button type="button" aria-label={`${t('Fewer', 'Menos')} ${s.unitPlural}`} onClick={() => bump(s.id, -1)}>−</button>
                  <span>{qty[s.id] || 1} {(qty[s.id] || 1) === 1 ? s.unit : s.unitPlural}</span>
                  <button type="button" aria-label={`${t('More', 'Más')} ${s.unitPlural}`} onClick={() => bump(s.id, +1)}>+</button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <aside className="gs-ode__summary">
        <h3 className="gs-ode__summary-title">{t('Your estimate', 'Tu estimado')}</h3>
        {chosen.length === 0 && <p className="gs-ode__empty">{t('Pick anything on the left — mix and match freely.', 'Elige lo que quieras a la izquierda — combina libremente.')}</p>}
        {chosen.map(s => (
          <div key={s.id} className="gs-ode__line">
            <span>{lineLabel(s)}</span><span>{linePrice(s)}</span>
          </div>
        ))}
        {chosen.length > 0 && (
          <>
            <div className="gs-ode__total">
              <span>{t('Estimated total', 'Total estimado')}</span>
              <span>{money(total)}{hasQuoted ? t(' + quoted', ' + cotizado') : ''}</span>
            </div>
            <InquiryForm
              source="estimator"
              summary={inquirySummary}
              details={inquiryDetails}
              cta={t('Send this request', 'Enviar esta solicitud')}
              compact
            />
          </>
        )}
        <p className="gs-ode__fine">
          {t('Estimate only — every job is confirmed in writing before any work starts.', 'Solo un estimado — cada trabajo se confirma por escrito antes de empezar.')}
        </p>
      </aside>
    </div>
  )
}

export default function OnDemand() {
  const t = useT()
  const { ON_DEMAND } = useContent()
  return (
    <>
      <Seo
        title={t('On-Demand Services', 'Servicios a pedido')}
        description={t('Services you add after launch, whenever you need them — newsletter setup, landing pages, QR menus, seasonal refreshes, translations. Fixed-scope, quoted in writing.', 'Servicios que agregas después del lanzamiento, cuando los necesites — configuración de boletín, páginas de aterrizaje, menús QR, actualizaciones de temporada, traducciones. De alcance fijo, cotizados por escrito.')}
        path="/on-demand"
      />
      <HeroSection
        eyebrow={t('On-demand · after launch, whenever', 'A pedido · después del lanzamiento, cuando sea')}
        headline={t('Nothing here needs deciding today.', 'Nada de aquí hay que decidirlo hoy.')}
        subtext={t('Your package covers the launch. These are the things businesses come back for later — a newsletter, a promo page, a QR menu, a seasonal swap. Fixed-scope, priced upfront, delivered whenever you end up needing them.', 'Tu paquete cubre el lanzamiento. Estas son las cosas por las que los negocios vuelven después — un boletín, una página promocional, un menú QR, un cambio de temporada. De alcance fijo, con precio por adelantado, entregadas cuando termines necesitándolas.')}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      <ServiceList
        eyebrow={t('The menu', 'El menú')}
        headline={t('Add it when you need it', 'Agrégalo cuando lo necesites')}
        subtext={t('Most of these exist because our component system makes them cheap to deliver — your content is structured, so reshaping it into a new page, a print sheet, or an email template is fast for us and affordable for you.', 'La mayoría de estos existen porque nuestro sistema de componentes los hace económicos de entregar — tu contenido está estructurado, así que reconvertirlo en una nueva página, una hoja impresa o una plantilla de correo es rápido para nosotros y accesible para ti.')}
        services={ON_DEMAND.map(s => ({ name: s.name, description: s.body, price: s.price }))}
        columns={2}
        variant="default"
      />

      <section className="section section--alt" id="estimate">
        <div className="section-container">
          <p className="section-eyebrow">{t('Build your estimate', 'Arma tu estimado')}</p>
          <h2 className="section-title">{t('Mixed pricing, made simple', 'Precios mixtos, hechos simples')}</h2>
          <p className="section-sub">
            {t(
              'One-time jobs, per-unit work, and quoted items — all in one running total. And yes: this estimator is itself an example of the custom forms we build for businesses with complicated pricing.',
              'Trabajos únicos, trabajo por unidad y artículos cotizados — todo en un solo total acumulado. Y sí: este estimador es en sí mismo un ejemplo de los formularios a la medida que construimos para negocios con precios complicados.',
            )}
          </p>
          <Estimator />
        </div>
      </section>

      <CtaBanner
        eyebrow={t('Already a client?', '¿Ya eres cliente?')}
        headline={t("Tell us what you need — we'll confirm it in writing.", 'Dinos qué necesitas — te lo confirmamos por escrito.')}
        subtext={t('Every on-demand job is bounded and fixed-scope: you know the number before we start.', 'Cada trabajo a pedido es acotado y de alcance fijo: conoces el número antes de que empecemos.')}
        cta={{ label: t('Get in touch', 'Contáctanos'), href: `mailto:${CONTACT_EMAIL}` }}
        variant="accent"
      />
    </>
  )
}
