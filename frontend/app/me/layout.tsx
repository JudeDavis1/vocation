"use client";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme/provider";
import { RootLayout } from "@/components/theme/root-layout";
import { Toaster } from "@/components/ui/toaster";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen flex-col">
        {/* SITE HEADER */}

        <div className="flex-1">{children}</div>
        {/* SITE FOOTER */}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
