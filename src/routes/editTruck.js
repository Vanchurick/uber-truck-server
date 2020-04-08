const path = require("path");
const editTruckValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "editTruck",
));
const assignTruck = require("../helpers/assignTruck");
const updateTruck = require("../helpers/updateTruck");

const OPERATION = {
  ASSIGN: "assign",
  UPDATE: "update",
};

const editTruck = async (req, res) => {
  const {id} = req.params;
  const {operation} = req.body;
  const {_id} = req.user;

  const validation = editTruckValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      error: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  if (operation === OPERATION.ASSIGN) {
    const assignedTruck = await assignTruck(id, _id);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Success assign", truck: assignedTruck}));
    return;
  }

  if (operation === OPERATION.UPDATE) {
    const {data} = req.body;
    const updatedTruck = await updateTruck(id, data, _id);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Success update", truck: updatedTruck}));
    return;
  }
};

module.exports = editTruck;

/**
 *
 * @api {put} /truck/:id Edit Truck
 * @apiName EditTruck
 * @apiGroup Driver
 *
 * @apiDescription Edit truck
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/truck/5e8cc757ada9582a7431ecf3
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiParam {String} operation   Type of operation
 * <code>update</code> or <code>assign</code>
 * @apiParam {Object} data        Data for editing
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "operation":  "update",
 *      "data": {
 *              "payload": 2000
 *              },
 *     }
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "operation":  "assign",
 *     }
 *
 *
 *
 * @apiSuccess {String} status  Request status
 * @apiSuccess {Object} truck   Updated truck
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *    "status": "Success update",
 *    "truck": {
 *       "dimensions": {
 *           "width": 350,
 *           "length": 700,
 *           "height": 200
 *       },
 *       "_id": "5e8cc757ada9582a7431ecf3",
 *       "created_by": "5e8cc742ada9582a7431ecf2",
 *       "assigned_to": "",
 *       "status": "is",
 *       "load": "",
 *       "type": "ls",
 *       "payload": 2000,
 *       "__v": 0
 *    }
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * {
 *  "status": "Success assign",
 *    "truck": {
 *        "dimensions": {
 *            "width": 350,
 *            "length": 700,
 *            "height": 200
 *        },
 *        "_id": "5e8cc757ada9582a7431ecf3",
 *        "created_by": "5e8cc742ada9582a7431ecf2",
 *        "assigned_to": "5e8cc742ada9582a7431ecf2",
 *        "status": "is",
 *        "load": "",
 *        "type": "ls",
 *        "payload": 2000,
 *        "__v": 0
 *    }
 *  }
 *
 *
 * @apiError ValidationError Error request body validation
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 ValidationError error
 *    {
 *      status: "Bad request",
 *      error: {Object},
 *    }
 */
