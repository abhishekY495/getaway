import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { type BookingItem } from "../db/schema.js";
import {
  BookingSchema,
  type BookingSchemaResponse_T,
  type GetCityEventsResponse_T,
  type GetEventResponse_T,
  type GetTopEventsResponse_T,
  type GetVenueEventsResponse_T,
} from "@repo/types";
import {
  getCityEventsByCityIdService,
  getEventService,
  getTopEventsService,
  getVenueEventsService,
} from "../services/event-service.js";
import { getUserService } from "../services/user-service.js";
import {
  createBookingItemsService,
  createBookingService,
} from "../services/booking-service.js";

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

    const events = await getTopEventsService();
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

    const { city, events } = await getCityEventsByCityIdService(cityId);

    res.json({
      data: { city, events },
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

    const { events, venue } = await getVenueEventsService(venueId);

    res.json({
      data: { venue, events },
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

    const event = await getEventService(eventId);

    res.json({
      data: event,
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

    const dbUser = await getUserService(userId);
    if (!dbUser) {
      res.status(404).json({
        error: "User does not exist",
      });
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

    const event = await getEventService(eventId);
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

    const newBooking = await createBookingService({
      bookingReference,
      dbUserId: dbUser.id,
      eventId,
      parsedVisitDate,
      totalAmount,
    });

    const bookingItems: BookingItem[] = [];

    if (adultQuantity > 0) {
      bookingItems.push({
        bookingId: newBooking.id,
        ticketType: "adult",
        quantity: adultQuantity,
        pricePerTicket: adultPrice.toFixed(2),
        subTotal: adultSubtotal.toFixed(2),
      });
    }
    if (childQuantity > 0) {
      bookingItems.push({
        bookingId: newBooking.id,
        ticketType: "child",
        quantity: childQuantity,
        pricePerTicket: childPrice.toFixed(2),
        subTotal: childSubtotal.toFixed(2),
      });
    }

    if (bookingItems.length > 0) {
      await createBookingItemsService(bookingItems);
    }

    res.status(201).json({
      bookingId: newBooking.id,
      bookingReference: newBooking.bookingReference,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
