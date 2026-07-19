import { useApiQuery } from "../../lib";
import { useVersionData } from "./use-version-data";

interface PaginatedResult<T> {
  items: T[];
  meta: { total: number; page: number; limit: number };
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

/**
 * True when the active (currently viewed) version has no team members to
 * display. Drives hiding of the Teams nav item (navbar + footer) — mirrors how
 * the Events link is hidden when there's nothing to show.
 *
 * Uses the same query key as the Teams page's default "all categories" fetch
 * (`teamMembers` + versionId + limit 200) so it shares that cache instead of
 * firing a second request. Returns false while loading so the link doesn't
 * flash out and back in.
 */
export function useActiveVersionHasNoTeams(): boolean {
  const { versionId } = useVersionData();
  const { data, isLoading } = useApiQuery("teamMembers")<
    Envelope<PaginatedResult<unknown>>
  >({
    queryParams: { versionId: versionId ?? undefined, limit: 200 },
    enabled: !!versionId,
  });
  const count = data?.data?.items?.length ?? 0;
  return !!versionId && !isLoading && count === 0;
}
