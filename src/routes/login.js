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
      error: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const user = await loginUser(req.body.email, req.body.password);
  const secret = config.get("appConfig.secret");
  const jwtToken = jwt.sign(JSON.stringify(user), secret);

  if (!user) {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(
      JSON.stringify({
        status: "No such user or wrong passport",
      }),
    );
    return;
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(
    JSON.stringify({status: "Successfuly login in system", user, jwtToken}),
  );
  return;
};

module.exports = login;

/**
 *
 * @api {post} /login Login user
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiDescription Login user in system.
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/login
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "email":  "ivan@mail.com",
 *      "password":  "12345",
 *     }
 *
 * @apiParam {String} email              User email
 * @apiParam {String} password           User password
 *
 * @apiSuccess {String} status       Request status
 * @apiSuccess {Object} user         Created user.
 * @apiSuccess {String} jwtToken     Token.
 *
 *
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Successfuly login in system",
 *       "user": {
 *           "_id": "5e8cc742ada9582a7431ecf2",
             "name": " Ivan",
             "surname": "Driver1",
             "phone": "80500307536",
             "email": "driver1@gmail.com",
             "driver": true
 *       },
 *      "jwtToken": "yJhbGciOiJIUzI1NiJ9..."
 *     }
 *
 *
 *
 *  @apiError ValidationError Bad request.body.
 *
 *  @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 Validation error
 *     {
 *       status: "Bad request",
 *       error: {Object},
 *     }
 *
 *  @apiError NoUser No user in databse
 *  @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 NoUser error
 *     {
 *       status: "No such user or wrong passport",
 *       error: {Object},
 *     }
 *
 *
 */
