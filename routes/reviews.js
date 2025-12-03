const express = require('express');
const { showNewReviewForm, createReview } = require('../controllers/reviewController');

const router = express.Router();

// Show the "Add Review" form
router.get('/new', showNewReviewForm);

// Handle form submission
router.post('/', createReview);

module.exports = router;
