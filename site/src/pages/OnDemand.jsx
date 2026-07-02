import { useMemo, useState } from 'react'
import { HeroSection, ServiceList, CtaBanner } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import { ON_DEMAND, CONTACT_EMAIL } from '../data'
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
    s.kind === 'quoted' ? 'quoted' : s.kind === 'per-unit' ? money(s.amount * (qty[s.id] || 1)) : money(s.amount)

  const mailBody = encodeURIComponent(
    `Hi — I'd like to add the following to my site:\n\n` +
    chosen.map(s => `• ${lineLabel(s)} — ${linePrice(s)}`).join('\n') +
    `\n\nEstimated total: ${money(total)}${hasQuoted ? ' + quoted items' : ''}\n\n(My website / business name: )`
  )

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
                  <button type="button" aria-label={`Fewer ${s.unitPlural}`} onClick={() => bump(s.id, -1)}>−</button>
                  <span>{qty[s.id] || 1} {(qty[s.id] || 1) === 1 ? s.unit : s.unitPlural}</span>
                  <button type="button" aria-label={`More ${s.unitPlural}`} onClick={() => bump(s.id, +1)}>+</button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <aside className="gs-ode__summary">
        <h3 className="gs-ode__summary-title">Your estimate</h3>
        {chosen.length === 0 && <p className="gs-ode__empty">Pick anything on the left — mix and match freely.</p>}
        {chosen.map(s => (
          <div key={s.id} className="gs-ode__line">
            <span>{lineLabel(s)}</span><span>{linePrice(s)}</span>
          </div>
        ))}
        {chosen.length > 0 && (
          <>
            <div className="gs-ode__total">
              <span>Estimated total</span>
              <span>{money(total)}{hasQuoted ? ' + quoted' : ''}</span>
            </div>
            <a
              className="gs-ode__send"
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('On-demand services request')}&body=${mailBody}`}
            >
              Send this request
            </a>
          </>
        )}
        <p className="gs-ode__fine">
          Estimate only — every job is confirmed in writing before any work starts.
        </p>
      </aside>
    </div>
  )
}

export default function OnDemand() {
  return (
    <>
      <Seo
        title="On-Demand Services"
        description="Services you add after launch, whenever you need them — newsletter setup, landing pages, QR menus, seasonal refreshes, translations. Fixed-scope, quoted in writing."
        path="/on-demand"
      />
      <HeroSection
        eyebrow="On-demand · after launch, whenever"
        headline="Nothing here needs deciding today."
        subtext="Your package covers the launch. These are the things businesses come back for later — a newsletter, a promo page, a QR menu, a seasonal swap. Fixed-scope, priced upfront, delivered whenever you end up needing them."
        size="compact"
        variant="alt"
        ctas={[]}
      />

      <ServiceList
        eyebrow="The menu"
        headline="Add it when you need it"
        subtext="Most of these exist because our component system makes them cheap to deliver — your content is structured, so reshaping it into a new page, a print sheet, or an email template is fast for us and affordable for you."
        services={ON_DEMAND.map(s => ({ name: s.name, description: s.body, price: s.price }))}
        columns={2}
        variant="default"
      />

      <section className="section section--alt" id="estimate">
        <div className="section-container">
          <p className="section-eyebrow">Build your estimate</p>
          <h2 className="section-title">Mixed pricing, made simple</h2>
          <p className="section-sub">
            One-time jobs, per-unit work, and quoted items — all in one running total.
            And yes: this estimator is itself an example of the custom forms we build
            for businesses with complicated pricing.
          </p>
          <Estimator />
        </div>
      </section>

      <CtaBanner
        eyebrow="Already a client?"
        headline="Tell us what you need — we'll confirm it in writing."
        subtext="Every on-demand job is bounded and fixed-scope: you know the number before we start."
        cta={{ label: 'Get in touch', href: `mailto:${CONTACT_EMAIL}` }}
        variant="accent"
      />
    </>
  )
}
