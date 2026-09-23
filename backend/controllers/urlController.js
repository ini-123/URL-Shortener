const {
  createShortUrl,
  getUserUrls,
  getUrlByShortCode,
  recordClick,
  getUrlStats,
  deleteUrl,
} = require('../services/urlService');

const createUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId = req.user.id;

    const newUrl = await createShortUrl(originalUrl, userId);

    return res.status(201).json({
      success: true,
      message: 'Short URL created successfully',
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to create short URL',
    });
  }
};

const getMyUrls = async (req, res) => {
  try {
    const userId = req.user.id;
    const urls = await getUserUrls(userId);

    return res.status(200).json({
      success: true,
      message: 'URLs retrieved successfully',
      data: urls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve URLs',
    });
  }
};

const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await getUrlByShortCode(shortCode);

    await recordClick(shortCode, req.get('User-Agent'), req.get('Referer'));

    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || 'URL not found',
    });
  }
};

const getStats = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const userId = req.user.id;

    const stats = await getUrlStats(shortCode, userId);

    return res.status(200).json({
      success: true,
      message: 'URL statistics retrieved successfully',
      data: stats,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to retrieve statistics',
    });
  }
};

const removeUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const userId = req.user.id;

    await deleteUrl(shortCode, userId);

    return res.status(200).json({
      success: true,
      message: 'URL deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete URL',
    });
  }
};

module.exports = {
  createUrl,
  getMyUrls,
  redirectToOriginal,
  getStats,
  removeUrl,
};
