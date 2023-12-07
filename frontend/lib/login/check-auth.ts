import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { getUserData } from "../fetch-user";

import { BackendErrorResponse, frontendRoutes } from "@/config";

export async function checkAuth(router: AppRouterInstance) {
  try {
    await getUserData();
    router.push(frontendRoutes.me.dashboard);
  } catch (error: any) {
    const errResponse = error.response?.data as BackendErrorResponse;
    console.log(errResponse);
  }
}
