const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema(
  {
    clickedAt: {
      type: Date,
      default: Date.now,
    },
    userAgent: {
      type: String,
    },
    referrer: {
      type: String,
    },
  },
  { _id: false },
);

const urlSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: [clickSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Url', urlSchema);
