import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_images_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slot" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "site_images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "inquiries" ALTER COLUMN "email" DROP NOT NULL;
  ALTER TABLE "site_images_items" ADD CONSTRAINT "site_images_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_images_items" ADD CONSTRAINT "site_images_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_images"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_images_items_order_idx" ON "site_images_items" USING btree ("_order");
  CREATE INDEX "site_images_items_parent_id_idx" ON "site_images_items" USING btree ("_parent_id");
  CREATE INDEX "site_images_items_image_idx" ON "site_images_items" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_images_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_images" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_images_items" CASCADE;
  DROP TABLE "site_images" CASCADE;
  ALTER TABLE "inquiries" ALTER COLUMN "email" SET NOT NULL;`)
}
