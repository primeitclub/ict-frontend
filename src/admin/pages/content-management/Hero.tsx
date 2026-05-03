import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import TableRowActions from "../../components/table/TableRowActions";
import { useApiQuery } from "../../../lib";
import { useApiMutation } from "../../../lib/use-api-mutation";
import type { HeroSection } from "../../types/hero";
import toast from "react-hot-toast";

export default function Hero() {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useApiQuery("heroSections")<{ data: { items: HeroSection[] } }>();

  const { execute: deleteHeroSection } = useApiMutation("heroSectionDetail")<void, never>({
    method: "DELETE",
    onSuccess: () => refetch(),
    onError: (error) => toast.error(error.message || "Failed to delete hero section"),
  });

  const columns: ColumnDef<HeroSection>[] = useMemo(() => [
    {
      id: "sn",
      header: "S.N",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "heading",
      header: "Title",
    },
    {
      accessorKey: "paragraph",
      header: "Description",
    },
    {
      header: "Version",
      accessorKey: "flagshipEventVersion.version_number",
      cell: ({ row }) => {
        const version = row.original.flagshipEventVersion;
        return (
          <div>
            {version.version_number}
            {version.is_current && (
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <TableRowActions
          editHref={`edit/${row.original.id}`}
          onDelete={() => {
            if (window.confirm("Are you sure you want to delete this hero section?")) {
              deleteHeroSection(undefined, { pathParams: { id: row.original.id } });
            }
          }}
        />
      ),
    },
  ], [deleteHeroSection]);

  const items = data?.data?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hero Content</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the hero section data for your landing page.
          </p>
        </div>
        <button
          onClick={() => navigate("add")}
          className="bg-admin-secondary hover:bg-admin-secondary/80 text-white px-4 py-2 rounded-md transition-colors font-medium"
        >
          Add New Content
        </button>
      </div>

      <Table columns={columns} data={items} onRefetch={refetch} />
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-gray-800 border-t-admin-secondary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
