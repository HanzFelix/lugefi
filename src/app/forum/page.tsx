"use client";
import Link from "next/link";
import useMasonry from "@/components/utils/use-masonry";

export default function Forum() {
  const masonryContainer = useMasonry();
  const posts = [
    "200x300",
    "200x200",
    "200x240",
    "200x280",
    "200x160",
    "200x300",
    "200x200",
    "200x240",
    "200x280",
    "200x160",
  ];
  return (
    <div className="container mx-auto flex flex-col-reverse md:flex-row gap-4 px-4">
      <div className="basis-full">
        <p>[Publish a post]</p>
        <div
          ref={masonryContainer}
          className="grid items-start gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {posts.map((image, id) => (
            <Link
              href={`/forum/${id}`}
              className="w-full flex flex-col"
              key={id}
            >
              <img src={`https://placehold.co/${image}/3d3340/gray`} alt="" />
              <div className="flex flex-col py-1 border-t-4 border-cmono-50">
                <p>Post title {id}</p>
                <p className="text-cmono-50 truncate">
                  Post description goes here
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
