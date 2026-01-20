// config/versions.ts
export const VERSIONS = [
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
] as const;
export const LATEST_VERSION = "v8";
export const OLD_VERSIONS = VERSIONS.filter((v) => v !== LATEST_VERSION);

export type Version = (typeof VERSIONS)[number];
