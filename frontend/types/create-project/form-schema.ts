import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1).max(60, "Maximum 60 characters."),
  description: z.string().max(200, "Maximum 200 characters."),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
