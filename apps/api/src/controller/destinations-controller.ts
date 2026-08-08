import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { citiesTable } from "../db/schema.js";
import type { GetTopDestinationsResponse_T } from "@repo/types";
import { asc } from "drizzle-orm";

export const getTopDestinations = async (
  req: Request,
  res: Response<GetTopDestinationsResponse_T | { error: string }>,
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

    const destinations = await db
      .select({
        id: citiesTable.id,
        name: citiesTable.name,
        coverImage: citiesTable.coverImage,
      })
      .from(citiesTable)
      .orderBy(asc(citiesTable.name));

    res.json({ data: destinations });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
