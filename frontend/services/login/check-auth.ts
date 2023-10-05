import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { backendRoutes, frontendRoutes } from "@/config";

export async function checkAuth(router: AppRouterInstance) {
  try {
    await axios.get(backendRoutes.user.get, { withCredentials: true });
    router.push(frontendRoutes.me.dashboard);
  } catch (error) {}
}
