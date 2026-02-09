// config/versions.ts
export const VERSIONS = [
  "v8",
  "v7",
  "v6",
  "v5"
] ;
export const LATEST_VERSION = "v8";
export const OLD_VERSIONS = VERSIONS.filter((v) => v !== LATEST_VERSION);

export type Version = (typeof VERSIONS)[number];
