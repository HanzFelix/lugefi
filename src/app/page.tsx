import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { RiNewspaperFill } from "@remixicon/react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="mx-auto w-full max-w-sm px-4">
      {!session ? (
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/forum" });
          }}
          className="text-center"
        >
          <h2 className="text-2xl">Welcome to Lugefi</h2>
          <p className="mb-4">Please sign in to participate</p>
          <Button type="submit">Sign in with Google</Button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="text-center"
        >
          <h2 className="mb-4 text-2xl">
            Welcome, {session.user?.name || session.user?.email}
          </h2>
          <button
            type="submit"
            className="mt-4 inline-block rounded border p-2"
          >
            Sign Out
          </button>
        </form>
      )}
      {session && (
        <>
          <p className="border-cmono-50 text-cmono-50 mt-8 mb-4 w-full border-y px-2">
            Explore
          </p>
          <Link href={"/forum"} className="hover:bg-cmono-25 group flex w-full">
            <span className="group-hover:text-cyellow group-active:text-cblue group-active:border-cblue border-cblue group-hover:border-cyellow my-2 basis-full border-l-2 px-1.5">
              Proceed to forum
            </span>
            <div className="text-cmono-50 group-active:text-cblue group-active:bg-cmono-25 group-hover:text-cyellow p-2">
              <RiNewspaperFill />
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
