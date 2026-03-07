// routes/ClientRouter.tsx
import { Routes, Route } from "react-router-dom";
import { EventsPage, HomePage } from "../client/pages";
import PageLayout from "../client/layouts/PageLayout";
import { VersionProvider } from "./VersionContext";
import SponserSection from "../client/pages/home/sections/sponser-section/SponserSection";
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
          <Route path="sponsors" element={<Sponsors/>} />
        </Route>
      </Routes>
    </VersionProvider>
  );
}
