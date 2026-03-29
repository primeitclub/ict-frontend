// App.tsx
import { Routes, Route } from "react-router-dom";
import ClientRouter from "./client/routes/ClientRouter";
import { OLD_VERSIONS, LATEST_VERSION } from "./client/routes/route-type";
import AdminRouter from "./admin/routes/admin-route";
// import ScrollToTop from "./global-wrappers/ScrollToTop";

function App() {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />

        {OLD_VERSIONS.map((version) => (
          <Route
            key={version}
            path={`/${version}/*`}
            element={<ClientRouter version={version} />}
          />
        ))}

        <Route path="/*" element={<ClientRouter version={LATEST_VERSION} />} />
      </Routes>
    </>
  );
}

export default App;
