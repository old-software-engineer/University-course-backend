const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getCourses, registerCourse, addCourse } = require('../controllers/courseController');

router.get('/', auth, getCourses);
router.post('/register', auth, registerCourse);
router.post('/add', auth, addCourse); 

module.exports = router;
