import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/db/database";
import { post } from "@/db/schema/forum";
import { profile } from "@/db/schema/profile";
import { RiImageAddFill, RiQuoteText, RiText } from "@remixicon/react";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function NewForumPost() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  async function createPost(formData: FormData) {
    "use server";

    if (!session?.user?.id) throw new Error("no user");

    const profileId = db.$with("existing_profile").as(
      db
        .select({
          id: profile.id,
        })
        .from(profile)
        .where(eq(profile.user_id, session.user.id))
        .limit(1),
    );

    const [{ insertedId: postId }] = await db
      .with(profileId)
      .insert(post)
      .values({
        title: formData.get("title") as string,
        image_url: process.env.LUGEFI_DEFAULT_POST_IMAGE_URL || "",
        description: formData.get("description") as string,
        posted_by: sql`(select id from existing_profile)`,
      })
      .returning({ insertedId: post.id });

    if (postId) redirect(`/forum/${postId}`);
    else throw new Error("Failed to upload post");
  }
  return (
    <div className="container mx-auto mt-8 flex flex-col gap-8 px-4 md:flex-row md:gap-4">
      <form className="flex flex-1 flex-col gap-4" action={createPost}>
        <h2>New post</h2>
        <div className="flex flex-row-reverse items-start gap-2">
          <input
            id="title"
            name="title"
            required
            placeholder="Enter title..."
            className="border-cpurple peer focus:border-cyellow text-cmono-75 user-invalid:border-cred focus:bg-cmono-25 placeholder:text-cmono-50 flex-1 border-l-2 py-1 pl-2 focus:outline-0"
          />
          <label
            className="peer-user-invalid:text-cred text-cmono-50 mt-1"
            htmlFor="title"
          >
            <RiText size={24} className="ml-auto w-8" />
          </label>
        </div>
        <div className="flex flex-row-reverse items-start gap-2">
          <textarea
            id="description"
            name="description"
            required
            placeholder="Enter body text..."
            className="border-cpurple peer focus:border-cyellow user-invalid:border-cred text-cmono-75 focus:bg-cmono-25 placeholder:text-cmono-50 flex-1 border-l-2 py-1 pl-2 text-sm focus:outline-0"
          />
          <label
            htmlFor="description"
            className="peer-user-invalid:text-cred text-cmono-50 mt-1"
          >
            <RiQuoteText size={24} className="ml-auto w-8" />
          </label>
        </div>
        <div className="flex items-start gap-2 md:hidden">
          <div className="mt-1">
            <RiImageAddFill size={24} className="text-cmono-50 ml-auto w-8" />
          </div>
          <input
            name="image"
            disabled
            placeholder="Image attachment is unavailable for now"
            className="border-cpurple focus:border-cyellow text-cmono-75 focus:bg-cmono-25 placeholder:text-cmono-50 disabled:border-cmono-50 flex-1 border-l-2 py-1.5 pl-2 text-sm focus:outline-0"
          />
        </div>
        <div className="mt-2 flex justify-end">
          <Button>Post</Button>
        </div>
      </form>
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="hidden md:block">
          <p>Attach image</p>
          <p className="text-cmono-50 text-sm">
            Image attachment is unavailable for now
          </p>
        </div>
      </div>
    </div>
  );
}
