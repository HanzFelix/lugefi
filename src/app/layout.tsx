import type { Metadata } from "next";
import { Aldrich, Chivo } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { getSessionProfile } from "./actions/profile";

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
  title: { template: "%s | Lugefi", default: "Lugefi" },
  description: "What works, works",
  metadataBase: new URL("https://lugefi.vercel.app/"),
  openGraph: {
    url: "https://lugefi.vercel.app/",
    siteName: "Lugefi",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionProfile = await getSessionProfile();

  return (
    <SessionProvider>
      <html lang="en" className="relative h-full">
        <body
          className={`${aldrich.variable} ${chivo.variable} relative h-full min-h-full overflow-y-scroll pt-16 antialiased **:transition-colors **:duration-200 [&>div:last-of-type]:pb-32`}
        >
          {children}
          <Navbar profile={sessionProfile} />
        </body>
      </html>
    </SessionProvider>
  );
}
