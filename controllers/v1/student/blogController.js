const Blog = require('../../../models/v1/student/Blog');

exports.getFeaturedBlogs = async (req, res) => {
  try {
    const { page, limit, category } = req.validatedQuery;
    const featuredBlogs = await Blog.getFeatured(page, limit, category);
    res.json({ success: true, data: featuredBlogs.blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getEditorsPicks = async (req, res) => {
  try {
    const { page, limit, category } = req.validatedQuery;
    const editorsPicks = await Blog.getEditorsPicks(page, limit, category);
    res.json({ success: true, data: editorsPicks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const { page, limit, category } = req.validatedQuery;
    const { blogs, total_count } = await Blog.getAll(page, limit, category);
    res.json({ 
      success: true, 
      total_count,
      data: blogs 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// blogController.js (student module)

exports.getAllBlogData = async (req, res) => {
  try {
    const { page, limit, category } = req.validatedQuery;
    const [featured, editorsPicks, allBlogs] = await Promise.all([
      Blog.getFeatured(page, limit, category),
      Blog.getEditorsPicks(page, limit, category),
      Blog.getAll(page, limit, category)
    ]);

    res.json({
      success: true,
      total_count: allBlogs.total_count,
      data: {
        featured,
        editorsPicks,
        allBlogs: allBlogs.blogs
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getListById = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const blog = await Blog.getById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({
      message: 'Blog details retrieved successfully',
      data: blog
    }); 
  } catch (error) {
    console.error('Error in getListById:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};