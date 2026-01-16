import { Routes, Route, Navigate } from "react-router-dom";
import { AboutPage, HomePage } from "../client/pages";
import PageLayout from "../client/layouts/PageLayout";
import { VersionProvider } from "./VersionContext";

export default function ClientRouter({ version }: { version: string }) {
  return (
    <VersionProvider version={version}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </VersionProvider>
  );
}
