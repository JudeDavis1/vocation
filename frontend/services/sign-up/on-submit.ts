import axios, { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { backendRoutes, frontendRoutes } from "@/config";
import { toast } from "@/components/ui/use-toast";
import { SignUpFormData } from "@/types/sign-up/form-schema";

export interface SubmitSignUpDataErrorResponse {
  userError: string;
}

export async function submitSignUpData(
  data: SignUpFormData,
  router: AppRouterInstance
) {
  try {
    await axios.post(backendRoutes.user.create, data);

    toast({
      title: "Created!",
      description: "User successfully created.",
      variant: "success",
    });
    router.push(frontendRoutes.login);
  } catch (error) {
    if (!(error instanceof AxiosError)) {
      toast({ title: "Unknown Error", description: "Please try again later" });
      return;
    }

    const data = (error as AxiosError).response
      ?.data as SubmitSignUpDataErrorResponse;

    toast({
      title: "Error",
      description: data.userError,
      variant: "destructive",
    });
  }
}
