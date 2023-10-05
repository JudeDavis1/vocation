"use client";

import { useRouter } from "next/navigation";

import { frontendRoutes } from "@/config";

export default function Page() {
  const router = useRouter();
  router.replace(frontendRoutes.me.dashboard);
  return <>Redirecting</>;
}
