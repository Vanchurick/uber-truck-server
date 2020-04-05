const Joi = require("@hapi/joi");

const schema = Joi.object({
  type: Joi.string().pattern(new RegExp("sprinter|ss|ls")).required(),
});

module.exports = schema;
