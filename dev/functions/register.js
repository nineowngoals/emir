const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://emirinvest-uk.firebaseio.com"
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const userRecord = await auth.createUser({ email, displayName: `${firstName} ${lastName}` });
    const userId = userRecord.uid;

    await db.collection("users").doc(userId).set({
      firstName,
      lastName,
      email,
      createdAt: new Date(),
      kycStatus: "pending"
    });

    res.send({ message: "User registered successfully!", userId });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};
