const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const organizationSchema = mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
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
organizationSchema.plugin(toJSON);

organizationSchema.plugin(paginate);
/**
 * @typedef organization
 */
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
