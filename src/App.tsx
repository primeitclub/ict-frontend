// App.tsx
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClientRouter from "./client/routes/ClientRouter";
import { LATEST_VERSION } from "./client/routes/route-type";
import { ictClient } from "./lib/api-client";
import { API_ROUTES } from "./lib/api-routes";

interface VersionItem {
  id: string;
  slug: string;
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
  const latestRouteVersion = currentItem ? toRouteVersion(currentItem.version_number) : LATEST_VERSION;
  const latestSlug = currentItem?.slug ?? LATEST_VERSION;

  const oldItems = items.filter((v) => !v.is_current);

  return (
    <Routes>
      {oldItems.map((item) => {
        const routeVersion = toRouteVersion(item.version_number);
        return (
          <Route
            key={routeVersion}
            path={`/${routeVersion}/*`}
            element={<ClientRouter version={routeVersion} slug={item.slug} isLatest={false} latestVersion={latestRouteVersion} />}
          />
        );
      })}
      {/* Also match the current version by its slug/routeVersion (e.g. /v9/*) */}
      <Route
        path={`/${latestRouteVersion}/*`}
        element={<ClientRouter version={latestRouteVersion} slug={latestSlug} isLatest={true} latestVersion={latestRouteVersion} />}
      />
      <Route
        path="/*"
        element={<ClientRouter version={latestRouteVersion} slug={latestSlug} isLatest={true} latestVersion={latestRouteVersion} />}
      />
    </Routes>
  );
}

export default App;
