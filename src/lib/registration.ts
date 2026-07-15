/**
 * An event may carry an external registration URL (e.g. a Google Form). When it
 * does, it takes precedence over the in-app registration page.
 *
 * The http(s) check is deliberate: it both decides precedence and keeps a
 * malformed or hostile value (javascript:, data:) from ever being navigated to.
 * The API validates this on write, but rows created before that existed — or
 * written by anything other than the admin form — are not guaranteed clean.
 */
export const isExternalRegisterLink = (
  link?: string | null,
): link is string => !!link && /^https?:\/\/.+/i.test(link.trim());

/**
 * Sends the user to an event's registration: the external link when present,
 * otherwise the in-app form via the caller's router `navigate`.
 */
export const goToRegistration = (
  registerLink: string | null | undefined,
  inAppPath: string,
  navigate: (path: string) => void,
): void => {
  if (isExternalRegisterLink(registerLink)) {
    window.location.href = registerLink.trim();
    return;
  }
  navigate(inAppPath);
};
