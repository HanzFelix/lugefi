import { db } from "@/db/database";
import { post } from "@/db/schema/forum";

export async function GET() {
  return Response.json({
    data: await db
      .select({ id: post.id, title: post.title, description: post.description })
      .from(post)
      .limit(12),
  });
}
