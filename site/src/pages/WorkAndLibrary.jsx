import { HeroSection, CtaBanner } from '@aagf470/ui'
import { LibraryFacts, LibraryShowcase } from './ComponentLibrary.jsx'
import './Work.css'

// ---------------------------------------------------------------------------
// Work & Library — merged showcase page: what we've built (client work) and
// what we build with (the live component system). One narrative: the proof,
// then the machine behind it.
// ---------------------------------------------------------------------------

const CLIENTS = [
  {
    name: 'Angel Electrical Services',
    location: 'Dallas, Texas',
    industry: 'Licensed Electrician',
    url: 'angelelectrical.com',
    image: '/img/work/angel-electrical.svg',
    blurb: 'A trust-first site for a residential & commercial electrician — clear service list, service-area coverage, and a quote form that routes straight to the owner.',
    quote: 'Booked three new commercial jobs the first month. The site finally looks as professional as the work we do.',
    author: 'Angel R.',
    role: 'Owner',
  },
  {
    name: 'FencingPatrol',
    location: 'Long Island, New York',
    industry: 'General Contractor',
    url: 'fencingpatrol.com',
    image: '/img/work/fencingpatrol.svg',
    blurb: 'A bold, bilingual site for a family contractor — roofing, fencing, and paving, with a project gallery and a call-first layout in English and Español.',
    quote: 'Sending people one link that shows everything we do — in both languages — changed how we win jobs.',
    author: 'FencingPatrol',
    role: 'Family crew',
  },
  {
    name: 'Cryark Inc',
    location: 'Boston, Massachusetts',
    industry: 'Game Development Studio',
    url: 'cryark.net',
    image: '/img/work/cryark.svg',
    blurb: 'A cinematic, dark-mode studio site for a game & tools developer — product showcases, a devlog, and a component-driven docs system.',
    quote: 'It carries the mood of what we make. The same system that built a contractor site scaled to a full studio presence.',
    author: 'Cryark',
    role: 'Studio team',
  },
]

const REACH = [
  { stat: '3', label: 'states', sub: 'Texas · New York · Massachusetts' },
  { stat: '3', label: 'industries', sub: 'Electrical · Construction · Games' },
  { stat: '1', label: 'component system', sub: 'behind every one of them' },
]

// Design concepts — spec builds that prove the range (and, for the boutique,
// double as a showcase of the CG product renders). Live, scrollable, labeled
// as concepts. Add more here as the portfolio grows.
const EXAMPLES = [
  {
    name: 'Marigold & Ash',
    kind: 'Hair studio & spa · design concept',
    url: 'marigoldandash.com',
    href: '/examples/salon/index.html',
    blurb: 'Warm, editorial, photo-forward — the presentation an aesthetic-driven business lives or dies on. A world away from a template, and from a dark technical brand.',
  },
  {
    name: 'Ember & Field',
    kind: 'Candles & ceramics · design concept',
    url: 'emberandfield.com',
    href: '/examples/boutique/index.html',
    blurb: 'A product-forward shop for a small-batch maker — clean, tactile, gallery-minimal. The product grid is exactly where our CG renders live: model once, shoot every listing.',
  },
  {
    name: 'Copper & Rye',
    kind: 'Cocktail bar & kitchen · design concept',
    url: 'copperandrye.com',
    href: '/examples/bar/index.html',
    blurb: 'Dark, cinematic, and moody — near-black and copper with a high-contrast serif. The same system can turn the lights way down for a bar or restaurant.',
  },
  {
    name: 'Kinetic',
    kind: 'Fitness studio · design concept',
    url: 'kineticstudio.com',
    href: '/examples/studio/index.html',
    blurb: 'Loud, bold, color-blocked, high-energy — heavy type and electric coral. Proof the range runs all the way to confident and kinetic, not just calm and premium.',
  },
]

function BrowserFrame({ url, image, alt }) {
  return (
    <div className="work-frame">
      <div className="work-frame__bar">
        <span className="work-frame__dots"><i /><i /><i /></span>
        <span className="work-frame__url">{url}</span>
      </div>
      <img className="work-frame__screen" src={image} alt={alt} loading="lazy" />
    </div>
  )
}

export default function WorkAndLibrary() {
  return (
    <>
      <HeroSection
        eyebrow="Our work"
        headline="Custom sites, built to be owned."
        subtext="From a boutique salon to a Long Island contractor to a Boston game studio — genuinely different businesses, genuinely different looks, none of them a template. Every one designed to fit the business, and owned by the client outright. Concepts and real client work below."
        size="compact"
        variant="alt"
        ctas={[]}
      />

      {/* Reach / versatility stats */}
      <section className="section section--default work-reach-sec">
        <div className="section-container">
          <div className="work-reach">
            {REACH.map(r => (
              <div key={r.label} className="work-reach__item">
                <span className="work-reach__stat">{r.stat}</span>
                <span className="work-reach__label">{r.label}</span>
                <span className="work-reach__sub">{r.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client showcases */}
      <section className="section section--alt work-list-sec">
        <div className="section-container">
          {CLIENTS.map((c, i) => (
            <article key={c.name} className={`work-item${i % 2 ? ' work-item--reverse' : ''}`}>
              <div className="work-item__media">
                <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer"
                  className="work-item__link" aria-label={`Visit ${c.name} (opens in a new tab)`}>
                  <BrowserFrame url={c.url} image={c.image} alt={`${c.name} website`} />
                </a>
              </div>
              <div className="work-item__info">
                <span className="work-item__badge">{c.location}</span>
                <h2 className="work-item__name">{c.name}</h2>
                <p className="work-item__industry">{c.industry}</p>
                <p className="work-item__blurb">{c.blurb}</p>
                <blockquote className="work-quote">
                  <p>“{c.quote}”</p>
                  <footer><strong>{c.author}</strong> · {c.role}</footer>
                </blockquote>
                <span className="work-item__note">Site view is a design placeholder</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Design concepts — live, scrollable spec sites that prove the range */}
      <section className="section section--default work-examples-sec">
        <div className="section-container">
          <p className="section-eyebrow">Design concepts</p>
          <h2 className="section-title">What "custom" actually looks like</h2>
          <p className="section-sub">
            Everyone says "custom." Here's the proof — concept builds for the kind of
            businesses whose first impression is everything. Different worlds, different
            looks, none of them a template. They're live: open one and scroll.
          </p>
          <div className="work-examples">
            {EXAMPLES.map(ex => (
              <a key={ex.href} className="work-concept" href={ex.href} target="_blank" rel="noopener noreferrer">
                <div className="work-frame">
                  <div className="work-frame__bar">
                    <span className="work-frame__dots"><i /><i /><i /></span>
                    <span className="work-frame__url">{ex.url}</span>
                  </div>
                  <div className="work-concept__viewport">
                    <iframe
                      className="work-concept__frame"
                      src={ex.href}
                      title={`${ex.name} — design concept`}
                      loading="lazy" tabIndex={-1} aria-hidden="true" scrolling="no"
                    />
                  </div>
                </div>
                <div className="work-concept__cap">
                  <h3 className="work-concept__name">{ex.name}</h3>
                  <p className="work-concept__kind">{ex.kind}</p>
                  <p className="work-concept__blurb">{ex.blurb}</p>
                  <span className="work-concept__cta">Open the live concept ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The system behind the work */}
      <LibraryFacts />

      {/* The live showcase — every component, rendered from sample content */}
      <section className="section section--default" id="library" style={{ paddingBottom: 0 }}>
        <div className="section-container">
          <p className="section-eyebrow">The toolkit, live</p>
          <h2 className="section-title">Every component, rendered right here</h2>
          <p className="section-sub">
            Everything below is a real production component shown with sample content —
            mobile-ready, light and dark, tested once and reused everywhere. Your site is
            composed from these, themed to your business.
          </p>
        </div>
      </section>
      <LibraryShowcase />

      <CtaBanner
        eyebrow="Your industry's next"
        headline="Whatever you do, we can build it — and hand it to you."
        subtext="Different trade, different state, different style. Same honest, you-own-everything setup."
        cta={{ label: 'Build your quote', href: '/pricing#order' }}
        variant="accent"
      />
    </>
  )
}
