import axios, { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { LoginFormData } from "@/types/login/form-schema";
import { toast } from "@/components/ui/use-toast";
import { backendRoutes, frontendRoutes } from "@/config";

export interface SubmitLoginDataErrorResponse {
  userError?: string;
}

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

    const data = (error as AxiosError).response
      ?.data as SubmitLoginDataErrorResponse;

    toast({
      title: "Error",
      description: data.userError,
      variant: "destructive",
    });
  }
}
