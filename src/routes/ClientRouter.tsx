// routes/ClientRouter.tsx
import { Routes, Route } from "react-router-dom";
import { EventsPage, HomePage, Teams } from "../client/pages";
import PageLayout from "../client/layouts/PageLayout";

import { VersionProvider } from "./VersionContext";
import Sponsors from "../client/pages/sponsors/Sponsors";

interface ClientRouterProps {
  version: string;
}

export default function ClientRouter({ version }: ClientRouterProps) {
  return (
    <VersionProvider version={version}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="teams" element={<Teams />} />
        </Route>
      </Routes>
    </VersionProvider>
  );
}
