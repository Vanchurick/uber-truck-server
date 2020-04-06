const Joi = require("@hapi/joi");

const schema = Joi.object({
  operation: Joi.string().pattern(new RegExp("post|update")).required(),

  data: Joi.object({
    logs: Joi.object({
      message: Joi.string(),
      time: Joi.string(),
      date: Joi.string(),
    }),
    dimensions: Joi.object({
      width: Joi.number(),
      length: Joi.number(),
      height: Joi.number(),
    }),
    payload: Joi.number(),
  }),
});

module.exports = schema;
