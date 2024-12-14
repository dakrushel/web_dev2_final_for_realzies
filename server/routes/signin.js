// const express = require('express');
// const router = express.Router();
// const verifyFirebaseToken = require('../middleware/authMiddleware');

// router.post('/', verifyFirebaseToken, async (req, res) => {
//   try {
//     // Token is valid; Firebase user is already authenticated
//     const user = {
//       uid: req.uid,
//       email: req.body.email,
//       name: req.body.name,
//     };
//     console.log('User authenticated via Firebase:', user);

//     res.status(200).json({ message: 'Sign-in successful', user });
//   } catch (err) {
//     console.error('Error during Firebase sign-in:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
