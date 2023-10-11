"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader } from "lucide-react";

import { columns } from "./columns";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types/models/user";
import { Button } from "@/components/ui/button";
import { backendErrorHandle } from "@/lib/utils/backend-error-handle";
import { toast } from "@/components/ui/use-toast";
import { deleteProject } from "@/services/dashboard/table-actions";

interface ProjectsDataTableProps {
  projects: Project[];
  reload: boolean;
  setReload: SetReloadState;
}

export function ProjectsDataTable({
  projects,
  reload,
  setReload,
}: ProjectsDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<number, boolean>
  >({});

  const table = useReactTable<Project>({
    data: projects,
    columns: columns(setReload),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-x-4">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {Object.keys(rowSelection).length ? (
          <RowDeleteButton
            projects={projects}
            rowSelection={rowSelection}
            setReload={setReload}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {reload ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <>No results.</>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}

interface RowDeleteButton {
  projects: Project[];
  rowSelection: Record<number, boolean>;
  setReload: SetReloadState;
}

function RowDeleteButton({
  projects,
  rowSelection,
  setReload,
}: RowDeleteButton) {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        // Get selected keys and delete the associated project(s)
        try {
          await Promise.all(
            Object.keys(rowSelection).map(async (item) => {
              const idx = parseInt(item);
              const project = projects[idx];

              return deleteProject(project);
            })
          );
          setReload(true);
          toast({
            title: "Success",
            description: `Successfully deleted ${
              Object.keys(rowSelection).length
            } Project(s)`,
            variant: "success",
          });
        } catch (error) {
          backendErrorHandle(error);
        }
      }}
    >
      Delete
    </Button>
  );
}
