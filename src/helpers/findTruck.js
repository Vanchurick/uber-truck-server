const Truck = require("../db/schemas/truck");
const Load = require("../db/schemas/load");

module.exports = async (load) => {
  const {
    _id,
    dimensions: {width, height, length},
    payload,
  } = load;

  const trucks = await Truck.find({}, (err, doc) => {
    if (err) {
      throw new Error("error");
    }
  });

  const truck = trucks.find((truck) => {
    if (truck.status === "is") {
      if (truck.payload >= payload) {
        if (
          truck.dimensions.width >= width &&
          truck.dimensions.height >= height &&
          truck.dimensions.length >= length
        ) {
          return truck;
        }
      }
    }
  });

  if (truck) {
    await Truck.findByIdAndUpdate(
      truck._id,
      {status: "ol", load: _id},
      (err, doc) => {
        if (err) {
          throw new Error("error");
        }
      },
    );

    const assignedLoad = await Load.findByIdAndUpdate(
      _id,
      {
        status: "assigned",
        state: "En route to pick up",
        assigned_to: truck.created_by,
        logs: [
          ...load.logs,
          {message: `Assigned to ${truck.created_by}`, time: Date.now()},
        ],
      },
      (err, doc) => {
        if (err) {
          throw new Error("error");
        }
      },
    );

    return {load: assignedLoad};
  }
  return false;
};
