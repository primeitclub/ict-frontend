import { useMemo } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TableRowActions from "../../components/table/TableRowActions";
import { useApiQuery } from "../../../lib/use-api-query";
import { useApiMutation } from "../../../lib/use-api-mutation";
import Table from "../../components/table/Table";
import type { FlagshipEventVersion } from "../../types/version";
import { EventVersionStatus } from "../../types/version";
import toast from "react-hot-toast";
import { statusColors } from "../../constants";

export default function Versions() {
  const { data, isLoading, refetch } = useApiQuery("versions")<{
    data: FlagshipEventVersion[];
  }>();

  const navigate = useNavigate();

  const { execute: deleteVersion } = useApiMutation("versionDetail")<
    void,
    never
  >({
    method: "DELETE",
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete version");
    },
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "version_name",
        header: "Version Name",
        cell: (info) => (
          <div className="flex items-center space-x-3">
            {info.row.original.logo ? (
              <img
                src={info.row.original.logo}
                alt={info.getValue()}
                className="w-8 h-8 rounded object-contain bg-gray-800"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-gray-500">
                <FileText size={16} />
              </div>
            )}
            <span className="font-medium">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: "version_number",
        header: "Number",
        cell: (info) => `v${info.getValue()}`,
      },
      {
        accessorKey: "slug",
        header: "Slug",
        cell: (info) => (
          <code className="text-xs bg-gray-800 px-2 py-1 rounded text-blue-400">
            {info.getValue()}
          </code>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as EventVersionStatus;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      },
      {
        accessorKey: "is_current",
        header: "Current",
        cell: (info) =>
          info.getValue() ? (
            <div className="flex items-center text-green-500">
              <CheckCircle2 size={16} className="mr-1" />
              <span className="text-xs font-medium">Yes</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500">No</span>
          ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <TableRowActions
            editHref={`edit/${info.row.original.id}`}
            onDelete={() => {
              if (window.confirm("Are you sure you want to delete this version?")) {
                deleteVersion(undefined, { pathParams: { id: info.row.original.id } });
              }
            }}
          />
        ),
      },
    ],
    [deleteVersion],
  );

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

      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <Table
          columns={columns}
          data={data?.data?.items || []}
          searchPlaceholder="Search versions..."
          onRefetch={refetch}
        />
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

