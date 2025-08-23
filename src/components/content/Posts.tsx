import PostsClient from "./PostClient";
import Link from "next/link";
import { getPosts, getPostsCount } from "@/app/actions/forum";

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
  const page_size = params?.s || 12;

  const totalPosts = await getPostsCount({
    query: params?.q,
    user_id: params?.u,
  });

  const totalPages = Math.ceil(totalPosts / page_size) || 1;

  const page =
    params?.p && params.p > 1
      ? params.p > totalPages
        ? totalPages
        : params.p
      : 1;

  const posts = await getPosts({
    query: params?.q,
    page: page,
    page_size: page_size,
    user_id: params?.u,
  });

  return (
    <>
      <div className="border-cmono-50 mb-4 flex w-full border-y px-2">
        <span className="text-cmono-50 flex-1">{title}</span>
        <div className="flex gap-4">
          <Link
            href={`?${params?.q ? `q=${params.q}&` : ""}p=${page - 1}`}
            className="aria-disabled:text-cmono-50 hover:text-cyellow aria-disabled:pointer-events-none"
            aria-disabled={page <= 1}
          >
            Prev
          </Link>
          <span className="text-cmono-50">
            {page} of {totalPages}
          </span>
          <Link
            href={`?${params?.q ? `q=${params.q}&` : ""}p=${page + 1}`}
            className="aria-disabled:text-cmono-50 hover:text-cyellow aria-disabled:pointer-events-none"
            aria-disabled={page >= totalPages}
          >
            Next
          </Link>
        </div>
      </div>
      <PostsClient posts={posts} />
    </>
  );
}
