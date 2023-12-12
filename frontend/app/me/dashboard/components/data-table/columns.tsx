"use client";

import React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

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
import { deleteProject } from "@/lib/dashboard/table-actions";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppDispatch, RootState } from "@/lib/stores/root";
import { getUserDataThunk } from "@/lib/stores/dashboard-user-data";
import { Input } from "@/components/ui/input";

export type ProjectRow = Project;

export interface ColumnCallbacks {
  onUpdateProject: (row: Row<Project>) => Promise<void>;
  onProjectEdit: (row: Row<Project>) => Promise<void>;
  onEditCancel: () => Promise<void>;
  onInputChange: (edits: Partial<Project>) => Promise<void>;
  isEditingRow: (row: Row<Project>) => boolean;
  updateStatus: (
    row: Row<Project>,
    projectStatus: keyof typeof ProjectStatus
  ) => Promise<void>;
}

export const columns = (
  callbacks: ColumnCallbacks
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
    cell: ({ row }) => <StatusRow row={row} callbacks={callbacks} />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const isEditing = callbacks.isEditingRow(row);
      const defaultValue = row.original.title;
      return (
        <div className="text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                className="capitalize line-clamp-2"
                defaultValue={defaultValue}
                disabled={!isEditing}
                onChange={(e) =>
                  callbacks.onInputChange({ title: e.target.value })
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
      const isEditing = callbacks.isEditingRow(row);
      const defaultValue = row.original.description;
      return (
        <div className="text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                className="capitalize line-clamp-2"
                defaultValue={defaultValue}
                disabled={!isEditing}
                onChange={(e) =>
                  callbacks.onInputChange({
                    description: e.target.value,
                  })
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
    cell: ({ row }) => <ActionsRow row={row} callbacks={callbacks} />,
  },
];

interface RowProps {
  row: Row<Project>;
  callbacks: ColumnCallbacks;
}

function StatusRow({ row, callbacks }: RowProps) {
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
        onClick={() => callbacks.updateStatus(row, projectStatus)}
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

function ActionsRow({ row, callbacks }: RowProps) {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboardUserData);
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

  return (
    <div>
      {state.editingProjectId === row.original.id ? (
        <div className="flex gap-x-1">
          <Button
            className="text-xs"
            onClick={callbacks.onEditCancel}
            size="sm"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={() => callbacks.onUpdateProject(row)}
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
            <DropdownMenuItem onClick={(e) => callbacks.onProjectEdit(row)}>
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
