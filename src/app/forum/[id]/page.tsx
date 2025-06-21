import { Button } from "@/components/ui/button";
import { RiChatNewFill } from "@remixicon/react";
import Image from "next/image";

export default async function ForumPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 px-4">
      <div className="basis-full flex-col flex gap-4">
        <div>
          <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h2>
          <p className="text-cmono-50 text-xs">
            Post by username on January 16, 2022
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          quis vitae aspernatur, nam deleniti distinctio incidunt fugiat velit
          maiores animi nostrum necessitatibus quasi eveniet architecto
          consequuntur atque commodi voluptas saepe. {id}
        </p>
        <div className="flex gap-2 text-xs font-bold text-cmono-75">
          {["lorem", "ipsum"].map((tag, id) => (
            <span key={id}>#{tag}</span>
          ))}
        </div>
        <div className="">
          <p className="w-full border-y-2 px-2 border-cmono-50 text-cmono-75">
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
                <div className="basis-full border-l-4 border-cmono-50 pl-2">
                  <p>
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
              className="border-l-4 pl-2 py-1 border-cpurple focus:border-cyellow focus:outline-0 text-cmono-75 basis-full focus:bg-cmono-25 placeholder:text-cmono-50"
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
