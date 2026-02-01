import { Route, Routes } from "react-router-dom";
import AdminLayout from "../client/layouts/AdminLayout";

import { Dashboard } from "../admin/pages";

export default function AdminRouter() {
  return (
    <>
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
    </>
  );
}
