const Instrument = require('../models/instrument');
const asyncHandler = require('express-async-handler');

exports.instrument_list = asyncHandler(async (req, res, next) => {
  const allInstruments = Instrument.find().sort({ name: 1 }).exec();
  res.render('instrument_list', {
    title: 'Instrument List',
    instrument_list: allInstruments,
  });
});
