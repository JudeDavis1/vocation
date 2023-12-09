"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateProjectInput,
  createProjectSchema,
} from "@/lib/types/create-project/form-schema";
import { Textarea } from "@/components/ui/textarea";

interface CreateProjectFormProps {
  onSubmit: (data: CreateProjectInput) => void;
}

export function CreateProjectForm({ onSubmit }: CreateProjectFormProps) {
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
  });

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>Create a project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-28"
                      placeholder="Project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="flex justify-end ml-auto">
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
