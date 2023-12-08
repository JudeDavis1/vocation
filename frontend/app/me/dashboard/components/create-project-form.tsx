import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

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
import { submitProjectData } from "@/lib/dashboard/create-project-form/on-submit";
import { Textarea } from "@/components/ui/textarea";
import { AppDispatch, RootState } from "@/lib/stores/root";
import { getUserDataThunk } from "@/lib/stores/dashboard-user-data";

export function CreateProjectForm() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboardUserData);

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
  });

  return (
    <Card className="p-0 sm:p-4 w-full sm:w-96">
      <CardHeader>
        <CardTitle>Create a project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              if (state.userData) {
                await submitProjectData(data, String(state.userData.id));
              }
              dispatch(getUserDataThunk());
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
