import { useEffect, useState, useCallback } from 'react'
import { HeroSection, CtaBanner } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import { CONTACT_EMAIL } from '../data'
import { useT } from '../i18n.jsx'
import './Status.css'

// ---------------------------------------------------------------------------
// Status Center (/status) — "see us at work." Two live parts:
//   1. Service status  — real, in-browser health checks against our services
//      (the website, and the CMS/inquiry API). No fabricated uptime numbers.
//   2. Updates feed    — stack/infra updates, feature launches, announcements,
//      and incidents, authored in the CMS `updates` collection. Degrades to a
//      friendly empty state if the collection isn't deployed yet.
// ---------------------------------------------------------------------------

const CMS = import.meta.env.VITE_CMS_URL
const RECHECK_MS = 60000

// One health check → 'operational' | 'degraded' | 'down'. A reachable server
// that answers (even a 401/404) counts as up-but-degraded; only a network
// failure/timeout is 'down'.
async function ping(url, opts = {}) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 6000)
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store', ...opts })
    clearTimeout(timer)
    return res.ok ? 'operational' : 'degraded'
  } catch {
    clearTimeout(timer)
    return 'down'
  }
}

const STATUS_ORDER = { operational: 0, degraded: 1, down: 2 }

// Category → badge styling + label (label is translated at render).
const CATEGORY = {
  stack:        { cls: 'stack',        en: 'Stack',        es: 'Infraestructura' },
  feature:      { cls: 'feature',      en: 'New feature',  es: 'Nueva función' },
  announcement: { cls: 'announcement', en: 'Announcement', es: 'Anuncio' },
  incident:     { cls: 'incident',     en: 'Incident',     es: 'Incidente' },
  maintenance:  { cls: 'maintenance',  en: 'Maintenance',  es: 'Mantenimiento' },
}

function StatusDot({ state }) {
  return <span className={`gs-st__dot gs-st__dot--${state}`} aria-hidden="true" />
}

export default function Status() {
  const t = useT()

  const STATE_LABEL = {
    operational: t('Operational', 'Operativo'),
    degraded:    t('Degraded', 'Con problemas'),
    down:        t('Down', 'Caído'),
    checking:    t('Checking…', 'Comprobando…'),
  }

  // Services we can honestly check from the browser.
  const services = [
    {
      id: 'site',
      name: t('Website & hosting', 'Sitio web y hosting'),
      desc: t('The public site and managed hosting.', 'El sitio público y el hosting administrado.'),
      check: () => ping('/', { method: 'HEAD' }),
    },
    {
      id: 'cms',
      name: t('Content & inquiry API', 'API de contenido y consultas'),
      desc: t('The CMS that powers content and the inquiry/quote forms.', 'El CMS que impulsa el contenido y los formularios de contacto/cotización.'),
      // Hit a stable, always-present public endpoint so this reflects the CMS
      // being reachable — not whether one specific collection is deployed.
      check: () => (CMS ? ping(`${CMS}/api/pages?limit=1&depth=0`) : Promise.resolve('degraded')),
    },
  ]

  const [checks, setChecks] = useState(() => Object.fromEntries(services.map(s => [s.id, 'checking'])))
  const [lastChecked, setLastChecked] = useState(null)
  const [posts, setPosts] = useState(null) // null = loading, [] = none

  const runChecks = useCallback(async () => {
    const entries = await Promise.all(services.map(async s => [s.id, await s.check()]))
    setChecks(Object.fromEntries(entries))
    setLastChecked(new Date())
  }, []) // services are recreated per render but the checks are stable by id

  useEffect(() => {
    runChecks()
    const id = setInterval(runChecks, RECHECK_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!CMS) { setPosts([]); return }
    let alive = true
    fetch(`${CMS}/api/updates?sort=-pinned,-publishedAt&limit=50&depth=0`)
      .then(r => (r.ok ? r.json() : { docs: [] }))
      .then(d => { if (alive) setPosts(d?.docs ?? []) })
      .catch(() => { if (alive) setPosts([]) })
    return () => { alive = false }
  }, [])

  // Overall = worst individual state (once all resolved).
  const states = Object.values(checks)
  const resolved = !states.includes('checking')
  const overall = resolved
    ? states.reduce((worst, s) => (STATUS_ORDER[s] > STATUS_ORDER[worst] ? s : worst), 'operational')
    : 'checking'
  const overallCopy = {
    operational: t('All systems operational', 'Todos los sistemas operativos'),
    degraded:    t('Some systems degraded', 'Algunos sistemas con problemas'),
    down:        t('Service disruption', 'Interrupción del servicio'),
    checking:    t('Checking systems…', 'Comprobando sistemas…'),
  }[overall]

  const fmtDate = iso => {
    const d = new Date(iso)
    return isNaN(d) ? '' : d.toLocaleDateString(t('en-US', 'es-ES'), { year: 'numeric', month: 'short', day: 'numeric' })
  }
  const fmtTime = d => d?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      <Seo
        title={t('Status & Updates', 'Estado y novedades')}
        description={t(
          'Live service status and a running log of stack updates, new features, and announcements from Guillen Solutions — see us at work.',
          'Estado de los servicios en vivo y un registro de actualizaciones del stack, nuevas funciones y anuncios de Guillen Solutions — míranos trabajar.',
        )}
        path="/status"
      />

      <HeroSection
        eyebrow={t('Status center · see us at work', 'Centro de estado · míranos trabajar')}
        headline={t('What we’re running, and what’s new.', 'Lo que tenemos en marcha, y lo nuevo.')}
        subtext={t(
          'Live status of the services we run for you, plus a running log of stack updates, new features, and announcements. Transparency is part of the deal.',
          'Estado en vivo de los servicios que operamos para ti, más un registro de actualizaciones del stack, nuevas funciones y anuncios. La transparencia es parte del trato.',
        )}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      {/* ── Live service status ─────────────────────────────────────────── */}
      <section className="section section--default">
        <div className="section-container">
          <div className={`gs-st__banner gs-st__banner--${overall}`}>
            <StatusDot state={overall} />
            <span className="gs-st__banner-text">{overallCopy}</span>
            <span className="gs-st__banner-meta">
              {lastChecked
                ? t(`checked ${fmtTime(lastChecked)} · rechecks every minute`, `comprobado ${fmtTime(lastChecked)} · se recomprueba cada minuto`)
                : ''}
            </span>
          </div>

          <div className="gs-st__services">
            {services.map(s => {
              const state = checks[s.id] || 'checking'
              return (
                <div key={s.id} className="gs-st__service">
                  <div className="gs-st__service-main">
                    <span className="gs-st__service-name">{s.name}</span>
                    <span className="gs-st__service-desc">{s.desc}</span>
                  </div>
                  <span className={`gs-st__pill gs-st__pill--${state}`}>
                    <StatusDot state={state} />
                    {STATE_LABEL[state]}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="gs-st__note">
            {t(
              'Checks run live in your browser, so this reflects what you can actually reach right now. Your content and backups live on separate, protected storage — if a public server ever fails, we rebuild from clean backups in hours.',
              'Las comprobaciones se ejecutan en vivo en tu navegador, así que esto refleja lo que realmente puedes alcanzar ahora mismo. Tu contenido y copias de seguridad viven en almacenamiento separado y protegido — si un servidor público llega a fallar, reconstruimos desde copias limpias en horas.',
            )}
          </p>
        </div>
      </section>

      {/* ── Updates feed ────────────────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="section-container">
          <p className="section-eyebrow">{t('Updates', 'Novedades')}</p>
          <h2 className="section-title">{t('Stack updates & announcements', 'Actualizaciones del stack y anuncios')}</h2>
          <p className="section-sub">
            {t(
              'Technical work on the platform, new capabilities, and business news — logged in the open.',
              'Trabajo técnico en la plataforma, nuevas capacidades y noticias del negocio — registrado a la vista.',
            )}
          </p>

          {posts === null && <div className="gs-st__feed" aria-busy="true"><div className="gs-st__skel" /><div className="gs-st__skel" /></div>}

          {posts?.length === 0 && (
            <div className="gs-st__empty">
              <p>{t('No updates posted yet — check back soon.', 'Aún no hay novedades publicadas — vuelve pronto.')}</p>
            </div>
          )}

          {posts?.length > 0 && (
            <ol className="gs-st__feed">
              {posts.map(p => {
                const cat = CATEGORY[p.category] || CATEGORY.announcement
                return (
                  <li key={p.id} className={`gs-st__entry${p.pinned ? ' is-pinned' : ''}`}>
                    <div className="gs-st__entry-head">
                      <span className={`gs-st__cat gs-st__cat--${cat.cls}`}>{t(cat.en, cat.es)}</span>
                      {p.publishedAt && <time className="gs-st__date" dateTime={p.publishedAt}>{fmtDate(p.publishedAt)}</time>}
                      {p.pinned && <span className="gs-st__pin" title={t('Pinned', 'Fijado')}>★</span>}
                    </div>
                    <h3 className="gs-st__entry-title">{p.title}</h3>
                    {p.body && <p className="gs-st__entry-body">{p.body}</p>}
                    {p.linkHref && (
                      <a className="gs-st__entry-link" href={p.linkHref} target="_blank" rel="noopener noreferrer">
                        {p.linkLabel || t('Learn more', 'Más información')} →
                      </a>
                    )}
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </section>

      <CtaBanner
        eyebrow={t('Questions about your service?', '¿Preguntas sobre tu servicio?')}
        headline={t('We’re one message away.', 'Estamos a un mensaje de distancia.')}
        subtext={t('Boston in person, everywhere else remote. English or Español.', 'Boston en persona, todo lo demás remoto. En inglés o español.')}
        cta={{ label: t('Get in touch', 'Contáctanos'), href: `mailto:${CONTACT_EMAIL}` }}
        variant="accent"
      />
    </>
  )
}
