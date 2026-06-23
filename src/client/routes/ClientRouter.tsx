// routes/ClientRouter.tsx
import { Routes, Route } from "react-router-dom";
import {
  EventsPage,
  HomePage,
  Teams,
  Sponsors,
  Register,
  PaymentSuccess,
} from "../pages";
import PageLayout from "../layouts/PageLayout";
import { VersionProvider } from "./VersionContext";
import { EventsDetail } from "../pages/event-detail/types";
import ContactUs from "../pages/contact-us/ContactUs";

interface ClientRouterProps {
  version: string;
  slug: string;
  isLatest: boolean;
  latestVersion: string;
}

export default function ClientRouter({ version, slug, isLatest, latestVersion }: ClientRouterProps) {



  return (
    <VersionProvider version={version} slug={slug} isLatest={isLatest} latestVersion={latestVersion}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="teams" element={<Teams />} />
          <Route path="register" element={<Register />} />
          <Route path="success" element={<PaymentSuccess />} />
          <Route path="event-detail/:eventId" element={<EventsDetail />} />
          <Route path="contacts" element={<ContactUs />} />
        </Route>
      </Routes>
    </VersionProvider>
  );
}
