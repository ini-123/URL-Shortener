const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createUrl,
  getMyUrls,
  redirectToOriginal,
  getStats,
  removeUrl,
} = require('../controllers/urlController');

// Create a new shortened URL
router.post('/create', protect, createUrl);

// Get all URLs belonging to the logged-in user
router.get('/my-urls', protect, getMyUrls);

// Get click statistics for a specific URL (owner only)
router.get('/:shortCode/stats', protect, getStats);

// Delete a URL (owner only)
router.delete('/:shortCode/delete', protect, removeUrl);

module.exports = router;
