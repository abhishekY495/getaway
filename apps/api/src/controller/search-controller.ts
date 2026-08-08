import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import type { searchResponse_T } from "@repo/types";
import { db } from "../config/db.js";
import {
  citiesTable,
  eventImagesTable,
  eventsTable,
  venuesTable,
} from "../db/schema.js";
import { and, eq, ilike } from "drizzle-orm";

export const search = async (
  req: Request,
  res: Response<searchResponse_T | { error: string }>,
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

    const query = String(req.query.q ?? "").trim();
    if (!query) {
      res.json({ data: { destinations: [], venues: [], events: [] } });
      return;
    }

    const searchTerm = `%${query}%`;

    const [destinations, venues, events] = await Promise.all([
      // Destinations
      db
        .select({
          id: citiesTable.id,
          name: citiesTable.name,
          coverImage: citiesTable.coverImage,
        })
        .from(citiesTable)
        .where(ilike(citiesTable.name, searchTerm))
        .limit(5),

      // Venues
      db
        .select({
          id: venuesTable.id,
          name: venuesTable.name,
          coverImage: venuesTable.coverImage,
          rating: venuesTable.rating,
          reviewCount: venuesTable.reviewCount,
        })
        .from(venuesTable)
        .where(ilike(venuesTable.name, searchTerm))
        .limit(5),

      // Events
      db
        .select({
          id: eventsTable.id,
          title: eventsTable.title,
          coverImage: eventImagesTable.url,
          rating: eventsTable.rating,
          reviewCount: eventsTable.reviewCount,
        })
        .from(eventsTable)
        .leftJoin(
          eventImagesTable,
          and(
            eq(eventImagesTable.eventId, eventsTable.id),
            eq(eventImagesTable.isCover, true),
          ),
        )
        .where(ilike(eventsTable.title, searchTerm))
        .limit(5),
    ]);

    res.json({ data: { destinations, venues, events } });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
