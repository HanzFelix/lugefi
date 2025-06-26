"use client";
import Link from "next/link";
import useMasonry from "@/components/utils/use-masonry";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SelectPost } from "@/db/schema/forum";
import TagInput from "@/components/form/TagInput";
import { Button } from "@/components/ui/button";
import { RiQuillPenFill } from "@remixicon/react";

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

  const [tags, setTags] = useState<string[]>([]);
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
      <div className="flex min-w-full flex-col gap-4 md:min-w-1/3 lg:min-w-1/4">
        {/* Sidebar (collapsible in mobile)--*/}
        <Link
          href={"/forum/new"}
          className="hover:bg-cmono-25 group flex w-full"
        >
          <span className="group-hover:text-cyellow group-active:text-cblue group-active:border-cblue border-cblue group-hover:border-cyellow my-2 basis-full border-l-2 px-2">
            Publish a post
          </span>
          <div className="text-cmono-50 group-active:text-cblue group-active:bg-cmono-25 group-hover:text-cyellow p-2">
            <RiQuillPenFill className="" />
          </div>
        </Link>
        <p className="border-cmono-50 text-cmono-50 w-full border-y px-2">
          Filter Posts
        </p>
        <TagInput onChange={setTags} placeholder="FilterByTags..." />
        {/*<div className="flex gap-2 text-xs">
          <RiPriceTag3Fill />
          <div className="border-cpurple flex basis-full flex-wrap items-center gap-2 border-l-2 pl-2">
            {tags.map((tag, id) => (
              <div key={id} className="bg-cmono-25 flex items-center pl-1">
                #{tag}
                <button className="hover:text-cred p-1">
                  <RiCloseLine size={12} />
                </button>
              </div>
            ))}
            <div className="flex flex-1">
              <span>#</span>
              <input
                type="text"
                className="placeholder:text-cmono-50 w-full border-0 py-0 focus:outline-0"
                placeholder="FilterByTag..."
                min={0}
              />
            </div>
          </div>
        </div>*/}
        <div className="flex w-full justify-end">
          <Button size="sm">Apply Filter</Button>
        </div>
      </div>
    </div>
  );
}
