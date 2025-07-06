import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <div className="mx-auto w-full max-w-md text-center">
      {!session ? (
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/forum" });
          }}
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
    </div>
  );
}
