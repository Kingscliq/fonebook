const jwt = require("jsonwebtoken");

const config = require("config");

module.exports = function (req, res, next) {
  //  Get Token from Request Header
  const token = req.header("x-auth-token");

  // Check if Token Exists
  if (!token) {
    return res.status(401).json({ msg: "Unauthorised, No access Token" });
  }

  try {
    let decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is Invalid" });
  }
};
