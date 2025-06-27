CREATE TABLE "comment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" varchar(511) NOT NULL,
	"posted_at" integer,
	"posted_by" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_posted_at_post_id_fk" FOREIGN KEY ("posted_at") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_posted_by_profile_id_fk" FOREIGN KEY ("posted_by") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;