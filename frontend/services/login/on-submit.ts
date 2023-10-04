import axios, { AxiosError } from "axios";

import { LoginFormData } from "@/types/login/form-schema";
import { toast } from "@/components/ui/use-toast";
import { backendRoutes } from "@/config";

export interface SubmitLoginDataErrorResponse {
  userError?: string;
}

export async function submitLoginData(data: LoginFormData) {
  try {
    const response = await axios.post(backendRoutes.user.login, data);

    toast({
      title: "Success!",
      description: response.data.userMsg,
      variant: "success",
    });
  } catch (error) {
    if (!(error instanceof AxiosError)) {
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
