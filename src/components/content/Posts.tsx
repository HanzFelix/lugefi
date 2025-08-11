// components/forum/Posts.tsx
import { db } from "@/db/database";
import { post } from "@/db/schema/forum";
import PostsClient from "./PostClient";
import { and, desc, eq, ilike, or } from "drizzle-orm";

export default async function Posts({
  params,
}: {
  params?: {
    q?: string;
    p?: number;
    s?: number;
    u?: number;
  };
}) {
  const filters = [];

  if (params?.q) {
    filters.push(
      or(
        ilike(post.title, `%${params.q}%`),
        ilike(post.description, `%${params.q}%`),
      ),
    );
  }
  if (params?.u) {
    filters.push(eq(post.posted_by, params.u));
  }

  const page = params?.p || 1;
  const pageSize = params?.s || 12;

  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      description: post.description,
      image_url: post.image_url,
    })
    .from(post)
    .where(filters.length ? and(...filters) : undefined)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(post.id));

  return <PostsClient posts={posts} />;
}
