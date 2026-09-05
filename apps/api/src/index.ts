import express, { type Response } from "express";
import type { API_RESPONSE_T } from "@repo/types";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";
import { userRoutes } from "./routes/user-routes.js";
import { ENV } from "./config/env.js";
import { destinationsRoutes } from "./routes/destinations-routes.js";
import { venuesRoutes } from "./routes/venues-route.js";
import { eventsRoutes } from "./routes/events-routes.js";
import { search } from "./controller/search-controller.js";
import { bookingsRoutes } from "./routes/bookings-routes.js";
import { chatRoutes } from "./routes/chat-routes.js";
import { notificationRoutes } from "./routes/notification-routes.js";

const app = express();
const port = ENV.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res: Response<API_RESPONSE_T>) => {
  res.json({
    status: "Ok",
    statusMessage: "API Running",
  });
});

app.get("/health", (req, res: Response<API_RESPONSE_T>) => {
  res.json({
    status: "good",
    statusMessage: "API Running",
  });
});

app.use(clerkMiddleware());

app.get("/search", search);

app.use("/user", userRoutes);
app.use("/destinations", destinationsRoutes);
app.use("/venues", venuesRoutes);
app.use("/events", eventsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/chat", chatRoutes);
app.use("/notification", notificationRoutes);

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
