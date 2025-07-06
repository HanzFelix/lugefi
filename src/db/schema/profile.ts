import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { user } from "./session";

export const profile = pgTable("profile", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: text().references(() => user.id, { onDelete: "set null" }),
  username: varchar({ length: 255 }).notNull().unique(),
  image_url: varchar({ length: 255 }).notNull(),
});

export type SelectProfile = typeof profile.$inferSelect;
