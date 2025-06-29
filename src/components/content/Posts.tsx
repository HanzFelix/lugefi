// components/forum/Posts.tsx
import { db } from "@/db/database";
import { post } from "@/db/schema/forum";
import PostsClient from "./PostClient";
import { desc } from "drizzle-orm";

export default async function Posts({
  searchParams,
}: {
  searchParams?: string;
}) {
  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      description: post.description,
      image_url: post.image_url,
    })
    .from(post)
    .limit(12)
    .orderBy(desc(post.id));

  return <PostsClient posts={posts} />;
}
