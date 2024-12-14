const express = require('express');
const { logRoll, getRolls } = require('../controllers/rollController');
const verifyFirebaseToken = require('../middleware/authMiddleware');


const router = express.Router();

router.post("/", verifyFirebaseToken, logRoll); // Log a new roll
router.get("/", verifyFirebaseToken, getRolls); // Fetch rolls for the logged-in user

module.exports = router;