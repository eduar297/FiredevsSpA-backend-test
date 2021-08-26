const jwt = require("jsonwebtoken"),
  secret = process.env.JWT_SECRET_KEY || "jwtSecretKey";

const createAccountToken = function (id, role) {
  var payload = {
    id,
    role,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: 100000,
  });

  return token;
};

module.exports = { createAccountToken };
