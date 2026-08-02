import express from "express";
import { greeting } from "@repo/types";

const app = express();
const port = process.env.PORT || 3000;

console.log(greeting);

app.get("/", (req, res) => {
  res.json({
    message: "API Running",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
