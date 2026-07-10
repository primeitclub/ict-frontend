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
  
  // Assuming the API is running at http://localhost:4000
  // In production, you would use import.meta.env.VITE_API_BASE_URL
  const baseUrl = "http://localhost:4000";
  
  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};
