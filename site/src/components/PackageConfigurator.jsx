import { useMemo, useState } from 'react'
import './PackageConfigurator.css'
import { useContent } from '../content.js'
import { useT } from '../i18n.jsx'
import InquiryForm from './InquiryForm.jsx'

// ---------------------------------------------------------------------------
// PackageConfigurator — the "configuration form".
// Pick a base package + add-ons (some priced per item/page), see a live
// first-year + recurring total, and send the exact selection as a pre-filled
// inquiry. Nothing is charged — it's a transparent estimate.
// ---------------------------------------------------------------------------

const money = n => `$${n.toLocaleString('en-US')}`

const Check = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="2 7.5 5.5 11 12 3" />
  </svg>
)

export default function PackageConfigurator() {
  const t = useT()
  const { PACKAGES, ADDONS, ON_DEMAND } = useContent()
  const ALL_ADDONS = [...ADDONS, ...ON_DEMAND]

  const [pkgId, setPkgId]   = useState('standard')
  const [addons, setAddons] = useState(() => new Set())
  const [qty, setQty]       = useState({})   // per-unit add-on quantities

  const pkg = PACKAGES.find(p => p.id === pkgId) ?? null

  function toggleAddon(id) {
    const addon = ALL_ADDONS.find(a => a.id === id)
    setAddons(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else {
        next.add(id)
        if (addon?.kind === 'per-unit') setQty(q => ({ ...q, [id]: q[id] || 1 }))
      }
      return next
    })
  }

  function bumpQty(id, delta) {
    setQty(q => ({ ...q, [id]: Math.max(1, (q[id] || 1) + delta) }))
  }

  const summary = useMemo(() => {
    const chosen = ALL_ADDONS.filter(a => addons.has(a.id))
    let firstYear = pkg ? pkg.firstYear : 0
    let recurring = pkg ? pkg.recurring : 0
    let approx = false
    const quoted = []

    for (const a of chosen) {
      if (a.kind === 'quoted')    { quoted.push(a); continue }
      if (a.kind === 'onetime')   firstYear += a.amount
      // Recurring items (e.g. the phone line) are billed yearly — including
      // year one — so they count toward BOTH the first-year and recurring totals.
      if (a.kind === 'recurring') { firstYear += a.amount; recurring += a.amount; if (a.approx) approx = true }
      if (a.kind === 'per-unit')  firstYear += a.amount * (qty[a.id] || 1)
    }
    return { chosen, firstYear, recurring, approx, quoted }
  }, [pkg, addons, qty])

  function lineAmount(a) {
    if (a.kind === 'quoted')   return t('quoted', 'cotizado')
    if (a.kind === 'per-unit') return money(a.amount * (qty[a.id] || 1))
    if (a.kind === 'recurring') return `${a.approx ? t('from ', 'desde ') : ''}${money(a.amount)}/${t('yr', 'año')}`
    return money(a.amount)
  }

  // One line for the CMS inbox list; the full selection travels as JSON.
  const inquirySummary =
    `${pkg ? pkg.name : t('No package', 'Ningún paquete')}${summary.chosen.length ? ` + ${summary.chosen.length} ${t('add-on(s)', 'complemento(s)')}` : ''}` +
    ` — ${money(summary.firstYear)}${summary.quoted.length ? '+' : ''} ${t('first year', 'primer año')}`
  const inquiryDetails = {
    package: pkg ? { id: pkg.id, name: pkg.name, firstYear: pkg.firstYear, recurring: pkg.recurring } : null,
    addons: summary.chosen.map(a => ({
      id: a.id, name: a.name, kind: a.kind,
      ...(a.kind === 'per-unit' ? { qty: qty[a.id] || 1 } : {}),
      line: lineAmount(a),
    })),
    quoted: summary.quoted.map(a => a.name),
    firstYear: summary.firstYear,
    recurring: summary.recurring,
  }

  return (
    <div className="cfg">
      {/* ── Choices ─────────────────────────────────────────────────────── */}
      <div className="cfg__choices">
        <fieldset className="cfg__group">
          <legend className="cfg__legend">{t('1 · Select your plan', '1 · Selecciona tu plan')}</legend>
          <div className="cfg__pkgs">
            {PACKAGES.filter(p => !p.tbd).map(p => {
              const active = p.id === pkgId
              return (
                <label key={p.id} className={`cfg-pkg${active ? ' is-active' : ''}`}>
                  <input
                    type="radio" name="cfg-pkg" value={p.id}
                    checked={active} onChange={() => setPkgId(p.id)}
                    className="cfg-pkg__radio"
                  />
                  <span className="cfg-pkg__head">
                    <span className="cfg-pkg__name">{p.name}</span>
                    {p.badge && <span className="cfg-pkg__badge">{p.badge}</span>}
                  </span>
                  <span className="cfg-pkg__price">{p.approxPrice ? t('from ', 'desde ') : ''}{p.price}<em> {p.period}</em></span>
                  <span className="cfg-pkg__desc">{p.description}</span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="cfg__extras">
        <fieldset className="cfg__group">
          <legend className="cfg__legend">{t('2 · Add only what you need', '2 · Agrega solo lo que necesitas')}</legend>
          <div className="cfg__addons">
            {ADDONS.map(a => {
              const active = addons.has(a.id)
              const perUnit = a.kind === 'per-unit'
              return (
                <div key={a.id} className={`cfg-addon${active ? ' is-active' : ''}`}>
                  <label className="cfg-addon__toggle">
                    <input
                      type="checkbox" checked={active}
                      onChange={() => toggleAddon(a.id)} className="cfg-addon__box"
                    />
                    <span className="cfg-addon__check" aria-hidden="true"><Check /></span>
                    <span className="cfg-addon__main">
                      <span className="cfg-addon__row">
                        <span className="cfg-addon__name">{a.name}</span>
                        <span className="cfg-addon__price">{a.price}</span>
                      </span>
                      <span className="cfg-addon__meta">{a.cadence}</span>
                      <span className="cfg-addon__body">{a.body}</span>
                    </span>
                  </label>

                  {active && perUnit && (
                    <div className="cfg-addon__stepper">
                      <span className="cfg-addon__stepper-label">{t(`How many extra ${a.unitPlural}?`, `¿Cuántos ${a.unitPlural} extra?`)}</span>
                      <div className="cfg-stepper">
                        <button type="button" onClick={() => bumpQty(a.id, -1)} aria-label={t(`Fewer ${a.unitPlural}`, `Menos ${a.unitPlural}`)}>−</button>
                        <span className="cfg-stepper__val">{qty[a.id] || 1}</span>
                        <button type="button" onClick={() => bumpQty(a.id, 1)} aria-label={t(`More ${a.unitPlural}`, `Más ${a.unitPlural}`)}>+</button>
                      </div>
                      <span className="cfg-addon__linetotal">{money(a.amount * (qty[a.id] || 1))}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="cfg__group">
          <legend className="cfg__legend">{t('3 · On-demand extras — usually added later, all available now', '3 · Extras a pedido — normalmente se agregan después, todos disponibles ahora')}</legend>
          <div className="cfg__addons">
            {ON_DEMAND.map(a => {
              const active = addons.has(a.id)
              const perUnit = a.kind === 'per-unit'
              return (
                <div key={a.id} className={`cfg-addon${active ? ' is-active' : ''}`}>
                  <label className="cfg-addon__toggle">
                    <input
                      type="checkbox" checked={active}
                      onChange={() => toggleAddon(a.id)} className="cfg-addon__box"
                    />
                    <span className="cfg-addon__check" aria-hidden="true"><Check /></span>
                    <span className="cfg-addon__main">
                      <span className="cfg-addon__row">
                        <span className="cfg-addon__name">{a.name}</span>
                        <span className="cfg-addon__price">{a.price}</span>
                      </span>
                      <span className="cfg-addon__meta">{a.cadence}</span>
                      <span className="cfg-addon__body">{a.body}</span>
                    </span>
                  </label>

                  {active && perUnit && (
                    <div className="cfg-addon__stepper">
                      <span className="cfg-addon__stepper-label">{t(`How many ${a.unitPlural}?`, `¿Cuántos ${a.unitPlural}?`)}</span>
                      <div className="cfg-stepper">
                        <button type="button" onClick={() => bumpQty(a.id, -1)} aria-label={t(`Fewer ${a.unitPlural}`, `Menos ${a.unitPlural}`)}>−</button>
                        <span className="cfg-stepper__val">{qty[a.id] || 1}</span>
                        <button type="button" onClick={() => bumpQty(a.id, 1)} aria-label={t(`More ${a.unitPlural}`, `Más ${a.unitPlural}`)}>+</button>
                      </div>
                      <span className="cfg-addon__linetotal">{money(a.amount * (qty[a.id] || 1))}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </fieldset>
      </div>

      {/* ── Live summary ────────────────────────────────────────────────── */}
      <aside className="cfg__summary">
        <div className="cfg-sum">
          <p className="cfg-sum__title">{t('Your setup', 'Tu configuración')}</p>

          <ul className="cfg-sum__lines">
            <li className="cfg-sum__line">
              <span>{pkg ? pkg.name : t('No package selected', 'Ningún paquete seleccionado')}</span>
              <span>{pkg ? money(pkg.firstYear) : '—'}</span>
            </li>
            {summary.chosen.map(a => (
              <li key={a.id} className="cfg-sum__line cfg-sum__line--sub">
                <span>{a.name}{a.kind === 'per-unit' ? ` ×${qty[a.id] || 1}` : ''}</span>
                <span>{lineAmount(a)}</span>
              </li>
            ))}
          </ul>

          <div className="cfg-sum__totals">
            <div className="cfg-sum__total">
              <span>{t('First year, all-in', 'Primer año, todo incluido')}</span>
              <strong>{summary.approx ? t('from ', 'desde ') : ''}{money(summary.firstYear)}{summary.quoted.length ? '+' : ''}</strong>
            </div>
            <div className="cfg-sum__total cfg-sum__total--sub">
              <span>{t('Then, recurring', 'Luego, recurrente')}</span>
              <strong>{summary.approx ? t('from ', 'desde ') : ''}{money(summary.recurring)}/{t('yr', 'año')}</strong>
            </div>
          </div>

          {summary.quoted.length > 0 && (
            <p className="cfg-sum__quoted">
              {t('Quoted per business:', 'Cotizado por negocio:')} {summary.quoted.map(a => a.name).join(', ')}.
            </p>
          )}

          <InquiryForm
            source="configurator"
            summary={inquirySummary}
            details={inquiryDetails}
            cta={t('Request this setup', 'Solicitar esta configuración')}
            compact
          />
          <p className="cfg-sum__fine">
            {t(
              'Just an estimate — nothing is charged. Recurring items are billed yearly, starting in year one. We confirm every number in writing before any work begins.',
              'Solo un estimado — no se cobra nada. Los artículos recurrentes se facturan anualmente, empezando el primer año. Confirmamos cada número por escrito antes de comenzar cualquier trabajo.',
            )}
          </p>
        </div>
      </aside>
    </div>
  )
}
