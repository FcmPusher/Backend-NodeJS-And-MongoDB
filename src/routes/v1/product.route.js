const express = require('express');
const validate = require('../../middlewares/validate');
const { productController } = require('../../controllers');
const { productValidation } = require('../../validations');

const router = express.Router();

router.post('/create', productController.createProduct);
router.get('/:userId', productController.getProduct);
router.delete('/', productController.deleteProduct);
router.put('/', productController.updateProduct);
router.get('/', validate(productValidation.getOrg), productController.getProducts);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product
 */
