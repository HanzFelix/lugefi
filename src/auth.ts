/// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/database";
import { account, session, user as userTable } from "@/db/schema/session";
import { profile } from "./db/schema/profile";
import { eq, like } from "drizzle-orm";

/*declare module "next-auth" {
  interface Session {
    user: {
      profile: SelectProfile;
    } & DefaultSession["user"];
  }
}*/

// *DO NOT* create a `Pool` here, outside the request handler.

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  return {
    adapter: DrizzleAdapter(db, {
      usersTable: userTable,
      accountsTable: account,
      sessionsTable: session,
    }),
    session: { strategy: "database" },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      /*GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),*/
    ],
    callbacks: {
      async signIn({ user }) {
        if (!user.email) return false;
        const [existingUser] = await db
          .select({ id: userTable.id, profile: profile })
          .from(userTable)
          .leftJoin(profile, eq(profile.user_id, userTable.id))
          .where(eq(userTable.email, user.email));

        if (!existingUser.profile) {
          const uniqueUsername = await generateUniqueUsername(
            user.name || "anonymous",
          );
          await db.insert(profile).values({
            username: uniqueUsername,
            image_url: process.env.LUGEFI_DEFAULT_AVATAR_URL || "",
            user_id: existingUser.id,
          });
        }
        return true;
      },
    },
  };
});

async function generateUniqueUsername(baseUsername: string) {
  const existingUsers = await db
    .select({ username: profile.username })
    .from(profile)
    .where(like(profile.username, `${baseUsername}%`));

  const usernames = existingUsers.map((user) => user.username);

  if (!usernames.includes(baseUsername)) {
    return baseUsername;
  }

  const suffixNumbers = usernames
    .map((name) => {
      const match = name.match(new RegExp(`^${baseUsername}(\\d+)$`));
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((num) => num !== null);

  const nextSuffix =
    suffixNumbers.length > 0 ? Math.max(...suffixNumbers) + 1 : 1;

  return `${baseUsername}${nextSuffix}`;
}
