const express = require('express');

const {
  getAllReviews,
  createReview
} = require('../controllers/reviewController');

const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllReviews)
  .post(createReview);

module.exports = router;
