// routes/ClientRouter.tsx
import { Routes, Route } from "react-router-dom";
import { EventsPage, HomePage, Teams, Sponsors } from "../pages";
import PageLayout from "../layouts/PageLayout";
import { VersionProvider } from "./VersionContext";

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
