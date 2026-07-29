// ---------------------------------------------------------------------------
// industryPages.js — industry × market landing pages (English).
//
// Search Console evidence: head terms like "web design cambridge" sit at
// position 85–95, but INDUSTRY long-tail already ranks without a page —
// "website design for contractor grand prairie" at 19, "…for contractor
// centennial" at 21. That's the winnable space for a young domain, so each
// page here targets one trade across every market we serve.
//
// Deliberately one page per INDUSTRY (not industry × city): a dozen
// near-identical city variants is the doorway-page pattern Google punishes.
// Cities are named inside the copy instead, which is what lets a single strong
// page pick up the city variants.
//
// English-only for now (the proven queries are English), so they render
// `standalone` — no hreflang pointing at a Spanish page that doesn't exist.
// ---------------------------------------------------------------------------

const MARKETS_LINE =
  'Boston and the North Houston area are our two home markets (in person); we also build for the Dallas metroplex — Irving, Grand Prairie — and all five New York boroughs, remotely.'

export const INDUSTRY_PAGES = [
  {
    slug: 'websites-for-contractors',
    industry: 'contractors',
    metaTitle: 'Website Design for Contractors — Built to Get the Call',
    metaDescription:
      'Websites for general contractors, remodelers, roofers and fencing crews — quote forms that route straight to the owner, before/after galleries, bilingual, mobile-first. Flat pricing from $600 and you own everything. Boston, North Houston, Dallas, NYC.',
    h1: 'Websites for contractors — built to get the call',
    lead:
      'A contractor\'s website has one job: make a stranger trust you enough to call. Ours are built around that — proof of work, a quote form that reaches you in seconds, and a page that loads fast on a phone at a job site.',
    proof: {
      title: 'We have already built this',
      body:
        'FencingPatrol is a family general contractor on Long Island, New York: bold, bilingual, and call-first, because that is how their customers actually reach them. The same system built a licensed Dallas electrician\'s site and a Boston game studio — one component library, completely different looks.',
      linkLabel: 'See the work',
      linkTo: '/work/',
    },
    needs: {
      title: 'What a contractor site actually needs',
      items: [
        {
          title: 'Quote requests that reach you, not a dashboard',
          body: 'The form routes straight to your phone or inbox. No portal to check, no leads sitting somewhere you never look — and we never resell your leads to anyone else.',
        },
        {
          title: 'Before / after proof',
          body: 'Galleries built for the work: finished jobs, before-and-after pairs, and the detail shots that win a bid. You add new jobs yourself from your phone, free, whenever you finish one.',
        },
        {
          title: 'Bilingual, at no premium',
          body: 'English and Spanish versions of the whole site, standard. Useful for customers and for crews — and a real edge in Grand Prairie, Irving, East Boston, and the boroughs.',
        },
        {
          title: 'Fast on a phone, in the field',
          body: 'Mobile-first and lightweight, because your customer is standing in a driveway with one bar of signal, not sitting at a desk.',
        },
        {
          title: 'Licensed, insured, local — said plainly',
          body: 'License numbers, service areas, and insurance stated where people look for them. For trades, credibility beats cleverness every time.',
        },
        {
          title: 'Found for the towns you actually serve',
          body: 'Your pages and Google Business Profile name the specific towns you work in, so you surface in neighborhood searches instead of getting buried in metro-wide results.',
        },
      ],
    },
    marketsLine: MARKETS_LINE,
    faq: [
      {
        q: 'How much does a contractor website cost?',
        a: 'Flat and all-in: $600 the first year for up to 5 pages, or $950 for the most popular plan (6 designed pages, a 25-item catalog, and your own editor). After year one it is $200–$350/yr for hosting and the domain, agreed in writing before you sign. No hourly billing and no surprise invoices.',
      },
      {
        q: 'Can customers request a quote from the site?',
        a: 'Yes — a custom quote form is $250 and sends submissions straight to you. Photos can be attached, which is the fastest way to price a job accurately without a site visit.',
      },
      {
        q: 'I already have Facebook and word of mouth. Do I need a website?',
        a: 'Word of mouth is your best channel — a site makes it convert. When someone gets your name from a neighbor, the first thing they do is look you up. A real site turns that referral into a call instead of a maybe, and unlike a Facebook page, it is yours and cannot be taken away.',
      },
      {
        q: 'Do you handle the Google Business Profile too?',
        a: 'Yes — $300 to set it up and verify it. For trades it often matters more than anything on the site itself, because so many jobs start with a "near me" search on a phone.',
      },
      {
        q: 'Who owns the site and the domain?',
        a: 'You do, from day one — domain, content, photos, and every login registered in your name, with the passwords handed over in writing. If you ever leave, you take a runnable copy of the whole site with you.',
      },
    ],
  },
  {
    slug: 'websites-for-electricians',
    industry: 'electricians',
    metaTitle: 'Website Design for Electricians — Trust-First, Call-Ready',
    metaDescription:
      'Websites for licensed electricians: license and service area up front, quote forms that route to the owner, fast on mobile, bilingual at no premium. Flat pricing from $600, and you own everything. Our first client was a Dallas electrician.',
    h1: 'Websites for electricians — trust first, then the call',
    lead:
      'Electrical work is bought on trust: license, insurance, and the sense that this person will show up. Our very first client site was a licensed Dallas electrician, and it was built around exactly that.',
    proof: {
      title: 'Our first client was an electrician',
      body:
        'Angel Electrical Services is a licensed electrician in Dallas, Texas. Trust-first design, service areas stated plainly, and a quote form that routes directly to the owner — no call center, no lead reseller in the middle.',
      linkLabel: 'See the work',
      linkTo: '/work/',
    },
    needs: {
      title: 'What an electrician site actually needs',
      items: [
        {
          title: 'License and insurance, stated up front',
          body: 'The two things a customer checks before calling, where they can find them — not buried in a footer.',
        },
        {
          title: 'Emergency-ready contact',
          body: 'Tap-to-call and text at the top of every page. When someone has no power, they are not filling out a long form.',
        },
        {
          title: 'Residential vs. commercial, split clearly',
          body: 'Different buyers, different pages. A homeowner and a property manager should each land on something written for them.',
        },
        {
          title: 'Bilingual, at no premium',
          body: 'Full English and Spanish versions, standard — a real advantage in Dallas, Irving, Grand Prairie, and North Houston.',
        },
        {
          title: 'Fast on a phone',
          body: 'Mobile-first and light, because that is where the call comes from.',
        },
        {
          title: 'Found for the towns you serve',
          body: 'Your site and Google Business Profile name your actual service towns, so you show up in the neighborhoods you cover.',
        },
      ],
    },
    marketsLine: MARKETS_LINE,
    faq: [
      {
        q: 'How much does a website for an electrician cost?',
        a: 'Flat, all-in: $600 the first year for up to 5 pages, or $950 for the most popular plan. Then $200–$350/yr for hosting and the domain, agreed in writing before you sign.',
      },
      {
        q: 'Can it take service calls or quote requests?',
        a: 'Yes — tap-to-call and text are built in, and a custom quote form ($250) sends requests straight to you with photos attached.',
      },
      {
        q: 'Do you set up the Google Business Profile?',
        a: 'Yes, $300 including verification. For electricians it is often the single highest-value piece, since most jobs begin with a local "near me" search.',
      },
      {
        q: 'Who owns the domain and the site?',
        a: 'You do — domain, content, and every login in your name from day one, with a written handover. Leave whenever you want and take a runnable copy with you.',
      },
    ],
  },
  {
    slug: 'websites-for-cleaning-businesses',
    industry: 'cleaning businesses',
    metaTitle: 'Website Design for Cleaning Businesses — Quotes Without the Call',
    metaDescription:
      'Websites for house cleaning, commercial cleaning and janitorial businesses: before/after galleries, quote forms with photo upload, service-area pages, bilingual at no premium. Flat pricing from $600 and you own everything.',
    h1: 'Websites for cleaning businesses',
    lead:
      'Cleaning is sold on proof and convenience: show the work, make the quote easy, and be findable in every town you drive to. That is what these sites are built to do.',
    proof: {
      title: 'Built for a family cleaning business',
      body:
        'We built the site for a family-run cleaning and painting business in Roanoke, Virginia — two crews, one family — with before/after sliders on real jobs, a quote form that routes to the right crew, and a separate page for each town they serve within a two-hour drive.',
      linkLabel: 'See our work',
      linkTo: '/work/',
    },
    needs: {
      title: 'What a cleaning site actually needs',
      items: [
        {
          title: 'Before / after that sells the work',
          body: 'Sliders and galleries on real jobs. Nothing converts a cleaning customer faster than seeing the difference — and you add new jobs yourself, free.',
        },
        {
          title: 'Quotes with photos, no phone tag',
          body: 'A form where a customer describes the space and attaches pictures, so you can price accurately without driving out for an estimate.',
        },
        {
          title: 'A page per town you serve',
          body: 'Cleaning is a driving business. Each town gets its own real page so you rank in the places you actually go, not just where you are based.',
        },
        {
          title: 'Recurring vs. one-time, made clear',
          body: 'Weekly upkeep, deep cleans, move-outs, and post-construction are different buys. Each gets its own plain explanation.',
        },
        {
          title: 'Bilingual, at no premium',
          body: 'English and Spanish versions of the whole site, standard — for customers and for crews.',
        },
        {
          title: 'Booked from a phone',
          body: 'Tap-to-call, text, and a short form. Most cleaning inquiries start on a phone, often after hours.',
        },
      ],
    },
    marketsLine: MARKETS_LINE,
    faq: [
      {
        q: 'How much does a website for a cleaning business cost?',
        a: 'Flat and all-in: $600 the first year for up to 5 pages, or $950 for the most popular plan (6 designed pages plus your own editor). Then $200–$350/yr for hosting and the domain, in writing before you sign.',
      },
      {
        q: 'Can customers send photos with a quote request?',
        a: 'Yes — that is the single most useful feature for cleaning. A custom form with photo upload is $250 and sends everything straight to you.',
      },
      {
        q: 'Can I have a page for every town I clean in?',
        a: 'Yes, and you should — it is how you get found outside your home town. We write each one as a real page about that town, not a copy with the name swapped, which is what Google penalizes.',
      },
      {
        q: 'Who owns the site, the domain, and the photos?',
        a: 'You do — all of it, in your name from day one, with the passwords handed over in writing. Your job photos are yours; we never reuse or resell them.',
      },
    ],
  },
]

export const industryBySlug = slug => INDUSTRY_PAGES.find(p => p.slug === slug)
