const httpStatus = require('http-status');
const Product = require('../models/product.model');
const userService = require('./user.service');
const organizationService = require('./organization.service');
const ApiError = require('../utils/ApiError');

/**
 * Get getProduct by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};

/**
 * Create a Product
 * @param {Object} orgBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  const user = await userService.getUserById(productBody.user);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const org = await organizationService.getOrgById(productBody.organization);

  if (!org) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Organization not found');
  }
  const product = Product.create(productBody);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  product.serverId = '';
  return product;
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
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  queryProduct,
};
