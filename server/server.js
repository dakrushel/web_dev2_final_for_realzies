const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure this is configured correctly
const cors = require('cors');
const rollRoutes = require('./routes/rollRoutes');
const abilityChecksRoutes = require('./routes/abilityChecksRoutes'); // Import the new routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rolls', rollRoutes);
app.use('/api/ability-checks', abilityChecksRoutes); // New Ability Checks endpoint

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// Start server
const PORT = process.env.PORT || 5000; // Use port 5000 unless specified in .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
