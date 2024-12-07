const express = require('express');
const { logRoll, getRolls } = require('../controllers/rollController');
const router = express.Router();

router.post('/', logRoll);  //Log a new roll
router.get('/:userId', getRolls);  //Fetch previous rolls for a user

module.exports = router;