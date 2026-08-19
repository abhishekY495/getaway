ALTER TABLE "users" ADD COLUMN "push_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_push_token_unique" UNIQUE("push_token");