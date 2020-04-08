const checkSecretCode = require("../helpers/checkSecretCode");
const changeUserData = require("../helpers/changeUserData");
const cryptPassword = require("../helpers/cryptPassword");
const removeSecretCodeFile = require("../helpers/removeSecretCodeFile");

const changePassword = async (req, res) => {
  const {name, _id} = req.user;
  const {secret, newPassword} = req.body;

  const isSecretCodeCorrect = checkSecretCode(name, secret);

  if (!isSecretCodeCorrect) {
    res.writeHead(404, {"Content-Type": "application/json"});
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

/**
 *
 * @api {post} /user/reset-password/code Send secret code
 * @apiName SendSecretCode
 * @apiGroup User
 *
 * @apiDescription Send secret code from email and new password of user.
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/reset-password
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiParam {String} secret               Secret code from email
 * @apiParam {String} newPassword          New password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "secret": "Jd1yFSr3m",
 *      "newPassword": "hello"
 *     }
 *
 * @apiSuccess {String} status       Request status
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *     status: "Password have been changed"
 *    }
 *
 * @apiError SecretCodeError Incorect secret code
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 SecretCodeError error
 *    {
 *      status: "Password have note been changed",
 *      message: "Incorect secret code",
 *    }
 *
 *
 * @apiError DataBaseError Error in changing password in data base
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 SecretCodeError error
 *    {
 *    status: "Password have not been changed"
 *    }
 *
 */
