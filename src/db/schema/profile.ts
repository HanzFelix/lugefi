import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  image_url: varchar({ length: 255 }).notNull(),
});
