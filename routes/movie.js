// routes/movies.js
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
const Review = require('../models/Review');

// GET /movies/:id - show one movie and its reviews
router.get('/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;

    // Find the movie
    const movie = await Movie.findById(movieId);
    if (!movie) {
      const error = new Error('Movie not found');
      error.statusCode = 404;
      throw error;
    }

    // Get all reviews for this movie
    const reviews = await Review.getReviewsForMovie(movieId);

    // Render a movie details page (you'll create views/movies/show.ejs later)
    res.render('movies/show', {
      title: movie.title,
      movie,
      reviews
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;