const express = require('express');
const { logRoll, getRolls } = require('../controllers/rollController');
// const verifyFirebaseToken = require('../middleware/authMiddleware');

const router = express.Router();

// Temporarily bypass authentication middleware for testing
router.post("/", logRoll); // Log a new roll
router.get("/", getRolls); // Fetch rolls

module.exports = router;
