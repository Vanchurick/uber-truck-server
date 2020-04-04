const path = require("path");
const fs = require("fs");

module.exports = (name) => {
  const secretCodeFilePath = path.resolve(
    __dirname,
    "..",
    "db",
    `${name}secretCode.json`,
  );

  fs.unlink(secretCodeFilePath, (err) => {
    if (err) throw err;
    console.log(`${secretCodeFilePath} was deleted`);
  });
};
