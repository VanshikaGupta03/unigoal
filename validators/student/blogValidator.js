const Joi = require('joi');

const blogQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
  category: Joi.string().trim().allow('')
});

module.exports = {
  validateBlogQuery: (data) => blogQuerySchema.validate(data)
};