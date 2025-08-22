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
  const page = params?.p || 1;
  const page_size = params?.s || 12;

  const posts = await getPosts({
    query: params?.q,
    page,
    page_size,
    user_id: params?.u,
  });

  const totalPosts = await getPostsCount({
    query: params?.q,
    user_id: params?.u,
  });

  const totalPages = Math.ceil(totalPosts / page_size);
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
