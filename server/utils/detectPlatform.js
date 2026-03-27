exports.detectPlatform = (url) => {
  if (url.includes("github.com")) return "github";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  return "unknown";
};
