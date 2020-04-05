module.exports = (id, data) => {
  const load = {
    created_by: id,
    assigned_to: "",
    status: "new",
    ...data,
  };

  return load;
};
