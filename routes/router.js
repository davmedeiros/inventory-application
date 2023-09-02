const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');

router.get('/', index_controller.index);
router.get('/categories', category_controller.category_list);
router.get('/brands', brand_controller.brand_list);

module.exports = router;
