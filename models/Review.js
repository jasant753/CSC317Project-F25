const { pool } = require('../config/database');

// Create review row in database
async function createReview({ userId, movieId, rating, comment }) {
    const result = await pool.query(
        `INSERT INTO reviews (user_id, movie_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
        [userId, movieId, rating, comment]
    );
    return result.rows[0];
}

// Get all reviews for movie
async function getReviewsForMovie(movieId) {
    const result = await pool.query(
        `SELECT r.*, u.username
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.movie_id = $1
     ORDER BY r.created_at DESC`,
        [movieId]
    );
    return result.rows;
}

module.exports = {
    createReview,
    getReviewsForMovie,
};
