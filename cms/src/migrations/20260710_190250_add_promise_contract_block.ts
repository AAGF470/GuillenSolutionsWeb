import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_promise_contract_cta_variant" AS ENUM('solid', 'ghost', 'ghost-bordered');
  CREATE TABLE "pages_blocks_promise_contract_clauses" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_promise_contract" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"signature_name" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"cta_variant" "enum_pages_blocks_promise_contract_cta_variant" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promise_contract_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"frame_label" varchar,
  	"signature_sub" varchar,
  	"stamp" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_promise_contract_clauses" ADD CONSTRAINT "pages_blocks_promise_contract_clauses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promise_contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promise_contract" ADD CONSTRAINT "pages_blocks_promise_contract_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promise_contract_locales" ADD CONSTRAINT "pages_blocks_promise_contract_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promise_contract"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_promise_contract_clauses_order_idx" ON "pages_blocks_promise_contract_clauses" USING btree ("_order");
  CREATE INDEX "pages_blocks_promise_contract_clauses_parent_id_idx" ON "pages_blocks_promise_contract_clauses" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promise_contract_clauses_locale_idx" ON "pages_blocks_promise_contract_clauses" USING btree ("_locale");
  CREATE INDEX "pages_blocks_promise_contract_order_idx" ON "pages_blocks_promise_contract" USING btree ("_order");
  CREATE INDEX "pages_blocks_promise_contract_parent_id_idx" ON "pages_blocks_promise_contract" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promise_contract_path_idx" ON "pages_blocks_promise_contract" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_promise_contract_locales_locale_parent_id_uniqu" ON "pages_blocks_promise_contract_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_promise_contract_clauses" CASCADE;
  DROP TABLE "pages_blocks_promise_contract" CASCADE;
  DROP TABLE "pages_blocks_promise_contract_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_promise_contract_cta_variant";`)
}
