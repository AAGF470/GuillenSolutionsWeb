# Payload/Next CMS image for guillensolutions.com.
#
# NOT the size-optimized Next "standalone" image: Payload needs the payload CLI,
# the config, and the committed migrations at runtime so it can run
# `payload migrate` on startup (standalone traces strip all of that). This keeps
# the full built app + node_modules and runs migrations, then `next start`.
#
# node 24 / npm 11 to match the dev machine that generates package-lock.json
# (npm 10 mis-reads an npm-11-written lock and fails `npm ci`).
FROM node:24-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install deps. .npmrc carries legacy-peer-deps=true; the lock was generated
# with it, so `npm ci` needs it present or it rejects the lock.
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# Build the app (needs dev deps, which npm ci installed).
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Apply any pending DB migrations (idempotent), then start Next.
# `sh -c` so both run in order and migrate failures abort startup.
CMD ["sh", "-c", "npm run payload -- migrate && npm run start"]
