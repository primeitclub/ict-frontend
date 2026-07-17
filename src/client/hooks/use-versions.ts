/**
 * Route-version keys (e.g. ["v8", "v7", "v7.5"]) for every published edition,
 * newest first. Returns [] until the request resolves (and when the backend
 * has no published editions) — callers hide their version UI when the list is
 * empty rather than showing a stale hardcoded fallback. Shared by the desktop
 * version rail (VersionNavigate) and the mobile hamburger menu (Navbar) so
 * both always show the same editions.
 */
import { useApiQuery } from "../../lib";

interface VersionItem {
  id: string;
  version_number: string;
  status: "active" | "archived" | "draft";
}

interface VersionsResponse {
  status: string;
  data: { items: VersionItem[] };
}

/** Converts API version_number to route key: "8.0" → "v8", "7.5" → "v7.5" */
function toRouteVersion(versionNumber: string): string {
  const n = parseFloat(versionNumber);
  return `v${n % 1 === 0 ? Math.floor(n) : n}`;
}

export function useVersions(): string[] {
  const { data } = useApiQuery("versions")<VersionsResponse>({
    queryParams: { limit: 50 },
  });

  return data?.data?.items
    ? data.data.items
        .filter((v) => v.status !== "draft")
        .map((v) => toRouteVersion(v.version_number))
        .filter((v, i, arr) => arr.indexOf(v) === i) // deduplicate
    : [];
}
