import { useHome } from "../pages/home/useHome";
import { useEventsList } from "../pages/event/useEvents";

/**
 * True only when the edition being viewed IS the current one AND it has no
 * published events. Drives hiding of the Events nav item (navbar + footer) and
 * the landing-page "Register Now" CTA — there's nothing to browse or register
 * for yet.
 *
 * Returns false while either query is still loading so links don't flash out
 * and back in, and never affects past (non-current) editions, which keep their
 * Events link regardless.
 */
export function useCurrentEditionHasNoEvents(): boolean {
  const { data: isCurrent } = useHome((d) => d.edition.isCurrent);
  const { events, isLoading } = useEventsList();
  return isCurrent === true && !isLoading && events.length === 0;
}
