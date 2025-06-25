import { ChartLine } from "@/components/ChartLine";
import { ChartRadar } from "@/components/ChartRadar";
import { Button } from "@/components/ui/button";
import { db } from "@/db/database";
import { profile } from "@/db/schema/profile";
import { eq } from "drizzle-orm";
import Image from "next/image";

async function getProfile(id: number) {
  return await db
    .select({
      username: profile.username,
      image_url: profile.image_url,
    })
    .from(profile)
    .where(eq(profile.id, id));
}

export default async function Profile({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const p = await getProfile(id);
  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row gap-8 md:gap-4 px-4">
        <div className="basis-full flex-col flex gap-4">
          <div className="flex">
            <div className="basis-full">
              <h2 className="text-cmono-100">{p[0].username}</h2>
              <p className="text-sm mb-4">
                Status: <span className="text-cblue">Available</span>
              </p>
              <Button>Contact</Button>
            </div>
            <div className="basis-32">
              <Image
                src={p[0].image_url}
                className="w-full border-2 border-cmono-75"
                alt=""
                width={96}
                height={96}
              />
            </div>
          </div>
          <div>
            <p className=" text-sm">
              It takes a few steps to do this and that. Also in Tumblr via
              @terminateduser
            </p>
          </div>
        </div>
        <div className="min-w-full md:min-w-1/3 lg:min-w-1/4">
          <div className="flex items-end flex-row md:flex-col gap-2 *:w-full">
            <div>
              <p className="text-sm">Accomplished missions</p>
              <h1 className="text-cmono-100">254</h1>
            </div>
            <div>
              <p className="text-sm">Accomplishment rate</p>
              <h1 className="text-cmono-100">40%</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-4 px-4 mt-8">
        <div className="basis-full flex-col flex gap-4">
          <p className="w-full border-y px-2 border-cmono-50 text-cmono-50">
            Badge Showcase
          </p>
          <p className="text-sm text-cmono-50">No badges to display</p>
          <p className="w-full border-y px-2 border-cmono-50 mt-8 text-cmono-50">
            Recent Posts
          </p>
          <p className="text-sm text-cmono-50">This user has not posted yet</p>
        </div>
        <div className="min-w-full md:min-w-1/3 lg:min-w-1/4">
          <p className="text-sm">Performance Evaluation</p>
          <div className="flex items-end flex-row md:flex-col gap-2 *:w-full">
            <ChartRadar />
            <ChartLine />
          </div>
        </div>
      </div>
    </>
  );
}
