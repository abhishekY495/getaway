import express from "express";
import { sendNotification } from "../controller/notification-controller.js";

export const notificationRoutes = express.Router();

notificationRoutes.post("/send", sendNotification);
