import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_expression" AS ENUM('classic', 'editorial', 'statement');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_expression" AS ENUM('cards', 'list', 'columns');
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "expression" "enum_pages_blocks_hero_expression" DEFAULT 'classic';
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "expression" "enum_pages_blocks_feature_grid_expression" DEFAULT 'cards';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "expression";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "expression";
  DROP TYPE "public"."enum_pages_blocks_hero_expression";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_expression";`)
}
