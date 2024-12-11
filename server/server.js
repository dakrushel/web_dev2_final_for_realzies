const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');   //This might not be right
const cors = require('cors');
const rollRoutes = require('./routes/rollRoutes');

//Load environment vars
dotenv.config();

//Connect to Mongo
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/rolls', rollRoutes);

//Test
app.get('/', (req, res) => res.send('API is running...'));

//Start server
const PORT = process.env.PORT || 5000;      //just following the thing but might need to be 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));