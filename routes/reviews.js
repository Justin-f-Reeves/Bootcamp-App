const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');
const reviews = require('../controllers/reviews');

router.route('/')
    .get(wrapAsync(reviews.showReviews))
    .post(isLoggedIn, validateReview, wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview))

module.exports = router;

