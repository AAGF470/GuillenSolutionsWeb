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
  'globe', 'layers', 'home', 'fence', 'map', 'phone', 'droplet', 'wind', 'message', 'whatsapp']
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
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'headline', type: 'text', required: true, localized: true },
    { name: 'subtext', type: 'textarea', localized: true },
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
    { name: 'items', type: 'array', localized: true, fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'note', type: 'textarea', admin: { description: 'Optional muted footnote card under the list.' } },
    variant,
  ],
}

export const featureGrid: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Feature grid', plural: 'Feature grids' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true },
    { name: 'subtext', type: 'textarea', localized: true },
    { name: 'columns', type: 'select', defaultValue: '3', options: ['2', '3', '4'].map(v => ({ label: v, value: v })) },
    { name: 'items', type: 'array', localized: true, fields: [
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
    { name: 'items', type: 'array', localized: true, fields: [
      { name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' },
    ] },
    variant,
  ],
}

export const imageText: Block = {
  slug: 'imageText',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true },
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true },
    { name: 'items', type: 'array', localized: true, fields: [
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
    { name: 'single', type: 'checkbox', label: 'Only one answer open at a time' },
    { name: 'items', type: 'array', localized: true, fields: [
      { name: 'q', type: 'text', required: true }, { name: 'a', type: 'textarea', required: true },
    ] },
    variant,
  ],
}

export const pricingPlans: Block = {
  slug: 'pricingPlans',
  labels: { singular: 'Pricing', plural: 'Pricing' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
    { name: 'plans', type: 'array', localized: true, fields: [
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true },
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
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', required: true, localized: true },
    { name: 'subtext', type: 'textarea', localized: true }, cta(),
    // Banners default to the accent treatment (matches the component + Sanity).
    { ...variant, defaultValue: 'accent' },
  ],
}

export const contactSection: Block = {
  slug: 'contactSection',
  labels: { singular: 'Contact', plural: 'Contact' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true }, { name: 'subtext', type: 'textarea', localized: true },
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
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'headline', type: 'text', localized: true },
    { name: 'subtext', type: 'textarea', localized: true },
    variant,
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
//  Devlog / case-study blocks — originally built for embedding INSIDE the
//  posts rich-text body via lexical's BlocksFeature. Most now do double duty
//  as page sections too (same block object in both palettes — one definition,
//  one DB shape, two surfaces). SECTION_BLOCKS / DEVLOG_BLOCKS at the bottom
//  of this file say which block goes where.
//
//  Field names mirror the @aagf470/ui component props 1:1 (including the
//  snake_case ones like image_src / video_mp4) so the site-side renderer only
//  has to resolve upload objects → URLs, never rename keys. The one forced
//  exception: Payload reserves `id` inside arrays, so components with an `id`
//  node prop (HierarchyBlock, ArchitectureBlock) use `node_id` and the
//  renderers map node_id → id.
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
    { name: 'eyebrow', type: 'text', localized: true },
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

// ═══════════════════════════════════════════════════════════════════════════
//  Studio / showcase catalog — the rest of the @aagf470/ui exports, so client
//  editors get the FULL component library, not just the business-site basics.
// ═══════════════════════════════════════════════════════════════════════════

// Button-shaped rows: FeatureSpotlight / CinematicHero `actions` and
// PricingCTA `links` share the { label, href, variant } core.
const actionFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'href', type: 'text' as const },
  { name: 'variant', type: 'select' as const,
    options: ['solid', 'ghost', 'ghost-bordered'].map(v => ({ label: v, value: v })),
    admin: { description: 'Leave empty for the component default.' } },
]
// `actions` rows (FeatureSpotlight / CinematicHero) also take Button's lava flag.
const actionFieldsWithLava = [
  ...actionFields,
  { name: 'lava', type: 'checkbox' as const,
    admin: { description: 'Solid variant only — fills with the theme color instead of white.' } },
]

// PlatformBadge.jsx's PLATFORM_LABELS keys.
const PLATFORMS = ['godot', 'blender', 'windows', 'macos', 'linux', 'itch',
  'steam', 'gumroad', 'unreal', 'unity'].map(v => ({ label: v, value: v }))

// TitleBlock: eyebrow / heading / description / align
export const titleBlock: Block = {
  slug: 'titleBlock',
  labels: { singular: 'Title block', plural: 'Title blocks' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'align', type: 'select', defaultValue: 'left',
      options: ['left', 'center'].map(v => ({ label: v, value: v })) },
  ],
}

// ContentCards: heading / cards / columns / card_height
export const contentCards: Block = {
  slug: 'contentCards',
  labels: { singular: 'Content cards', plural: 'Content cards' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'cards', type: 'array', fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'category', type: 'text' },
      { name: 'description', type: 'textarea',
        admin: { description: 'Slides up on hover.' } },
      { name: 'image_src', label: 'Image', type: 'upload', relationTo: 'media' },
    ] },
    { name: 'columns', type: 'select',
      options: ['2', '3', '4'].map(v => ({ label: v, value: v })),
      admin: { description: 'Leave empty to auto-fit to the card count.' } },
    { name: 'card_height', type: 'number',
      admin: { description: 'Card height in px (default 280).' } },
  ],
}

// FeatureSpotlight: media panel + rich content split
export const featureSpotlight: Block = {
  slug: 'featureSpotlight',
  labels: { singular: 'Feature spotlight', plural: 'Feature spotlights' },
  fields: [
    { name: 'image_src', label: 'Image', type: 'upload', relationTo: 'media' },
    { name: 'video_src', label: 'Video URL', type: 'text',
      admin: { description: 'Optional .mp4 URL — plays autoplay/muted/loop instead of the image.' } },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'platforms', type: 'array', fields: [
      { name: 'platform', type: 'select', required: true, options: PLATFORMS },
    ] },
    { name: 'actions', type: 'array', maxRows: 2, fields: actionFieldsWithLava },
    { name: 'flip', type: 'checkbox', label: 'Media on the right' },
    { name: 'media_fit', type: 'select', defaultValue: 'cover',
      options: ['cover', 'contain'].map(v => ({ label: v, value: v })) },
    { name: 'media_bg', type: 'text',
      admin: { description: 'CSS background for the media panel (useful with "contain").' } },
  ],
}

// CinematicBanner: full-width atmospheric callout over a background image
export const cinematicBanner: Block = {
  slug: 'cinematicBanner',
  labels: { singular: 'Cinematic banner', plural: 'Cinematic banners' },
  fields: [
    { name: 'image_src', label: 'Background image', type: 'upload', relationTo: 'media', required: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'align', type: 'select', defaultValue: 'left',
      options: ['left', 'center'].map(v => ({ label: v, value: v })) },
    { name: 'min_height', type: 'text',
      admin: { description: 'CSS min-height, e.g. "520px" (the default).' } },
    { name: 'cta_label', type: 'text' },
    { name: 'cta_href', type: 'text' },
  ],
}

// CinematicHero: full-viewport hero with video/image background
export const cinematicHero: Block = {
  slug: 'cinematicHero',
  labels: { singular: 'Cinematic hero', plural: 'Cinematic heroes' },
  fields: [
    { name: 'video_src', label: 'Video URL', type: 'text',
      admin: { description: 'Optional .mp4 URL — plays autoplay/muted/loop.' } },
    { name: 'image_src', label: 'Image', type: 'upload', relationTo: 'media',
      admin: { description: 'Video poster, or standalone background if no video.' } },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'actions', type: 'array', maxRows: 2, fields: actionFieldsWithLava },
    { name: 'align', type: 'select', defaultValue: 'left',
      options: ['left', 'center'].map(v => ({ label: v, value: v })) },
    { name: 'show_scroll', type: 'checkbox', defaultValue: true,
      label: 'Show animated scroll hint' },
  ],
}

// LabHero: editorial page header with back-nav, metadata, and stats
export const labHero: Block = {
  slug: 'labHero',
  labels: { singular: 'Lab hero', plural: 'Lab heroes' },
  fields: [
    { name: 'back_href', type: 'text', defaultValue: '/lab' },
    { name: 'back_label', type: 'text', defaultValue: 'Lab' },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text',
      admin: { description: 'Expanded full name below the title.' } },
    { name: 'abstract', type: 'textarea' },
    { name: 'status', type: 'select',
      options: ['released', 'in_dev', 'research', 'live', 'collab'].map(v => ({ label: v, value: v })) },
    { name: 'tags', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'stats', type: 'array', fields: [
      { name: 'value', type: 'text', required: true },
      { name: 'label', type: 'text', required: true },
    ] },
    { name: 'collab', type: 'text',
      admin: { description: 'Optional collaborator line, e.g. "with NU AERO".' } },
  ],
}

// RoadmapBlock: eyebrow / heading / milestones
export const roadmapBlock: Block = {
  slug: 'roadmapBlock',
  labels: { singular: 'Roadmap', plural: 'Roadmaps' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text' },
    { name: 'milestones', type: 'array', fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'description', type: 'text' },
      { name: 'status', type: 'select', defaultValue: 'planned',
        options: [
          { label: 'Done', value: 'done' },
          { label: 'In progress', value: 'in_progress' },
          { label: 'Planned', value: 'planned' },
          { label: 'Cut', value: 'cut' },
        ] },
    ] },
  ],
}

// ChangelogBlock: heading / entries [{ version, date, title?, changes }]
export const changelogBlock: Block = {
  slug: 'changelogBlock',
  labels: { singular: 'Changelog', plural: 'Changelogs' },
  fields: [
    { name: 'heading', type: 'text',
      admin: { description: 'Leave empty for the default "Changelog".' } },
    { name: 'entries', type: 'array', fields: [
      { name: 'version', type: 'text', required: true },
      { name: 'date', type: 'date' },
      { name: 'title', type: 'text' },
      { name: 'changes', type: 'array', fields: [
        { name: 'type', type: 'select', defaultValue: 'added',
          options: ['added', 'fixed', 'changed', 'breaking', 'removed'].map(v => ({ label: v, value: v })) },
        { name: 'text', type: 'text', required: true },
      ] },
    ] },
  ],
}

// SystemRequirements: minimum / recommended spec groups (empty rows are
// simply not rendered by the component).
const specGroup = (name: string, label: string) => ({
  name, label, type: 'group' as const,
  fields: ['os', 'cpu', 'gpu', 'ram', 'storage', 'notes']
    .map(f => ({ name: f, type: 'text' as const })),
})

export const systemRequirements: Block = {
  slug: 'systemRequirements',
  labels: { singular: 'System requirements', plural: 'System requirements' },
  fields: [
    { name: 'heading', type: 'text',
      admin: { description: 'Leave empty for the default "System Requirements".' } },
    specGroup('minimum', 'Minimum'),
    specGroup('recommended', 'Recommended'),
    { name: 'tested_on', type: 'text',
      admin: { description: 'e.g. "Tested on Windows 11, RTX 3080".' } },
    { name: 'platform_note', type: 'text',
      admin: { description: 'e.g. "PC only · Mac support planned 2025".' } },
  ],
}

// AssetGrid: downloadable asset cards. Previews are media uploads; the files
// themselves are URLs (VPS/CDN-hosted — big binaries don't belong in the
// media library), consistent with videoPlayer.
export const assetGrid: Block = {
  slug: 'assetGrid',
  labels: { singular: 'Asset grid', plural: 'Asset grids' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'assets', type: 'array', fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'category', type: 'text',
        admin: { description: 'e.g. "3D Character", "Texture Pack".' } },
      { name: 'preview_src', label: 'Preview image', type: 'upload', relationTo: 'media' },
      { name: 'file_url', label: 'Download URL', type: 'text', required: true },
      { name: 'file_type', type: 'select', defaultValue: 'zip',
        options: ['glb', 'fbx', 'obj', 'blend', 'png', 'psd', 'zip', 'svg', 'mp3', 'wav']
          .map(v => ({ label: v, value: v })) },
      { name: 'file_size', type: 'text', admin: { description: 'e.g. "4.2 MB".' } },
      { name: 'license', type: 'select', defaultValue: 'free',
        options: ['free', 'cc0', 'attribution', 'patreon'].map(v => ({ label: v, value: v })) },
      { name: 'description', type: 'text' },
    ] },
  ],
}

// HierarchyBlock: engine-style scene tree. The component's node `id` prop is a
// reserved field name inside Payload arrays, so it's `node_id` here; the
// renderers map node_id → id.
export const hierarchyBlock: Block = {
  slug: 'hierarchyBlock',
  labels: { singular: 'Hierarchy tree', plural: 'Hierarchy trees' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'caption', type: 'text' },
    { name: 'nodes', type: 'array', fields: [
      { name: 'node_id', label: 'Node ID', type: 'text', required: true,
        admin: { description: 'Short unique key, e.g. "player" — referenced by other nodes\' Parent ID.' } },
      { name: 'parent_id', label: 'Parent ID', type: 'text',
        admin: { description: 'Another node\'s Node ID. Leave blank for root nodes.' } },
      { name: 'label', type: 'text', required: true },
      { name: 'type', type: 'text',
        admin: { description: 'Optional badge, e.g. "GameObject", "Camera", "Script".' } },
      { name: 'note', type: 'text',
        admin: { description: 'Inline annotation, e.g. "(disabled)", "← entry".' } },
      { name: 'order', type: 'number',
        admin: { description: 'Lower numbers first within the same parent.' } },
    ] },
  ],
}

// ArchitectureBlock: CSS architecture diagram — plain nodes/edges arrays (the
// component computes its own layout; no measured data needed). Same `node_id`
// workaround as hierarchyBlock.
export const architectureBlock: Block = {
  slug: 'architectureBlock',
  labels: { singular: 'Architecture diagram', plural: 'Architecture diagrams' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'caption', type: 'text' },
    { name: 'layout', type: 'select', defaultValue: 'hub',
      options: ['hub', 'linear', 'tree'].map(v => ({ label: v, value: v })) },
    { name: 'center_id', label: 'Center node ID', type: 'text',
      admin: { description: 'Hub layout only — the Node ID of the central orchestrator.' } },
    { name: 'node_size', type: 'select', defaultValue: 'default',
      options: ['default', 'compact', 'wide'].map(v => ({ label: v, value: v })) },
    { name: 'nodes', type: 'array', fields: [
      { name: 'node_id', label: 'Node ID', type: 'text', required: true },
      { name: 'label', type: 'text', required: true },
      { name: 'description', type: 'text' },
      { name: 'role', type: 'select',
        options: ['orchestrator', 'reader', 'processor', 'renderer', 'writer', 'utility']
          .map(v => ({ label: v, value: v })) },
      { name: 'badge', type: 'text' },
    ] },
    { name: 'edges', type: 'array', fields: [
      { name: 'from', type: 'text', required: true, admin: { description: 'Node ID.' } },
      { name: 'to', type: 'text', required: true, admin: { description: 'Node ID.' } },
      { name: 'label', type: 'text' },
      { name: 'bidirectional', type: 'checkbox' },
    ] },
  ],
}

// EmbeddedApp: click-to-activate iframe for interactive demos
export const embeddedApp: Block = {
  slug: 'embeddedApp',
  labels: { singular: 'Embedded app', plural: 'Embedded apps' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'embed_url', label: 'Embed URL', type: 'text', required: true,
      admin: { description: 'Loaded in the iframe only after the visitor clicks Launch.' } },
    { name: 'poster_src', label: 'Poster image', type: 'upload', relationTo: 'media' },
    { name: 'launch_label', type: 'text', defaultValue: 'Launch' },
    { name: 'warning', type: 'text',
      admin: { description: 'Small disclaimer, e.g. "Requires WebGL · ~45 MB".' } },
    { name: 'height', type: 'number',
      admin: { description: 'Iframe height in px (default 620).' } },
  ],
}

// PricingCTA: purchase / download section with store links + Patreon strip
export const pricingCTA: Block = {
  slug: 'pricingCTA',
  labels: { singular: 'Pricing CTA', plural: 'Pricing CTAs' },
  fields: [
    { name: 'heading', type: 'text',
      admin: { description: 'Leave empty for the default "Available Now".' } },
    { name: 'price', type: 'text',
      admin: { description: 'e.g. "$9.99", "Free", "Pay What You Want".' } },
    { name: 'price_note', type: 'text',
      admin: { description: 'e.g. "One-time purchase · DRM-free".' } },
    { name: 'links', type: 'array', fields: [
      ...actionFields,
      { name: 'icon_slug', type: 'text',
        admin: { description: 'Optional icon key, e.g. "steam", "itch".' } },
    ] },
    { name: 'patreon_href', label: 'Patreon URL', type: 'text' },
    { name: 'patreon_label', type: 'text',
      admin: { description: 'Leave empty for the default "Support on Patreon".' } },
    { name: 'note', type: 'text', admin: { description: 'Fine print below everything.' } },
  ],
}

// Spacer: pure vertical gap between sections
export const spacer: Block = {
  slug: 'spacer',
  labels: { singular: 'Spacer', plural: 'Spacers' },
  fields: [
    { name: 'size', type: 'select', defaultValue: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl'].map(v => ({ label: v, value: v })) },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
//  Palettes — which blocks appear where. Blocks listed in both are the SAME
//  object (one definition, one interface in payload-types, two surfaces).
// ═══════════════════════════════════════════════════════════════════════════

// The full curated set a client can add to a page.
// Location grid → @aagf470/ui LocationGrid (markets / service areas with photos)
export const locationGrid: Block = {
  slug: 'locationGrid',
  labels: { singular: 'Location grid', plural: 'Location grids' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true },
    { name: 'subtext', type: 'textarea', localized: true },
    { name: 'columns', type: 'select', defaultValue: '4', options: ['2', '3', '4'].map(v => ({ label: v, value: v })) },
    { name: 'serveLabel', type: 'text', admin: { description: 'Small label above each card\'s areas, e.g. "Areas we serve".' } },
    { name: 'locations', type: 'array', fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'label', type: 'text' },
      { name: 'areas', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    ] },
    variant,
  ],
}

// Contact methods → @aagf470/ui ContactMethods (tappable text/WhatsApp/email cards)
export const contactMethods: Block = {
  slug: 'contactMethods',
  labels: { singular: 'Contact methods', plural: 'Contact methods' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true },
    { name: 'subtext', type: 'textarea', localized: true },
    { name: 'columns', type: 'select', defaultValue: '3', options: ['2', '3', '4'].map(v => ({ label: v, value: v })) },
    { name: 'callout', type: 'textarea' },
    { name: 'methods', type: 'array', fields: [
      { name: 'icon', type: 'select', options: ICONS },
      { name: 'name', type: 'text' },
      { name: 'value', type: 'text', required: true },
      { name: 'href', type: 'text', required: true },
      { name: 'note', type: 'text' },
      { name: 'cta', type: 'text' },
      { name: 'external', type: 'checkbox', label: 'Open in a new tab' },
    ] },
    variant,
  ],
}

// Voice sample → @aagf470/ui VoiceSample (phone-styled AI-voice call preview)
export const voiceSample: Block = {
  slug: 'voiceSample',
  labels: { singular: 'Voice sample', plural: 'Voice samples' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true }, { name: 'headline', type: 'text', localized: true },
    { name: 'subtext', type: 'textarea', localized: true },
    { name: 'callerName', type: 'text', admin: { description: 'Label on the call header, e.g. "Guillen Solutions demo".' } },
    { name: 'clips', type: 'array', fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'sub', type: 'text' },
      { name: 'audio', type: 'upload', relationTo: 'media' },
    ] },
    variant,
  ],
}

export const SECTION_BLOCKS: Block[] = [
  // Business-site sections
  hero, featureGrid, steps, imageText, testimonials, gallery, faq,
  pricingPlans, serviceList, hoursLocation, ctaBanner, contactSection,
  checklist, newsletterSignup, richText, customHtml, configurator,
  locationGrid, contactMethods, voiceSample,
  // Studio / showcase catalog
  titleBlock, callout, codeBlock, imageBlock, factGrid, screenshotGallery,
  videoPlayer, sideBySide, contentCards, featureSpotlight, cinematicBanner,
  cinematicHero, labHero, roadmapBlock, changelogBlock, systemRequirements,
  assetGrid, hierarchyBlock, architectureBlock, embeddedApp, pricingCTA, spacer,
]

// The set exposed inside posts.content via BlocksFeature.
export const DEVLOG_BLOCKS: Block[] = [
  callout, codeBlock, imageBlock, sideBySide, screenshotGallery, factGrid, videoPlayer,
  titleBlock, contentCards, roadmapBlock, changelogBlock, systemRequirements,
  assetGrid, hierarchyBlock,
]
