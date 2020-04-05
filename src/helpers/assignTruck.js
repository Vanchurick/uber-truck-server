const Truck = require("../db/schemas/truck");

module.exports = async (truckID, driverID) => {
  const result = await Truck.findByIdAndUpdate(
    truckID,
    {assigned_to: driverID},
    (err, doc) => {
      if (err) {
        throw new Error("error");
      }
    },
  );

  await Truck.updateMany(
    {created_by: /\b(?!${driverID})\b\S/},
    {assigned_to: ""},
  );

  return result;
};
