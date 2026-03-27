const admin = require("../firebase-admin");
const db = admin.firestore();

exports.getUserAnalytics = async (req, res) => {
  try {
    const doc = await db.collection("analytics").doc(req.user.uid).get();

    if (!doc.exists) {
      return res.json({ totalScanned: 0 });
    }

    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
