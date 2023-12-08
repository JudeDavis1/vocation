"use client";

import * as React from "react";

import StoreProvider from "./store-provider";
import { NextUIProviders } from "./next-ui-providers";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider>
      <NextUIProviders
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextUIProviders>
    </StoreProvider>
  );
}
