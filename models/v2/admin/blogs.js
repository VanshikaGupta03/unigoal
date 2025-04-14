const dbConfig = require("../../../config/dbConfig").connection;
const qb = require("../../../config/dbConfig").qb;

// const pool = require('../../../config/dbConfig2');

class Blog {
  static async create(blogData, sections) {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        'INSERT INTO blogs (title, cover_image, tags, status, category, summary, editors_pick, featured, author_name, author_image, time_taken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [blogData.title, blogData.cover_image, blogData.tags, '1', blogData.category, blogData.summary, blogData.editors_pick, blogData.featured, blogData.author_name, blogData.author_image, blogData.time_taken]
      );

      const blogId = result.insertId;

      const sectionQueries = sections.map(section =>
        conn.query(
          'INSERT INTO blog_sections (blog_id, section_name, content, status) VALUES (?, ?, ?, ?)',
          [blogId, section.section_name, section.content, '1']
        )
      );

      await Promise.all(sectionQueries);

      return blogId;
    } finally {
      conn.release();
    }
  }

  static async getAll(page, limit, search) {
    const offset = (page - 1) * limit;
    const searchQuery = `%${search}%`;
  
    const [rows] = await pool.query(
      'SELECT SQL_CALC_FOUND_ROWS id, title, cover_image, tags, category, status, editors_pick, featured, author_name, author_image, time_taken ' +
      'FROM blogs ' +
      'WHERE (status != "2" OR status IS NULL) ' +
      'AND title LIKE ? ' +
      'LIMIT ? OFFSET ?',
      [searchQuery, limit, offset]
    );
  
    const [totalRows] = await pool.query('SELECT FOUND_ROWS() as count');
    const total_count = totalRows[0].count;
  
    return { blogs: rows, total_count };
  }
  
  static async getById(id) {
    const [blogRows] = await pool.query('SELECT id, title, cover_image, tags, category, status, summary, editors_pick, featured, author_name, author_image, time_taken FROM blogs WHERE id = ? AND (status != "2" OR status IS NULL)', [id]);
    if (blogRows.length === 0) return null;
    const [sectionRows] = await pool.query('SELECT id, blog_id, section_name, content FROM blog_sections WHERE blog_id = ?', [id]);
    return { ...blogRows[0], sections: sectionRows };
  }

  static async update(id, blogData, sections) {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'UPDATE blogs SET title = ?, cover_image = ?, tags = ?, status = ?, category = ?, summary = ?, editors_pick = ?, featured = ?, author_name = ?, author_image = ?, time_taken = ? WHERE id = ?',
        [blogData.title, blogData.cover_image, blogData.tags, "1", blogData.category, blogData.summary, blogData.editors_pick, blogData.featured, blogData.author_name, blogData.author_image, blogData.time_taken, id]
      );

      await conn.query('DELETE FROM blog_sections WHERE blog_id = ?', [id]);

      const sectionQueries = sections.map(section =>
        conn.query(
          'INSERT INTO blog_sections (blog_id, section_name, content) VALUES (?, ?, ?)',
          [id, section.section_name, section.content, section.status]
        )
      );

      await Promise.all(sectionQueries);
    } finally {
      conn.release();
    }
  }
  
  static async updateField(id, key, value) {
    const connection = await pool.getConnection();
    try {
      if (key === 'status' && value === '2') {
        // Implement soft delete
        await connection.query('UPDATE blogs SET status = ?, deleted_at = NOW() WHERE id = ?', [value, id]);
      } else {
        await connection.query(`UPDATE blogs SET ${key} = ? WHERE id = ?`, [value, id]);
      }
      const [updatedRows] = await connection.query('SELECT * FROM blogs WHERE id = ?', [id]);
      return updatedRows[0];
    } finally {
      connection.release();
    }
  }
}

module.exports = Blog;