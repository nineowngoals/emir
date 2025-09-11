const { db, auth } = require('../firebase'); // centralized Firebase config

module.exports = async (req, res) => {
  try {
    if (!db || !auth) {
      return res.status(500).send({ error: "Firebase is not initialized" });
    }

    const { firstName, lastName, email, phoneNumber, wallet } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).send({ error: "Missing required fields: firstName, lastName, email" });
    }

    // Create Firebase Authentication user
    let userRecord;
    try {
      userRecord = await auth.createUser({
        email,
        displayName: `${firstName} ${lastName}`,
        phoneNumber: phoneNumber || undefined
      });
    } catch (authErr) {
      console.error("Firebase Auth error:", authErr);
      return res.status(400).send({ error: authErr.message });
    }

    const userId = userRecord.uid;

    // Save user details to Firestore
    await db.collection("users").doc(userId).set({
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || null,
      createdAt: new Date(),
      kycStatus: "pending",
      wallet: wallet || {} // optional wallet info
    });

    res.send({
      message: "User registered successfully!",
      userId,
      email,
      fullName: `${firstName} ${lastName}`
    });

  } catch (err) {
    console.error("Register function error:", err);
    res.status(500).send({ error: "Internal Server Error", details: err.message });
  }
};
