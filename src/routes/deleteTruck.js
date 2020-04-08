const Truck = require("../db/schemas/truck");

const deleteTruck = async (req, res) => {
  const {id} = req.params;
  const {_id} = req.user;

  const truck = await Truck.findById(id, (err) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Database Error", error: err}));
      return;
    }
  });

  if (truck.assigned_to === _id) {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Truck is assigned to driver"}));
    return;
  }

  await Truck.findByIdAndRemove(id, (err) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Database Error", error: err}));
      return;
    }

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Truck have been removed"}));
    return;
  });
};

module.exports = deleteTruck;

/**
 *
 * @api {delete} /truck/:id Delete Truck
 * @apiName DeleteTruck
 * @apiGroup Driver
 *
 * @apiDescription Delete truck
 *
 * @apiExample {js} Example usage:
 * http://localhost:2306/api/truck/5e8cc757ada9582a7431ecf3
 *
 * @apiHeader {String} Authorization Users unique token
 * "Bearer <code>token</code>".
 *
 * @apiSuccess {String} status  Request status
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *    "status": "Truck have been removed"
 *  }
 *
 * @apiError DatabAseError Sone error in database
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 DataBaseError error
 *    {
 *      status: "Database Error",
 *      error: {Object},
 *    }
 *
 * @apiError AssignedError Truck has status assigned
 * and can`t be removed
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 AssignedError error
 *    {
 *      status: "Truck is assigned to driver",
 *    }
 */
