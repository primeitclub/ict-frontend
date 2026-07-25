/**
 * True when the edition being viewed is archived. Drives hiding of the Contacts
 * page (nav links + route), the "Join Our Sponsors" card, the home hero CTAs
 * ("Register Now" / "Be a Sponsor"), and the event-detail "Got Any Queries?"
 * button — an archived event is over, so there's nothing to register for,
 * sponsor, or ask about.
 *
 * Note: past editions are auto-archived when a newer version is activated, so
 * this is true for all past editions (v5–v7) as well as a manually-archived
 * current one.
 *
 * `isArchived` stays false while the version query is loading so active-version
 * UI doesn't flash out and back in. Callers that must not render-then-redirect
 * (the Contacts route) should gate on `isLoading` first.
 */
import { useVersionData } from "./use-version-data";

export function useIsArchivedVersion(): { isArchived: boolean; isLoading: boolean } {
  const { isArchived, isLoading } = useVersionData();
  return { isArchived: !isLoading && isArchived, isLoading };
}
