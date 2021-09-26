const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      index: true,
    },
    serverId: {
      type: String,
      required: true,
    },
    messagingSenderId: {
      type: String,
      required: true,
    },
    totalUsers: {
      type: String,
      required: false,
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
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
/**
 * @typedef product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
