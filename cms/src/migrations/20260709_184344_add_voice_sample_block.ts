import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_voice_sample_variant" AS ENUM('default', 'alt', 'accent');
  CREATE TABLE "pages_blocks_voice_sample_clips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"sub" varchar,
  	"audio_id" integer
  );
  
  CREATE TABLE "pages_blocks_voice_sample" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"caller_name" varchar,
  	"variant" "enum_pages_blocks_voice_sample_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_voice_sample_clips" ADD CONSTRAINT "pages_blocks_voice_sample_clips_audio_id_media_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_voice_sample_clips" ADD CONSTRAINT "pages_blocks_voice_sample_clips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_voice_sample"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_voice_sample" ADD CONSTRAINT "pages_blocks_voice_sample_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_voice_sample_clips_order_idx" ON "pages_blocks_voice_sample_clips" USING btree ("_order");
  CREATE INDEX "pages_blocks_voice_sample_clips_parent_id_idx" ON "pages_blocks_voice_sample_clips" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_voice_sample_clips_audio_idx" ON "pages_blocks_voice_sample_clips" USING btree ("audio_id");
  CREATE INDEX "pages_blocks_voice_sample_order_idx" ON "pages_blocks_voice_sample" USING btree ("_order");
  CREATE INDEX "pages_blocks_voice_sample_parent_id_idx" ON "pages_blocks_voice_sample" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_voice_sample_path_idx" ON "pages_blocks_voice_sample" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_voice_sample_clips" CASCADE;
  DROP TABLE "pages_blocks_voice_sample" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_voice_sample_variant";`)
}
