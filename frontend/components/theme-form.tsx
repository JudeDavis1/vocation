import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
              {/* {fields.map((item, i) => (
                <FormField
                  key={i}
                  name={item.name as Path<DataShape>}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input {...item.inputProps} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))} */}

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
