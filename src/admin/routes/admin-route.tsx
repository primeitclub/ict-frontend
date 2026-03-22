import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages";
import AdminLayout from "../../client/layouts/AdminLayout";
import ProtectedRoute from "./protected-route";

export default function AdminRouter() {
  return (
    // enter point for admin layout,includes protected route
    <ProtectedRoute>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="setting"
            element={<Dashboard value="this is from the route" />}
          />
          {/* <Route path="events" element={<CreatePage />} /> */}
        </Route>
      </Routes>
    </ProtectedRoute>
  );
}
