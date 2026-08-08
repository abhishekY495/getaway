import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { venuesTable } from "../db/schema.js";
import type { GetTopVenuesResponse_T } from "@repo/types";
import { desc } from "drizzle-orm";

export const getTopVenues = async (
  req: Request,
  res: Response<GetTopVenuesResponse_T | { error: string }>,
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

    const venues = await db
      .select({
        id: venuesTable.id,
        name: venuesTable.name,
        coverImage: venuesTable.coverImage,
        description: venuesTable.description,
        rating: venuesTable.rating,
        reviewCount: venuesTable.reviewCount,
      })
      .from(venuesTable)
      .orderBy(desc(venuesTable.rating), desc(venuesTable.reviewCount))
      .limit(10);

    res.json({ data: venues });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
