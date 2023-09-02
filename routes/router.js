const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');
const category_controller = require('../controllers/categoryController');

/* GET home page. */
router.get('/', index_controller.index);

router.get('/categories', category_controller.category_list);

module.exports = router;
