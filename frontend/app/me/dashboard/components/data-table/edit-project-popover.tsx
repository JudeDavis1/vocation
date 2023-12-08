"use client";

import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useDispatch } from "react-redux";

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
} from "@/lib/types/create-project/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Project } from "@/lib/types/models/user";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/lib/dashboard/table-actions";
import { AppDispatch } from "@/lib/stores/root";

export interface EditProjectPopoverProps {
  project: Project;
}

export function EditProjectPopover({ project }: EditProjectPopoverProps) {
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
        <EditProjectForm project={project} />
      </PopoverContent>
    </Popover>
  );
}

interface EditProjectFormProps {
  project: Project;
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const dispatch: AppDispatch = useDispatch();
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
          updateProject(project.id, data, project, dispatch);
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
