#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  Deploy the public guillensolutions.com site (static build → RAYA).
#
#  Builds site/ with @aagf470/ui + the CMS URL baked in, then rsyncs the dist
#  to the guillensolutions-static nginx container's web root on RAYA.
#
#  Usage:   NODE_AUTH_TOKEN=<read:packages PAT> ./deploy-site.sh
#  (The token is only needed the first time / when @aagf470/ui updates.)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

RAYA_HOST="${RAYA_HOST:-raya}"                                   # ssh alias
TARGET="${TARGET:-/srv/static/guillensolutions/html/}"          # nginx web root
SITE_DIR="$(cd "$(dirname "$0")/site" && pwd)"

cd "$SITE_DIR"

# .env holds VITE_CMS_URL (baked into the build). Seed it from the example once.
[ -f .env ] || cp .env.example .env
echo "→ VITE_CMS_URL: $(grep -E '^VITE_CMS_URL' .env || echo '(missing!)')"

# Install deps if needed (needs NODE_AUTH_TOKEN for the @aagf470 registry).
if [ ! -d node_modules ]; then
  if [ -z "${NODE_AUTH_TOKEN:-}" ]; then
    echo "✗ node_modules missing and NODE_AUTH_TOKEN not set." >&2
    echo "  Run: NODE_AUTH_TOKEN=<read:packages PAT> ./deploy-site.sh" >&2
    exit 1
  fi
  echo "→ Installing dependencies…"
  npm install
fi

echo "→ Building…"
npm run build

echo "→ Deploying dist/ → ${RAYA_HOST}:${TARGET}"
rsync -a --delete dist/ "${RAYA_HOST}:${TARGET}"

echo "✓ Deployed. Live at https://guillensolutions.com  (CMS pages at /<slug>)"
