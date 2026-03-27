const axios = require("axios");

exports.fetchYoutubeComments = async (videoId) => {
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/commentThreads`,
    {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: "snippet",
        videoId,
        maxResults: 50
      }
    }
  );

  return res.data.items.map(item => {
    const comment = item.snippet.topLevelComment.snippet;
    return {
      text: comment.textDisplay || "",
      author: comment.authorDisplayName || "Anonymous",
      date: comment.publishedAt || new Date().toISOString()
    };
  });
};
