exports.generateAnalytics = (results) => {
  let stats = {
    total: results.length,
    toxic: 0,
    spam: 0,
    flagged: 0,
    safe: 0
  };

  results.forEach(r => {
    if (r.label === "TOXIC") stats.toxic++;
    else if (r.label === "SPAM") stats.spam++;
    else if (r.label === "FLAGGED") stats.flagged++;
    else stats.safe++;
  });

  stats.toxicityRate = stats.total > 0 ? (stats.toxic / stats.total) * 100 : 0;

  return stats;
};
