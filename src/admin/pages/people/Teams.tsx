import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";

type TeamData = {
  id: string;
  name: string;
  department: string;
  email: string;
  status: "Active" | "Inactive";
};

const data: TeamData[] = [
  {
    id: "1",
    name: "Alice Johnson",
    department: "Organizing Committee",
    email: "alice@example.com",
    status: "Active",
  },
  {
    id: "2",
    name: "Bob Williams",
    department: "Marketing",
    email: "bob@example.com",
    status: "Inactive",
  },
];

const columns: ColumnDef<TeamData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export default function Teams() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Teams</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your team members and roles.
          </p>
        </div>
        <button
          onClick={() => navigate("add")}
          className="bg-admin-secondary hover:bg-admin-secondary/80 text-white px-4 py-2 rounded-md transition-colors font-medium"
        >
          Add New Team Member
        </button>
      </div>

      <Table columns={columns} data={data} searchPlaceholder="Search team members..." />
    </div>
  );
}
