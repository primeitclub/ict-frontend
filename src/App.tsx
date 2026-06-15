// App.tsx
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClientRouter from "./client/routes/ClientRouter";
import { LATEST_VERSION } from "./client/routes/route-type";
import { ictClient } from "./lib/api-client";
import { API_ROUTES } from "./lib/api-routes";

interface VersionItem {
  id: string;
  version_number: string;
  status: "active" | "archived" | "draft";
  is_current: boolean;
}

interface VersionsResponse {
  status: string;
  data: { items: VersionItem[] };
}

/** Converts API version_number to URL route key: "8.0" → "v8", "7.5" → "v7.5" */
function toRouteVersion(versionNumber: string): string {
  const n = parseFloat(versionNumber);
  return `v${n % 1 === 0 ? Math.floor(n) : n}`;
}

function App() {
  const { data } = useQuery<VersionsResponse>({
    queryKey: [API_ROUTES.versions],
    queryFn: () => ictClient.get<VersionsResponse>(API_ROUTES.versions, { limit: 50 }),
    staleTime: 5 * 60 * 1000,
  });

  const items = data?.data?.items?.filter((v) => v.status !== "draft") ?? [];

  const currentItem = items.find((v) => v.is_current);
  const latestVersion = currentItem ? toRouteVersion(currentItem.version_number) : LATEST_VERSION;
  const oldVersions = items
    .filter((v) => !v.is_current)
    .map((v) => toRouteVersion(v.version_number))
    .filter((v, i, arr) => arr.indexOf(v) === i);

  return (
    <Routes>
      {oldVersions.map((version) => (
        <Route
          key={version}
          path={`/${version}/*`}
          element={<ClientRouter version={version} />}
        />
      ))}
      <Route path="/*" element={<ClientRouter version={latestVersion} />} />
    </Routes>
  );
}

export default App;
