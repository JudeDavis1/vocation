import axios, { AxiosError } from "axios";

import { backendRoutes, BackendErrorResponse } from "@/config";
import { CreateProjectInput } from "@/types/create-project/form-schema";
import { toast } from "@/components/ui/use-toast";

export async function submitProjectData(data: CreateProjectInput) {
  try {
    await axios.post(backendRoutes.project.create, data);
    toast({
      title: "Created!",
      description: "Successfully created project",
    });
  } catch (error) {
    if (!(error instanceof AxiosError)) {
      toast({ title: "Unknown Error", description: "Please try again later" });
      return;
    }

    const errResponse = error.response?.data as BackendErrorResponse;
    toast({
      title: "Error",
      description: errResponse.userError,
    });
  }
}
