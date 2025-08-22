"use server";
import { auth } from "@/auth";
import { db } from "@/db/database";
import { comment, post } from "@/db/schema/forum";
import { profile } from "@/db/schema/profile";
import { user } from "@/db/schema/session";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";

export async function getPost(id: number) {
  const session = await auth();

  return await db
    .select({
      id: post.id,
      title: post.title,
      description: post.description,
      image_url: post.image_url,
      created_at: post.created_at,
      posted_by_id: profile.id,
      posted_by_name: profile.username,
      is_author: sql<boolean>`(${user.id} = ${session?.user?.id ?? null})`,
    })
    .from(post)
    .leftJoin(profile, eq(post.posted_by, profile.id))
    .leftJoin(user, eq(profile.user_id, user.id))
    .where(eq(post.id, id));
}

export async function getPosts({
  query,
  page = 1,
  page_size = 12,
  user_id,
}: {
  query?: string;
  page?: number;
  page_size?: number;
  user_id?: number;
}) {
  const filters = [];

  if (query) {
    filters.push(
      or(
        ilike(post.title, `%${query}%`),
        ilike(post.description, `%${query}%`),
      ),
    );
  }
  if (user_id) {
    filters.push(eq(post.posted_by, user_id));
  }

  return await db
    .select({
      id: post.id,
      title: post.title,
      description: post.description,
      image_url: post.image_url,
    })
    .from(post)
    .where(filters.length ? and(...filters) : undefined)
    .limit(page_size)
    .offset((page - 1) * page_size)
    .orderBy(desc(post.id));
}

export async function getPostsCount({
  query,
  user_id,
}: {
  query?: string;
  user_id?: number;
}) {
  const filters = [];

  if (query) {
    filters.push(
      or(
        ilike(post.title, `%${query}%`),
        ilike(post.description, `%${query}%`),
      ),
    );
  }
  if (user_id) {
    filters.push(eq(post.posted_by, user_id));
  }

  return (
    await db
      .select({ count: count() })
      .from(post)
      .where(filters.length ? and(...filters) : undefined)
  )[0].count;
}

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

  if (postId) return postId;
  else throw new Error("Failed to upload post");
}

export async function deletePost(post_id: number) {
  const session = await auth();
  if (!session || session.user?.id == null)
    throw new Error("No permission to delete post");

  await db.delete(post).where(eq(post.id, post_id));

  return true;
}

export async function getComments(post_id: number) {
  const session = await auth();

  return await db
    .select({
      comment: comment,
      profile: profile,
      ...(session?.user?.id
        ? { is_author: sql<boolean>`(${profile.user_id} = ${session.user.id})` }
        : {}),
    })
    .from(comment)
    .leftJoin(profile, eq(comment.posted_by, profile.id))
    .where(eq(comment.posted_at, post_id));
}

export async function createComment({
  text,
  post_id,
}: {
  text: string;
  post_id: number;
}) {
  const session = await auth();
  if (!session || session.user?.id == null) throw new Error("no user");

  const profileId = db.$with("existing_profile").as(
    db
      .select({
        id: profile.id,
      })
      .from(profile)
      .where(eq(profile.user_id, session.user.id))
      .limit(1),
  );

  const [{ insertedId: commentId }] = await db
    .with(profileId)
    .insert(comment)
    .values({
      text: text,
      posted_at: post_id,
      posted_by: sql`(select id from existing_profile)`,
    })
    .returning({ insertedId: post.id });

  if (!commentId) throw new Error("Failed to add comment");

  return true;
}

export async function deleteComment(comment_id: number) {
  const session = await auth();
  if (!session || session.user?.id == null)
    throw new Error("no permission to delete comment");

  await db.delete(comment).where(eq(comment.id, comment_id));

  return true;
}
