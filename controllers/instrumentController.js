const Instrument = require('../models/instrument');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Brand = require('../models/brand');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

exports.instrument_list = asyncHandler(async (req, res, next) => {
  const allInstruments = await Instrument.find().sort({ name: 1 }).exec();
  res.render('instrument_list', {
    title: 'Instrument List',
    instrument_list: allInstruments,
  });
});

exports.instrument_detail = asyncHandler(async (req, res, next) => {
  const [instrument, items] = await Promise.all([
    Instrument.findById(req.params.id)
      .populate('brand')
      .populate('category')
      .exec(),
    Item.find({ instrument: req.params.id }).exec(),
  ]);

  if (instrument === null) {
    const err = new Error('instrument not found');
    err.status = 404;
    return next(err);
  }

  res.render('instrument_detail', {
    title: instrument.name,
    instrument: instrument,
    items: items,
  });
});

exports.instrument_create_get = asyncHandler(async (req, res, next) => {
  const [allBrands, allCategories] = await Promise.all([
    Brand.find().exec(),
    Category.find().exec(),
  ]);

  res.render('instrument_form', {
    title: 'Create Instrument',
    brands: allBrands,
    categories: allCategories,
  });
});

exports.instrument_create_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === 'undefined') req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('brand', 'Brand must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category.*').escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const instrument = new Instrument({
      name: req.body.name,
      price: req.body.price,
      brand: req.body.brand,
      description: req.body.description,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().exec(),
        Category.find().exec(),
      ]);

      for (const category of allCategories) {
        if (instrument.category.includes(category._id)) {
          category.checked = 'true';
        }
      }
      res.render('instrument_form', {
        title: 'Create Instrument',
        brands: allBrands,
        categories: allCategories,
        instrument: instrument,
        errors: errors.array(),
      });
    } else {
      await instrument.save();
      res.redirect(instrument.url);
    }
  }),
];
