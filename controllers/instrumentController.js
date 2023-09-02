const Instrument = require('../models/instrument');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');

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
