"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemeForm } from "@/components/theme-form";
import { toast } from "@/components/ui/use-toast";
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

export function MainForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <ThemeForm
      title="Login"
      description="Welcome back!"
      form={form}
      onSubmit={submitLoginData}
    >
      <FormField
        name="email"
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
