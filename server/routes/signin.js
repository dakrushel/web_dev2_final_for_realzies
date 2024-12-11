import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
     
    }

    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
