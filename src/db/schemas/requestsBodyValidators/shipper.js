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

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  phone: Joi.string().pattern(new RegExp(/\d{11}/)).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {allow: ["com", "net"]},
  }).required(),

  shipper: Joi.boolean().truthy("Y").required(),
});

module.exports = schema;
