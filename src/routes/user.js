const findUserInDB = require("../helpers/findUserInDB");

const user = async (req, res) => {
  const userInDB = await findUserInDB(req.user);

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(userInDB));
};

module.exports = user;
