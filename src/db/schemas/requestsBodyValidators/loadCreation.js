const Joi = require("@hapi/joi");

const schema = Joi.object({
  logs: Joi.object({
    message: Joi.string().required(),
    time: Joi.string().required(),
    date: Joi.string().required(),
  }).required(),
  dimensions: Joi.object({
    width: Joi.number().required(),
    length: Joi.number().required(),
    height: Joi.number().required(),
  }).required(),

  payload: Joi.number().required(),
});

module.exports = schema;
