import { ChartLine } from "@/components/ChartLine";
import { ChartRadar } from "@/components/ChartRadar";
import Posts from "@/components/content/Posts";
import PostsSkeleton from "@/components/content/PostsSkeleton";
import { Button } from "@/components/ui/button";
import { db } from "@/db/database";
import { profile } from "@/db/schema/profile";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Suspense } from "react";

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
  const [p] = await getProfile(id);
  return (
    <>
      <div className="container mx-auto flex flex-col gap-8 px-4 md:flex-row md:gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex">
            <div className="flex-1">
              <h2 className="text-cmono-100">{p.username}</h2>
              <p className="mb-4 text-sm">
                Status: <span className="text-cblue">Available</span>
              </p>
              <Button>Contact</Button>
            </div>
            <div className="basis-24">
              <Image
                src={p.image_url}
                className="border-cmono-75 w-full border-2"
                alt=""
                width={96}
                height={96}
              />
            </div>
          </div>
          <div>
            <p className="text-sm">This user has not updated their bio yet.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="flex flex-row items-end gap-2 *:w-full md:flex-col">
            <div>
              <p className="text-sm">Metrics </p>
              <h1 className="text-cmono-100">254</h1>
            </div>
            <div>
              <p className="text-sm">Metrics (in %)</p>
              <h1 className="text-cmono-100">40%</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 flex flex-col-reverse gap-8 px-4 md:flex-row md:gap-4">
        <div className="flex flex-1 flex-col gap-4">
          {/*
          <p className="border-cmono-50 text-cmono-50 w-full border-y px-2">
            Badge Showcase
          </p>
          <p className="text-cmono-50 text-sm mb-8">No badges to display</p>
          */}
          <p className="border-cmono-50 text-cmono-50 w-full border-y px-2">
            Recent Posts
          </p>
          <Suspense fallback={<PostsSkeleton />}>
            <Posts params={{ u: id }} />
          </Suspense>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4">
          <p className="text-sm">Performance Evaluation</p>
          <div className="flex flex-row items-end gap-2 *:w-full md:flex-col">
            <ChartRadar />
            <ChartLine />
          </div>
        </div>
      </div>
    </>
  );
}
