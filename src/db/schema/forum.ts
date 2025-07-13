import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { profile } from "./profile";

export const post = pgTable("post", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1023 }).notNull(),
  image_url: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  posted_by: integer().references(() => profile.id),
});

export const comment = pgTable("comment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 511 }).notNull(),
  posted_at: integer().references(() => post.id),
  posted_by: integer().references(() => profile.id),
  created_at: timestamp().defaultNow(),
});

export type SelectPost = typeof post.$inferSelect;
export type InsertPost = typeof post.$inferInsert;
