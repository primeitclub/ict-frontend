import { useRef, useState } from "react";
import Upload from "../icons/Upload";

export default function Payment() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-[10px] md:text-sm">
      <h2 className="font-medium mb-2 text-sm">Payment Screenshot</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Upload Box (always visible) */}
        <div
          onClick={handleBoxClick}
          className="relative border-2 border-dashed border-[#3571F0]/30 rounded-lg h-64 flex items-center justify-center cursor-pointer bg-[#E9F0FF] hover:bg-[#dee9ff] hover:border-[#3571F0] overflow-hidden"
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />

              {/* Overlay to indicate change */}
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white text-sm font-medium">
                  Click to change
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-3 shadow-sm">
                <Upload />
              </div>

              <p className="text-[10px] md:text-sm font-medium text-[#020919]">
                Click to upload or drag and drop
              </p>
              <p className="text-[8px] md:text-xs text-gray-400 mt-1">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* QR Section */}
        <div className="flex flex-col items-center text-center">
          <div className="border p-3 bg-white rounded-lg shadow-sm">
            <img
              src="/qr.png"
              alt="QR Code"
              className="w-40 h-40 object-contain"
            />
          </div>

          <p className=" text-[#BBC0CC] mt-3">
            Accepted via eSewa / Khalti / Bank Transfer
          </p>
          <p className="text-[#3571F0] font-medium mt-1 text-[10px] md:text-sm">
            Amount: Rs. 500
          </p>
        </div>
      </div>
    </div>
  );
}
