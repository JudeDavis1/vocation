import { FieldValues, UseFormReturn } from "react-hook-form";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

export interface ThemeFormProps<DataShape extends FieldValues> {
  title?: string;
  description?: string;
  form: UseFormReturn<DataShape>;
  onSubmit: (data: any) => void;
}

export function ThemeForm<DataShape extends FieldValues>({
  title,
  description,
  form,
  onSubmit,
  children,
}: React.PropsWithChildren<ThemeFormProps<DataShape>>) {
  return (
    <div className="flex justify-center">
      <Card className="p-4 w-full md:w-2/3 shadow-2xl shadow-gray-800">
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {children}

              <Button type="submit" className="flex justify-end ml-auto">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
