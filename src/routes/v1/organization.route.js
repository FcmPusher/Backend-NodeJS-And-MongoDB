const express = require('express');
const validate = require('../../middlewares/validate');
const { orgnationController } = require('../../controllers');
const organizationValidation = require('../../validations/organization.validation');

const router = express.Router();

router.post('/create', orgnationController.createOrganization);
router.get('/:userId', orgnationController.getOrganization);
router.delete('/', orgnationController.deleteOrganization);
router.put('/', orgnationController.updateOrganization);
router.get('/', validate(organizationValidation.getOrg), orgnationController.getOrganizations);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: organization
 *   description: organization
 */
