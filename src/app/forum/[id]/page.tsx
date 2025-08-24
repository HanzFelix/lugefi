import { auth } from "@/auth";
import Comments from "@/components/content/Comments";
import CommentsSkeleton from "@/components/content/CommentsSkeleton";
import { Button } from "@/components/ui/button";
import { RiChatNewFill, RiMoreFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { createComment, deletePost, getPost } from "@/app/actions/forum";

export default async function ForumPost({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const session = await auth();

  const { id } = await params;
  const [p] = await getPost(id);

  if (!p) throw new Error("Forum post not found");

  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Image
            src={p.image_url}
            className="float-right ml-2 block w-24 md:hidden"
            alt=""
            width={96}
            height={128}
          />
          <div>
            <h2 className="text-cmono-100 flex flex-wrap items-center gap-2">
              {p.title}
              {p.is_author && (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-cmono-50 hover:text-cyellow data-[state=open]:bg-cmono-25 cursor-pointer">
                      <RiMoreFill />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="p-0" sideOffset={0}>
                    {p.is_author ? (
                      <div className="*:hover:text-cyellow text-cmono-75 *:hover:border-cyellow flex w-full max-w-40 flex-col text-sm *:border-x-2 *:border-transparent *:px-2 *:py-1">
                        <button
                          onClick={async () => {
                            "use server";

                            const isSuccess = await deletePost(p.id);

                            if (isSuccess) redirect(`/forum`);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <p className="text-cmono-50 px-2 py-1 text-sm">
                        (No action)
                      </p>
                    )}
                  </PopoverContent>
                </Popover>
              )}
            </h2>
            <p className="text-cmono-50 text-xs">
              Post by
              <Link
                href={`/profile/${p.posted_by_id}`}
                className="hover:text-cyellow"
              >
                {" " + p.posted_by_name + " "}
              </Link>
              {"on " +
                new Date(p.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
            <p className="my-4 text-sm">{p.description}</p>
            <div className="text-cmono-75 flex gap-2 text-xs font-bold">
              {["lorem", "ipsum"].map((tag, id) => (
                <span key={id}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="border-cmono-50 text-cmono-50 w-full border-y px-2">
            Comments
          </p>

          <Suspense fallback={<CommentsSkeleton />}>
            <Comments postId={id} currentUser={session?.user?.id} />
            {session && (
              <form
                action={async (formData: FormData) => {
                  "use server";

                  const isSuccess = await createComment({
                    text: formData.get("comment") as string,
                    post_id: id,
                  });

                  if (isSuccess) redirect(`/forum/${id}`);
                }}
              >
                <div className="flex items-start gap-2">
                  <label htmlFor="comment" className="mt-1">
                    <RiChatNewFill
                      size={24}
                      className="text-cmono-50 ml-auto w-8"
                    />
                  </label>
                  <Textarea
                    placeholder="Add a comment..."
                    id="comment"
                    name="comment"
                    required
                    className="text-sm"
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <Button type="submit">Post</Button>
                </div>
              </form>
            )}
          </Suspense>
        </div>
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4">
        <Image
          src={p.image_url}
          className="bg-cmono-25 hidden aspect-2/3 w-full object-contain md:block"
          alt=""
          width={96}
          height={128}
        />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const [p] = await getPost(id);

  return {
    title: p.title,
    image: p.image_url,
    description: p.description,
    openGraph: {
      title: p.title,
      description: p.description,
      images: [{ url: p.image_url }],
      publishedTime: p.created_at,
      authors: [p.posted_by_name],
    },
  };
}
