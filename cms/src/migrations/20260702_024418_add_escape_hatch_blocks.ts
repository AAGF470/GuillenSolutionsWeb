import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_rich_text_variant" AS ENUM('default', 'alt', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_custom_html_variant" AS ENUM('default', 'alt', 'accent');
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"content_html" varchar,
  	"variant" "enum_pages_blocks_rich_text_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"variant" "enum_pages_blocks_custom_html_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_html" ADD CONSTRAINT "pages_blocks_custom_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_custom_html_order_idx" ON "pages_blocks_custom_html" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_html_parent_id_idx" ON "pages_blocks_custom_html" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_html_path_idx" ON "pages_blocks_custom_html" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_custom_html" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_rich_text_variant";
  DROP TYPE "public"."enum_pages_blocks_custom_html_variant";`)
}
