import express, { type Response } from "express";
import type { API_RESPONSE_T } from "@repo/types";
import { clerkMiddleware } from "@clerk/express";
import { userRoutes } from "./routes/user-routes.js";
import { ENV } from "./config/env.js";

const app = express();
const port = ENV.PORT;

app.use(express.json());
app.use(clerkMiddleware());

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

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
