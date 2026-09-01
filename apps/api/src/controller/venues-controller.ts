import type { Request, Response } from "express";
import type { GetTopVenuesResponse_T } from "@repo/types";
import { getTopVenuesService } from "../services/venue-service.js";

export const getTopVenues = async (
  req: Request,
  res: Response<GetTopVenuesResponse_T | { error: string }>,
) => {
  try {
    const venues = await getTopVenuesService();

    res.json({ data: venues });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
