import { HeroSection, CtaBanner } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import {
  CG_RENDER_LEAD, CG_RENDER_ADVANTAGE, CG_RENDER_TIERS, CG_RENDER_SHOTS,
  CG_RENDER_PACKAGES, CG_RENDER_NOTES, CONTACT_EMAIL,
} from '../data'
import './CGRenders.css'

// ---------------------------------------------------------------------------
// CG Product Renders — a separate visual service (not web). Priced around the
// "model once, render many" advantage: complexity-tiered per-product base,
// cheap additional shots, and affordable multi-shot e-commerce packages.
//
// IMAGE PLACEHOLDERS: each .gs-cg__ph is a swap slot. Drop a file into
// site/public/img/renders/ and replace the <div className="gs-cg__ph">…</div>
// with <img className="gs-cg__img" src="/img/renders/your-file.jpg" alt="…" />.
// ---------------------------------------------------------------------------

const quoteHref =
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('CG product render quote')}` +
  `&body=${encodeURIComponent(
    'Hi — I\'d like a quote for product renders.\n\n' +
    'Product(s): \n' +
    'Roughly how many shots per product: \n' +
    'Do you also need a website (bundle discount)? : \n\n' +
    '(Links or photos of the product help us tier complexity.)'
  )}`

// A swappable image slot. Replace with <img> when the real render exists.
function Shot({ label, file, wide }) {
  return (
    <figure className={`gs-cg__shot${wide ? ' gs-cg__shot--wide' : ''}`}>
      <div className="gs-cg__ph">
        <span className="gs-cg__ph-tag">Add image</span>
        <small>/img/renders/{file}</small>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  )
}

export default function CGRenders() {
  return (
    <>
      <Seo
        title="CG Product Renders"
        description="Studio-quality 3D product images for e-commerce — model once, render many. Complexity-tiered per product, cheap extra shots, affordable multi-shot packages. Bundle with a website or order standalone."
        path="/renders"
      />

      <HeroSection
        eyebrow="Product renders · model once, render many"
        headline="Studio-quality product images, without the studio."
        subtext="We build your product in 3D once, then light and render it in our standardized studio scene. No samples shipped, no photographer booked, no reshoot fees — and every extra shot is cheap, because the model already exists."
        size="compact"
        variant="alt"
        ctas={[
          { label: 'Get a quote', href: quoteHref, variant: 'solid' },
          { label: 'See pricing', href: '#pricing', variant: 'ghost' },
        ]}
      />

      {/* ── The advantage ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="section-container">
          <p className="section-eyebrow">Why it's affordable</p>
          <h2 className="section-title">One model. Every shot you need.</h2>
          <p className="section-sub">{CG_RENDER_LEAD}</p>
          <div className="gs-cg__adv">
            {CG_RENDER_ADVANTAGE.map((a, i) => (
              <div className="gs-cg__adv-card" key={a.title}>
                <span className="gs-cg__adv-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery of placeholders ───────────────────────────────────── */}
      <section className="section section--alt">
        <div className="section-container">
          <p className="section-eyebrow">Recent work</p>
          <h2 className="section-title">From studio packs to lifestyle heroes</h2>
          <p className="section-sub">
            Placeholders below — swap in real renders as we build the portfolio.
            The same model produces the clean listing shots and the staged scenes.
          </p>
          <div className="gs-cg__gallery">
            <Shot wide label="Lifestyle hero — product staged in a real scene" file="lifestyle-hero.jpg" />
            <Shot label="White-background listing shot" file="studio-front.jpg" />
            <Shot label="Three-quarter angle" file="studio-34.jpg" />
            <Shot label="Detail crop — materials & finish" file="detail.jpg" />
            <Shot label="Color / label variant" file="variant.jpg" />
            <Shot wide label="Second lifestyle scene — ad / banner ready" file="lifestyle-2.jpg" />
          </div>
        </div>
      </section>

      {/* ── Pricing: complexity tiers ─────────────────────────────────── */}
      <section className="section" id="pricing">
        <div className="section-container">
          <p className="section-eyebrow">Per-product base</p>
          <h2 className="section-title">Priced by complexity, not guesswork</h2>
          <p className="section-sub">
            Each product's base covers the 3D model plus your first studio shot.
            We tier by modeling effort — never flat-rate — because that's the part
            that actually varies.
          </p>
          <div className="gs-cg__tiers">
            {CG_RENDER_TIERS.map(t => (
              <div className={`gs-cg__tier${t.featured ? ' is-featured' : ''}`} key={t.id}>
                {t.featured && <span className="gs-cg__tier-badge">Most common</span>}
                <h3 className="gs-cg__tier-name">{t.name}</h3>
                <p className="gs-cg__tier-price">{t.price}</p>
                <p className="gs-cg__tier-per">{t.per}</p>
                <p className="gs-cg__tier-body">{t.body}</p>
                <p className="gs-cg__tier-eg"><span>Examples</span>{t.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Add-on shots ──────────────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="section-container">
          <p className="section-eyebrow">More shots, once the model exists</p>
          <h2 className="section-title">Extra renders are the cheap part</h2>
          <div className="gs-cg__shots">
            {CG_RENDER_SHOTS.map(s => (
              <div className="gs-cg__shotrow" key={s.id}>
                <div className="gs-cg__shotrow-head">
                  <h3>{s.name}</h3>
                  <span className="gs-cg__shotrow-price">{s.price}<small>{s.per}</small></span>
                </div>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────────────────── */}
      <section className="section" id="packages">
        <div className="section-container">
          <p className="section-eyebrow">The small-business sweet spot</p>
          <h2 className="section-title">Multi-shot packages</h2>
          <p className="section-sub">
            Built on one model, so a whole listing gallery stays affordable. All
            files are full-resolution and yours to keep.
          </p>
          <div className="gs-cg__packs">
            {CG_RENDER_PACKAGES.map(p => (
              <div className={`gs-cg__pack${p.featured ? ' is-featured' : ''}`} key={p.id}>
                {p.badge && <span className="gs-cg__pack-badge">{p.badge}</span>}
                <h3 className="gs-cg__pack-name">{p.name}</h3>
                <p className="gs-cg__pack-price">{p.price}</p>
                <p className="gs-cg__pack-body">{p.body}</p>
                <ul className="gs-cg__pack-list">
                  {p.includes.map(x => <li key={x}>{x}</li>)}
                </ul>
                <a className="gs-cg__pack-cta" href={quoteHref}>Start this package</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notes: bundle / standalone / market / quote ───────────────── */}
      <section className="section section--alt">
        <div className="section-container">
          <div className="gs-cg__notes">
            <div className="gs-cg__note gs-cg__note--accent">
              <span className="gs-cg__note-tag">Bundle &amp; save</span>
              <p>{CG_RENDER_NOTES.bundled}</p>
            </div>
            <div className="gs-cg__note">
              <span className="gs-cg__note-tag">Standalone</span>
              <p>{CG_RENDER_NOTES.standalone}</p>
            </div>
            <div className="gs-cg__note">
              <span className="gs-cg__note-tag">Where we fit</span>
              <p>{CG_RENDER_NOTES.market}</p>
            </div>
            <div className="gs-cg__note">
              <span className="gs-cg__note-tag">How we quote</span>
              <p>{CG_RENDER_NOTES.quote}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Send us your product"
        headline="Get a per-product quote — free, in writing."
        subtext="Share a link or a few photos and rough shot count. We'll tier the complexity and send a fixed number before any work starts. Bundling with a website? Ask about the 15% discount."
        cta={{ label: 'Get a quote', href: quoteHref }}
        variant="accent"
      />
    </>
  )
}
