const Joi = require("@hapi/joi");

const schema = Joi.object({
  dimensions: Joi.object({
    width: Joi.number().required(),
    length: Joi.number().required(),
    height: Joi.number().required(),
  }).required(),

  payload: Joi.number().required(),
});

module.exports = schema;
