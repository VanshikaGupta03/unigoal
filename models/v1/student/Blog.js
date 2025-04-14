const dbConfig = require("../../../config/dbConfig").connection;
const qb = require("../../../config/dbConfig").qb;

// const pool = require('../../config/database');

class Blog {
  static async getFeatured(page = 1, limit = 10, category = '') {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM blogs WHERE featured = "1" AND status = "1"';  
    const queryParams = []; 

    if (category) {
        query += ' AND category = ?';
        queryParams.push(category);
    }

    query += ' ORDER BY id ';
    

    const [rows] = await pool.query(query, queryParams);
    
    return rows;
  }

  static async getEditorsPicks(page = 1, limit = 10, category = '') {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM blogs WHERE editors_pick = "1" AND status = "1"';
    const queryParams = [];

    if (category) {
      query += ' AND category = ?';
      queryParams.push(category);
    }

    query += ' ORDER BY id DESC';
    

    const [rows] = await pool.query(query, queryParams);
    
    return rows;
  }

  static async getAll(page = 1, limit = 10, category = '') {
    const offset = (page - 1) * limit;
    let query = 'SELECT SQL_CALC_FOUND_ROWS * FROM blogs WHERE status = "1"';
    const queryParams = [];

    if (category) {
      query += ' AND category = ?';
      queryParams.push(category);
    }

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [rows] = await pool.query(query, queryParams);
    const [totalRows] = await pool.query('SELECT FOUND_ROWS() as count');
    const total_count = totalRows[0].count;
    
    return {
      blogs: rows,
      total_count
    };
  }

  static async getById(id) {
    const [blogRows] = await pool.query('SELECT id, title, cover_image, tags, category, status, summary, editors_pick, featured, author_name, author_image, time_taken FROM blogs WHERE id = ? AND status = "1"', [id]);
    if (blogRows.length === 0) return null;
    const [sectionRows] = await pool.query('SELECT id, blog_id, section_name, content FROM blog_sections WHERE blog_id = ?', [id]);
    return { ...blogRows[0], sections: sectionRows };
  }
}

module.exports = Blog;