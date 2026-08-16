import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import type { GetTopVenuesResponse_T } from "@repo/types";
import { getTopVenuesService } from "../services/venue-service.js";

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

    const venues = await getTopVenuesService();

    res.json({ data: venues });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
