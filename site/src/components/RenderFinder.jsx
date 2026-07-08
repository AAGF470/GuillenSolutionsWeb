import { useMemo, useState } from 'react'
import InquiryForm from './InquiryForm.jsx'
import { useContent } from '../content.js'
import { useT } from '../i18n.jsx'
import './RenderFinder.css'

// ---------------------------------------------------------------------------
// RenderFinder — a 60-second "which render package fits my product?" quiz.
// Sibling to PlanFinder: same structure, styling, and one-click InquiryForm
// send. Deliberately opinionated — one clear recommendation, not a matrix.
//
// Renders are quoted PER PRODUCT, never flat-rate, so every number shown here
// is framed as an estimate; the real quote is confirmed in writing.
// ---------------------------------------------------------------------------

const money = n => `$${n.toLocaleString('en-US')}`

export default function RenderFinder() {
  const t = useT()
  const { CG_RENDER_PACKAGES } = useContent()
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)

  const QUESTIONS = [
    {
      id: 'complexity',
      q: t('What are you rendering?', '¿Qué vas a renderizar?'),
      options: [
        { v: 'simple',   label: t('Something simple', 'Algo simple'),       sub: t('Bottles, jars, boxes, mugs, candles — clean single forms.', 'Botellas, frascos, cajas, tazas, velas — formas simples y limpias.') },
        { v: 'standard', label: t('A standard product', 'Un producto estándar'), sub: t('Appliances, tools, bags, apparel, cartons with artwork.', 'Electrodomésticos, herramientas, bolsas, ropa, cartones con arte.') },
        { v: 'complex',  label: t('Something complex', 'Algo complejo'),     sub: t('Jewelry, electronics, glass, transparent or mechanical parts.', 'Joyería, electrónica, vidrio, partes transparentes o mecánicas.') },
      ],
    },
    {
      id: 'volume',
      q: t('How many product images do you need?', '¿Cuántas imágenes de producto necesitas?'),
      options: [
        { v: 'few',     label: t('Just a few (1–3)', 'Solo unas pocas (1–3)'),        sub: t('A clean listing set — a couple of angles and a detail.', 'Un set de listado limpio — un par de ángulos y un detalle.') },
        { v: 'gallery', label: t('A full listing gallery (4–6)', 'Una galería completa (4–6)'), sub: t('Everything a marketplace listing needs, plus a hero.', 'Todo lo que necesita un listado de marketplace, más una portada.') },
        { v: 'launch',  label: t('A launch kit (8+)', 'Un kit de lanzamiento (8+)'),  sub: t('A full spread for store, ads, and social — variants included.', 'Un set completo para tienda, anuncios y redes — con variantes.') },
      ],
    },
    {
      id: 'motion',
      q: t('Do you want motion or video too?', '¿También quieres movimiento o video?'),
      options: [
        { v: 'no',  label: t('No, stills are enough', 'No, las tomas fijas bastan'), sub: t('Just the images for now — motion can be added later.', 'Solo las imágenes por ahora — el movimiento se agrega después.') },
        { v: 'yes', label: t('Yes — a spin or short video', 'Sí — un giro o video corto'), sub: t('A turntable or a short clip converts better than a still.', 'Un giro 360° o un clip corto convierte mejor que una toma fija.') },
      ],
    },
    {
      id: 'bundle',
      q: t('Are you also getting a website with us?', '¿También harás un sitio web con nosotros?'),
      options: [
        { v: 'yes',      label: t('Yes', 'Sí'),                                   sub: t('Bundle renders with a build and take 15% off the render work.', 'Combina los renders con un sitio y ahorra 15% en el trabajo de render.') },
        { v: 'enhanced', label: t('Yes — Online Business Enhanced', 'Sí — Negocio en Línea Mejorado'), sub: t('Enhanced website clients get 20% off any render work.', 'Los clientes del sitio Mejorado obtienen 20% de descuento en renders.') },
        { v: 'no',       label: t('No, renders only', 'No, solo renders'),        sub: t('Standalone — priced exactly as listed, every file still yours.', 'Por separado — al precio listado, cada archivo sigue siendo tuyo.') },
      ],
    },
  ]

  // Parse the lower bound of a "$1,100–1,400" / "$600" style price string.
  const priceLow = str => {
    const m = String(str).replace(/,/g, '').match(/\d+/)
    return m ? Number(m[0]) : 0
  }

  // Answers → one opinionated recommendation.
  function recommend(a) {
    // Motion always steers to the motion launch set; otherwise volume decides.
    const wantsMotion = a.motion === 'yes'
    const pickId = wantsMotion
      ? 'motion-launch'
      : a.volume === 'launch'
        ? 'launch'
        : a.volume === 'gallery'
          ? 'full'
          : 'starter'

    const pack = CG_RENDER_PACKAGES.find(p => p.id === pickId)

    const complexityLabel = {
      simple:   t('simple', 'simple'),
      standard: t('standard', 'estándar'),
      complex:  t('complex', 'complejo'),
    }[a.complexity]

    // Bundle discount: 15% (or 20% for Enhanced) off the render work.
    const discountRate = a.bundle === 'enhanced' ? 0.2 : a.bundle === 'yes' ? 0.15 : 0
    const base = priceLow(pack.price)
    const ranged = /[–-]/.test(pack.price) // price is a range (e.g. motion)
    const estimate = discountRate ? Math.round(base * (1 - discountRate)) : base

    const notes = []
    notes.push(t(
      `Priced for a ${complexityLabel} product. Complex products sit at the higher end of any range; simple ones at the lower.`,
      `Estimado para un producto ${complexityLabel}. Los productos complejos quedan en el extremo alto de cualquier rango; los simples en el bajo.`,
    ))
    if (wantsMotion) {
      notes.push(t(
        'Motion is quoted by clip length and complexity — this range covers the full still gallery plus a turntable and a short video from the same model.',
        'El movimiento se cotiza por duración del clip y complejidad — este rango cubre la galería completa de tomas fijas más un giro 360° y un video corto del mismo modelo.',
      ))
    }
    if (discountRate) {
      notes.push(t(
        `Includes the ${Math.round(discountRate * 100)}% bundle discount for pairing renders with a website build.`,
        `Incluye el ${Math.round(discountRate * 100)}% de descuento por combinar renders con un sitio web.`,
      ))
    }
    notes.push(t(
      'This is an estimate — renders are quoted per product, in writing, before any work starts, never flat-rate.',
      'Es un estimado — los renders se cotizan por producto, por escrito, antes de empezar cualquier trabajo, nunca a tarifa plana.',
    ))

    return { pack, complexityLabel, discountRate, base, estimate, ranged }
  }

  const done = step >= QUESTIONS.length
  const rec = useMemo(() => (done ? recommend(answers) : null), [done, answers])

  function pick(id, v) {
    setAnswers(prev => ({ ...prev, [id]: v }))
    setStep(s => s + 1)
  }
  function restart() { setAnswers({}); setStep(0) }

  const summary = rec
    ? t(
        `Render finder: ${rec.pack.name} — est. ${rec.ranged && !rec.discountRate ? rec.pack.price : `~${money(rec.estimate)}`}${rec.discountRate ? ` (${Math.round(rec.discountRate * 100)}% bundle)` : ''}`,
        `Buscador de renders: ${rec.pack.name} — aprox. ${rec.ranged && !rec.discountRate ? rec.pack.price : `~${money(rec.estimate)}`}${rec.discountRate ? ` (${Math.round(rec.discountRate * 100)}% combo)` : ''}`,
      )
    : ''

  // How to show the estimate: keep the native range string when it's a range
  // and no discount applies; otherwise show a single "~$…" number.
  const estimateLabel = rec
    ? (rec.ranged && !rec.discountRate ? rec.pack.price : `~${money(rec.estimate)}`)
    : ''

  return (
    <div className="gs-finder gs-rfinder">
      {!done && (
        <div className="gs-finder__quiz">
          <div className="gs-finder__progress" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <span key={i} className={i < step ? 'is-done' : i === step ? 'is-now' : ''} />
            ))}
          </div>
          <p className="gs-finder__q">{QUESTIONS[step].q}</p>
          <div className="gs-finder__opts">
            {QUESTIONS[step].options.map(o => (
              <button key={o.v} type="button" className="gs-finder__opt" onClick={() => pick(QUESTIONS[step].id, o.v)}>
                <span className="gs-finder__opt-label">{o.label}</span>
                <span className="gs-finder__opt-sub">{o.sub}</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" className="gs-finder__back" onClick={() => setStep(s => s - 1)}>{t('← Back', '← Atrás')}</button>
          )}
        </div>
      )}

      {done && rec && (
        <div className="gs-finder__result">
          <div className="gs-finder__card">
            <p className="gs-finder__rec-eyebrow">{t('Our recommendation', 'Nuestra recomendación')}</p>
            <h3 className="gs-finder__rec-name">{rec.pack.name}</h3>
            <p className="gs-finder__rec-desc">{rec.pack.body}</p>
            <ul className="gs-finder__lines">
              {rec.pack.includes.map(x => (
                <li key={x}><span>{x}</span></li>
              ))}
            </ul>
            <div className="gs-finder__total">
              <span>{t('Estimated', 'Estimado')}</span>
              <strong>{estimateLabel}</strong>
            </div>
            {rec.discountRate > 0 && (
              <div className="gs-finder__total gs-finder__total--sub">
                <span>{t('List price', 'Precio de lista')}</span>
                <strong>{rec.pack.price}</strong>
              </div>
            )}
            <p className="gs-finder__estimate-note">
              {t(
                'Estimate only — final quote is per product, in writing, before any work starts.',
                'Solo un estimado — la cotización final es por producto, por escrito, antes de empezar cualquier trabajo.',
              )}
            </p>
          </div>

          <div className="gs-finder__send">
            <p className="gs-finder__send-title">{t('Like it? Send it as a request — nothing is charged.', '¿Te gusta? Envíalo como solicitud — no se cobra nada.')}</p>
            <InquiryForm
              source="configurator"
              summary={summary}
              details={{ answers, package: rec.pack.id, listPrice: rec.pack.price, estimate: rec.estimate, discountRate: rec.discountRate }}
              cta={t('Send this request', 'Enviar esta solicitud')}
            />
            <div className="gs-finder__alt">
              <button type="button" onClick={restart}>{t('Start over', 'Empezar de nuevo')}</button>
              <a href="#packages">{t('or compare every package below ↓', 'o compara cada paquete abajo ↓')}</a>
            </div>
          </div>
        </div>
      )}

      <p className="gs-finder__meta">
        {t(
          'This finder points you at a starting package — the real number is always tiered to your actual product and confirmed in writing first.',
          'Este buscador te apunta a un paquete inicial — el número real siempre se escalona según tu producto real y se confirma por escrito primero.',
        )}
      </p>
    </div>
  )
}
