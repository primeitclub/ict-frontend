// Utility to get the absolute URL for images, falling back to local host if it's a relative path

export const getImageUrl = (url?: string | null): string => {
  if (!url) return "";
  
  // If the URL is already absolute (Cloudinary, external, base64, or blob), return it
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }
  
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";
  // Uploaded files are served from the API origin, not under /api itself.
  const baseUrl = apiBaseUrl.replace(/\/api\/?$/, "");

  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};
