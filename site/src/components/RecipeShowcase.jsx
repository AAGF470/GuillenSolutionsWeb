import { useEffect, useState } from 'react'
import { HeroSection, FeatureGrid, CtaBanner, recipeVars, loadRecipeFont } from '@aagf470/ui'
import './RecipeShowcase.css'

// ---------------------------------------------------------------------------
// RecipeShowcase — the "same system, nothing alike" proof, live.
// One fictional business, one accent color, identical content — rendered
// through three style recipes. Everything changes (type, palette, rhythm,
// corners, structure) except the words.
// ---------------------------------------------------------------------------

const DEMO_RECIPES = ['editorial-paper', 'bold-trade', 'dark-cinematic']
const ACCENT = '#1c5b8a' // one brand color, held constant across all three

const CONTENT = {
  hero: {
    eyebrow: 'Rivera Plumbing Co. · Licensed & insured',
    headline: 'Plumbing done right, the first time.',
    subtext: 'Two decades of repairs, remodels, and emergency calls across the county. Upfront pricing before any work starts.',
    ctas: [{ label: 'Get a quote', href: '#', variant: 'solid' }],
  },
  grid: {
    eyebrow: 'Services',
    headline: 'What we handle',
    items: [
      { icon: 'droplet', title: 'Repairs', body: 'Leaks, clogs, water heaters — fixed same week, guaranteed for a year.' },
      { icon: 'wrench',  title: 'Remodels', body: 'Full bathroom and kitchen rough-ins, coordinated with your contractor.' },
      { icon: 'clock',   title: 'Emergencies', body: 'Burst pipe at midnight? On call around the clock, no weekend markup.' },
    ],
  },
  cta: {
    eyebrow: 'Free estimates',
    headline: 'Tell us what broke.',
    subtext: 'A real person answers. Upfront number before we pick up a tool.',
    cta: { label: 'Call now', href: '#', variant: 'solid' },
  },
}

export default function RecipeShowcase() {
  const [active, setActive] = useState(DEMO_RECIPES[0])
  const recipes = DEMO_RECIPES.map(id => recipeVars(id, ACCENT))
  const current = recipes.find(r => r.id === active)

  // Preload all three display faces once so switching is instant.
  useEffect(() => {
    recipes.forEach(r => loadRecipeFont(r.fontUrl, `recipe-demo-font-${r.id}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="section section--alt">
      <div className="section-container">
        <p className="section-eyebrow">Style recipes</p>
        <h2 className="section-title">Same content. Same brand color. Nothing alike.</h2>
        <p className="section-sub">
          Every word below is identical across the three versions, and so is the accent
          color. The recipe changes everything else: typeface, palette, spacing, corners,
          and structure. This is how the same system gives every client their own site.
        </p>

        <div className="recipe-tabs" role="tablist" aria-label="Style recipe">
          {recipes.map(r => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={r.id === active}
              className={`recipe-tab${r.id === active ? ' is-active' : ''}`}
              onClick={() => setActive(r.id)}
            >
              <span className="recipe-tab__name">{r.name}</span>
              <span className="recipe-tab__blurb">{r.blurb}</span>
            </button>
          ))}
        </div>

        <div className="recipe-stage" style={current.vars} data-dark={current.dark || undefined}>
          <HeroSection
            {...CONTENT.hero}
            size="compact"
            expression={current.expressions.hero}
          />
          <FeatureGrid
            {...CONTENT.grid}
            columns={3}
            expression={current.expressions.featureGrid}
            variant="alt"
          />
          <CtaBanner {...CONTENT.cta} variant="accent" />
        </div>
      </div>
    </section>
  )
}
