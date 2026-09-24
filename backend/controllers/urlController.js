const {
  createShortUrl,
  getUserUrls,
  getUrlByShortCode,
  recordClick,
  getUrlStats,
  deleteUrl,
} = require('../services/urlService');
const { successResponse, errorResponse } = require('../utils/response');

const createUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId = req.user.id;

    const newUrl = await createShortUrl(originalUrl, userId);

    return successResponse(res, 201, 'Short URL created successfully', {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
    });
  } catch (error) {
    return errorResponse(
      res,
      400,
      error.message || 'Failed to create short URL',
    );
  }
};

const getMyUrls = async (req, res) => {
  try {
    const userId = req.user.id;
    const urls = await getUserUrls(userId);

    return successResponse(res, 200, 'URLs retrieved successfully', urls);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Failed to retrieve URLs');
  }
};

const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await getUrlByShortCode(shortCode);

    await recordClick(shortCode, req.get('User-Agent'), req.get('Referer'));

    return res.redirect(url.originalUrl);
  } catch (error) {
    return errorResponse(res, 404, error.message || 'URL not found');
  }
};

const getStats = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const userId = req.user.id;

    const stats = await getUrlStats(shortCode, userId);

    return successResponse(
      res,
      200,
      'URL statistics retrieved successfully',
      stats,
    );
  } catch (error) {
    return errorResponse(
      res,
      400,
      error.message || 'Failed to retrieve statistics',
    );
  }
};

const removeUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const userId = req.user.id;

    await deleteUrl(shortCode, userId);

    return successResponse(res, 200, 'URL deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, error.message || 'Failed to delete URL');
  }
};

module.exports = {
  createUrl,
  getMyUrls,
  redirectToOriginal,
  getStats,
  removeUrl,
};
