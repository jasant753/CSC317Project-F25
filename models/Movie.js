const { pool } = require('../config/database');

// Finds movie by title (case-insensitive)
async function findByTitle(title) {
    const result = await pool.query(
        'SELECT * FROM movies WHERE LOWER(title) = LOWER($1)',
        [title]
    );
    return result.rows[0] || null;
}

// Find movie by ID
async function findById(id) {
    const result = await pool.query(
        'SELECT * FROM movies WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
}

// Get all movies in order by title
async function findAll() {
  const result = await pool.query(
    'SELECT * FROM movies ORDER BY title ASC'
  );
  return result.rows;
}

// Create new movie title entry
async function create(title) {
    const result = await pool.query(
        'INSERT INTO movies (title) VALUES ($1) RETURNING *',
        [title]
    );
    return result.rows[0];
}

module.exports = {
    findByTitle,
    findById,
    findAll,
    create,
};
