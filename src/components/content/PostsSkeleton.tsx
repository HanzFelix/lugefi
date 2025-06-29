"use client";
import { Skeleton } from "../ui/skeleton";
import useMasonry from "@/components/utils/use-masonry";

const images = [
  { width: 200, height: 300 },
  { width: 200, height: 200 },
  { width: 200, height: 240 },
  { width: 200, height: 280 },
  { width: 200, height: 120 },
  { width: 200, height: 180 },
];
export default function PostsSkeleton() {
  const masonryContainer = useMasonry();

  return (
    <div
      ref={masonryContainer}
      className="grid grid-cols-2 items-start gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
    >
      {[...Array(12).keys()].map((i) => (
        <div className="w-full" key={i}>
          <Skeleton
            style={{
              aspectRatio:
                images[i % images.length].width /
                images[i % images.length].height,
            }}
            className="w-full"
          />
          <div className="flex flex-col gap-2 py-4">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
