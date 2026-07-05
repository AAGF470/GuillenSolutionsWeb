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

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
  },
  editor: lexicalEditor({}),
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
  collections: [Pages as any, Posts as any, Projects as any, Media as any, Users as any, Inquiries as any],
  cors: [process.env.SITE_URL || ''].filter(Boolean), // allow the site to fetch the API
  csrf: [process.env.SITE_URL || ''].filter(Boolean),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
