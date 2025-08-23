"use client";
import { Skeleton } from "../ui/skeleton";
import { Masonry } from "react-plock";

const images = [
  { width: 200, height: 300 },
  { width: 200, height: 200 },
  { width: 200, height: 240 },
  { width: 200, height: 280 },
  { width: 200, height: 120 },
  { width: 200, height: 180 },
];
const arr = [...Array(12).keys()];
export default function PostsSkeleton({ title = "Posts" }: { title?: string }) {
  return (
    <>
      <div className="border-cmono-50 mb-4 flex w-full border-y px-2">
        <span className="text-cmono-50 flex-1">{title}</span>
        <Skeleton className="h-6 w-36" />
      </div>
      <Masonry
        items={arr}
        config={{
          columns: [2, 2, 3, 4],
          gap: [8, 16, 16, 16],
          media: [768, 1024, 1280, 1536],
        }}
        render={(i) => (
          <div className="w-full" key={i}>
            <Skeleton
              style={{
                aspectRatio:
                  images[i % images.length].width /
                  images[i % images.length].height,
              }}
              className="h-auto w-full"
            />
            <div className="flex flex-col gap-2 py-4">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
        )}
      />
    </>
  );
}
