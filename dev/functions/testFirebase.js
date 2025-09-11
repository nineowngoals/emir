const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  try {
    const docRef = db.collection("test").doc("ping");
    await docRef.set({ timestamp: new Date() });
    res.send("✅ Firestore is connected and wrote test document!");
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};
