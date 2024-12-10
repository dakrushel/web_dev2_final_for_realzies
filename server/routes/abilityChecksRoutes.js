const express = require('express');
const { createAbilityCheck, getAbilityChecks } = require('../controllers/abilityChecksController');

const router = express.Router();

router.post('/', createAbilityCheck); // Endpoint to create a new ability check
router.get('/', getAbilityChecks); // Endpoint to fetch all ability checks

module.exports = router;
