import { useEffect } from "react";
import { useHome } from "../pages/home/useHome";
import { getImageUrl } from "../../lib/imageUtils";

const DEFAULT_FAVICON = "/favicon.svg";

/** Points the browser tab icon at the current edition's logo, falling back to the static default. */
export function useFavicon() {
  const { data: logo } = useHome((d) => d.edition.logoPath ?? d.edition.logo);

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>("#favicon");
    if (!link) return;

    link.href = logo ? getImageUrl(logo) : DEFAULT_FAVICON;

    return () => {
      link.href = DEFAULT_FAVICON;
    };
  }, [logo]);
}
