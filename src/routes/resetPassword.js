const sendEmailWithSecretCode = require("../helpers/sendEmailWithSecretCode");
const generateSecretCode = require("../helpers/generateSecretCode");

const resetPassword = (req, res) => {
  const {email, name} = req.user;

  const secretCode = generateSecretCode(name);

  sendEmailWithSecretCode(email, secretCode).catch((err) => {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Email have not been sent", error: err}));
  });

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({status: "Email have been sent"}));
};

module.exports = resetPassword;

/**
 *
 * @api {get} /user/reset-password Reset user password
 * @apiName ResetPassword
 * @apiGroup User
 *
 * @apiDescription Change user password when you login is system.
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/user/reset-password
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiSuccess {String} status       Request status
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *     "status": "Email have been sent"
 *    }
 *
 * @apiError EmailSentError Some error with sent email
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 EmailSentError error
 *     {
 *       status: "Email have not been sent",
 *       error: {Object},
 *     }
 */
