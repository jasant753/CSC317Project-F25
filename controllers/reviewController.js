const Movie = require('../models/Movie');
const Review = require('../models/Review');

async function showNewReviewForm(req, res) {
    // Require login
    if (!req.session.user) {
        req.session.flashMessage = {
            type: 'error',
            text: 'You must be logged in to add a review.'
        };
        return res.redirect('/auth/login');
    }

    res.render('reviews/new', {
        title: 'Add Review',
        path: '/reviews/new',
        isAuthenticated: !!req.session.user,
        errors: [],
        oldInput: { movieTitle: '', rating: '', comment: '' },
    });
}

async function createReview(req, res, next) {
    try {
        if (!req.session.user) {
            req.session.flashMessage = {
                type: 'error',
                text: 'You must be logged in to add a review.',
            };
            return res.redirect('/auth/login');
        }

        const { movieTitle, rating, comment } = req.body;

        // Error handling
        const errors = [];

        if (!movieTitle || movieTitle.trim() === '') {
            errors.push({ msg: 'Movie title is required.' });
        }

        const numericRating = Number(rating);
        if (!rating || Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            errors.push({ msg: 'Rating must be a number between 1 and 5.' });
        }

        if (errors.length > 0) {
            return res.status(400).render('reviews/new', {
                title: 'Add Review',
                path: '/reviews/new',
                isAuthenticated: !!req.session.user,
                errors,
                oldInput: { movieTitle, rating, comment },
            });
        }

        // Find or create movie
        const trimmedTitle = movieTitle.trim();

        let movie = await Movie.findByTitle(trimmedTitle);
        if (!movie) {
            movie = await Movie.create(trimmedTitle);
        }

        // Create the review linked to user and movie
        await Review.createReview({
            userId: req.session.user.id,
            movieId: movie.id,
            rating: numericRating,
            comment: comment || '',
        });

        req.session.flashMessage = {
            type: 'success',
            text: 'Your review has been added!',
        };
        res.redirect(`/movies/${movie.id}`); // or '/' for now

    } catch (err) {
        next(err);
    }
}

module.exports = {
    showNewReviewForm,
    createReview,
};
