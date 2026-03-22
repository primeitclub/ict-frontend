import Upload from "../icons/Upload";

export default function Payment() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="">Payment Screenshot</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex flex-col items-center justify-center text-gray-500 cursor-pointer bg-[#E9F0FF] transition">
          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full mb-3">
            <Upload />
          </div>

          <p className="text-sm font-medium text-[#020919]">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">
            SVG, PNG, JPG or GIF (max. 5MB)
          </p>

          <input type="file" className="hidden" />
        </div>

        {/* QR Section */}
        <div className="flex flex-col items-center text-center">
          {/* QR Image */}
          <div className="border p-3 bg-white rounded-lg shadow-sm">
            <img
              src="/qr.png"
              alt="QR Code"
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* Payment Info */}
          <p className="text-sm text-gray-500 mt-3">
            Accepted via eSewa / Khalti / Bank Transfer
          </p>

          <p className="text-[#3571F0] font-semibold mt-1">Amount: Rs. 500</p>
        </div>
      </div>
    </div>
  );
}
