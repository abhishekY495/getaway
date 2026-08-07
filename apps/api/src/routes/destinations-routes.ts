import express from "express";
import { getTopDestinations } from "../controller/destinations-controller.js";

export const destinationsRoutes = express.Router();

destinationsRoutes.get("/top", getTopDestinations);
