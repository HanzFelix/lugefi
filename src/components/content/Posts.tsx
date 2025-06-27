// components/forum/Posts.tsx
import { db } from "@/db/database";
import { post } from "@/db/schema/forum";
import PostsClient from "./PostClient";

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
    })
    .from(post)
    .limit(12);
  console.log(searchParams);

  return <PostsClient posts={posts} />;
}
