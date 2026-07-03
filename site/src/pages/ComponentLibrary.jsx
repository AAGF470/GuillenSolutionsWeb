import { Link } from 'react-router-dom'
import {
  HeroSection,
  FeatureGrid,
  Steps,
  PricingPlans,
  ServiceList,
  HoursLocation,
  Gallery,
  Testimonials,
  Faq,
  ImageText,
  CtaBanner,
  ContactSection,
  NewsletterSignup,
} from '@aagf470/ui'

// ---------------------------------------------------------------------------
// Component library — living showcase. Every section is rendered live from
// sample data inside a labeled frame. The showcase is exported standalone so
// the merged Work & Library page embeds it; it stays code-only by design
// (it's a demo, not content).
// ---------------------------------------------------------------------------

function Spec({ name, tag, desc, children }) {
  return (
    <section className="gs-spec">
      <div className="gs-spec__head">
        <h2 className="gs-spec__name">{name}</h2>
        <span className="gs-spec__tag">{tag}</span>
      </div>
      <p className="gs-spec__desc">{desc}</p>
      <div className="gs-spec__demo">{children}</div>
    </section>
  )
}

const IMG = ['/img/sample-1.svg', '/img/sample-2.svg', '/img/sample-3.svg']

// Every exported component, grouped — the compact name-grid at the end of the
// showcase. No live demos for these (the page is long enough); the specs above
// demo the workhorses.
const CATALOG = [
  { label: 'Sections', items: [
    'HeroSection', 'FeatureGrid', 'Steps', 'ImageText', 'Testimonials', 'Gallery',
    'Faq', 'PricingPlans', 'ServiceList', 'HoursLocation', 'CtaBanner',
    'ContactSection', 'Checklist', 'NewsletterSignup',
  ] },
  { label: 'Content blocks', items: [
    'TitleBlock', 'CalloutBlock', 'CodeBlock', 'ImageBlock', 'FactGrid',
    'ScreenshotGallery', 'VideoPlayer', 'SideBySide', 'ContentCards',
    'RoadmapBlock', 'ChangelogBlock', 'SystemRequirements', 'AssetGrid',
    'HierarchyBlock', 'ArchitectureBlock', 'RawDiagramBlock', 'Spacer',
  ] },
  { label: 'Showcase pieces', items: [
    'CinematicHero', 'CinematicBanner', 'FeatureSpotlight', 'LabHero',
    'EmbeddedApp', 'PricingCTA', 'PlatformBadge', 'ProductInfoBar',
    'BackgroundCanvas', 'PageLoader', 'DocLayout', 'DocSidebar',
    'Button', 'Card', 'Pill', 'SiteNav', 'SocialIcon',
  ] },
]

// The four-card value strip — how the library works for clients.
export function LibraryFacts() {
  return (
    <FeatureGrid
      eyebrow="How the library works for you"
      headline="Bigger with every project — safer for every client"
      items={[
        { icon: 'layers', title: '47+ and counting',        body: 'Heroes, pricing tables, galleries, FAQs, forms, checklists — a deep, diverse toolkit that already covers most of what a business site needs.' },
        { icon: 'zap',    title: 'Grows with every project', body: 'When a client needs something new, we build it into the library — so every site we ship makes the next one better, faster, and cheaper.' },
        { icon: 'shield', title: 'Controlled access',        body: 'You edit your content freely; the design, layout, and device behavior are locked inside the components. You can’t break your own site.' },
        { icon: 'star',   title: 'One system, any look',     body: 'A single theme file restyles the whole library — the same components power a contractor, a game studio, and this very page.' },
      ]}
      columns={4}
      variant="alt"
    />
  )
}

export function LibraryShowcase() {
  return (
    <div className="gs-showcase">
      <div className="gs-showcase__inner">

        <Spec name="Hero" tag="<HeroSection />"
          desc="The page opener — headline, supporting line, and call-to-action buttons.">
          <HeroSection
            eyebrow="Your business"
            headline="A headline that sells in one line."
            subtext="Supporting copy that explains what you do and why it matters, then points to the next step."
            ctas={[{ label: 'Primary action', href: '#', variant: 'solid' }, { label: 'Secondary', href: '#', variant: 'ghost' }]}
          />
        </Spec>

        <Spec name="Hero — editorial expression" tag='<HeroSection expression="editorial" />'
          desc="Same hero content, different skeleton: masthead rule, headline left, supporting copy in a right column.">
          <HeroSection
            expression="editorial" size="compact"
            eyebrow="Same content, new bones"
            headline="One component, several silhouettes."
            subtext="Expressions change the structure, not the content — so two sites built from the same block never share a skeleton."
            ctas={[{ label: 'Primary action', href: '#', variant: 'solid' }]}
          />
        </Spec>

        <Spec name="Feature grid" tag="<FeatureGrid />"
          desc="A responsive grid of icon + title + text — for services, benefits, or trust signals.">
          <FeatureGrid
            eyebrow="Why us" headline="Three reasons to pick you"
            columns={3}
            items={[
              { icon: 'shield', title: 'Trustworthy', body: 'A short line explaining this benefit to your customer.' },
              { icon: 'zap',    title: 'Fast',        body: 'A short line explaining this benefit to your customer.' },
              { icon: 'star',   title: 'Proven',      body: 'A short line explaining this benefit to your customer.' },
            ]}
          />
        </Spec>

        <Spec name="Feature grid — list expression" tag='<FeatureGrid expression="list" />'
          desc="The same items as numbered editorial rows — reads like a manifesto instead of a card grid.">
          <FeatureGrid
            expression="list"
            eyebrow="Why us" headline="Three reasons, restated"
            items={[
              { title: 'Trustworthy', body: 'A short line explaining this benefit to your customer.' },
              { title: 'Fast',        body: 'A short line explaining this benefit to your customer.' },
              { title: 'Proven',      body: 'A short line explaining this benefit to your customer.' },
            ]}
          />
        </Spec>

        <Spec name="Steps" tag="<Steps />"
          desc="A numbered vertical process — how it works, onboarding, or your service flow.">
          <Steps
            eyebrow="How it works" headline="Three simple steps"
            items={[
              { title: 'First', body: 'What happens at this stage, in one or two plain sentences.' },
              { title: 'Then',  body: 'What happens at this stage, in one or two plain sentences.' },
              { title: 'Done',  body: 'What happens at this stage, in one or two plain sentences.' },
            ]}
          />
        </Spec>

        <Spec name="Pricing / packages" tag="<PricingPlans />"
          desc="Package cards with a name, price, feature list, optional 'most popular' badge, and CTA.">
          <PricingPlans
            headline="Simple pricing"
            plans={[
              { tag: 'Starter', name: 'Basic', price: '$500', period: 'one-time', description: 'For getting started.', features: ['One page', 'Hosting included', 'Yours to keep'], cta: { label: 'Choose', href: '#', variant: 'ghost-bordered' } },
              { badge: 'Most popular', tag: 'Complete', name: 'Standard', price: '$950', period: 'first year', description: 'The full setup.', features: ['Multi-page site', 'Managed hosting', 'Content editor', 'Everything is yours'], featured: true, cta: { label: 'Choose', href: '#', variant: 'solid' } },
            ]}
          />
        </Spec>

        <Spec name="Service list / menu" tag="<ServiceList />"
          desc="A clean menu of services with optional prices and a dotted leader — great for salons or contractors.">
          <ServiceList
            headline="Services & pricing" columns={2}
            services={[
              { name: 'Service one',   description: 'Short description of what it includes', price: 'from $65' },
              { name: 'Service two',   description: 'Short description of what it includes', price: '$40' },
              { name: 'Service three', description: 'Short description of what it includes', price: '$120' },
              { name: 'Service four',  description: 'Short description of what it includes', price: 'Quote' },
            ]}
          />
        </Spec>

        <Spec name="Hours + location" tag="<HoursLocation />"
          desc="A business-hours table with address, phone, email, and an optional embedded map.">
          <HoursLocation
            eyebrow="Come see us" headline="Hours & location"
            hours={[
              { day: 'Mon–Fri', time: '9:00 AM – 5:00 PM' },
              { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
              { day: 'Sunday', closed: true },
            ]}
            address="123 Main Street, Your Town, NY 10001"
            phone="(555) 555-0100"
            email="hello@yourbusiness.com"
          />
        </Spec>

        <Spec name="Gallery" tag="<Gallery />"
          desc="A responsive image grid with hover captions — completed projects, looks, or products.">
          <Gallery
            eyebrow="Our work" headline="Recent projects" columns={3} aspect="4 / 3"
            images={[
              { src: IMG[0], alt: 'Sample', caption: 'Project one' },
              { src: IMG[1], alt: 'Sample', caption: 'Project two' },
              { src: IMG[2], alt: 'Sample', caption: 'Project three' },
            ]}
          />
        </Spec>

        <Spec name="Testimonials" tag="<Testimonials />"
          desc="Client quotes with auto-generated avatar initials and attribution.">
          <Testimonials
            eyebrow="Kind words" headline="What clients say"
            items={[
              { quote: 'A genuine, specific quote from a happy customer goes right here.', author: 'Jordan P.', role: 'Owner', company: 'Local Co.' },
              { quote: 'Another short, believable testimonial that builds trust with visitors.', author: 'Sam R.', role: 'Manager', company: 'Shop Inc.' },
            ]}
          />
        </Spec>

        <Spec name="FAQ" tag="<Faq />"
          desc="An accessible accordion built on native details/summary — keyboard-friendly, no JavaScript required.">
          <Faq
            eyebrow="Questions" headline="Frequently asked"
            items={[
              { q: 'A common question customers ask?', a: 'A clear, reassuring answer in one or two sentences.' },
              { q: 'Another thing people want to know?', a: 'A clear, reassuring answer in one or two sentences.' },
            ]}
          />
        </Spec>

        <Spec name="Image + text" tag="<ImageText />"
          desc="A two-column split — image on one side, copy and an optional button on the other.">
          <ImageText
            eyebrow="About" headline="Tell your story"
            body="A paragraph about your business, your values, or what makes you different — paired with a supporting image."
            image={IMG[2]} imageAlt="Sample"
            cta={{ label: 'Learn more', href: '#', variant: 'ghost-bordered' }}
          />
        </Spec>

        <Spec name="CTA banner" tag="<CtaBanner />"
          desc="A bold, full-width call-to-action — usually a colored section that closes the page.">
          <CtaBanner
            eyebrow="Ready?" headline="A strong closing call to action"
            subtext="One last nudge toward the thing you want visitors to do."
            cta={{ label: 'Get started', href: '#' }}
            variant="accent"
          />
        </Spec>

        <Spec name="Newsletter signup" tag="<NewsletterSignup />"
          desc="An email-capture band that posts straight to the client's newsletter vendor — the account stays in the client's name.">
          <NewsletterSignup
            eyebrow="Stay in the loop"
            headline="News, offers, and updates — straight from us"
            subtext="One short email when there's something worth knowing. No spam, unsubscribe anytime."
            action="#"
            disclaimer="Your address goes to YOUR newsletter account — never to a third party."
          />
        </Spec>

        <Spec name="Contact" tag="<ContactSection />"
          desc="Contact details beside a working inquiry form — submissions route straight to the owner's inbox.">
          <ContactSection
            eyebrow="Get in touch" headline="Contact us"
            subtext="Tell us what you need and we'll get back to you."
            email="hello@yourbusiness.com" phone="(555) 555-0100"
          />
        </Spec>

        <section className="gs-catalog">
          <div className="gs-spec__head">
            <h2 className="gs-spec__name">Full catalog</h2>
            <span className="gs-spec__tag">@aagf470/ui</span>
          </div>
          <p className="gs-spec__desc">
            Everything the library exports, at a glance — and all of it is available
            in every client&rsquo;s editor, from business-site sections to studio-grade
            showcase pieces.
          </p>
          {CATALOG.map(group => (
            <div className="gs-catalog__group" key={group.label}>
              <h3 className="gs-catalog__label">{group.label}</h3>
              <ul className="gs-catalog__pills">
                {group.items.map(name => (
                  <li className="gs-catalog__pill" key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <p className="gs-showcase__foot">
          Want a page built from these? <Link to="/pricing#order">Build your quote →</Link>
        </p>
      </div>
    </div>
  )
}
