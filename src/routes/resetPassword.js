const sendEmailWithSecretCode = require("../helpers/sendEmailWithSecretCode");
const generateSecretCode = require("../helpers/generateSecretCode");

const resetPassword = (req, res) => {
  const {email, name} = req.user;

  const secretCode = generateSecretCode(name);

  sendEmailWithSecretCode(email, secretCode).catch(console.error);

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({status: "Email have been sent"}));
};

module.exports = resetPassword;
