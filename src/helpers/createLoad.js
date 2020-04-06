module.exports = (id, data) => {
  const load = {
    created_by: id,
    assigned_to: "",
    status: "new",
    state: "",
    logs: [{message: "Created", time: Date.now()}],
    ...data,
  };

  return load;
};
