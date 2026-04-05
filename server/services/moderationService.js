const axios = require("axios");

exports.analyzeText = async (text) => {
  try {
    const res = await axios.post(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_API_KEY}`,
      {
        comment: { text },
        requestedAttributes: {
          TOXICITY: {},
          INSULT: {},
          THREAT: {},
          SPAM: {}
        }
      }
    );

    const scores = res.data.attributeScores;

    return {
      toxicity: scores.TOXICITY?.summaryScore?.value || 0,
      insult: scores.INSULT?.summaryScore?.value || 0,
      threat: scores.THREAT?.summaryScore?.value || 0,
      spam: scores.SPAM?.summaryScore?.value || 0
    };
  } catch (err) {
    console.error("Perspective API Error:", err.message);
    return { toxicity: 0, insult: 0, spam: 0 };
  }
};
