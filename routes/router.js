const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const instrument_controller = require('../controllers/instrumentController');
const item_controller = require('../controllers/itemController');

// List views
router.get('/', index_controller.index);
router.get('/categories', category_controller.category_list);
router.get('/brands', brand_controller.brand_list);
router.get('/instruments', instrument_controller.instrument_list);
router.get('/items', item_controller.item_list);

// Create
router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);
router.get('/brand/create', brand_controller.brand_create_get);
router.post('/brand/create', brand_controller.brand_create_post);

// Detail views
router.get('/category/:id', category_controller.category_detail);
router.get('/brand/:id', brand_controller.brand_detail);
router.get('/instrument/:id', instrument_controller.instrument_detail);
router.get('/item/:id', item_controller.item_detail);

module.exports = router;
