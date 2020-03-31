const bcrypt = require("bcrypt");
const config = require("config");
const saltPassword = config.get("appConfig.saltPassword");

module.exports = (password) => {
  const salt = bcrypt.genSaltSync(saltPassword);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
