var jwt = require("jsonwebtoken"),
  secret = process.env.JWT_SECRET_KEY || "jwtSecretKey";

async function middleware(req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).send({ message: "Autorización Denegada" });

  const token = req.headers.authorization.split(" ")[1]; //en 0 esta "Bearer"

  try {
    var payload = await jwt.verify(token, secret);
  } catch (ex) {
    return res.status(401).send({ message: "Autorización Denegada" });
  }

  if (payload.role != "student") {
    return res.status(401).send({ message: "Autorización Denegada" });
  }

  req.user = payload;

  next();
}
module.exports = middleware;
