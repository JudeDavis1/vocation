import axios, { AxiosError } from "axios";

import { backendRoutes, BackendErrorResponse } from "@/config";
import { CreateProjectInput } from "@/types/create-project/form-schema";
import { toast } from "@/components/ui/use-toast";
import { backendErrorHandle } from "@/lib/utils/backend-error-handle";

export async function submitProjectData(
  data: CreateProjectInput,
  userId: string
) {
  try {
    await axios.post(
      backendRoutes.project.create,
      { ...data, userId },
      {
        withCredentials: true,
      }
    );
    toast({
      title: "Created!",
      description: "Successfully created project",
      variant: "success",
    });
  } catch (error) {
    backendErrorHandle(error);
  }
}
