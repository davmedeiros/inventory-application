const Item = require('../models/item');
const asyncHandler = require('express-async-handler');
const Instrument = require('../models/instrument');
const { body, validationResult } = require('express-validator');

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().populate('instrument').exec();
  res.render('item_list', {
    title: 'Item List',
    item_list: allItems,
  });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('instrument').exec();

  if (item === null) {
    const err = new Error('Book copy not found');
    err.status = 404;
    return next(err);
  }

  res.render('item_detail', {
    title: 'Item:',
    item: item,
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allInstruments = await Instrument.find({}, 'name').exec();

  res.render('item_form', {
    title: 'Create Item',
    instrument_list: allInstruments,
  });
});

exports.item_create_post = [
  body('instrument', 'Instrument must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status').escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      instrument: req.body.instrument,
      status: req.body.status,
    });

    if (!errors.isEmpty()) {
      const allInstruments = await Instrument.find({}, 'title').exec();

      res.render('item_form', {
        title: 'Create Item',
        instrument_list: allInstruments,
        selected_instrument: item.book._id,
        errors: errors.array(),
        item: item,
      });
      return;
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];
