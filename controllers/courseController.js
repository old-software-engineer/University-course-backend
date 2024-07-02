const Course = require('../models/Course');

exports.addCourse = async (req, res) => {
  const courses = req.body;

  if (!Array.isArray(courses)) {
    return res.status(400).json({ msg: 'Invalid data format, expected an array of courses' });
  }

  try {
    const savedCourses = await Promise.all(
      courses.map(async ({ name, description, degree }) => {
        const newCourse = new Course({
          name,
          description,
          degree,
        });
        return await newCourse.save();
      })
    );

    res.json(savedCourses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ degree: req.user.degree });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.registerCourse = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const alreadyRegistered = req.user.registeredCourses.some(course => 
      course._id.equals(courseId)
    );

    if (alreadyRegistered) {
      return res.status(400).json({ msg: 'User is already registered for this course' });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    req.user.registeredCourses.push(course);
    await req.user.save();

    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

