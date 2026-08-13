import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { db } from "../config/db.js";
import {
  bookingItemsTable,
  bookingsTable,
  citiesTable,
  eventImagesTable,
  eventsTable,
  venuesTable,
} from "../db/schema.js";
import {
  BookingSchema,
  type BookingSchemaResponse_T,
  type GetCityEventsResponse_T,
  type GetEventResponse_T,
  type GetTopEventsResponse_T,
  type GetVenueEventsResponse_T,
} from "@repo/types";
import { and, asc, desc, eq } from "drizzle-orm";

export const getTopEvents = async (
  req: Request,
  res: Response<GetTopEventsResponse_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      res.status(401).json({ error: "User does not exist" });
      return;
    }

    const events = await db
      .select({
        id: eventsTable.id,
        title: eventsTable.title,
        rating: eventsTable.rating,
        reviewCount: eventsTable.reviewCount,
        lowestPrice: eventsTable.adultPrice,
        coverImage: eventImagesTable.url,
      })
      .from(eventsTable)
      .leftJoin(
        eventImagesTable,
        and(
          eq(eventImagesTable.eventId, eventsTable.id),
          eq(eventImagesTable.isCover, true),
        ),
      )
      .orderBy(desc(eventsTable.rating), desc(eventsTable.reviewCount))
      .limit(10);

    res.json({ data: events });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCityEvents = async (
  req: Request,
  res: Response<GetCityEventsResponse_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      res.status(401).json({ error: "User does not exist" });
      return;
    }

    const cityId = Number(req.params.cityId);

    const city = await db
      .select({
        name: citiesTable.name,
        coverImage: citiesTable.coverImage,
      })
      .from(citiesTable)
      .where(eq(citiesTable.id, cityId))
      .limit(1);

    if (!city[0]) {
      throw new Error("City not found");
    }

    const events = await db
      .select({
        id: eventsTable.id,
        title: eventsTable.title,
        coverImage: eventImagesTable.url,
        rating: eventsTable.rating,
        reviewCount: eventsTable.reviewCount,
        lowestPrice: eventsTable.adultPrice,
      })
      .from(eventsTable)
      .innerJoin(venuesTable, eq(eventsTable.venueId, venuesTable.id))
      .leftJoin(
        eventImagesTable,
        and(
          eq(eventImagesTable.eventId, eventsTable.id),
          eq(eventImagesTable.isCover, true),
        ),
      )
      .where(eq(venuesTable.cityId, cityId));

    res.json({
      data: {
        city: city[0],
        events,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getVenueEvents = async (
  req: Request,
  res: Response<GetVenueEventsResponse_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      res.status(401).json({ error: "User does not exist" });
      return;
    }

    const venueId = Number(req.params.venueId);

    const venue = await db
      .select({
        name: venuesTable.name,
        coverImage: venuesTable.coverImage,
      })
      .from(venuesTable)
      .where(eq(venuesTable.id, venueId))
      .limit(1);

    if (!venue[0]) {
      throw new Error("Venue not found");
    }

    const events = await db
      .select({
        id: eventsTable.id,
        title: eventsTable.title,
        coverImage: eventImagesTable.url,
        rating: eventsTable.rating,
        reviewCount: eventsTable.reviewCount,
        lowestPrice: eventsTable.adultPrice,
      })
      .from(eventsTable)
      .leftJoin(
        eventImagesTable,
        and(
          eq(eventImagesTable.eventId, eventsTable.id),
          eq(eventImagesTable.isCover, true),
        ),
      )
      .where(eq(eventsTable.venueId, venueId));

    res.json({
      data: {
        venue: venue[0],
        events,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getEvent = async (
  req: Request,
  res: Response<GetEventResponse_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      res.status(401).json({ error: "User does not exist" });
      return;
    }

    const eventId = Number(req.params.eventId);

    const event = await db
      .select({
        id: eventsTable.id,
        title: eventsTable.title,
        venue: venuesTable.name,
        operatingHours: eventsTable.operatingHours,
        rating: eventsTable.rating,
        reviewCount: eventsTable.reviewCount,
        adultPrice: eventsTable.adultPrice,
        childPrice: eventsTable.childPrice,
        highlights: eventsTable.highlights,
        inclusions: eventsTable.inclusions,
        exclusions: eventsTable.exclusions,
        cancellationPolicy: eventsTable.cancellationPolicy,
        mealsIncluded: eventsTable.mealsIncluded,
        bookNowPayLater: eventsTable.bookNowPayLater,
      })
      .from(eventsTable)
      .innerJoin(venuesTable, eq(eventsTable.venueId, venuesTable.id))
      .where(eq(eventsTable.id, eventId))
      .limit(1);

    if (!event[0]) {
      throw new Error("Event not found");
    }

    const eventImages = await db
      .select({
        url: eventImagesTable.url,
      })
      .from(eventImagesTable)
      .where(eq(eventImagesTable.eventId, eventId))
      .orderBy(asc(eventImagesTable.order));

    res.json({
      data: { ...event[0], images: eventImages.map((image) => image.url) },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const bookEvent = async (
  req: Request,
  res: Response<BookingSchemaResponse_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      res.status(401).json({ error: "User does not exist" });
      return;
    }

    const eventId = Number(req.params.eventId);
    if (!eventId) {
      res.status(400).json({ error: "Invalid event Id" });
      return;
    }

    const result = BookingSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "Invalid booking details",
      });
      return;
    }

    const { visitDate, adultQuantity, childQuantity } = result.data;

    if (adultQuantity + childQuantity === 0) {
      res.status(400).json({
        error: "At least one ticket is required",
      });
      return;
    }

    const [event] = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.id, eventId))
      .limit(1);
    if (!event) {
      res.status(404).json({
        error: "Event not found",
      });
      return;
    }

    const parsedVisitDate = new Date(visitDate);
    if (Number.isNaN(parsedVisitDate.getTime())) {
      res.status(400).json({
        error: "Invalid visit date",
      });
      return;
    }

    const adultPrice = Number(event.adultPrice);
    const childPrice = Number(event.childPrice);

    const adultSubtotal = adultQuantity * adultPrice;
    const childSubtotal = childQuantity * childPrice;
    const totalAmount = adultSubtotal + childSubtotal;

    const bookingReference = `GTW-${Date.now()}-${crypto
      .randomUUID()
      .slice(0, 4)
      .toUpperCase()}`;

    const booking = await db.transaction(async (tx) => {
      const [newBooking] = await tx
        .insert(bookingsTable)
        .values({
          bookingReference,
          userId: Number(userId),
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
      const bookingItems = [];

      if (adultQuantity > 0) {
        bookingItems.push({
          bookingId: newBooking.id,
          ticketType: "adult" as const,
          quantity: adultQuantity,
          pricePerTicket: adultPrice.toFixed(2),
          subTotal: adultSubtotal.toFixed(2),
        });
      }

      if (childQuantity > 0) {
        bookingItems.push({
          bookingId: newBooking.id,
          ticketType: "child" as const,
          quantity: childQuantity,
          pricePerTicket: childPrice.toFixed(2),
          subTotal: childSubtotal.toFixed(2),
        });
      }

      if (bookingItems.length > 0) {
        await tx.insert(bookingItemsTable).values(bookingItems);
      }

      return newBooking;
    });

    res.status(201).json({
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
