import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { backendRoutes, frontendRoutes } from "@/config";
import { toast } from "@/components/ui/use-toast";
import { SignUpFormData } from "@/lib/types/sign-up/form-schema";
import { backendErrorHandle } from "@/lib/utils/backend-error-handle";

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
    backendErrorHandle(error);
  }
}
