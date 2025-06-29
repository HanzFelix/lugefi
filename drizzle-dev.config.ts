import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: { url: process.env.DATABASE_URL_LOCAL! },
});
