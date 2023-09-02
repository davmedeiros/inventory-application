const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const instrument_controller = require('../controllers/instrumentController');
const item_controller = require('../controllers/itemController');

router.get('/', index_controller.index);
router.get('/categories', category_controller.category_list);
router.get('/brands', brand_controller.brand_list);
router.get('/instruments', instrument_controller.instrument_list);
router.get('/items', item_controller.item_list);
router.get('/category/:id', category_controller.category_detail);
router.get('/brand/:id', brand_controller.brand_detail);
router.get('/instrument/:id', instrument_controller.instrument_detail);
router.get('/item/:id', item_controller.item_detail);
// router.get('/category/create', category_controller.category_create_get);
// router.get('/category/create', category_controller.category_create_post);

module.exports = router;
