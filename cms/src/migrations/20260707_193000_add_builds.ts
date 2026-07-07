import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "builds" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"kind" varchar,
  	"url" varchar,
  	"blurb" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "builds_id" integer;
  CREATE INDEX "builds_image_idx" ON "builds" USING btree ("image_id");
  CREATE INDEX "builds_updated_at_idx" ON "builds" USING btree ("updated_at");
  CREATE INDEX "builds_created_at_idx" ON "builds" USING btree ("created_at");
  ALTER TABLE "builds" ADD CONSTRAINT "builds_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_builds_fk" FOREIGN KEY ("builds_id") REFERENCES "public"."builds"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_builds_id_idx" ON "payload_locked_documents_rels" USING btree ("builds_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "builds" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "builds" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_builds_fk";

  DROP INDEX "payload_locked_documents_rels_builds_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "builds_id";`)
}
