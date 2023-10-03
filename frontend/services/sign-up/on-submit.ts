import axios, { AxiosError } from "axios";

import { backendRoutes } from "@/app/config";
import { toast } from "@/components/ui/use-toast";
import { SignUpFormData } from "@/types/sign-up/form-schema";

export interface SubmitSignUpDataErrorResponse {
  userError: string;
}

export async function submitSignUpData(data: SignUpFormData) {
  try {
    const response = await axios.post(backendRoutes.user.create, data);
    console.log(response);

    toast({
      title: "Created!",
      description: "User successfully created.",
      variant: "success",
    });
  } catch (error: any) {
    const errorCasted = error as AxiosError;
    const data = errorCasted.response?.data as SubmitSignUpDataErrorResponse;

    toast({
      title: "Error",
      description: data.userError,
      variant: "destructive",
    });
  }
}
