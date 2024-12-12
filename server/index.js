import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import signupRoutes from './routes/signup.js';
import signinRoutes from './routes/signin.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rollRoutes =require('./routes/rollRoutes');
app.use('/api/rolls', rollRoutes);

app.use('/signup', signupRoutes);
app.use('/signin', signinRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));