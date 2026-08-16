import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import type { GetTopDestinationsResponse_T } from "@repo/types";
import { getTopDestinationsService } from "../services/destination-service.js";

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

    const destinations = await getTopDestinationsService();

    res.json({ data: destinations });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
