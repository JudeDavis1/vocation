import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { getUserData } from "../dashboard/fetch-user";

import { frontendRoutes } from "@/config";

export async function checkAuth(router: AppRouterInstance) {
  try {
    await getUserData();
    router.push(frontendRoutes.me.dashboard);
  } catch (error) {
    router.push(frontendRoutes.login);
  }
}
