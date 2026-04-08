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
          <Route path="success" element={<PaymentSuccess />} />
          <Route path="event-detail" element={<EventsDetail />} />
          <Route path="contacts" element={<ContactUs />} />
        </Route>
      </Routes>
    </VersionProvider>
  );
}
