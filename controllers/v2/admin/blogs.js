require("dotenv").config();
const async = require("async");

const Blog = require('../../../models/v2/admin/blogs');

exports.createBlog = async (req, res) => {
  try {
    const { title, cover_image, tags, status, category, summary, editors_pick, featured, author_name, author_image, time_taken, sections } = req.body;
    const blogId = await Blog.create({ title, cover_image, tags, status, category, summary, editors_pick, featured, author_name, author_image, time_taken }, sections);
    const createdBlog = await Blog.getById(blogId);
    res.status(200).json({ 
      message: 'Blog created successfully', 
      data: createdBlog 
    });
  } catch (error) {
    console.error('Error in createBlog:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const { blogs, total_count } = await Blog.getAll(page, limit, search);
    
    res.json({
      message: 'Blogs retrieved successfully',
      total_count,
      data: blogs
    });
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
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

exports.updateBlog = async (req, res) => {
  try {
    const { title, cover_image, tags, status, category, summary, editors_pick, featured, author_name, author_image, time_taken, sections } = req.body;
    await Blog.update(req.params.id, { title, cover_image, tags, status, category, summary, editors_pick, featured, author_name, author_image, time_taken }, sections);
    const updatedBlog = await Blog.getById(req.params.id);
    res.json({
      message: 'Blog updated successfully',
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error in updateBlog:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.updateBlogField = async (req, res) => {
    const { key, value } = req.body;
    const blogId = req.params.id;

    // Allowed keys and values
    const allowedKeys = ['status', 'featured', 'editors_pick'];
    const allowedValues = ['0', '1', '2'];

    // Validate key and value
    if (!allowedKeys.includes(key)) {
        return res.status(400).json({ message: 'Invalid key provided' });
    }

    if (key === 'status' && !allowedValues.includes(value)) {
        return res.status(400).json({ message: 'Invalid value provided for status' });
    }

    if ((key === 'featured' || key === 'editors_pick') && !['0', '1'].includes(value)) {
        return res.status(400).json({ message: `Invalid value provided for ${key}` });
    }

    try {
     
        const blog = await Blog.getById(blogId);
      
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found....' });
        }
        
        const updatedBlog = await Blog.updateField(blogId, key, value);

        if (key === 'status') {
            if (value === '0') {
                updatedBlog.status_description = 'inactive';
            } else if (value === '1') {
                updatedBlog.status_description = 'active';
            } else if (value === '2') {
                updatedBlog.status_description = 'deleted';
            }
        }

        res.json({
          message: 'Blog updated successfully', 
          data: updatedBlog 
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
};