const express = require('express');
const { registerUser, loginUser } = require('../contrtollers/user');
const {verifyToken} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/users', verifyToken, (req, res) => {
    res.status(200).json({ message: "Welcome to the protected route!" });
});

module.exports = router;