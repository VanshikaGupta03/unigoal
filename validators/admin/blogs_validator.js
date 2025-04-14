const Joi = require('joi');

const blogSchema = Joi.object({
  title: Joi.string().required(),
  cover_image: Joi.string().required(),
  tags: Joi.string().required(),
  category: Joi.string().allow(null, ''),
  author_name: Joi.string().required(),
  author_image: Joi.string().required(),
  time_taken: Joi.string().required(),
  summary: Joi.string(),
  editors_pick: Joi.string().valid('0', '1'),
  featured: Joi.string().valid('0', '1'),
  sections: Joi.array().items(
    Joi.object({
      section_name: Joi.string().required(),
      content: Joi.string().allow(null, '')
    })
  ).min(1).required()
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('0', '1', '2').required()
});

module.exports = {
  validateBlog: (blog) => blogSchema.validate(blog, { abortEarly: false }),
  validateStatusUpdate: (data) => statusUpdateSchema.validate(data, { abortEarly: false })
};