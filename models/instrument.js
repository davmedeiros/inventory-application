const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  price: { type: Number, required: true, min: 0 },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

InstrumentSchema.virtual('url').get(function () {
  return `/instrument/${this._id}`;
});

module.exports = mongoose.model('Instrument', InstrumentSchema);
