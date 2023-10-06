import axios, { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { LoginFormData } from "@/types/login/form-schema";
import { toast } from "@/components/ui/use-toast";
import { BackendErrorResponse, backendRoutes, frontendRoutes } from "@/config";

export async function submitLoginData(
  data: LoginFormData,
  router: AppRouterInstance
) {
  try {
    const response = await axios.post(backendRoutes.user.login, data, {
      withCredentials: true,
    });

    toast({
      title: "Success!",
      description: response.data.userMsg,
      variant: "success",
    });
    router.push(frontendRoutes.me.dashboard);
  } catch (error) {
    if (!(error instanceof AxiosError)) {
      console.log(error);
      toast({
        title: "Unknown Error",
        description: "Please try again later",
        variant: "destructive",
      });
      return;
    }
    const errResponse = error.response?.data as BackendErrorResponse;

    toast({
      title: "Error",
      description: errResponse.userError,
      variant: "destructive",
    });
  }
}
