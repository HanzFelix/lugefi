import { db } from "@/db/database";
import { comment } from "@/db/schema/forum";
import { profile } from "@/db/schema/profile";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RiMore2Fill } from "@remixicon/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Comments({
  postId,
  currentUser,
}: {
  postId: number;
  currentUser?: string;
}) {
  const comments = await db
    .select({
      comment: comment,
      profile: profile,
      ...(currentUser
        ? { is_author: sql<boolean>`(${profile.user_id} = ${currentUser})` }
        : {}),
    })
    .from(comment)
    .leftJoin(profile, eq(comment.posted_by, profile.id))
    .where(eq(comment.posted_at, postId));

  return (
    <div className="mt-4 flex flex-col gap-4 not-empty:mb-4">
      {comments.map((c, id) => (
        <div className="group flex w-full gap-2" key={id}>
          <Image
            src={`${c.profile ? c.profile.image_url : "https://placehold.co/36x36"}`}
            className="mt-1 w-8 self-start"
            width={36}
            height={36}
            alt=""
          />
          <div className="py-1">
            <div className="border-cmono-50 h-full min-h-8 border-l-2"></div>
          </div>
          <div className="flex min-h-8 flex-1 flex-col justify-center">
            <p className="text-sm">{c.comment.text}</p>
            <Link
              href={`/profile/${c.profile?.id}`}
              className="hover:text-cyellow text-cmono-50 self-start text-xs"
            >
              {c.profile?.username}
            </Link>
          </div>
          {currentUser && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-cmono-50 hover:text-cyellow data-[state=open]:bg-cmono-25 cursor-pointer self-start py-1 not-pointer-coarse:opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100">
                  <RiMore2Fill />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-0" sideOffset={0}>
                {c.is_author ? (
                  <div className="*:hover:text-cyellow text-cmono-75 *:hover:border-cyellow flex w-full max-w-40 flex-col text-sm *:border-x-2 *:border-transparent *:px-2 *:py-1">
                    <button
                      onClick={async () => {
                        "use server";
                        await db
                          .delete(comment)
                          .where(eq(comment.id, c.comment.id));
                        redirect(`/forum/${postId}`);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <p className="text-cmono-50 px-2 py-1 text-sm">(No action)</p>
                )}
              </PopoverContent>
            </Popover>
          )}
        </div>
      ))}
    </div>
  );
}
