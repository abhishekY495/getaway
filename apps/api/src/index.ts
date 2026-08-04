import express, { type Response } from "express";
import type { API_RESPONSE_T } from "@repo/types";
import { ENV } from "./config/env.js";

const app = express();
const port = ENV.PORT;

app.use(express.json());

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

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
