import "./globals.css";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers/provider";

export const metadata: Metadata = {
  title: "Vocation",
  description: "",

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function ({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className={cn("min-h-screen bg-background font-sans p-1")}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            {/* SITE HEADER */}
            <div className="flex-1">{children}</div>
            {/* SITE FOOTER */}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
