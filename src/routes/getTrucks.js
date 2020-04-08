const Truck = require("../db/schemas/truck");

const getTrucks = (req, res) => {
  const {_id} = req.user;
  Truck.find({created_by: _id})
    .then((trucks) => {
      if (trucks.length === 0) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({status: "No trucks", trucks}));
        return;
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Trucks in DB", trucks}));
    })
    .catch((err) => {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Dtabase error", error: err}));
    });
};

module.exports = getTrucks;

/**
 *
 * @api {get} /trucks Get trucks
 * @apiName GetTrucks
 * @apiGroup Driver
 *
 * @apiDescription Get list all created truck by driver
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/trucks
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiSuccess {String} status  Request status
 * @apiSuccess {Array} truck  Created trucks
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "status": "Trucks in DB",
 *   "trucks": [
 *      {
 *          "dimensions": {
 *              "width": 350,
 *              "length": 700,
 *              "height": 200
 *          },
 *          "_id": "5e8cc757ada9582a7431ecf3",
 *          "created_by": "5e8cc742ada9582a7431ecf2",
 *          "assigned_to": "",
 *          "status": "is",
 *          "load": "",
 *          "type": "ls",
 *          "payload": 4000,
 *          "__v": 0
 *      }
 *   ]
 * }
 *
 * @apiError ValidationError Error request body validation
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 ValidationError error
 *    {
 *      status: "Database error",
 *      error: {Object},
 *    }
 */
