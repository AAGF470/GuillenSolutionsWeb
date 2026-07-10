import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"headline" varchar NOT NULL,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_grid_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_steps_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_plans_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_list_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hours_location_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_banner_locales" (
  	"eyebrow" varchar,
  	"headline" varchar NOT NULL,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_section_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_checklist_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_newsletter_signup_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_configurator_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_location_grid_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_methods_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_voice_sample_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_title_block_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_video_player_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_spotlight_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cinematic_banner_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cinematic_hero_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_hero_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_roadmap_block_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_steps_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_plans_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_plans_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_checklist_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_locales" ADD CONSTRAINT "pages_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_locales" ADD CONSTRAINT "pages_blocks_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_locales" ADD CONSTRAINT "pages_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans_locales" ADD CONSTRAINT "pages_blocks_pricing_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_list_locales" ADD CONSTRAINT "pages_blocks_service_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hours_location_locales" ADD CONSTRAINT "pages_blocks_hours_location_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hours_location"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner_locales" ADD CONSTRAINT "pages_blocks_cta_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_locales" ADD CONSTRAINT "pages_blocks_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checklist_locales" ADD CONSTRAINT "pages_blocks_checklist_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_signup_locales" ADD CONSTRAINT "pages_blocks_newsletter_signup_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter_signup"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_configurator_locales" ADD CONSTRAINT "pages_blocks_configurator_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_configurator"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_grid_locales" ADD CONSTRAINT "pages_blocks_location_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_methods_locales" ADD CONSTRAINT "pages_blocks_contact_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_voice_sample_locales" ADD CONSTRAINT "pages_blocks_voice_sample_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_voice_sample"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_title_block_locales" ADD CONSTRAINT "pages_blocks_title_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_title_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_player_locales" ADD CONSTRAINT "pages_blocks_video_player_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_player"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_spotlight_locales" ADD CONSTRAINT "pages_blocks_feature_spotlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cinematic_banner_locales" ADD CONSTRAINT "pages_blocks_cinematic_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cinematic_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cinematic_hero_locales" ADD CONSTRAINT "pages_blocks_cinematic_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cinematic_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero_locales" ADD CONSTRAINT "pages_blocks_lab_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_roadmap_block_locales" ADD CONSTRAINT "pages_blocks_roadmap_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_roadmap_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_locales_locale_parent_id_unique" ON "pages_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_steps_locales_locale_parent_id_unique" ON "pages_blocks_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_image_text_locales_locale_parent_id_unique" ON "pages_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_plans_locales_locale_parent_id_unique" ON "pages_blocks_pricing_plans_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_service_list_locales_locale_parent_id_unique" ON "pages_blocks_service_list_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hours_location_locales_locale_parent_id_unique" ON "pages_blocks_hours_location_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_banner_locales_locale_parent_id_unique" ON "pages_blocks_cta_banner_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_section_locales_locale_parent_id_unique" ON "pages_blocks_contact_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_checklist_locales_locale_parent_id_unique" ON "pages_blocks_checklist_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_newsletter_signup_locales_locale_parent_id_uniq" ON "pages_blocks_newsletter_signup_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_configurator_locales_locale_parent_id_unique" ON "pages_blocks_configurator_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_location_grid_locales_locale_parent_id_unique" ON "pages_blocks_location_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_methods_locales_locale_parent_id_unique" ON "pages_blocks_contact_methods_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_voice_sample_locales_locale_parent_id_unique" ON "pages_blocks_voice_sample_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_title_block_locales_locale_parent_id_unique" ON "pages_blocks_title_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_video_player_locales_locale_parent_id_unique" ON "pages_blocks_video_player_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_spotlight_locales_locale_parent_id_uniq" ON "pages_blocks_feature_spotlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cinematic_banner_locales_locale_parent_id_uniqu" ON "pages_blocks_cinematic_banner_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cinematic_hero_locales_locale_parent_id_unique" ON "pages_blocks_cinematic_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_hero_locales_locale_parent_id_unique" ON "pages_blocks_lab_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_roadmap_block_locales_locale_parent_id_unique" ON "pages_blocks_roadmap_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_locale_idx" ON "pages_blocks_feature_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_steps_items_locale_idx" ON "pages_blocks_steps_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_items_locale_idx" ON "pages_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_plans_plans_features_locale_idx" ON "pages_blocks_pricing_plans_plans_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_plans_plans_locale_idx" ON "pages_blocks_pricing_plans_plans" USING btree ("_locale");
  CREATE INDEX "pages_blocks_checklist_items_locale_idx" ON "pages_blocks_checklist_items" USING btree ("_locale");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_steps" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_steps" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_steps" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_image_text" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_image_text" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_pricing_plans" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_pricing_plans" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_pricing_plans" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_service_list" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_service_list" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_service_list" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_hours_location" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_hours_location" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_checklist" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_checklist" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_checklist" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_newsletter_signup" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_newsletter_signup" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_newsletter_signup" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_configurator" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_configurator" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_configurator" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_location_grid" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_location_grid" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_location_grid" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_contact_methods" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_contact_methods" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_contact_methods" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_voice_sample" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_voice_sample" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_voice_sample" DROP COLUMN "subtext";
  ALTER TABLE "pages_blocks_title_block" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_video_player" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_feature_spotlight" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_cinematic_banner" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_cinematic_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_lab_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_roadmap_block" DROP COLUMN "eyebrow";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hours_location_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_banner_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_checklist_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_newsletter_signup_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_configurator_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_location_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_methods_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_voice_sample_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_title_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_player_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_spotlight_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cinematic_banner_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cinematic_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_lab_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_roadmap_block_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_image_text_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_service_list_locales" CASCADE;
  DROP TABLE "pages_blocks_hours_location_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_banner_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_section_locales" CASCADE;
  DROP TABLE "pages_blocks_checklist_locales" CASCADE;
  DROP TABLE "pages_blocks_newsletter_signup_locales" CASCADE;
  DROP TABLE "pages_blocks_configurator_locales" CASCADE;
  DROP TABLE "pages_blocks_location_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_methods_locales" CASCADE;
  DROP TABLE "pages_blocks_voice_sample_locales" CASCADE;
  DROP TABLE "pages_blocks_title_block_locales" CASCADE;
  DROP TABLE "pages_blocks_video_player_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_spotlight_locales" CASCADE;
  DROP TABLE "pages_blocks_cinematic_banner_locales" CASCADE;
  DROP TABLE "pages_blocks_cinematic_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_roadmap_block_locales" CASCADE;
  DROP INDEX "pages_blocks_feature_grid_items_locale_idx";
  DROP INDEX "pages_blocks_steps_items_locale_idx";
  DROP INDEX "pages_blocks_testimonials_items_locale_idx";
  DROP INDEX "pages_blocks_faq_items_locale_idx";
  DROP INDEX "pages_blocks_pricing_plans_plans_features_locale_idx";
  DROP INDEX "pages_blocks_pricing_plans_plans_locale_idx";
  DROP INDEX "pages_blocks_checklist_items_locale_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "headline" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_steps" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_steps" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_steps" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_image_text" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_image_text" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_pricing_plans" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_pricing_plans" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_pricing_plans" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_hours_location" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_hours_location" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "headline" varchar NOT NULL;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_checklist" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_checklist" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_checklist" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_newsletter_signup" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_newsletter_signup" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_newsletter_signup" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_configurator" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_configurator" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_configurator" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_location_grid" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_location_grid" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_location_grid" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_contact_methods" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_contact_methods" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_contact_methods" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_voice_sample" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_voice_sample" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_voice_sample" ADD COLUMN "subtext" varchar;
  ALTER TABLE "pages_blocks_title_block" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_video_player" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_feature_spotlight" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_cinematic_banner" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_cinematic_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_lab_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_roadmap_block" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_steps_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_plans_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_plans_plans" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_checklist_items" DROP COLUMN "_locale";
  DROP TYPE "public"."_locales";`)
}
