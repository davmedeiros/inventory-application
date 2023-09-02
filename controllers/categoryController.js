const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const Instrument = require('../models/instrument');
const { body, validationResult } = require('express-validator');

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

exports.category_create_post = [
  body('name', 'Category name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body(
    'description',
    'Category description must contain at least 10 characters'
  )
    .trim()
    .isLength({ min: 10 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allInstrumentsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Instrument.find({ brand: req.params.id }, 'name description').exec(),
  ]);

  if (category === null) {
    res.redirect('/categories');
  }

  res.render('category_delete', {
    title: 'Delete Category',
    category: category,
    category_instruments: allInstrumentsByCategory,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allInstrumentsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Instrument.find({ brand: req.params.id }, 'name description').exec(),
  ]);

  if (allInstrumentsByCategory.length > 0) {
    res.render('category_delete', {
      title: 'Delete Category',
      category: category,
      category_instruments: allInstrumentsByCategory,
    });
    return;
  } else {
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect('/categories');
  }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update GET');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update POST');
});
