const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  surname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  phone: Joi.string().pattern(new RegExp(/\d{11}/)),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {allow: ["com", "net"]},
  }),

  driver: Joi.boolean().truthy("Y"),
});

module.exports = schema;
