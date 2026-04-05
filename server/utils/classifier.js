const franc = require("franc");

const detectLanguage = (text) => {
  const lang = franc(text);

  if (lang === "eng") return "english";
  if (lang === "hin") return "hindi";

  return "hinglish"; // fallback
};

// Clean text
const cleanText = (text) => {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .trim();
};

// Global spam check
const isSpam = (text) => {
  const patterns = [
    /http/i,
    /www/i,
    /buy now/i,
    /click here/i,
    /free/i,
    /subscribe/i
  ];
  return patterns.some(p => p.test(text));
};

// GitHub specific spam
const isGithubSpam = (text) => {
  const patterns = [
    /http[s]?:\/\/\S+/,
    /crypto|bitcoin/i,
    /telegram|whatsapp/i,
    /earn money/i,
    /^[^a-zA-Z0-9]{5,}$/
  ];
  return patterns.some(p => p.test(text));
};

// Classifier for YouTube/general
const classify = (text, ai, customWords = []) => {
  const lower = text.toLowerCase();

  // 1. Custom user-defined words
  if (customWords.some(word => lower.includes(word.toLowerCase()))) {
    return "flagged";
  }

  const bannedPatterns = customWords.map(w => new RegExp(w, "i"));
  if (bannedPatterns.some(p => p.test(lower))) {
    return "spam";
  }

  // 2. Strong rule-based abusive detection
  const abusivePatterns = [
    /dumb/i,
    /stupid/i,
    /hypocrite/i,
    /nepo/i,
    /flop actor/i,
    /irritating/i
  ];

  if (abusivePatterns.some(p => p.test(lower))) {
    if (ai.toxicity < 0.8) return "abusive"; 
  }

  // 3. Spam detection
  if (isSpam(lower)) return "spam";

  // 4. AI thresholds (fine-tuned)
  if (ai.threat > 0.65) return "threat";
  if (ai.toxicity > 0.7) return "toxic";
  if (ai.insult > 0.55) return "abusive";
  if (ai.toxicity > 0.35) return "suspicious";

  return "safe";
};

// GitHub issues
const classifyGithubIssue = (text, ai) => {
  if (isGithubSpam(text)) return "spam";
  if (text.length < 20) return "low_quality";
  if (/bug|error|fail|crash|not working/i.test(text)) return "bug";
  if (/feature|request|enhancement/i.test(text)) return "feature_request";
  if (/help|urgent/i.test(text)) return "needs_attention";
  if (ai.toxicity > 0.7) return "toxic";

  return "valid";
};

// GitHub comments
const classifyGithubComment = (text, ai) => {
  if (isGithubSpam(text)) return "spam";
  if (ai.toxicity > 0.75) return "toxic";
  if (ai.insult > 0.6) return "abusive";
  if (text.length < 10) return "low_value";

  return "normal";
};

// Actions for YouTube
const getAction = (label, strictMode = false) => {
  if (strictMode && ["suspicious", "abusive"].includes(label)) {
    return "block";
  }

  const actionMap = {
    toxic: "block",
    threat: "block",
    spam: "hide",
    abusive: "flag",
    suspicious: "review",
    safe: "allow"
  };
  return actionMap[label] || "allow";
};

// Actions for GitHub
const getGithubAction = (label) => {
  switch(label) {
    case "spam":
      return { action: "close", reason: "Spam detected" };
    case "low_quality":
      return { action: "comment", message: "Please provide more details." };
    case "bug":
      return { action: "label", label: "bug" };
    case "feature_request":
      return { action: "label", label: "enhancement" };
    case "needs_attention":
      return { action: "prioritize" };
    case "toxic":
      return { action: "lock" };
    default:
      return { action: "allow" };
  }
};

const suggestImprovement = (text, label) => {
  if (label === "low_quality") {
    return "Please add steps to reproduce, expected behavior, and screenshots.";
  }

  if (label === "bug") {
    return "Include error logs, environment details, and steps to reproduce.";
  }

  if (label === "feature_request") {
    return "Describe the feature clearly with use cases and expected impact.";
  }

  if (label === "needs_attention") {
    return "Mark priority level and explain urgency.";
  }

  return null;
};

module.exports = {
  detectLanguage,
  cleanText,
  isSpam,
  isGithubSpam,
  classify,
  classifyGithubIssue,
  classifyGithubComment,
  getAction,
  getGithubAction,
  suggestImprovement
};
