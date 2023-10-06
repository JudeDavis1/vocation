"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ThemeForm } from "@/components/theme/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormData, loginFormSchema } from "@/types/login/form-schema";
import { submitLoginData } from "@/services/login/on-submit";
import { checkAuth } from "@/services/login/check-auth";

export function MainForm() {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    checkAuth(router);
  }, []);

  return (
    <ThemeForm
      title="Login"
      description="Welcome back!"
      form={form}
      onSubmit={(data) => submitLoginData(data, router)}
    >
      <FormField
        name="email"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="password"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </ThemeForm>
  );
}
