const RollHistory = require('../models/RollHistory');

//Log new rolls
const logRoll = async (req, res) => {
    const { userId, rollType, result } = req.body;
    try {
        const roll = new RollHistory({ userId, rollType, result });
        await roll.save();
        res.status(201).json(roll);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//Get rolls
const getRolls = async (req, res) => {
    const { userId } = req.params;
    try {
        const rolls = await RollHistory.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(rolls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error, could not get rolls' });
    }
};

module.exports = { logRoll, getRolls };