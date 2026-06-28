/**
 * Returns the full version record (including UUID) for the active edition.
 * Teams and Sponsors pages need the UUID to filter their API queries.
 */
import { useApiQuery } from "../../lib";
import { useVersion } from "../routes/VersionContext";

export interface VersionRecord {
  id: string;
  slug: string;
  version_name: string;
  is_current: boolean;
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

export function useVersionData() {
  const { isLatest, version } = useVersion();

  const currentQuery = useApiQuery("currentVersion")<Envelope<VersionRecord>>({
    enabled: isLatest,
  });

  const slugQuery = useApiQuery("versionBySlug")<Envelope<VersionRecord>>({
    pathParams: { slug: version },
    enabled: !isLatest,
  });

  const active = isLatest ? currentQuery : slugQuery;

  return {
    versionId: active.data?.data?.id ?? null,
    isLoading: active.isLoading,
  };
}
