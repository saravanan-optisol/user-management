const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //check its token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'user not autherized' });
  }

  //verify the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.body = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};
