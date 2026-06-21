// routes/VersionContext.tsx
import { createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface VersionContextType {
  version: string;
  slug: string;
  isLatest: boolean;
  getPath: (path: string) => string;
  navigateToVersion: (newVersion: string) => void;
}

const VersionContext = createContext<VersionContextType | null>(null);

interface ProviderProps {
  version: string;
  slug: string;
  isLatest: boolean;
  latestVersion: string;
  children: React.ReactNode;
}

export function VersionProvider({ version, slug, isLatest, latestVersion, children }: ProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Generate correct path based on version
  const getPath = (path: string): string => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    if (isLatest) {
      return cleanPath; // /events
    }
    return `/${version}${cleanPath}`;
  };

  // Switch to different version (keeps current page)
  const navigateToVersion = (newVersion: string): void => {
    // Get current page path (without version prefix)
    let currentPage = location.pathname;

    // Remove version prefix if exists
    if (!isLatest && currentPage.startsWith(`/${version}`)) {
      currentPage = currentPage.slice(version.length + 1) || "/";
    }

    // Navigate to same page in new version
    if (newVersion === latestVersion) {
      navigate(currentPage);
    } else {
      navigate(`/${newVersion}${currentPage}`);
    }
  };

  //check the activeRouteVersion

  return (
    <VersionContext.Provider
      value={{
        version,
        slug,
        isLatest,
        getPath,
        navigateToVersion,
      }}
    >
      {children}
    </VersionContext.Provider>
  );
}

/* eslint-disable */
export function useVersion() {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error("useVersion must be used within VersionProvider");
  }
  return context;
}
