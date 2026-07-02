# GuillenSolutionsWeb

The Guillen Solutions site — one repo, two parts:

```
site/   Vite + React front end (consumes @aagf470/ui, fetches content from the CMS)
cms/    Payload CMS project (Next + Postgres) — the curated editing surface
```

**git = code · Postgres = content.** `git pull` deploys code; everything a client edits
lives in the CMS's Postgres (a Docker volume on RAYA, backed up by `ops/raya`), never in
git. Rebuilding a container never loses content.

## site/ — the front end (static)
```bash
cd site
export NODE_AUTH_TOKEN=<read:packages PAT>   # for @aagf470/ui from GitHub Packages
npm install
npm run dev          # local
npm run build        # → dist/  (static; deploy by rsync, same as the other sites)
```
It fetches content from the CMS at runtime (`VITE_CMS_URL`), so content edits appear live
with **no site rebuild**. Deploy = `rsync -a --delete dist/ raya:/srv/preview/<slot>/` (or
its own static container).

To render a page from the CMS, use `src/PayloadPage.jsx` with a fallback while content is
still being built:
```jsx
<PayloadPage slug="home" fallback={<Home />} />
```

## cms/ — the Payload CMS (stateful container)
A Node + Postgres app — runs on RAYA, not rsync-able. See **`cms/README.md`** for the full
runbook (scaffold with `create-payload-app`, drop in our `payload.config.ts` + `blocks.ts`,
`docker compose up -d --build`, NPM route `cms.guillensolutions.com`). Content editors get
Pages/Posts/Media only; they edit block content and can add/remove/reorder sections, but
never structure or code.

## Deploy summary
| Part | How | Runs Node on RAYA? |
|---|---|---|
| `site/` | build on Mac → rsync `dist/` | no (static) |
| `cms/`  | `git pull` on RAYA → `docker compose up -d --build` | yes (it's a Node service) |
