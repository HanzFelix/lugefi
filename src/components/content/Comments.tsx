import { db } from "@/db/database";
import { comment } from "@/db/schema/forum";
import { profile } from "@/db/schema/profile";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function Comments({ postId }: { postId: number }) {
  const comments = await db
    .select()
    .from(comment)
    .leftJoin(profile, eq(comment.posted_by, profile.id))
    .where(eq(comment.posted_at, postId));

  return (
    <div className="mt-4 flex flex-col gap-4 not-empty:mb-4">
      {comments.map((c, id) => (
        <div className="flex w-full gap-2" key={id}>
          <Image
            src={`${c.profile ? c.profile.image_url : "https://placehold.co/36x36"}`}
            className="mt-1 w-8 self-start"
            width={36}
            height={36}
            alt=""
          />
          <div className="py-1">
            <div className="bg-cmono-50 h-full min-h-8 w-0.5"></div>
          </div>
          <div className="flex min-h-8 flex-1 flex-col justify-center">
            <p className="text-sm">{c.comment.text}</p>
            <p className="text-cmono-50 text-xs">{`${c.profile?.username}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
