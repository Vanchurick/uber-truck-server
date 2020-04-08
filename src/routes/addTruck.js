const path = require("path");
const truckValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "truckCreation",
));
const createTruck = require("../helpers/createTruck");
const Truck = require("../db/schemas/truck");

const addTruck = async (req, res) => {
  const validation = truckValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      error: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const {type} = req.body;
  const {_id} = req.user;

  const truck = createTruck(_id, type);

  await Truck.create(truck)
    .then((result) => {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Truck has been created", result}));
    })
    .catch((err) => {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(
        JSON.stringify({status: "Truck has not been created", error: err}),
      );
    });
};

module.exports = addTruck;

/**
 *
 * @api {post} /create-truck Create truck
 * @apiName CreateTruck
 * @apiGroup Driver
 *
 * @apiDescription Create truck
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/create-truck
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiParam {String} type   Type of truck: <code>sprinter</code>,
 * <code>ss</code>,<code>ls</code>
 * @apiParamExample {json} Request-Example:
 *     {
 *      "type": "sprinter"
 *     }
 *
 * @apiSuccess {String} status  Request status
 * @apiSuccess {String} result  Created truck
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *     "status": "Truck have been created",
 *     "result": {
 *       "_id": "5e8dab588154171ae838d6a1",
 *       "created_by": "5e8cc742ada9582a7431ecf2",
 *       "assigned_to": "",
 *       "status": "is",
 *       "load": "",
 *       "type": "sprinter",
 *       "dimensions": {
 *           "width": 250,
 *           "length": 300,
 *           "height": 170
 *       },
 *       "payload": 1700,
 *       "__v": 0
 *       }
 *    }
 *
 * @apiError ValidationError Error request body validation
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 ValidationError error
 *    {
 *      status: "Bad request",
 *      error: {Object},
 *    }
 *
 *
 * @apiError DataBaseError Error in changing password in data base
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 DataBaseError error
 *    {
 *    status: "Truck has not been created",
 *    error: {Object}
 *    }
 *
 */
