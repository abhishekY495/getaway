import express from "express";
import { getBookings } from "../controller/bookings-controller.js";

export const bookingsRoutes = express.Router();

bookingsRoutes.get("/", getBookings);
