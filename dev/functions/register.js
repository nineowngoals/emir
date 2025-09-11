const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Create Firebase Authentication user
    const userRecord = await auth.createUser({
      email,
      displayName: `${firstName} ${lastName}`
    });

    const userId = userRecord.uid;

    // Save user details to Firestore
    await db.collection("users").doc(userId).set({
      firstName,
      lastName,
      email,
      createdAt: new Date(),
      kycStatus: "pending",
      wallet: {} // placeholder for crypto wallet data
    });

    res.send({ message: "User registered successfully!", userId });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};
