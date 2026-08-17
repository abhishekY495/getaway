import { getAuth } from "@clerk/express";
import type { UserBookingSchemaResponse_T } from "@repo/types";
import type { Request, Response } from "express";
import { getUserService } from "../services/user-service.js";
import { getBookingsService } from "../services/booking-service.js";

export const getBookings = async (
  req: Request,
  res: Response<UserBookingSchemaResponse_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const dbUser = await getUserService(userId);
    if (!dbUser) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }

    const bookingRows = await getBookingsService(dbUser.id);

    const bookings = bookingRows.map((row) => ({
      bookingReference: row.bookingReference,
      visitDate: row.visitDate,
      eventId: row.eventId,
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
