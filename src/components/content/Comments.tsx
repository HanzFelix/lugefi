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
            className="w-8 self-start py-1"
            width={36}
            height={36}
            alt=""
          />
          <div className="border-cmono-50 flex basis-full flex-col justify-end border-l-2 pl-2">
            <p className="text-sm">{c.comment.text}</p>
            <p className="text-cmono-50 text-xs">{`${c.profile?.username}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
