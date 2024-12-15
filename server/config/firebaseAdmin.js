const admin = require("firebase-admin");
require("dotenv").config();

// Debugging: Log environment variables to confirm they're loaded
console.log("Firebase Env Variables:");
console.log({
  FIREBASE_TYPE: process.env.FIREBASE_TYPE,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? "Loaded" : "Missing",
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
});

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin initialized successfully.");
  
  // Test Firebase connection
  admin.auth().listUsers(1)
    .then(() => console.log("Firebase Admin setup successful!"))
    .catch((err) => console.error("Error setting up Firebase Admin:", err.message));
} catch (err) {
  console.error("Error initializing Firebase Admin:", err.message);
}

module.exports = admin;
