"use client";
import Link from "next/link";
import useMasonry from "@/components/utils/use-masonry";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SelectPost } from "@/db/schema/forum";

export default function Forum() {
  const [posts, setPosts] = useState<SelectPost[]>([]);
  const masonryContainer = useMasonry(posts);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setPosts(result.data);
    }

    fetchPosts().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const images = [
    { width: 200, height: 300 },
    { width: 200, height: 200 },
    { width: 200, height: 240 },
    { width: 200, height: 280 },
    { width: 200, height: 160 },
  ];
  return (
    <div className="container mx-auto flex flex-col-reverse gap-4 px-4 md:flex-row">
      <div className="basis-auto">
        <div
          ref={masonryContainer}
          className="grid grid-cols-2 items-start gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
        >
          {posts?.map((p, id) => (
            <Link
              href={`/forum/${p.id}`}
              className="group flex w-full flex-col"
              key={id}
            >
              <Image
                src={`https://placehold.co/${
                  images[id % images.length].width
                }x${images[id % images.length].height}/3d3340/gray`}
                width={images[id % images.length].width}
                height={images[id % images.length].height}
                className="w-full"
                alt=""
              />
              <div className="border-cmono-50 flex flex-col border-t-4 py-1">
                <p className="group-hover:text-cmono-100 duration-200">
                  {p.title}
                </p>
                <p className="group-hover:text-cmono-75 text-cmono-50 truncate text-sm duration-200">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="min-w-full md:min-w-1/3 lg:min-w-1/4">
        <p>Sidebar (collapsible in mobile)</p>
        <p>Filter and such</p>
      </div>
    </div>
  );
}
