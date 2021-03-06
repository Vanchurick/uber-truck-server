const Joi = require("@hapi/joi");

const schema = Joi.object({
  operation: Joi.string().pattern(new RegExp("assign|update")).required(),

  data: Joi.object({
    type: Joi.string().pattern(new RegExp("sprinter|ss|ls")),
    dimensions: Joi.object({
      width: Joi.number(),
      length: Joi.number(),
      height: Joi.number(),
    }),
    payload: Joi.number(),
  }),
});

module.exports = schema;
