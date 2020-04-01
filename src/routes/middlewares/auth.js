const jwt = require("jsonwebtoken");
const config = require("config");

const secret = config.get("appConfig.secret");

module.exports = (req, res, next) => {
  const [tokenType, jwtToken] = req.headers["authorization"].split(" ");
  const user = jwt.verify(jwtToken, secret);
  req.user = user;
  next();
};
