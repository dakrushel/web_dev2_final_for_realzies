// const RollHistory = require('../models/RollHistory');

// //Log new rolls
// const logRoll = async (req, res) => {
//     const { userId, rollType, result } = req.body;

//     if (!userId || !rollType || result === undefined) {
//         return res.status(400).json({ error: 'All fields are required.' });
//       }
      
//     try {
//         const roll = new RollHistory({ userId, rollType, result });
//         await roll.save();
//         res.status(201).json(roll);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// //Get rolls
// const getRolls = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const rolls = await RollHistory.find({ userId }).sort({ timestamp: -1 });
//         res.status(200).json(rolls);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error, could not get rolls' });
//     }
// };

// module.exports = { logRoll, getRolls };

const RollHistory = require("../models/RollHistory");

// Log new rolls
const logRoll = async (req, res) => {
  const { rollType, result } = req.body;

  if (!rollType || result === undefined) {
    return res.status(400).json({ error: "Roll type and result are required." });
  }

  if (!req.uid) {
    // User is not logged in; just return the roll result without saving
    console.log("Unauthenticated roll logged:", { rollType, result });
    return res.status(200).json({
      message: "Roll logged (not saved in history). Log in to save your roll history.",
      rollType,
      result,
    });
  }

  // User is authenticated; save roll history in MongoDB
  try {
    const roll = new RollHistory({ userId: req.uid, rollType, result });
    await roll.save();
    console.log("Authenticated roll saved:", { userId: req.uid, rollType, result });
    res.status(201).json({ message: "Roll logged successfully", roll });
  } catch (err) {
    console.error("Error saving roll:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get rolls for the logged-in user
const getRolls = async (req, res) => {
  if (!req.uid) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Please log in to view your roll history." });
  }

  try {
    const rolls = await RollHistory.find({ userId: req.uid }).sort({ timestamp: -1 });
    res.status(200).json(rolls);
  } catch (err) {
    console.error("Error fetching rolls:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { logRoll, getRolls };
