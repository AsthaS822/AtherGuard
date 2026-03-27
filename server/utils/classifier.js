exports.classify = (text, aiScores, customWords) => {
  let ruleSpam = 0;

  if (/http|www/i.test(text)) ruleSpam += 0.3;
  if (text.length < 10) ruleSpam += 0.2;

  const customMatch = customWords.some(word =>
    text.toLowerCase().includes(word.toLowerCase())
  );

  if (aiScores.toxicity > 0.8) return "TOXIC";
  if (aiScores.spam > 0.7 || ruleSpam > 0.5) return "SPAM";
  if (customMatch) return "FLAGGED";

  return "SAFE";
};
