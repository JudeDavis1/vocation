/**
 * Needed to handle the error boilerplate with toasting errors.
 * The userError message is sent by the backend.
 */

import { AxiosError } from "axios";

import { toast } from "@/components/ui/use-toast";
import { BackendErrorResponse } from "@/config";

export function backendErrorHandle(error: unknown) {
  if (!(error instanceof AxiosError)) {
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
