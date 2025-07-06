// components/forum/Posts.tsx
import { db } from "@/db/database";
import { post, SelectPost } from "@/db/schema/forum";
import PostsClient from "./PostClient";
import { and, desc, eq, ilike } from "drizzle-orm";

export default async function Posts({
  searchParams,
}: {
  searchParams?: Partial<SelectPost>;
}) {
  const filters = [];

  if (searchParams?.title) {
    filters.push(ilike(post.title, searchParams.title));
  }
  if (searchParams?.description) {
    filters.push(ilike(post.description, searchParams.description));
  }
  if (searchParams?.created_at) {
    filters.push(eq(post.created_at, searchParams.created_at));
  }
  if (searchParams?.posted_by) {
    filters.push(eq(post.posted_by, searchParams.posted_by));
  }

  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      description: post.description,
      image_url: post.image_url,
    })
    .from(post)
    .where(filters.length ? and(...filters) : undefined)
    .limit(12)
    .orderBy(desc(post.id));

  return <PostsClient posts={posts} />;
}
