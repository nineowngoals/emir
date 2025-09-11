const { auth, db } = require("../firebase");

module.exports = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const userRecord = await auth.createUser({
      email,
      displayName: `${firstName} ${lastName}`
    });

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
    res.status(400).send({ error: err.message });
  }
};
