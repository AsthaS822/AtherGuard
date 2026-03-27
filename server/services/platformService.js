const axios = require('axios');

/**
 * Fetches comments from YouTube video.
 * @param {string} videoId 
 * @returns {Array} normalized items
 */
exports.fetchYouTubeData = async (videoId) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads`,
      {
        params: {
          part: "snippet",
          videoId,
          maxResults: 50,
          key: process.env.YOUTUBE_KEY,
        },
      }
    );

    return res.data.items.map(item => ({
      text: item.snippet.topLevelComment.snippet.textOriginal,
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      date: item.snippet.topLevelComment.snippet.publishedAt
    }));
  } catch (error) {
    console.error("YouTube API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch YouTube data");
  }
};

/**
 * Fetches issues from GitHub repo.
 * @param {string} repoPath (owner/repo)
 * @returns {Array} normalized items
 */
exports.fetchGitHubData = async (repoPath) => {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${repoPath}/issues`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Optional: Add GITHUB_TOKEN if rate limit is an issue
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
      }
    );

    return res.data.map(issue => ({
      text: issue.title + (issue.body ? " " + issue.body : ""),
      author: issue.user.login,
      date: issue.created_at
    }));
  } catch (error) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch GitHub data");
  }
};
