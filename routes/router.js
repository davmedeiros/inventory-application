const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const instrument_controller = require('../controllers/instrumentController');

router.get('/', index_controller.index);
router.get('/categories', category_controller.category_list);
router.get('/brands', brand_controller.brand_list);
router.get('/instruments', instrument_controller.instrument_list);

module.exports = router;
