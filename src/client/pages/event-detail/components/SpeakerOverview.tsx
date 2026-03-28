import { SPEAKERS } from "../data";
import { SpeakerCard } from "./SpeakerCard";

export const SpeakerOverview = () => {
  return (
    <div>
      {SPEAKERS.map((speaker, i) => (
        <SpeakerCard key={i} {...speaker} />
      ))}
    </div>
  );
};
