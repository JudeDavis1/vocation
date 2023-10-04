import { z } from "zod";

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email("Invalid email").max(52, "Email too long"),
    password: z
      .string()
      .min(8, "Password must be a minimum of 8 characters")
      .max(53, "Maximum 53 characters!"),
    retypePassword: z.string(),
  })
  .refine((data) => data.password == data.retypePassword, {
    message: "Passwords must match!",
    path: ["retypePassword"],
  });
export type SignUpFormData = z.infer<typeof signUpFormSchema>;
