const express = require('express');
const router = express.Router();
const getProducts = require('../controllers/getProducts');
const getProduct = require('../controllers/getProduct');
const createProduct = require('../controllers/createProduct');
const deleteProduct = require('../controllers/deleteProduct');
const updateProduct = require('../controllers/updateProduct');

router.get('/', getProducts);
router.get('/:productId', getProduct);
router.post('/', createProduct);
router.delete('/:productId', deleteProduct);
router.put('/:productId', updateProduct);

module.exports = router;