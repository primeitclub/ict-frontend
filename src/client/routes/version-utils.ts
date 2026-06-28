/** Converts API version_number to URL route key: "8.0" → "v8", "7.5" → "v7.5" */
export function toRouteVersion(versionNumber: string | number): string {
  const n = parseFloat(String(versionNumber));
  return `v${n % 1 === 0 ? Math.floor(n) : n}`;
}

export interface EditionListItem {
  version_number: string | number;
  slug: string;
}

/** Map a route key (e.g. "v8") to the edition slug stored in the API. */
export function resolveEditionSlug(
  routeVersion: string,
  editions: EditionListItem[],
): string {
  const match = editions.find(
    (edition) => toRouteVersion(edition.version_number) === routeVersion,
  );
  return match?.slug ?? routeVersion;
}
