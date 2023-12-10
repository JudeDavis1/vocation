"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project, ProjectStatus } from "@/lib/types/models/user";
import { backendErrorHandle } from "@/lib/backend-error-handle";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { updateProject, deleteProject } from "@/lib/dashboard/table-actions";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppDispatch, RootState } from "@/lib/stores/root";
import {
  dashboardUserDataSlice,
  getUserDataThunk,
} from "@/lib/stores/dashboard-user-data";
import { Input } from "@/components/ui/input";
import { createProjectSchema } from "@/lib/types/create-project/form-schema";

export type ProjectRow = Project;

const { setEditingProject, updateUserProject } = dashboardUserDataSlice.actions;

export const columns = (
  dispatch: AppDispatch,
  state: RootState["dashboardUserData"]
): ColumnDef<ProjectRow>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <StatusRow row={row} dispatch={dispatch} state={state} />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const isEditing = state.editingProject?.id === row.original.id;
      const defaultValue = isEditing
        ? state.editingProject?.title
        : row.original.title;
      return (
        <div className="text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                className="capitalize line-clamp-2"
                defaultValue={defaultValue}
                disabled={!isEditing}
                onBlur={(e) =>
                  dispatch(
                    setEditingProject({
                      ...state.editingProject,
                      title: e.target.value,
                    })
                  )
                }
              />
            </TooltipTrigger>
            <TooltipContent>{row.getValue("title")}</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const isEditing = state.editingProject?.id === row.original.id;
      const defaultValue = isEditing
        ? state.editingProject?.description
        : row.original.description;
      return (
        <div className="text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                className="capitalize line-clamp-2"
                defaultValue={defaultValue}
                disabled={!isEditing}
                onBlur={(e) =>
                  dispatch(
                    setEditingProject({
                      ...state.editingProject,
                      description: e.target.value,
                    })
                  )
                }
              />
            </TooltipTrigger>
            <TooltipContent className="w-64">
              {row.getValue("description")}
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsRow row={row} dispatch={dispatch} state={state} />
    ),
  },
];

interface RowProps {
  row: Row<Project>;
  dispatch: AppDispatch;
  state: RootState["dashboardUserData"];
}

function StatusRow({ row, dispatch }: RowProps) {
  const statusColorMap: Record<keyof typeof ProjectStatus, string> = {
    NOT_STARTED: "bg-gray-700",
    IN_PROGRESS: "bg-blue-500",
    COMPLETED: "bg-green-800",
  };
  const textMap: Record<keyof typeof ProjectStatus, string> = {
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
  };

  const statusWrapper = (status: keyof typeof ProjectStatus) => (
    <span
      className={cn(
        statusColorMap[status],
        "text-white p-2 rounded-lg hover:cursor-pointer text-xs"
      )}
    >
      {textMap[status]}
    </span>
  );

  const statusOption = (keyString: string) => {
    const projectStatus = keyString as keyof typeof ProjectStatus;
    return (
      <DropdownMenuItem
        key={keyString}
        className="hover:cursor-pointer"
        onClick={() =>
          updateProject(
            row.original.id,
            { status: projectStatus },
            row.original,
            dispatch
          )
        }
      >
        {statusWrapper(projectStatus)}
      </DropdownMenuItem>
    );
  };

  return (
    <div className="capitalize">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {statusWrapper(row.original.status)}
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {Object.keys(textMap).map((keyString, _) => statusOption(keyString))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ActionsRow({ row, dispatch, state }: RowProps) {
  const onDeleteProject = React.useCallback(async () => {
    try {
      await deleteProject(row.original);
      toast({
        title: "Deleted!",
        description: `Successfully deleted ${row.original.title}.`,
        variant: "success",
      });
      dispatch(getUserDataThunk());
    } catch (error) {
      toast({
        title: "Error",
        description: backendErrorHandle(error),
        variant: "destructive",
      });
    }
  }, [dispatch, row.original]);

  const onUpdate = React.useCallback(async () => {
    if (state.editingProject?.id === undefined) {
      return;
    }

    // Ensure the project matches the schema requirements
    const parseResult = createProjectSchema.safeParse(state.editingProject);
    if (!parseResult.success) {
      toast({
        title: "Error",
        description: parseResult.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    try {
      await updateProject(
        row.original.id,
        state.editingProject,
        row.original,
        dispatch
      );
      // Update client state
      dispatch(
        updateUserProject({
          projectId: row.original.id,
          updates: { ...state.editingProject },
        })
      );
      dispatch(setEditingProject(undefined));
    } catch (error) {
      toast({
        title: "Error",
        description: backendErrorHandle(error),
        variant: "destructive",
      });
    }
  }, [dispatch]);

  return (
    <div>
      {state.editingProject?.id !== undefined ? (
        <div className="flex gap-x-1">
          <Button
            className="text-xs"
            onClick={() => dispatch(setEditingProject(undefined))}
            size="sm"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={onUpdate}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            Save
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8" size="icon">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={(e) => dispatch(setEditingProject(row.original))}
            >
              <div className="flex justify-between items-center w-full">
                <span>Edit</span>
                <Edit size={14} />
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onDeleteProject}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
