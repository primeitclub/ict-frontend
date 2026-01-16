import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLatestVersion, VersionConifg } from "./utils/route-type";

interface VersionControlInterface {
  version: string;
  isLatest: boolean;
  changeVersion: (newVersion: string) => void;
  buildPath: (path: string) => string;
  allVersion: string[];
}

interface ProviderInterface {
  children: React.ReactNode;
  version: string;
}

const VersionContext = React.createContext<VersionControlInterface | undefined>(
  undefined
);

export const VersionProvider = ({ children, version }: ProviderInterface) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLatest = isLatestVersion(version);

  const allVersion = VersionConifg.availabel;

  // check route guard
  const nowVersion = location.pathname.split("/");

  const isValid = VersionConifg.availabel.includes(nowVersion[1]);

  const changeVersion = (newVersion: string): void => {
    let currentPage = location.pathname;

    // remove the leading version
    VersionConifg.availabel.forEach((item) => {
      if (currentPage.startsWith(`/${item}`)) {
        currentPage = currentPage.replace(`${item}`, "") || "";
      }
    });

    if (isLatestVersion(newVersion)) {
      navigate(currentPage);
    } else {
      navigate(`${newVersion}/${currentPage}`);
    }
  };

  const buildPath = (path: string): string => {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return isLatest ? cleanPath : `/${version}/${cleanPath}`;
  };

  /* eslint-disable */
  const memoized = useMemo<VersionControlInterface>(() => {
    return {
      version,
      isLatest,
      changeVersion,
      buildPath,
      allVersion,
    };
  }, [version, isLatest]);

  return (
    <VersionContext.Provider value={memoized}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = (): VersionControlInterface => {
  const context = React.useContext(VersionContext);
  if (!context) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
};
