import { useMemo, useState } from 'react'
import InquiryForm from './InquiryForm.jsx'
import { useContent } from '../content.js'
import { useT } from '../i18n.jsx'
import './PlanFinder.css'

// ---------------------------------------------------------------------------
// PlanFinder — a 60-second "which plan fits me?" quiz. Answers map to a plan
// recommendation plus a suggested full package (add-ons, renders bundle) with
// a live total and a one-click send-request form. Deliberately opinionated:
// one clear recommendation, not a comparison chart.
//
// It's also a working demo of the custom multi-step forms we sell — the same
// way the on-demand estimator demos mixed-cost forms.
// ---------------------------------------------------------------------------

const money = n => `$${n.toLocaleString('en-US')}`

export default function PlanFinder() {
  const t = useT()
  const { PACKAGES } = useContent()
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)

  const QUESTIONS = [
    {
      id: 'kind',
      q: t('What best describes your business?', '¿Qué describe mejor a tu negocio?'),
      options: [
        { v: 'solo',     label: t('Just me', 'Solo yo'),                   sub: t('Freelancer, stylist, tutor, maker — clients hire you.', 'Freelancer, estilista, tutor, artesano — los clientes te contratan a ti.') },
        { v: 'services', label: t('A local business', 'Un negocio local'), sub: t('Contractor, shop, salon, restaurant — services & hours.', 'Contratista, tienda, salón, restaurante — servicios y horarios.') },
        { v: 'products', label: t('We sell products', 'Vendemos productos'), sub: t('A catalog, a menu, listings — things people browse.', 'Un catálogo, un menú, listados — cosas que la gente explora.') },
      ],
    },
    {
      id: 'commerce',
      q: t('Will customers buy, book, or order online?', '¿Los clientes comprarán, reservarán o pedirán en línea?'),
      options: [
        { v: 'yes',   label: t('Yes', 'Sí'),                 sub: t('Checkout, reservations, or online ordering on the site.', 'Checkout, reservas o pedidos en línea en el sitio.') },
        { v: 'later', label: t('Maybe later', 'Tal vez después'), sub: t('Start with inquiries; add ordering when it makes sense.', 'Empieza con consultas; agrega pedidos cuando tenga sentido.') },
        { v: 'no',    label: t('No', 'No'),                  sub: t('The site brings people in; sales happen in person.', 'El sitio atrae a la gente; las ventas suceden en persona.') },
      ],
    },
    {
      id: 'maintain',
      q: t('How hands-on do you want to be?', '¿Qué tan involucrado quieres estar?'),
      options: [
        { v: 'self',    label: t('I\'ll edit it myself', 'Lo edito yo mismo'),        sub: t('You update content in your own editor; we handle everything technical.', 'Tú actualizas el contenido en tu propio editor; nosotros manejamos todo lo técnico.') },
        { v: 'managed', label: t('Handle it for me', 'Manéjenlo por mí'),             sub: t('Hands-off — we actively manage updates, SEO, and seasonal changes for you.', 'Sin complicaciones — gestionamos activamente las actualizaciones, el SEO y los cambios de temporada por ti.') },
        { v: 'portable', label: t('WordPress or my own server', 'WordPress o mi propio servidor'), sub: t('Maximum portability — any developer can take it over.', 'Máxima portabilidad — cualquier desarrollador puede tomar el control.') },
      ],
    },
    {
      id: 'photos',
      q: t('Do you need product images or video?', '¿Necesitas imágenes o video de producto?'),
      options: [
        { v: 'photos', label: t('Photos', 'Fotos'), sub: t('Clean listing shots and lifestyle imagery of what you sell.', 'Tomas de listado limpias e imágenes ambientadas de lo que vendes.') },
        { v: 'motion', label: t('Photos + motion', 'Fotos + movimiento'), sub: t('Images plus a spin or short video — motion converts better than a still.', 'Imágenes más un giro o video corto — el movimiento convierte mejor que una toma fija.') },
        { v: 'no',     label: t('No', 'No'), sub: t("You have them, or your business doesn't need them.", 'Ya los tienes, o tu negocio no los necesita.') },
      ],
    },
  ]

  // Answers → one opinionated recommendation.
  function recommend(a) {
    // Managed/hands-off → Enhanced; solo → Freelance; otherwise Standard.
    // Never recommend the tbd 'private-hosting' as a priced result — instead,
    // when the user wants WordPress / their own server, we add a note below.
    const planId = a.maintain === 'managed' ? 'enhanced' : a.kind === 'solo' ? 'freelance' : 'standard'
    const plan = PACKAGES.find(p => p.id === planId)

    const lines = [{ label: `${plan.name} — ${t('first year, all-in', 'primer año, todo incluido')}`, amount: plan.firstYear }]
    const notes = []

    if (a.maintain === 'portable') {
      notes.push(t('Ask about our Private Hosting Plan — WordPress or a dedicated server, in development.', 'Pregunta por nuestro Plan de Hosting Privado — WordPress o un servidor dedicado, en desarrollo.'))
    }

    if (a.commerce === 'yes') {
      lines.push({ label: t('External platform integration (checkout / booking)', 'Integración con plataforma externa (checkout / reservas)'), amount: 400 })
      notes.push(t('Your Shopify / Square / booking account stays in your name; the $400 is our one-time integration.', 'Tu cuenta de Shopify / Square / reservas queda a tu nombre; los $400 son nuestra integración única.'))
    }
    if (a.kind !== 'solo') {
      lines.push({ label: t('Google Business Profile setup', 'Configuración de Perfil de Empresa de Google'), amount: 300 })
      notes.push(t('For a local business, Maps presence usually matters more than anything on the site itself.', 'Para un negocio local, la presencia en Maps suele importar más que cualquier cosa del sitio mismo.'))
    }
    if (a.photos === 'photos') {
      // Full listing pack $600, 15% off when bundled with a website build.
      lines.push({ label: t('Full listing pack (renders) — 15% bundle discount', 'Paquete de listado completo (renders) — 15% de descuento por combo'), amount: 510 })
      notes.push(t('One product modeled + 6 studio shots + a lifestyle hero. Product lines quote per variant, not per product.', 'Un producto modelado + 6 tomas de estudio + una portada ambientada. Las líneas de producto se cotizan por variante, no por producto.'))
    }
    if (a.photos === 'motion') {
      // Motion launch set ($1,100–1,400); ~$1,200 midpoint, 15% bundle ≈ $1,020.
      lines.push({ label: t('Motion launch set (renders + video) — 15% bundle discount', 'Set de lanzamiento con movimiento (renders + video) — 15% de descuento por combo'), amount: 1020 })
      notes.push(t('Full still gallery + a turntable + a short product video, all from one 3D model — the actual product in motion, every frame consistent. Estimate; final motion pricing is quoted to your product.', 'Galería completa de tomas fijas + un giro 360° + un video corto de producto, todo a partir de un modelo 3D — el producto real en movimiento, cada cuadro consistente. Es un estimado; el precio final del movimiento se cotiza según tu producto.'))
    }
    if (a.commerce === 'later') {
      notes.push(t('Ordering can be added anytime later as a $400 integration — nothing to decide today.', 'Los pedidos se pueden agregar más adelante como una integración de $400 — nada que decidir hoy.'))
    }

    const firstYear = lines.reduce((s, l) => s + l.amount, 0)
    return { plan, lines, notes, firstYear, recurring: plan.recurring }
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
        `Plan finder: ${rec.plan.name} + ${rec.lines.length - 1} add-on(s) — ${money(rec.firstYear)} first year`,
        `Buscador de plan: ${rec.plan.name} + ${rec.lines.length - 1} complemento(s) — ${money(rec.firstYear)} primer año`,
      )
    : ''

  return (
    <div className="gs-finder">
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
            <h3 className="gs-finder__rec-name">{rec.plan.name}</h3>
            <p className="gs-finder__rec-desc">{rec.plan.description}</p>
            <ul className="gs-finder__lines">
              {rec.lines.map(l => (
                <li key={l.label}><span>{l.label}</span><span>{money(l.amount)}</span></li>
              ))}
            </ul>
            <div className="gs-finder__total">
              <span>{t('First year, all-in', 'Primer año, todo incluido')}</span>
              <strong>{money(rec.firstYear)}</strong>
            </div>
            <div className="gs-finder__total gs-finder__total--sub">
              <span>{t('Then, recurring', 'Luego, recurrente')}</span>
              <strong>{money(rec.recurring)}/yr</strong>
            </div>
            {rec.notes.length > 0 && (
              <ul className="gs-finder__notes">
                {rec.notes.map(n => <li key={n}>{n}</li>)}
              </ul>
            )}
          </div>

          <div className="gs-finder__send">
            <p className="gs-finder__send-title">{t('Like it? Send it as a request — nothing is charged.', '¿Te gusta? Envíalo como solicitud — no se cobra nada.')}</p>
            <InquiryForm
              source="plan-finder"
              summary={summary}
              details={{ answers, lines: rec.lines, firstYear: rec.firstYear, recurring: rec.recurring }}
              cta={t('Send this request', 'Enviar esta solicitud')}
            />
            <div className="gs-finder__alt">
              <button type="button" onClick={restart}>{t('Start over', 'Empezar de nuevo')}</button>
              <a href="#order">{t('or fine-tune every option in the builder below ↓', 'o ajusta cada opción en el configurador de abajo ↓')}</a>
            </div>
          </div>
        </div>
      )}

      <p className="gs-finder__meta">
        {t(
          'This finder is itself a live example of the guided custom forms we build for clients ($250) — scent quizzes, service matchers, intake flows.',
          'Este buscador es en sí un ejemplo real de los formularios guiados a la medida que construimos para clientes ($250) — quizzes de aromas, emparejadores de servicios, flujos de admisión.',
        )}
      </p>
    </div>
  )
}
