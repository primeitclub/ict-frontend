import { Toaster } from "react-hot-toast";

const Toast = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#02111F",
        color: "#fff",
        border: "1px solid #1f2937",
        fontSize: "0.875rem",
      },
      success: {
        iconTheme: { primary: "#22c55e", secondary: "#02111F" },
      },
      error: {
        iconTheme: { primary: "#ef4444", secondary: "#02111F" },
      },
    }}
  />
);

export default Toast;
