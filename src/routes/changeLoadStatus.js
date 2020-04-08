const Load = require("../db/schemas/load");
const Truck = require("../db/schemas/truck");
const path = require("path");
const changeLoadStatusValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "loadStateChange",
));

const LOAD_STATES = {
  atpu: "Arrived to Pick Up",
  ertd: "En route to delivery",
  atd: "Arrived to delivery",
};

const changeLoadStatus = async (req, res) => {
  const validation = changeLoadStatusValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      error: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const {id} = req.params;
  const {state} = req.body;

  if (state === "atd") {
    const load = await Load.findByIdAndUpdate(
      id,
      {
        state: LOAD_STATES[state],
        status: "shipped",
      },
      (err, doc) => {
        if (err) {
          res.writeHead(404, {"Content-Type": "application/json"});
          res.end(JSON.stringify({status: "Database error", error: err}));
        }
      },
    );

    await Truck.findByIdAndUpdate(
      load.truck,
      {status: "is", load: ""},
      (err, doc) => {
        if (err) {
          res.writeHead(404, {"Content-Type": "application/json"});
          res.end(JSON.stringify({status: "Database error", error: err}));
        }
      },
    );

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Success", load}));

    return;
  }

  const load = await Load.findByIdAndUpdate(
    id,
    {state: LOAD_STATES[state]},
    (err, doc) => {
      if (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({status: "Database error", error: err}));
      }
    },
  );

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({status: "Success", load}));
};

module.exports = changeLoadStatus;

/**
 *
 * @api {put} /driver/load/:id Change load status
 * @apiName ChangeLoadStatus
 * @apiGroup Driver
 *
 * @apiDescription Chage load status by driver
 * atpu: "Arrived to Pick Up",
 * ertd: "En route to delivery",
 * atd: "Arrived to delivery",
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/driver/load/5e8b8c68b3ee152dd4dc73f9
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiParam {String} state   New state of load
 * <code>atpu</code> or <code>ertd</code> or <code>atd</code>
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "state":  "atpu",
 *      }
 * @apiParamExample {json} Request-Example:
 *     {
 *      "state":  "ertd",
 *      }
 * @apiParamExample {json} Request-Example:
 *     {
 *      "state":  "atd",
 *      }
 *
 * @apiSuccess {String} status  Request status
 * @apiSuccess {Object} load   Updated load
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *    "status": "Success",
 *    "load": {
 *        "dimensions": {
 *           "width": 50,
 *           "length": 100,
 *           "height": 50
 *       },
 *       "_id": "5e8cc7c1ada9582a7431ecf5",
 *       "created_by": "5e8cc7a0ada9582a7431ecf4",
 *       "assigned_to": "5e8cc742ada9582a7431ecf2",
 *       "truck": "5e8cc757ada9582a7431ecf3",
 *       "status": "shipped",
 *       "state": "Arrived to delivery",
 *       "logs": [
 *           {
 *               "_id": "5e8cc7c1ada9582a7431ecf6",
 *               "message": "Created",
 *               "time": "1586284481489"
 *           },
 *           {
 *               "_id": "5e8cc7f6ada9582a7431ecf7",
 *               "message": "Posted",
 *               "time": "1586284534666"
 *           },
 *           {
 *               "_id": "5e8cc7f6ada9582a7431ecfa",
 *               "message": "Assigned to 5e8cc742ada9582a7431ecf2",
 *               "time": "1586284534889"
 *           }
 *       ],
 *       "payload": 3000,
 *       "__v": 0
 *   }
 * }
 *
 *
 *
 * @apiError ValidationError Error request body validation
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 ValidationError error
 *    {
 *      status: "Bad request",
 *      error: {Object},
 *    }
 *
 * @apiError DatabAseError Some error in database
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 DataBaseError error
 *    {
 *      status: "Database Error",
 *      error: {Object},
 *    }
 */
