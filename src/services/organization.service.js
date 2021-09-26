const httpStatus = require('http-status');
const Organization = require('../models/orgnation.model');

const ApiError = require('../utils/ApiError');

/**
 * Get getOrgById by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getOrgById = async (id) => {
  return Organization.findById(id);
};

/**
 * Create a Organization
 * @param {Object} orgBody
 * @returns {Promise<Organization>}
 */
const createOrganization = async (orgBody) => {
  const org = Organization.create(orgBody);
  if (org == null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return org;
};
/**
 * Get Organization List by userId
 * @param {object} id
 * @returns {Promise<Organization>}
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
const queryOrganization = async (filter, options) => {
  const org = await Organization.paginate(filter, options);
  return org;
};

/**
 *
 * Get Organization by id
 * @param {object} id
 * @returns {Promise<Organization>}
 */
const getOrganization = async (id) => {
  const org = await getOrgById(id);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  return org;
};

/**
 *
 * Update Org
 * @param {object} id
 * @returns {Promise<Organization>}
 */
const updateOrganization = async (orgUpdate) => {
  const org = await getOrgById(orgUpdate.id);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  Object.assign(org, orgUpdate);
  await org.save();
  return org;
};
/**
 *
 * Delete By Org by Id
 * @param {object} orgdelete
 * @returns {Promise<Organization>}
 */
const deleteOrganization = async (orgdelete) => {
  const org = await getOrgById(orgdelete);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  const orgs = Organization.deleteOne(orgdelete);
  if (orgs == null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return orgs;
};

module.exports = {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  getOrgById,
  queryOrganization,
};
