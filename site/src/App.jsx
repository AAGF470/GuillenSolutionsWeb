import { useEffect, useRef, useState } from 'react'
import { Routes, Route, NavLink, Link, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { CONTACT_EMAIL } from './data'
import Home from './pages/Home.jsx'
import WorkAndLibrary from './pages/WorkAndLibrary.jsx'
import PlanPage from './pages/PlanPage.jsx'
import CmsPage from './pages/CmsPage.jsx'
import PayloadPage from './PayloadPage.jsx'
import Seo, { BUSINESS_SCHEMA } from './components/Seo.jsx'

// Per-route SEO — one source of truth regardless of whether the CMS layout
// or the bespoke fallback renders.
const SEO = {
  home: {
    title: 'Websites Small Businesses Own',
    description: 'Custom, content-managed websites with flat all-in pricing — and you own everything: domain, content, and every login. English & Español.',
    path: '/',
    schema: BUSINESS_SCHEMA,
  },
  work: {
    title: 'Our Work & Component Library',
    description: 'Three states, three industries, one 47+ component system — client sites for an electrician, a contractor, and a game studio, plus the live toolkit they were built from.',
    path: '/work',
  },
}

// Scroll to top on route change; scroll to hash target if present.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
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

function Nav() {
  const { pathname } = useLocation()
  return (
    <nav className="gs-nav" aria-label="Main">
      <Link to="/" className="gs-nav__logo">Guillen <span>Solutions</span></Link>
      <div className="gs-nav__links">
        <NavLink to="/" end className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>Home</NavLink>
        <NavDropdown
          label="Work & Library"
          active={pathname === '/work'}
          items={[
            { to: '/work',         label: 'Client work',            sub: 'Three industries, three states, one system' },
            { to: '/work#library', label: 'Live component library', sub: '47+ components, rendered on the page' },
          ]}
        />
        <NavDropdown
          label="Plans"
          active={pathname.startsWith('/plans')}
          items={[
            { to: '/plans/freelance', label: 'Freelance / Solo',   sub: '$600 first year · independent professionals' },
            { to: '/plans/standard',  label: 'Standard Business',  sub: '$950 first year · most popular' },
            { to: '/plans/wordpress', label: 'WordPress Business', sub: '$1,350 first year · maximum portability' },
          ]}
        />
      </div>
      <Link to="/#configure" className="gs-nav__cta">Build your quote</Link>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="gs-footer">
      <div className="gs-footer__inner">
        <div className="gs-footer__brand-col">
          <Link to="/" className="gs-footer__brand">Guillen <span>Solutions</span></Link>
          <p className="gs-footer__tagline">
            Honest, upfront web services for small businesses. You own your domain,
            your content, your accounts, and every login — no lock-in, ever.
          </p>
        </div>
        <div className="gs-footer__col">
          <span className="gs-footer__col-title">Explore</span>
          <Link to="/">Home</Link>
          <Link to="/work">Work & Library</Link>
          <Link to="/plans/freelance">Freelance plan</Link>
          <Link to="/plans/standard">Standard plan</Link>
          <Link to="/plans/wordpress">WordPress plan</Link>
        </div>
        <div className="gs-footer__col">
          <span className="gs-footer__col-title">Get in touch</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <Link to="/#configure">Build your quote</Link>
          <span className="gs-footer__muted">English &amp; Español</span>
        </div>
      </div>
      <div className="gs-footer__bottom">
        <span>© {new Date().getFullYear()} Guillen Solutions</span>
        <span>Built on our own component system · <a href="https://guillen.studio" target="_blank" rel="noopener noreferrer">guillen.studio</a></span>
      </div>
    </footer>
  )
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
