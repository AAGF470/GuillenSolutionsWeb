# CMS migrations (Payload + Postgres)

The CMS uses `push: false` and runs `payload migrate` at container start, so the
migration files are the source of truth for the production schema. A bad
migration breaks the CMS on boot — treat them carefully.

## Adding a block / collection

1. Change the config (`cms/src/blocks.ts`, `payload.config.ts`, etc.).
2. Regenerate types: `npm run generate:types` (validates the config compiles).
3. **Generate the migration against a database at HEAD** (see the gotcha below):
   ```bash
   npm run payload migrate:create <name>
   ```
4. **Read the generated `up()` before committing.** It must contain ONLY your
   delta. If it re-emits tables that already exist in other migrations, trim
   those statements out (up + down).
5. Commit the `.ts` **and** its `.json` snapshot together.

## The snapshot-chain gotcha (why step 4 matters)

`migrate:create` computes its diff against the **latest `.json` snapshot**, not
the live DB. If a migration was ever hand-written without its `.json` snapshot,
the baseline goes stale and every future `migrate:create` re-emits everything
added since — which will collide (`relation already exists`) and break the boot.

This happened once: the `20260707` builds/updates migrations were hand-written
with no snapshots, so the `20260709` block migration came out polluted and had to
be hand-trimmed. Fixed by backfilling the full-schema snapshot onto the latest
migration (`20260709_155659_add_location_contact_blocks.json`).

**Rule:** never commit a migration `.ts` without its paired `.json` snapshot.
Every migration must have both, or the chain drifts again.

## Verifying a migration locally (throwaway DB)

```bash
docker run -d --name pg -e POSTGRES_PASSWORD=test -e POSTGRES_DB=t -p 5433:5432 postgres:16-alpine
DATABASE_URL="postgres://postgres:test@127.0.0.1:5433/t" PAYLOAD_SECRET="x" npm run payload migrate
# → applies the whole chain; must end "Done." with no errors.
# Then confirm the baseline is current:
DATABASE_URL="postgres://postgres:test@127.0.0.1:5433/t" PAYLOAD_SECRET="x" npm run payload migrate:create check
# → should report "No schema changes detected". If it emits tables, the
#   snapshot chain is drifting — fix before shipping.
docker rm -f pg
```
