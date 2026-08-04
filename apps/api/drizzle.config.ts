import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/config/env.js";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: { url: ENV.DATABASE_URL },
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
});
