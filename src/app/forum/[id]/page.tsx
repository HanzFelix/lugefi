import { auth } from "@/auth";
import Comments from "@/components/content/Comments";
import CommentsSkeleton from "@/components/content/CommentsSkeleton";
import { Button } from "@/components/ui/button";
import { db } from "@/db/database";
import { comment, post } from "@/db/schema/forum";
import { profile } from "@/db/schema/profile";
import { user } from "@/db/schema/session";
import { RiChatNewFill, RiMoreFill } from "@remixicon/react";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

async function getPost(id: number, user_id: string = "") {
  return await db
    .select({
      id: post.id,
      title: post.title,
      description: post.description,
      image_url: post.image_url,
      created_at: post.created_at,
      posted_by_id: profile.id,
      posted_by_name: profile.username,
      is_author: sql<boolean>`(${user.id} = ${user_id})`,
    })
    .from(post)
    .leftJoin(profile, eq(post.posted_by, profile.id))
    .leftJoin(user, eq(profile.user_id, user.id))
    .where(eq(post.id, id));
}

export default async function ForumPost({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const session = await auth();

  const { id } = await params;
  const [p] = await getPost(id, session?.user?.id);

  async function createComment(formData: FormData) {
    "use server";

    if (!session || session.user?.id == null) throw new Error("no user");

    const profileId = db.$with("existing_profile").as(
      db
        .select({
          id: profile.id,
        })
        .from(profile)
        .where(eq(profile.user_id, session.user.id))
        .limit(1),
    );

    const [{ insertedId: commentId }] = await db
      .with(profileId)
      .insert(comment)
      .values({
        text: formData.get("comment") as string,
        posted_at: id,
        posted_by: sql`(select id from existing_profile)`,
      })
      .returning({ insertedId: post.id });

    if (!commentId) throw new Error("Failed to add comment");

    redirect(`/forum/${id}`);
  }
  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Image
            src={p.image_url}
            className="float-right ml-2 block w-24 md:hidden"
            alt=""
            priority
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
                            await db.delete(post).where(eq(post.id, p.id));
                            redirect(`/forum`);
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
              <form action={createComment}>
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    <RiChatNewFill
                      size={24}
                      className="text-cmono-50 ml-auto w-8"
                    />
                  </div>
                  <textarea
                    placeholder="Add a comment..."
                    name="comment"
                    required
                    className="border-cpurple focus:border-cyellow text-cmono-75 focus:bg-cmono-25 placeholder:text-cmono-50 flex-1 border-l-2 py-1 pl-2 text-sm focus:outline-0"
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
          priority
          width={200}
          height={300}
        />
      </div>
    </div>
  );
}
