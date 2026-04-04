import { useRef } from "react";

import Upload from "../icons/Upload";

export default function Payment() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="font-medium mb-2">Payment Screenshot</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div
          onClick={handleBoxClick}
          className="border-2 border-dashed border-[#3571F0]/30 rounded-lg h-64 flex flex-col items-center justify-center text-gray-500 cursor-pointer bg-[#E9F0FF] transition-all hover:bg-[#dee9ff] hover:border-[#3571F0]"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-3 shadow-sm">
            <Upload />
          </div>

          <p className="text-sm font-medium text-[#020919]">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">
            SVG, PNG, JPG or GIF (max. 5MB)
          </p>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="border p-3 bg-white rounded-lg shadow-sm">
            <img
              src="/qr.png"
              alt="QR Code"
              className="w-40 h-40 object-contain"
            />
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Accepted via eSewa / Khalti / Bank Transfer
          </p>
          <p className="text-[#3571F0] font-semibold mt-1 text-lg">
            Amount: Rs. 500
          </p>
        </div>
      </div>
    </div>
  );
}
