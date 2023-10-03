"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemeForm } from "@/components/theme-form";
import { SignUpFormData, signUpFormSchema } from "@/types/sign-up/form-schema";
import { submitSignUpData } from "@/services/sign-up/on-submit";

export function MainForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  return (
    <ThemeForm
      title="Sign Up"
      description="Welcome to a new start!"
      form={form}
      onSubmit={submitSignUpData}
      fields={[
        {
          label: "First Name",
          name: "firstName",
          inputProps: { placeholder: "First name" },
        },
        {
          label: "Last Name",
          name: "lastName",
          inputProps: { placeholder: "Last name" },
        },
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
        {
          label: "Retype Password",
          name: "retypePassword",
          inputProps: { placeholder: "Retype password", type: "password" },
        },
      ]}
    />
  );
}
