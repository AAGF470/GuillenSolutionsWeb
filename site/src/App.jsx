import { useEffect, useRef, useState } from 'react'
import { Routes, Route, NavLink, Link, Navigate, useLocation, useParams } from 'react-router-dom'
import './App.css'
import { CONTACT_EMAIL } from './data'
import { useContent } from './content.js'
import { useLang, useT } from './i18n.jsx'
import Home from './pages/Home.jsx'
import WorkAndLibrary from './pages/WorkAndLibrary.jsx'
import PlanPage from './pages/PlanPage.jsx'
import Pricing from './pages/Pricing.jsx'
import OnDemand from './pages/OnDemand.jsx'
import CGRenders from './pages/CGRenders.jsx'
import Guides from './pages/Guides.jsx'
import GuidePost from './pages/GuidePost.jsx'
import MarketGuide from './pages/MarketGuide.jsx'
import Status from './pages/Status.jsx'
import Contact from './pages/Contact.jsx'
import CmsPage from './pages/CmsPage.jsx'
import PayloadPage from './PayloadPage.jsx'
import Seo from './components/Seo.jsx'
import { homeSchema } from './schema'

// Per-route SEO — one source of truth regardless of whether the CMS layout
// or the bespoke fallback renders.
const SEO = {
  home: {
    title: 'Digital Business Solutions You Own',
    description: 'Websites, CG product renders, and business setup for small businesses — flat all-in pricing, and you own everything: domain, content, images, every login. English & Español.',
    path: '/',
    schema: homeSchema,
  },
  work: {
    title: 'Our Work & Component Library',
    description: 'Three states, three industries, one 47+ component system — client sites for an electrician, a contractor, and a game studio, plus the live toolkit they were built from.',
    path: '/work',
  },
}

// Scroll to top on route change; scroll to hash target if present.
// Hash targets can arrive AFTER navigation (CMS pages render async), so retry
// a few times before giving up — otherwise /#configure from another page
// lands at the top instead of the configurator.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    let cancelled = false
    const tryScroll = attempt => {
      if (cancelled) return
      const el = document.querySelector(hash)
      if (el) {
        // Instant jump: arriving from another page, animating thousands of
        // pixels is worse than landing there ('instant' also overrides any
        // CSS scroll-behavior).
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'instant' })
        return
      }
      if (attempt < 5) setTimeout(() => tryScroll(attempt + 1), 300 * (attempt + 1))
    }
    tryScroll(0)
    return () => { cancelled = true }
  }, [pathname, hash])
  return null
}

// Nav dropdown — click-to-open (works on touch), closes on outside click,
// Esc, or choosing an item.
function NavDropdown({ label, active, items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = e => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const esc = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc) }
  }, [open])
  return (
    <div className={`gs-nav__dd${open ? ' is-open' : ''}`} ref={ref}>
      <button
        type="button"
        className={`gs-nav__link gs-nav__dd-btn${active ? ' is-active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {label} <span className="gs-nav__dd-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="gs-nav__dd-menu">
          {items.map(item => (
            <Link key={item.to} to={item.to} className="gs-nav__dd-item" onClick={() => setOpen(false)}>
              <span className="gs-nav__dd-item-label">{item.label}</span>
              {item.sub && <span className="gs-nav__dd-item-sub">{item.sub}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// Nav groups are built per-render so the labels can be translated. `match`
// stays a path test; only the display strings pass through t().
function navGroups(t) {
  return [
    {
      label: t('Work & Library', 'Trabajo y biblioteca'), match: p => p === '/work',
      items: [
        { to: '/work',         label: t('Client work', 'Trabajo con clientes'),            sub: t('Three industries, three states, one system', 'Tres industrias, tres estados, un solo sistema') },
        { to: '/work#library', label: t('Live component library', 'Biblioteca de componentes en vivo'), sub: t('47+ components, rendered on the page', '47+ componentes, mostrados en la página') },
      ],
    },
    {
      label: t('Services', 'Servicios'), match: p => p.startsWith('/plans') || p === '/on-demand' || p === '/pricing' || p === '/renders',
      items: [
        { to: '/plans/freelance', label: t('Freelance / Solo website', 'Sitio Freelance / Individual'),  sub: t('$600 first year · independent professionals', '$600 el primer año · profesionales independientes') },
        { to: '/plans/standard',  label: t('Standard Business website', 'Sitio Negocio Estándar'), sub: t('$950 first year · most popular', '$950 el primer año · el más popular') },
        { to: '/plans/enhanced',  label: t('Online Business Enhanced', 'Negocio en Línea Enhanced'), sub: t('~$1,900 first year · actively managed', '~$1,900 el primer año · gestión activa') },
        { to: '/plans/private-hosting', label: t('Private Hosting Plan', 'Plan de Hosting Privado'), sub: t('WordPress or dedicated · in development', 'WordPress o dedicado · en desarrollo') },
        { to: '/renders',         label: t('CG product renders', 'Renders de producto 3D'),        sub: t('Model once, render many · from $150', 'Modela una vez, renderiza muchas · desde $150') },
        { to: '/on-demand',       label: t('On-demand services', 'Servicios a pedido'),        sub: t('Add later, whenever you need them', 'Agrégalos después, cuando los necesites') },
        { to: '/pricing',         label: t('Full pricing & order', 'Precios completos y pedido'),      sub: t('Every option on one page', 'Todas las opciones en una página') },
      ],
    },
  ]
}

// EN / ES segmented toggle. Reflects the active language and switches on click.
function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`gs-lang${className ? ` ${className}` : ''}`} role="group" aria-label="Language / Idioma">
      <button
        type="button"
        className={`gs-lang__btn${lang === 'en' ? ' is-active' : ''}`}
        aria-pressed={lang === 'en'} onClick={() => setLang('en')}
      >EN</button>
      <button
        type="button"
        className={`gs-lang__btn${lang === 'es' ? ' is-active' : ''}`}
        aria-pressed={lang === 'es'} onClick={() => setLang('es')}
      >ES</button>
    </div>
  )
}

function MobileMenu({ open, onClose }) {
  const t = useT()
  if (!open) return null
  return (
    <div className="gs-mnav" role="dialog" aria-label={t('Menu', 'Menú')}>
      <div className="gs-mnav__panel">
        <Link to="/" className="gs-mnav__link" onClick={onClose}>{t('Home', 'Inicio')}</Link>
        {navGroups(t).map(g => (
          <div key={g.label} className="gs-mnav__group">
            <span className="gs-mnav__group-label">{g.label}</span>
            {g.items.map(item => (
              <Link key={item.to} to={item.to} className="gs-mnav__link gs-mnav__link--sub" onClick={onClose}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <Link to="/guides" className="gs-mnav__link" onClick={onClose}>{t('Guides', 'Guías')}</Link>
        <Link to="/status" className="gs-mnav__link" onClick={onClose}>{t('Status', 'Estado')}</Link>
        <Link to="/contact" className="gs-mnav__link" onClick={onClose}>{t('Contact', 'Contacto')}</Link>
        <Link to="/pricing" className="gs-nav__cta gs-mnav__cta" onClick={onClose}>{t('Build your quote', 'Arma tu cotización')}</Link>
        <LangToggle className="gs-lang--mobile" />
      </div>
      <button type="button" className="gs-mnav__backdrop" aria-label={t('Close menu', 'Cerrar menú')} onClick={onClose} />
    </div>
  )
}

function Nav() {
  const { pathname } = useLocation()
  const t = useT()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { setMenuOpen(false) }, [pathname]) // close on navigation
  // Subtle elevation once the page scrolls under the bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const guidesActive = pathname === '/guides' || pathname.startsWith('/guides/')
  return (
    <nav className={`gs-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main">
      <Link to="/" className="gs-nav__logo">
        <span className="gs-nav__logo-mark" aria-hidden="true">G</span>
        <span className="gs-nav__logo-text">Guillen <span>Solutions</span></span>
      </Link>
      <div className="gs-nav__links">
        <NavLink to="/" end className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>{t('Home', 'Inicio')}</NavLink>
        {navGroups(t).map(g => (
          <NavDropdown key={g.label} label={g.label} active={g.match(pathname)} items={g.items} />
        ))}
        <NavLink to="/guides" className={`gs-nav__link${guidesActive ? ' is-active' : ''}`}>{t('Guides', 'Guías')}</NavLink>
        <NavLink to="/status" className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>{t('Status', 'Estado')}</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>{t('Contact', 'Contacto')}</NavLink>
      </div>
      <div className="gs-nav__actions">
        <LangToggle className="gs-lang--nav" />
        <Link to="/pricing" className="gs-nav__cta">{t('Build your quote', 'Arma tu cotización')}</Link>
      </div>
      <button
        type="button"
        className={`gs-nav__burger${menuOpen ? ' is-open' : ''}`}
        aria-label={menuOpen ? t('Close menu', 'Cerrar menú') : t('Open menu', 'Abrir menú')}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <i /><i /><i />
      </button>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  )
}

function Footer() {
  const t = useT()
  return (
    <footer className="gs-footer">
      <div className="gs-footer__inner">
        <div className="gs-footer__brand-col">
          <Link to="/" className="gs-footer__brand">Guillen <span>Solutions</span></Link>
          <p className="gs-footer__tagline">
            {t(
              'Honest, upfront digital services for small businesses — websites, product renders, and the setup around them. You own your domain, your content, your accounts, and every login — no lock-in, ever.',
              'Servicios digitales honestos y transparentes para pequeños negocios — sitios web, renders de producto y toda la preparación alrededor. Tú eres dueño de tu dominio, tu contenido, tus cuentas y cada acceso — sin ataduras, nunca.',
            )}
          </p>
          <p className="gs-footer__identity">
            {t('Proudly LGBTQ+ & Latino-owned · English & Español', 'Con orgullo, propiedad LGBTQ+ y latina · English & Español')}
          </p>
        </div>
        <div className="gs-footer__col">
          <span className="gs-footer__col-title">{t('Explore', 'Explora')}</span>
          <Link to="/">{t('Home', 'Inicio')}</Link>
          <Link to="/work">{t('Work & Library', 'Trabajo y biblioteca')}</Link>
          <Link to="/plans/freelance">{t('Freelance plan', 'Plan Freelance')}</Link>
          <Link to="/plans/standard">{t('Standard plan', 'Plan Estándar')}</Link>
          <Link to="/plans/enhanced">{t('Online Business Enhanced', 'Negocio en Línea Enhanced')}</Link>
          <Link to="/plans/private-hosting">{t('Private Hosting plan', 'Plan de Hosting Privado')}</Link>
          <Link to="/on-demand">{t('On-demand services', 'Servicios a pedido')}</Link>
          <Link to="/renders">{t('CG product renders', 'Renders de producto 3D')}</Link>
          <Link to="/pricing">{t('Full pricing & order', 'Precios completos y pedido')}</Link>
          <Link to="/guides">{t('Guides', 'Guías')}</Link>
          <Link to="/status">{t('Status & updates', 'Estado y novedades')}</Link>
        </div>
        <div className="gs-footer__col">
          <span className="gs-footer__col-title">{t('Get in touch', 'Contáctanos')}</span>
          <Link to="/contact">{t('Contact us', 'Contáctanos')}</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href="https://www.facebook.com/profile.php?id=61591594841523" target="_blank" rel="noopener noreferrer">Facebook</a>
          <Link to="/pricing">{t('Build your quote', 'Arma tu cotización')}</Link>
          <span className="gs-footer__muted">English &amp; Español</span>
        </div>
      </div>
      <div className="gs-footer__bottom">
        <span>© {new Date().getFullYear()} Guillen Solutions</span>
        <span>{t('Built on our own component system', 'Construido con nuestro propio sistema de componentes')} · <a href="https://guillen.studio" target="_blank" rel="noopener noreferrer">guillen.studio</a></span>
      </div>
    </footer>
  )
}

// /guides/:slug dispatcher — a static local-market guide if the slug is one of
// ours, otherwise the CMS-backed devlog post. Slugs are language-independent.
function GuideRoute() {
  const { slug } = useParams()
  const { LOCATION_GUIDES } = useContent()
  const guide = LOCATION_GUIDES.find(g => g.slug === slug)
  return guide ? <MarketGuide guide={guide} /> : <GuidePost />
}

export default function App() {
  return (
    <div className="gs-app">
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          {/* Main pages render from the CMS if a page exists at that slug with
              blocks; otherwise they fall back to the bespoke React page (shown
              immediately, no blank flash). Build a CMS page at the slug to take
              over. /components stays code-only (it's a live library showcase). */}
          <Route path="/" element={<PayloadPage slug="home" fallback={<Home />} fallbackWhileLoading seo={SEO.home} />} />
          {/* Merged Work + Component Library. Rendered directly (not via the
              CMS) so the live showcase stays code-only; the old CMS 'work'
              page is retired. */}
          <Route path="/work" element={<><Seo {...SEO.work} /><WorkAndLibrary /></>} />
          {/* Per-plan sales pages (config-driven, one component). */}
          <Route path="/plans/:planId" element={<PlanPage />} />
          <Route path="/on-demand" element={<OnDemand />} />
          <Route path="/renders" element={<CGRenders />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/guides" element={<Guides />} />
          {/* Known local-market slugs render the static MarketGuide; anything
              else falls through to the CMS-backed devlog post. */}
          <Route path="/guides/:slug" element={<GuideRoute />} />
          <Route path="/status" element={<Status />} />
          {/* Contact is CMS-takeover-capable: author a 'contact' page with blocks
              in /admin and it replaces the coded fallback (both locales). */}
          <Route path="/contact" element={<PayloadPage slug="contact" fallback={<Contact />} fallbackWhileLoading />} />
          {/* Old routes → merged destinations. */}
          <Route path="/components" element={<Navigate to="/work" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          {/* Any other CMS-authored page is live at its slug. */}
          <Route path="/:slug" element={<CmsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
