const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');

const {createUrlValidation, shortCodeValidation} = require('../validations/urlValidation');
const {createUrl, getMyUrls, getStats, removeUrl} = require('../controllers/urlController');


// Create a new shortened URL
router.post('/create', protect, createUrlValidation, validate, createUrl);

// Get all URLs belonging to the logged-in user
router.get('/my-urls', protect, getMyUrls);

// Get click statistics for a specific URL (owner only)
router.get('/:shortCode/stats', protect, shortCodeValidation, validate, getStats);

// Delete a URL (owner only)
router.delete( '/:shortCode/delete', protect, shortCodeValidation, validate, removeUrl);

module.exports = router;
