import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "voice_demo_clips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"sub" varchar,
  	"audio_id" integer
  );
  
  CREATE TABLE "voice_demo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "voice_demo_clips" ADD CONSTRAINT "voice_demo_clips_audio_id_media_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "voice_demo_clips" ADD CONSTRAINT "voice_demo_clips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voice_demo"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "voice_demo_clips_order_idx" ON "voice_demo_clips" USING btree ("_order");
  CREATE INDEX "voice_demo_clips_parent_id_idx" ON "voice_demo_clips" USING btree ("_parent_id");
  CREATE INDEX "voice_demo_clips_audio_idx" ON "voice_demo_clips" USING btree ("audio_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "voice_demo_clips" CASCADE;
  DROP TABLE "voice_demo" CASCADE;`)
}
