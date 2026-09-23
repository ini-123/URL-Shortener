const Url = require('../models/url');
const generateShortCode = require('../utils/generateShortCode');

const generateUniqueShortCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = generateShortCode();
    const existingUrl = await Url.findOne({ shortCode: code });
    exists = existingUrl ? true : false;
  }

  return code;
};

const createShortUrl = async (originalUrl, userId) => {
  if (typeof originalUrl !== 'string' || !/^https?:\/\//.test(originalUrl)) {
    throw new Error('Invalid URL format');
  }

  const shortCode = await generateUniqueShortCode();

  const newUrl = new Url({
    user: userId,
    originalUrl,
    shortCode,
    clicks: [],
  });

  await newUrl.save();

  return newUrl;
};

const getUserUrls = async (userId) => {
  return await Url.find({ user: userId }).sort({ createdAt: -1 });
};

const getUrlByShortCode = async (shortCode) => {
  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new Error('URL not found');
  }
  return url;
};

const recordClick = async (shortCode, userAgent, referrer) => {
  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new Error('URL not found');
  }

  url.clicks.push({
    clickedAt: new Date(),
    userAgent: userAgent || null,
    referrer: referrer || null,
  });

  await url.save();

  return url;
};

const getUrlStats = async (shortCode, userId) => {
  const url = await Url.findOne({ shortCode });

  if (!url) {
    throw new Error('URL not found');
  }

  if (url.user.toString() !== userId) {
    throw new Error('Not authorized to view these statistics');
  }

  const totalClicks = url.clicks.length;
  const lastClicked =
    totalClicks > 0 ? url.clicks[totalClicks - 1].clickedAt : null;

  return {
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    totalClicks,
    lastClicked,
  };
};

const deleteUrl = async (shortCode, userId) => {
  const url = await Url.findOne({ shortCode });

  if (!url) {
    throw new Error('URL not found');
  }

  if (url.user.toString() !== userId) {
    throw new Error('Not authorized to delete this URL');
  }

  await Url.deleteOne({ shortCode });

  return true;
};

module.exports = {
  createShortUrl,
  getUserUrls,
  getUrlByShortCode,
  recordClick,
  getUrlStats,
  deleteUrl,
};
