import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { LoginFormData } from "@/lib/types/login/form-schema";
import { toast } from "@/components/ui/use-toast";
import { backendRoutes, frontendRoutes } from "@/config";
import { backendErrorHandle } from "@/lib/backend-error-handle";

export interface LoginResponse {
  userMsg: string;
  sessionToken: string;
}

export async function submitLoginData(
  data: LoginFormData,
  router: AppRouterInstance
) {
  try {
    const response = await axios.post(backendRoutes.user.login, data, {
      withCredentials: true,
    });
    const responseData = response.data as LoginResponse;
    sessionStorage.setItem("sessionToken", responseData.sessionToken);

    toast({
      title: "Success!",
      description: responseData.userMsg,
      variant: "success",
    });
    router.push(frontendRoutes.me.dashboard);
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}
