import { useApiMutation } from "../use-api-mutation";
import type { HeroSection } from "../../admin/types/hero";

export interface CreateHeroSectionPayload {
  flagshipEventVersionId: string;
  heading: string;
  paragraph: string;
  extraOptions: {
    add_cta: { cta_title: string; cta_url: string }[];
  };
}

export default function useCreateHeroSection() {
  return useApiMutation("heroSections")<
    { data: HeroSection },
    CreateHeroSectionPayload
  >({ method: "POST", invalidateRoutes: ["heroSections"] });
}
