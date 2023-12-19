import axios from "axios";

import { backendRoutes } from "@/config";
import { CreateProjectInput } from "@/lib/types/create-project/form-schema";
import { toast } from "@/components/ui/use-toast";
import { backendErrorHandle } from "@/lib/backend-error-handle";

export async function submitProjectData(
  data: CreateProjectInput,
  userId: string
) {
  const sessionToken = sessionStorage.getItem("sessionToken");
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
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}
