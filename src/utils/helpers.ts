/**
 * Converts a Google Drive URL to a direct thumbnail URL
 * @param url The original URL (can be Google Drive or any other URL)
 * @returns A direct thumbnail URL for Google Drive images, or the original URL for others
 */
export const getImageUrl = (url: string): string => {
  if (!url) return '';
  const fileId = url.match(/[-\w]{25,}/);
  return fileId ? `https://drive.google.com/thumbnail?id=${fileId[0]}&sz=w1000` : url;
};

/**
 * Scrolls the window to the top with a smooth animation
 * @param options Optional ScrollToOptions
 */
export const scrollToTop = (options: ScrollToOptions = { behavior: 'smooth' }) => {
  window.scrollTo({ top: 0, ...options });
};