import { useRef, useState } from "react";
import Upload from "../icons/Upload";
import { useSiteSettings } from "../../../hooks/use-site-settings";

interface PaymentProps {
  onFileChange?: (file: File | null) => void;
  selectedEvent?: {
    feeType: string;
    fee: string;
  } | null;
}

export default function Payment({ onFileChange, selectedEvent }: PaymentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { data: siteSettings } = useSiteSettings();

  const qrCodeUrl = siteSettings?.qrCodeUrl ?? null;

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    onFileChange?.(file);
  };

  if (!selectedEvent) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-8 bg-[#F8FAFC] border border-dashed border-gray-300 rounded-lg p-6">
        <p className="text-gray-500 text-[10px] md:text-sm">
          Please select an event to see payment information.
        </p>
      </div>
    );
  }

  if (selectedEvent?.feeType === "free") {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-8 bg-[#F4FBF7] border border-[#D1F2E0] rounded-lg p-6">
        <h2 className="font-semibold text-[#16A34A] text-sm md:text-base mb-1">Free Event</h2>
        <p className="text-gray-500 text-[10px] md:text-sm">
          No payment is required for this event. You can proceed with registration without uploading a screenshot.
        </p>
      </div>
    );
  }

  const getAmountText = () => {
    if (!selectedEvent) return "Rs. 500";
    return `Rs. ${selectedEvent.fee}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-[10px] md:text-sm">
      <h2 className="font-medium mb-2 text-sm">Payment Screenshot</h2>

      <div className={qrCodeUrl ? "grid grid-cols-1 md:grid-cols-2 gap-6 items-center" : "max-w-md mx-auto"}>
        {/* Upload Box */}
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
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white text-sm font-medium">Click to change</p>
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
        {qrCodeUrl && (
          <div className="flex flex-col items-center text-center">
            <div className="border p-3 bg-white rounded-lg shadow-sm">
              <img
                src={qrCodeUrl}
                alt="Payment QR Code"
                className="w-40 h-40 object-contain"
              />
            </div>
            <p className="text-[#BBC0CC] mt-3">
              Accepted via eSewa / Khalti / Bank Transfer
            </p>
            <p className="text-[#3571F0] font-medium mt-1 text-[10px] md:text-sm">
              Amount: {getAmountText()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
