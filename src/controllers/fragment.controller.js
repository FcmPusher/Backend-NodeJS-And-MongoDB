const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { fragmentService } = require('../services');

const createFragment = catchAsync(async (req, res) => {
  const org = await fragmentService.createFragment(req.body);
  res.status(httpStatus.CREATED).send(org);
});

const getFragment = catchAsync(async (req, res) => {
  const org = await fragmentService.getFragmentById(req.params.userId);
  res.status(httpStatus.OK).send(org);
});

const getFragments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await fragmentService.queryFragment(filter, options);
  res.send(result);
});
const updateFragment = catchAsync(async (req, res) => {
  const fragment = await fragmentService.updateFragment(req.body);
  res.status(httpStatus.OK).send(fragment);
});

const deleteFragment = catchAsync(async (req, res) => {
  const fragment = await fragmentService.deleteFragment(req.body);
  res.status(httpStatus.OK).send(fragment);
});

module.exports = {
  createFragment,
  getFragment,
  updateFragment,
  deleteFragment,
  getFragments,
};
