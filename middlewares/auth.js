const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Split the 'Bearer <token>'
    req.user = await User.findById(decoded.user.id);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
