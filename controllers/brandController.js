const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');
const Instrument = require('../models/instrument');

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
