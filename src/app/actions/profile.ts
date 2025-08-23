"use server";
import { auth } from "@/auth";
import { db } from "@/db/database";
import { profile } from "@/db/schema/profile";
import { user } from "@/db/schema/session";
import { eq, sql } from "drizzle-orm";

export async function getSessionProfile() {
  const session = await auth();

  if (!session?.user?.id) return undefined;

  return (
    await db.select().from(profile).where(eq(profile.user_id, session.user.id))
  )[0];
}

export async function getProfile(id: number) {
  const session = await auth();

  return await db
    .select({
      username: profile.username,
      image_url: profile.image_url,
      is_profile_of_user: sql<boolean>`(${user.id} = ${session?.user?.id || ""})`,
    })
    .from(profile)
    .leftJoin(user, eq(profile.user_id, user.id))
    .where(eq(profile.id, id));
}

export async function updateProfile(username: string) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized action");

  await db
    .update(profile)
    .set({ username })
    .where(eq(profile.user_id, session.user.id));

  return true;
}

export async function checkUsernameAvailability(username: string) {
  if (!username) return false;
  const count = await db.$count(profile, eq(profile.username, username));

  return count == 0;
}
