import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  CreateProjectInput,
  createProjectSchema,
} from "@/types/create-project/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Project } from "@/types/models/user";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/services/dashboard/table-actions";

export interface EditProjectPopoverProps {
  project: Project;
  setReload: SetReloadState;
}

export function EditProjectPopover({
  project,
  setReload,
}: EditProjectPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary" className="gap-x-2">
          <>
            <Edit size={17} />
            Edit
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <EditProjectForm project={project} setReload={setReload} />
      </PopoverContent>
    </Popover>
  );
}

interface EditProjectFormProps {
  project: Project;
  setReload: SetReloadState;
}

export function EditProjectForm({ project, setReload }: EditProjectFormProps) {
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(async (data) => {
          updateProject(project.id, data, project, setReload);
        })}
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

        <Button type="submit" className="gap-x-2 flex justify-end ml-auto">
          <>
            <Edit size={17} />
            Edit
          </>
        </Button>
      </form>
    </Form>
  );
}