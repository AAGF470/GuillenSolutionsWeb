import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// NOTE: hand-trimmed after `migrate:create`. The generator's schema snapshot is
// stale (missing the 20260707 builds/updates migrations), so it re-emitted the
// builds/updates tables here too. Those are created by their own earlier
// migrations, so this one is reduced to ONLY the locationGrid + contactMethods
// blocks and the feature-grid icon enum additions (message/whatsapp).

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_location_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_location_grid_variant" AS ENUM('default', 'alt', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_contact_methods_methods_icon" AS ENUM('check', 'star', 'shield', 'zap', 'clock', 'users', 'wrench', 'mail', 'globe', 'layers', 'home', 'fence', 'map', 'phone', 'droplet', 'wind', 'message', 'whatsapp');
  CREATE TYPE "public"."enum_pages_blocks_contact_methods_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_contact_methods_variant" AS ENUM('default', 'alt', 'accent');
  ALTER TYPE "public"."enum_pages_blocks_feature_grid_items_icon" ADD VALUE 'message';
  ALTER TYPE "public"."enum_pages_blocks_feature_grid_items_icon" ADD VALUE 'whatsapp';
  CREATE TABLE "pages_blocks_location_grid_locations_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );

  CREATE TABLE "pages_blocks_location_grid_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"image_id" integer,
  	"label" varchar
  );

  CREATE TABLE "pages_blocks_location_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"columns" "enum_pages_blocks_location_grid_columns" DEFAULT '4',
  	"serve_label" varchar,
  	"variant" "enum_pages_blocks_location_grid_variant" DEFAULT 'default',
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_contact_methods_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_methods_methods_icon",
  	"name" varchar,
  	"value" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"note" varchar,
  	"cta" varchar,
  	"external" boolean
  );

  CREATE TABLE "pages_blocks_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"columns" "enum_pages_blocks_contact_methods_columns" DEFAULT '3',
  	"callout" varchar,
  	"variant" "enum_pages_blocks_contact_methods_variant" DEFAULT 'default',
  	"block_name" varchar
  );

  ALTER TABLE "pages_blocks_location_grid_locations_areas" ADD CONSTRAINT "pages_blocks_location_grid_locations_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_grid_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_grid_locations" ADD CONSTRAINT "pages_blocks_location_grid_locations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_grid_locations" ADD CONSTRAINT "pages_blocks_location_grid_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_grid" ADD CONSTRAINT "pages_blocks_location_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_methods_methods" ADD CONSTRAINT "pages_blocks_contact_methods_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_methods" ADD CONSTRAINT "pages_blocks_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_location_grid_locations_areas_order_idx" ON "pages_blocks_location_grid_locations_areas" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_grid_locations_areas_parent_id_idx" ON "pages_blocks_location_grid_locations_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_grid_locations_order_idx" ON "pages_blocks_location_grid_locations" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_grid_locations_parent_id_idx" ON "pages_blocks_location_grid_locations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_grid_locations_image_idx" ON "pages_blocks_location_grid_locations" USING btree ("image_id");
  CREATE INDEX "pages_blocks_location_grid_order_idx" ON "pages_blocks_location_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_grid_parent_id_idx" ON "pages_blocks_location_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_grid_path_idx" ON "pages_blocks_location_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_methods_methods_order_idx" ON "pages_blocks_contact_methods_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_methods_methods_parent_id_idx" ON "pages_blocks_contact_methods_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_methods_order_idx" ON "pages_blocks_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_methods_parent_id_idx" ON "pages_blocks_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_methods_path_idx" ON "pages_blocks_contact_methods" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_location_grid_locations_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_location_grid_locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_location_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_methods_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_methods" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_location_grid_locations_areas" CASCADE;
  DROP TABLE "pages_blocks_location_grid_locations" CASCADE;
  DROP TABLE "pages_blocks_location_grid" CASCADE;
  DROP TABLE "pages_blocks_contact_methods_methods" CASCADE;
  DROP TABLE "pages_blocks_contact_methods" CASCADE;
  ALTER TABLE "pages_blocks_feature_grid_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_feature_grid_items_icon";
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_items_icon" AS ENUM('check', 'star', 'shield', 'zap', 'clock', 'users', 'wrench', 'mail', 'globe', 'layers', 'home', 'fence', 'map', 'phone', 'droplet', 'wind');
  ALTER TABLE "pages_blocks_feature_grid_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_feature_grid_items_icon" USING "icon"::"public"."enum_pages_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_location_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_location_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_methods_methods_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_methods_columns";
  DROP TYPE "public"."enum_pages_blocks_contact_methods_variant";`)
}
