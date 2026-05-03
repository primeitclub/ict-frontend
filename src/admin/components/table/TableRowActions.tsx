import { Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface TableRowActionsProps {
  editHref?: string;
  onDelete?: () => void;
}

const TableRowActions = ({ editHref, onDelete }: TableRowActionsProps) => (
  <div className="flex items-center space-x-2">
    {editHref && (
      <Link
        to={editHref}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
        title="Edit"
      >
        <Edit2 size={16} />
      </Link>
    )}
    {onDelete && (
      <button
        onClick={onDelete}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    )}
  </div>
);

export default TableRowActions;
