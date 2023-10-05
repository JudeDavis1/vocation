import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export default function Page() {
  return <>hi</>;
}

Page.getLayout = function getLayout(page: React.JSX.Element) {
  return (
    <html lang="en">
      <head />
      <body className={cn("min-h-screen bg-background font-sans p-4")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            {/* SITE HEADER */}
            <div className="flex-1">{page}</div>
            {/* SITE FOOTER */}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};
