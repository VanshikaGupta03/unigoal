const express = require('express');
const router = express.Router();
const blogController = require('../../../controllers/v1/student/blogController');
const { validateBlogQueryMiddleware } = require('../../../validators/student/blogValidationMiddleware');

router.get('/', validateBlogQueryMiddleware, blogController.getAllBlogData);
router.get('/getListById/:id', blogController.getListById);

module.exports = router;