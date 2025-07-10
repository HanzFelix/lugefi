import type { Metadata } from "next";
import { Aldrich, Chivo } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { profile, SelectProfile } from "@/db/schema/profile";
import { db } from "@/db/database";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

const aldrich = Aldrich({
  variable: "--font-aldrich",
  subsets: ["latin"],
  weight: "400",
});

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lugefi",
  description: "What works, works",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let retrievedProfile: SelectProfile | undefined = undefined;
  const session = await auth();
  if (session?.user?.id) {
    [retrievedProfile] = await db
      .select()
      .from(profile)
      .where(eq(profile.user_id, session.user.id));
  }
  return (
    <SessionProvider>
      <html lang="en" className="relative h-full">
        <body
          className={`${aldrich.variable} ${chivo.variable} relative h-auto min-h-full overflow-y-scroll pt-16 pb-32 antialiased **:transition-colors **:duration-200`}
        >
          {children}
          <Navbar profile={retrievedProfile} />
        </body>
      </html>
    </SessionProvider>
  );
}
