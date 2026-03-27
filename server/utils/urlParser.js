/**
 * Detects platform and extracts IDs from YouTube or GitHub URLs.
 * @param {string} url - The URL to parse.
 * @returns {object} { platform, type, id }
 */
exports.parseUrl = (url) => {
  if (!url) return null;

  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    let channelId = "";

    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("/channel/")) {
      channelId = url.split("/channel/")[1]?.split("/")[0];
    }

    if (videoId) return { platform: "youtube", type: "video", id: videoId };
    if (channelId) return { platform: "youtube", type: "channel", id: channelId };
  }

  // GitHub
  if (url.includes("github.com")) {
    const parts = url.replace("https://", "").replace("http://", "").split("/");
    // github.com/user/repo
    if (parts.length >= 3) {
      return { platform: "github", type: "repo", id: `${parts[1]}/${parts[2]}` };
    }
  }

  return { platform: "unknown", type: "unknown", id: "" };
};
