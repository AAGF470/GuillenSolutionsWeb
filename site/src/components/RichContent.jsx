import {
  CalloutBlock, CodeBlock, ImageBlock, SideBySide, ScreenshotGallery,
  FactGrid, VideoPlayer,
} from '@aagf470/ui'

// ---------------------------------------------------------------------------
// RichContent — renders Payload's lexical rich-text JSON (posts.content) as
// React, dependency-free. Handles the standard prose nodes plus `block` nodes:
// the devlog blocks embedded inline via BlocksFeature, mapped to their
// @aagf470/ui components (mirrors the adapt() idiom in PayloadPage.jsx —
// upload objects → URLs, select strings → numbers). Unknown node types render
// nothing, so new CMS features degrade gracefully instead of crashing.
//
// Props:
//   content  object — the lexical editor state ({ root: { children: [...] } })
// ---------------------------------------------------------------------------

// Lexical text-format bitmask (fixed by lexical itself).
const BOLD = 1, ITALIC = 2, STRIKETHROUGH = 4, UNDERLINE = 8, CODE = 16

// Upload value → URL string (depth>0 gives an object; depth 0 gives an id).
const url = v => (v && typeof v === 'object' ? v.url ?? null : typeof v === 'string' ? v : null)

// ── Embedded devlog blocks: blockType → adapted component ───────────────────
const BLOCKS = {
  callout: f => (
    <CalloutBlock variant={f.variant || 'note'} label={f.label || null} body={f.body || ''} />
  ),
  codeBlock: f => (
    <CodeBlock language={f.language || 'text'} title={f.title || null} code={f.code || ''} />
  ),
  imageBlock: f => (
    <ImageBlock
      image_src={url(f.image_src)}
      alt={f.alt || ''}
      caption={f.caption || null}
      size={f.size || 'normal'}
    />
  ),
  factGrid: f => (
    <FactGrid
      heading={f.heading || null}
      facts={(f.facts || []).map(x => ({
        value: x.value, label: x.label, description: x.description || null,
      }))}
      columns={f.columns ? Number(f.columns) : null}
    />
  ),
  screenshotGallery: f => (
    <ScreenshotGallery
      label={f.label || null}
      images={(f.images || []).map(i => ({
        src: url(i.image), alt: i.alt || '', caption: i.caption || '',
      }))}
    />
  ),
  videoPlayer: f => (
    <VideoPlayer
      eyebrow={f.eyebrow || null}
      title={f.title || null}
      video_mp4={f.video_mp4 || ''}
      video_webm={f.video_webm || null}
      poster_src={url(f.poster_src)}
      caption={f.caption || null}
      aspect_ratio={f.aspect_ratio || '16/9'}
    />
  ),
  // SideBySide takes rendered nodes per column; the CMS stores one nested
  // block per side (blocks field, maxRows 1).
  sideBySide: f => (
    <SideBySide
      left={renderEmbedded(f.left?.[0])}
      right={renderEmbedded(f.right?.[0])}
      split={f.split || '50/50'}
      align={f.align || 'start'}
    />
  ),
}

function renderEmbedded(fields) {
  if (!fields) return null
  const make = BLOCKS[fields.blockType]
  return make ? make(fields) : null
}

// ── Prose nodes ──────────────────────────────────────────────────────────────
function renderText(node, key) {
  let el = node.text ?? ''
  const f = node.format || 0
  if (f & CODE) el = <code>{el}</code>
  if (f & STRIKETHROUGH) el = <s>{el}</s>
  if (f & UNDERLINE) el = <u>{el}</u>
  if (f & ITALIC) el = <em>{el}</em>
  if (f & BOLD) el = <strong>{el}</strong>
  return <span key={key}>{el}</span>
}

function linkHref(fields = {}) {
  if (fields.linkType === 'internal') {
    const doc = fields.doc?.value
    if (doc && typeof doc === 'object' && doc.slug) return `/${doc.slug}`
    return '#'
  }
  return fields.url || '#'
}

const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

function renderNode(node, key) {
  if (!node || typeof node !== 'object') return null
  const children = () => renderNodes(node.children)

  switch (node.type) {
    case 'root':
      return <>{children()}</>
    case 'paragraph':
      return <p key={key}>{children()}</p>
    case 'heading': {
      const Tag = HEADINGS.has(node.tag) ? node.tag : 'h2'
      return <Tag key={key}>{children()}</Tag>
    }
    case 'text':
      return renderText(node, key)
    case 'link':
    case 'autolink': {
      const href = linkHref(node.fields)
      const newTab = node.fields?.newTab
      return (
        <a key={key} href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children()}
        </a>
      )
    }
    case 'list': {
      const Tag = node.tag === 'ol' || node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{children()}</Tag>
    }
    case 'listitem':
      return <li key={key}>{children()}</li>
    case 'quote':
      return <blockquote key={key}>{children()}</blockquote>
    case 'linebreak':
      return <br key={key} />
    case 'horizontalrule':
      return <hr key={key} />
    case 'block': {
      const el = renderEmbedded(node.fields)
      return el ? <div key={key} className="rich-content__block">{el}</div> : null
    }
    default:
      return null // unknown node types render nothing
  }
}

function renderNodes(nodes) {
  if (!Array.isArray(nodes)) return null
  return nodes.map((n, i) => renderNode(n, n?.id ?? i))
}

export default function RichContent({ content }) {
  const root = content?.root
  if (!root) return null
  return <div className="rich-content">{renderNodes(root.children)}</div>
}
