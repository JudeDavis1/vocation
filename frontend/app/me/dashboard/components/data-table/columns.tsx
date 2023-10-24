import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";

import { EditProjectPopover } from "./edit-project-popover";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project, ProjectStatus } from "@/lib/types/models/user";
import { backendErrorHandle } from "@/lib/utils/backend-error-handle";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { updateProject, deleteProject } from "@/lib/dashboard/table-actions";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns = (setReload: SetReloadState): ColumnDef<Project>[] => {
  return [
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
      cell: ({ row }) => {
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

        return (
          <div className="capitalize">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span
                  className={cn(
                    statusColorMap[row.original.status],
                    "text-white p-2 rounded-lg hover:cursor-pointer"
                  )}
                >
                  {textMap[row.original.status]}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {Object.keys(textMap).map((keyString, i) => {
                  const projectStatus = keyString as keyof typeof ProjectStatus;
                  return (
                    <DropdownMenuItem
                      key={i}
                      className="hover:cursor-pointer"
                      onClick={() =>
                        updateProject(
                          row.original.id,
                          { status: projectStatus },
                          row.original,
                          setReload
                        )
                      }
                    >
                      <span
                        className={cn(
                          statusColorMap[projectStatus],
                          "text-white p-2 rounded-lg"
                        )}
                      >
                        {textMap[projectStatus]}
                      </span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="capitalize line-clamp-2">
                {row.getValue("title")}
              </span>
            </TooltipTrigger>
            <TooltipContent>{row.getValue("title")}</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="capitalize line-clamp-2">
                {row.getValue("description")}
              </span>
            </TooltipTrigger>
            <TooltipContent className="w-64">
              {row.getValue("description")}
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="space-x-4">
            <EditProjectPopover project={row.original} setReload={setReload} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      await deleteProject(row.original);
                      toast({
                        title: "Deleted!",
                        description: `Successfully deleted ${row.original.title}.`,
                        variant: "success",
                      });
                      setReload(true);
                    } catch (error) {
                      backendErrorHandle(error);
                    }
                  }}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
