import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../config/db.js";
import {
  bookingItemsTable,
  bookingsTable,
  eventImagesTable,
  eventsTable,
  type BookingItem,
} from "../db/schema.js";

export const createBookingService = async ({
  bookingReference,
  dbUserId,
  eventId,
  totalAmount,
  parsedVisitDate,
}: {
  bookingReference: string;
  dbUserId: number;
  eventId: number;
  totalAmount: number;
  parsedVisitDate: Date;
}) => {
  const [newBooking] = await db
    .insert(bookingsTable)
    .values({
      bookingReference,
      userId: dbUserId,
      eventId,
      totalAmount: totalAmount.toFixed(2),
      currency: "USD",
      paymentStatus: "paid",
      bookingStatus: "completed",
      visitDate: parsedVisitDate,
    })
    .returning();

  if (!newBooking) {
    throw new Error("Failed to create booking");
  }

  return newBooking;
};

export const createBookingItemsService = async (
  bookingItems: BookingItem[],
) => {
  await db.insert(bookingItemsTable).values(bookingItems);
};

export const getBookingsService = async (dbUserId: number) => {
  const bookings = await db
    .select({
      bookingReference: bookingsTable.bookingReference,
      visitDate: bookingsTable.visitDate,
      eventId: eventsTable.id,
      eventTitle: eventsTable.title,
      eventCoverImage: eventImagesTable.url,
      totalAmount: bookingsTable.totalAmount,
      adultQuantity: sql<number>`COALESCE(SUM(CASE WHEN ${bookingItemsTable.ticketType} = 'adult' THEN ${bookingItemsTable.quantity} ELSE 0 END), 0)`,
      childQuantity: sql<number>`COALESCE(SUM(CASE WHEN ${bookingItemsTable.ticketType} = 'child' THEN ${bookingItemsTable.quantity} ELSE 0 END), 0)`,
    })
    .from(bookingsTable)
    .innerJoin(eventsTable, eq(bookingsTable.eventId, eventsTable.id))
    .leftJoin(
      eventImagesTable,
      and(
        eq(eventImagesTable.eventId, eventsTable.id),
        eq(eventImagesTable.isCover, true),
      ),
    )
    .leftJoin(
      bookingItemsTable,
      eq(bookingItemsTable.bookingId, bookingsTable.id),
    )
    .where(eq(bookingsTable.userId, dbUserId))
    .groupBy(
      bookingsTable.id,
      eventsTable.id,
      eventsTable.title,
      eventImagesTable.url,
    )
    .orderBy(desc(bookingsTable.createdAt));

  return bookings;
};
