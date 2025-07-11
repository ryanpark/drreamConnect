import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import Logo from "@/components/ui/Logo";
import type { Viewport } from 'next'

import HeaderAuth from "@/components/header-auth";
import { Analytics } from '@vercel/analytics/next';
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";

import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Image from "next/image";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://localhost:3000";


export const viewport: Viewport = {
  themeColor: '#ffbb00',
  maximumScale: 1,
}
 

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DreamConnect – Explore, Share, and Understand Your Dreams",
  description:
    "Discover the hidden meanings behind your dreams with DreamConnect. Keep a private dream journal, connect with a like-minded community, and gain AI-driven insights—all in a secure, privacy-focused environment. Start your dream journey today!",
};

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi", // Define CSS variable
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.className} ${satoshi.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-dream-gradient text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-1 items-center sm:gap-20">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-6xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"} className="flex">
                      <Logo />
                    </Link>

                    <div className="flex items-center gap-2">
                      {/* <DeployButton /> */}
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-6xl sm:p-5 mt-10 sm:mt-0">
                {children}
                <Analytics />
              </div>

              <div className="mb-12 mt-12 text-center flex justify-center">
                <Image
                  src="/dot.svg"
                  width={44}
                  height={44}
                  alt="Picture of the author"
                />
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                DreamConnects - Unlock the Hidden World of Your Dreams
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
