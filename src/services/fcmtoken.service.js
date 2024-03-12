const axios = require('axios');
const httpStatus = require('http-status');
const Product = require('../models/product.model');
const FcmTokens = require('../models/fcmtoken.model');
const userService = require('./user.service');
const organizationService = require('./organization.service');
const fragmentService = require('./fragment.service');
const ApiError = require('../utils/ApiError');

/**
 * Get getProduct by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};

const getFcmTokenDeviceId = async (id) => {
  return FcmTokens.find({ deviceId: id });
};

const getFcmTokenByProductId = async (id) => {
  return FcmTokens.find({ product: id });
};

const getOrgById = async (id) => {
  return organizationService.getOrgById(id);
};

const sendPushNotification = async (tokenBody) => {
  const product = await getProductById(tokenBody.product);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  const org = await getOrgById(tokenBody.orgId);
  if (!org) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Org not found');
  }

  const fragment = await fragmentService.getFragmentById(tokenBody.campaignId);
  if (!fragment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Campaign not found');
  }

  const fcmTokenList = await getFcmTokenByProductId(tokenBody.product);
  if (!fcmTokenList) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FCM token not found');
  }

  const tokenList = [];

  fcmTokenList.forEach((element) => {
    tokenList.push(element.token);
  });

  const request = {
    registration_ids: tokenList,
    notification: JSON.parse(fragment.notification),
    data: JSON.parse(fragment.data),
  };

  const header = `Bearer ${product.serverId}`;

  const response = await axios.post('https://fcm.googleapis.com/fcm/send', request, {
    headers: {
      '`Authorization`': header,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
/**
 * Create a Product
 * @param {Object} orgBody
 * @returns {Promise<Product>}
 */
const createToken = async (tokenBody) => {
  const product = await getProductById(tokenBody.product);
  const deviceid = await getFcmTokenDeviceId(tokenBody.deviceId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  if (deviceid.length > 0) {
    const fcmToken1 = FcmTokens.updateOne(tokenBody);
    if (!fcmToken1) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
    }
    return fcmToken1;
  }

  if (deviceid.length === 0) {
    const fcmToken2 = FcmTokens.create(tokenBody);
    if (!fcmToken2) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
    }
    return fcmToken2;
  }
};
/**
 * Get Product List by userId
 * @param {object} id
 * @returns {Promise<Product>}
 */

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProduct = async (filter, options) => {
  const org = await Product.paginate(filter, options);
  return org;
};

/**
 *
 * Get Product by id
 * @param {object} id
 * @returns {Promise<Product>}
 */
const getProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  product.serverId = '';
  return product;
};

/**
 *
 * Update Product
 * @param {object} id
 * @returns {Promise<Product>}
 */
const updateProduct = async (productUpdate) => {
  const user = await userService.getUserById(productUpdate.user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const org = await organizationService.getOrgById(productUpdate.organization);

  if (!org) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Organization not found');
  }
  const product = await getProductById(productUpdate.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, productUpdate);
  await product.save();
  product.serverId = '';
  return product;
};
/**
 *
 * Delete By Product by Id
 * @param {object} orgdelete
 * @returns {Promise<Product>}
 */
const deleteProduct = async (productDelete) => {
  const product = await getProductById(productDelete);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const products = Product.deleteOne(productDelete);
  if (products == null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return products;
};

module.exports = {
  createToken,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  queryProduct,
  sendPushNotification,
};
