const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');
const Instrument = require('../models/instrument');
const { body, validationResult } = require('express-validator');

exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ name: 1 }).exec();
  res.render('brand_list', {
    title: 'Brand List',
    brand_list: allBrands,
  });
});

exports.brand_detail = asyncHandler(async (req, res, next) => {
  const [brand, instrumentsInBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Instrument.find({ brand: req.params.id }, 'name description').exec(),
  ]);
  if (brand === null) {
    const err = new Error('Brand not found');
    err.status = 404;
    return next(err);
  }

  res.render('brand_detail', {
    title: 'Brand Detail',
    brand: brand,
    brand_instruments: instrumentsInBrand,
  });
});

exports.brand_create_get = (req, res, next) => {
  res.render('brand_form', { title: 'Create Brand' });
};

exports.brand_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Brand name must be specified.')
    .isAlphanumeric()
    .withMessage('Brand name has non-alphanumeric characters.'),
  body('country')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Country must be specified.')
    .isAlphanumeric()
    .withMessage('Country has non-alphanumeric characters.'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      country: req.body.country,
    });

    if (!errors.isEmpty()) {
      res.render('brand_form', {
        title: 'Create Brand',
        brand: brand,
        errors: errors.array(),
      });
      return;
    } else {
      await brand.save();
      res.redirect(brand.url);
    }
  }),
];

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  const [brand, allInstrumentsByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Instrument.find({ brand: req.params.id }, 'name description').exec(),
  ]);

  if (brand === null) {
    res.redirect('/brands');
  }

  res.render('brand_delete', {
    title: 'Delete Brand',
    brand: brand,
    brand_instruments: allInstrumentsByBrand,
  });
});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  const [brand, allInstrumentsByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Instrument.find({ brand: req.params.id }, 'name description').exec(),
  ]);

  if (allInstrumentsByBrand.length > 0) {
    res.render('brand_delete', {
      title: 'Delete Brand',
      brand: brand,
      brand_instruments: allInstrumentsByBrand,
    });
    return;
  } else {
    await Brand.findByIdAndRemove(req.body.brandid);
    res.redirect('/brands');
  }
});

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();

  if (!brand) {
    const err = new Error('brand not found');
    err.status = 404;
    return next(err);
  }

  res.render('brand_form', {
    title: 'Update Brand',
    brand: brand,
  });
});

exports.brand_update_post = [
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('country', 'Country must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      country: req.body.country,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('brand_form', {
        title: 'Update Brand',
        brand: brand,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        brand,
        {}
      );
      res.redirect(updatedBrand.url);
    }
  }),
];
