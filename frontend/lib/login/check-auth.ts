import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { getUserData } from "../fetch-user";

import { frontendRoutes } from "@/config";
import { toast } from "@/components/ui/use-toast";

export async function checkAuth(router: AppRouterInstance) {
  try {
    await getUserData();
    router.push(frontendRoutes.me.dashboard);
  } catch (error) {
    document.write(error as string);
  }
}
