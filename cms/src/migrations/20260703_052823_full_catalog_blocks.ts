import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_title_block_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_callout_variant" AS ENUM('note', 'tip', 'warning', 'info');
  CREATE TYPE "public"."enum_pages_blocks_code_block_language" AS ENUM('text', 'javascript', 'jsx', 'typescript', 'tsx', 'html', 'css', 'scss', 'json', 'yaml', 'toml', 'graphql', 'sql', 'python', 'bash', 'shell', 'lua', 'ruby', 'php', 'csharp', 'cpp', 'c', 'rust', 'go', 'zig', 'swift', 'kotlin', 'java', 'glsl', 'hlsl', 'wgsl', 'gdscript', 'vue', 'markdown', 'dockerfile', 'solidity');
  CREATE TYPE "public"."enum_pages_blocks_image_block_size" AS ENUM('normal', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_fact_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_video_player_aspect_ratio" AS ENUM('16/9', '21/9', '4/3');
  CREATE TYPE "public"."enum_pages_blocks_side_by_side_split" AS ENUM('50/50', '60/40', '40/60', '67/33', '33/67');
  CREATE TYPE "public"."enum_pages_blocks_side_by_side_align" AS ENUM('start', 'center', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_feature_spotlight_platforms_platform" AS ENUM('godot', 'blender', 'windows', 'macos', 'linux', 'itch', 'steam', 'gumroad', 'unreal', 'unity');
  CREATE TYPE "public"."enum_pages_blocks_feature_spotlight_actions_variant" AS ENUM('solid', 'ghost', 'ghost-bordered');
  CREATE TYPE "public"."enum_pages_blocks_feature_spotlight_media_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_pages_blocks_cinematic_banner_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_cinematic_hero_actions_variant" AS ENUM('solid', 'ghost', 'ghost-bordered');
  CREATE TYPE "public"."enum_pages_blocks_cinematic_hero_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_lab_hero_status" AS ENUM('released', 'in_dev', 'research', 'live', 'collab');
  CREATE TYPE "public"."enum_pages_blocks_roadmap_block_milestones_status" AS ENUM('done', 'in_progress', 'planned', 'cut');
  CREATE TYPE "public"."enum_pages_blocks_changelog_block_entries_changes_type" AS ENUM('added', 'fixed', 'changed', 'breaking', 'removed');
  CREATE TYPE "public"."enum_pages_blocks_asset_grid_assets_file_type" AS ENUM('glb', 'fbx', 'obj', 'blend', 'png', 'psd', 'zip', 'svg', 'mp3', 'wav');
  CREATE TYPE "public"."enum_pages_blocks_asset_grid_assets_license" AS ENUM('free', 'cc0', 'attribution', 'patreon');
  CREATE TYPE "public"."enum_pages_blocks_architecture_block_nodes_role" AS ENUM('orchestrator', 'reader', 'processor', 'renderer', 'writer', 'utility');
  CREATE TYPE "public"."enum_pages_blocks_architecture_block_layout" AS ENUM('hub', 'linear', 'tree');
  CREATE TYPE "public"."enum_pages_blocks_architecture_block_node_size" AS ENUM('default', 'compact', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_pricing_c_t_a_links_variant" AS ENUM('solid', 'ghost', 'ghost-bordered');
  CREATE TYPE "public"."enum_pages_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TABLE "pages_blocks_title_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"align" "enum_pages_blocks_title_block_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_callout_variant" DEFAULT 'note',
  	"label" varchar,
  	"body" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_code_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_pages_blocks_code_block_language" DEFAULT 'text',
  	"title" varchar,
  	"code" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_src_id" integer NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"size" "enum_pages_blocks_image_block_size" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_fact_grid_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_fact_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_pages_blocks_fact_grid_columns",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_screenshot_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_screenshot_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"video_mp4" varchar NOT NULL,
  	"video_webm" varchar,
  	"poster_src_id" integer,
  	"caption" varchar,
  	"aspect_ratio" "enum_pages_blocks_video_player_aspect_ratio" DEFAULT '16/9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"split" "enum_pages_blocks_side_by_side_split" DEFAULT '50/50',
  	"align" "enum_pages_blocks_side_by_side_align" DEFAULT 'start',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" varchar,
  	"description" varchar,
  	"image_src_id" integer
  );
  
  CREATE TABLE "pages_blocks_content_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_pages_blocks_content_cards_columns",
  	"card_height" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_spotlight_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_feature_spotlight_platforms_platform" NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_spotlight_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar,
  	"variant" "enum_pages_blocks_feature_spotlight_actions_variant",
  	"lava" boolean
  );
  
  CREATE TABLE "pages_blocks_feature_spotlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_src_id" integer,
  	"video_src" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"flip" boolean,
  	"media_fit" "enum_pages_blocks_feature_spotlight_media_fit" DEFAULT 'cover',
  	"media_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cinematic_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_src_id" integer NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"align" "enum_pages_blocks_cinematic_banner_align" DEFAULT 'left',
  	"min_height" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cinematic_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar,
  	"variant" "enum_pages_blocks_cinematic_hero_actions_variant",
  	"lava" boolean
  );
  
  CREATE TABLE "pages_blocks_cinematic_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_src" varchar,
  	"image_src_id" integer,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"align" "enum_pages_blocks_cinematic_hero_align" DEFAULT 'left',
  	"show_scroll" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_hero_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"back_href" varchar DEFAULT '/lab',
  	"back_label" varchar DEFAULT 'Lab',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"abstract" varchar,
  	"status" "enum_pages_blocks_lab_hero_status",
  	"collab" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_roadmap_block_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"status" "enum_pages_blocks_roadmap_block_milestones_status" DEFAULT 'planned'
  );
  
  CREATE TABLE "pages_blocks_roadmap_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_changelog_block_entries_changes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_changelog_block_entries_changes_type" DEFAULT 'added',
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_changelog_block_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"version" varchar NOT NULL,
  	"date" timestamp(3) with time zone,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_changelog_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_system_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"minimum_os" varchar,
  	"minimum_cpu" varchar,
  	"minimum_gpu" varchar,
  	"minimum_ram" varchar,
  	"minimum_storage" varchar,
  	"minimum_notes" varchar,
  	"recommended_os" varchar,
  	"recommended_cpu" varchar,
  	"recommended_gpu" varchar,
  	"recommended_ram" varchar,
  	"recommended_storage" varchar,
  	"recommended_notes" varchar,
  	"tested_on" varchar,
  	"platform_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_asset_grid_assets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" varchar,
  	"preview_src_id" integer,
  	"file_url" varchar NOT NULL,
  	"file_type" "enum_pages_blocks_asset_grid_assets_file_type" DEFAULT 'zip',
  	"file_size" varchar,
  	"license" "enum_pages_blocks_asset_grid_assets_license" DEFAULT 'free',
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_asset_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hierarchy_block_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"node_id" varchar NOT NULL,
  	"parent_id" varchar,
  	"label" varchar NOT NULL,
  	"type" varchar,
  	"note" varchar,
  	"order" numeric
  );
  
  CREATE TABLE "pages_blocks_hierarchy_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_architecture_block_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"node_id" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"role" "enum_pages_blocks_architecture_block_nodes_role",
  	"badge" varchar
  );
  
  CREATE TABLE "pages_blocks_architecture_block_edges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"label" varchar,
  	"bidirectional" boolean
  );
  
  CREATE TABLE "pages_blocks_architecture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"caption" varchar,
  	"layout" "enum_pages_blocks_architecture_block_layout" DEFAULT 'hub',
  	"center_id" varchar,
  	"node_size" "enum_pages_blocks_architecture_block_node_size" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embedded_app" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"embed_url" varchar NOT NULL,
  	"poster_src_id" integer,
  	"launch_label" varchar DEFAULT 'Launch',
  	"warning" varchar,
  	"height" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_c_t_a_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar,
  	"variant" "enum_pages_blocks_pricing_c_t_a_links_variant",
  	"icon_slug" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"patreon_href" varchar,
  	"patreon_label" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_spacer_size" DEFAULT 'md',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_title_block" ADD CONSTRAINT "pages_blocks_title_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_callout" ADD CONSTRAINT "pages_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_code_block" ADD CONSTRAINT "pages_blocks_code_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fact_grid_facts" ADD CONSTRAINT "pages_blocks_fact_grid_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_fact_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fact_grid" ADD CONSTRAINT "pages_blocks_fact_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_screenshot_gallery_images" ADD CONSTRAINT "pages_blocks_screenshot_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_screenshot_gallery_images" ADD CONSTRAINT "pages_blocks_screenshot_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_screenshot_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_screenshot_gallery" ADD CONSTRAINT "pages_blocks_screenshot_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_player" ADD CONSTRAINT "pages_blocks_video_player_poster_src_id_media_id_fk" FOREIGN KEY ("poster_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_player" ADD CONSTRAINT "pages_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_side_by_side" ADD CONSTRAINT "pages_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards" ADD CONSTRAINT "pages_blocks_content_cards_cards_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards" ADD CONSTRAINT "pages_blocks_content_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards" ADD CONSTRAINT "pages_blocks_content_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_spotlight_platforms" ADD CONSTRAINT "pages_blocks_feature_spotlight_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_spotlight_actions" ADD CONSTRAINT "pages_blocks_feature_spotlight_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_spotlight" ADD CONSTRAINT "pages_blocks_feature_spotlight_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_spotlight" ADD CONSTRAINT "pages_blocks_feature_spotlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cinematic_banner" ADD CONSTRAINT "pages_blocks_cinematic_banner_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cinematic_banner" ADD CONSTRAINT "pages_blocks_cinematic_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cinematic_hero_actions" ADD CONSTRAINT "pages_blocks_cinematic_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cinematic_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cinematic_hero" ADD CONSTRAINT "pages_blocks_cinematic_hero_image_src_id_media_id_fk" FOREIGN KEY ("image_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cinematic_hero" ADD CONSTRAINT "pages_blocks_cinematic_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero_tags" ADD CONSTRAINT "pages_blocks_lab_hero_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero_stats" ADD CONSTRAINT "pages_blocks_lab_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero" ADD CONSTRAINT "pages_blocks_lab_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_roadmap_block_milestones" ADD CONSTRAINT "pages_blocks_roadmap_block_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_roadmap_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_roadmap_block" ADD CONSTRAINT "pages_blocks_roadmap_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_changelog_block_entries_changes" ADD CONSTRAINT "pages_blocks_changelog_block_entries_changes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_changelog_block_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_changelog_block_entries" ADD CONSTRAINT "pages_blocks_changelog_block_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_changelog_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_changelog_block" ADD CONSTRAINT "pages_blocks_changelog_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_system_requirements" ADD CONSTRAINT "pages_blocks_system_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_asset_grid_assets" ADD CONSTRAINT "pages_blocks_asset_grid_assets_preview_src_id_media_id_fk" FOREIGN KEY ("preview_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_asset_grid_assets" ADD CONSTRAINT "pages_blocks_asset_grid_assets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_asset_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_asset_grid" ADD CONSTRAINT "pages_blocks_asset_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hierarchy_block_nodes" ADD CONSTRAINT "pages_blocks_hierarchy_block_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hierarchy_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hierarchy_block" ADD CONSTRAINT "pages_blocks_hierarchy_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture_block_nodes" ADD CONSTRAINT "pages_blocks_architecture_block_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture_block_edges" ADD CONSTRAINT "pages_blocks_architecture_block_edges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture_block" ADD CONSTRAINT "pages_blocks_architecture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embedded_app" ADD CONSTRAINT "pages_blocks_embedded_app_poster_src_id_media_id_fk" FOREIGN KEY ("poster_src_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_embedded_app" ADD CONSTRAINT "pages_blocks_embedded_app_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_c_t_a_links" ADD CONSTRAINT "pages_blocks_pricing_c_t_a_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_c_t_a" ADD CONSTRAINT "pages_blocks_pricing_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer" ADD CONSTRAINT "pages_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_title_block_order_idx" ON "pages_blocks_title_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_title_block_parent_id_idx" ON "pages_blocks_title_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_title_block_path_idx" ON "pages_blocks_title_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_callout_order_idx" ON "pages_blocks_callout" USING btree ("_order");
  CREATE INDEX "pages_blocks_callout_parent_id_idx" ON "pages_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callout_path_idx" ON "pages_blocks_callout" USING btree ("_path");
  CREATE INDEX "pages_blocks_code_block_order_idx" ON "pages_blocks_code_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_code_block_parent_id_idx" ON "pages_blocks_code_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_code_block_path_idx" ON "pages_blocks_code_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_block_order_idx" ON "pages_blocks_image_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_block_parent_id_idx" ON "pages_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_block_path_idx" ON "pages_blocks_image_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_block_image_src_idx" ON "pages_blocks_image_block" USING btree ("image_src_id");
  CREATE INDEX "pages_blocks_fact_grid_facts_order_idx" ON "pages_blocks_fact_grid_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_fact_grid_facts_parent_id_idx" ON "pages_blocks_fact_grid_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fact_grid_order_idx" ON "pages_blocks_fact_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_fact_grid_parent_id_idx" ON "pages_blocks_fact_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fact_grid_path_idx" ON "pages_blocks_fact_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_screenshot_gallery_images_order_idx" ON "pages_blocks_screenshot_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_screenshot_gallery_images_parent_id_idx" ON "pages_blocks_screenshot_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_screenshot_gallery_images_image_idx" ON "pages_blocks_screenshot_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_screenshot_gallery_order_idx" ON "pages_blocks_screenshot_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_screenshot_gallery_parent_id_idx" ON "pages_blocks_screenshot_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_screenshot_gallery_path_idx" ON "pages_blocks_screenshot_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_player_order_idx" ON "pages_blocks_video_player" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_player_parent_id_idx" ON "pages_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_player_path_idx" ON "pages_blocks_video_player" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_player_poster_src_idx" ON "pages_blocks_video_player" USING btree ("poster_src_id");
  CREATE INDEX "pages_blocks_side_by_side_order_idx" ON "pages_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "pages_blocks_side_by_side_parent_id_idx" ON "pages_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_side_by_side_path_idx" ON "pages_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_cards_cards_order_idx" ON "pages_blocks_content_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_cards_parent_id_idx" ON "pages_blocks_content_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_cards_image_src_idx" ON "pages_blocks_content_cards_cards" USING btree ("image_src_id");
  CREATE INDEX "pages_blocks_content_cards_order_idx" ON "pages_blocks_content_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_parent_id_idx" ON "pages_blocks_content_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_path_idx" ON "pages_blocks_content_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_spotlight_platforms_order_idx" ON "pages_blocks_feature_spotlight_platforms" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_spotlight_platforms_parent_id_idx" ON "pages_blocks_feature_spotlight_platforms" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_spotlight_actions_order_idx" ON "pages_blocks_feature_spotlight_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_spotlight_actions_parent_id_idx" ON "pages_blocks_feature_spotlight_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_spotlight_order_idx" ON "pages_blocks_feature_spotlight" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_spotlight_parent_id_idx" ON "pages_blocks_feature_spotlight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_spotlight_path_idx" ON "pages_blocks_feature_spotlight" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_spotlight_image_src_idx" ON "pages_blocks_feature_spotlight" USING btree ("image_src_id");
  CREATE INDEX "pages_blocks_cinematic_banner_order_idx" ON "pages_blocks_cinematic_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cinematic_banner_parent_id_idx" ON "pages_blocks_cinematic_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cinematic_banner_path_idx" ON "pages_blocks_cinematic_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_cinematic_banner_image_src_idx" ON "pages_blocks_cinematic_banner" USING btree ("image_src_id");
  CREATE INDEX "pages_blocks_cinematic_hero_actions_order_idx" ON "pages_blocks_cinematic_hero_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_cinematic_hero_actions_parent_id_idx" ON "pages_blocks_cinematic_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cinematic_hero_order_idx" ON "pages_blocks_cinematic_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_cinematic_hero_parent_id_idx" ON "pages_blocks_cinematic_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cinematic_hero_path_idx" ON "pages_blocks_cinematic_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_cinematic_hero_image_src_idx" ON "pages_blocks_cinematic_hero" USING btree ("image_src_id");
  CREATE INDEX "pages_blocks_lab_hero_tags_order_idx" ON "pages_blocks_lab_hero_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_hero_tags_parent_id_idx" ON "pages_blocks_lab_hero_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_hero_stats_order_idx" ON "pages_blocks_lab_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_hero_stats_parent_id_idx" ON "pages_blocks_lab_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_hero_order_idx" ON "pages_blocks_lab_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_hero_parent_id_idx" ON "pages_blocks_lab_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_hero_path_idx" ON "pages_blocks_lab_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_roadmap_block_milestones_order_idx" ON "pages_blocks_roadmap_block_milestones" USING btree ("_order");
  CREATE INDEX "pages_blocks_roadmap_block_milestones_parent_id_idx" ON "pages_blocks_roadmap_block_milestones" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_roadmap_block_order_idx" ON "pages_blocks_roadmap_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_roadmap_block_parent_id_idx" ON "pages_blocks_roadmap_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_roadmap_block_path_idx" ON "pages_blocks_roadmap_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_changelog_block_entries_changes_order_idx" ON "pages_blocks_changelog_block_entries_changes" USING btree ("_order");
  CREATE INDEX "pages_blocks_changelog_block_entries_changes_parent_id_idx" ON "pages_blocks_changelog_block_entries_changes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_changelog_block_entries_order_idx" ON "pages_blocks_changelog_block_entries" USING btree ("_order");
  CREATE INDEX "pages_blocks_changelog_block_entries_parent_id_idx" ON "pages_blocks_changelog_block_entries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_changelog_block_order_idx" ON "pages_blocks_changelog_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_changelog_block_parent_id_idx" ON "pages_blocks_changelog_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_changelog_block_path_idx" ON "pages_blocks_changelog_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_system_requirements_order_idx" ON "pages_blocks_system_requirements" USING btree ("_order");
  CREATE INDEX "pages_blocks_system_requirements_parent_id_idx" ON "pages_blocks_system_requirements" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_system_requirements_path_idx" ON "pages_blocks_system_requirements" USING btree ("_path");
  CREATE INDEX "pages_blocks_asset_grid_assets_order_idx" ON "pages_blocks_asset_grid_assets" USING btree ("_order");
  CREATE INDEX "pages_blocks_asset_grid_assets_parent_id_idx" ON "pages_blocks_asset_grid_assets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_asset_grid_assets_preview_src_idx" ON "pages_blocks_asset_grid_assets" USING btree ("preview_src_id");
  CREATE INDEX "pages_blocks_asset_grid_order_idx" ON "pages_blocks_asset_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_asset_grid_parent_id_idx" ON "pages_blocks_asset_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_asset_grid_path_idx" ON "pages_blocks_asset_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_hierarchy_block_nodes_order_idx" ON "pages_blocks_hierarchy_block_nodes" USING btree ("_order");
  CREATE INDEX "pages_blocks_hierarchy_block_nodes_parent_id_idx" ON "pages_blocks_hierarchy_block_nodes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hierarchy_block_order_idx" ON "pages_blocks_hierarchy_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_hierarchy_block_parent_id_idx" ON "pages_blocks_hierarchy_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hierarchy_block_path_idx" ON "pages_blocks_hierarchy_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_architecture_block_nodes_order_idx" ON "pages_blocks_architecture_block_nodes" USING btree ("_order");
  CREATE INDEX "pages_blocks_architecture_block_nodes_parent_id_idx" ON "pages_blocks_architecture_block_nodes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_architecture_block_edges_order_idx" ON "pages_blocks_architecture_block_edges" USING btree ("_order");
  CREATE INDEX "pages_blocks_architecture_block_edges_parent_id_idx" ON "pages_blocks_architecture_block_edges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_architecture_block_order_idx" ON "pages_blocks_architecture_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_architecture_block_parent_id_idx" ON "pages_blocks_architecture_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_architecture_block_path_idx" ON "pages_blocks_architecture_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_embedded_app_order_idx" ON "pages_blocks_embedded_app" USING btree ("_order");
  CREATE INDEX "pages_blocks_embedded_app_parent_id_idx" ON "pages_blocks_embedded_app" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embedded_app_path_idx" ON "pages_blocks_embedded_app" USING btree ("_path");
  CREATE INDEX "pages_blocks_embedded_app_poster_src_idx" ON "pages_blocks_embedded_app" USING btree ("poster_src_id");
  CREATE INDEX "pages_blocks_pricing_c_t_a_links_order_idx" ON "pages_blocks_pricing_c_t_a_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_c_t_a_links_parent_id_idx" ON "pages_blocks_pricing_c_t_a_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_c_t_a_order_idx" ON "pages_blocks_pricing_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_c_t_a_parent_id_idx" ON "pages_blocks_pricing_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_c_t_a_path_idx" ON "pages_blocks_pricing_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_order_idx" ON "pages_blocks_spacer" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_parent_id_idx" ON "pages_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_path_idx" ON "pages_blocks_spacer" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_title_block" CASCADE;
  DROP TABLE "pages_blocks_callout" CASCADE;
  DROP TABLE "pages_blocks_code_block" CASCADE;
  DROP TABLE "pages_blocks_image_block" CASCADE;
  DROP TABLE "pages_blocks_fact_grid_facts" CASCADE;
  DROP TABLE "pages_blocks_fact_grid" CASCADE;
  DROP TABLE "pages_blocks_screenshot_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_screenshot_gallery" CASCADE;
  DROP TABLE "pages_blocks_video_player" CASCADE;
  DROP TABLE "pages_blocks_side_by_side" CASCADE;
  DROP TABLE "pages_blocks_content_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_content_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_spotlight_platforms" CASCADE;
  DROP TABLE "pages_blocks_feature_spotlight_actions" CASCADE;
  DROP TABLE "pages_blocks_feature_spotlight" CASCADE;
  DROP TABLE "pages_blocks_cinematic_banner" CASCADE;
  DROP TABLE "pages_blocks_cinematic_hero_actions" CASCADE;
  DROP TABLE "pages_blocks_cinematic_hero" CASCADE;
  DROP TABLE "pages_blocks_lab_hero_tags" CASCADE;
  DROP TABLE "pages_blocks_lab_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_lab_hero" CASCADE;
  DROP TABLE "pages_blocks_roadmap_block_milestones" CASCADE;
  DROP TABLE "pages_blocks_roadmap_block" CASCADE;
  DROP TABLE "pages_blocks_changelog_block_entries_changes" CASCADE;
  DROP TABLE "pages_blocks_changelog_block_entries" CASCADE;
  DROP TABLE "pages_blocks_changelog_block" CASCADE;
  DROP TABLE "pages_blocks_system_requirements" CASCADE;
  DROP TABLE "pages_blocks_asset_grid_assets" CASCADE;
  DROP TABLE "pages_blocks_asset_grid" CASCADE;
  DROP TABLE "pages_blocks_hierarchy_block_nodes" CASCADE;
  DROP TABLE "pages_blocks_hierarchy_block" CASCADE;
  DROP TABLE "pages_blocks_architecture_block_nodes" CASCADE;
  DROP TABLE "pages_blocks_architecture_block_edges" CASCADE;
  DROP TABLE "pages_blocks_architecture_block" CASCADE;
  DROP TABLE "pages_blocks_embedded_app" CASCADE;
  DROP TABLE "pages_blocks_pricing_c_t_a_links" CASCADE;
  DROP TABLE "pages_blocks_pricing_c_t_a" CASCADE;
  DROP TABLE "pages_blocks_spacer" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_title_block_align";
  DROP TYPE "public"."enum_pages_blocks_callout_variant";
  DROP TYPE "public"."enum_pages_blocks_code_block_language";
  DROP TYPE "public"."enum_pages_blocks_image_block_size";
  DROP TYPE "public"."enum_pages_blocks_fact_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_video_player_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_side_by_side_split";
  DROP TYPE "public"."enum_pages_blocks_side_by_side_align";
  DROP TYPE "public"."enum_pages_blocks_content_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_spotlight_platforms_platform";
  DROP TYPE "public"."enum_pages_blocks_feature_spotlight_actions_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_spotlight_media_fit";
  DROP TYPE "public"."enum_pages_blocks_cinematic_banner_align";
  DROP TYPE "public"."enum_pages_blocks_cinematic_hero_actions_variant";
  DROP TYPE "public"."enum_pages_blocks_cinematic_hero_align";
  DROP TYPE "public"."enum_pages_blocks_lab_hero_status";
  DROP TYPE "public"."enum_pages_blocks_roadmap_block_milestones_status";
  DROP TYPE "public"."enum_pages_blocks_changelog_block_entries_changes_type";
  DROP TYPE "public"."enum_pages_blocks_asset_grid_assets_file_type";
  DROP TYPE "public"."enum_pages_blocks_asset_grid_assets_license";
  DROP TYPE "public"."enum_pages_blocks_architecture_block_nodes_role";
  DROP TYPE "public"."enum_pages_blocks_architecture_block_layout";
  DROP TYPE "public"."enum_pages_blocks_architecture_block_node_size";
  DROP TYPE "public"."enum_pages_blocks_pricing_c_t_a_links_variant";
  DROP TYPE "public"."enum_pages_blocks_spacer_size";`)
}
