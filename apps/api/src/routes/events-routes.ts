import express from "express";
import {
  getCityEvents,
  getTopEvents,
  getVenueEvents,
} from "../controller/events-controller.js";

export const eventsRoutes = express.Router();

eventsRoutes.get("/top", getTopEvents);
eventsRoutes.get("/by-city/:cityId", getCityEvents);
eventsRoutes.get("/by-venue/:venueId", getVenueEvents);
