// routes/ClientRouter.tsx
import { Routes, Route } from "react-router-dom";
import {
  EventsPage,
  HomePage,
  Teams,
  Sponsors,
  Register,
} from "../client/pages";
import PageLayout from "../client/layouts/PageLayout";

import { VersionProvider } from "./VersionContext";
import { EventsDetail } from "../client/pages/event-detail/types";

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
          <Route path="register" element={<Register />} />
          <Route path="event-detail" element={<EventsDetail />} />
        </Route>
      </Routes>
    </VersionProvider>
  );
}
