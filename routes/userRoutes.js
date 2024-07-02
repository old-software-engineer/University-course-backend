const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { registerUser, loginUser, getUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUser);

module.exports = router;
