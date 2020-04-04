const checkSecretCode = require("../helpers/checkSecretCode");
const changeUserData = require("../helpers/changeUserData");
const cryptPassword = require("../helpers/cryptPassword");
const removeSecretCodeFile = require("../helpers/removeSecretCodeFile");

const changePassword = async (req, res) => {
  const {name, _id} = req.user;
  const {secret, newPassword} = req.body;

  const isSecretCodeCorrect = checkSecretCode(name, secret);

  if (!isSecretCodeCorrect) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(
      JSON.stringify({
        status: "Password have note been changed",
        message: "Incorect secret code",
      }),
    );
    return;
  }

  const result = await changeUserData(_id, {
    password: cryptPassword(newPassword),
  });

  if (!result) {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Password have not been changed"}));
    return;
  }

  removeSecretCodeFile(name);

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({status: "Password have been changed"}));
};

module.exports = changePassword;
