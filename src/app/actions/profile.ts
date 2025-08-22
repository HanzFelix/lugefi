"use server";
import { db } from "@/db/database";
import { profile } from "@/db/schema/profile";
import { user } from "@/db/schema/session";
import { eq, sql } from "drizzle-orm";

export async function getProfile(id: number, user_id: string = "") {
  return await db
    .select({
      username: profile.username,
      image_url: profile.image_url,
      is_profile_of_user: sql<boolean>`(${user.id} = ${user_id})`,
    })
    .from(profile)
    .leftJoin(user, eq(profile.user_id, user.id))
    .where(eq(profile.id, id));
}
