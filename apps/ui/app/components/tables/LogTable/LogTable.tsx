import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { LogDto } from "@montelo/browser-client";
import { darkStyles, JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import dayjs from "dayjs";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { idShortener } from "./idShortener";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Link, useParams } from "@remix-run/react";
import { Routes } from "../../../routes";

export const columns: ColumnDef<LogDto>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "startTime",
    header: "Timestamp",
    cell: ({ row }) => {
      const date: string | undefined = row.getValue("startTime") || row.original.createdAt;
      return (<div>{date && dayjs(date).format("D/M HH:mm:ss")}</div>);
    },
  },
  {
    accessorKey: "traceId",
    header: "Trace",
    cell: ({ row }) => {
      const traceId: string = row.getValue("traceId");
      const { short, color } = idShortener(traceId);
      const params = useParams();

      return (
        <div>
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <Link to={Routes.app.project.env.traceId({
                  projectId: params.projectId!,
                  envId: params.envId!,
                  traceId,
                })}>
                  <Badge variant={color}>
                    {short}
                  </Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{traceId}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Log",
    cell: ({ row }) => {
      const name = row.original.name.substring(0, 15);
      const traceId: string = row.getValue("traceId");
      const logId: string = row.getValue("id");
      const { short } = idShortener(logId);
      const params = useParams();

      return (
        <div>
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <Link to={Routes.app.project.env.traceId({
                  projectId: params.projectId!,
                  envId: params.envId!,
                  traceId,
                  logId,
                })}>
                  <Badge>
                    {short} — {name}{name.length !== row.original.name.length && "..."}
                  </Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{logId}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <div>{row.getValue("model") || "—"}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration: string | undefined = row.getValue("duration");
      return (
        <div>{duration ? `${duration}s` : "—"}</div>
      );
    },
  },
  {
    accessorKey: "inputTokens",
    header: "Input Tokens",
    cell: ({ row }) => (
      <div>{row.getValue("inputTokens") ?? "—"}</div>
    ),
  },
  {
    accessorKey: "outputTokens",
    header: "Output Tokens",
    cell: ({ row }) => (
      <div>{row.getValue("outputTokens") ?? "—"}</div>
    ),
  },
  {
    accessorKey: "totalTokens",
    header: "Total Tokens",
    cell: ({ row }) => (
      <div>{row.getValue("totalTokens") ?? "—"}</div>
    ),
  },
  {
    accessorKey: "inputCost",
    header: "Input Cost",
    cell: ({ row }) => {
      const inputCost: number | undefined = row.getValue("inputCost");
      return (
        <div>{inputCost ? `$${inputCost}` : "—"}</div>
      );
    },
  },
  {
    accessorKey: "outputCost",
    header: "Output Cost",
    cell: ({ row }) => {
      const outputCost: number | undefined = row.getValue("outputCost");
      return (
        <div>{outputCost ? `$${outputCost}` : "—"}</div>
      );
    },
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({ row }) => {
      const totalCost: number | undefined = row.getValue("totalCost");
      return (
        <div>{totalCost ? `$${totalCost}` : "—"}</div>
      );
    },
  },
  {
    accessorKey: "input",
    header: "Input",
    cell: ({ row }) => (
      <div>
        <JsonView
          data={row.getValue("input")}
          style={{ ...darkStyles, container: "backgroundColor: inherit;", stringValue: "color: inherit;" }}
          shouldExpandNode={(level) => level >= 1}
        />
      </div>
    ),
  },
  {
    accessorKey: "output",
    header: "Output",
    cell: ({ row }) => (
      <div>
        <JsonView
          data={row.getValue("output")}
          style={{ ...darkStyles, container: "backgroundColor: inherit;", stringValue: "color: inherit;" }}
          shouldExpandNode={(level) => level >= 1}
        />
      </div>
    ),
  },
];

type LogTableProps = {
  logs: LogDto[];
}

export function LogTable({ logs }: LogTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    inputTokens: false,
    outputTokens: false,
    inputCost: false,
    outputCost: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: logs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <div className="flex items-center pb-4 pt-0.5">
        {/*<Input*/}
        {/*  placeholder="Search input or output"*/}
        {/*  value={searchInput}*/}
        {/*  onChange={e => setSearchInput(e.target.value)} // Update the search input state*/}
        {/*  className="max-w-xs"*/}
        {/*/>*/}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                          header.getContext(),
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
                        cell.getContext(),
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
                  No results.
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
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
