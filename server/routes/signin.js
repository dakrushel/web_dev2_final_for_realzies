const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Both email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      console.error('Invalid credentials for email:', email);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const { password, ...safeUser } = user.toObject();
    console.log('User signed in successfully:', { id: user._id, email: user.email });
    return res.status(200).json({ message: 'Sign-in successful', user: safeUser });
  } catch (err) {
    console.error('Error during sign-in:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;