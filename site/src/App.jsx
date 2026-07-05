import { useEffect, useRef, useState } from 'react'
import { Routes, Route, NavLink, Link, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { CONTACT_EMAIL } from './data'
import Home from './pages/Home.jsx'
import WorkAndLibrary from './pages/WorkAndLibrary.jsx'
import PlanPage from './pages/PlanPage.jsx'
import Pricing from './pages/Pricing.jsx'
import OnDemand from './pages/OnDemand.jsx'
import CGRenders from './pages/CGRenders.jsx'
import Guides from './pages/Guides.jsx'
import GuidePost from './pages/GuidePost.jsx'
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

const NAV_GROUPS = [
  {
    label: 'Work & Library', match: p => p === '/work',
    items: [
      { to: '/work',         label: 'Client work',            sub: 'Three industries, three states, one system' },
      { to: '/work#library', label: 'Live component library', sub: '47+ components, rendered on the page' },
    ],
  },
  {
    label: 'Services', match: p => p.startsWith('/plans') || p === '/on-demand' || p === '/pricing' || p === '/renders',
    items: [
      { to: '/plans/freelance', label: 'Freelance / Solo website',  sub: '$600 first year · independent professionals' },
      { to: '/plans/standard',  label: 'Standard Business website', sub: '$950 first year · most popular' },
      { to: '/plans/wordpress', label: 'WordPress Business website', sub: '$1,350 first year · maximum portability' },
      { to: '/renders',         label: 'CG product renders',        sub: 'Model once, render many · from $150' },
      { to: '/on-demand',       label: 'On-demand services',        sub: 'Add later, whenever you need them' },
      { to: '/pricing',         label: 'Full pricing & order',      sub: 'Every option on one page' },
    ],
  },
]

function MobileMenu({ open, onClose }) {
  if (!open) return null
  return (
    <div className="gs-mnav" role="dialog" aria-label="Menu">
      <div className="gs-mnav__panel">
        <Link to="/" className="gs-mnav__link" onClick={onClose}>Home</Link>
        {NAV_GROUPS.map(g => (
          <div key={g.label} className="gs-mnav__group">
            <span className="gs-mnav__group-label">{g.label}</span>
            {g.items.map(item => (
              <Link key={item.to} to={item.to} className="gs-mnav__link gs-mnav__link--sub" onClick={onClose}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <Link to="/pricing" className="gs-nav__cta gs-mnav__cta" onClick={onClose}>Build your quote</Link>
      </div>
      <button type="button" className="gs-mnav__backdrop" aria-label="Close menu" onClick={onClose} />
    </div>
  )
}

function Nav() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { setMenuOpen(false) }, [pathname]) // close on navigation
  return (
    <nav className="gs-nav" aria-label="Main">
      <Link to="/" className="gs-nav__logo">Guillen <span>Solutions</span></Link>
      <div className="gs-nav__links">
        <NavLink to="/" end className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>Home</NavLink>
        {NAV_GROUPS.map(g => (
          <NavDropdown key={g.label} label={g.label} active={g.match(pathname)} items={g.items} />
        ))}
      </div>
      <Link to="/pricing" className="gs-nav__cta">Build your quote</Link>
      <button
        type="button"
        className={`gs-nav__burger${menuOpen ? ' is-open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
  return (
    <footer className="gs-footer">
      <div className="gs-footer__inner">
        <div className="gs-footer__brand-col">
          <Link to="/" className="gs-footer__brand">Guillen <span>Solutions</span></Link>
          <p className="gs-footer__tagline">
            Honest, upfront digital services for small businesses — websites, product
            renders, and the setup around them. You own your domain, your content,
            your accounts, and every login — no lock-in, ever.
          </p>
        </div>
        <div className="gs-footer__col">
          <span className="gs-footer__col-title">Explore</span>
          <Link to="/">Home</Link>
          <Link to="/work">Work & Library</Link>
          <Link to="/plans/freelance">Freelance plan</Link>
          <Link to="/plans/standard">Standard plan</Link>
          <Link to="/plans/wordpress">WordPress plan</Link>
          <Link to="/on-demand">On-demand services</Link>
          <Link to="/renders">CG product renders</Link>
          <Link to="/pricing">Full pricing &amp; order</Link>
          <Link to="/guides">Guides</Link>
        </div>
        <div className="gs-footer__col">
          <span className="gs-footer__col-title">Get in touch</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <Link to="/pricing">Build your quote</Link>
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
          <Route path="/on-demand" element={<OnDemand />} />
          <Route path="/renders" element={<CGRenders />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<GuidePost />} />
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
