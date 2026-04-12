import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";

type SpeakerData = {
  id: string;
  name: string;
  role: string;
  company: string;
  status: "Confirmed" | "Pending" | "Cancelled";
};

const data: SpeakerData[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Software Engineer",
    company: "Tech Corp",
    status: "Confirmed",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Product Manager",
    company: "Innovate Inc.",
    status: "Pending",
  },
];

const columns: ColumnDef<SpeakerData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Confirmed"
              ? "bg-green-500/20 text-green-400"
              : status === "Pending"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export default function Speakers() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Speakers</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the speakers for your event.
          </p>
        </div>
        <button
          onClick={() => navigate("add")}
          className="bg-admin-secondary hover:bg-admin-secondary/80 text-white px-4 py-2 rounded-md transition-colors font-medium"
        >
          Add New Speaker
        </button>
      </div>

      <Table columns={columns} data={data} searchPlaceholder="Search speakers..." />
    </div>
  );
}
