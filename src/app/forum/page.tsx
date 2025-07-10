// app/forum/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { RiQuillPenFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import TagInput from "@/components/form/TagInput";
import Posts from "@/components/content/Posts";
import PostsSkeleton from "@/components/content/PostsSkeleton";

export default function ForumPage() {
  return (
    <div className="container mx-auto flex flex-col-reverse gap-4 px-4 md:flex-row">
      <div className="flex-1">
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </div>
      <div className="flex w-full flex-col gap-4 md:w-1/3 lg:w-1/4">
        <Link
          href={"/forum/new"}
          className="hover:bg-cmono-25 group flex w-full"
        >
          <span className="group-hover:text-cyellow group-active:text-cblue group-active:border-cblue border-cblue group-hover:border-cyellow my-2 basis-full border-l-2 px-1.5">
            Publish a post
          </span>
          <div className="text-cmono-50 group-active:text-cblue group-active:bg-cmono-25 group-hover:text-cyellow p-2">
            <RiQuillPenFill />
          </div>
        </Link>
        <p className="border-cmono-50 text-cmono-50 w-full border-y px-2">
          Filter Posts
        </p>
        <TagInput placeholder="FilterByTags..." />
        <div className="flex w-full justify-end">
          <Button size="sm" disabled>
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
}
