import axios, { AxiosError } from "axios";

import { backendRoutes, BackendErrorResponse } from "@/config";
import { CreateProjectInput } from "@/lib/types/create-project/form-schema";
import { toast } from "@/components/ui/use-toast";
import { backendErrorHandle } from "@/lib/utils/backend-error-handle";

export async function submitProjectData(
  data: CreateProjectInput,
  userId: string
) {
  const sessionToken = localStorage.getItem("sessionToken");
  try {
    await axios.post(
      backendRoutes.project.create,
      { ...data, userId },
      {
        withCredentials: true,
        headers: { Authorization: sessionToken },
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
