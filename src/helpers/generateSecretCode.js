const shortid = require("shortid");
const path = require("path");
const fs = require("fs");

module.exports = (name) => {
  const secretCode = shortid.generate();

  const secretCodeFilePath = path.resolve(
    __dirname,
    "..",
    "db",
    `${name}secretCode.json`,
  );

  fs.writeFile(secretCodeFilePath, JSON.stringify({secretCode}), (error) => {
    if (error) throw error;
  });

  return secretCode;
};
