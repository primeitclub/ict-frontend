import { Route, Routes } from "react-router-dom";
import { Dashboard, Events, Settings } from "../pages";
import AdminLayout from "../../client/layouts/AdminLayout";
import ProtectedRoute from "./protected-route";

export default function AdminRouter() {
  return (
    // enter point for admin layout,includes protected route
    <ProtectedRoute>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
}
