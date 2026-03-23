ALTER TABLE "user" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
DROP INDEX "user_username_idx";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "username";