CREATE TABLE "post" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "post_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" varchar(1023) NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"created_t" timestamp DEFAULT now(),
	"posted_by" integer
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "profile_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL,
	"image_url" varchar(255) NOT NULL,
	CONSTRAINT "profile_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_posted_by_profile_id_fk" FOREIGN KEY ("posted_by") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;