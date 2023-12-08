"use client";

import "@/app/globals.css";

import { MeNavBar } from "./navbar";

import { Providers } from "@/components/providers/provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <TooltipProvider>
        <div className="relative flex min-h-screen flex-col">
          {/* SITE HEADER */}
          <MeNavBar />

          <div className="flex-1">{children}</div>
          {/* SITE FOOTER */}
          <Toaster />
        </div>
      </TooltipProvider>
    </Providers>
  );
}
