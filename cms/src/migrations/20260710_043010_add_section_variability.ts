import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_steps_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_pricing_plans_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_voice_sample_layout" AS ENUM('phone', 'plain');
  ALTER TYPE "public"."enum_pages_blocks_service_list_columns" ADD VALUE '3';
  ALTER TABLE "pages_blocks_steps" ADD COLUMN "columns" "enum_pages_blocks_steps_columns" DEFAULT '1';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "columns" "enum_pages_blocks_testimonials_columns";
  ALTER TABLE "pages_blocks_pricing_plans" ADD COLUMN "columns" "enum_pages_blocks_pricing_plans_columns";
  ALTER TABLE "pages_blocks_voice_sample" ADD COLUMN "layout" "enum_pages_blocks_voice_sample_layout" DEFAULT 'phone';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_service_list" ALTER COLUMN "columns" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_service_list" ALTER COLUMN "columns" SET DEFAULT '2'::text;
  DROP TYPE "public"."enum_pages_blocks_service_list_columns";
  CREATE TYPE "public"."enum_pages_blocks_service_list_columns" AS ENUM('1', '2');
  ALTER TABLE "pages_blocks_service_list" ALTER COLUMN "columns" SET DEFAULT '2'::"public"."enum_pages_blocks_service_list_columns";
  ALTER TABLE "pages_blocks_service_list" ALTER COLUMN "columns" SET DATA TYPE "public"."enum_pages_blocks_service_list_columns" USING "columns"::"public"."enum_pages_blocks_service_list_columns";
  ALTER TABLE "pages_blocks_steps" DROP COLUMN "columns";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "columns";
  ALTER TABLE "pages_blocks_pricing_plans" DROP COLUMN "columns";
  ALTER TABLE "pages_blocks_voice_sample" DROP COLUMN "layout";
  DROP TYPE "public"."enum_pages_blocks_steps_columns";
  DROP TYPE "public"."enum_pages_blocks_testimonials_columns";
  DROP TYPE "public"."enum_pages_blocks_pricing_plans_columns";
  DROP TYPE "public"."enum_pages_blocks_voice_sample_layout";`)
}
