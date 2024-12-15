const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // MongoDB connection file
const cors = require('cors');
const rollRoutes = require('./routes/rollRoutes');
const admin = require("./config/firebaseAdmin"); // Import Firebase Admin

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Firebase Admin test
admin.auth().listUsers(1)
  .then(() => console.log('Firebase Admin setup successful!'))
  .catch((err) => console.error('Error setting up Firebase Admin:', err));

// Routes
app.use('/api/rolls', rollRoutes);

// Test route
app.get('/', (_req, res) => res.send('API is running...'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
