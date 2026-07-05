import { useMemo, useState } from 'react'
import { PACKAGES } from '../data'
import InquiryForm from './InquiryForm.jsx'
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

const QUESTIONS = [
  {
    id: 'kind',
    q: 'What best describes your business?',
    options: [
      { v: 'solo',     label: 'Just me',            sub: 'Freelancer, stylist, tutor, maker — clients hire you.' },
      { v: 'services', label: 'A local business',   sub: 'Contractor, shop, salon, restaurant — services & hours.' },
      { v: 'products', label: 'We sell products',   sub: 'A catalog, a menu, listings — things people browse.' },
    ],
  },
  {
    id: 'commerce',
    q: 'Will customers buy, book, or order online?',
    options: [
      { v: 'yes',   label: 'Yes',       sub: 'Checkout, reservations, or online ordering on the site.' },
      { v: 'later', label: 'Maybe later', sub: 'Start with inquiries; add ordering when it makes sense.' },
      { v: 'no',    label: 'No',        sub: 'The site brings people in; sales happen in person.' },
    ],
  },
  {
    id: 'maintain',
    q: 'Who should be able to maintain it long-term?',
    options: [
      { v: 'us',  label: 'Keep it simple',      sub: 'You edit content; we handle everything technical.' },
      { v: 'any', label: 'Any developer, ever', sub: 'Maximum portability matters to you — even at a premium.' },
    ],
  },
  {
    id: 'photos',
    q: 'Do you need product photos?',
    options: [
      { v: 'yes', label: 'Yes',  sub: 'Clean listing shots or lifestyle imagery of what you sell.' },
      { v: 'no',  label: 'No',   sub: 'You have photos, or your business doesn\'t need them.' },
    ],
  },
]

// Answers → one opinionated recommendation.
function recommend(a) {
  const plan = PACKAGES.find(p =>
    p.id === (a.maintain === 'any' ? 'wordpress' : a.kind === 'solo' ? 'freelance' : 'standard'))

  const lines = [{ label: `${plan.name} — first year, all-in`, amount: plan.firstYear }]
  const notes = []

  if (a.commerce === 'yes') {
    lines.push({ label: 'External platform integration (checkout / booking)', amount: 400 })
    notes.push('Your Shopify / Square / booking account stays in your name; the $400 is our one-time integration.')
  }
  if (a.kind !== 'solo') {
    lines.push({ label: 'Google Business Profile setup', amount: 300 })
    notes.push('For a local business, Maps presence usually matters more than anything on the site itself.')
  }
  if (a.photos === 'yes') {
    // Full listing pack $600, 15% off when bundled with a website build.
    lines.push({ label: 'Full listing pack (renders) — 15% bundle discount', amount: 510 })
    notes.push('One product modeled + 6 studio shots + a lifestyle hero. Product lines quote per variant, not per product.')
  }
  if (a.commerce === 'later') {
    notes.push('Ordering can be added anytime later as a $400 integration — nothing to decide today.')
  }

  const firstYear = lines.reduce((s, l) => s + l.amount, 0)
  return { plan, lines, notes, firstYear, recurring: plan.recurring }
}

export default function PlanFinder() {
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)

  const done = step >= QUESTIONS.length
  const rec = useMemo(() => (done ? recommend(answers) : null), [done, answers])

  function pick(id, v) {
    setAnswers(prev => ({ ...prev, [id]: v }))
    setStep(s => s + 1)
  }
  function restart() { setAnswers({}); setStep(0) }

  const summary = rec
    ? `Plan finder: ${rec.plan.name} + ${rec.lines.length - 1} add-on(s) — ${money(rec.firstYear)} first year`
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
            <button type="button" className="gs-finder__back" onClick={() => setStep(s => s - 1)}>← Back</button>
          )}
        </div>
      )}

      {done && rec && (
        <div className="gs-finder__result">
          <div className="gs-finder__card">
            <p className="gs-finder__rec-eyebrow">Our recommendation</p>
            <h3 className="gs-finder__rec-name">{rec.plan.name}</h3>
            <p className="gs-finder__rec-desc">{rec.plan.description}</p>
            <ul className="gs-finder__lines">
              {rec.lines.map(l => (
                <li key={l.label}><span>{l.label}</span><span>{money(l.amount)}</span></li>
              ))}
            </ul>
            <div className="gs-finder__total">
              <span>First year, all-in</span>
              <strong>{money(rec.firstYear)}</strong>
            </div>
            <div className="gs-finder__total gs-finder__total--sub">
              <span>Then, recurring</span>
              <strong>{money(rec.recurring)}/yr</strong>
            </div>
            {rec.notes.length > 0 && (
              <ul className="gs-finder__notes">
                {rec.notes.map(n => <li key={n}>{n}</li>)}
              </ul>
            )}
          </div>

          <div className="gs-finder__send">
            <p className="gs-finder__send-title">Like it? Send it as a request — nothing is charged.</p>
            <InquiryForm
              source="plan-finder"
              summary={summary}
              details={{ answers, lines: rec.lines, firstYear: rec.firstYear, recurring: rec.recurring }}
              cta="Send this request"
            />
            <div className="gs-finder__alt">
              <button type="button" onClick={restart}>Start over</button>
              <a href="#order">or fine-tune every option in the builder below ↓</a>
            </div>
          </div>
        </div>
      )}

      <p className="gs-finder__meta">
        This finder is itself a live example of the guided custom forms we build
        for clients ($250) — scent quizzes, service matchers, intake flows.
      </p>
    </div>
  )
}
