"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  RiArrowLeftDoubleLine,
  RiCalendarTodoLine,
  RiHome2Fill,
  RiHome2Line,
  RiLogoutBoxLine,
  RiNewspaperFill,
  RiNewspaperLine,
} from "@remixicon/react";
import { signOut, signIn } from "next-auth/react";
import Image from "next/image";
import { SelectProfile } from "@/db/schema/profile";
export default function Navbar({ profile }: { profile?: SelectProfile }) {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 w-full text-sm">
      <div className="mx-auto flex justify-end md:container md:px-4">
        <div className="bg-cmono-25 flex w-full flex-col items-stretch gap-4 p-3 pb-2 md:w-1/3 lg:w-1/4">
          <div className="flex justify-between">
            <div>
              <RiArrowLeftDoubleLine className="fill-cmono-50" />
            </div>
            <div className="flex basis-full justify-center gap-4">
              <Link href={"/"}>
                {pathname == "/" ? (
                  <RiHome2Fill className="text-cmono-100" />
                ) : (
                  <RiHome2Line />
                )}
              </Link>
              <Link href={"/forum"}>
                {pathname == "/forum" ? (
                  <RiNewspaperFill className="text-cmono-100" />
                ) : (
                  <RiNewspaperLine />
                )}
              </Link>
              <RiCalendarTodoLine className="text-cmono-50" />
            </div>
            <form>
              <button
                onClick={() => signOut({ redirectTo: "/" })}
                className="disabled:text-cmono-25 not-disabled:cursor-pointer"
                disabled={profile == undefined}
              >
                <RiLogoutBoxLine />
              </button>
            </form>
          </div>
          {profile ? (
            <div className="flex items-center">
              <div className="flex-1">
                <p>Welcome back,</p>
                <p className="text-cblue">{profile.username}</p>
              </div>
              <Link href={`/profile/${profile.id}`}>
                {
                  <Image
                    width={36}
                    height={36}
                    alt="user avatar"
                    className="aspect-square w-9 object-cover"
                    src={profile.image_url}
                  />
                }
              </Link>
            </div>
          ) : (
            <div>
              <p>To participate,</p>
              <button
                onClick={() => signIn("google", { redirectTo: "/" })}
                className="hover:text-cyellow"
              >
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
