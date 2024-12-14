const admin = require("../config/firebaseAdmin");

const optionalFirebaseAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect 'Bearer <token>'

  if (!token) {
    // Proceed without authentication if no token is provided
    req.uid = null; // No user associated with the request
    return next();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid; // Attach UID for MongoDB queries
    next();
  } catch (err) {
    console.error("Error verifying Firebase token:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = optionalFirebaseAuth;


//ES modules version
// import { auth } from "../config/firebaseAdmin";

// const verifyFirebaseToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Expect 'Bearer <token>'
  
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized: No token provided" });
//   }

//   try {
//     const decodedToken = await auth().verifyIdToken(token);
//     req.uid = decodedToken.uid; // Add UID to the request object
//     next();
//   } catch (err) {
//     console.error("Error verifying Firebase token:", err);
//     res.status(401).json({ error: "Unauthorized: Invalid token" });
//   }
// };

// export default verifyFirebaseToken;