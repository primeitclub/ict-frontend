import { Navigate, Route, Routes } from "react-router-dom";
import { Login, HomeRouter } from "../pages";
import AdminLayout from "../../client/layouts/AdminLayout";
import ProtectedRoute from "./protected-route";

import ContentManagementRouter from "../pages/content-management/ContentMngRoute";
import PeopleRouter from "../pages/people/PeopleRoute";
import SettingsRouter from "../pages/settings/SettingsRoute";
import SponsorsRouter from "../pages/sponsors/SponsorsRoute";

export default function AdminRouter() {
  return (
    // enter point for admin layout, includes protected route
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route element={<AdminLayout />}>
                <Route
                  index
                  element={<Navigate to="/admin/home/dashboard" replace />}
                />
                {/* Home / Dashboard / Versions */}
                <Route path="home/*" element={<HomeRouter />} />

                {/* Content Management */}
                <Route
                  path="content-management/*"
                  element={<ContentManagementRouter />}
                />

                {/* People */}
                <Route path="people/*" element={<PeopleRouter />} />

                {/* Sponsors */}
                <Route path="sponsors/*" element={<SponsorsRouter />} />

                {/* Settings */}
                <Route path="settings/*" element={<SettingsRouter />} />
              </Route>
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
