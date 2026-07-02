import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_configurator_variant" AS ENUM('default', 'alt', 'accent');
  CREATE TABLE "pages_blocks_configurator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"variant" "enum_pages_blocks_configurator_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_configurator" ADD CONSTRAINT "pages_blocks_configurator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_configurator_order_idx" ON "pages_blocks_configurator" USING btree ("_order");
  CREATE INDEX "pages_blocks_configurator_parent_id_idx" ON "pages_blocks_configurator" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_configurator_path_idx" ON "pages_blocks_configurator" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_configurator" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_configurator_variant";`)
}
