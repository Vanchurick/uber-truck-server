const path = require("path");
const fs = require("fs");

module.exports = (name, secret) => {
  const secretCodeFilePath = path.resolve(
    __dirname,
    "..",
    "db",
    `${name}secretCode.json`,
  );

  const secretCodeFile = fs.readFileSync(secretCodeFilePath);
  const code = JSON.parse(secretCodeFile).secretCode;

  return code === secret;
};
