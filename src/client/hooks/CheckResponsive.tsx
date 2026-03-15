import { useSyncExternalStore } from "react";

const getDeviceType = () => {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export default function useWindowBreakPoints() {
  return useSyncExternalStore(subscribe, getDeviceType, () => "desktop");
}
