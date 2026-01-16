import { Routes, Route, useParams } from "react-router-dom";
import ClientRouter from "./routes/ClientRouter";
import AdminRouter from "./routes/AdminRouter";
import { VersionConifg } from "./routes/utils/route-type";

function VersionedClientRouter() {
  const { version } = useParams<{ version: string }>();
  return <ClientRouter version={version || VersionConifg.latest} />;
}

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={<ClientRouter version={VersionConifg.latest} />}
      />
      <Route path="/:version/*" element={<VersionedClientRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default App;
