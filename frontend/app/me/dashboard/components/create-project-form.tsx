import { Controller, useForm } from "react-hook-form";
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
} from "@/types/create-project/form-schema";
import { submitProjectData } from "@/services/dashboard/create-project-form/on-submit";
import { User } from "@/types/models/user";

interface CreateProjectFormProps {
  userData?: User;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateProjectForm({
  userData,
  setReload,
}: CreateProjectFormProps) {
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
  });

  return (
    <Card className="p-4 w-full sm:w-96">
      <CardHeader>
        <CardTitle>Create a project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              if (userData) {
                await submitProjectData(data, String(userData.id));
                // form.reset();
              }
              setReload(true);
            })}
            className="space-y-6"
          >
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
                    <Input placeholder="Project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="flex justify-end ml-auto">Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
