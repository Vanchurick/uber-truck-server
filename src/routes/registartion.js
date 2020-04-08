const path = require("path");
const jwt = require("jsonwebtoken");
const config = require("config");
const Driver = require("../db/schemas/driver.js");
const Shipper = require("../db/schemas/shipper");
const driverValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "driver",
));

const shipperValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "shipper",
));
const cryptPassword = require("../helpers/cryptPassword");
const isUserExist = require("../helpers/isUserExist");

const registration = async (req, res) => {
  const {driver, shipper, email} = req.body;
  const secret = config.get("appConfig.secret");

  if (!driver && !shipper) {
    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(
      JSON.stringify({
        status: "Bad request",
        error: "Choose registration driver or shipper",
      }),
    );
    return;
  }

  const userExist = await isUserExist(email);

  if (userExist) {
    const resp = {
      status: "User have not been created",
      error: `${email} is busy`,
    };

    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify(resp));
    return;
  }

  if (driver) {
    const validation = driverValidator.validate(req.body);

    if (validation.error) {
      const resp = {
        status: "Driver have not been created",
        error: validation.error,
      };

      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
      return;
    }

    const userDriver = req.body;

    userDriver.password = cryptPassword(req.body.password);

    await Driver.create(userDriver)
      .then((result) => {
        const {_id, name, surname, phone, email} = result;
        const jwtToken = jwt.sign(
          JSON.stringify({
            _id,
            name,
            surname,
            phone,
            email,
            driver: true,
          }),
          secret,
        );

        const resp = {
          status: "Driver have been created",
          user: {_id, name, surname, phone, email},
          jwtToken,
        };

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resp));
      })
      .catch((err) => {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(
          JSON.stringify({status: "Driver have been created", error: err}),
        );
      });
    return;
  }

  if (shipper) {
    const validation = shipperValidator.validate(req.body);

    if (validation.error) {
      const resp = {
        status: "Shipper have not been created",
        error: validation.error,
      };

      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
      return;
    }

    const userShipper = req.body;
    userShipper.password = cryptPassword(req.body.password);

    await Shipper.create(req.body)
      .then((result) => {
        const {_id, name, surname, phone, email} = result;
        const jwtToken = jwt.sign(
          JSON.stringify({
            _id,
            name,
            surname,
            phone,
            email,
            shipper: true,
          }),
          secret,
        );

        const resp = {
          status: "Shipper have been created",
          user: {_id, name, surname, phone, email},
          jwtToken,
        };

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resp));
      })
      .catch((err) => {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(
          JSON.stringify({status: "Shipper have been created", error: err}),
        );
      });
    return;
  }
};

module.exports = registration;

/**
 *
 * @api {post} /auth Register new user
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiDescription Register user request.
 * In request choose status of user "shipper" or "driver".
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/auth
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "name":  "Ivan",
 *      "surname":  "Ivanov",
 *      "phone":  "80501234567",
 *      "email":  "ivan@mail.com",
 *      "password":  "123456",
 *      "driver": true
 *     }
 *
 * @apiParam {String} name               User name
 * @apiParam {String} surname            User lastname
 * @apiParam {String} phone              User phone from 10 numbers
 * @apiParam {String} email              User email
 * @apiParam {String} password           User password
 * @apiParam {Boolean} shipper           User status.
 * @apiParam {Boolean}  driver           User status.
 *
 *
 * @apiSuccess {String} status       Request status
 * @apiSuccess {Object} user         Created user.
 * @apiSuccess {String} jwtToken     Token.
 *
 *
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Driver have been created",
 *       "user": {
 *          "_id": "5e8cc7a0ada9582a7431e",
 *          "name": "Ivan",
 *          "surname": "Ivanov",
 *          "phone": "80501234567",
 *          "email": "ivan@mail.com"
 *       },
 *      "jwtToken": "yJhbGciOiJIUzI1NiJ9..."
 *     }
 *
 *  @apiError BadRequest Status of user <code>driver</code>
 * or <code>shipper</code> are absent.
 *
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *        "status": "Bad request",
 *        "error": "Choose registration driver or shipper"
 *     }
 *
 *  @apiError ValidationError Bad request.body.
 *
 *   @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 Validation error
 *     {
 *       status: "Driver have not been created",
 *       error: {object},
 *     }
 *
 *  @apiError DatabaseErorr Error in mongo databse.
 *
 *   @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 Database error
 *     {
 *       status: "Driver have not been created",
 *       error: {object},
 *     }
 *
 */
