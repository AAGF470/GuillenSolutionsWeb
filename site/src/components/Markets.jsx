import './Markets.css'
import { MARKETS } from '../data.js'
import { useT } from '../i18n.jsx'

// ---------------------------------------------------------------------------
// Markets — the primary areas we serve, each a simple photo block with the
// local sub-areas listed beneath. Photos are added later (drop a file in
// /public/img/markets/ and set `image` in data.js MARKETS); until then each
// card shows a tidy branded placeholder.
// ---------------------------------------------------------------------------

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
)

export default function Markets() {
  const t = useT()
  return (
    <div className="gs-markets">
      {MARKETS.map((m) => (
        <article key={m.id} className="gs-market">
          <div
            className="gs-market__photo"
            style={m.image ? { backgroundImage: `url(${m.image})` } : undefined}
            role="img"
            aria-label={m.name}
          >
            {!m.image && (
              <span className="gs-market__placeholder">
                <Pin />
              </span>
            )}
          </div>
          <h3 className="gs-market__name">{m.name}</h3>
          <p className="gs-market__label">{t('Serving', 'Servimos')}</p>
          <ul className="gs-market__areas">
            {m.areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
