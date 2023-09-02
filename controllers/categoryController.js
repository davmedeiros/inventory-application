const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const Instrument = require('../models/instrument');

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render('category_list', {
    title: 'Category List',
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, instrumentsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Instrument.find({ category: req.params.id }, 'name description').exec(),
  ]);
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category_detail', {
    title: 'Category Detail',
    category: category,
    category_instruments: instrumentsInCategory,
  });
});

exports.category_create_get = (req, res, next) => {
  res.render('category_form', { title: 'Create Category' });
};
