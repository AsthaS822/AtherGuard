const axios = require("axios");

exports.fetchGithubData = async (owner, repo) => {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  };

  const issues = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues?per_page=15&state=all`,
    { headers }
  );

  const commentsList = issues.data.map(issue => ({
    text: issue.body || issue.title || "",
    author: issue.user?.login || "Anonymous",
    date: issue.created_at || new Date().toISOString()
  }));

  return commentsList;
};
