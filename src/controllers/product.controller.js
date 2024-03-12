const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const org = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(org);
});

const getProduct = catchAsync(async (req, res) => {
  const org = await productService.getProduct(req.params.orgId);
  res.status(httpStatus.OK).send(org);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProduct(filter, options);
  res.send(result);
});
const updateProduct = catchAsync(async (req, res) => {
  const org = await productService.updateProduct(req.body);
  res.status(httpStatus.OK).send(org);
});

const deleteProduct = catchAsync(async (req, res) => {
  const org = await productService.deleteProduct(req.body);
  res.status(httpStatus.OK).send(org);
});

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
