// ---------------------------------------------------------------------------
// prerender-core.mjs — the generic static-prerender harness.
//
// Site-agnostic: takes a route manifest and bakes per-route HTML (title, meta,
// canonical, OG, JSON-LD, readable body fallback in #root) into a built SPA's
// dist/, plus a sitemap derived from the same manifest. Every client site
// reuses this module and supplies only its own config + routes (see
// prerender.mjs for the Guillen Solutions manifest).
//
// prerender({
//   dist,                    absolute path to the built dist/
//   site,                    canonical origin, no trailing slash
//   name,                    site name for titles/OG
//   routes: [{ path, title, description, schema?: [jsonLdNodes], body }],
//   locale?: 'en_US', altLocale?: 'es_ES',
//   priorityFor?: (path) => '0.7', changefreqFor?: (path) => 'monthly',
// })
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
export const ldjson = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`
export const list = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`

export function prerender({
  dist,
  site,
  name,
  routes,
  locale = 'en_US',
  altLocale = 'es_ES',
  priorityFor = () => '0.7',
  changefreqFor = () => 'monthly',
}) {
  const template = readFileSync(join(dist, 'index.html'), 'utf8')

  for (const r of routes) {
    const full = r.title ? `${r.title} — ${name}` : name
    const url = `${site}${r.path === '/' ? '' : r.path}`
    const head = [
      `<meta name="description" content="${esc(r.description)}" />`,
      `<meta name="robots" content="index,follow" />`,
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${name}" />`,
      `<meta property="og:title" content="${esc(full)}" />`,
      `<meta property="og:description" content="${esc(r.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:locale" content="${locale}" />`,
      `<meta property="og:locale:alternate" content="${altLocale}" />`,
      `<meta name="twitter:card" content="summary" />`,
      `<meta name="twitter:title" content="${esc(full)}" />`,
      `<meta name="twitter:description" content="${esc(r.description)}" />`,
      ...(r.schema || []).map(ldjson),
    ].join('\n    ')

    const html = template
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(full)}</title>`)
      .replace('</head>', `    ${head}\n  </head>`)
      // createRoot() replaces this fallback with the live app in a real browser.
      .replace('<div id="root"></div>', `<div id="root">${r.body}</div>`)

    const outPath = r.path === '/'
      ? join(dist, 'index.html')
      : join(dist, r.path.slice(1), 'index.html')
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
  }

  // Sitemap from the same manifest, so it can never drift from what ships.
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map(r => {
      const loc = `${site}${r.path === '/' ? '' : r.path}`
      return `  <url><loc>${loc}</loc><changefreq>${changefreqFor(r.path)}</changefreq><priority>${priorityFor(r.path)}</priority></url>`
    }).join('\n') +
    `\n</urlset>\n`
  writeFileSync(join(dist, 'sitemap.xml'), sitemap)

  console.log(`✓ prerendered ${routes.length} routes + sitemap (head + JSON-LD + content baked into static HTML)`)
}
