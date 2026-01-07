import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundry from "./ErrorBounds";
import ErrorFallback from "../components/error-fallback";

const queryClient = new QueryClient();

const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactNode => {
  return (
    // wraper for query client and error boundry
    <QueryClientProvider client={queryClient}>
      <ErrorBoundry fallback={<ErrorFallback />}>{children}</ErrorBoundry>
    </QueryClientProvider>
  );
};

export default AppProvider;
