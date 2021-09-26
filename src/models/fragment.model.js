const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fragmentSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    organization: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Organization',
      required: true,
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fragmentSchema.plugin(toJSON);
fragmentSchema.plugin(paginate);

/**
 * @typedef Fragment
 */
const Fragment = mongoose.model('Fragment', fragmentSchema);

module.exports = Fragment;
