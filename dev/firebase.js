const admin = require("firebase-admin");

let db, auth;

try {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
      // Do NOT include databaseURL if using Firestore
    });
  }

  db = admin.firestore();
  auth = admin.auth();
} catch (err) {
  console.error("Firebase initialization failed:", err);
  // Provide a dummy fallback to prevent server crash
  db = null;
  auth = null;
}

module.exports = { db, auth };
