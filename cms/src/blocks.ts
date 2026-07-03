// ═══════════════════════════════════════════════════════════════════════════
//  Curated section blocks — the editable surface of the client CMS.
//
//  Each block maps 1:1 to an @aagf470/ui section component. Editors fill in the
//  CONTENT fields here (text, images, arrays); they can add / remove / reorder
//  blocks on a page — but the structure, styling, and device behavior live in
//  the components and can't be touched. That's the "curated, can't-break-it"
//  editing our clients get. Shared across every client CMS (guillensolutions,
//  guillen-studio, cryark, …).
//
//  Payload's field API is stable in shape; confirm exact imports against the
//  Payload 3.x version you install.
// ═══════════════════════════════════════════════════════════════════════════
import type { Block } from 'payload'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

// Admins only (client editors can't set raw HTML). Matches Users.role in config.
const adminOnly = ({ req }: any) => req?.user?.role === 'admin'

const ICONS = ['check', 'star', 'shield', 'zap', 'clock', 'users', 'wrench', 'mail',
  'globe', 'layers', 'home', 'fence', 'map', 'phone', 'droplet', 'wind']
  .map(v => ({ label: v, value: v }))

const cta = (name = 'cta') => ({
  name, type: 'group' as const, fields: [
    { name: 'label', type: 'text' as const },
    { name: 'href', type: 'text' as const },
    { name: 'variant', type: 'select' as const, defaultValue: 'solid',
      options: ['solid', 'ghost', 'ghost-bordered'].map(v => ({ label: v, value: v })) },
  ],
})
const variant = {
  name: 'variant', type: 'select' as const, defaultValue: 'default',
  options: [
    { label: 'Default (page bg)', value: 'default' },
    { label: 'Alt (surface bg)', value: 'alt' },
    { label: 'Accent (colored)', value: 'accent' },
  ],
}

export const hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'subtext', type: 'textarea' },
    { name: 'layout', type: 'select', defaultValue: 'left',
      options: [{ label: 'Left', value: 'left' }, { label: 'Centered', value: 'centered' }] },
    { name: 'size', type: 'select', defaultValue: 'full',
      options: [
        { label: 'Full-screen opener', value: 'full' },
        { label: 'Compact page intro', value: 'compact' },
      ] },
    { name: 'ctas', type: 'array', maxRows: 2, fields: [cta('_')].flatMap(g => g.fields) },
    { name: 'expression', type: 'select', defaultValue: 'classic',
      admin: { description: 'Structural layout — same content, different skeleton.' },
      options: [
        { label: 'Classic column', value: 'classic' },
        { label: 'Editorial (masthead, two-column)', value: 'editorial' },
        { label: 'Statement (poster type)', value: 'statement' },
      ] },
    variant,
  ],
}

export const newsletterSignup: Block = {
  slug: 'newsletterSignup',
  labels: { singular: 'Newsletter signup', plural: 'Newsletter signups' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'action', type: 'text', required: true,
      admin: { description: "The newsletter vendor's form URL (Brevo/MailerLite/Buttondown). The vendor account is in the client's name." } },
    { name: 'emailField', type: 'text', defaultValue: 'email',
      admin: { description: 'Input name the vendor expects: Buttondown "email", Brevo "EMAIL", MailerLite "fields[email]".' } },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Subscribe' },
    { name: 'disclaimer', type: 'text' },
    variant,
  ],
}

export const checklist: Block = {
  slug: 'checklist',
  labels: { singular: 'Checklist', plural: 'Checklists' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'note', type: 'textarea', admin: { description: 'Optional muted footnote card under the list.' } },
    variant,
  ],
}

export const featureGrid: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Feature grid', plural: 'Feature grids' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' },
    { name: 'subtext', type: 'textarea' },
    { name: 'columns', type: 'select', defaultValue: '3', options: ['2', '3', '4'].map(v => ({ label: v, value: v })) },
    { name: 'items', type: 'array', fields: [
      { name: 'icon', type: 'select', options: ICONS },
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea' },
    ] },
    { name: 'expression', type: 'select', defaultValue: 'cards',
      admin: { description: 'Structural layout — same content, different skeleton.' },
      options: [
        { label: 'Icon cards', value: 'cards' },
        { label: 'Numbered list (editorial)', value: 'list' },
        { label: 'Ruled columns (quiet)', value: 'columns' },
      ] },
    variant,
  ],
}

export const steps: Block = {
  slug: 'steps',
  labels: { singular: 'Steps', plural: 'Steps' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'items', type: 'array', fields: [
      { name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' },
    ] },
    variant,
  ],
}

export const imageText: Block = {
  slug: 'imageText',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageAlt', type: 'text' },
    { name: 'layout', type: 'select', defaultValue: 'image-right',
      options: [{ label: 'Image right', value: 'image-right' }, { label: 'Image left', value: 'image-left' }] },
    cta(),
    variant,
  ],
}

export const testimonials: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' },
    { name: 'items', type: 'array', fields: [
      { name: 'quote', type: 'textarea', required: true },
      { name: 'author', type: 'text', required: true },
      { name: 'role', type: 'text' }, { name: 'company', type: 'text' },
    ] },
    variant,
  ],
}

export const gallery: Block = {
  slug: 'gallery',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'columns', type: 'select', defaultValue: '3', options: ['2', '3', '4'].map(v => ({ label: v, value: v })) },
    { name: 'aspect', type: 'select', defaultValue: '1 / 1',
      options: [
        { label: 'Square', value: '1 / 1' }, { label: 'Landscape', value: '4 / 3' },
        { label: 'Portrait', value: '3 / 4' }, { label: 'Wide', value: '16 / 9' },
      ] },
    { name: 'images', type: 'array', fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
      { name: 'alt', type: 'text' }, { name: 'caption', type: 'text' },
    ] },
    variant,
  ],
}

export const faq: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'single', type: 'checkbox', label: 'Only one answer open at a time' },
    { name: 'items', type: 'array', fields: [
      { name: 'q', type: 'text', required: true }, { name: 'a', type: 'textarea', required: true },
    ] },
    variant,
  ],
}

export const pricingPlans: Block = {
  slug: 'pricingPlans',
  labels: { singular: 'Pricing', plural: 'Pricing' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'plans', type: 'array', fields: [
      { name: 'badge', type: 'text' }, { name: 'tag', type: 'text' }, { name: 'name', type: 'text' },
      { name: 'price', type: 'text', required: true }, { name: 'period', type: 'text' },
      { name: 'description', type: 'textarea' }, { name: 'note', type: 'text' },
      { name: 'features', type: 'array', fields: [{ name: 'text', type: 'text' }] },
      { name: 'featured', type: 'checkbox' },
      { name: 'total', type: 'group', fields: [
        { name: 'label', type: 'text' },
        { name: 'amount', type: 'text', admin: { description: 'e.g. "$950" — shown as the computed total line.' } },
      ] },
      cta(),
    ] },
    variant,
  ],
}

export const serviceList: Block = {
  slug: 'serviceList',
  labels: { singular: 'Service list', plural: 'Service lists' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'columns', type: 'select', defaultValue: '2', options: ['1', '2'].map(v => ({ label: v, value: v })) },
    { name: 'services', type: 'array', fields: [
      { name: 'name', type: 'text', required: true }, { name: 'description', type: 'text' },
      { name: 'price', type: 'text' }, { name: 'from', type: 'checkbox', label: 'Show "from"' },
    ] },
    variant,
  ],
}

export const hoursLocation: Block = {
  slug: 'hoursLocation',
  labels: { singular: 'Hours + location', plural: 'Hours + location' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' },
    { name: 'hours', type: 'array', fields: [
      { name: 'day', type: 'text', required: true }, { name: 'time', type: 'text' },
      { name: 'closed', type: 'checkbox' },
    ] },
    { name: 'address', type: 'textarea' }, { name: 'phone', type: 'text' }, { name: 'email', type: 'text' },
    { name: 'mapEmbedUrl', type: 'text' },
    variant,
  ],
}

export const ctaBanner: Block = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA banner', plural: 'CTA banners' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text', required: true },
    { name: 'subtext', type: 'textarea' }, cta(),
    // Banners default to the accent treatment (matches the component + Sanity).
    { ...variant, defaultValue: 'accent' },
  ],
}

export const contactSection: Block = {
  slug: 'contactSection',
  labels: { singular: 'Contact', plural: 'Contact' },
  fields: [
    { name: 'eyebrow', type: 'text' }, { name: 'headline', type: 'text' }, { name: 'subtext', type: 'textarea' },
    { name: 'email', type: 'text' }, { name: 'phone', type: 'text' },
    { name: 'showForm', type: 'checkbox', defaultValue: true },
    variant,
  ],
}

// ── Escape-hatch blocks ─────────────────────────────────────────────────────
// richText: safe formatted prose for everyone. We also generate an HTML field
// (content_html) so the decoupled static site renders it without shipping a
// lexical serializer.
export const richText: Block = {
  slug: 'richText',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [
    { name: 'content', type: 'richText' },
    lexicalHTML('content', { name: 'content_html' }),
    variant,
  ],
}

// customHtml: raw HTML / embeds for anything the library can't express.
// Admin-only — the markup field can only be set/changed by admins (field-level
// access), so client editors can't inject code or break the layout.
export const customHtml: Block = {
  slug: 'customHtml',
  labels: { singular: 'Custom HTML (admin only)', plural: 'Custom HTML (admin only)' },
  fields: [
    {
      name: 'html',
      type: 'code',
      access: { update: adminOnly },
      admin: { language: 'html', description: 'Raw HTML/embed, rendered as-is. Admin-only.' },
    },
    variant,
  ],
}

// configurator: the interactive "build your quote" widget. A curated
// interactive block — the form itself is fixed (structure locked), editors just
// place it in the page flow and can set the intro heading above it. This is a
// sellable feature (a needs-assessment / quote builder) for client sites too.
export const configurator: Block = {
  slug: 'configurator',
  labels: { singular: 'Quote builder (configurator)', plural: 'Quote builders' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    { name: 'subtext', type: 'textarea' },
    variant,
  ],
}

// The full curated set a client can add to a page.
export const SECTION_BLOCKS: Block[] = [
  hero, featureGrid, steps, imageText, testimonials, gallery, faq,
  pricingPlans, serviceList, hoursLocation, ctaBanner, contactSection,
  checklist, newsletterSignup, richText, customHtml, configurator,
]

// ═══════════════════════════════════════════════════════════════════════════
//  Devlog / case-study blocks — embedded INSIDE the posts rich-text body via
//  lexical's BlocksFeature (NOT page sections; do not add to SECTION_BLOCKS).
//
//  Field names mirror the @aagf470/ui component props 1:1 (including the
//  snake_case ones like image_src / video_mp4) so the site-side renderer only
//  has to resolve upload objects → URLs, never rename keys.
// ═══════════════════════════════════════════════════════════════════════════

// Matches CodeBlock.jsx's LANG_LABELS keys (any string works — the component
// falls back to language.toUpperCase() — but a curated select keeps it tidy).
const CODE_LANGS = [
  'text', 'javascript', 'jsx', 'typescript', 'tsx', 'html', 'css', 'scss',
  'json', 'yaml', 'toml', 'graphql', 'sql', 'python', 'bash', 'shell', 'lua',
  'ruby', 'php', 'csharp', 'cpp', 'c', 'rust', 'go', 'zig', 'swift', 'kotlin',
  'java', 'glsl', 'hlsl', 'wgsl', 'gdscript', 'vue', 'markdown', 'dockerfile',
  'solidity',
].map(v => ({ label: v, value: v }))

// CalloutBlock: variant / label / body
export const callout: Block = {
  slug: 'callout',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    { name: 'variant', type: 'select', defaultValue: 'note',
      options: ['note', 'tip', 'warning', 'info'].map(v => ({ label: v, value: v })) },
    { name: 'label', type: 'text',
      admin: { description: 'Optional — overrides the default variant label ("Note", "Tip", …).' } },
    { name: 'body', type: 'textarea', required: true },
  ],
}

// CodeBlock: language / title / code
export const codeBlock: Block = {
  slug: 'codeBlock',
  labels: { singular: 'Code block', plural: 'Code blocks' },
  fields: [
    { name: 'language', type: 'select', defaultValue: 'text', options: CODE_LANGS },
    { name: 'title', type: 'text',
      admin: { description: 'Optional filename / context label shown in the header.' } },
    { name: 'code', type: 'code', required: true },
  ],
}

// ImageBlock: image_src / alt / caption / size — image_src is an upload here;
// the site resolves it to a URL.
export const imageBlock: Block = {
  slug: 'imageBlock',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    { name: 'image_src', label: 'Image', type: 'upload', relationTo: 'media', required: true },
    { name: 'alt', type: 'text' },
    { name: 'caption', type: 'text' },
    { name: 'size', type: 'select', defaultValue: 'normal',
      options: [
        { label: 'Normal (max 720px)', value: 'normal' },
        { label: 'Wide (full content width)', value: 'wide' },
      ] },
  ],
}

// FactGrid: heading / facts / columns (empty columns = component auto-picks)
export const factGrid: Block = {
  slug: 'factGrid',
  labels: { singular: 'Fact grid', plural: 'Fact grids' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'facts', type: 'array', fields: [
      { name: 'value', type: 'text', required: true,
        admin: { description: 'The big stat: "4", "200+", "8GB".' } },
      { name: 'label', type: 'text', required: true },
      { name: 'description', type: 'text' },
    ] },
    { name: 'columns', type: 'select',
      options: ['2', '3', '4'].map(v => ({ label: v, value: v })),
      admin: { description: 'Leave empty to auto-fit to the fact count.' } },
  ],
}

// ScreenshotGallery: label / images [{src, alt?, caption?}] — src via upload.
export const screenshotGallery: Block = {
  slug: 'screenshotGallery',
  labels: { singular: 'Screenshot gallery', plural: 'Screenshot galleries' },
  fields: [
    { name: 'label', type: 'text',
      admin: { description: 'Optional heading above the strip.' } },
    { name: 'images', type: 'array', fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
      { name: 'alt', type: 'text' },
      { name: 'caption', type: 'text' },
    ] },
  ],
}

// VideoPlayer: eyebrow / title / video_mp4 / video_webm / poster_src /
// caption / aspect_ratio. Video sources are URLs (CDN-hosted — large files
// don't belong in the media library); the poster is a normal upload.
export const videoPlayer: Block = {
  slug: 'videoPlayer',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'video_mp4', label: 'MP4 URL', type: 'text', required: true,
      admin: { description: 'URL to the .mp4 file (H.264).' } },
    { name: 'video_webm', label: 'WebM URL', type: 'text',
      admin: { description: 'Optional .webm (VP9) — preferred by Chrome/Firefox.' } },
    { name: 'poster_src', label: 'Poster image', type: 'upload', relationTo: 'media' },
    { name: 'caption', type: 'text' },
    { name: 'aspect_ratio', type: 'select', defaultValue: '16/9',
      options: ['16/9', '21/9', '4/3'].map(v => ({ label: v, value: v })) },
  ],
}

// SideBySide: the component takes rendered ReactNodes for `left` / `right`;
// the closest CMS shape is one nested block per column (maxRows: 1) — the
// site renders that child block into the column.
const SIDE_BY_SIDE_CHILDREN: Block[] = [callout, codeBlock, imageBlock, factGrid]

export const sideBySide: Block = {
  slug: 'sideBySide',
  labels: { singular: 'Side by side', plural: 'Side by sides' },
  fields: [
    { name: 'left', type: 'blocks', maxRows: 1, blocks: SIDE_BY_SIDE_CHILDREN,
      admin: { description: 'One block for the left column.' } },
    { name: 'right', type: 'blocks', maxRows: 1, blocks: SIDE_BY_SIDE_CHILDREN,
      admin: { description: 'One block for the right column.' } },
    { name: 'split', type: 'select', defaultValue: '50/50',
      options: ['50/50', '60/40', '40/60', '67/33', '33/67'].map(v => ({ label: v, value: v })) },
    { name: 'align', type: 'select', defaultValue: 'start',
      options: ['start', 'center', 'stretch'].map(v => ({ label: v, value: v })) },
  ],
}

// The set exposed inside posts.content via BlocksFeature.
export const DEVLOG_BLOCKS: Block[] = [
  callout, codeBlock, imageBlock, sideBySide, screenshotGallery, factGrid, videoPlayer,
]
