"use client";

import React from "react";
import {
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { ProjectRow, columns } from "./columns";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  deleteBatchAndUpdate,
  isEditingRow,
  onEditCancel,
  onInputChange,
  onProjectEdit,
  onUpdateProject,
  updateStatus,
} from "@/lib/dashboard/table-actions";
import { AppDispatch, RootState } from "@/lib/stores/root";
import { useScreenWidth } from "@/lib/hooks/screen-width";
import { Project } from "@/lib/types/models/user";

export function ProjectsDataTable() {
  const { isSmall } = useScreenWidth();

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboardUserData);

  // Ensure the project edits are preserved across rerenders
  const projectEditsRef = React.useRef<Partial<Project> | undefined>();
  React.useEffect(() => {
    projectEditsRef.current = state.projectEdits;
  }, [state.projectEdits]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<number, boolean>
  >({});

  const tableCols = React.useMemo(() => {
    // Remove the descriptions col if the screen is too small
    let cols = columns({
      onUpdateProject: onUpdateProject(state, dispatch, projectEditsRef),
      onProjectEdit: onProjectEdit(dispatch),
      onEditCancel: onEditCancel(dispatch, projectEditsRef),
      onInputChange: onInputChange(dispatch, projectEditsRef),
      updateStatus: updateStatus(dispatch),
      isEditingRow: isEditingRow(state),
    });

    if (isSmall) {
      const omittedCols = ["description", "select"];
      cols = cols.filter((col) => !omittedCols.includes(col.id ?? ""));
    }

    return cols;
  }, [isSmall, state.editingProjectId, state.userData]);

  const table = useReactTable<ProjectRow>({
    data: state.userData?.projects ?? [],
    columns: tableCols,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
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
          <RowDeleteButton rowSelection={rowSelection} />
        ) : (
          <></>
        )}
      </div>
      <Table className="rounded-md border overflow-x-auto">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {state.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>No results.</>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
  rowSelection: Record<number, boolean>;
}

function RowDeleteButton({ rowSelection }: RowDeleteButton) {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboardUserData);

  return (
    <Button
      variant="destructive"
      onClick={() => deleteBatchAndUpdate(state, rowSelection, dispatch)}
    >
      Delete
    </Button>
  );
}
