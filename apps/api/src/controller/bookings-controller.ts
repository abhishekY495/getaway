import { clerkClient, getAuth } from "@clerk/express";
import type {
  AllBookingsSchema_T,
  AllBookingsSchemaResponse_T,
} from "@repo/types";
import type { Request, Response } from "express";
import {
  bookingItemsTable,
  bookingsTable,
  eventImagesTable,
  eventsTable,
  usersTable,
} from "../db/schema.js";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../config/db.js";

export const getBookings = async (
  req: Request,
  res: Response<AllBookingsSchemaResponse_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const [dbUser] = await db
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1);

    if (!dbUser) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }

    const bookingRows = await db
      .select({
        bookingReference: bookingsTable.bookingReference,
        visitDate: bookingsTable.visitDate,
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
      .where(eq(bookingsTable.userId, dbUser.id))
      .groupBy(bookingsTable.id, eventsTable.title, eventImagesTable.url)
      .orderBy(desc(bookingsTable.createdAt));

    const bookings: AllBookingsSchema_T[] = bookingRows.map((row) => ({
      bookingReference: row.bookingReference,
      visitDate: row.visitDate.toISOString(),
      eventTitle: row.eventTitle,
      eventCoverImage: row.eventCoverImage,
      adultQuantity: Number(row.adultQuantity),
      childQuantity: Number(row.childQuantity),
      totalAmount: row.totalAmount,
    }));

    res.json({ data: bookings });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
