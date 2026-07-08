import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_builds_status" AS ENUM('in-development', 'published');
  ALTER TABLE "builds" ADD COLUMN "status" "enum_builds_status" DEFAULT 'in-development' NOT NULL;
  CREATE TABLE "builds_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );

  ALTER TABLE "builds_images" ADD CONSTRAINT "builds_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "builds_images" ADD CONSTRAINT "builds_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."builds"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "builds_images_order_idx" ON "builds_images" USING btree ("_order");
  CREATE INDEX "builds_images_parent_id_idx" ON "builds_images" USING btree ("_parent_id");
  CREATE INDEX "builds_images_image_idx" ON "builds_images" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "builds_images" CASCADE;
  ALTER TABLE "builds" DROP COLUMN "status";
  DROP TYPE "public"."enum_builds_status";`)
}
