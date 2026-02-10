// App.tsx
import { Routes, Route } from "react-router-dom";
import ClientRouter from "./routes/ClientRouter";
import AdminRouter from "./routes/AdminRouter";
import { OLD_VERSIONS, LATEST_VERSION } from "./routes/utils/route-type";

function App() {
  return (
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
  );
}

export default App;
