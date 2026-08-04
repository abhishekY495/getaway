import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const ticketTypeEnum = pgEnum("ticket_type", ["adult", "child"]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);
type OperatingHour = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  open: string;
  close: string;
};

//

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const countriesTable = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  currency: text("currency").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const citiesTable = pgTable("cities", {
  id: serial("id").primaryKey(),
  countryId: integer("country_id")
    .references(() => countriesTable.id)
    .notNull(),
  name: text("name").notNull(),
  coverImage: text("cover_image").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const venuesTable = pgTable("venues", {
  id: serial("id").primaryKey(),
  cityId: integer("city_id")
    .references(() => citiesTable.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  rating: numeric("rating", {
    precision: 2,
    scale: 1,
  }).default("0"),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  venueId: integer("venue_id")
    .references(() => venuesTable.id)
    .notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  operatingHours: jsonb("operating_hours")
    .$type<OperatingHour[]>()
    .default([])
    .notNull(),
  rating: numeric("rating", {
    precision: 2,
    scale: 1,
  }).default("0"),
  reviewCount: integer("review_count").default(0),
  adultPrice: numeric("adult_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  childPrice: numeric("child_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  highlights: jsonb("highlights").$type<string[]>().default([]),
  inclusions: jsonb("inclusions").$type<string[]>().default([]),
  exclusions: jsonb("exclusions").$type<string[]>().default([]),
  cancellationPolicy: text("cancellation_policy"),
  isFeatured: boolean("is_featured").default(false),
  mealsIncluded: boolean("meals_included").default(false),
  bookNowPayLater: boolean("book_now_pay_later").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const eventImagesTable = pgTable("event_images", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => eventsTable.id)
    .notNull(),
  url: text("url").notNull(),
  isCover: boolean("is_cover").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const bookingsTable = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingReference: text("booking_reference").notNull().unique(),
  userId: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),
  eventId: integer("event_id")
    .references(() => eventsTable.id)
    .notNull(),
  totalAmount: numeric("total_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  currency: text("currency").notNull(),
  paymentStatus: paymentStatusEnum("payment_status")
    .default("pending")
    .notNull(),
  bookingStatus: bookingStatusEnum("booking_status")
    .default("pending")
    .notNull(),
  visitDate: timestamp("visit_date", {
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const bookingItemsTable = pgTable("booking_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .references(() => bookingsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  ticketType: ticketTypeEnum("ticket_type").notNull(),
  quantity: integer("quantity").notNull(),
  pricePerTicket: numeric("price_per_ticket", {
    precision: 10,
    scale: 2,
  }).notNull(),
  subTotal: numeric("sub_total", {
    precision: 10,
    scale: 2,
  }).notNull(),
});
