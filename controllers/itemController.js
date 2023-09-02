const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().sort({ name: 1 }).exec();
  res.render('item_list', {
    title: 'Item List',
    item_list: allItems,
  });
});
