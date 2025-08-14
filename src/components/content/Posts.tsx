// components/forum/Posts.tsx
import { db } from "@/db/database";
import { post } from "@/db/schema/forum";
import PostsClient from "./PostClient";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import Link from "next/link";

export default async function Posts({
  params,
  title = "Posts",
}: {
  params?: {
    q?: string;
    p?: number;
    s?: number;
    u?: number;
  };
  title?: string;
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

  const [total_posts] = await db
    .select({ count: count() })
    .from(post)
    .where(filters.length ? and(...filters) : undefined);

  const totalPages = Math.ceil(total_posts.count / pageSize);
  return (
    <>
      <div className="border-cmono-50 mb-4 flex w-full border-y px-2">
        <span className="text-cmono-50 flex-1">{title}</span>
        <div className="flex gap-4">
          <Link
            href={`?${params?.q ? `q=${params.q}&` : ""}p=${page > 1 ? page - 1 : 1}`}
            className="aria-disabled:text-cmono-50 hover:text-cyellow aria-disabled:pointer-events-none"
            aria-disabled={page == 1}
          >
            Prev
          </Link>
          <span className="text-cmono-50">
            {page} of {totalPages}
          </span>
          <Link
            href={`?${params?.q ? `q=${params.q}&` : ""}p=${page < totalPages ? page + 1 : page}`}
            className="aria-disabled:text-cmono-50 hover:text-cyellow aria-disabled:pointer-events-none"
            aria-disabled={page == totalPages}
          >
            Next
          </Link>
        </div>
      </div>
      <PostsClient posts={posts} />
    </>
  );
}
