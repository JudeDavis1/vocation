"use client";

import { Edit } from "lucide-react";
import { UseFormReturn, useForm } from "react-hook-form";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface EditProjectPopoverProps {
  project: Project;
}

export function EditProjectPopover({ project }: EditProjectPopoverProps) {
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex">
          Edit <Edit size={14} className="flex justify-end ml-auto" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <EditProjectForm form={form} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const data = form.getValues();
              await updateProject(project.id, data, project, dispatch);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface EditProjectFormProps {
  form: UseFormReturn<CreateProjectInput>;
}

function EditProjectForm({ form }: EditProjectFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-6">
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
      </form>
    </Form>
  );
}
