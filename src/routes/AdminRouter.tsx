import { Routes, Route } from "react-router-dom";
import { ContactPage, HomePage } from "../client/pages";
import PageLayout from "../client/layouts/PageLayout";

export default function AdminRouter() {
  //fetch versions (to dynamic routing)
  const versions = [
    { id: 1, name: "version-1", current: true },
    { id: 2, name: "version-2", current: false },
    { id: 3, name: "version-3", current: false },
  ];

  return (
    <Routes>
      {versions.map((version) => (
        <Route
          key={`${version.id}-${version.name}`}
          path={`/${version.current ? "" : version.name}`}
          element={<PageLayout />}
        >
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      ))}
    </Routes>
  );
}
