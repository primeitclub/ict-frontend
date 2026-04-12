import { Route, Routes, Navigate } from "react-router-dom";
import {
  Dashboard,
  Versions,
  Hero,
  About,
  ContentEvents,
  Gallery,
  Faqs,
  Speakers,
  Teams,
  Categories,
  AllSponsors,
  SponsorsArchive,
  SocialMediaProfile,
  ContactManagement,
  PaymentSetup,
  ContentManagementLayout,
  PeopleLayout,
  SponsorsLayout,
  SettingsLayout,
  HeroForm,
  AboutForm,
  EventsForm,
  GalleryForm,
  FaqsForm,
  SpeakersForm,
  TeamsForm,
} from "../pages";
import AdminLayout from "../../client/layouts/AdminLayout";
import ProtectedRoute from "./protected-route";

export default function AdminRouter() {
  return (
    // enter point for admin layout, includes protected route
    <ProtectedRoute>
      <Routes>
        <Route element={<AdminLayout />}>
          {/* Home */}
          <Route index element={<Dashboard />} />
          <Route path="versions" element={<Versions />} />

          {/* Content Management */}
          <Route
            path="content-management"
            element={<ContentManagementLayout />}
          >
            <Route index element={<Navigate to="hero" replace />} />
            <Route path="hero">
              <Route index element={<Hero />} />
              <Route path="add" element={<HeroForm />} />
            </Route>
            <Route path="about">
              <Route index element={<About />} />
              <Route path="add" element={<AboutForm />} />
            </Route>
            <Route path="events">
              <Route index element={<ContentEvents />} />
              <Route path="add" element={<EventsForm />} />
            </Route>
            <Route path="gallery">
              <Route index element={<Gallery />} />
              <Route path="add" element={<GalleryForm />} />
            </Route>
            <Route path="faqs">
              <Route index element={<Faqs />} />
              <Route path="add" element={<FaqsForm />} />
            </Route>
          </Route>

          {/* People */}
          <Route path="people" element={<PeopleLayout />}>
            <Route index element={<Navigate to="speakers" replace />} />
            <Route path="speakers">
              <Route index element={<Speakers />} />
              <Route path="add" element={<SpeakersForm />} />
            </Route>
            <Route path="teams">
              <Route index element={<Teams />} />
              <Route path="add" element={<TeamsForm />} />
            </Route>
          </Route>

          {/* Sponsors */}
          <Route path="sponsors" element={<SponsorsLayout />}>
            <Route index element={<Navigate to="categories" replace />} />
            <Route path="categories" element={<Categories />} />
            <Route path="all-sponsors" element={<AllSponsors />} />
            <Route path="archive" element={<SponsorsArchive />} />
          </Route>

          {/* Settings */}
          <Route path="settings" element={<SettingsLayout />}>
            <Route
              index
              element={<Navigate to="social-media-profile" replace />}
            />
            <Route
              path="social-media-profile"
              element={<SocialMediaProfile />}
            />
            <Route path="contact-management" element={<ContactManagement />} />
            <Route path="payment-setup" element={<PaymentSetup />} />
          </Route>
        </Route>
      </Routes>
    </ProtectedRoute>
  );
}
