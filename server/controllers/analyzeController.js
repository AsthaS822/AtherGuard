const { 
  cleanText, 
  classify, 
  classifyGithubIssue, 
  getGithubAction, 
  getAction 
} = require("../utils/classifier");
const { detectPlatform } = require("../utils/detectPlatform");
const { fetchGithubData } = require("../services/githubService");
const { fetchYoutubeComments } = require("../services/youtubeService");
const { analyzeText } = require("../services/moderationService");
const admin = require("../firebase-admin");

const db = admin.firestore();

// Log feed fetch
exports.getLogs = async (req, res) => {
  try {
    const userId = req.user.uid;
    const snapshot = await db.collection("logs")
      .where("userId", "==", userId)
      .limit(10) 
      .get();

    let logs = [];
    snapshot.forEach(doc => {
        logs.push({ id: doc.id, ...doc.data() });
    });

    // Memory sort to avoid index requirement
    logs.sort((a, b) => {
        const t1 = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const t2 = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return t2 - t1;
    });

    let items = [];
    logs.forEach(log => {
      if (log.items && Array.isArray(log.items)) {
          items.push(...log.items);
      }
    });

    res.json(items.slice(0, 50));
  } catch (err) {
    console.error("Log fetch failed:", err);
    res.status(500).json({ error: err.message });
  }
};

// Analysis engine
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
        return res.status(400).json({ error: "Invalid GitHub URL" });
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

      const cleaned = cleanText(item.text);
      const ai = await analyzeText(cleaned);

      let label, actionData;

      if (platform === "github") {
        label = classifyGithubIssue(cleaned, ai);
        const githubAction = getGithubAction(label);
        actionData = { action: githubAction.action, ...githubAction };
      } else {
        label = classify(cleaned, ai, customWords);
        actionData = { action: getAction(label) };
      }

      analyzed.push({
        text: item.text,
        author: item.author,
        date: item.date,
        moderation: {
          score: Math.max(ai.toxicity || 0, ai.insult || 0, ai.threat || 0),
          label,
          ...actionData
        }
      });
    }

    const summary = {
      total: analyzed.length,
      toxic: analyzed.filter(i => i.moderation.label === "toxic").length,
      spam: analyzed.filter(i => i.moderation.label === "spam").length,
      abusive: analyzed.filter(i => i.moderation.label === "abusive").length,
      threat: analyzed.filter(i => i.moderation.label === "threat").length,
      suspicious: analyzed.filter(i => i.moderation.label === "suspicious").length,
      safe: analyzed.filter(i => ["safe", "normal", "valid"].includes(i.moderation.label)).length
    };

    // Database updates
    try {
      // Save aggregate stats
      await db.collection("analytics").doc(userId).set({
        totalScanned: admin.firestore.FieldValue.increment(analyzed.length),
        toxicCount: admin.firestore.FieldValue.increment(summary.toxic),
        safeCount: admin.firestore.FieldValue.increment(summary.safe),
        lastUpdated: new Date()
      }, { merge: true });

      // Save full logs
      await db.collection("logs").add({
        userId,
        url,
        platform,
        items: analyzed,
        summary,
        createdAt: new Date()
      });

      // Individual scan entry
      await db.collection("users")
        .doc(userId)
        .collection("scans")
        .add({
          platform,
          totalScannedItems: summary.total,
          safeCount: summary.safe,
          toxicCount: summary.toxic,
          spamCount: summary.spam,
          abusiveCount: summary.abusive,
          threatCount: summary.threat,
          suspiciousCount: summary.suspicious,
          timestamp: new Date()
        });

    } catch (dbErr) {
      console.warn("DB update failed:", dbErr.message);
    }

    res.json({ items: analyzed, summary });

  } catch (err) {
    console.error("Analysis Error:", err);
    res.status(500).json({ error: "Server encountered a problem during analysis." });
  }
};
