// app/forum/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { RiQuillPenFill, RiText } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import Posts from "@/components/content/Posts";
import PostsSkeleton from "@/components/content/PostsSkeleton";
import { auth } from "@/auth";
import { Input } from "@/components/ui/input";

export default async function ForumPage({
  searchParams,
}: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  const query = (params?.q as string) || "";
  const currentPage = Number(params?.p) || 1;
  const session = await auth();
  return (
    <div className="container mx-auto flex flex-col-reverse gap-4 px-4 md:flex-row">
      <div className="flex-1">
        <Suspense key={`${query}-${currentPage}`} fallback={<PostsSkeleton />}>
          <Posts params={{ q: query, p: currentPage }} />
        </Suspense>
      </div>
      <div className="flex w-full flex-col gap-6 md:w-1/3 lg:w-1/4">
        {session && (
          <div className="flex flex-col">
            <div className="border-cmono-50 text-cmono-50 mb-2 w-full border-y px-2">
              <span>Quick Links</span>
            </div>
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
          </div>
        )}
        <form className="flex flex-col gap-4" action="/forum">
          <p className="border-cmono-50 text-cmono-50 w-full border-y px-2">
            Filter Posts
          </p>
          <div className="flex flex-row-reverse items-start gap-2">
            <Input
              id="query"
              name="q"
              defaultValue={query}
              placeholder="Enter search terms..."
              className="text-xs"
            />
            <label
              className="peer-user-invalid:text-cred text-cmono-50 text-xs"
              htmlFor="query"
            >
              <RiText size={24} className="ml-auto w-6" />
            </label>
          </div>
          {/*<TagInput placeholder="FilterByTags..." />*/}
          <div className="flex w-full justify-end">
            <Button type="submit" size="sm">
              Apply Filter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
