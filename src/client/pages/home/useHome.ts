/**
 * Single data source for the landing page.
 *
 * Every section calls this hook; because the query key is identical per
 * edition, they all share ONE request + cache entry. Pass a `select` to read
 * just your slice — React Query memoizes the transform, so a section only
 * re-renders when its slice changes.
 *
 *   const { data: hero } = useHome(d => d.sections.hero);
 *
 * Version scoping is path-based: the current edition hits `/content`, an older
 * edition hits `/content/:slug` (slug = the version string from the route).
 */
import { useQuery } from "@tanstack/react-query";
import { ictClient } from "../../../lib/api-client";
import { API_ROUTES } from "../../../lib/api-routes";
import { useVersion } from "../../routes/VersionContext";
import type { HomeContent } from "./types";

// Backend wraps every response as { status, message, data }. ictClient returns
// it raw, so we unwrap `.data` here.
interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

export function useHome<T = HomeContent>(select?: (d: HomeContent) => T) {
  const { version, isLatest } = useVersion();

  const path = isLatest
    ? API_ROUTES.homeContent
    : API_ROUTES.homeContentBySlug.replace("${slug}", encodeURIComponent(version));

  return useQuery({
    queryKey: ["home", isLatest ? "current" : version],
    queryFn: async () => {
      const res = await ictClient.get<Envelope<HomeContent>>(path);
      return res.data;
    },
    select,
  });
}
