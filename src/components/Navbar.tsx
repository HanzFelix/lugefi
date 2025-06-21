"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  RiArrowLeftDoubleLine,
  RiCalendar2Line,
  RiHome2Line,
  RiNewspaperFill,
  RiNewspaperLine,
  RiSettings4Line,
} from "@remixicon/react";
import Image from "next/image";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full">
      {/*
    <div className="container mx-auto flex w-full justify-stretch md:px-4 *:even:bg-cmono-25 *:odd:bg-cmono-50 *:basis-full">
      {[...Array(12)].map((x, i) => (
        <div key={i}>.</div>
      ))}
    </div>*/}
      <div className="container mx-auto flex justify-end md:px-4">
        <div className="p-3 pb-2 flex flex-col items-stretch gap-4 bg-cmono-25 min-w-full md:min-w-1/3 lg:min-w-1/4">
          <div className="flex justify-between">
            <div>
              <RiArrowLeftDoubleLine className="fill-cmono-50" />
            </div>
            <div className="flex basis-full justify-center gap-4">
              <RiHome2Line />
              <Link href={"/forum"}>
                {pathname == "/forum" ? (
                  <RiNewspaperFill />
                ) : (
                  <RiNewspaperLine />
                )}
              </Link>
              <RiCalendar2Line />
            </div>
            <div>
              <RiSettings4Line />
            </div>
          </div>
          <div className="flex">
            <div className="basis-full">
              <p>Welcome back,</p>
              <p className="text-cblue">anon</p>
            </div>
            <Image
              width={36}
              height={36}
              alt="user avatar"
              src="https://placehold.co/36x36"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
