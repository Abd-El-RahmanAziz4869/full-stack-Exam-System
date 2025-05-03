const Joi = require('joi');

const examSchema = Joi.object({
  title: Joi.string().min(3).required(),
  duration: Joi.number().integer().min(1).required(),
});

module.exports = examSchema;