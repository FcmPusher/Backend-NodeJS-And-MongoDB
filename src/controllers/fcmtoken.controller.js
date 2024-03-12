const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { organizationService, fcmtokenService } = require('../services');

const registerFCMToken = catchAsync(async (req, res) => {
  const org = await fcmtokenService.createToken(req.body);
  res.status(httpStatus.CREATED).send(org);
});

const sendNotification = catchAsync(async (req, res) => {
  const sendPushNotification = await fcmtokenService.sendPushNotification(req.body);
  res.status(httpStatus.OK).send(sendPushNotification);
});

const getOrganization = catchAsync(async (req, res) => {
  const org = await organizationService.getOrganization(req.params.userId);
  res.status(httpStatus.OK).send(org);
});

const getOrganizations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await organizationService.queryOrganization(filter, options);
  res.send(result);
});
const updateOrganization = catchAsync(async (req, res) => {
  const org = await organizationService.updateOrganization(req.body);
  res.status(httpStatus.OK).send(org);
});

const deleteOrganization = catchAsync(async (req, res) => {
  const org = await organizationService.deleteOrganization(req.body);
  res.status(httpStatus.OK).send(org);
});

module.exports = {
  registerFCMToken,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizations,
  sendNotification,
};
