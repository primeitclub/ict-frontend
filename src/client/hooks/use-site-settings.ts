import { useApiQuery } from "../../lib";

export interface SiteSettingsData {
  clubEmail: string | null;
  clubPhoneNumber: string | null;
  socialMediaLinks: { platform: string; link: string }[] | null;
  qrCodeUrl: string | null;
}

interface Envelope<T> {
  status: string;
  message: string;
  data: T;
}

/**
 * Global, non-versioned club settings (club email/phone, social links,
 * payment QR code) — same for every version, so this fetches unconditionally
 * with no versionId dependency, unlike the per-version settings queries.
 */
export function useSiteSettings() {
  const { data, isLoading } = useApiQuery("siteSettings")<
    Envelope<SiteSettingsData | null>
  >();

  return { data: data?.data ?? null, isLoading };
}
