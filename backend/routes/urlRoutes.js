const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');

const {
  createUrl,
  getMyUrls,
  redirectToOriginal,
  getStats,
  removeUrl,
} = require('../controllers/urlController');

const {
  createUrlValidation,
  shortCodeValidation,
} = require('../validations/urlValidation');

const validate = require('../middlewares/validateMiddleware');

// Create a new shortened URL
router.post(
  '/create',
  protect,
  createUrlValidation,
  validate,
  createUrl
);

// Get all URLs belonging to the logged-in user
router.get(
  '/my-urls',
  protect,
  getMyUrls
);

// Get click statistics for a specific URL
router.get(
  '/:shortCode/stats',
  protect,
  shortCodeValidation,
  validate,
  getStats
);

// Delete a URL
router.delete(
  '/:shortCode/delete',
  protect,
  shortCodeValidation,
  validate,
  removeUrl
);

// Redirect to the original URL
router.get(
  '/:shortCode',
  shortCodeValidation,
  validate,
  redirectToOriginal
);

module.exports = router;