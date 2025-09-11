const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://emirinvest-uk.firebaseio.com" // your DB URL
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
