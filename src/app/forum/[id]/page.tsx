import { Button } from "@/components/ui/button";
import { db } from "@/db/database";
import { post } from "@/db/schema/forum";
import { profile } from "@/db/schema/profile";
import { RiChatNewFill } from "@remixicon/react";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

async function getPost(id: number) {
  return await db
    .select({
      id: post.id,
      title: post.title,
      description: post.description,
      posted_by_id: profile.id,
      posted_by_name: profile.username,
    })
    .from(post)
    .leftJoin(profile, eq(post.posted_by, profile.id))
    .where(eq(post.id, id));
}

export default async function ForumPost({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const p = await getPost(id);
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 px-4">
      <div className="basis-full flex-col flex gap-4">
        <div>
          <h2 className="text-cmono-100">{p[0].title}</h2>
          <p className="text-cmono-50 text-xs">
            Post by{" "}
            <Link
              href={`/profile/${p[0].posted_by_id}`}
              className="hover:text-cyellow"
            >
              {p[0].posted_by_name}
            </Link>{" "}
            on January 16, 2022
          </p>
        </div>
        <p className="text-sm">{p[0].description}</p>
        <div className="flex gap-2 text-xs font-bold text-cmono-75">
          {["lorem", "ipsum"].map((tag, id) => (
            <span key={id}>#{tag}</span>
          ))}
        </div>
        <div>
          <p className="w-full border-y px-2 border-cmono-50 text-cmono-50">
            Comments
          </p>
          <div className="flex flex-col gap-4 py-4">
            {[1, 2].map((i) => (
              <div className="flex gap-2 w-full items-start" key={i}>
                <Image
                  src="https://placehold.co/36x36"
                  className="pt-1.5"
                  width={36}
                  height={36}
                  alt=""
                />
                <div className="basis-full border-l-2 border-cmono-50 pl-2">
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Repellendus quis vitae aspernatur, nam deleniti distinctio
                    incidunt fugiat velit maiores animi nostrum necessitatibus
                    quasi eveniet architecto consequuntur atque commodi voluptas
                    saepe.
                  </p>
                  <p className="text-xs text-cmono-50">Proxy244</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-start">
            <div className="w-9 pt-1.5">
              <RiChatNewFill size={24} className="text-cmono-50 ml-auto" />
            </div>
            <textarea
              placeholder="Add a comment..."
              className="border-l-2 pl-2 py-1 border-cpurple text-sm focus:border-cyellow focus:outline-0 text-cmono-75 basis-full focus:bg-cmono-25 placeholder:text-cmono-50"
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button>Post</Button>
          </div>
        </div>
      </div>
      <div className="min-w-full md:min-w-1/3 lg:min-w-1/4">
        <Image
          src="https://placehold.co/200x300/3d3340/gray"
          className="w-full"
          alt=""
          width={200}
          height={300}
        />
      </div>
    </div>
  );
}
