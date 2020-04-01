const path = require("path");
const loginValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "login",
));
const loginUser = require("../helpers/loginUser");
const jwt = require("jsonwebtoken");
const config = require("config");

const login = async (req, res) => {
  const validation = loginValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      message: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const user = await loginUser(req.body.email, req.body.password);
  const secret = config.get("appConfig.secret");
  const jwtToken = jwt.sign(JSON.stringify(user), secret);

  if (!user) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(
      JSON.stringify({
        status: "No such user",
      }),
    );
    return;
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({user, jwtToken}));
  return;
};

module.exports = login;
