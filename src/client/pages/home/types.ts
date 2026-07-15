/**
 * Shape of the aggregated landing-page payload returned by `GET /api/content`
 * (and `/api/content/:slug`). Mirrors the backend ContentService output —
 * field names match the serialized TypeORM *property* names, which are NOT
 * uniform across modules (hero/faq are snake-ish, speaker/gallery/about are
 * camelCase). Typed from the entities; refine per section as each is wired.
 */

export interface Edition {
  slug: string;
  name: string;
  isCurrent: boolean;
  logo?: string | null;
  logoPath?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface HeroSection {
  id: string;
  heading: string | null;
  paragraph: string | null;
  /** Free-form JSON bag (event date, CTA labels, etc.) — shape TBD. */
  extraOptions: Record<string, unknown> | null;
}

export interface AboutContent {
  id: string;
  title: string | null;
  content: string | null;
  imageUrl: string | null;
  imagePath: string | null;
}

export interface SpeakerSocialLinks {
  instagram?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Speaker {
  id: string;
  name: string;
  designation: string;
  company: string | null;
  imageUrl: string | null;
  imagePath: string;
  displayOrder: number;
  socialLinks: SpeakerSocialLinks | null;
}

export interface GalleryImageItem {
  id: string;
  imagePath: string;
  cloudImageUrl: string;
  link?: string | null;
}

export interface Sponsor {
  id: string;
  name: string;
  link: string | null;
  imageUrl: string | null;
  imagePath: string;
  displayOrder: number;
  // `category` is the joined Category entity; left loose until SponserSection is wired.
  category?: unknown;
}

export interface FaqItem {
  id: string;
  title: string | null;
  description: string | null;
}

/** Published events for the edition; HighlightSection renders these. */
export interface HighlightItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  location: string;
  fee: string;
  totalSeats: number;
  /** Approved registrations for this event; remaining = totalSeats − bookedSeats. */
  bookedSeats: number;
  status: string;
  /** Category the event belongs to; drives the landing-page category tabs. */
  categoryId: string;
  /** External registration URL; takes precedence over the in-app form. */
  registerLink: string | null;
}

export interface HomeContent {
  edition: Edition;
  sections: {
    hero: HeroSection | null;
    about: AboutContent | null;
    highlights: HighlightItem[];
    speakers: Speaker[];
    gallery: GalleryImageItem[];
    sponsors: Sponsor[];
    /** Present ONLY for the current edition — backend omits it for past ones. */
    faq?: FaqItem[];
  };
}
