import { useEffect } from 'react'
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import './App.css'
import { CONTACT_EMAIL } from './data'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import ComponentLibrary from './pages/ComponentLibrary.jsx'
import About from './pages/About.jsx'
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
    title: 'Our Work',
    description: 'Three states, three industries, one component system — sites for an electrician, a contractor, and a game studio, all owned by the client.',
    path: '/work',
  },
  about: {
    title: 'About Us',
    description: 'Guillen Solutions exists because we watched a small business get taken advantage of — honest, upfront web services are the answer.',
    path: '/about',
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

function Nav() {
  return (
    <nav className="gs-nav" aria-label="Main">
      <Link to="/" className="gs-nav__logo">Guillen <span>Solutions</span></Link>
      <div className="gs-nav__links">
        <NavLink to="/" end className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>Home</NavLink>
        <NavLink to="/work" className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>Work</NavLink>
        <NavLink to="/components" className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>Component Library</NavLink>
        <NavLink to="/about" className={({ isActive }) => `gs-nav__link${isActive ? ' is-active' : ''}`}>About</NavLink>
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
          <Link to="/work">Work</Link>
          <Link to="/components">Component Library</Link>
          <Link to="/about">About</Link>
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
          <Route path="/work" element={<PayloadPage slug="work" fallback={<Work />} fallbackWhileLoading seo={SEO.work} />} />
          <Route path="/components" element={<>
            <Seo title="Component Library" path="/components"
              description="The live, mobile-ready component system every Guillen Solutions site is built from — heroes, pricing, galleries, FAQs, and more." />
            <ComponentLibrary />
          </>} />
          <Route path="/about" element={<PayloadPage slug="about" fallback={<About />} fallbackWhileLoading seo={SEO.about} />} />
          {/* Any other CMS-authored page is live at its slug. */}
          <Route path="/:slug" element={<CmsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
