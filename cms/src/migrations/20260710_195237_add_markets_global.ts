import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_markets_items_market_id" AS ENUM('new-york', 'boston', 'north-houston', 'dallas');
  CREATE TABLE "markets_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"market_id" "enum_markets_items_market_id" NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "markets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "markets_items" ADD CONSTRAINT "markets_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markets_items" ADD CONSTRAINT "markets_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "markets_items_order_idx" ON "markets_items" USING btree ("_order");
  CREATE INDEX "markets_items_parent_id_idx" ON "markets_items" USING btree ("_parent_id");
  CREATE INDEX "markets_items_image_idx" ON "markets_items" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "markets_items" CASCADE;
  DROP TABLE "markets" CASCADE;
  DROP TYPE "public"."enum_markets_items_market_id";`)
}
