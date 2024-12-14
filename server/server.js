const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure this is configured correctly
const cors = require('cors');
const rollRoutes = require('./routes/rollRoutes');
const abilityChecksRoutes = require('./routes/abilityChecksRoutes'); // Import the new routes
// const signupRoutes = require('./routes/signup'); // Import the new routes
// const signinRoutes = require('./routes/signin'); // Import the new routes
const admin = require("./config/firebaseAdmin"); // Import the Firebase Admin SDK


// Load environment variables
dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();


//Test Firebase connection
admin.auth().listUsers(1)
.then((_users) => console.log('Firebase Admin setup successful!'))
.catch((err) => console.error('Error setting up Firebase Admin:', err));


// Routes
app.use('/api/rolls', rollRoutes);
app.use('/api/ability-checks', abilityChecksRoutes); // New Ability Checks endpoint
// app.use('/api/signup', signupRoutes); // New Sign-up endpoint
// app.use('/api/signin', signinRoutes); // New Sign-in endpoint   


// Test route
app.get('/', (_req, res) => res.send('API is running...'));

// Start server
const PORT = process.env.PORT || 5000; // Use port 5000 unless specified in .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));