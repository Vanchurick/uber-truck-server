const Load = require("../db/schemas/load");

const getDriverLoads = async (req, res) => {
  const {_id} = req.user;
  const loads = await Load.find({assigned_to: _id}, (err, doc) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Database Error", error: err}));
    }
  });

  if (loads.length === 0) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "No loads", loads}));
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({status: "Success", loads}));
};

module.exports = getDriverLoads;

/**
 *
 * @api {get} /driver/loads Get Loads
 * @apiName GetLoads
 * @apiGroup Driver
 *
 * @apiDescription Get loads for driver
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/driver/loads
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiSuccess {String} status  Request status
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "status": "Success",
 *   "loads": [
 *       {
 *           "dimensions": {
 *               "width": 50,
 *               "length": 100,
 *               "height": 50
 *           },
 *           "_id": "5e8cc7c1ada9582a7431ecf5",
 *           "created_by": "5e8cc7a0ada9582a7431ecf4",
 *           "assigned_to": "5e8cc742ada9582a7431ecf2",
 *           "truck": "5e8cc757ada9582a7431ecf3",
 *           "status": "shipped",
 *           "state": "Arrived to delivery",
 *           "logs": [
 *               {
 *                   "_id": "5e8cc7c1ada9582a7431ecf6",
 *                   "message": "Created",
 *                   "time": "1586284481489"
 *               },
 *               {
 *                   "_id": "5e8cc7f6ada9582a7431ecf7",
 *                   "message": "Posted",
 *                   "time": "1586284534666"
 *               },
 *               {
 *                   "_id": "5e8cc7f6ada9582a7431ecfa",
 *                   "message": "Assigned to 5e8cc742ada9582a7431ecf2",
 *                   "time": "1586284534889"
 *               }
 *           ],
 *           "payload": 3000,
 *           "__v": 0
 *       }
 *   ]
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *     status: "No loads",
 *     loads: []
 *     }
 *
 * @apiError DatabAseError Some error in database
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 DataBaseError error
 *    {
 *      status: "Database Error",
 *      error: {Object},
 *    }
 *
 */
