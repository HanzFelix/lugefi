import { auth, signIn, signOut } from "@/auth";
import {
  RiGoogleFill,
  RiLogoutBoxLine,
  RiNewspaperFill,
} from "@remixicon/react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="mx-auto flex min-h-full w-full max-w-sm flex-col justify-center px-4">
      <h2>Welcome to Lugefi</h2>
      <p className="text-cmono-50 mb-2 text-sm">
        {session ? `Signed in` : "Please sign in to participate"}
      </p>
      <section>
        {/*<p className="border-cmono-50 text-cmono-50 mb-2 w-full border-y px-2">
          Explore
        </p>*/}
        {!session && (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/forum" });
            }}
          >
            <button
              type="submit"
              className="hover:bg-cmono-25 group flex w-full hover:cursor-pointer"
            >
              <span className="group-hover:text-cyellow group-active:text-cblue group-active:border-cblue border-cblue group-hover:border-cyellow my-2 basis-full border-l-2 px-1.5 text-start">
                Sign in with Google
              </span>
              <div className="text-cmono-50 group-active:text-cblue group-active:bg-cmono-25 group-hover:text-cyellow p-2">
                <RiGoogleFill />
              </div>
            </button>
          </form>
        )}
        <Link href={"/forum"} className="hover:bg-cmono-25 group flex w-full">
          <span className="group-hover:text-cyellow group-active:text-cblue group-active:border-cblue border-cblue group-hover:border-cyellow my-2 basis-full border-l-2 px-1.5">
            Proceed to forum
          </span>
          <div className="text-cmono-50 group-active:text-cblue group-active:bg-cmono-25 group-hover:text-cyellow p-2">
            <RiNewspaperFill />
          </div>
        </Link>
        {session && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="hover:bg-cmono-25 group flex w-full hover:cursor-pointer"
            >
              <span className="group-hover:text-cyellow group-active:text-cblue group-active:border-cblue border-cblue group-hover:border-cyellow my-2 basis-full border-l-2 px-1.5 text-start">
                Sign out
              </span>
              <div className="text-cmono-50 group-active:text-cblue group-active:bg-cmono-25 group-hover:text-cyellow p-2">
                <RiLogoutBoxLine />
              </div>
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
