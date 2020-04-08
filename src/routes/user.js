const findUserInDB = require("../helpers/findUserInDB");

const user = async (req, res) => {
  const userInDB = await findUserInDB(req.user);

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({status: "Success", userInDB}));
};

module.exports = user;

/**
 *
 * @api {get} /user Get user info
 * @apiName UserInfo
 * @apiGroup User
 *
 * @apiDescription Get user info.
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/user
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiSuccess {String} status       Request status
 * @apiSuccess {Object} user         Created user.
 *
 *
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
       "name": "Driver1",
       "surname": "Driver1",
       "phone": "80500307536",
       "email": "driver1@gmail.com"
      }
 *
 *
 */
