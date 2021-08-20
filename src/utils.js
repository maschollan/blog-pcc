// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');

// generate token and return it
function generateToken(user) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!user) return null;

  var u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };

  return jwt.sign(u, 'ABCDEF$123', {
    expiresIn: 60 * 60 // expires in 2 hours
  });
}

// return basic user details
function getCleanUser(user) {
  if (!user) return null;

  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
}

module.exports = {
  generateToken,
  getCleanUser
}
