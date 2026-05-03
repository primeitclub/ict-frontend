import { EventVersionStatus } from "../types/version";

export const statusColors = {
  [EventVersionStatus.ACTIVE]: "text-green-400 bg-green-400/10",
  [EventVersionStatus.DRAFT]: "text-yellow-400 bg-yellow-400/10",
  [EventVersionStatus.ARCHIVED]: "text-gray-400 bg-gray-400/10",
};
