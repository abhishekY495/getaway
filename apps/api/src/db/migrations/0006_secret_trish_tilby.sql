ALTER TABLE "event_images" ALTER COLUMN "is_cover" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event_images" ALTER COLUMN "order" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "highlights" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "inclusions" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "exclusions" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "cancellation_policy" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "is_featured" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "meals_included" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "book_now_pay_later" SET NOT NULL;