const express = require('express');
const validate = require('../../middlewares/validate');
const fragmentController = require('../../controllers/fragment.controller');
const fragmentValidation = require('../../validations/fragment.validation');

const router = express.Router();

router.post('/create', fragmentController.createFragment);
router.get('/:userId', fragmentController.getFragment);
router.delete('/', fragmentController.deleteFragment);
router.put('/', fragmentController.updateFragment);
router.get('/', validate(fragmentValidation.getFragment), fragmentController.getFragments);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Fragment
 *   description: Fragment
 */
