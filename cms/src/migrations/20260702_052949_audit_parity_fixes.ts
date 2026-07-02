import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('default', 'alt', 'accent');
  ALTER TABLE "pages_blocks_cta_banner" ALTER COLUMN "variant" SET DEFAULT 'accent';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "variant" "enum_pages_blocks_hero_variant" DEFAULT 'default';
  ALTER TABLE "pages_blocks_pricing_plans_plans" ADD COLUMN "total_label" varchar;
  ALTER TABLE "pages_blocks_pricing_plans_plans" ADD COLUMN "total_amount" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta_banner" ALTER COLUMN "variant" SET DEFAULT 'default';
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_pricing_plans_plans" DROP COLUMN "total_label";
  ALTER TABLE "pages_blocks_pricing_plans_plans" DROP COLUMN "total_amount";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";`)
}
