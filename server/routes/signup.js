// const express = require('express');
// const User = require('../models/User');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { name, email, password } = req.body;


//   if (!name || !email || !password) {
//     console.error('Missing fields in Sign-Up request:', req.body);
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   try {
//     console.log('Looking for user with email:', email);
//     // const user = await User.findOne({ email });
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       console.error('User:', email, 'already exists');
//       return res.status(401).json({ error: 'This user already exists. Please sign in.' });
//     }

//       console.log('Creating new user...');
//       const newUser = new User({ name, email, password });

//       await newUser.save();

//       console.log('New user created:', newUser);
//       return res.status(201).json({
//         message: 'Sign-up successful',
//         user: {
//           id: newUser._id,
//           email: newUser.email,
//           name: newUser.name,
//         }
//       });
//     } catch (err) {
//       console.error('Error during sign-up:', err.message);
//       return res.status(500).json({ error: 'Internal server error' });
//   };
// });

// module.exports = router;