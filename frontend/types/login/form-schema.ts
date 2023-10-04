import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email").max(52, "Email too long"),
  password: z
    .string()
    .min(8, "Password must be a minimum of 8 characters")
    .max(53, "Maximum 53 characters!"),
});
export type LoginFormData = z.infer<typeof loginFormSchema>;
