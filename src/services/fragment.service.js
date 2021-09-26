const httpStatus = require('http-status');
const Fragment = require('../models/fragment.model');
const ApiError = require('../utils/ApiError');
const productService = require('./product.service');
const userService = require('./user.service');
const organizationService = require('./organization.service');

/**
 * Get Fragment by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getFragmentById = async (id) => {
  return Fragment.findById(id);
};

/**
 * Create a Fragment
 * @param {Object} fragmentBody
 * @returns {Promise<Fragment>}
 */
const createFragment = async (fragmentBody) => {
  const org = await organizationService.getOrgById(fragmentBody.organization);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }

  const product = await productService.getProductById(fragmentBody.product);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const user = await userService.getUserById(fragmentBody.user);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const fragment = Fragment.create(fragmentBody);
  if (fragment == null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return fragment;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFragment = async (filter, options) => {
  const fragment = await Fragment.paginate(filter, options);
  return fragment;
};

/**
 *
 * Get Fragment by id
 * @param {object} id
 * @returns {Promise<Fragment>}
 */
const getFragment = async (id) => {
  const fragment = await getFragmentById(id);
  if (!fragment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fragment not found');
  }
  return fragment;
};

/**
 *
 * Update Fragment
 * @param {object} id
 * @returns {Promise<Fragment>}
 */
const updateFragment = async (fragmentUpdate) => {
  const org = await organizationService.getOrgById(fragmentUpdate.organization);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }

  const product = await productService.getProductById(fragmentUpdate.product);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const user = await userService.getUserById(fragmentUpdate.user);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const fragment = await getFragmentById(fragmentUpdate.id);
  if (!fragment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fragment not found');
  }
  Object.assign(fragment, fragmentUpdate);
  await fragment.save();
  return fragment;
};
/**
 *
 * Delete By fragment by Id
 * @param {object} orgdelete
 * @returns {Promise<Fragment>}
 */
const deleteFragment = async (fragmentDelete) => {
  const fragment = await getFragmentById(fragmentDelete);
  if (!fragment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fragment not found');
  }
  const fragments = Fragment.deleteOne(fragmentDelete);
  if (fragments == null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return fragments;
};

module.exports = {
  createFragment,
  getFragmentById,
  getFragment,
  updateFragment,
  deleteFragment,
  queryFragment,
};
