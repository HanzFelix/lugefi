"use server";
import { auth } from "@/auth";
import { db } from "@/db/database";
import { post } from "@/db/schema/forum";
import { profile } from "@/db/schema/profile";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createPost({
  title,
  description,
  image_url,
}: {
  title: string;
  description: string;
  image_url: string;
}) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("no user");

  const profileId = db.$with("existing_profile").as(
    db
      .select({
        id: profile.id,
      })
      .from(profile)
      .where(eq(profile.user_id, session.user.id))
      .limit(1),
  );
  const [{ insertedId: postId }] = await db
    .with(profileId)
    .insert(post)
    .values({
      title: title,
      image_url: image_url || process.env.LUGEFI_DEFAULT_POST_IMAGE_URL || "",
      description: description,
      posted_by: sql`(select id from existing_profile)`,
    })
    .returning({ insertedId: post.id });

  if (postId) redirect(`/forum/${postId}`);
  else throw new Error("Failed to upload post");
}
