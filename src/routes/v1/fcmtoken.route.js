const express = require('express');
const validate = require('../../middlewares/validate');
const fcmtokenValidation = require('../../validations/fcmtoken.validation');

const fcmtokenController = require('../../controllers/fcmtoken.controller');

const router = express.Router();

router.post('/create', validate(fcmtokenValidation.createFCMToken), fcmtokenController.registerFCMToken);
router.post('/notifications', fcmtokenController.sendNotification);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product
 */
