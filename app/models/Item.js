const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  ownerName:{type:mongoose.Schema.Types.String, ref:'User'},
  ownerContact:{type:mongoose.Schema.Types.String, ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  // perks: [String],
  category:[String],
  // extraInfo: String,
  // checkIn: Number,
  // checkOut: Number,
  // maxGuests: Number,
  maxItems:Number,
  price: Number,
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;