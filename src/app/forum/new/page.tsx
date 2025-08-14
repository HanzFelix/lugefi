import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostForm from "./PostForm";

export default async function NewForumPost() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  return (
    <div className="container mx-auto mt-8 flex flex-col gap-8 px-4 md:flex-row md:gap-4">
      <PostForm cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} />
    </div>
  );
}
