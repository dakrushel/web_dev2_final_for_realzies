const AbilityCheck = require('../models/abilityChecksModel');

// Roll a random number between 1 and 20
const rollDice = () => Math.floor(Math.random() * 20) + 1;

exports.createAbilityCheck = async (req, res) => {
  const { ability, modifier } = req.body;

  if (!ability || modifier === undefined) {
    return res.status(400).json({ error: 'Ability and modifier are required.' });
  }

  try {
    const roll = rollDice();
    const result = roll + modifier;

    const newCheck = new AbilityCheck({ ability, modifier, result });
    await newCheck.save();

    res.status(201).json(newCheck);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
};

exports.getAbilityChecks = async (req, res) => {
  try {
    const checks = await AbilityCheck.find().sort({ createdAt: -1 });
    res.status(200).json(checks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
};