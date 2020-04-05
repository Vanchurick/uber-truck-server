const Joi = require("@hapi/joi");

const schema = Joi.object({
  operation: Joi.string()
    .pattern(new RegExp("assign|update|remove"))
    .required(),

  data: Joi.object(),
});

module.exports = schema;
