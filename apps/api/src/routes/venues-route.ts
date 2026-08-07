import express from "express";
import { getTopVenues } from "../controller/venues-controller.js";

export const venuesRoutes = express.Router();

venuesRoutes.get("/top", getTopVenues);
