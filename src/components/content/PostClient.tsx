"use client";

import Link from "next/link";
import Image from "next/image";

import useMasonry from "@/components/utils/use-masonry";
import { SelectPost } from "@/db/schema/forum";

const images = [
  { width: 200, height: 300 },
  { width: 200, height: 200 },
  { width: 200, height: 240 },
  { width: 200, height: 280 },
  { width: 200, height: 160 },
];
export default function PostsClient({
  posts,
}: {
  posts: Pick<SelectPost, "id" | "title" | "description">[];
}) {
  const masonryContainer = useMasonry();

  return (
    <div
      ref={masonryContainer}
      className="grid grid-cols-2 items-start gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
    >
      {posts.map((p, id) => (
        <Link
          href={`/forum/${p.id}`}
          className="group flex w-full flex-col"
          key={p.id}
        >
          <Image
            src={`https://placehold.co/${images[id % images.length].width}x${images[id % images.length].height}/3d3340/gray`}
            width={images[id % images.length].width}
            height={images[id % images.length].height}
            className="w-full"
            alt=""
          />
          <div className="border-cmono-50 flex flex-col border-t-4 py-1">
            <p className="group-hover:text-cmono-100 duration-200">{p.title}</p>
            <p className="group-hover:text-cmono-75 text-cmono-50 truncate text-sm duration-200">
              {p.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
