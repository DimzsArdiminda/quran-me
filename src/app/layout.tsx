import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/ModeToggle";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quran ME",
  description: "Quran ME is a web application that provides the Quran API for Muslims to read the Quran.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Quran | Dashboard</title>

        {/* Meta SEO */}
        <meta
          name="title"
          content="Quran Me | Dashboard"
        />


        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png"/>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="p-5 flex justify-end">
            <ModeToggle/>
          </div>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
