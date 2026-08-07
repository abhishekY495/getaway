import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { eventImagesTable, eventsTable } from "../db/schema.js";
import type { GetTopEventsResponse_T } from "@repo/types";
import { and, desc, eq } from "drizzle-orm";

export const getTopEvents = async (
  req: Request,
  res: Response<GetTopEventsResponse_T | { error: string }>,
) => {
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
};
