const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const instrument_controller = require('../controllers/instrumentController');
const item_controller = require('../controllers/itemController');

router.get('/', index_controller.index);

// List views
router.get('/categories', category_controller.category_list);
router.get('/brands', brand_controller.brand_list);
router.get('/instruments', instrument_controller.instrument_list);
router.get('/items', item_controller.item_list);

// Create
router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);

router.get('/brand/create', brand_controller.brand_create_get);
router.post('/brand/create', brand_controller.brand_create_post);

router.get('/instrument/create', instrument_controller.instrument_create_get);
router.post('/instrument/create', instrument_controller.instrument_create_post);

router.get('/item/create', item_controller.item_create_get);
router.post('/item/create', item_controller.item_create_post);

// Delete
router.get('/brand/:id/delete', brand_controller.brand_delete_get);
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);

router.get(
  '/instrument/:id/delete',
  instrument_controller.instrument_delete_get
);
router.post(
  '/instrument/:id/delete',
  instrument_controller.instrument_delete_post
);

router.get('/item/:id/delete', item_controller.item_delete_get);
router.post('/item/:id/delete', item_controller.item_delete_post);

// Update
router.get(
  '/instrument/:id/update',
  instrument_controller.instrument_update_get
);

router.post(
  '/instrument/:id/update',
  instrument_controller.instrument_update_post
);

router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post);

router.get('/brand/:id/update', brand_controller.brand_update_get);
router.post('/brand/:id/update', brand_controller.brand_update_post);

router.get('/item/:id/update', item_controller.item_update_get);
router.post('/item/:id/update', item_controller.item_update_post);

// Detail views
router.get('/category/:id', category_controller.category_detail);
router.get('/brand/:id', brand_controller.brand_detail);
router.get('/instrument/:id', instrument_controller.instrument_detail);
router.get('/item/:id', item_controller.item_detail);

module.exports = router;
