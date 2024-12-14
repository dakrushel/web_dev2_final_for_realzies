// client/app/api/rollsApi.js
import { auth } from "../../firebase";

// Log Roll
export const logRoll = async (rollType, result) => {
  try {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found. Please log in.");
    }
    const idToken = await auth.currentUser.getIdToken(); // Get Firebase ID token
    const response = await fetch("http://localhost:5000/api/rolls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`, // Pass the token in the header
      },
      body: JSON.stringify({ rollType, result }),
    });

    if (!response.ok) {
      throw new Error("Failed to log roll");
    }

    console.log("Roll logged successfully");
  } catch (err) {
    console.error("Error logging roll:", err.message);
  }
};

// Fetch Roll History
export const fetchRollHistory = async () => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch("http://localhost:5000/api/rolls", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch roll history");
    }
    
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error(`Expected an array but got ${typeof data}`);
    }

    console.log("Fetched roll history:", data);
    return data;
  } catch (err) {
    console.error("Error fetching roll history:", err.message);
    return [];
  }
};
