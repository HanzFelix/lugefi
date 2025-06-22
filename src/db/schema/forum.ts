import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { profile } from "./profile";

export const post = pgTable("post", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1023 }).notNull(),
  image_url: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow(),
  posted_by: integer().references(() => profile.id),
});

export type SelectPost = typeof post.$inferSelect;
export type InsertPost = typeof post.$inferInsert;
