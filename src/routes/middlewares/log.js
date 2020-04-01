module.exports = (req, resp, next) => {
  console.log("                                       ");
  console.log(`Request METHOD: ${req.method}`);
  console.log("=======================================");
  console.log(`Request URL: ${req.url}`);
  console.log("=======================================");
  console.log("Request BODY:");
  console.log(req.body || {});
  console.log("=======================================");
  console.log("---------------------------------------");
  console.log("=======================================");
  next();
};
