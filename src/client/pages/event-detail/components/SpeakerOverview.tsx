import { SpeakerCard } from "./SpeakerCard";
import type { EventDetailData, EventDetailSpeaker } from "../useEventDetail";

interface SpeakerOverviewProps {
  event: EventDetailData;
}

const toCardProps = (speaker: EventDetailSpeaker) => ({
  name: speaker.name,
  role: speaker.designation,
  company: speaker.company ?? undefined,
  bio: speaker.description ?? undefined,
  image: speaker.imageUrl ?? "",
  socials: speaker.socialLinks
    ? {
        instagram: speaker.socialLinks.instagram,
        portfolio: speaker.socialLinks.portfolio,
        linkedin: speaker.socialLinks.linkedin,
      }
    : undefined,
});

export const SpeakerOverview = ({ event }: SpeakerOverviewProps) => {
  const speakers = event.speakers ?? [];

  if (speakers.length === 0) {
    return (
      <p className="text-gray-500 py-4">No speaker information available.</p>
    );
  }

  // Single column on every breakpoint — mobile stacks the cards too (no swiper).
  return (
    <div className="flex flex-col gap-6">
      {speakers.map((speaker) => (
        <SpeakerCard key={speaker.id} {...toCardProps(speaker)} />
      ))}
    </div>
  );
};
