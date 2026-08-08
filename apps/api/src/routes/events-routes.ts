import express from "express";
import { getTopEvents } from "../controller/events-controller.js";

export const eventsRoutes = express.Router();

eventsRoutes.get("/top", getTopEvents);
eventsRoutes.get("/city", getTopEvents);
