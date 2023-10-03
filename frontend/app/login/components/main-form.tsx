"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemeForm } from "@/components/theme-form";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email").max(52, "Email too long"),
  password: z
    .string()
    .min(8, "Password must be a minimum of 8 characters")
    .max(53, "Maximum 53 characters!"),
});
type FormData = z.infer<typeof formSchema>;

export function MainForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: "Hello",
      description: "Welcome!",
      variant: "success",
    });
  };

  return (
    <ThemeForm
      title="Login"
      description="Welcome back!"
      form={form}
      onSubmit={onSubmit}
      fields={[
        {
          label: "Email",
          name: "email",
          inputProps: { placeholder: "Email", type: "email" },
        },
        {
          label: "Password",
          name: "password",
          inputProps: { placeholder: "Password", type: "password" },
        },
      ]}
    />
  );
}
