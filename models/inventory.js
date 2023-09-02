const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  instrument: {
    type: Schema.Types.ObjectId,
    ref: 'Instrument',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Reserved', 'Sold'],
  },
  date_added: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', InventorySchema);
