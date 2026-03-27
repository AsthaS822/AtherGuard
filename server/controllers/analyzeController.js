const { detectPlatform } = require("../utils/detectPlatform");
const { fetchGithubData } = require("../services/githubService");
const { fetchYoutubeComments } = require("../services/youtubeService");
const { analyzeText } = require("../services/moderationService");
const { classify } = require("../utils/classifier");
const { generateAnalytics } = require("../services/analyticsService");
const admin = require("../firebase-admin");

const db = admin.firestore();

exports.analyze = async (req, res) => {
  try {
    const { url, customWords = [] } = req.body;
    const userId = req.user.uid;

    const platform = detectPlatform(url);
    let texts = [];

    if (platform === "github") {
      const parts = url.split("github.com/")[1]?.split("/");
      const owner = parts?.[0];
      const repo = parts?.[1];

      if (!owner || !repo) {
        return res.status(400).json({ error: "Invalid GitHub URL format. Ex: https://github.com/owner/repo" });
      }

      texts = await fetchGithubData(owner, repo);
    } 
    else if (platform === "youtube") {
      const match = url.match(/v=([^&]+)/);
      const videoId = match ? match[1] : null;

      if (!videoId) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }

      texts = await fetchYoutubeComments(videoId);
    } 
    else {
      return res.status(400).json({ error: "Unsupported platform" });
    }

    const analyzed = [];

    for (let item of texts) {
      if (!item.text) continue;

      const ai = await analyzeText(item.text);
      let label = "safe";
      if (ai.toxicity > 0.70) label = "toxic";
      else if (ai.spam > 0.70) label = "spam";
      else if (ai.insult > 0.70) label = "abusive";
      
      // Override with custom word classifier if needed
      label = classify(item.text, ai, customWords) !== "safe" ? classify(item.text, ai, customWords) : label;

      analyzed.push({
        text: item.text,
        author: item.author,
        date: item.date,
        moderation: {
          score: ai.toxicity || 0,
          label
        }
      });
    }

    const summary = {
      total: analyzed.length,
      toxic_total: analyzed.filter(i => i.moderation.label === "toxic").length,
      spam: analyzed.filter(i => i.moderation.label === "spam").length,
      safe: analyzed.filter(i => i.moderation.label === "safe").length,
      abusive: analyzed.filter(i => i.moderation.label === "abusive").length
    };

    // ✅ Fault-Tolerant Firestore save
    try {
      await db.collection("analytics").doc(userId).set(
        {
          totalScanned: admin.firestore.FieldValue.increment(analyzed.length),
          lastUpdated: new Date()
        },
        { merge: true }
      );

      await db.collection("logs").add({
        userId,
        url,
        platform,
        items: analyzed,
        summary,
        createdAt: new Date()
      });

      await db.collection("users")
        .doc(userId)
        .collection("scans")
        .add({
          platform: platform,
          toxicCount: summary.toxic_total,
          safeCount: summary.safe,
          totalScannedItems: summary.total,
          timestamp: new Date()
        });

    } catch (dbErr) {
      console.warn("Firestore Logging Skipped:", dbErr.message);
    }

    res.json({ items: analyzed, summary });

  } catch (err) {
    console.error("Analyze Error:", err);
    res.status(500).json({ error: err.message });
  }
};
