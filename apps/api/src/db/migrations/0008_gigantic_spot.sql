ALTER TABLE "users" RENAME COLUMN "push_token" TO "expo_push_token";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_push_token_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_expo_push_token_unique" UNIQUE("expo_push_token");