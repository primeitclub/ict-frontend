import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Search, RefreshCw } from "lucide-react";
import EmptyCart from "../../../assets/icons/EmptyCart";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onRefetch?: () => void;
}

export default function Table<TData, TValue>({
  columns,
  data,
  showSearch = true,
  searchPlaceholder = "Search...",
  onRefetch,
}: TableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start gap-4">
        {showSearch && data.length > 0 && (
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="bg-admin-primary border border-admin-primary text-white text-sm rounded-lg block w-full pl-10 p-2.5 outline-none transition-colors"
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        {onRefetch && (
         <div>
           <button
            onClick={onRefetch}
            className="ml-auto p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all w-fit mr-auto"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
         </div>
        )}
      </div>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-800 bg-admin-primary">
        <table className="w-full text-sm text-left align-middle ">
          <thead className="text-white bg-[#02111F] whitespace-nowrap">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-4 font-medium border-b border-gray-800"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-800">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center mx-auto w-fit gap-8 py-20">
                    <div className="opacity-20">
                      <EmptyCart />
                    </div>
                    <span className="text-sm font-semibold text-gray-400">
                      No results found.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      {/* <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
        <div className="flex items-center space-x-2">
          <span>
            Page <span className="font-medium text-white">{table.getState().pagination.pageIndex + 1}</span> of{" "}
            <span className="font-medium text-white">{table.getPageCount() || 1}</span>
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="bg-admin-primary border border-gray-800 text-white rounded p-1 outline-none focus:border-admin-secondary transition-colors"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded border border-gray-800 bg-admin-primary text-gray-300 hover:bg-[#1E1E1E] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded border border-gray-800 bg-admin-primary text-gray-300 hover:bg-[#1E1E1E] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
}
