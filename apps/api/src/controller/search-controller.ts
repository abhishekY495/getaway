import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import type { SearchResponse_T } from "@repo/types";
import { searchDestinationsService } from "../services/destination-service.js";
import { searchEventsService } from "../services/event-service.js";
import { searchVenuesService } from "../services/venue-service.js";

export const search = async (
  req: Request,
  res: Response<SearchResponse_T | { error: string }>,
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
      await searchDestinationsService(searchTerm),
      await searchVenuesService(searchTerm),
      await searchEventsService(searchTerm),
    ]);

    res.json({ data: { destinations, venues, events } });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
