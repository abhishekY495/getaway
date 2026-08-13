import express from "express";
import {
  bookEvent,
  getCityEvents,
  getEvent,
  getTopEvents,
  getVenueEvents,
} from "../controller/events-controller.js";

export const eventsRoutes = express.Router();

eventsRoutes.get("/top", getTopEvents);
eventsRoutes.get("/by-city/:cityId", getCityEvents);
eventsRoutes.get("/by-venue/:venueId", getVenueEvents);
eventsRoutes.get("/:eventId", getEvent);
eventsRoutes.post("/:eventId/book", bookEvent);
