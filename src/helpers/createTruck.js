const TRUCK_TYPES = {
  sprinter: {
    dimensions: {width: 250, length: 300, height: 170},
    payload: 1700,
  },
  ss: {
    dimensions: {width: 250, length: 500, height: 170},
    payload: 2500,
  },
  ls: {
    dimensions: {width: 350, length: 700, height: 200},
    payload: 4000,
  },
};

module.exports = (id, type) => {
  const truck = {
    created_by: id,
    assigned_to: "",
    status: "is",
    load: "",
    type,
    dimensions: TRUCK_TYPES[type].dimensions,
    payload: TRUCK_TYPES[type].payload,
  };

  return truck;
};
