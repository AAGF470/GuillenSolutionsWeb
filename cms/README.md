# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URL` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URL` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URL` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/3.x/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

---

# guillensolutions.com — deploy notes (Guillen Solutions)

This is the curated CMS for the (live, in-progress) guillensolutions.com site.
It was scaffolded with `create-payload-app` (Postgres) and then wired to our
shared setup:

- **`src/payload.config.ts`** — curated config. Collections: **Pages** (built
  from the shared section blocks in `src/blocks.ts` — editors change content and
  add/remove/reorder blocks, never structure), **Posts**, **Media**, and
  **Users** (admin-only; a client editor only sees Pages/Posts/Media).
- **`src/blocks.ts`** — the 12 section blocks (hero, featureGrid, steps, … )
  mirrored from the shared library. Keep in sync across client CMSs.
- **`docker-compose.yml`** — `guillensolutions-cms` (Payload/Next, built from
  `Dockerfile`) + `guillensolutions-cms-db` (Postgres 16, **internal network
  only, never exposed**). State bind-mounts under `/srv/docker/guillensolutions-cms`.
- **`seed.ts`** — seeds a starter Home page.

## First deploy on RAYA

```bash
# on RAYA, in the repo:
git pull
cd cms
cp .env.example .env         # then set DB_PASSWORD + PAYLOAD_SECRET (openssl rand -hex 32)
docker compose up -d --build
```

Then in **Nginx Proxy Manager**: proxy host `cms.guillensolutions.com` →
`guillensolutions-cms:3000` (both on the shared `proxy` network; request an SSL
cert).

**Create the first admin** by opening `https://cms.guillensolutions.com/admin` —
when the `users` collection is empty Payload shows a "create first user" form.
(Do this in the browser, not the CLI: the container runs Next's *standalone*
build, which doesn't ship the `payload`/`tsx` binaries or `src/`.)

**Starter content:** just build the Home page in the admin (add blocks). The
`seed.ts` script is a convenience for a local dev checkout — run it there with
`npx tsx seed.ts` before containerizing; it is **not** runnable inside the
standalone image.

The public site points at this CMS via `VITE_CMS_URL` and renders blocks through
`site/src/PayloadPage.jsx`.

**Redeploy after code changes:** `git pull && cd cms && docker compose up -d --build`.
Code lives in git; content lives in Postgres (backed up separately by `ops/raya`).

