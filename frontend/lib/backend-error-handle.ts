/**
 * Needed to handle the error boilerplate with toasting errors.
 * The userError message is sent by the backend.
 */

import { AxiosError } from "axios";
import { z } from "zod";

export const backendErrorSchema = z.object({
  userError: z.string(),
});

export function backendErrorHandle(error: unknown): string {
  if (!(error instanceof AxiosError)) {
    return "Unknown error, please try again later or report if this continues";
  }

  const matchResult = backendErrorSchema.safeParse(error.response?.data);
  if (!matchResult.success) {
    return "Invalid response from server, please try again later or report if this continues.";
  }

  return matchResult.data.userError;
}
