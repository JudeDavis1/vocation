"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { frontendRoutes } from "@/config";

export function Reroute() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(frontendRoutes.me.dashboard);
  }, [router]);

  return <>Redirecting</>;
}
