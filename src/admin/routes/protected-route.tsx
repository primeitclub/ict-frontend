const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true; // Replace with actual authentication logic

  if (!isAuthenticated) {
    return <div>You need to be authenticated to access this page.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
