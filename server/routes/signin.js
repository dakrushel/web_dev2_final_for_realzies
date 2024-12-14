const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log('Request received at /api/signin:', req.body); // Log incoming request

  if (!email || !password) {
    console.error('Email or password missing');
    return res.status(400).json({ error: 'Both email and password are required.' });
  }

  try {
    console.log('Looking for user with email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    console.log('User found:', user);

    if (!user.comparePassword(password)) {
      console.error('Invalid password for email:', email);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    console.log('Password is valid');

    // Create a safe user object excluding the password field
    const { _id, email: userEmail, name } = user;
    const safeUser = { id: _id, email: userEmail, name };
    console.log('User signed in successfully:', safeUser);

    return res.status(200).json({
      message: 'Sign-in successful',
      user: safeUser,
    });
  } catch (err) {
    console.error('Error during sign-in:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;