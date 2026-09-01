import type { Request, Response } from "express";
import type { GetTopDestinationsResponse_T } from "@repo/types";
import { getTopDestinationsService } from "../services/destination-service.js";

export const getTopDestinations = async (
  req: Request,
  res: Response<GetTopDestinationsResponse_T | { error: string }>,
) => {
  try {
    const destinations = await getTopDestinationsService();

    res.json({ data: destinations });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
