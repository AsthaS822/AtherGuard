const admin = require("firebase-admin");

// Ensure you have serviceAccountKey.json in the server root
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
