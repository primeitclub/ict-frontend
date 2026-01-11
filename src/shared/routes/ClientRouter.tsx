import { Routes, Route } from "react-router-dom";
import PageLayout from "../../client/layouts/PageLayout";
import { AboutPage, ContactPage, HomePage } from "../../client/pages";

export default function ClientRouter() {
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
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      ))}
    </Routes>
  );
}
