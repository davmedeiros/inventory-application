const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

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
