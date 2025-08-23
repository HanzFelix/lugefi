"use client";

import Link from "next/link";
import Image from "next/image";
import { Masonry } from "react-plock";
import { SelectPost } from "@/db/schema/forum";

export default function PostsClient({
  posts,
}: {
  posts: Pick<SelectPost, "id" | "title" | "description" | "image_url">[];
}) {
  return posts.length > 0 ? (
    <Masonry
      items={posts}
      config={{
        columns: [2, 2, 3, 4],
        gap: [8, 16, 16, 16],
        media: [768, 1024, 1280, 1536],
      }}
      render={(p, id) => (
        <Link
          href={`/forum/${p.id}`}
          className="group flex w-full flex-col"
          key={id}
        >
          <Image
            alt=""
            src={p.image_url}
            width={96}
            height={128}
            className="w-full"
          />
          <div className="border-cmono-50 flex flex-col border-t-4 py-1">
            <p className="group-hover:text-cmono-100 duration-200">{p.title}</p>
            <p className="group-hover:text-cmono-75 text-cmono-50 truncate text-sm duration-200">
              {p.description}
            </p>
          </div>
        </Link>
      )}
    />
  ) : (
    <p className="text-cmono-50 px-2 text-sm">No posts found.</p>
  );
}
