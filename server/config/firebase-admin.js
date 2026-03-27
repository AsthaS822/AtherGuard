const admin = require('firebase-admin');

/**
 * Initializes Firebase Admin SDK.
 * For production, use serviceAccountKey.json. 
 * For local development/demo, we can use GOOGLE_APPLICATION_CREDENTIALS or default credentials.
 */
function initAdmin() {
    if (!admin.apps.length) {
        admin.initializeApp({
            projectId: "aimoderationagent", // Same as frontend
            // In a real prod environment, you would add:
            // credential: admin.credential.cert(serviceAccount)
        });
        console.log("Firebase Admin SDK initialized");
    }
    return admin;
}

const firebaseAdmin = initAdmin();
module.exports = firebaseAdmin;
