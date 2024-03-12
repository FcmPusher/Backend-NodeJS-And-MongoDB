const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fcmTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    deviceId: {
      type: String,
      required: true,
      index: true,
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fcmTokenSchema.plugin(toJSON);
fcmTokenSchema.plugin(paginate);
/**
 * @typedef FcmToken
 */
const FcmToken = mongoose.model('FcmToken', fcmTokenSchema);

module.exports = FcmToken;
