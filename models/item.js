const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  instrument: {
    type: Schema.Types.ObjectId,
    ref: 'Instrument',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Reserved', 'Sold'],
    default: 'Available',
  },
  date_added: { type: Date, default: Date.now },
});

ItemSchema.virtual('url').get(function () {
  return `/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
