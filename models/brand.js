const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  country: { type: String, required: true, maxLength: 100 },
});

BrandSchema.virtual('url').get(function () {
  return `/brand/${this._id}`;
});

module.exports = mongoose.model('Brand', BrandSchema);
