const admin = require("../config/firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect 'Bearer <token>'

  if (!token) {
    console.warn("No token provided. Skipping authentication.");
    req.uid = null; // Skip authentication
    return next();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid; // Attach UID for MongoDB queries
    console.log("Token verified successfully:", decodedToken.uid);
    next();
  } catch (err) {
    console.error("Error verifying Firebase token:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyFirebaseToken;
