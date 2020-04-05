const Truck = require("../db/schemas/truck");

module.exports = async (truckID, data, userID) => {
  const truck = await Truck.findById(truckID);

  if (truck.assigned_to !== userID) {
    const result = await Truck.findByIdAndUpdate(truckID, data, (err, doc) => {
      if (err) {
        throw new Error("error");
      }
    });

    return result;
  }

  if (truck.assigned_to === userID) {
    return {status: "Truck is assigned to driver"};
  }
};
