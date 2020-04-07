const Joi = require("@hapi/joi");

const schema = Joi.object({
  state: Joi.string().pattern(new RegExp("atpu|ertd|atd")).required(),
});

module.exports = schema;
