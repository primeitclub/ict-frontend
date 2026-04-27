import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useAuth } from "../hooks/use-auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  useAuth();

  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  // While the initial cookie check is running, show nothing (or a spinner)
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
