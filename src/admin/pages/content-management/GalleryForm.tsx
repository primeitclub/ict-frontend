import { useNavigate } from "react-router-dom";

export default function GalleryForm() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
          &larr; Back
        </button>
        <h2 className="text-2xl font-bold">Add Gallery Data</h2>
      </div>
      <div className="bg-admin-primary border border-gray-800 rounded-lg p-6">
        <p className="text-gray-400">Form to add new gallery content goes here.</p>
        <div className="mt-6 flex justify-end">
          <button className="bg-admin-secondary text-white px-4 py-2 rounded font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
