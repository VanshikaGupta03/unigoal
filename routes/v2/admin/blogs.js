/*
 * @Author: Hitesh Sehgal
 * @Date: August 8th, 2024
 */

let express = require("express"),
  router = express.Router(),
  authHandler = require("../../../helpers/verifyToken");

const { validateBlogMiddleware, validateBlogUpdate } = require('../../../validators/admin/blogs_validation');
const blogController = require('../../../controllers/v2/admin/blogs');


router.post('/addBlog', validateBlogMiddleware, authHandler.verifyToken, blogController.createBlog);
router.get('/getList', authHandler.verifyToken, blogController.getAllBlogs);
router.get('/getListById/:id', authHandler.verifyToken, blogController.getListById);
router.put('/updateBlog/:id', validateBlogMiddleware, authHandler.verifyToken, blogController.updateBlog);
router.put('/update-field/:id', validateBlogUpdate, authHandler.verifyToken, blogController.updateBlogField);


module.exports = router;