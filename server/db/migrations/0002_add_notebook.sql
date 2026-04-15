CREATE TABLE "notebook" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author_name" text NOT NULL,
	"pdf_url" text NOT NULL,
	"cover_image_url" text,
	"assistant_voice" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "notebook" ADD CONSTRAINT "notebook_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;