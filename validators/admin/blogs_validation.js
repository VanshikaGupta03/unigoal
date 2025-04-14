const Joi = require('joi');
const { validateBlog } = require('./blogs_validator');
const validateBlogMiddleware = (req, res, next) => {
  const { error } = validateBlog(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map(detail => detail.message) });
  }
  next();
};

const validateBlogUpdate = (req, res, next) => {
 
  const schema = Joi.object({
      key: Joi.string().valid('status', 'featured', 'editors_pick').required(),
      value: Joi.string().when('key', {
          is: 'status',
          then: Joi.valid('0', '1', '2').required(),
          otherwise: Joi.valid('0', '1').required()
      })
  });

  const { error } = schema.validate(req.body);

  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

  next();
};




module.exports = {
  validateBlogMiddleware,
  validateBlogUpdate
};