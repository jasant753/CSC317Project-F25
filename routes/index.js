/**
 * Index routes
 * Handles public routes that don't require authentication
 */
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Home page route
router.get('/', async (req, res, next) => {
    try {
        const featuredReviews = await Review.getRandomReviews(4);

  res.render('index', {
    title: 'Home',
            featuredReviews
        });
    } catch (err) {
        next(err);
    }
});

// About page route
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        message: 'Learn about this application'
    });
});

module.exports = router;
