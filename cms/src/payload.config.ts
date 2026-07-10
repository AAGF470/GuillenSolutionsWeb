// ═══════════════════════════════════════════════════════════════════════════
//  Payload CMS — guillensolutions.com
//
//  The curated editing surface for the (live, in-progress) Guillen Solutions
//  site. Pages are built from the shared section blocks: editors change CONTENT
//  (text, images, prices…) and can add / remove / reorder blocks — but never the
//  structure, styling, or code. Users collection is admin-only, so a client
//  editor sees only Pages / Posts / Media.
//
//  This file lives at src/payload.config.ts (create-payload-app layout). The
//  curated block set is beside it in src/blocks.ts.
// ═══════════════════════════════════════════════════════════════════════════
import path from 'path'
import { fileURLToPath } from 'url'
import { APIError, buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { SECTION_BLOCKS, DEVLOG_BLOCKS } from './blocks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isAdmin = ({ req }: any) => req.user?.role === 'admin'
// Editors can read/write content; only admins manage users + delete.
const editorCanWrite = ({ req }: any) => Boolean(req.user)

const Users = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: { create: isAdmin, delete: isAdmin, update: isAdmin, read: () => true },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      access: { update: isAdmin },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}

const Media = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(dirname, '../media'),
    imageSizes: [
      { name: 'card', width: 768 },
      { name: 'hero', width: 1600 },
    ],
  },
  access: { read: () => true },
  fields: [{ name: 'alt', type: 'text' }],
}

const Pages = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  access: { read: () => true, create: editorCanWrite, update: editorCanWrite, delete: isAdmin },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL path, e.g. "home", "about". The site fetches pages by this.' },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: SECTION_BLOCKS,
      admin: {
        description:
          'Add, reorder, or remove sections. Editing here changes content only — never the design.',
      },
    },
  ],
}

// Projects — the things guides/devlogs are written about. A post can point at
// one via its `project` relationship; the site shows a "related project" link.
const Projects = {
  slug: 'projects',
  admin: { useAsTitle: 'title' },
  access: { read: () => true, create: editorCanWrite, update: editorCanWrite, delete: isAdmin },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'tagline', type: 'text' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    { name: 'links', type: 'array', fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'href', type: 'text', required: true },
    ] },
    { name: 'summary', type: 'textarea' },
  ],
}

// Posts — devlog / case-study grade: the body is lexical rich text with the
// DEVLOG_BLOCKS embeddable inline (callouts, code, images, galleries, …).
const Posts = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  access: { read: () => true, create: editorCanWrite, update: editorCanWrite, delete: isAdmin },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'tags', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'project', type: 'relationship', relationTo: 'projects',
      admin: { description: 'Optional — the project this guide/devlog is about.' } },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          BlocksFeature({ blocks: DEVLOG_BLOCKS }),
        ],
      }),
    },
    { name: 'publishedAt', type: 'date' },
  ],
}

// Inquiries — requests sent from the site's forms (plan finder, configurator,
// estimator). Anyone can CREATE (public forms); only logged-in users can read
// or manage them. The hidden `website` field is a honeypot: humans never see
// it, bots auto-fill it, and any value rejects the submission.
const Inquiries = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'summary',
    defaultColumns: ['summary', 'email', 'source', 'status', 'createdAt'],
    description: 'Requests from the website. Reply by email, then set the status.',
  },
  access: { create: () => true, read: editorCanWrite, update: editorCanWrite, delete: isAdmin },
  hooks: {
    beforeValidate: [
      ({ data }: any) => {
        if (data?.website) throw new APIError('Invalid submission.', 400)
        return data
      },
    ],
  },
  fields: [
    { name: 'summary', type: 'text', admin: { description: 'One line — what they asked for.' } },
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'business', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Plan finder', value: 'plan-finder' },
        { label: 'Order builder', value: 'configurator' },
        { label: 'On-demand estimator', value: 'estimator' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    { name: 'details', type: 'json', admin: { description: 'Full selection payload from the form.' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    // Honeypot — kept out of the admin UI; must remain empty.
    { name: 'website', type: 'text', admin: { hidden: true } },
  ],
}

// Updates — the public Status Center feed (/status on the site): stack &
// infrastructure updates, feature launches, business announcements, incidents,
// and maintenance. Public read; editors author. Newest-first, pinned on top.
const Updates = {
  slug: 'updates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'pinned'],
    description: 'Status center feed shown on the site\'s /status page. Post stack updates, feature launches, announcements, and incidents.',
  },
  access: { read: () => true, create: editorCanWrite, update: editorCanWrite, delete: isAdmin },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'announcement',
      options: [
        { label: 'Stack / infrastructure', value: 'stack' },
        { label: 'New feature', value: 'feature' },
        { label: 'Business announcement', value: 'announcement' },
        { label: 'Incident', value: 'incident' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
    },
    { name: 'body', type: 'textarea', admin: { description: 'Short description shown under the title.' } },
    { name: 'linkLabel', type: 'text', admin: { description: 'Optional call-to-action label.' } },
    { name: 'linkHref', type: 'text', admin: { description: 'Optional link URL for the CTA.' } },
    { name: 'pinned', type: 'checkbox', defaultValue: false, admin: { description: 'Pin to the top — e.g. an active incident or headline announcement.' } },
    { name: 'publishedAt', type: 'date', required: true, admin: { description: 'Shown on the entry + used for ordering (newest first).' } },
  ],
}

// Builds — the Work page's "currently in development" showcase. One entry =
// one screenshot + a little text. Editors just upload an image and fill a
// couple fields; the site renders them as browser-framed cards. Public read.
const Builds = {
  slug: 'builds',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'url', 'updatedAt'],
    description: 'Work-page showcase of sites in development. Upload a screenshot + a line of text; newest shows first on /work.',
  },
  access: { read: () => true, create: editorCanWrite, update: editorCanWrite, delete: isAdmin },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'in-development',
      options: [
        { label: 'In development', value: 'in-development' },
        { label: 'Published', value: 'published' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Cover screenshot — the thumbnail shown on the card.' } },
    {
      name: 'images',
      type: 'array',
      admin: { description: 'More screenshots — shown in the popup gallery when the card is clicked. Add as many as you like.' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'kind', type: 'text', admin: { description: 'Short label under the title, e.g. "Hair salon" or "Restaurant".' } },
    { name: 'url', type: 'text', admin: { description: 'Live site link — OPTIONAL. Leave blank for private clients.' } },
    { name: 'blurb', type: 'textarea', admin: { description: 'One or two sentences about the build.' } },
  ],
}

// Voice demo — AI phone-menu sample clips shown on the pricing page. A single
// global the public site fetches; upload a clip's audio here (Media) and it
// becomes playable on the site. Empty = the site shows a "sample coming soon"
// placeholder.
const VoiceDemo = {
  slug: 'voiceDemo',
  access: { read: () => true, update: editorCanWrite },
  admin: { description: 'AI phone-menu voice samples for the pricing page. Add a clip and upload its audio to make it play on the site.' },
  fields: [
    { name: 'clips', type: 'array', labels: { singular: 'Clip', plural: 'Clips' }, fields: [
      { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Main greeting", "Press 1 — Sales".' } },
      { name: 'sub', type: 'text', admin: { description: 'Optional small line under the label.' } },
      { name: 'audio', type: 'upload', relationTo: 'media', admin: { description: 'The voice clip (mp3/wav). Leave empty to show "sample coming soon".' } },
    ] },
  ],
}

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
  },
  editor: lexicalEditor({}),
  // Bilingual content. Fields marked `localized: true` (block text, arrays)
  // store a value per locale; the site fetches with ?locale=en|es. Un-localized
  // fields (slugs, selects, uploads) stay shared across locales.
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Español', code: 'es' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Production uses committed migrations (run at container startup via
    // `payload migrate`), not runtime schema-push. Regenerate with
    // `npm run payload -- migrate:create` after changing collections/blocks.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  collections: [Pages as any, Posts as any, Projects as any, Media as any, Users as any, Inquiries as any, Updates as any, Builds as any],
  globals: [VoiceDemo as any],
  cors: [process.env.SITE_URL || ''].filter(Boolean), // allow the site to fetch the API
  csrf: [process.env.SITE_URL || ''].filter(Boolean),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
