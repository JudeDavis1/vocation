/**
 * Needed to handle the error boilerplate with toasting errors.
 * The userError message is sent by the backend.
 */

import { AxiosError } from "axios";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";

export const backendErrorSchema = z.object({
  userError: z.string(),
});

export function backendErrorHandle(error: unknown) {
  if (!(error instanceof AxiosError)) {
    toast({
      title: "Unknown Error",
      description: "Please try again later",
      variant: "destructive",
    });
    return;
  }

  const matchResult = backendErrorSchema.safeParse(error.response?.data);
  if (!matchResult.success) {
    toast({
      title: "Error",
      description: "Unknown error.",
      variant: "destructive",
    });
    return;
  }

  toast({
    title: "Error",
    description: matchResult.data.userError,
    variant: "destructive",
  });
}
