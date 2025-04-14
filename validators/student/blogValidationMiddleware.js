const { validateBlogQuery } = require('./blogValidator');

const validateBlogQueryMiddleware = (req, res, next) => {
  const { error, value } = validateBlogQuery(req.query);
  if (error) {
    return res.status(400).json({ error: error.details.map(detail => detail.message) });
  }
  req.validatedQuery = value;
  next();
};

module.exports = {
  validateBlogQueryMiddleware
};