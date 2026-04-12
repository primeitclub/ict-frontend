import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";

type HeroData = {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Draft" | "Archived";
};

const data: HeroData[] = [
  {
    id: "1",
    title: "Welcome to ICT Meetup",
    description: "The biggest tech event of the year.",
    status: "Active",
  },
  {
    id: "2",
    title: "Register Now!",
    description: "Early bird tickets are now available.",
    status: "Draft",
  },
  {
    id: "3",
    title: "Call for Speakers",
    description: "Submit your proposals before the deadline.",
    status: "Archived",
  },
];

const columns: ColumnDef<HeroData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
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
              : status === "Draft"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export default function Hero() {
  const navigate = useNavigate();

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

      <Table columns={columns} data={data} />
    </div>
  );
}
