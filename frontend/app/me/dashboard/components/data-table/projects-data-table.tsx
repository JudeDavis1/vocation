"use client";

import React from "react";
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
import { deleteBatchAndUpdate } from "@/lib/dashboard/table-actions";
import { AppDispatch, RootState } from "@/lib/stores/root";
import { useScreenWidth } from "@/lib/hooks/screen-width";

export function ProjectsDataTable() {
  const { isSmall } = useScreenWidth();

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboardUserData);

  const [sorting, setSorting] = React.useState<SortingState>([]);
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
    let cols = columns(dispatch, state);
    if (isSmall) {
      const omittedCols = ["description", "select"];
      cols = cols.filter((col) => !omittedCols.includes(col.id ?? ""));
    }

    return cols;
  }, [isSmall, state.editingProject]);

  const table = useReactTable<ProjectRow>({
    data: state.userData?.projects ?? [],
    columns: tableCols,
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
