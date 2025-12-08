// routes/movies.js
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
const Review = require('../models/Review');

// GET /movies - List and search movies
router.get('/', async (req, res, next) => {
    try {
        const q = req.query.q;
        let movies;

        if (q && q.trim() !== '') {
            movies = await Movie.searchByTitle(q.trim());
        } else {
            movies = await Movie.findAll();
        }

        res.render('movies/index', {
            title: 'Movies',
            movies,
            searchQuery: q || ''
        });
    } catch (err) {
        next(err);
    }
});

// GET /movies/:id - Show one movie and its reviews
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
