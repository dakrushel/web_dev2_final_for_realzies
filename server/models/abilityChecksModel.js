const mongoose = require('mongoose');

const AbilityCheckSchema = new mongoose.Schema({
  ability: { type: String, required: true }, // Example: "Strength", "Dexterity"
  modifier: { type: Number, required: true }, // Example: 2, -1, etc.
  result: { type: Number, required: true }, // Rolled value (1-20) + modifier
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AbilityCheck', AbilityCheckSchema);