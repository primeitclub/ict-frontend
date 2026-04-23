import { Route, Routes } from "react-router-dom";
import { Dashboard, Versions } from "../pages";
import AdminLayout from "../../client/layouts/AdminLayout";
import ProtectedRoute from "./protected-route";
import ContentManagementRoutes from "../pages/content-management/ContentMngRoute";
import SponsorsRoute from "../pages/sponsors/sponsorsRoute";
import SettingsRoute from "../pages/settings/settingsRoute";
import LoginPage from "../pages/login/LoginPage";
import PeopleRoute from "../pages/people/PeopleRoute";

export default function AdminRouter() {
  return (
    // enter point for admin layout, includes protected route
    <Routes>
      <Route path="login" element={<LoginPage />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />

                <Route path="versions" element={<Versions />} />

                <Route
                  path="content-management/*"
                  element={<ContentManagementRoutes />}
                />

                <Route path="people/*" element={<PeopleRoute />} />

                <Route path="sponsors/*" element={<SponsorsRoute />} />

                <Route path="settings/*" element={<SettingsRoute />} />
              </Route>
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
